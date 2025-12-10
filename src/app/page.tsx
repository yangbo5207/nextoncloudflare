import React from "react";
import { ThemeToggle } from "@/app/_components/theme-toggle";

// 定义颜色类型
type ColorVariant = "blue" | "purple" | "teal" | "orange" | "pink" | "indigo" | "emerald";

interface ColumnItem {
  id: number;
  title: string;
  views: string;
  likes: string;
  color: ColorVariant;
  iconPath: React.ReactNode;
}

// 1. 数据定义
const COLUMNS: ColumnItem[] = [
  {
    id: 1,
    title: "React 深度剖析",
    views: "12.5k",
    likes: "3.2k",
    color: "blue",
    iconPath: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  },
  {
    id: 2,
    title: "Next.js 16 全栈实战",
    views: "8.1k",
    likes: "1.9k",
    color: "purple",
    iconPath: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
  },
  {
    id: 3,
    title: "Web 安全攻防",
    views: "5.4k",
    likes: "920",
    color: "teal",
    iconPath: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  },
  {
    id: 4,
    title: "CSS 视觉艺术",
    views: "2.1k",
    likes: "340",
    color: "orange",
    iconPath: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  },
  {
    id: 5,
    title: "TypeScript 高级模式",
    views: "18.9k",
    likes: "4.5k",
    color: "pink",
    iconPath: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  },
  {
    id: 6,
    title: "系统架构设计",
    views: "7.3k",
    likes: "1.2k",
    color: "indigo",
    iconPath: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  },
  {
    id: 7,
    title: "Web 3.0 开发指南",
    views: "9.8k",
    likes: "2.6k",
    color: "emerald",
    iconPath: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
  },
];

// 2. 颜色映射 (关键：让 Tailwind 能够扫描到完整的类名)
const colorStyles: Record<ColorVariant, { bg: string; icon: string; hoverText: string; hoverBg: string }> = {
  blue: { bg: "bg-blue-50", icon: "text-blue-600", hoverText: "group-hover:text-blue-600", hoverBg: "group-hover:bg-blue-100" },
  purple: { bg: "bg-purple-50", icon: "text-purple-600", hoverText: "group-hover:text-purple-600", hoverBg: "group-hover:bg-purple-100" },
  teal: { bg: "bg-teal-50", icon: "text-teal-600", hoverText: "group-hover:text-teal-600", hoverBg: "group-hover:bg-teal-100" },
  orange: { bg: "bg-orange-50", icon: "text-orange-600", hoverText: "group-hover:text-orange-600", hoverBg: "group-hover:bg-orange-100" },
  pink: { bg: "bg-pink-50", icon: "text-pink-600", hoverText: "group-hover:text-pink-600", hoverBg: "group-hover:bg-pink-100" },
  indigo: { bg: "bg-indigo-50", icon: "text-indigo-600", hoverText: "group-hover:text-indigo-600", hoverBg: "group-hover:bg-indigo-100" },
  emerald: { bg: "bg-emerald-50", icon: "text-emerald-600", hoverText: "group-hover:text-emerald-600", hoverBg: "group-hover:bg-emerald-100" },
};

// 3. 单个卡片组件
function ColumnCard({ item }: { item: ColumnItem }) {
  const styles = colorStyles[item.color];

  return (
    <div className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      {/* SVG Icon Container */}
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors ${styles.bg} ${styles.hoverBg}`}>
        <svg className={`w-8 h-8 ${styles.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {item.iconPath}
        </svg>
      </div>

      {/* Title */}
      <h3 className={`text-lg font-bold text-slate-900 mb-2 transition-colors ${styles.hoverText}`}>
        {item.title}
      </h3>

      {/* Stats */}
      <div className="flex items-center space-x-4 text-xs font-medium text-slate-400 mt-4">
        {/* Views */}
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          {item.views}
        </div>
        {/* Likes */}
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-1 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {item.likes}
        </div>
      </div>
    </div>
  );
}

// 4. 页面主体
export default function Home() {
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
        <div className="mt-4 sm:mt-0 text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer transition-colors">
          浏览全部 &rarr;
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {COLUMNS.map((item) => (
          <ColumnCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}