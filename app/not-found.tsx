// app/not-found.tsx

'use client';

import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <div className="w-full max-w-lg mx-auto text-center px-4">
      {/* Glassmorphism card */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/15 shadow-2xl p-8 sm:p-10">
        {/* Search icon with pulsing ring */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="absolute inset-0 w-20 h-20 rounded-full bg-[#FF4757]/20 animate-ping" style={{ animationDuration: '2s' }} />
          <div className="relative w-20 h-20 rounded-full bg-[#FF4757]/10 border border-[#FF4757]/30 flex items-center justify-center">
            <MagnifyingGlassIcon className="h-9 w-9 text-[#FF4757]" />
          </div>
        </div>

        {/* Error heading */}
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-2 text-[#FF4757] tracking-tight">
          404
        </h1>
        <h2 className="text-xl sm:text-2xl font-semibold text-white/90 mb-3">
          Artículo no encontrado
        </h2>
        <p className="text-slate-400 text-base mb-8 leading-relaxed max-w-sm mx-auto">
          No pudimos encontrar el artículo que buscás. Verificá el número e intentá de nuevo, o probá con otro código.
        </p>

        {/* Separator */}
        <div className="w-16 h-px bg-white/20 mx-auto mb-8" />

        {/* Integrated search bar */}
        <div className="mb-6">
          <SearchBar />
        </div>

        {/* Link to home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}