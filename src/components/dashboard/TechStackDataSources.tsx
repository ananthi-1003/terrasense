import React from 'react';
import { 
  Database, 
  Cpu, 
  Satellite, 
  CloudRain, 
  Radio, 
  Waves, 
  Mountain, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Workflow, 
  Binary, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

export const TechStackDataSources: React.FC = () => {
  return (
    <section className="w-full bg-[#050914] border border-[#1a2b4c] rounded-2xl p-4 sm:p-5 lg:p-6 shadow-2xl relative overflow-hidden">
      {/* Decorative ambient top glow */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500"></div>

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#182747] pb-4 mb-5">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <Database className="w-4 h-4 text-cyan-400" />
            <span>SIH26192 ARCHITECTURE // MINISTRY OF HOME AFFAIRS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Multi-Source Data Ingestion & AI Nowcasting Stack</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            State-of-the-art hydrological intelligence combining spaceborne telemetry, automated meteorological radars, IoT river gauges, and hybrid deep learning models.
          </p>
        </div>

        <div className="shrink-0 flex items-center space-x-2">
          <div className="px-3 py-1.5 rounded-xl bg-[#0b1428] border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold flex items-center space-x-1.5 shadow-inner">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>LIVE MULTI-STREAM SYNC</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (7 cols): Multi-Source Data Pipeline */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Multi-Source Data Integration Framework</span>
            </h3>
            <span className="text-[10px] font-mono text-cyan-400">5 HETEROGENEOUS FEEDS</span>
          </div>

          <div className="bg-[#081022] border border-[#1b2f54] rounded-xl p-3 text-xs font-mono text-cyan-200/90 leading-relaxed">
            <strong className="text-white">Multi-Source Data:</strong> Satellite Rainfall, IMD Weather API, IoT Water Level Sensors, River Discharge, Terrain &amp; Drainage Data
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Feed 1: Satellite Rainfall */}
            <div className="bg-[#091124] border border-[#1a2a4a] hover:border-cyan-500/50 p-3.5 rounded-xl transition-all group">
              <div className="flex items-center space-x-2.5 text-cyan-400 mb-1.5">
                <div className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 group-hover:scale-105 transition-transform">
                  <Satellite className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white font-mono">1. Satellite Rainfall</h4>
              </div>
              <p className="text-[11px] text-slate-300 leading-normal">
                GPM (Global Precipitation Measurement) &amp; INSAR satellite telemetry synced via ISRO-Bhuvan GIS at 15-minute intervals.
              </p>
              <div className="mt-2 text-[10px] font-mono text-cyan-400 flex items-center justify-between">
                <span>Latency: 4.2 min</span>
                <span className="text-emerald-400 font-bold">&bull; Active Feed</span>
              </div>
            </div>

            {/* Feed 2: IMD Weather API */}
            <div className="bg-[#091124] border border-[#1a2a4a] hover:border-blue-500/50 p-3.5 rounded-xl transition-all group">
              <div className="flex items-center space-x-2.5 text-blue-400 mb-1.5">
                <div className="p-1.5 rounded-lg bg-blue-950/80 border border-blue-700/50 text-blue-300 group-hover:scale-105 transition-transform">
                  <CloudRain className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white font-mono">2. IMD Weather API</h4>
              </div>
              <p className="text-[11px] text-slate-300 leading-normal">
                India Meteorological Department Automated Weather Stations (AWS) and Doppler Weather Radar cloudburst nowcasts.
              </p>
              <div className="mt-2 text-[10px] font-mono text-blue-400 flex items-center justify-between">
                <span>Update: 60 sec</span>
                <span className="text-emerald-400 font-bold">&bull; Verified IMD</span>
              </div>
            </div>

            {/* Feed 3: IoT Water Level Sensors */}
            <div className="bg-[#091124] border border-[#1a2a4a] hover:border-red-500/50 p-3.5 rounded-xl transition-all group">
              <div className="flex items-center space-x-2.5 text-red-400 mb-1.5">
                <div className="p-1.5 rounded-lg bg-red-950/80 border border-red-700/50 text-red-300 group-hover:scale-105 transition-transform">
                  <Radio className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white font-mono">3. IoT Water Level Sensors</h4>
              </div>
              <p className="text-[11px] text-slate-300 leading-normal">
                Ultrasonic &amp; radar river gauges deployed at critical bridge piers and bottleneck gorges with edge microcontrollers.
              </p>
              <div className="mt-2 text-[10px] font-mono text-red-400 flex items-center justify-between">
                <span>Khasi Gauge: 3.2m</span>
                <span className="text-red-400 font-bold animate-pulse">&bull; Overflow Watch</span>
              </div>
            </div>

            {/* Feed 4: River Discharge & Drainage */}
            <div className="bg-[#091124] border border-[#1a2a4a] hover:border-amber-500/50 p-3.5 rounded-xl transition-all group">
              <div className="flex items-center space-x-2.5 text-amber-400 mb-1.5">
                <div className="p-1.5 rounded-lg bg-amber-950/80 border border-amber-700/50 text-amber-300 group-hover:scale-105 transition-transform">
                  <Waves className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white font-mono">4. River Discharge &amp; Drainage</h4>
              </div>
              <p className="text-[11px] text-slate-300 leading-normal">
                Central Water Commission (CWC) volumetric discharge telemetry merged with CartoDEM digital elevation &amp; stream order vectors.
              </p>
              <div className="mt-2 text-[10px] font-mono text-amber-400 flex items-center justify-between">
                <span>Discharge: 1,240 m&sup3;/s</span>
                <span className="text-emerald-400 font-bold">&bull; 100% Mesh Sync</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Prediction Model Card */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4 bg-gradient-to-b from-[#0b1428] via-[#081022] to-[#040814] border border-cyan-500/40 rounded-xl p-4 sm:p-5 shadow-inner relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            <div className="flex items-center justify-between text-xs font-mono text-cyan-300 mb-2">
              <span className="flex items-center space-x-1.5 font-bold uppercase tracking-wider">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Prediction Model Architecture</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-700 text-[10px] font-bold text-cyan-300">
                AI / ML
              </span>
            </div>

            <div className="bg-[#050c1c] border border-cyan-500/60 rounded-xl p-3 shadow-lg mb-3">
              <h3 className="text-base sm:text-lg font-black text-white font-mono leading-snug">
                AI/ML - LSTM + Random Forest for Flash Flood Nowcasting
              </h3>
              <div className="text-[11px] font-mono text-cyan-300 mt-1">
                Optimized for Complex Hilly Catchment Hydrodynamics
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300 font-mono">
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">LSTM Deep Sequence Model:</strong> Captures non-linear temporal lag between high-intensity cloudburst bursts and sudden river crest waves.
                </span>
              </div>

              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Random Forest Ensemble:</strong> Evaluates slope gradient, saturated pore-water friction, and terrain drainage bottlenecks with high interpretability.
                </span>
              </div>

              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Nowcasting Lead-Time:</strong> 25–40 minute actionable evacuation window prior to downstream village inundation.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#18294e] flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
            <span className="flex items-center space-x-1 text-cyan-300">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Nowcast Lead: +35 min</span>
            </span>
            <span className="flex items-center space-x-1 text-emerald-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Model Accuracy: 94.6%</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackDataSources;
