import React from 'react';
import { 
  X, 
  MapPin, 
  Activity, 
  Droplets, 
  Radio, 
  TrendingUp, 
  Route, 
  Home, 
  Sparkles, 
  Layers,
  Gauge,
  Mountain
} from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

export const HotspotDetailModal: React.FC = () => {
  const { 
    selectedHotspotForModal, 
    setSelectedHotspotForModal, 
    telemetry, 
    activeNodes,
    setActiveTab
  } = useSimulation();

  if (!selectedHotspotForModal) return null;

  const close = () => setSelectedHotspotForModal(null);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="tactical-card rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-[#233866]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#1b2b4d] flex items-center justify-between bg-[#091124]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-red-950/80 border border-red-500/60 flex items-center justify-center text-red-400 shadow-glow-red">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-white tracking-wide">
                {selectedHotspotForModal.name}
              </h3>
              <p className="text-[11px] text-slate-300">
                {selectedHotspotForModal.sector} • Elevation: <strong className="text-white font-mono">{selectedHotspotForModal.elevation} m MSL</strong>
              </p>
            </div>
          </div>
          <button
            onClick={close}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1a2c52] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Key Indicators Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#0e1830] p-3 rounded-xl border border-[#1e3056]">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Risk Index</div>
              <div className="flex items-baseline space-x-1.5 mt-1">
                <span className={`text-2xl font-bold font-mono ${
                  telemetry.riskScore >= 75 ? 'text-red-400' : telemetry.riskScore >= 50 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {telemetry.riskScore}
                </span>
                <span className="text-xs text-slate-400">/ 100</span>
              </div>
              <div className="text-[10px] font-bold uppercase mt-0.5 text-slate-300 font-mono">
                {telemetry.riskLevel} THREAT
              </div>
            </div>

            <div className="bg-[#0e1830] p-3 rounded-xl border border-[#1e3056]">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center space-x-1 font-semibold">
                <Droplets className="w-3 h-3 text-cyan-400" />
                <span>Rainfall</span>
              </div>
              <div className="text-xl font-bold font-mono text-cyan-300 mt-1">
                {telemetry.rainfallMm} mm
              </div>
              <div className="text-[10px] text-slate-400 capitalize">
                Intensity: <strong className="text-slate-200">{telemetry.rainfallIntensity}</strong>
              </div>
            </div>

            <div className="bg-[#0e1830] p-3 rounded-xl border border-[#1e3056]">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center space-x-1 font-semibold">
                <Layers className="w-3 h-3 text-blue-400" />
                <span>Moisture</span>
              </div>
              <div className="text-xl font-bold font-mono text-blue-400 mt-1">
                {telemetry.soilMoisturePercent}%
              </div>
              <div className="text-[10px] text-slate-400">
                Pore Saturation: <strong className="text-slate-200">High</strong>
              </div>
            </div>

            <div className="bg-[#0e1830] p-3 rounded-xl border border-[#1e3056]">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center space-x-1 font-semibold">
                <Activity className="w-3 h-3 text-orange-400" />
                <span>Vibration</span>
              </div>
              <div className="text-xl font-bold text-white mt-1 truncate">
                {telemetry.groundVibration}
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                Active Nodes: {activeNodes.length}
              </div>
            </div>
          </div>

          {/* AI Explanation Box */}
          <div className="bg-[#0c162b] border border-cyan-500/40 rounded-xl p-4 shadow-inner">
            <div className="flex items-center space-x-2 text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>AI Causal Geotechnical Assessment</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              {telemetry.aiExplanation}
            </p>
          </div>

          {/* Infrastructure & Exposure */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#0e1830] p-3.5 rounded-xl border border-[#1e3056]">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-200 mb-2">
                <Route className="w-4 h-4 text-amber-400" />
                <span>Vulnerable Transport Route</span>
              </div>
              <p className="text-xs font-bold text-white">{selectedHotspotForModal.nearbyRoad}</p>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Vulnerable Corridor: ~{selectedHotspotForModal.affectedAreaRadiusKm * 2} km. High probability of debris blockage during continuous downpours.
              </p>
            </div>

            <div className="bg-[#0e1830] p-3.5 rounded-xl border border-[#1e3056]">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-200 mb-2">
                <Home className="w-4 h-4 text-cyan-400" />
                <span>Downstream Settlement</span>
              </div>
              <p className="text-xs font-bold text-white">{selectedHotspotForModal.nearbyVillage}</p>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Down-slope settlement within runout envelope (~1,450 residents). Staged advisory notice and assembly point clearance active.
              </p>
            </div>
          </div>

          {/* Terrain & History */}
          <div className="bg-[#0e1830] p-3 rounded-xl border border-[#1e3056] text-xs space-y-1">
            <div className="text-slate-400 uppercase tracking-wider text-[10px] font-bold">
              Terrain & Historical Context
            </div>
            <div className="text-slate-200 text-[11px]">
              Slope Incline: <strong className="text-white">{selectedHotspotForModal.slopeDeg}°</strong> • 
              Historical Events: <strong className="text-amber-300">{selectedHotspotForModal.historicalIncidents} recorded</strong> • 
              Lithology: <span className="text-cyan-300 font-medium">{selectedHotspotForModal.geology}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-[#1b2b4d] bg-[#091124] flex items-center justify-between">
          <button
            onClick={() => {
              close();
              setActiveTab('analysis');
            }}
            className="flex items-center space-x-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Open Detailed Risk Analysis & Graph →</span>
          </button>
          <button
            onClick={close}
            className="px-4 py-2 rounded-xl bg-[#132242] hover:bg-[#1a2e59] text-xs font-bold text-white transition-colors border border-[#213766]"
          >
            Close Modal
          </button>
        </div>
      </div>
    </div>
  );
};
