import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Clock, 
  Radio, 
  Satellite, 
  AlertOctagon, 
  MapPin,
  Volume2,
  VolumeX,
  RefreshCw
} from 'lucide-react';
import type { LandslideLocation } from '../../data/landslideLocations';

import { 
  type SupportedLanguage, 
  LANGUAGE_CONFIGS 
} from '../../utils/speech';

interface TopHeaderProps {
  locations: LandslideLocation[];
  selectedLocation: LandslideLocation;
  onSelectLocation: (loc: LandslideLocation) => void;
  audioActive: boolean;
  onToggleAudio: () => void;
  currentLanguage?: SupportedLanguage;
  onChangeLanguage?: (lang: SupportedLanguage) => void;
  seniorMode?: boolean;
  onToggleSeniorMode?: () => void;
  onTriggerVoice?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
  audioActive,
  onToggleAudio,
  currentLanguage = 'ta',
  onChangeLanguage,
  seniorMode = false,
  onToggleSeniorMode,
  onTriggerVoice
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format: 15 Sep 2026, 19:30:45 IST
      const timeStr = now.toLocaleTimeString('en-IN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      const dateStr = now.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      setCurrentTime(`${dateStr} | ${timeStr} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Count alerts
  const criticalCount = locations.filter(l => l.riskLevel === 'Critical').length;
  const highCount = locations.filter(l => l.riskLevel === 'High').length;

  return (
    <header className="w-full bg-[#030712] border-b border-[#1f293d] shadow-2xl relative z-30">
      {/* Top Banner Stripe */}
      <div className="bg-gradient-to-r from-red-950/60 via-cyan-950/40 to-slate-950 px-4 py-1.5 flex flex-wrap items-center justify-between border-b border-[#1a253a] text-[11px] gap-2">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-slate-300">
          <span className="flex items-center space-x-1.5 font-semibold tracking-wider text-cyan-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono">ISRO-BHUVAN & NDRF EARLY WARNING LINK</span>
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline font-mono">
            SATELLITE INSAR TELEMETRY: SYNCED
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          {/* SIH Judging Demo Mode Badge */}
          <span className="px-2.5 py-0.5 rounded bg-yellow-400 text-black font-extrabold font-mono text-[10px] tracking-wide shadow-sm flex items-center space-x-1 border border-yellow-300">
            <span>PROTOTYPE - Demo Mode | Data: Live API + Simulated Sensors</span>
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Language Selector in Header */}
          {onChangeLanguage && (
            <div className="flex items-center bg-[#070e1c] p-0.5 rounded-lg border border-[#1d2d4c]">
              {(['ta', 'ml', 'hi', 'en'] as SupportedLanguage[]).map((code) => {
                const conf = LANGUAGE_CONFIGS[code];
                const active = currentLanguage === code;
                return (
                  <button
                    key={code}
                    onClick={() => onChangeLanguage(code)}
                    className={`px-1.5 py-0.5 text-[10px] font-mono font-bold rounded transition-all ${
                      active
                        ? 'bg-cyan-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title={conf.name}
                  >
                    {conf.nativeName}
                  </button>
                );
              })}
            </div>
          )}

          {/* Senior Citizen Mode Header Pill */}
          {onToggleSeniorMode && (
            <button
              onClick={onToggleSeniorMode}
              className={`flex items-center space-x-1 text-[10px] font-mono px-2 py-0.5 rounded transition-all border font-bold ${
                seniorMode 
                  ? 'bg-amber-500 text-black border-amber-300 shadow-md animate-pulse' 
                  : 'bg-[#0f172a] text-amber-300 border-amber-600/40 hover:bg-[#182645]'
              }`}
              title="Toggle Senior Citizen Mode"
            >
              <span>{seniorMode ? '👴 SENIOR ON' : '👴 SENIOR'}</span>
            </button>
          )}

          <div className="flex items-center space-x-2 text-[10px] font-mono">
            <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800/80 font-bold flex items-center space-x-1">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
              <span>CRITICAL: {criticalCount}</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-orange-950 text-orange-400 border border-orange-800/80 font-bold hidden sm:inline-block">
              HIGH: {highCount}
            </span>
          </div>

          <button
            onClick={onToggleAudio}
            className={`flex items-center space-x-1 text-[11px] font-mono px-2 py-0.5 rounded transition-all border ${
              audioActive 
                ? 'bg-red-900/60 text-red-300 border-red-500 animate-pulse' 
                : 'bg-[#0f172a] text-slate-400 border-[#334155] hover:text-slate-200'
            }`}
            title="Toggle Audio Siren System"
          >
            {audioActive ? <Volume2 className="w-3 h-3 text-red-400" /> : <VolumeX className="w-3 h-3" />}
            <span className="hidden md:inline">{audioActive ? 'SIREN ON' : 'AUDIO MUTE'}</span>
          </button>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="px-4 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Title: TerraSence - AI-Based Flash Flood & Landslide Early Warning for Hilly Regions */}
        <div className="flex items-center space-x-3">
          {/* Logo / Badge */}
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-red-600 via-rose-700 to-amber-600 p-[1px] shadow-lg shadow-red-950/50 flex items-center justify-center shrink-0">
            <div className="h-full w-full bg-[#070b14] rounded-xl flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-red-500 animate-pulse" />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-baseline gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center">
                TerraSence
                <span className="ml-2 text-xs font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-700/60">
                  DISASTER MANAGEMENT
                </span>
              </h1>
              <span className="text-slate-500 hidden md:inline">|</span>
              <p className="text-xs sm:text-sm font-semibold text-cyan-300 tracking-wide">
                AI-Based Flash Flood & Landslide Early Warning for Hilly Regions
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5 text-[11px] text-slate-400 font-mono">
              <span className="text-slate-300 font-medium">
                Real-time Heavy Rainfall, Water Level & Terrain Monitoring for Hilly Regions
              </span>
              <span className="text-cyan-400 font-semibold flex items-center space-x-1">
                <Satellite className="w-3 h-3 inline text-cyan-400" />
                <span>SIH26192 • MINISTRY OF HOME AFFAIRS</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Header Side: Current Time & Quick Location Switcher */}
        <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3">
          {/* Quick Location Pills */}
          <div className="flex items-center space-x-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {locations.map((loc) => {
              const isSelected = loc.id === selectedLocation.id;
              const colorDot = 
                loc.riskLevel === 'Critical' ? 'bg-red-500' :
                loc.riskLevel === 'High' ? 'bg-orange-500' :
                loc.riskLevel === 'Medium' ? 'bg-yellow-400' : 'bg-emerald-400';

              return (
                <button
                  key={loc.id}
                  onClick={() => onSelectLocation(loc)}
                  className={`flex items-center space-x-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-all border font-mono ${
                    isSelected
                      ? 'bg-[#1a2b4c] text-white border-cyan-400 shadow-md shadow-cyan-950/80'
                      : 'bg-[#090e1a] text-slate-400 border-[#1f293d] hover:bg-[#121c32] hover:text-slate-200'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${colorDot} ${loc.riskLevel === 'Critical' ? 'animate-ping' : ''}`}></span>
                  <span>{loc.name}</span>
                  <span className="text-[10px] opacity-75 hidden sm:inline">({loc.riskLevel})</span>
                </button>
              );
            })}
          </div>

          {/* Current Time Display */}
          <div className="flex items-center space-x-2 bg-[#090f1d] border border-[#1e293b] px-3.5 py-1.5 rounded-xl text-xs font-mono shadow-inner text-right">
            <Clock className="w-4 h-4 text-cyan-400 animate-spin-slow" />
            <div>
              <span className="text-[10px] text-slate-500 block leading-tight uppercase font-semibold">
                SYSTEM TIME (IST)
              </span>
              <span className="text-cyan-300 font-bold tracking-wider">
                {currentTime || 'SYNCHRONIZING...'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
