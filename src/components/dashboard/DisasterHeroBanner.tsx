import React from 'react';
import { 
  ShieldAlert, 
  CloudRain, 
  Waves, 
  Radio, 
  Activity, 
  AlertTriangle, 
  Satellite, 
  Building2, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Info,
  Compass
} from 'lucide-react';
import type { LandslideLocation } from '../../data/landslideLocations';

interface DisasterHeroBannerProps {
  selectedLocation: LandslideLocation;
  audioActive: boolean;
  onToggleAudio: () => void;
  onSelectLocation?: (loc: LandslideLocation) => void;
}

export const DisasterHeroBanner: React.FC<DisasterHeroBannerProps> = ({
  selectedLocation,
  audioActive,
  onToggleAudio
}) => {
  return (
    <section className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#070c18] via-[#091224] to-[#040813] border border-[#1b2b4d] shadow-2xl p-4 sm:p-5 lg:p-6 mb-2">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none -mb-20"></div>
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 via-amber-400 via-cyan-400 to-blue-500"></div>

      <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-5">
        {/* Left Side: Title & Subtitle + MHA Disaster Management Hierarchy */}
        <div className="flex-1 space-y-2.5">
          {/* Government / Ministry of Home Affairs Header Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-[#0e1b38] border border-cyan-500/40 text-[10px] font-mono font-bold text-cyan-300 tracking-wider uppercase shadow-inner">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>MINISTRY OF HOME AFFAIRS (MHA) &bull; GOVT. OF INDIA</span>
            </span>

            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-red-950/80 border border-red-600/60 text-[10px] font-mono font-bold text-red-300 tracking-wider uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping"></span>
              <span>SIH26192 FLASH FLOOD NOWCASTING</span>
            </span>

            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-amber-950/70 border border-amber-600/50 text-[10px] font-mono font-bold text-amber-300 tracking-wider uppercase">
              <span>DISASTER MANAGEMENT THEME</span>
            </span>
          </div>

          {/* Main Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              TerraSence - AI-Based Flash Flood & Landslide Early Warning for Hilly Regions
            </h1>
            {/* Subtitle */}
            <p className="text-sm sm:text-base font-semibold text-cyan-300/90 mt-1 tracking-wide">
              Real-time Heavy Rainfall, Water Level & Terrain Monitoring for Hilly Regions
            </p>
          </div>

          {/* Tactical Context Meta */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-xs text-slate-300 font-mono">
            <div className="flex items-center space-x-1.5">
              <span className="text-slate-400">Target Hilly Basin:</span>
              <span className="text-white font-bold bg-[#111e3b] px-2 py-0.5 rounded border border-[#21355e]">
                {selectedLocation.name} ({selectedLocation.district}, {selectedLocation.state})
              </span>
            </div>

            <div className="flex items-center space-x-1.5">
              <span className="text-slate-400">River Catchment Elevation:</span>
              <span className="text-cyan-300 font-bold">{selectedLocation.elevation}</span>
            </div>

            <div className="flex items-center space-x-1.5">
              <span className="text-slate-400">Precursor State:</span>
              <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                selectedLocation.riskLevel === 'Critical' ? 'bg-red-950 text-red-300 border border-red-600 animate-pulse' :
                selectedLocation.riskLevel === 'High' ? 'bg-orange-950 text-orange-300 border border-orange-600' :
                'bg-emerald-950 text-emerald-300 border border-emerald-600'
              }`}>
                {selectedLocation.riskLevel.toUpperCase()} HAZARD
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Disaster Management Quick Metric Badges & Emergency Command */}
        <div className="shrink-0 flex flex-col sm:flex-row xl:flex-col items-stretch sm:items-center xl:items-end justify-between gap-3">
          {/* Live Status Ribbon Card */}
          <div className="bg-[#0b1428] border border-[#1f335b] rounded-xl p-3 shadow-inner flex items-center space-x-3 text-xs font-mono">
            <div className="p-2 rounded-lg bg-red-950/80 border border-red-600 text-red-400 shrink-0">
              <Waves className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                Flash Flood Inundation Window
              </div>
              <div className="text-sm font-black text-red-400 flex items-center space-x-1.5">
                <span>+25 to 40 MIN NOWCAST</span>
                <span className="h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
              </div>
              <div className="text-[10px] text-cyan-300 mt-0.5">
                Khasi Hills Basin &bull; Discharge Surge Rate: +14.2 m&sup3;/s&sup2;
              </div>
            </div>
          </div>

          {/* Quick Siren System Action */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onToggleAudio}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 transition-all border shadow-lg ${
                audioActive
                  ? 'bg-red-900 text-white border-red-500 animate-pulse shadow-red-950/80'
                  : 'bg-[#101b33] hover:bg-[#18284d] text-slate-200 border-[#223963]'
              }`}
            >
              <Radio className={`w-4 h-4 ${audioActive ? 'text-red-400 animate-spin' : 'text-slate-400'}`} />
              <span>{audioActive ? 'SIREN ACTIVE (DEMO)' : 'Activate Siren (Demo)'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
