// components/SearchBar.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { MagnifyingGlassIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const MIN_QUERY_LENGTH = 3;

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();

    if (trimmed.length < MIN_QUERY_LENGTH) {
      setError(`Ingresá al menos ${MIN_QUERY_LENGTH} caracteres para buscar.`);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setError('');
    router.push(`/${encodeURIComponent(trimmed)}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    // Clear error as soon as user reaches the minimum length
    if (error && value.trim().length >= MIN_QUERY_LENGTH) {
      setError('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md mx-auto">
      {/* Input container with search icon */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id="search-input"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Ingresa el número de artículo o SKU"
          aria-describedby={error ? 'search-error' : undefined}
          aria-invalid={error ? 'true' : 'false'}
          className={`
            w-full pl-11 pr-4 py-3 rounded-md shadow-lg
            focus:outline-none focus:ring-2
            bg-white/90 backdrop-blur-sm text-gray-900 placeholder:text-gray-500
            transition-all duration-200
            ${error
              ? 'ring-2 ring-red-500/70 focus:ring-red-500'
              : 'focus:ring-[#FF4757]'
            }
            ${shake ? 'animate-[shake_0.4s_ease-in-out]' : ''}
          `}
        />
      </div>

      {/* Inline error message */}
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${error ? 'max-h-16 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}
        `}
      >
        <p
          id="search-error"
          role="alert"
          className="flex items-center gap-1.5 text-red-400 text-sm font-medium px-1"
        >
          <ExclamationCircleIcon className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </p>
      </div>

      <button
        id="search-button"
        type="submit"
        className="mt-4 w-full bg-[#FF4757] hover:bg-[#E03B4B] text-white font-bold py-3 px-4 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FF4757] focus:ring-opacity-50 transition-colors"
      >
        CONSULTAR
      </button>
    </form>
  );
}