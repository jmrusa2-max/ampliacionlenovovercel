// components/SearchBar.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Simply redirect to the SKU page. The page itself will handle
      // fetching the data and showing a 404 if not found.
      router.push(`/${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ingresa el número de artículo o SKU"
        className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-200 placeholder:text-slate-400"
      />
    </form>
  );
}