import React from "react";
import { ThemeToggle } from "@/app/_components/theme-toggle";
import ColumnCard from "@/app/_components/column-card";
import Link from "next/link";
import { getColumnsWithStats } from './_service/kv';

// 4. 页面主体
export default async function Home() {
  const columns = await getColumnsWithStats();
  return (
    <main className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* 浮动切换按钮 */}
      <ThemeToggle />

      {/* Header */}
      <div className="max-w-7xl w-full mb-10 text-center sm:text-left sm:flex sm:items-end sm:justify-between border-b border-gray-200 pb-6 transition-colors duration-300">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">精选专栏</h1>
          <p className="mt-2 text-sm text-slate-500">深入浅出，探索技术的无限可能</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          <Link href="/columns/create">创建专栏</Link>
        </button>
      </div>

      {/* Grid */}
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {columns.map((item) => (
          <ColumnCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}