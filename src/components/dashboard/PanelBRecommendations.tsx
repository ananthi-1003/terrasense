import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  Users, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Radio, 
  Send, 
  FileText,
  Truck,
  Building,
  Route,
  Hourglass,
  Info,
  ChevronRight
} from 'lucide-react';
import type { LandslideLocation, DelayTactic } from '../../data/landslideLocations';

interface PanelBRecommendationsProps {
  location: LandslideLocation;
  onTriggerAlert: (type: 'SMS' | 'Siren' | 'Authority') => void;
}

export const PanelBRecommendations: React.FC<PanelBRecommendationsProps> = ({ 
  location,
  onTriggerAlert
}) => {
  // Allow user to check off or acknowledge actionable recommendations
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCompletedItems(prev => ({
      ...prev,
      [`${location.id}-${id}`]: !prev[`${location.id}-${id}`]
    }));
  };

  const isCritical = location.riskLevel === 'Critical';

  return (
    <div className="bg-[#070b16] border border-[#1e2e50] rounded-2xl p-4 shadow-xl flex flex-col space-y-3.5">
      {/* Panel Header */}
      <div className="flex items-start justify-between border-b border-[#1c2a47] pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-amber-950/80 border border-amber-600/40 text-amber-400">
            <Hourglass className="w-4 h-4 text-amber-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase bg-amber-950/70 px-2 py-0.5 rounded border border-amber-800/50">
                PANEL B // EARLY WARNING
              </span>
              <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                BUYING EVACUATION TIME
              </span>
            </div>
            {/* Required Title */}
            <h3 className="text-sm sm:text-base font-black text-white tracking-tight mt-1">
              Early Warning Panel (Demo Simulation)
            </h3>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#101c36] text-cyan-300 border border-cyan-700/50 hidden sm:inline-block">
          DEMO SIMULATION
        </span>
      </div>

      {/* Explicit Disclaimer: Not claiming to stop landslide, but to gain time */}
      <div className="bg-[#0b1426] border border-amber-500/40 rounded-xl p-2.5 flex items-start space-x-2.5 text-xs font-mono shadow-inner">
        <div className="p-1 rounded bg-amber-950/90 text-amber-400 shrink-0 mt-0.5 border border-amber-600/50">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
        </div>
        <div className="leading-relaxed">
          <span className="text-amber-300 font-bold uppercase tracking-wider block text-[10px]">
            CRITICAL MISSION DOCTRINE:
          </span>
          <p className="text-slate-300 text-[11px] mt-0.5">
            These directives <strong className="text-amber-200">do NOT claim to stop the landslide</strong>. They are engineered to <strong className="text-cyan-300">gain vital hours of evacuation time</strong>, delay failure thresholds, and reduce human exposure during the critical hazard window.
          </p>
        </div>
      </div>

      {/* 1. Estimated Time Window Callout */}
      <div className="p-3 rounded-xl border flex items-center space-x-3 bg-amber-950/40 border-amber-500/50">
        <div className="p-2 rounded-lg bg-amber-900/60 text-amber-400">
          <Clock className="w-4 h-4 animate-pulse" />
        </div>
        <div className="flex-1">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
            CRITICAL EARLY WARNING HORIZON
          </div>
          <div className="text-xs sm:text-sm font-black font-mono tracking-wide text-amber-300">
            Estimated Warning Window: ∼30-60 mins (Demo Simulation)
          </div>
        </div>
      </div>

      {/* 2. Affected Summary Callout */}
      <div className="bg-[#091022] border border-[#1b2a4c] p-3 rounded-xl">
        <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-1.5">
          <span className="font-bold flex items-center space-x-1.5 text-slate-200">
            <Users className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-rose-400 font-bold">{location.affected.summary}</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">PRIORITY TIER 1</span>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-[#162340] text-[11px] font-mono">
          <div className="bg-[#060a14] p-1.5 rounded-lg border border-[#162138]">
            <div className="text-slate-400 text-[10px] flex items-center space-x-1">
              <Route className="w-3 h-3 text-cyan-400" />
              <span>ROADS</span>
            </div>
            <div className="font-bold text-white mt-0.5 truncate" title={location.affected.roads}>
              {location.affected.roads.split('(')[0].trim()}
            </div>
          </div>

          <div className="bg-[#060a14] p-1.5 rounded-lg border border-[#162138]">
            <div className="text-slate-400 text-[10px] flex items-center space-x-1">
              <Building className="w-3 h-3 text-amber-400" />
              <span>VILLAGES</span>
            </div>
            <div className="font-bold text-white mt-0.5 truncate" title={location.affected.villages}>
              {location.affected.villages.split('(')[0].trim()}
            </div>
          </div>

          <div className="bg-[#060a14] p-1.5 rounded-lg border border-[#162138]">
            <div className="text-slate-400 text-[10px] flex items-center space-x-1">
              <Users className="w-3 h-3 text-red-400" />
              <span>PEOPLE</span>
            </div>
            <div className="font-bold text-red-400 mt-0.5 truncate">
              {location.affected.people.split('within')[0].trim()}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Actionable Directives List with Explicit AI Reasoning Sub-text */}
      <div>
        <div className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span className="flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>TIME-GAINING DIRECTIVES & REASONING</span>
          </span>
          <span className="text-[10px] text-slate-500 font-normal">Click to mark executed</span>
        </div>

        <div className="space-y-2.5">
          {location.recommendations.map((tactic, index) => {
            const isDone = !!completedItems[`${location.id}-${tactic.id}`];
            return (
              <div
                key={tactic.id || index}
                onClick={() => toggleItem(tactic.id)}
                className={`p-3 rounded-xl border text-xs font-mono flex flex-col space-y-2 cursor-pointer transition-all ${
                  isDone 
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-400 opacity-70'
                    : 'bg-[#091022] hover:bg-[#0f1b36] border-[#1f2f54] text-slate-200'
                }`}
              >
                {/* Top Row: Directive & Status Button */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start space-x-2.5">
                    <div className="mt-0.5 shrink-0">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <div className="w-4 h-4 rounded border border-amber-500/60 bg-amber-950/50 flex items-center justify-center text-[10px] text-amber-300 font-bold">
                          {index + 1}
                        </div>
                      )}
                    </div>

                    <div className={`font-bold text-xs tracking-tight ${
                      isDone ? 'line-through text-slate-400' : 'text-white'
                    }`}>
                      {tactic.action}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleItem(tactic.id);
                    }}
                    className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase transition-all shrink-0 ${
                      isDone 
                        ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/50' 
                        : 'bg-amber-950 text-amber-300 hover:bg-amber-900 border border-amber-700/60'
                    }`}
                  >
                    {isDone ? 'ACKNOWLEDGED' : 'EXECUTE'}
                  </button>
                </div>

                {/* Bottom Row: AI Reasoning Sub-text */}
                <div className="bg-[#050914] p-2 rounded-lg border border-[#16223d] ml-6 text-[11px] leading-relaxed">
                  <p className="text-cyan-300 font-medium">
                    {tactic.aiReason}
                  </p>
                  {tactic.timeGainEstimate && (
                    <div className="mt-1 flex items-center space-x-1.5 text-[10px] font-mono text-emerald-400">
                      <Hourglass className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="font-semibold uppercase">Estimated Time Gained:</span>
                      <span className="text-white font-bold">{tactic.timeGainEstimate}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Action Dispatches */}
      <div className="grid grid-cols-3 gap-2 pt-1">
        <button
          onClick={() => onTriggerAlert('SMS')}
          className="py-2 px-1.5 bg-gradient-to-b from-[#152542] to-[#0c1629] hover:from-[#1b3158] hover:to-[#101d36] text-slate-200 border border-[#243a66] rounded-xl text-[10px] font-mono font-bold flex items-center justify-center space-x-1 transition-all shadow-sm truncate"
          title="Send SMS (Demo)"
        >
          <Send className="w-3 h-3 text-cyan-400 shrink-0" />
          <span className="truncate">Send SMS (Demo)</span>
        </button>

        <button
          onClick={() => onTriggerAlert('Siren')}
          className="py-2 px-1.5 bg-gradient-to-b from-red-950/70 to-red-900/40 hover:from-red-900/90 hover:to-red-800/60 text-red-200 border border-red-700/60 rounded-xl text-[10px] font-mono font-bold flex items-center justify-center space-x-1 transition-all shadow-sm truncate"
          title="Activate Siren (Demo)"
        >
          <Radio className="w-3 h-3 text-red-400 animate-pulse shrink-0" />
          <span className="truncate">Activate Siren (Demo)</span>
        </button>

        <button
          onClick={() => onTriggerAlert('Authority')}
          className="py-2 px-1.5 bg-gradient-to-b from-amber-950/70 to-amber-900/40 hover:from-amber-900/90 hover:to-amber-800/60 text-amber-200 border border-amber-700/60 rounded-xl text-[10px] font-mono font-bold flex items-center justify-center space-x-1 transition-all shadow-sm truncate"
          title="Notify Control Room (Demo)"
        >
          <Truck className="w-3 h-3 text-amber-400 shrink-0" />
          <span className="truncate">Notify Control Room (Demo)</span>
        </button>
      </div>
    </div>
  );
};
