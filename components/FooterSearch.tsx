// components/FooterSearch.tsx

'use client';

import dynamic from 'next/dynamic';

// Importa la exportación por defecto directamente
const SearchBar = dynamic(() => import('@/components/SearchBar'));

export function FooterSearch() {
  return (
    <div className="p-4 bg-gray-800">
      <h3 className="text-lg font-semibold mb-4 text-white">Buscar en el pie de página</h3>
      <SearchBar />
    </div>
  );
}