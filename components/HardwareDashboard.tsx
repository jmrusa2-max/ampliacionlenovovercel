import { motion, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

// --- Icon Components ---
const CheckIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const CrossIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// --- Helper Components ---
const AnimatedCounter = ({ to }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const controls = animate(0, to, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate(value) { setCount(Math.round(value)); }
    });
    return () => controls.stop();
  }, [to]);
  return <span className="font-mono"><motion.span>{count}</motion.span></span>;
};

const RamSlotsVisual = ({ total, occupied }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div>
      <h3 className="font-semibold text-slate-300 mb-2">Slots de Memoria</h3>
      <div 
        className="relative flex gap-2 h-8"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {Array.from({ length: total }).map((_, i) => (
          <div 
            key={i} 
            className={`relative w-full rounded ${i < occupied ? 'bg-cyan-500' : 'bg-slate-700/50 border-2 border-dashed border-slate-600'}`}
            onMouseEnter={() => setHoveredIndex(i)}
          />
        ))}
        {hoveredIndex !== null && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 rounded-md shadow-lg text-sm whitespace-nowrap">
            Slot {hoveredIndex + 1}: {hoveredIndex < occupied ? 'Ocupado' : 'Libre'}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Component ---
export default function HardwareDashboard({ product }) {
  const ramSupport = product.Soporta_RAM?.toUpperCase() === 'SI';
  const storageSupport = product.Soporta_Almacenamiento?.toUpperCase() === 'SI';

  const totalRamSlots = parseInt(product.Slots_RAM, 10) || 0;
  const occupiedRamSlots = product.ram_slots_ocupados || 0;
  const maxRam = parseInt(product.RAM_Max_GB, 10) || 0;

  return (
    <motion.div 
      className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl shadow-cyan-500/5 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="p-6 text-center border-b border-slate-700">
        <h1 className="text-3xl font-bold text-white">{product.Marca}</h1>
        <p className="text-slate-400 text-lg">{product.Modelo}</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-slate-700">
        
        {/* RAM Panel */}
        <div className="bg-slate-800/80 p-6 flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-white">Memoria RAM</h2>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${ramSupport ? 'bg-green-500/10 text-green-400 animate-pulse-green' : 'bg-red-500/10 text-red-400'}`}>
              {ramSupport ? <CheckIcon /> : <CrossIcon />}
            </div>
            <span className={`text-2xl font-bold ${ramSupport ? 'text-green-400' : 'text-red-400'}`}>{ramSupport ? 'Ampliable' : 'No Ampliable'}</span>
          </div>

          {ramSupport ? (
            <>
              <RamSlotsVisual total={totalRamSlots} occupied={occupiedRamSlots} />
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-slate-300">Capacidad Máxima</h3>
                  <p className="text-lg font-semibold text-white"><AnimatedCounter to={maxRam} /> GB</p>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
                  <motion.div 
                    className="h-4 rounded-full bg-gradient-to-r from-green-500 to-cyan-500"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
              <p className="text-slate-400 text-center min-h-[40px]">Este equipo tiene slots disponibles para expansión.</p>
            </>
          ) : (
            <p className="text-slate-400 text-center min-h-[40px] pt-6">La memoria viene soldada en placa y no puede ser modificada.</p>
          )}
        </div>

        {/* Storage Panel */}
        <div className="bg-slate-800/80 p-6 flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-white">Almacenamiento</h2>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${storageSupport ? 'bg-green-500/10 text-green-400 animate-pulse-green' : 'bg-red-500/10 text-red-400'}`}>
              {storageSupport ? <CheckIcon /> : <CrossIcon />}
            </div>
            <span className={`text-2xl font-bold ${storageSupport ? 'text-green-400' : 'text-red-400'}`}>{storageSupport ? 'Ampliable' : 'No Ampliable'}</span>
          </div>

          {storageSupport ? (
            <>
              <div>
                <h3 className="font-semibold text-slate-300 mb-2">Tipo de Conexión Principal</h3>
                <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                  <p className="font-mono text-lg text-cyan-300">{product.Tipo_Almacenamiento}</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-slate-300">Capacidad Máxima</h3>
                  <p className="font-mono text-lg font-semibold text-white">{product.Almacenamiento_Maximo_Total}</p>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
                  <motion.div 
                    className="h-4 rounded-full bg-gradient-to-r from-green-500 to-cyan-500"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
              <p className="text-slate-400 text-center min-h-[40px]">Es posible cambiar o añadir unidades de almacenamiento.</p>
            </>
          ) : (
            <p className="text-slate-400 text-center min-h-[40px] pt-6">El almacenamiento está integrado y no puede ser modificado.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}