import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toast } = useSimulation();

  if (!toast) return null;

  const icons = {
    info: <Info className="w-5 h-5 text-cyan-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    danger: <XCircle className="w-5 h-5 text-red-400 shrink-0" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
  };

  const borders = {
    info: 'border-cyan-500/50 bg-[#0c1830] text-cyan-100',
    warning: 'border-amber-500/50 bg-[#291b05] text-amber-100',
    danger: 'border-red-500/50 bg-[#2b0c10] text-red-100 shadow-red-900/30',
    success: 'border-emerald-500/50 bg-[#0a2419] text-emerald-100'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-bounce-short">
      <div className={`p-4 rounded-xl border shadow-2xl flex items-start space-x-3 backdrop-blur-md ${borders[toast.type]}`}>
        {icons[toast.type]}
        <div className="flex-1">
          <h4 className="text-xs font-bold uppercase tracking-wider">{toast.title}</h4>
          <p className="text-xs mt-0.5 opacity-90 leading-snug">{toast.message}</p>
        </div>
      </div>
    </div>
  );
};
