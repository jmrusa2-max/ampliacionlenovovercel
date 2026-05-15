// components/SearchBar.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) {
      setError('Ingresa un código de artículo');
      return;
    }

    if (trimmed.length < 3) {
      setError('El código debe tener al menos 3 caracteres');
      return;
    }

    setError('');
    router.push(`/${encodeURIComponent(trimmed)}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (error) setError('');
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md mx-auto">
      <div className="search-container rounded-xl overflow-hidden">
        <div className="relative flex items-center">
          <MagnifyingGlassIcon className="absolute left-4 h-5 w-5 text-gray-400 pointer-events-none" />
          <input
            id="search-input"
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Ingresa el número de artículo o SKU"
            className="w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-sm text-white placeholder:text-gray-400 focus:outline-none border-b border-white/10 focus:border-transparent transition-colors"
          />
        </div>
        <button
          id="search-button"
          type="submit"
          className="w-full bg-[#FF4757] hover:bg-[#E03B4B] text-white font-bold py-3.5 px-4 focus:outline-none transition-colors flex items-center justify-center gap-2"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
          CONSULTAR
        </button>
      </div>
      {error && (
        <p className="mt-3 text-sm text-[#FF4757] animate-fade-in-up flex items-center justify-center gap-1">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          {error}
        </p>
      )}
    </form>
  );
}