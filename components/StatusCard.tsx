// components/StatusCard.tsx
import { CheckIcon } from './icons/CheckIcon';
import { XIcon } from './icons/XIcon';

interface StatusCardProps {
  type: 'RAM' | 'Almacenamiento';
  isSupported: boolean;
}

export default function StatusCard({ type, isSupported }: StatusCardProps) {
  return (
    <div
      className={`status-card flex flex-col items-center justify-center rounded-lg p-6 shadow-lg ${
        isSupported
          ? 'status-card-supported animate-pulse-glow'
          : 'status-card-not-supported animate-pulse-glow-red'
      }`}
    >
      <h2 className="text-xl font-semibold text-slate-200 mb-4">{type}</h2>
      <div className={isSupported ? 'animate-icon-pulse' : 'animate-gentle-shake'}>
        {isSupported ? <CheckIcon /> : <XIcon />}
      </div>
      <p className={`mt-4 text-2xl font-bold ${isSupported ? 'text-green-400' : 'text-red-400'}`}>
        {isSupported ? 'SÍ' : 'NO'}
      </p>
      <p className="text-slate-400 text-center mt-1">
        Soporta ampliación
      </p>
    </div>
  );
}