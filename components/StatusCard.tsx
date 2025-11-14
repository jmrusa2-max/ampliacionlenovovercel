// components/StatusCard.tsx
import { CheckIcon } from './icons/CheckIcon';
import { XIcon } from './icons/XIcon';

interface StatusCardProps {
  type: 'RAM' | 'Almacenamiento';
  isSupported: boolean;
}

export default function StatusCard({ type, isSupported }: StatusCardProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-slate-800 p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-slate-200 mb-4">{type}</h2>
      {isSupported ? <CheckIcon /> : <XIcon />}
      <p className={`mt-4 text-2xl font-bold ${isSupported ? 'text-green-400' : 'text-red-400'}`}>
        {isSupported ? 'SÍ' : 'NO'}
      </p>
      <p className="text-slate-400 text-center mt-1">
        Soporta ampliación
      </p>
    </div>
  );
}