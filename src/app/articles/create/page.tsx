import { addArticle } from "@/app/_service/kv";
import SubmitButton from "./_components/submit-button";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

export default async function CreateColumnForm({ searchParams }: { searchParams: Promise<{ columnId: string }> }) {
  const params = await searchParams;
  const columnId = params.columnId;

  async function __formAction(formData: FormData) {
    'use server';
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    await addArticle(columnId, { title, content });
    redirect(`/columns/${columnId}`);
  }

  return (
    // 外层容器：负责背景和居中
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gray-100">
      {/* 卡片容器 */}
      <div className="relative w-full max-w-lg p-4">
        <div className="relative bg-white/70 backdrop-blur-lg border border-white/50 p-8 md:p-10">
          
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">新增文章</h1>
          </div>

          {/* Form */}
          <form action={__formAction} className="space-y-6">
            
            {/* 专栏名称 */}
            <div className="space-y-2 group">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 ml-1 transition-colors group-focus-within:text-gray-600">
                文章标题
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  className="block w-full px-4 py-3.5 text-slate-700 bg-white/50 border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-gray-500 outline-none transition-all duration-300 placeholder-slate-400 disabled:opacity-50"
                  placeholder="例如：如何提高工作效率"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </div>
              </div>
            </div>

            {/* 文章内容 */}
            <div className="space-y-2 group">
              <label htmlFor="description" className="block text-sm font-semibold text-slate-700 ml-1 transition-colors group-focus-within:text-gray-600">
                文章内容
              </label>
              <textarea
                id="content"
                name="content"
                rows={4}
                required
                className="block w-full px-4 py-3.5 text-slate-700 bg-white/50 border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-gray-500 outline-none transition-all duration-300 resize-none placeholder-slate-400 disabled:opacity-50"
                placeholder="请输入文章内容..."
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