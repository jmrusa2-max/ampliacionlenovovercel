// components/FooterSearch.tsx
'use client';

import dynamic from 'next/dynamic';

const SearchBar = dynamic(() => import('@/components/SearchBar').then(mod => mod.SearchBar), { ssr: false });

export function FooterSearch() {
  return (
    <div className="w-full max-w-4xl mx-auto p-8 my-8 bg-slate-800 rounded-2xl shadow-lg border border-slate-700 flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold text-slate-100">
        Busca informacion sobre otro articulo
      </h2>
      <div className="w-full max-w-lg">
        <SearchBar />
      </div>
    </div>
  );
}
