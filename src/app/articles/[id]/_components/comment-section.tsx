"use client";
import { useState } from 'react';

type Comment = { id: number; user: string; content: string };

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, user: "Jason Li", content: "非常有深度！特别是关于操作系统变革的那一段。" },
    { id: 2, user: "Sarah Chen", content: "期待下一篇关于 Multi-Agent 协作的文章。" }
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;
    const newComment = { id: Date.now(), user: "访客", content: input };
    setComments([newComment, ...comments]);
    setInput("");
  };

  return (
    <div className="mt-10 pt-10">
      <h3 className="text-xl font-bold mb-6">评论 ({comments.length})</h3>
      
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="写下你的看法..." 
          className="flex-1! indent-3! border border-gray-200 focus:outline-none focus:border-gray-500 transition"
        />
        <button 
          onClick={handleSubmit}
          className="bg-gray-600 text-white px-6 py-2 font-semibold hover:bg-gray-700 transition"
        >
          发送
        </button>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0" />
            <div>
              <h4 className="text-sm font-bold mb-1">{comment.user}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}