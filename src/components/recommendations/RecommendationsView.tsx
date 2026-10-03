import React, { useState } from 'react';
import { 
  ListChecks, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  Truck, 
  Radio, 
  LifeBuoy, 
  Wrench,
  Clock,
  Sparkles,
  ExternalLink,
  Filter,
  Check
} from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

export const RecommendationsView: React.FC = () => {
  const { 
    recommendations, 
    telemetry, 
    activeHotspot, 
    triggerSMS, 
    recommendRoadClosure, 
    deployAdditionalNode, 
    isAdditionalNodeDeployed, 
    roadClosureActive, 
    triggerAuthorityAlert, 
    setActiveTab,
    showToast
  } = useSimulation();

  const { riskScore, riskLevel } = telemetry;
  const [targetFilter, setTargetFilter] = useState<string>('ALL');
  const [executedOrders, setExecutedOrders] = useState<number[]>([]);

  const toggleExecute = (order: number, title: string) => {
    if (executedOrders.includes(order)) {
      setExecutedOrders(prev => prev.filter(o => o !== order));
      showToast('Protocol Reopened', `Re-opened action protocol: ${title}`, 'info');
    } else {
      setExecutedOrders(prev => [...prev, order]);
      showToast('Protocol Executed', `Logged completed operational action: ${title}`, 'success');
    }
  };

  const filteredRecommendations = recommendations.filter(rec => {
    if (targetFilter === 'ALL') return true;
    return rec.target.toLowerCase().includes(targetFilter.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="tactical-card rounded-2xl p-5 shadow-tactical border border-[#1e2e54]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <ListChecks className="w-4 h-4" />
              <span>AI Operational Mitigation Protocol</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Adaptive Mitigation & Preventive Response Plans
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Target Sector: <strong className="text-white">{activeHotspot.name}</strong> • Current Threat: <span className="font-bold text-red-400">{riskLevel} ({riskScore}/100)</span>
            </p>
          </div>

          <div className="bg-[#0e1830] border border-cyan-500/40 rounded-xl px-4 py-2.5 flex items-center space-x-2.5 text-cyan-300 text-xs shadow-inner">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="font-semibold">
              {riskScore >= 75 ? 'Critical escalation threshold active.' : riskScore >= 50 ? 'Precautionary staging advised.' : 'Standard preventive surveillance.'}
            </span>
          </div>
        </div>

        {/* Essential Disaster Mitigation Principle Callout */}
        <div className="mt-4 bg-[#0e1933] border-l-4 border-cyan-400 rounded-r-xl p-3.5 text-xs text-slate-200 shadow-inner">
          <div className="flex items-start space-x-2.5">
            <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white uppercase tracking-wider text-[11px]">Crucial Disaster Mitigation Principle:</strong>
              <p className="text-slate-300 mt-0.5 leading-relaxed">
                TerraSense does not claim to physically halt slope failures. 
                <strong className="text-cyan-300"> "These actions are intended to reduce human exposure and gain valuable response time."</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-cyan-400" /> Filter By Agency:
          </span>
          {[
            { id: 'ALL', label: 'All Protocols' },
            { id: 'Civil', label: 'Civil Admin' },
            { id: 'Traffic', label: 'Traffic Police' },
            { id: 'SDRF', label: 'SDRF / NDRF' },
            { id: 'Public', label: 'Public & Villages' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setTargetFilter(f.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                targetFilter === f.id
                  ? 'bg-cyan-600 text-white shadow-glow-cyan'
                  : 'bg-[#0f172a] text-slate-400 hover:text-slate-200 border border-[#1e2f52]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-slate-400">
          Completed: <strong className="text-emerald-400">{executedOrders.length}</strong> / {recommendations.length} Action Protocols
        </div>
      </div>

      {/* Recommendations Cards List */}
      <div className="space-y-3">
        {filteredRecommendations.map((rec) => {
          const isDone = executedOrders.includes(rec.order);

          let urgencyBorder = 'border-[#1e2d4a] bg-[#0c1426]';
          let urgencyBadge = 'bg-slate-800 text-slate-300 border-slate-700';

          if (rec.urgency === 'ELEVATED') {
            urgencyBorder = 'border-amber-500/40 bg-[#0f172a]';
            urgencyBadge = 'bg-amber-950/80 text-amber-300 border-amber-600/50';
          } else if (rec.urgency === 'URGENT') {
            urgencyBorder = 'border-orange-500/50 bg-[#12182b]';
            urgencyBadge = 'bg-orange-950/80 text-orange-300 border-orange-600/50';
          } else if (rec.urgency === 'CRITICAL') {
            urgencyBorder = 'border-red-500/60 bg-[#181324] shadow-glow-red/20';
            urgencyBadge = 'bg-red-950 text-red-200 border-red-500 animate-pulse';
          }

          if (isDone) {
            urgencyBorder = 'border-emerald-500/50 bg-[#0a1820] opacity-90';
          }

          return (
            <div
              key={rec.id}
              className={`tactical-card rounded-2xl p-4 sm:p-5 border transition-all duration-200 ${urgencyBorder}`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start space-x-3.5">
                  {/* Protocol Index Button (Click to mark executed) */}
                  <button
                    onClick={() => toggleExecute(rec.order, rec.title)}
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-all ${
                      isDone 
                        ? 'bg-emerald-600 border-emerald-400 text-white shadow-glow-emerald' 
                        : 'bg-[#121f3d] border-[#203661] text-cyan-400 hover:border-cyan-400'
                    }`}
                    title={isDone ? 'Mark as pending' : 'Mark protocol as executed'}
                  >
                    {isDone ? <Check className="w-5 h-5 stroke-[3]" /> : `P${rec.order}`}
                  </button>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className={`text-sm sm:text-base font-bold tracking-wide transition-colors ${
                        isDone ? 'line-through text-slate-400' : 'text-white'
                      }`}>
                        {rec.title}
                      </h3>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border font-mono ${urgencyBadge}`}>
                        {rec.urgency}
                      </span>
                      <span className="text-[10px] bg-[#111e38] text-cyan-300 px-2.5 py-0.5 rounded-md border border-[#1e2f52] font-semibold">
                        Agency: {rec.target}
                      </span>
                      {isDone && (
                        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-600 px-2 py-0.5 rounded font-bold uppercase">
                          ✓ Completed
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed max-w-3xl">
                      {rec.description}
                    </p>
                  </div>
                </div>

                {/* Direct Action Trigger Buttons */}
                <div className="shrink-0 flex flex-wrap items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#1c2c4d]">
                  {rec.order === 1 && (
                    <button
                      onClick={triggerSMS}
                      className="flex items-center space-x-1.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-glow-red transition-all active:scale-95"
                    >
                      <Users className="w-4 h-4" />
                      <span>Send Cell SMS</span>
                    </button>
                  )}

                  {rec.order === 3 && (
                    <button
                      onClick={recommendRoadClosure}
                      disabled={roadClosureActive}
                      className={`flex items-center space-x-1.5 text-xs font-bold px-3.5 py-2 rounded-xl transition-all ${
                        roadClosureActive 
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-600 cursor-default'
                          : 'bg-amber-600 hover:bg-amber-500 text-white shadow-glow-amber active:scale-95'
                      }`}
                    >
                      <Truck className="w-4 h-4" />
                      <span>{roadClosureActive ? '✓ Barricade Active' : 'Barricade Route'}</span>
                    </button>
                  )}

                  {rec.order === 4 && (
                    <button
                      onClick={deployAdditionalNode}
                      disabled={isAdditionalNodeDeployed}
                      className={`flex items-center space-x-1.5 text-xs font-bold px-3.5 py-2 rounded-xl transition-all ${
                        isAdditionalNodeDeployed
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-600 cursor-default'
                          : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-glow-cyan active:scale-95'
                      }`}
                    >
                      <Radio className="w-4 h-4" />
                      <span>{isAdditionalNodeDeployed ? '✓ TS-09 Active' : 'Deploy Node TS-09'}</span>
                    </button>
                  )}

                  {rec.order === 5 && (
                    <button
                      onClick={triggerAuthorityAlert}
                      className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow transition-all active:scale-95"
                    >
                      <LifeBuoy className="w-4 h-4" />
                      <span>Notify SDMA</span>
                    </button>
                  )}

                  {/* Complete / Toggle execution button */}
                  <button
                    onClick={() => toggleExecute(rec.order, rec.title)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      isDone
                        ? 'bg-[#101e36] text-slate-400 border-[#1c2e52] hover:text-white'
                        : 'bg-[#122040] text-cyan-300 border-[#223866] hover:bg-[#1a2d59]'
                    }`}
                  >
                    {isDone ? 'Undo' : 'Mark Done'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0d1527] border border-[#1e2e54] rounded-2xl p-4 shadow-tactical">
        <span className="text-xs text-slate-300">
          Want to simulate emergency sirens or broadcast localized multilingual SMS?
        </span>
        <button
          onClick={() => setActiveTab('alerts')}
          className="flex items-center space-x-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-[#122040] border border-[#213866] px-4 py-2 rounded-xl transition-all"
        >
          <span>Open Alert Center Terminal →</span>
        </button>
      </div>
    </div>
  );
};
