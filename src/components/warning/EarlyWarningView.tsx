import React from 'react';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles, 
  Activity, 
  Droplets, 
  CloudRain, 
  ShieldCheck, 
  HelpCircle,
  Zap,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

export const EarlyWarningView: React.FC = () => {
  const { telemetry, activeHotspot, setActiveTab } = useSimulation();
  const { 
    riskScore, 
    riskLevel, 
    estimatedRiskWindow, 
    aiConfidencePercent, 
    contributions, 
    rainfallMm,
    soilMoisturePercent,
    groundVibration,
    factorOfSafety
  } = telemetry;

  return (
    <div className="space-y-6">
      {/* Top Banner Alert Condition */}
      <div className={`rounded-2xl p-6 border shadow-2xl transition-all duration-500 relative overflow-hidden ${
        riskScore >= 75 
          ? 'bg-gradient-to-r from-red-950/95 via-[#230d17] to-[#0d1527] border-red-500 shadow-glow-red' 
          : riskScore >= 50 
          ? 'bg-gradient-to-r from-amber-950/90 via-[#21180c] to-[#0d1527] border-amber-500/80 shadow-glow-amber' 
          : 'bg-gradient-to-r from-emerald-950/90 via-[#0d1e18] to-[#0d1527] border-emerald-500/80 shadow-glow-emerald'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-2xl border mt-0.5 shadow-lg ${
              riskScore >= 75 ? 'bg-red-900/80 text-red-200 border-red-400 animate-pulse' :
              riskScore >= 50 ? 'bg-amber-900/80 text-amber-200 border-amber-400' :
              'bg-emerald-900/80 text-emerald-200 border-emerald-400'
            }`}>
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-black/50 border border-white/20 text-white font-mono">
                  Early Warning Panel (Demo Simulation)
                </span>
                <span className="text-xs text-slate-300">
                  Target Sector: <strong className="text-white">{activeHotspot.name}</strong>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1.5 tracking-tight">
                Early Warning Panel (Demo Simulation) - {activeHotspot.name}
              </h2>

              <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-3xl leading-relaxed">
                {telemetry.aiExplanation}
              </p>
            </div>
          </div>

          {/* Risk Level Badge */}
          <div className="shrink-0 flex md:flex-col items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-6">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
              Hazard Threat Index
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold tracking-wider uppercase font-mono text-amber-400">
              MEDIUM - 68% (Estimated)
            </span>
            <span className="text-xs text-slate-300 font-mono mt-0.5">
              Score: 68/100 (Estimated) • FoS: {factorOfSafety.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Grid: 3 Major Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. AI Estimated Risk Window */}
        <div className="tactical-card rounded-2xl p-5 shadow-tactical flex flex-col justify-between border border-[#1e2e54]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1b2b4d]">
              <div className="flex items-center space-x-2 text-amber-400">
                <Clock className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Early Warning Panel (Demo Simulation)
                </h3>
              </div>
              <span className="text-[10px] bg-amber-950 text-amber-300 font-mono px-2 py-0.5 rounded border border-amber-600/50">
                Demo Simulation
              </span>
            </div>

            {/* Visual Circular / Highlight Timer Box */}
            <div className="mt-5 text-center py-5 bg-[#0e1933] rounded-2xl border border-amber-500/40 shadow-inner relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                AI Estimated Response Window
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono mt-1.5 tracking-tight drop-shadow-md">
                Estimated Warning Window: ∼30-60 mins (Demo Simulation)
              </div>
              <div className="text-xs text-slate-300 mt-1.5 px-3">
                Anticipated lead-time before critical colluvium displacement occurs (Demo Simulation)
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-300 space-y-2.5">
              <div className="flex items-start space-x-2 bg-[#0e1830] p-2.5 rounded-xl border border-[#1e2f52]">
                <span className="text-amber-400 font-bold mt-0.5">•</span>
                <span>
                  <strong>Algorithm Formulation:</strong> Synthesizes pore pressure rise rate (dΨ/dt) with high-frequency micro-acoustic emission spikes.
                </span>
              </div>
              <div className="flex items-start space-x-2 bg-[#0e1830] p-2.5 rounded-xl border border-[#1e2f52]">
                <span className="text-amber-400 font-bold mt-0.5">•</span>
                <span>
                  <strong>Operational Objective:</strong> Identifies increasing risk early to execute preventive evacuations and traffic diversions before slope failure.
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#182645] text-[10px] text-slate-400 flex items-center space-x-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Prototype estimate based on simulated telemetry; not a deterministic promise of exact failure time.</span>
          </div>
        </div>

        {/* 2. Confidence Indicator & Lead Time Comparison */}
        <div className="tactical-card rounded-2xl p-5 shadow-tactical flex flex-col justify-between border border-[#1e2e54]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1b2b4d]">
              <div className="flex items-center space-x-2 text-cyan-400">
                <ShieldCheck className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  AI Confidence & Consensus
                </h3>
              </div>
              <span className="text-[10px] bg-cyan-950 text-cyan-300 font-mono px-2 py-0.5 rounded border border-cyan-600/50">
                Multi-Sensor
              </span>
            </div>

            <div className="mt-5 text-center py-5 bg-[#0e1933] rounded-2xl border border-cyan-500/40 shadow-inner">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                Sensor Consensus Index
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-cyan-300 font-mono mt-1.5 tracking-tight drop-shadow-md">
                {aiConfidencePercent}%
              </div>
              <div className="text-xs text-emerald-400 mt-1 font-semibold">
                High Geotechnical Corroboration
              </div>
            </div>

            {/* Consensus Matrix */}
            <div className="mt-4 space-y-2 text-xs text-slate-300">
              <div className="flex items-center justify-between bg-[#0e1830] p-2 rounded-xl border border-[#1e2f52]">
                <span className="text-[11px]">Pluviometer / Rainfall Consensus</span>
                <span className="font-mono font-bold text-cyan-300">96% Agreement</span>
              </div>
              <div className="flex items-center justify-between bg-[#0e1830] p-2 rounded-xl border border-[#1e2f52]">
                <span className="text-[11px]">FDR Soil Moisture Saturation Node Sync</span>
                <span className="font-mono font-bold text-cyan-300">92% Agreement</span>
              </div>
              <div className="flex items-center justify-between bg-[#0e1830] p-2 rounded-xl border border-[#1e2f52]">
                <span className="text-[11px]">MEMS Accelerometer Shear Corroboration</span>
                <span className="font-mono font-bold text-cyan-300">88% Agreement</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#182645] text-[10px] text-slate-400 flex items-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Cross-validated with historical Meghalaya & Sikkim slope failure inventories.</span>
          </div>
        </div>

        {/* 3. Main Contributing Factors & Trajectory */}
        <div className="tactical-card rounded-2xl p-5 shadow-tactical flex flex-col justify-between border border-[#1e2e54]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1b2b4d]">
              <div className="flex items-center space-x-2 text-cyan-400">
                <TrendingUp className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Risk Trajectory Dynamics
                </h3>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${
                riskScore >= 75 ? 'bg-red-950 text-red-300 border-red-600/50' : 'bg-amber-950 text-amber-300 border-amber-600/50'
              }`}>
                {riskScore >= 75 ? 'Accelerating' : 'Escalating'}
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              <div className="bg-[#0e1830] p-3 rounded-xl border border-[#1e3056]">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Primary Hazard Trigger</div>
                <div className="text-sm font-bold text-white mt-0.5 flex items-center space-x-1.5">
                  <CloudRain className="w-4 h-4 text-cyan-400" />
                  <span>Sustained Rainfall ({rainfallMm} mm)</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Accounting for <strong className="text-cyan-300">{contributions.rainfall}%</strong> of dynamic risk index.
                </div>
              </div>

              <div className="bg-[#0e1830] p-3 rounded-xl border border-[#1e3056]">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Secondary Saturation Driver</div>
                <div className="text-sm font-bold text-white mt-0.5 flex items-center space-x-1.5">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  <span>Soil Moisture Saturation ({soilMoisturePercent}%)</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Pore water accumulation directly reducing shear strength.
                </div>
              </div>

              <div className="bg-[#0e1830] p-3 rounded-xl border border-[#1e3056]">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Tertiary Anomaly Indicator</div>
                <div className="text-sm font-bold text-white mt-0.5 flex items-center space-x-1.5">
                  <Activity className="w-4 h-4 text-orange-400" />
                  <span>Subsurface Micro-Tremors ({groundVibration})</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Pre-failure harmonic vibration registered across toe road cut nodes.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#182645] flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Next Action:</span>
            <button
              onClick={() => setActiveTab('recommendations')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center space-x-1 transition-colors"
            >
              <span>View Preventive Action Protocols →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
