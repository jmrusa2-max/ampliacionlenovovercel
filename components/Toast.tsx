// components/Toast.tsx
'use client';

import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  show: boolean;
  onDone: () => void;
}

export default function Toast({ message, show, onDone }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onDone();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onDone]);

  if (!visible) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-toast">
      <div className="bg-slate-800/90 backdrop-blur-lg border border-white/10 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2">
        <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}
