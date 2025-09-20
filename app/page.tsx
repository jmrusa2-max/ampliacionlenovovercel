// app/page.tsx
'use client';

import dynamic from 'next/dynamic';

const SearchBar = dynamic(() => import('@/components/SearchBar').then(mod => mod.SearchBar), { ssr: false });

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center bg-slate-800 p-8 md:p-12 rounded-2xl shadow-lg border border-slate-700">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-slate-100">¿Se puede ampliar?</h1>
        <p className="text-lg md:text-xl text-slate-400 mb-8">
          Consulta si podes ampliar la RAM o el almacenamiento.
        </p>
        <SearchBar />
      </div>
    </main>
  );
}