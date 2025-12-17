import { getCloudflareContext } from '@opennextjs/cloudflare'
import { articleKey, articleStatsKey } from '@/lib/keys';

const getKV = () => getCloudflareContext().env.MY_NEXT_KV;

// 获取专栏详情
export async function getArticleDetail(id: string) {
  const kv = getKV();

  const key = articleKey.getKey(id);
  let result = await kv.get<Article>(key, 'json');

  if (!result) {
    throw new Error('文章不存在');
  }

  const statsKey = articleStatsKey.getKey(id);
  const stats = await kv.get<ArticleStats>(statsKey, 'json');
  
  return { ...result, ...stats };
}