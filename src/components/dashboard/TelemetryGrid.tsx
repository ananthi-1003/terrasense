import React, { useEffect, useRef, useState } from 'react';
import { 
  CloudRain, 
  Droplets, 
  Activity, 
  Mountain, 
  Radio, 
  Clock, 
  TrendingUp,
  Gauge,
  Wifi,
  ShieldCheck,
  AlertTriangle,
  Waves
} from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

/** Animates a number from `from` to `to` over `durationMs` using rAF */
function useAnimatedValue(target: number, durationMs = 600): number {
  const [displayed, setDisplayed] = useState(target);
  const fromRef = useRef(target);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const from = fromRef.current;
    if (from === target) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startRef.current = null;

    const animate = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / durationMs, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (target - from) * eased;
      setDisplayed(Math.round(current * 100) / 100);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        fromRef.current = target;
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, durationMs]);

  return displayed;
}

export interface TelemetryGridProps {
  rainfallIntensityVal?: string;
  rainfallStatus?: string;
  waterLevelVal?: string;
  waterLevelStatus?: string;
  soilMoistureVal?: number;
  vibrationVal?: string;
  slopeVal?: string;
  dischargeVal?: string;
}

export const TelemetryGrid: React.FC<TelemetryGridProps> = ({
  rainfallIntensityVal = '85 mm/hr',
  rainfallStatus = 'Heavy Rainfall Alert',
  waterLevelVal = '3.2m / 4.0m',
  waterLevelStatus = 'DANGER - Overflow Risk',
  soilMoistureVal,
  vibrationVal,
  slopeVal,
  dischargeVal = '1,240 m³/s'
}) => {
  // Gracefully handle whether simulation context exists or not
  let simData: any = null;
  try {
    simData = useSimulation();
  } catch (e) {
    // context not present, fallback safely
  }

  const telemetry = simData?.telemetry || {
    rainfallMm: 85,
    rainfallIntensity: 'Heavy',
    soilMoisturePercent: soilMoistureVal ?? 92,
    groundVibration: vibrationVal ?? '0.38 mm/s Baseline FFT',
    slopeCondition: slopeVal ?? 'Critical Scarp (42.5°)',
    activeNodesCount: 8,
    totalNodesCount: 8,
    lastUpdateSecondsAgo: 3
  };

  const animRainfall = useAnimatedValue(telemetry.rainfallMm, 700);
  const animMoisture = useAnimatedValue(telemetry.soilMoisturePercent, 700);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
      {/* 1. Rainfall Intensity (NEW LIVE DATA CARD 1 - Blue) */}
      <div className="tactical-card rounded-xl p-3.5 shadow-tactical border border-blue-500/50 hover:border-blue-400 transition-all flex flex-col justify-between group bg-gradient-to-b from-[#0a1836] to-[#070e22] relative overflow-hidden">
        <div className="absolute top-0 right-0 left-0 h-[2px] bg-blue-500 shadow-glow-cyan"></div>
        <div>
          <div className="flex items-center justify-between text-slate-300 mb-1">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 flex items-center space-x-1">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-ping"></span>
                <span>Rainfall Intensity</span>
              </span>
              <span className="text-[10px] text-blue-300/90 font-mono block font-medium">
                (Live via Open-Meteo API)
              </span>
            </div>
            <div className="p-1.5 rounded-lg bg-blue-950 text-blue-400 border border-blue-600/50 group-hover:scale-110 transition-transform shadow-inner">
              <CloudRain className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1 mt-0.5">
            <span className="text-2xl font-black font-mono text-white tracking-tight">
              {rainfallIntensityVal}
            </span>
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-[#182952]">
          {/* Mini dynamic rainfall visualizer */}
          <div className="flex items-end gap-1 h-3.5 mb-1.5 opacity-90">
            {[45, 75, 55, 90, 65, 100, 85, 95].map((h, i) => (
              <div 
                key={i} 
                className="flex-1 bg-blue-500 rounded-t-sm transition-all duration-300"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-slate-400">Status:</span>
            <span className="font-bold text-blue-300 px-1.5 py-0.5 bg-blue-950/80 rounded border border-blue-700/60 uppercase">
              {rainfallStatus}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Water Level / River Gauge (NEW LIVE DATA CARD 2 - Red) */}
      <div className="tactical-card rounded-xl p-3.5 shadow-tactical border border-red-500/70 hover:border-red-400 transition-all flex flex-col justify-between group bg-gradient-to-b from-[#240a12] via-[#17060c] to-[#0b0307] relative overflow-hidden">
        <div className="absolute top-0 right-0 left-0 h-[2px] bg-red-500 shadow-glow-red animate-pulse"></div>
        <div>
          <div className="flex items-center justify-between text-slate-300 mb-1">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-300 flex items-center space-x-1">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping"></span>
                <span>Water Level / Gauge</span>
              </span>
              <span className="text-[10px] text-red-300/90 font-mono block font-medium">
                (Simulated - Demo Mode)
              </span>
            </div>
            <div className="p-1.5 rounded-lg bg-red-950 text-red-400 border border-red-600/70 group-hover:scale-110 transition-transform shadow-inner">
              <Waves className="w-4 h-4 text-red-400 animate-bounce" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1 mt-0.5">
            <span className="text-2xl font-black font-mono text-red-100 tracking-tight">
              {waterLevelVal}
            </span>
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-red-950/80">
          {/* Gauge fill bar */}
          <div className="w-full bg-[#380e1a] rounded-full h-2 overflow-hidden mb-1.5">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 shadow-glow-red"
              style={{ width: '80%' }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-slate-400">Flood Status:</span>
            <span className="font-extrabold text-red-400 px-1.5 py-0.5 bg-red-950 rounded border border-red-600 animate-pulse text-[9.5px]">
              {waterLevelStatus}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Soil Moisture Saturation (OLD CARD KEPT) */}
      <div className="tactical-card rounded-xl p-3.5 shadow-tactical hover:border-cyan-500/50 transition-all flex flex-col justify-between group bg-[#081020]">
        <div>
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Soil Moisture</span>
              <span className="text-[10px] text-cyan-300/80 font-mono block font-medium">
                (Simulated - Demo Mode)
              </span>
            </div>
            <div className="p-1.5 rounded bg-blue-950/80 text-blue-400 border border-blue-800/40 group-hover:scale-110 transition-transform">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1 mt-0.5">
            <span className="text-2xl font-bold font-mono text-white tracking-tight">{Math.round(animMoisture)}</span>
            <span className="text-xs text-slate-400 font-medium font-mono">% Saturation</span>
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-[#182647]">
          {/* Saturation Gauge Bar */}
          <div className="w-full bg-[#142340] rounded-full h-1.5 overflow-hidden mb-1.5">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                animMoisture >= 90 ? 'bg-red-500 shadow-glow-red' :
                animMoisture >= 75 ? 'bg-orange-500 shadow-glow-orange' :
                animMoisture >= 60 ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${animMoisture}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-slate-400">Pore Pressure:</span>
            <span className="font-bold text-red-400">
              Liquefaction Risk
            </span>
          </div>
        </div>
      </div>

      {/* 4. Terrain / Slope Condition (OLD CARD KEPT) */}
      <div className="tactical-card rounded-xl p-3.5 shadow-tactical hover:border-cyan-500/50 transition-all flex flex-col justify-between group bg-[#081020]">
        <div>
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Terrain / Slope</span>
            <div className="p-1.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800/40 group-hover:scale-110 transition-transform">
              <Mountain className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg font-bold font-mono text-white tracking-tight mt-0.5 truncate">
            42.5° Scarp
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-[#182647]">
          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1 font-mono">
            <span className="flex items-center gap-1">
              <Gauge className="w-3 h-3 text-cyan-400" />
              <span>Colluvium:</span>
            </span>
            <span className="font-mono font-bold text-amber-300">3.4m Unstable</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            Drainage Grade: <span className="text-slate-200">High Runoff</span>
          </div>
        </div>
      </div>

      {/* 5. Ground Vibration (OLD CARD KEPT BUT MADE SECONDARY) */}
      <div className="tactical-card rounded-xl p-3.5 shadow-tactical border border-[#1b253b] hover:border-slate-600 transition-all flex flex-col justify-between group bg-[#070b16] opacity-80 hover:opacity-100">
        <div>
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Vibration</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                SECONDARY
              </span>
            </div>
            <div className="p-1 rounded bg-slate-900 text-slate-400 border border-slate-700/60">
              <Activity className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>
          <div className="text-base font-semibold font-mono text-slate-300 tracking-tight mt-0.5">
            0.38 mm/s
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-[#162035]">
          {/* Waveform graphic - subtle / secondary */}
          <svg className="w-full h-3.5 text-slate-500 opacity-60 mb-1" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path
              d="M0,10 Q25,7 50,13 T100,10"
              fill="none"
              stroke="#64748b"
              strokeWidth="1.5"
            />
          </svg>
          <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
            <span>Harmonics:</span>
            <span className="text-slate-400">Nominal Baseline</span>
          </div>
        </div>
      </div>

      {/* 6. River Catchment Discharge & Sensor Mesh Sync */}
      <div className="tactical-card rounded-xl p-3.5 shadow-tactical hover:border-cyan-500/50 transition-all flex flex-col justify-between group bg-[#081020]">
        <div>
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">River Discharge</span>
            <div className="p-1.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/40 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1 mt-0.5">
            <span className="text-xl font-black font-mono text-cyan-300 tracking-tight">{dischargeVal}</span>
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-[#182647]">
          <div className="flex items-center justify-between text-[10px] mb-1 font-mono">
            <span className="text-slate-400">IoT Mesh Link:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>8/8 Online</span>
            </span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
            <span>CWC Gauge:</span>
            <span className="text-amber-300 font-bold">Surge Warning</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelemetryGrid;
