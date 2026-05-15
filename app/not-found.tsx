// app/not-found.tsx
'use client';

import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

export default function NotFound() {
  return (
    <div className="w-full max-w-3xl bg-white/25 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl p-8 text-center animate-fade-in-up">
      <div className="text-[#FF4757] mb-4 animate-gentle-shake">
        <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-[#FF4757]">Artículo no encontrado</h1>
      <p className="text-gray-300 text-lg mb-2">
        No se encontró un equipo con ese código de artículo.
      </p>
      <p className="text-gray-400 text-sm mb-8">
        Verificá que el número sea correcto e intentá de nuevo.
      </p>
      <div className="max-w-md mx-auto">
        <SearchBar />
      </div>
      <div className="mt-6">
        <Link href="/" className="text-white/80 hover:text-white hover:underline transition-colors text-sm">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}