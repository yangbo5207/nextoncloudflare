import { getCloudflareContext } from '@opennextjs/cloudflare'
import { cookies } from 'next/headers';
import { ulid } from 'ulid';
import { NextResponse } from 'next/server';
import { columnKey, columnByUserKey, columnStatsKey } from './keys';

const getKV = () => getCloudflareContext().env.MY_NEXT_KV;

// 添加一个新专栏
export async function addColumn(newCol: ColumnMeta) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session_id')?.value;
  const kv = getKV();

  if (!sessionId) {
    throw new Error('Unauthorized');
  }

  if (!newCol.title) {
    throw new Error('Title is required');
  }
  if (!newCol.tag) {
    throw new Error('Tag is required');
  }
  if (!newCol.desc) {
    throw new Error('Description is required');
  }

  const sessionData = await kv.get<{userId: string}>(`session:${sessionId}`, 'json');

  if (!sessionData || !sessionData.userId) {
    throw new Error('Unauthorized');
  }

  let user_id = sessionData.userId;

  const userinfo: any = await kv.get(`user:${user_id}`, 'json');

  const usermeta = {
    user_id: user_id,
    user_name: userinfo?.name,
    user_avatar: userinfo?.avatar,
  }

  const col_id = ulid();
  // 支持查询所有的专栏
  const key = columnKey.getKey(col_id);
  // 支持查询用户自己的专栏
  let key_user = columnByUserKey.getKey(user_id, col_id);
  let key_stats = columnStatsKey.getKey(col_id);

  const column: Column = {
    id: col_id,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    ...newCol,
    ...usermeta
  }

  try {
    await kv.put(key, JSON.stringify(column), {
      metadata: column
    });
    await kv.put(key_user, JSON.stringify(column), {
      metadata: column
    });
    // 初始化该专栏的统计数据
    await kv.put(key_stats, JSON.stringify({ views: 0, likes: 0 }));
    return NextResponse.json({
      success: true,
      message: '专栏创建成功'
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}