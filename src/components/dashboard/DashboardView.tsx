import React from 'react';
import { RiskGaugeCard } from './RiskGaugeCard';
import { TelemetryGrid } from './TelemetryGrid';
import { InteractiveRiskMap } from './InteractiveRiskMap';
import { useSimulation } from '../../context/SimulationContext';
import { Sparkles, ArrowRight, ShieldCheck, Activity, AlertTriangle } from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { telemetry, activeHotspot, setActiveTab } = useSimulation();

  return (
    <div className="space-y-5">
      {/* Top Section: Risk Gauge Card + Live Telemetry Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Current Risk Card (4 cols on lg, 5 cols on xl) */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
          <RiskGaugeCard />
        </div>

        {/* Live Environment Data & Mission Summary (7 cols on lg, 8 cols on xl) */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between space-y-4">
          {/* Live 6-card Environment Grid */}
          <TelemetryGrid />

          {/* Quick AI Precursor Diagnostic Ribbon */}
          <div className="tactical-card rounded-2xl p-4 sm:p-4.5 shadow-tactical flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-[#1e2e54]">
            <div className="flex items-start space-x-3.5">
              <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-600/40 text-cyan-400 shrink-0 mt-0.5 shadow-inner">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    AI Precursor Assessment
                  </span>
                  <span className="text-[10px] bg-cyan-950 text-cyan-300 font-mono px-2 py-0.2 rounded border border-cyan-700/50">
                    {activeHotspot.name}
                  </span>
                  {telemetry.riskScore >= 70 && (
                    <span className="text-[10px] bg-red-950 text-red-300 font-mono px-2 py-0.2 rounded border border-red-600 animate-pulse font-bold">
                      CRITICAL PRECURSOR
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-2xl line-clamp-2">
                  {telemetry.aiExplanation}
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center space-x-2">
              <button
                onClick={() => setActiveTab('warning')}
                className="flex items-center space-x-1 text-xs font-bold text-amber-300 hover:text-amber-200 bg-amber-950/70 hover:bg-amber-900/80 px-3 py-2 rounded-xl transition-all border border-amber-600/40"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Risk Window</span>
              </button>

              <button
                onClick={() => setActiveTab('analysis')}
                className="flex items-center space-x-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-[#122040] hover:bg-[#1a2e59] px-3 py-2 rounded-xl transition-all border border-[#213866]"
              >
                <span>Causal Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Risk Map Section */}
      <div className="w-full">
        <InteractiveRiskMap />
      </div>
    </div>
  );
};
