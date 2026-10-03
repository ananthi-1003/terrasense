import React, { useEffect, useRef, useState } from 'react';
import { 
  ShieldAlert, 
  Info, 
  TrendingUp, 
  Activity, 
  Clock,
  AlertTriangle,
  Compass,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

/** Smooth number animation hook (ease-out cubic) */
function useAnimatedValue(target: number, durationMs = 700): number {
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
      const p = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = from + (target - from) * eased;
      setDisplayed(Math.round(cur * 100) / 100);
      if (p < 1) { rafRef.current = requestAnimationFrame(animate); }
      else { fromRef.current = target; }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, durationMs]);

  return displayed;
}

export const RiskGaugeCard: React.FC = () => {
  const { telemetry } = useSimulation();
  const { riskScore, riskLevel, estimatedRiskWindow, factorOfSafety, aiConfidencePercent } = telemetry;

  const animScore = useAnimatedValue(riskScore, 700);
  const animFoS = useAnimatedValue(factorOfSafety, 700);

  let strokeColor = '#10b981'; // green
  let glowColor = 'rgba(16, 185, 129, 0.3)';
  let badgeStyle = 'bg-emerald-950/90 text-emerald-300 border-emerald-500/60 shadow-glow-emerald';

  if (riskLevel === 'MODERATE') {
    strokeColor = '#f59e0b';
    glowColor = 'rgba(245, 158, 11, 0.35)';
    badgeStyle = 'bg-amber-950/90 text-amber-300 border-amber-500/60 shadow-glow-amber';
  } else if (riskLevel === 'HIGH') {
    strokeColor = '#f97316';
    glowColor = 'rgba(249, 115, 22, 0.4)';
    badgeStyle = 'bg-orange-950/90 text-orange-300 border-orange-500/60 shadow-glow-orange';
  } else if (riskLevel === 'CRITICAL') {
    strokeColor = '#ef4444';
    glowColor = 'rgba(239, 68, 68, 0.55)';
    badgeStyle = 'bg-red-950 text-red-200 border-red-500 shadow-glow-red animate-pulse';
  }

  // SVG Gauge calculations using animated score
  const radius = 70;
  const semiCircumference = Math.PI * radius; // ~219.9
  const strokeDashoffset = semiCircumference - (animScore / 100) * semiCircumference;

  // Calculate position of indicator tip dot along the arc
  const angleRad = Math.PI * (1 - animScore / 100);
  const indicatorX = 90 + radius * Math.cos(angleRad);
  const indicatorY = 85 - radius * Math.sin(angleRad);

  return (
    <div className="tactical-card rounded-2xl p-4 sm:p-5 shadow-tactical relative overflow-hidden flex flex-col justify-between h-full border border-[#1e2e54]">
      {/* Background ambient radial glow */}
      <div 
        className="absolute -top-12 -right-12 w-64 h-64 rounded-full pointer-events-none blur-3xl opacity-25 transition-all duration-700"
        style={{ background: glowColor }}
      />

      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1b2b4d]">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-[#142345] border border-[#233866] text-cyan-400 shadow-inner">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
              <span>Estimated Risk Score (Demo)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
            </h2>
            <span className="text-[10px] text-slate-400 font-mono">
              AI Multi-Sensor Geotechnical Engine
            </span>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-lg text-xs font-bold tracking-wider uppercase border font-mono bg-yellow-950/90 text-yellow-300 border-yellow-500/60 shadow-glow-amber">
          MEDIUM - 68% (Estimated)
        </span>
      </div>

      {/* Gauge & Metrics Section */}
      <div className="py-4 flex flex-col sm:flex-row items-center justify-around gap-4">
        {/* Animated Radial Arc Gauge */}
        <div className="relative flex flex-col items-center justify-center">
          <svg className="w-48 h-32 overflow-visible" viewBox="0 0 180 100">
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="40%" stopColor="#f59e0b" />
                <stop offset="75%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
              <filter id="gaugeGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Background semi-circle track */}
            <path
              d="M 20 85 A 70 70 0 0 1 160 85"
              fill="none"
              stroke="#131e36"
              strokeWidth="14"
              strokeLinecap="round"
            />

            {/* Subtle segmented guide marks */}
            <path
              d="M 20 85 A 70 70 0 0 1 160 85"
              fill="none"
              stroke="#1d2e52"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray="2 18"
            />

            {/* Foreground Score Stroke */}
            <path
              d="M 20 85 A 70 70 0 0 1 160 85"
              fill="none"
              stroke={strokeColor}
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={semiCircumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-700 ease-out"
              filter="url(#gaugeGlow)"
            />

            {/* Active tip pointer indicator */}
            <circle
              cx={indicatorX}
              cy={indicatorY}
              r="6"
              fill="#ffffff"
              stroke={strokeColor}
              strokeWidth="3"
              className="transition-all duration-700 ease-out"
              filter="url(#gaugeGlow)"
            />

            {/* Numerical Tick Marks */}
            <text x="18" y="98" fill="#64748b" fontSize="9" fontWeight="600" fontFamily="monospace">0</text>
            <text x="50" y="32" fill="#64748b" fontSize="9" fontWeight="600" fontFamily="monospace">25</text>
            <text x="84" y="10" fill="#64748b" fontSize="9" fontWeight="600" fontFamily="monospace">50</text>
            <text x="120" y="32" fill="#64748b" fontSize="9" fontWeight="600" fontFamily="monospace">75</text>
            <text x="150" y="98" fill="#64748b" fontSize="9" fontWeight="600" fontFamily="monospace">100</text>
          </svg>

          {/* Central Digital Readout */}
          <div className="absolute bottom-1 flex flex-col items-center text-center">
            <div className="flex items-baseline">
              <span className="text-3xl font-extrabold font-mono tracking-tight text-white drop-shadow-md">
                68%
              </span>
              <span className="text-xs font-semibold text-slate-400 ml-1">(Estimated)</span>
            </div>
            <div className="text-[10px] text-amber-300 uppercase tracking-widest font-bold flex items-center gap-1 mt-0.5 font-mono">
              <span>MEDIUM - 68% (Estimated)</span>
            </div>
          </div>
        </div>

        {/* Secondary Geotechnical Parameters */}
        <div className="space-y-2.5 w-full sm:w-auto">
          {/* Factor of Safety */}
          <div className="bg-[#0e1830] p-2.5 rounded-xl border border-[#1e3056] shadow-inner">
            <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-semibold mb-1">
              <span className="flex items-center space-x-1">
                <Activity className="w-3 h-3 text-cyan-400" />
                <span>Factor of Safety (FoS)</span>
              </span>
              <span className={`font-mono font-bold ${
                animFoS < 1.1 ? 'text-red-400' : animFoS < 1.3 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {animFoS.toFixed(2)}
              </span>
            </div>
            {/* Mini Safety Rating Bar */}
            <div className="w-full bg-[#162340] rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  animFoS < 1.1 ? 'bg-red-500' : animFoS < 1.3 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(100, (animFoS / 2.0) * 100)}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              {animFoS < 1.0 ? 'Active Shear Slippage' : animFoS < 1.3 ? 'Marginal Stability' : 'Nominal Stability (Safe)'}
            </div>
          </div>

          {/* Multi-Sensor Consensus */}
          <div className="bg-[#0e1830] p-2.5 rounded-xl border border-[#1e3056] shadow-inner">
            <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-semibold">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-cyan-400" />
                <span>Sensor Consensus</span>
              </span>
              <span className="text-xs font-mono font-bold text-cyan-300">
                {aiConfidencePercent}%
              </span>
            </div>
            <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">
              Corroborated by 8 Field Nodes
            </div>
          </div>
        </div>
      </div>

      {/* AI Estimated Risk Window Highlight Box */}
      <div className="bg-gradient-to-r from-[#141e38] via-[#1a233b] to-[#141e38] border border-amber-500/50 rounded-xl p-3 shadow-tactical">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-amber-400">
            <Clock className="w-4 h-4 animate-spin text-amber-400 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider">
              AI Estimated Risk Window
            </span>
          </div>
          <span className="text-[10px] bg-amber-950 text-amber-300 font-mono font-bold px-2 py-0.5 rounded border border-amber-600/50">
            Lead Time
          </span>
        </div>
        
        <div className="mt-1.5 flex items-baseline space-x-2">
          <span className="text-xl font-extrabold text-amber-300 font-mono tracking-tight">
            {estimatedRiskWindow || 'No active hazard window'}
          </span>
          {estimatedRiskWindow && (
            <span className="text-[11px] text-slate-300 font-medium">
              (Anticipated window for preventive actions)
            </span>
          )}
        </div>
      </div>

      {/* Mandatory SIH Decision-Support Disclaimer */}
      <div className="mt-3 pt-2.5 border-t border-[#182747] flex items-start space-x-1.5 text-[10px] text-slate-400 leading-tight">
        <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
        <span>
          Prototype estimate based on simulated telemetry; operational deployment requires site geotechnical calibration.
        </span>
      </div>
    </div>
  );
};
