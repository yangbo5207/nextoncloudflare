import { getCloudflareContext } from '@opennextjs/cloudflare'
import { nanoid } from 'nanoid';

export interface ColumnMeta {
  id: string;
  title: string;
  desc: string;
}

export interface ColumnStats {
  views: number;
  likes: number;
}

interface ColumnFull extends ColumnMeta, ColumnStats {}

// 1. 获取所有专栏（聚合了阅读量和点赞量）
export async function getColumnsWithStats(): Promise<ColumnFull[]> {
  const { env } = await getCloudflareContext({async: true});
  
  // A. 获取元数据列表
  const indexJson = await env.MY_NEXT_KV.get("columns:index");
  const columns: ColumnMeta[] = indexJson ? JSON.parse(indexJson) : [];

  if (columns.length === 0) return [];

  // B. 并发获取所有专栏的统计数据 (关键性能优化)
  // KV 的读取非常快，并发请求 10-20 个 key 几乎是瞬间的
  const statsPromises = columns.map(async (col) => {
    const statsJson = await env.MY_NEXT_KV.get(`col:${col.id}:stats`);
    const stats: ColumnStats = statsJson ? JSON.parse(statsJson) : { views: 0, likes: 0 };
    
    return {
      ...col,
      ...stats
    };
  });

  return Promise.all(statsPromises);
}

// 2. 获取单个专栏数据
export async function getColumnDetail(id: string): Promise<ColumnFull> {
  const { env } = await getCloudflareContext({async: true});
  // 读取列表 -> 追加 -> 写回
  const indexJson = await env.MY_NEXT_KV.get("columns:index");
  const columns: ColumnMeta[] = indexJson ? JSON.parse(indexJson) : [];
  const column = columns.find(c => c.id === id);
  if (!column) {
    return { id: '', title: '', desc: '', views: 0, likes: 0 };
  }
  const valJson = await env.MY_NEXT_KV.get(`col:${id}:stats`);
  const val: ColumnStats = valJson ? JSON.parse(valJson) : { views: 0, likes: 0 };
  return { ...column, ...val };
}

// 3. 写入/增加数据 (Server Action 用)
export async function incrementStat(id: string, type: 'views' | 'likes') {
  const { env } = await getCloudflareContext({async: true});
  const key = `col:${id}:stats`;

  // A. 读取当前值
  const currentRaw = await env.MY_NEXT_KV.get(key);
  let stats: ColumnStats = currentRaw 
    ? JSON.parse(currentRaw) 
    : { views: 0, likes: 0 };

  // B. 修改内存中的值
  if (type === 'views') stats.views++;
  if (type === 'likes') stats.likes++;

  // C. 写回 KV
  // 注意：KV 是最终一致性，高并发下可能会覆盖，但做博客统计够用了
  await env.MY_NEXT_KV.put(key, JSON.stringify(stats));
  
  return stats;
}

// 4. 初始化/添加一个新专栏 (仅供后台管理使用)
export async function addColumn(newCol: ColumnMeta) {
  const { env } = await getCloudflareContext({async: true});
  
  // 读取列表 -> 追加 -> 写回
  const indexJson = await env.MY_NEXT_KV.get("columns:index");
  const columns: ColumnMeta[] = indexJson ? JSON.parse(indexJson) : [];
  
  // 避免重复
  if (!columns.find(c => c.id === newCol.id)) {
    columns.push(newCol);
    await env.MY_NEXT_KV.put("columns:index", JSON.stringify(columns));
    // 初始化该专栏的统计数据
    await env.MY_NEXT_KV.put(`col:${newCol.id}:stats`, JSON.stringify({ views: 0, likes: 0 }));
  }
}

export interface ArticleMeta {
  title: string;
  content: string;
}

export interface ArticleFull extends ArticleMeta {
  id: string;
  columnId: string;
  createdAt: number;
  updatedAt: number;
}

export async function addArticle(columnId: string, article: ArticleMeta) {
  // 1. 获取环境变量
  const { env } = await getCloudflareContext({async: true});
  const kv = env.MY_NEXT_KV;

  // 2. 基础校验
  if (!columnId) {
    throw new Error('Column ID is required');
  }
  if (!article.title) {
    throw new Error('Article title is required');
  }
  if (!article.content) {
    throw new Error('Article content is required');
  }

  // 3. 生成唯一ID 和 key
  const uid = nanoid();
  const now = Date.now();

  // 4. 定义 2 个 key，一个用于存储文章详情，一个用于存储与专栏的关联
  const articleKey = `article:${uid}`;

    // Key B: 索引数据 (依赖 columnId，用于 List)
  // 格式推荐: idx:col:{columnId}:{倒序时间戳}:{uid}
  // 使用 "9999999999999 - now" 可以实现 list 时按最新发布排序
  const timestampSort = 9999999999999 - now; 
  const key = `col:article:${columnId}:${timestampSort}:${uid}`;

  // 4. 构建完整文章对象
  const fullArticle: ArticleFull = {
    ...article,
    id: uid,
    columnId,
    createdAt: now,
    updatedAt: now
  }

  const listMetadata = {
    id: uid,
    columnId,
    createdAt: now,
    updatedAt: now,
    title: article.title,
  }

  try {
    await Promise.all([
      kv.put(key, JSON.stringify(listMetadata), {
        metadata: listMetadata
      }),
      kv.put(articleKey, JSON.stringify(fullArticle))
    ])

    return {
      success: true,
      data: fullArticle,
      key: key
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      key: key
    }
  }
}

// 获取指定专栏下的所有文章
export async function getArticlesByColumnId(columnId: string) {
  const { env } = await getCloudflareContext({async: true});
  const kv = env.MY_NEXT_KV;
  
  // 构建前缀 key
  const key = `col:article:${columnId}`;
  const articles = await kv.list({ prefix: key });
  return articles.keys.map(key => key.metadata as ArticleFull);
}

// 获取指定文章的详细信息
export async function getArticleById(id: string) {
  const { env } = await getCloudflareContext({async: true});
  const kv = env.MY_NEXT_KV;
  
  const articleKey = `article:${id}`;
  const article = await kv.get(articleKey);
  return article ? JSON.parse(article) as ArticleFull : null;
}