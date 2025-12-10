'use client';

import { useFormStatus } from 'react-dom'

export default function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className={`relative w-full py-4 px-6 font-semibold rounded-xl shadow-lg transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden
        ${pending ? 'cursor-not-allowed opacity-80' : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-indigo-500/30 hover:-translate-y-0.5 hover:shadow-indigo-500/40 focus:ring-indigo-500'}
      `}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {pending && (
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {pending ? '正在创建...' : '确认创建'}
      </span>
    </button>
  );
}