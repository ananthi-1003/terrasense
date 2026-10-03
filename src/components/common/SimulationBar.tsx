import React, { useEffect, useState } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  FastForward, 
  Activity, 
  Clock,
  Sparkles,
  Zap,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';
import type { SimulationStage } from '../../types';

const STAGE_DEFS: { stage: SimulationStage; title: string; shortTitle: string; risk: string; desc: string; score: number; color: string }[] = [
  { stage: 0, title: 'Stage 0: Baseline Monitoring', shortTitle: '0. Baseline', risk: 'LOW', desc: 'Rain 24mm | Soil 55% | FoS 1.84 | Stable conditions', score: 32, color: 'emerald' },
  { stage: 1, title: 'Stage 1: Rain Surge Detected', shortTitle: '1. Rain Surge', risk: 'MODERATE', desc: 'Rain 52mm | Soil 71% | High infiltration rate | Risk window: 30–45 min', score: 51, color: 'amber' },
  { stage: 2, title: 'Stage 2: Near-Saturation', shortTitle: '2. Saturation', risk: 'HIGH', desc: 'Rain 68mm | Soil 82% | Micro-creep detected at TS-02 | Risk window: 20–35 min', score: 68, color: 'orange' },
  { stage: 3, title: 'Stage 3: Shear Precursor', shortTitle: '3. Precursor', risk: 'HIGH', desc: 'Rain 82mm | Soil 89% | Multi-node shear anomaly | Risk window: 10–20 min', score: 82, color: 'orange' },
  { stage: 4, title: 'Stage 4: CRITICAL — Imminent Failure', shortTitle: '4. Critical', risk: 'CRITICAL', desc: 'Rain 110mm | Soil 96% | Active sliding plane | Risk window: <10 min', score: 94, color: 'red' },
];

const riskBgMap: Record<string, string> = {
  LOW: 'bg-emerald-950 text-emerald-200 border-emerald-500',
  MODERATE: 'bg-amber-950 text-amber-200 border-amber-500',
  HIGH: 'bg-orange-950 text-orange-200 border-orange-500',
  CRITICAL: 'bg-red-950 text-red-200 border-red-500 animate-pulse',
};

