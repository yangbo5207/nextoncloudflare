import { getArticlesByColumnId } from "@/app/_service/kv";
import ArticleItem from "./article-item";

// 这是一个简单的 Server Component
export default async function ColumnDetail({ columnId }: { columnId: string }) {
  const articles = await getArticlesByColumnId(columnId);

  return (  
    <div className="flex flex-col gap-4">
      {articles.length > 0 ? (
        articles.map(article => (
          <ArticleItem key={article.id} article={article} />
        ))
      ) : (
        <p className="text-gray-400 text-center py-10">暂无文章发布</p>
      )}
    </div>
  );
}
