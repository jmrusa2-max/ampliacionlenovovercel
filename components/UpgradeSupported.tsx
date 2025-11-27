// components/UpgradeSupported.tsx
'use client';

interface UpgradeSupportedProps {
  onShowDetails: () => void;
}

const CheckIcon = () => (
    <svg className="w-16 h-16 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  );

export default function UpgradeSupported({ onShowDetails }: UpgradeSupportedProps) {
  return (
    <div className="text-center p-8">
      <div className="text-green-400 mb-4">
        <CheckIcon />
      </div>
      <h2 className="text-4xl sm:text-5xl font-bold mb-2">SÍ</h2>
      <p className="text-slate-400 text-lg mb-6">Este equipo admite ampliación de RAM y/o almacenamiento.</p>
      <button
        onClick={onShowDetails}
        className="bg-[#FF4757] hover:bg-[#E03B4B] text-white font-bold py-3 px-6 rounded-lg transition-colors text-lg shadow-lg shadow-red-900/20"
      >
        Ver más detalles
      </button>
    </div>
  );
}