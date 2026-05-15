// app/[modelo]/error.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ModeloError({ error, reset }: ErrorPageProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    console.error('[ModeloPage] Error capturado:', error);
  }, [error]);

  const handleRetry = () => {
    setIsRetrying(true);
    // Small delay for visual feedback
    setTimeout(() => {
      reset();
      setIsRetrying(false);
    }, 600);
  };

  return (
    <div className="w-full max-w-lg mx-auto text-center px-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/15 shadow-2xl p-8 sm:p-10">
        {/* Error icon */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <ExclamationTriangleIcon className="h-9 w-9 text-amber-400" />
          </div>
        </div>

        {/* Error message */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white/90 mb-3">
          Algo salió mal
        </h1>
        <p className="text-slate-400 text-base mb-8 leading-relaxed max-w-sm mx-auto">
          Hubo un problema al buscar la información del artículo. Esto puede deberse a un error de conexión o un problema temporal.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <button
            id="retry-button"
            onClick={handleRetry}
            disabled={isRetrying}
            className={`
              inline-flex items-center justify-center gap-2 px-6 py-3
              bg-[#FF4757] hover:bg-[#E03B4B] text-white font-bold
              rounded-lg transition-all duration-200 shadow-lg shadow-red-900/20
              disabled:opacity-60 disabled:cursor-not-allowed
              ${isRetrying ? '' : 'hover:scale-105 transform'}
            `}
          >
            <ArrowPathIcon className={`h-5 w-5 ${isRetrying ? 'animate-spin' : ''}`} />
            {isRetrying ? 'Reintentando...' : 'Reintentar'}
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white font-semibold rounded-lg transition-all duration-200 border border-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
            </svg>
            Ir al inicio
          </Link>
        </div>

        {/* Separator */}
        <div className="w-16 h-px bg-white/20 mx-auto mb-8" />

        {/* Search bar for trying another search */}
        <div className="mb-2">
          <p className="text-sm text-slate-300 mb-4 font-medium">O buscá otro artículo:</p>
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
