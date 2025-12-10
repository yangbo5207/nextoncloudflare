import { getCloudflareContext } from '@opennextjs/cloudflare'

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
export async function getColumnDetail(id: string): Promise<ColumnStats> {
  const { env } = await getCloudflareContext({async: true});
  const val = await env.MY_NEXT_KV.get(`col:${id}:stats`);
  return val ? JSON.parse(val) : { views: 0, likes: 0 };
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