import ColumnCard from "@/app/_components/column-card";
import { getColumnsWithStats } from '@/app/_service/kv';

export default async function ColumnList() {
  const columns = await getColumnsWithStats();
  return (
    <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {columns.map((item) => (
        <ColumnCard key={item.id} item={item} />
      ))}
    </div>
  );
}