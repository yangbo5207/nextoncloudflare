import { Inter } from "next/font/google";
import { addColumn } from "@/app/_service/kv";
import SubmitButton from "./_components/submit-button";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

// 加载字体
const inter = Inter({ subsets: ["latin"] });

export default function CreateColumnForm() {

  async function __formAction(formData: FormData) {
    'use server';
    const title = formData.get("title") as string;
    const desc = formData.get("desc") as string;
    await addColumn({ id: nanoid(), title, desc });
    redirect("/");
  }

  return (
    // 外层容器：负责背景和居中
    <div className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-50 text-slate-800 ${inter.className}`}>
      
      {/* 背景装饰 Blob 动画 */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* 卡片容器 */}
      <div className="relative w-full max-w-lg p-4">
        <div className="relative bg-white/70 backdrop-blur-lg border border-white/50 shadow-2xl rounded-3xl p-8 md:p-10">
          
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 mb-4 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">新建专栏</h1>
            <p className="text-slate-500 mt-2 text-sm">Create a new column to share your insights.</p>
          </div>

          {/* Form */}
          <form action={__formAction} className="space-y-6">
            
            {/* 专栏名称 */}
            <div className="space-y-2 group">
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 ml-1 transition-colors group-focus-within:text-indigo-600">
                专栏名称
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  className="block w-full px-4 py-3.5 text-slate-700 bg-white/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-300 placeholder-slate-400 disabled:opacity-50"
                  placeholder="例如：产品设计思维"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </div>
              </div>
            </div>

            {/* 专栏描述 */}
            <div className="space-y-2 group">
              <label htmlFor="description" className="block text-sm font-semibold text-slate-700 ml-1 transition-colors group-focus-within:text-indigo-600">
                专栏描述
              </label>
              <textarea
                id="desc"
                name="desc"
                rows={4}
                required
                className="block w-full px-4 py-3.5 text-slate-700 bg-white/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-300 resize-none placeholder-slate-400 disabled:opacity-50"
                placeholder="请简要介绍该专栏的主题内容..."
              ></textarea>
            </div>

            {/* 按钮区域 */}
            <div className="pt-4">
              <SubmitButton />
            </div>
          </form>
        </div>

        <p className="text-center text-slate-400 text-xs mt-8 font-medium opacity-60">
          &copy; {new Date().getFullYear()} Design System. All rights reserved.
        </p>
      </div>
    </div>
  );
}