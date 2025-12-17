import { getCloudflareContext } from '@opennextjs/cloudflare'
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { columnKey, columnByUserKey, columnStatsKey } from './keys';

const getKV = () => getCloudflareContext().env.MY_NEXT_KV;

// 添加一个新专栏
export async function deleteColumn(id: string) {
  const kv = getKV();
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session_id')?.value;
  const sessionData = await kv.get<{userId: string}>(`session:${sessionId}`, 'json');

  if (!sessionId || !sessionData) {
    throw new Error('Unauthorized');
  }

  let user_id = sessionData.userId;

  const key = columnKey.getKey(id);
  const key_user = columnByUserKey.getKey(user_id, id);
  const key_stats = columnStatsKey.getKey(id);

  try {
    await kv.delete(key);
    await kv.delete(key_user);
    await kv.delete(key_stats);
    return NextResponse.json({
      success: true,
      message: '专栏删除成功'
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}