export const SimulationBar: React.FC = () => {
  const {
    simulationStage,
    setSimulationStage,
    isSimulating,
    simSpeed,
    setSimSpeed,
    startSimulation,
    pauseSimulation,
    stepSimulation,
    resetSimulation,
    telemetry
  } = useSimulation();

  // Intra-stage progress: counts from 0→100% within the current stage interval
  const [stageProgress, setStageProgress] = useState<number>(0);

  // Reset progress when stage or simulating state changes
  useEffect(() => {
    setStageProgress(0);
  }, [simulationStage, isSimulating]);

  // Drive progress bar animation while simulating
  useEffect(() => {
    if (!isSimulating || simulationStage >= 4) {
      if (!isSimulating) setStageProgress(0);
      return;
    }
    const intervalMs = Math.round(7000 / simSpeed);
    const tickMs = 100;
    const increment = (tickMs / intervalMs) * 100;

    const ticker = setInterval(() => {
      setStageProgress(p => Math.min(p + increment, 100));
    }, tickMs);

    return () => clearInterval(ticker);
  }, [isSimulating, simulationStage, simSpeed]);

  const overallProgress = (simulationStage / 4) * 100;
  const currentDef = STAGE_DEFS[simulationStage];

  return (
    <div className="bg-[#091124] border-b border-[#1c2e54] px-3 sm:px-6 py-2.5 shadow-tactical">

      {/* ── Top Controller Bar ─────────────────────────────────────── */}
      <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3">

        {/* Left: Mode badge + Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Mode Badge */}
          <div className="flex items-center space-x-2 bg-[#0e1933] border border-[#233863] rounded-xl px-3 py-1.5 shadow-inner">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Hazard Simulator
            </span>
            <span className="text-[10px] bg-cyan-950 text-cyan-300 font-mono px-2 py-0.5 rounded border border-cyan-700/50">
              Stage {simulationStage}/4
            </span>
            {isSimulating && (
              <span className="flex items-center space-x-1 text-[10px] text-emerald-300 font-bold animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>LIVE</span>
              </span>
            )}
          </div>

          {/* Start / Pause Button */}
          {!isSimulating ? (
            <button
              onClick={startSimulation}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-glow-emerald transition-all active:scale-95"
              title="Start dynamic automatic progression of risk parameters"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Simulate Risk Surge</span>
            </button>
          ) : (
            <button
              onClick={pauseSimulation}
              className="flex items-center space-x-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-glow-amber transition-all active:scale-95 animate-pulse"
              title="Pause auto-advancing simulation"
            >
              <Pause className="w-3.5 h-3.5 fill-white" />
              <span>Pause Sim</span>
            </button>
          )}

          {/* Step Stage */}
          <button
            onClick={stepSimulation}
            className="flex items-center space-x-1 bg-[#122040] hover:bg-[#192b57] text-slate-200 hover:text-cyan-300 border border-[#233863] text-xs font-semibold px-3 py-1.5 rounded-xl transition-all active:scale-95"
            title="Step to next simulation stage"
          >
            <FastForward className="w-3.5 h-3.5 text-cyan-400" />
            <span>Next Stage</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={resetSimulation}
            className="flex items-center space-x-1 bg-[#122040] hover:bg-red-950/70 hover:text-red-300 hover:border-red-600/50 text-slate-300 border border-[#233863] text-xs font-semibold px-3 py-1.5 rounded-xl transition-all active:scale-95"
            title="Reset telemetry and active sensors back to baseline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          {/* Speed Multiplier */}
          <div className="flex items-center bg-[#0d172e] border border-[#20345d] rounded-xl p-0.5 text-xs">
            <span className="text-[10px] text-slate-400 font-mono px-1.5 flex items-center">
              <Zap className="w-3 h-3 text-cyan-400 mr-0.5" /> Speed:
            </span>
            {[1, 2, 4].map(spd => (
              <button
                key={spd}
                onClick={() => setSimSpeed(spd)}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition-colors ${
                  simSpeed === spd 
                    ? 'bg-cyan-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Right: Interactive 5-Stage Stepper Track */}
        <div className="relative pt-2 pb-1 overflow-x-auto no-scrollbar">
          {/* Overall Progress Line */}
          <div className="hidden sm:block absolute top-5 left-4 right-4 h-1 bg-[#18274a] rounded-full z-0 overflow-hidden">
            <div 
              className={`h-full transition-all duration-700 rounded-full ${
                simulationStage >= 4 ? 'bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500' :
                simulationStage >= 2 ? 'bg-gradient-to-r from-emerald-500 to-amber-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${overallProgress}%` }}
            />
          </div>

          {/* Stage Buttons */}
          <div className="relative z-10 flex items-center gap-1.5 sm:gap-2">
            {STAGE_DEFS.map((st) => {
              const isCurrent = simulationStage === st.stage;
              const isPast = simulationStage > st.stage;

              let badgeStyle = 'bg-[#0f1933] text-slate-400 border-[#1c2e54] hover:bg-[#142345] hover:text-slate-200';
              if (isCurrent) {
                if (st.risk === 'LOW') badgeStyle = 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-glow-emerald scale-105';
                if (st.risk === 'MODERATE') badgeStyle = 'bg-amber-950 text-amber-300 border-amber-500 shadow-glow-amber scale-105';
                if (st.risk === 'HIGH') badgeStyle = 'bg-orange-950 text-orange-300 border-orange-500 shadow-glow-orange scale-105';
                if (st.risk === 'CRITICAL') badgeStyle = 'bg-red-950 text-red-200 border-red-500 shadow-glow-red scale-105 animate-pulse';
              } else if (isPast) {
                badgeStyle = 'bg-[#0e1c3a] text-slate-300 border-[#243b6b]';
              }

              return (
                <button
                  key={st.stage}
                  onClick={() => setSimulationStage(st.stage)}
                  className={`px-2.5 py-1 sm:py-1.5 rounded-xl text-[11px] font-semibold border transition-all whitespace-nowrap flex items-center space-x-1.5 ${badgeStyle}`}
                  title={st.desc}
                >
                  <span className={`w-2 h-2 rounded-full ${
                    isCurrent ? 'bg-current animate-ping' : isPast ? 'bg-cyan-400' : 'bg-slate-600'
                  }`} />
                  <span>{st.shortTitle}</span>
                  <span className="font-mono text-[10px] opacity-80">[{st.score}]</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Live Stage Progress Banner ─────────────────────────────── */}
      {isSimulating && (
        <div className={`mt-2 rounded-xl border px-3 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${riskBgMap[currentDef.risk]}`}>
          <div className="flex items-center space-x-2">
            {currentDef.risk === 'CRITICAL' ? (
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400 animate-pulse" />
            ) : (
              <Activity className="w-4 h-4 shrink-0 text-current" />
            )}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider block">{currentDef.title}</span>
              <span className="text-[11px] opacity-80">{currentDef.desc}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 shrink-0">
            {simulationStage < 4 && (
              <div className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 opacity-70" />
                <span className="text-[11px] font-mono font-bold opacity-90">
                  Next stage in {((1 - stageProgress / 100) * (7 / simSpeed)).toFixed(1)}s
                </span>
              </div>
            )}
            {simulationStage >= 4 && (
              <span className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Max Stage Reached
              </span>
            )}
          </div>
        </div>
      )}

      {/* ── Intra-Stage Progress Bar (fills within each stage interval) ── */}
      {isSimulating && simulationStage < 4 && (
        <div className="mt-1.5 h-1 bg-[#182647] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-none ${
              currentDef.risk === 'CRITICAL' ? 'bg-red-500' :
              currentDef.risk === 'HIGH' ? 'bg-orange-500' :
              currentDef.risk === 'MODERATE' ? 'bg-amber-500' : 'bg-emerald-500'
            }`}
            style={{ width: `${stageProgress}%`, transition: 'width 100ms linear' }}
          />
        </div>
      )}

      {/* ── Static Sub-Banner: Real-time Telemetry Highlights ───────── */}
      <div className="mt-2 pt-2 border-t border-[#162547] flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="text-slate-300 font-semibold uppercase tracking-wider text-[10px]">Real-time Telemetry:</span>
          <span>Rain: <strong className="text-white font-mono">{telemetry.rainfallMm}mm</strong></span>
          <span>•</span>
          <span>Moisture: <strong className="text-cyan-300 font-mono">{telemetry.soilMoisturePercent}%</strong></span>
          <span>•</span>
          <span>Vibration: <strong className={`${
            telemetry.groundVibration === 'Critical' ? 'text-red-400 font-bold' :
            telemetry.groundVibration === 'High' ? 'text-orange-400 font-bold' : 'text-slate-200'
          }`}>{telemetry.groundVibration}</strong></span>
          <span>•</span>
          <span>FoS: <strong className="text-white font-mono">{telemetry.factorOfSafety.toFixed(2)}</strong></span>
        </div>

        {telemetry.estimatedRiskWindow && (
          <div className="flex items-center space-x-1.5 text-amber-300 bg-amber-950/80 border border-amber-500/60 px-2.5 py-0.5 rounded-lg shadow-inner">
            <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span className="text-[11px] font-bold uppercase tracking-wide">
              AI Risk Window: <strong className="text-amber-200 underline underline-offset-2">{telemetry.estimatedRiskWindow}</strong>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
