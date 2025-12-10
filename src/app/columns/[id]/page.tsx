import { getColumnDetail, incrementStat } from "@/app/_service/kv";
import { likeColumn } from "./_action";

// 这是一个简单的 Server Component
export default async function ColumnDetail({ params }: { params: { id: string } }) {
  const id = params.id;
  
  // 1. 每次进入详情页，自动增加阅读量
  // 注意：为了不阻塞页面渲染，可以不 await 这个操作，或者把它放在 useEffect (客户端) 触发的 API 中
  // 这里演示服务端直接加 (会轻微增加 TTFB)
  await incrementStat(id, 'views');
  
  // 2. 获取最新数据
  const stats = await getColumnDetail(id);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">专栏 ID: {id}</h1>
      
      <div className="flex gap-6 text-xl mb-8">
        <span>阅读量: {stats.views}</span>
        <span>点赞量: {stats.likes}</span>
      </div>

      {/* 点赞表单 */}
      <form action={likeColumn.bind(null, id)}>
        <button 
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          👍 点赞
        </button>
      </form>
    </div>
  );
}