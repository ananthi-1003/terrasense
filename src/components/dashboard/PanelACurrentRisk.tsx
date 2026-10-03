import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  ReferenceLine,
  Area,
  AreaChart
} from 'recharts';
import { 
  Activity, 
  CloudRain, 
  Droplets, 
  TrendingUp, 
  Compass, 
  AlertCircle, 
  Gauge, 
  Waves, 
  ShieldAlert,
  Zap
} from 'lucide-react';
import type { LandslideLocation } from '../../data/landslideLocations';

interface PanelACurrentRiskProps {
  location: LandslideLocation;
}

export const PanelACurrentRisk: React.FC<PanelACurrentRiskProps> = ({ location }) => {
  const isCritical = location.riskLevel === 'Critical';
  const isHigh = location.riskLevel === 'High';
  const isMedium = location.riskLevel === 'Medium';

  return (
    <div className="bg-[#070b16] border border-[#1e2e50] rounded-2xl p-4 shadow-xl flex flex-col space-y-4">
      {/* Panel Header */}
      <div className="flex items-start justify-between border-b border-[#1c2a47] pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
              PANEL A // ESTIMATED RISK SCORE (DEMO)
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {location.state}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1 flex items-center space-x-2">
            <span>Estimated Risk Score (Demo)</span>
            <span className="text-xs font-mono font-normal text-slate-400">
              ({location.name})
            </span>
          </h2>
        </div>

        {/* Risk Level Badge */}
        <div className="flex flex-col items-end">
          <div
            className="flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-black font-mono tracking-wider border shadow-md bg-yellow-950/90 text-yellow-400 border-yellow-500 shadow-yellow-950/50"
          >
            <span className="h-2 w-2 rounded-full bg-current animate-ping"></span>
            <span>MEDIUM - 68% (Estimated)</span>
          </div>
          <span className="text-[11px] font-mono font-bold text-slate-400 mt-1">
            SCORE: <span className="text-white text-sm">68% (Estimated)</span>
          </span>
        </div>
      </div>

      {/* Risk Trend line chart (last 24h) */}
      <div className="bg-[#0a1020] p-3 rounded-xl border border-[#1b2844]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold font-mono text-slate-300 flex items-center space-x-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>24-HOUR RISK TREND & PROJECTION</span>
          </span>
          <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400">
            <span className="flex items-center space-x-1">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
              <span>Risk %</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
              <span>75% Warning</span>
            </span>
          </div>
        </div>

        {/* Recharts LineChart */}
        <div className="w-full h-36">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={location.trend24h} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id={`riskGrad-${location.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={location.color} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={location.color} stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#17233d" vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="#64748b" 
                fontSize={10} 
                tickLine={false}
                axisLine={{ stroke: '#1e293b' }}
              />
              <YAxis 
                domain={[0, 100]} 
                stroke="#64748b" 
                fontSize={10} 
                tickLine={false}
                axisLine={{ stroke: '#1e293b' }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#0b1426] border border-[#233860] px-2.5 py-1.5 rounded-lg shadow-xl text-[11px] font-mono">
                        <div className="text-slate-400">{label} IST</div>
                        <div className="font-bold text-cyan-300">
                          Risk Level: {payload[0].value}%
                        </div>
                        {payload[0].payload.rainfall && (
                          <div className="text-slate-300 text-[10px]">
                            Rainfall: {payload[0].payload.rainfall}mm
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine 
                y={75} 
                stroke="#ef4444" 
                strokeDasharray="3 3" 
                label={{ value: 'CRITICAL', position: 'insideTopRight', fill: '#ef4444', fontSize: 9 }} 
              />
              <Area 
                type="monotone" 
                dataKey="risk" 
                stroke={location.color} 
                strokeWidth={2.5}
                fillOpacity={1} 
                fill={`url(#riskGrad-${location.id})`} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Factors causing risk */}
      <div>
        <div className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span className="flex items-center space-x-1.5">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>MULTI-SOURCE RISK PRECURSORS</span>
          </span>
          <span className="text-[10px] text-red-400 font-mono font-bold animate-pulse">
            OVERFLOW RISK ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Factor 1: Rainfall Intensity (Card 1 - Blue) */}
          <div className="bg-[#0a142e] border border-blue-500/60 p-2.5 rounded-xl hover:border-blue-400 transition-all shadow-inner">
            <div className="flex items-center justify-between text-blue-300 text-xs font-mono">
              <span className="flex items-center space-x-1 font-bold">
                <CloudRain className="w-3.5 h-3.5 text-blue-400" />
                <span>Rainfall Intensity</span>
              </span>
              <span className="text-[9px] text-blue-300 font-bold px-1 rounded bg-blue-950 border border-blue-800">Alert</span>
            </div>
            <span className="text-[10px] text-blue-300/90 font-mono block mt-0.5">
              (Live via Open-Meteo API)
            </span>
            <div className="text-lg font-black font-mono text-white mt-1">
              85 mm/hr
            </div>
            <div className="text-[10px] font-mono text-blue-300 font-semibold truncate mt-0.5">
              Heavy Rainfall Alert
            </div>
            {/* Progress bar */}
            <div className="w-full bg-[#0e1a38] h-1.5 rounded-full overflow-hidden mt-1.5">
              <div 
                className="bg-blue-500 h-full rounded-full"
                style={{ width: '85%' }}
              ></div>
            </div>
          </div>

          {/* Factor 2: Water Level / River Gauge (Card 2 - Red) */}
          <div className="bg-[#1f090e] border border-red-500/70 p-2.5 rounded-xl hover:border-red-400 transition-all shadow-inner">
            <div className="flex items-center justify-between text-red-300 text-xs font-mono">
              <span className="flex items-center space-x-1 font-bold">
                <Waves className="w-3.5 h-3.5 text-red-400" />
                <span>Water Level / Gauge</span>
              </span>
              <span className="text-[9px] text-red-300 font-bold px-1 rounded bg-red-950 border border-red-800 animate-pulse">DANGER</span>
            </div>
            <span className="text-[10px] text-red-300/90 font-mono block mt-0.5">
              (Simulated - Demo Mode)
            </span>
            <div className="text-lg font-black font-mono text-red-100 mt-1">
              3.2m / 4.0m
            </div>
            <div className="text-[10px] font-mono text-red-400 font-bold truncate mt-0.5">
              DANGER - Overflow Risk
            </div>
            {/* Progress bar */}
            <div className="w-full bg-[#351019] h-1.5 rounded-full overflow-hidden mt-1.5">
              <div 
                className="bg-red-500 h-full rounded-full shadow-glow-red"
                style={{ width: '80%' }}
              ></div>
            </div>
          </div>

          {/* Factor 3: Soil Moisture */}
          <div className="bg-[#0a1020] border border-[#1a2846] p-2.5 rounded-xl hover:border-cyan-500/50 transition-all">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span className="flex items-center space-x-1">
                <Droplets className="w-3.5 h-3.5 text-blue-400" />
                <span>Soil Moisture</span>
              </span>
              <span className="text-[10px] text-blue-400 font-bold">Saturation</span>
            </div>
            <span className="text-[10px] text-cyan-300/80 font-mono block mt-0.5">
              (Simulated - Demo Mode)
            </span>
            <div className="text-lg font-black font-mono text-white mt-1">
              {location.factors.soilMoisture}
            </div>
            {/* Progress bar */}
            <div className="w-full bg-[#11192e] h-1.5 rounded-full overflow-hidden mt-1.5">
              <div 
                className={`h-full rounded-full ${
                  parseInt(location.factors.soilMoisture) > 85 ? 'bg-red-500' : 'bg-blue-500'
                }`}
                style={{ width: location.factors.soilMoisture }}
              ></div>
            </div>
          </div>

          {/* Factor 4: Slope / Terrain */}
          <div className="bg-[#0a1020] border border-[#1a2846] p-2.5 rounded-xl hover:border-cyan-500/50 transition-all">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span className="flex items-center space-x-1">
                <Compass className="w-3.5 h-3.5 text-purple-400" />
                <span>Terrain Slope</span>
              </span>
              <span className="text-[10px] text-purple-400 font-bold">Incline</span>
            </div>
            <div className="text-lg font-black font-mono text-white mt-1">
              {location.factors.slope}
            </div>
            {/* Progress bar */}
            <div className="w-full bg-[#11192e] h-1.5 rounded-full overflow-hidden mt-1.5">
              <div 
                className={`h-full rounded-full ${
                  parseInt(location.factors.slope) >= 45 ? 'bg-rose-500' : 'bg-purple-500'
                }`}
                style={{ width: `${(parseInt(location.factors.slope) / 60) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Factor 5: Vibration (Made Secondary) */}
          <div className="col-span-2 bg-[#080d19] border border-[#162035] p-2 rounded-xl text-xs font-mono opacity-80 hover:opacity-100 transition-all flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Waves className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-400">Ground Vibration:</span>
              <span className="text-slate-300 font-semibold">{location.factors.vibration} (0.38 mm/s FFT)</span>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              SECONDARY PRECURSOR
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
