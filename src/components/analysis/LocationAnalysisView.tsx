import React from 'react';
import { 
  MapPin, 
  Compass, 
  Sparkles, 
  TrendingUp, 
  Route, 
  Home, 
  Mountain, 
  Layers, 
  Activity, 
  Droplets, 
  CloudRain,
  Info,
  Clock,
  Gauge,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { useSimulation } from '../../context/SimulationContext';

export const LocationAnalysisView: React.FC = () => {
  const { 
    activeHotspot, 
    activeRegion, 
    telemetry, 
    simulationStage 
  } = useSimulation();

  const { contributions, trend, riskScore, riskLevel, factorOfSafety } = telemetry;

  return (
    <div className="space-y-6">
      {/* Title & Context Banner */}
      <div className="tactical-card rounded-2xl p-5 shadow-tactical flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#1e2e54]">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Multi-Criteria Spatial Risk Analysis & Geotechnical Diagnostics</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Vulnerability & Causal Diagnostic: <span className="text-cyan-400">{activeHotspot.name}</span>
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Geospatial correlation of satellite InSAR terrain screening, live soil saturation, and micro-vibration telemetry.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-[#0d162d] border border-[#233866] rounded-xl px-4 py-2.5 shadow-inner">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Dynamic Risk Index</div>
            <div className={`text-xl font-bold font-mono ${
              riskScore >= 75 ? 'text-red-400' : riskScore >= 50 ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {riskScore}/100 ({riskLevel})
            </div>
          </div>
          <span className="h-8 w-px bg-slate-700"></span>
          <div className="text-left">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Simulation Phase</div>
            <div className="text-xs font-mono font-bold text-cyan-300">
              Stage {simulationStage}/4
            </div>
          </div>
        </div>
      </div>

      {/* Grid: WHERE & WHY IS RISK INCREASING */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* WHERE Section (5 columns) */}
        <div className="lg:col-span-5 tactical-card rounded-2xl p-5 shadow-tactical flex flex-col justify-between space-y-4 border border-[#1e2e54]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1b2b4d]">
              <div className="flex items-center space-x-2 text-cyan-400">
                <MapPin className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  WHERE: Spatial Exposure Profile
                </h3>
              </div>
              <span className="text-[10px] bg-cyan-950 text-cyan-300 font-mono px-2 py-0.5 rounded border border-cyan-700/50">
                GIS 10m DEM
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {/* Exact Vulnerable Hotspot */}
              <div className="bg-[#0e1830] p-3 rounded-xl border border-[#1e3056]">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Exact Vulnerable Hotspot</div>
                <div className="text-sm font-bold text-white mt-0.5">{activeHotspot.name}</div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  Sector: <span className="text-slate-200">{activeHotspot.sector}</span> • Region: <span className="text-cyan-300">{activeRegion.name}</span>
                </div>
              </div>

              {/* Coordinates & Elevation */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-[#0e1830] p-3 rounded-xl border border-[#1e3056]">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Coordinates (WGS84)</div>
                  <div className="text-xs font-mono font-bold text-cyan-300 mt-1">
                    {activeHotspot.lat.toFixed(4)}° N
                  </div>
                  <div className="text-xs font-mono font-bold text-cyan-300">
                    {activeHotspot.lng.toFixed(4)}° E
                  </div>
                </div>

                <div className="bg-[#0e1830] p-3 rounded-xl border border-[#1e3056]">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Elevation & Incline</div>
                  <div className="text-xs font-mono font-bold text-white mt-1">
                    {activeHotspot.elevation} m MSL
                  </div>
                  <div className="text-xs text-amber-400 font-semibold mt-0.5 flex items-center gap-1">
                    <Gauge className="w-3 h-3 text-amber-400" />
                    <span>Slope: {activeHotspot.slopeDeg}° Incline</span>
                  </div>
                </div>
              </div>

              {/* Nearby Road & Settlement Exposure */}
              <div className="space-y-2">
                <div className="bg-[#0e1830] p-3 rounded-xl border border-[#1e3056] flex items-start space-x-2.5">
                  <div className="p-1.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800/40 shrink-0 mt-0.5">
                    <Route className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Nearby Transport Corridor</div>
                    <div className="text-xs font-bold text-white mt-0.5">{activeHotspot.nearbyRoad}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Directly traverses the toe scarp runout envelope.</div>
                  </div>
                </div>

                <div className="bg-[#0e1830] p-3 rounded-xl border border-[#1e3056] flex items-start space-x-2.5">
                  <div className="p-1.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/40 shrink-0 mt-0.5">
                    <Home className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Down-slope Settlement</div>
                    <div className="text-xs font-bold text-white mt-0.5">{activeHotspot.nearbyVillage}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Vulnerable settlement population: <strong className="text-slate-200">~1,450 residents</strong>.</div>
                  </div>
                </div>
              </div>

              {/* Runout Area Envelope & Geology */}
              <div className="bg-[#0e1830] p-3 rounded-xl border border-[#1e3056]">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Runout Envelope & Lithology</div>
                <div className="text-xs font-bold text-white mt-0.5">
                  Radius: ~{activeHotspot.affectedAreaRadiusKm} km envelope (~{(Math.PI * Math.pow(activeHotspot.affectedAreaRadiusKm, 2)).toFixed(2)} km² total hazard envelope)
                </div>
                <div className="text-[11px] text-slate-300 mt-1">
                  Stratigraphy: <span className="text-cyan-300 font-medium">{activeHotspot.geology}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 pt-2.5 border-t border-[#182747] flex items-center space-x-1.5">
            <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Spatial perimeter derived from ISRO Bhuvan DEM & Geological Survey of India (GSI) slope maps.</span>
          </div>
        </div>

        {/* WHY IS RISK INCREASING? Section (7 columns) */}
        <div className="lg:col-span-7 tactical-card rounded-2xl p-5 shadow-tactical flex flex-col justify-between space-y-4 border border-[#1e2e54]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1b2b4d]">
              <div className="flex items-center space-x-2 text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  WHY IS THE RISK INCREASING? (AI Causal Diagnostics)
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700/50">
                Edge-AI Consensus
              </span>
            </div>

            {/* AI Natural Language Diagnostic Box */}
            <div className="mt-4 bg-[#0e1933] border border-cyan-500/40 rounded-xl p-4 shadow-inner relative overflow-hidden">
              <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-cyan-950/90 border-b border-l border-cyan-500/40 text-[10px] text-cyan-300 font-mono rounded-bl">
                Inference Model v2.4
              </div>

              <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed mt-1">
                "{telemetry.aiExplanation}"
              </p>

              <div className="mt-3 flex items-center space-x-2 text-[11px] text-cyan-400 font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>Multi-sensor consensus updated from continuous pluviometer & MEMS vibration telemetry.</span>
              </div>
            </div>

            {/* Prototype AI Contribution Scores */}
            <div className="mt-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Parameter Contribution Breakdown
                </span>
                <span className="text-[10px] text-slate-400 italic font-mono">
                  *Prototype AI Factor Weights
                </span>
              </div>

              {/* 1. Rainfall */}
              <div className="bg-[#0e1830] p-3 rounded-xl border border-[#1e3056]">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center space-x-2">
                    <CloudRain className="w-4 h-4 text-cyan-400" />
                    <span className="font-semibold text-white">Rainfall Intensity & Infiltration</span>
                  </div>
                  <span className="font-mono font-bold text-cyan-300">{contributions.rainfall}% Weight</span>
                </div>
                <div className="w-full bg-[#142340] rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-cyan-400 rounded-full transition-all duration-500" 
                    style={{ width: `${contributions.rainfall}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                  <span>Current: <strong className="text-white font-mono">{telemetry.rainfallMm} mm</strong></span>
                  <span>Threshold: <strong className="text-amber-400 font-mono">65 mm/24h</strong></span>
                </div>
              </div>

              {/* 2. Soil Moisture */}
              <div className="bg-[#0e1830] p-3 rounded-xl border border-[#1e3056]">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center space-x-2">
                    <Droplets className="w-4 h-4 text-blue-400" />
                    <span className="font-semibold text-white">Soil Moisture & Pore-Water Saturation</span>
                  </div>
                  <span className="font-mono font-bold text-blue-400">{contributions.soilMoisture}% Weight</span>
                </div>
                <div className="w-full bg-[#142340] rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-blue-400 rounded-full transition-all duration-500" 
                    style={{ width: `${contributions.soilMoisture}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                  <span>Saturation: <strong className="text-white font-mono">{telemetry.soilMoisturePercent}%</strong></span>
                  <span>Liquefaction Point: <strong className="text-red-400 font-mono">90%</strong></span>
                </div>
              </div>

              {/* 3. Ground Vibration */}
              <div className="bg-[#0e1830] p-3 rounded-xl border border-[#1e3056]">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-orange-400" />
                    <span className="font-semibold text-white">Micro-Vibration & Subsurface Shear Creep</span>
                  </div>
                  <span className="font-mono font-bold text-orange-400">{contributions.groundVibration}% Weight</span>
                </div>
                <div className="w-full bg-[#142340] rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-orange-400 rounded-full transition-all duration-500" 
                    style={{ width: `${contributions.groundVibration}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                  <span>Peak Anomaly: <strong className="text-white">{telemetry.groundVibration}</strong></span>
                  <span>Harmonic Signature: <strong className="text-cyan-300">0.8–2.4 Hz</strong></span>
                </div>
              </div>

              {/* 4. Terrain & History */}
              <div className="bg-[#0e1830] p-3 rounded-xl border border-[#1e3056]">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center space-x-2">
                    <Mountain className="w-4 h-4 text-amber-400" />
                    <span className="font-semibold text-white">Slope Gradient & Historical Vulnerability</span>
                  </div>
                  <span className="font-mono font-bold text-amber-400">{contributions.terrainHistory}% Weight</span>
                </div>
                <div className="w-full bg-[#142340] rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-amber-400 rounded-full transition-all duration-500" 
                    style={{ width: `${contributions.terrainHistory}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                  <span>Slope Incline: <strong className="text-white">{activeHotspot.slopeDeg}°</strong></span>
                  <span>Historical Incidents: <strong className="text-amber-300">{activeHotspot.historicalIncidents} Recorded</strong></span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 pt-2.5 border-t border-[#182747]">
            Note: Multi-criteria contribution scores are normalized prototype decision-support metrics.
          </div>
        </div>
      </div>

      {/* RISK TREND: Interactive Graph */}
      <div className="tactical-card rounded-2xl p-5 shadow-tactical border border-[#1e2e54]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1b2b4d] gap-2">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400">
              <TrendingUp className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Risk Trend Over Time (Dynamic Multi-Parameter Telemetry Trajectory)
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Continuous live progression updating synchronously with simulation stages. Dynamic Factor of Safety: <strong className="text-cyan-300 font-mono">{factorOfSafety.toFixed(2)}</strong>
            </p>
          </div>

          <div className="flex items-center space-x-4 text-xs font-medium">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-glow-red"></span>
              <span className="text-slate-200">Risk Score (0-100)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-glow-cyan"></span>
              <span className="text-slate-300">Rainfall (mm)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span className="text-slate-300">Moisture (%)</span>
            </div>
          </div>
        </div>

        {/* Recharts Area Chart */}
        <div className="mt-4 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trend} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="riskScoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.45}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="rainfallGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1c2d4e" />
              <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" domain={[0, 120]} tick={{ fontSize: 11 }} />
              <ReferenceLine y={75} stroke="#f97316" strokeDasharray="4 4" label={{ value: 'High Alert Trigger (75)', fill: '#f97316', fontSize: 10 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0d1527',
                  borderColor: '#243963',
                  borderRadius: '12px',
                  color: '#f8fafc',
                  fontSize: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.8)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#ef4444" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#riskScoreGrad)" 
                name="Risk Score" 
              />
              <Area 
                type="monotone" 
                dataKey="rainfall" 
                stroke="#38bdf8" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#rainfallGrad)" 
                name="Rainfall (mm)" 
              />
              <Area 
                type="monotone" 
                dataKey="moisture" 
                stroke="#3b82f6" 
                strokeWidth={2}
                strokeDasharray="4 4"
                fill="none" 
                name="Soil Moisture (%)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
