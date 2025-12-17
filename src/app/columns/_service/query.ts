import { getCloudflareContext } from '@opennextjs/cloudflare'
import { columnKey, columnStatsKey } from '@/lib/keys';

const getKV = () => getCloudflareContext().env.MY_NEXT_KV;

// 获取专栏详情
export async function getColumnDetail(id: string) {
  const kv = getKV();

  const key = columnKey.getKey(id);
  let result = await kv.get<Column>(key, 'json');

  if (!result) {
    throw new Error('专栏不存在');
  }

  const statsKey = columnStatsKey.getKey(id);
  const stats = await kv.get<ColumnStats>(statsKey, 'json');
  
  return { ...result, ...stats };
}