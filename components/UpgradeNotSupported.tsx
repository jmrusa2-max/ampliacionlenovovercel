// components/UpgradeNotSupported.tsx
'use client';

const CrossIcon = () => (
    <svg className="w-16 h-16 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  );

export default function UpgradeNotSupported() {
  return (
    <div className="text-center p-8">
      <div className="text-red-500 mb-4">
        <CrossIcon />
      </div>
      <h2 className="text-4xl sm:text-5xl font-bold mb-2">NO</h2>
      <p className="text-slate-400 text-lg">Este equipo no admite ampliaciones de RAM ni de almacenamiento.</p>
    </div>
  );
}