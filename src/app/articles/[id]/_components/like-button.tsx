"use client";
import { useState } from 'react';

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button 
      onClick={() => setLiked(!liked)}
      className={`flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 mx-auto mb-10 text-2xl
        ${liked ? 'text-red-500 scale-110 shadow-red-100' : 'text-gray-300'}
      `}
    >
      ♥
    </button>
  );
}