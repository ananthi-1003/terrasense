import React from 'react';
import { Info, ShieldAlert } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <footer className="bg-[#070b16] border-t border-[#16233d] px-4 py-3 text-center text-xs text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center space-x-2 text-slate-400">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-[11px] leading-relaxed text-left text-yellow-300">
            <strong>Disclaimer:</strong> This is a software prototype for SIH26192. Sensor values are simulated. Target Accuracy ∼75-80% after training, Target Resolution Village Level, Target Cost ~₹5000-8000/node. These are estimates, not claims.
          </span>
        </div>
        <div className="flex items-center space-x-2 shrink-0 text-[11px] text-slate-400">
          <ShieldAlert className="w-3.5 h-3.5 text-cyan-500" />
          <span>North Eastern Region (NER) Geospatial Grid</span>
        </div>
      </div>
    </footer>
  );
};
