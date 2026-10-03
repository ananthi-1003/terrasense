import React, { useState } from 'react';
import { 
  Route, 
  ShieldCheck, 
  AlertTriangle, 
  Navigation, 
  MapPin, 
  ArrowRight, 
  RefreshCw, 
  X, 
  CheckCircle2, 
  CornerDownRight,
  Compass,
  Zap,
  Info
} from 'lucide-react';
import { 
  PRESET_ROUTES, 
  type PresetRoute, 
  type RouteCalculationResult, 
  type DangerZone 
} from '../../utils/routing';
import type { LandslideLocation } from '../../data/landslideLocations';

interface SafeRouteFinderProps {
  locations: LandslideLocation[];
  onCalculateRoute: (start: [number, number], end: [number, number], startName: string, endName: string) => void;
  onClearRoute: () => void;
  routeResult: RouteCalculationResult | null;
  isLoading: boolean;
  activeRouteName: { start: string; end: string } | null;
  isMapPickingMode: boolean;
  onToggleMapPickMode: () => void;
  seniorMode: boolean;
}

export const SafeRouteFinder: React.FC<SafeRouteFinderProps> = ({
  locations,
  onCalculateRoute,
  onClearRoute,
  routeResult,
  isLoading,
  activeRouteName,
  isMapPickingMode,
  onToggleMapPickMode,
  seniorMode
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(PRESET_ROUTES[0].id);
  const [customStartId, setCustomStartId] = useState<string>('guwahati');
  const [customEndId, setCustomEndId] = useState<string>('cherapunji');

  // Available points from locations + major hubs
  const hubOptions = [
    { id: 'guwahati', name: 'Guwahati Transit Hub', coords: [26.1445, 91.7362] as [number, number] },
    { id: 'shillong', name: 'Shillong HQ Base', coords: [25.5788, 91.8933] as [number, number] },
    { id: 'tezpur', name: 'Tezpur Staging Base', coords: [26.6528, 92.7926] as [number, number] },
    { id: 'silchar', name: 'Silchar Valley Depot', coords: [24.8333, 92.7789] as [number, number] },
    { id: 'dimapur', name: 'Dimapur Logistics Center', coords: [25.9060, 93.7270] as [number, number] },
    ...locations.map(l => ({
      id: l.id,
      name: `${l.name} (${l.riskLevel} Risk)`,
      coords: [l.lat, l.lng] as [number, number]
    }))
  ];

  const handleApplyPreset = (preset: PresetRoute) => {
    setSelectedPresetId(preset.id);
    onCalculateRoute(preset.start.coords, preset.end.coords, preset.start.name, preset.end.name);
  };

  const handleApplyCustom = () => {
    const s = hubOptions.find(h => h.id === customStartId);
    const e = hubOptions.find(h => h.id === customEndId);
    if (s && e) {
      onCalculateRoute(s.coords, e.coords, s.name, e.name);
    }
  };

  return (
    <div className={`bg-[#050b18]/95 backdrop-blur-md rounded-2xl border border-cyan-500/40 p-3 sm:p-4 shadow-2xl ${
      seniorMode ? 'text-base' : 'text-xs'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1c2d52] pb-2.5 mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-400">
            <Route className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-800/50">
                FEATURE 1 // SAFE ROOT FINDER
              </span>
              <span className="text-[10px] font-mono text-cyan-400 font-semibold hidden sm:inline">
                OpenStreetMap OSRM Engine
              </span>
            </div>
            <h3 className={`font-black text-white tracking-tight ${seniorMode ? 'text-lg' : 'text-sm'}`}>
              Safe Landslide-Avoidance Route Calculator
            </h3>
          </div>
        </div>

        {routeResult && (
          <button
            onClick={onClearRoute}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-[#142038] hover:bg-[#1e2f50] text-slate-300 hover:text-white border border-[#2b3e66] transition-all font-mono text-xs"
            title="Clear Route Lines"
          >
            <X className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">Clear Route</span>
          </button>
        )}
      </div>

      {/* Preset Quick Selection Buttons */}
      <div className="mb-3">
        <div className="text-[10px] font-mono text-slate-400 font-semibold mb-1.5 uppercase">
          Quick Strategic Evacuation Corridors:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5">
          {PRESET_ROUTES.slice(0, 3).map((p) => {
            const isCurrent = activeRouteName?.start === p.start.name && activeRouteName?.end === p.end.name;
            return (
              <button
                key={p.id}
                onClick={() => handleApplyPreset(p)}
                disabled={isLoading}
                className={`text-left p-2 rounded-xl border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-[#102340] border-emerald-400 text-white shadow-md'
                    : 'bg-[#091122] border-[#1b2b4b] text-slate-300 hover:bg-[#121f3a] hover:border-cyan-500/50'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-bold text-[11px] text-cyan-300 truncate">{p.name}</span>
                  {isCurrent && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />}
                </div>
                <div className="flex items-center space-x-1 text-[10px] font-mono text-slate-400 truncate">
                  <span>{p.start.name.split(' ')[0]}</span>
                  <ArrowRight className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
                  <span>{p.end.name.split(' ')[0]}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Origin & Destination Selectors */}
      <div className="bg-[#081020] border border-[#1a2b4d] rounded-xl p-2.5 mb-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
          {/* Origin */}
          <div className="sm:col-span-5 flex items-center space-x-2 bg-[#040914] px-2.5 py-1.5 rounded-lg border border-[#1f3156]">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="block text-[9px] font-mono text-slate-400 font-bold uppercase">ORIGIN (START)</label>
              <select
                value={customStartId}
                onChange={(e) => setCustomStartId(e.target.value)}
                className="w-full bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer truncate"
              >
                {hubOptions.map(h => (
                  <option key={`start-${h.id}`} value={h.id} className="bg-[#0b1426] text-white">
                    {h.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Arrow */}
          <div className="sm:col-span-2 flex justify-center">
            <div className="p-1 rounded-full bg-[#111f38] border border-[#23385e] text-cyan-400">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Destination */}
          <div className="sm:col-span-5 flex items-center space-x-2 bg-[#040914] px-2.5 py-1.5 rounded-lg border border-[#1f3156]">
            <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="block text-[9px] font-mono text-slate-400 font-bold uppercase">DESTINATION (END)</label>
              <select
                value={customEndId}
                onChange={(e) => setCustomEndId(e.target.value)}
                className="w-full bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer truncate"
              >
                {hubOptions.map(h => (
                  <option key={`end-${h.id}`} value={h.id} className="bg-[#0b1426] text-white">
                    {h.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-2.5 pt-2 border-t border-[#162544]">
          <button
            onClick={onToggleMapPickMode}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-mono text-xs transition-all border ${
              isMapPickingMode
                ? 'bg-amber-500 text-black border-amber-400 font-bold animate-pulse'
                : 'bg-[#0f1b34] text-slate-300 border-[#22365c] hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isMapPickingMode ? 'Click 2 Points on Map...' : 'Pick Points on Map'}</span>
          </button>

          <button
            onClick={handleApplyCustom}
            disabled={isLoading || customStartId === customEndId}
            className={`flex items-center space-x-2 rounded-xl font-bold font-mono transition-all ${
              seniorMode ? 'px-5 py-2.5 text-sm sm:text-base' : 'px-4 py-1.5 text-xs'
            } ${
              isLoading || customStartId === customEndId
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-lg shadow-emerald-950/70 border border-emerald-400'
            }`}
          >
            {isLoading ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <ShieldCheck className="w-4 h-4" />
            )}
            <span>{isLoading ? 'CALCULATING OSM ROUTE...' : 'CALCULATE SAFE ROUTE'}</span>
          </button>
        </div>
      </div>

      {/* Route Results Display: GREEN Safe vs RED Dangerous with Warning */}
      {routeResult && (
        <div className="space-y-2 mt-3 animate-fadeIn">
          {/* 1. GREEN SAFE ROUTE RESULT */}
          <div className="bg-emerald-950/70 border-2 border-emerald-500 rounded-xl p-3 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            <div className="flex items-start space-x-2.5">
              <div className="p-1.5 rounded-xl bg-emerald-900 border border-emerald-400 text-emerald-300 shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-black text-emerald-300 tracking-wide uppercase text-xs font-mono bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-400">
                    SAFE ROUTE (GREEN LINE)
                  </span>
                  <span className="text-[11px] font-mono text-emerald-200">
                    {routeResult.safeRoute.distanceKm} km &bull; ~{routeResult.safeRoute.durationMin} min
                  </span>
                </div>
                <p className={`font-bold text-white mt-1 ${seniorMode ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'}`}>
                  {routeResult.safeRoute.summary}
                </p>
                <p className="text-[10px] font-mono text-emerald-300 mt-0.5">
                  Route verified by Geo-Topographic clearance analysis against all active red danger perimeters.
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-500 text-black font-mono font-black text-xs">
                PASSED SAFE
              </span>
            </div>
          </div>

          {/* 2. RED DANGEROUS ROUTE WARNING (If direct route crosses red danger zones) */}
          {routeResult.dangerousRoute && (
            <div className="bg-red-950/80 border-2 border-red-600 rounded-xl p-3 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 animate-pulse">
              <div className="flex items-start space-x-2.5">
                <div className="p-1.5 rounded-xl bg-red-900 border border-red-500 text-red-300 shrink-0 mt-0.5">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-black text-red-300 tracking-wide uppercase text-xs font-mono bg-red-900/90 px-2 py-0.5 rounded border border-red-500">
                      DANGEROUS ROUTE (RED LINE)
                    </span>
                    <span className="text-[11px] font-mono text-red-300">
                      {routeResult.dangerousRoute.distanceKm} km &bull; High Risk
                    </span>
                  </div>
                  <p className={`font-bold text-red-200 mt-1 ${seniorMode ? 'text-sm sm:text-base' : 'text-xs'}`}>
                    {routeResult.dangerousRoute.warningText}
                  </p>
                  <p className="text-[10px] font-mono text-red-400 mt-0.5">
                    DO NOT USE DIRECT HIGHWAY: Roadbed instability & landslide debris risk detected.
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-red-600 text-white font-mono font-black text-xs shadow-md">
                  AVOID CORRIDOR
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
