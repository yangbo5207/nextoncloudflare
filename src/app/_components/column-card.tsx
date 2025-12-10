import React from "react";
import { ICONS } from "@/app/_service/icons";
import Link from "next/link";

// 定义颜色类型
type ColorVariant = "blue" | "purple" | "teal" | "orange" | "pink" | "indigo" | "emerald";

const colors: ColorVariant[] = ["blue", "purple", "teal", "orange", "pink", "indigo", "emerald"];

export interface ColumnItem {
  id: string;
  title: string;
  views: number;
  likes: number;
  // color: ColorVariant;
  // iconPath: React.ReactNode;
}

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
  const i = Math.floor(Math.random() * colors.length);
  const styles = colorStyles[colors[i]];

  return (
    <Link href={`/columns/${item.id}`} className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      {/* SVG Icon Container */}
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors ${styles.bg} ${styles.hoverBg}`}>
        <svg className={`w-8 h-8 ${styles.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {ICONS[i]}
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
    </Link>
  );
}

export default ColumnCard;