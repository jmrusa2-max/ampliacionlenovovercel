// components/SearchBar.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ingresa el número de articulo o SKU"
        className="w-full px-4 py-3 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FF4757] bg-white/90 backdrop-blur-sm text-gray-900 placeholder:text-gray-500"
      />
      <button
        type="submit"
        className="mt-4 w-full bg-[#FF4757] hover:bg-[#E03B4B] text-white font-bold py-3 px-4 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FF4757] focus:ring-opacity-50 transition-colors"
      >
        CONSULTAR
      </button>
    </form>
  );
}