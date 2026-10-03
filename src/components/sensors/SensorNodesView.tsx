import React, { useState } from 'react';
import { 
  Radio, 
  Wifi, 
  Battery, 
  Activity, 
  Droplets, 
  Clock, 
  MapPin, 
  Signal, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  RefreshCw,
  Zap,
  Cpu
} from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';
import type { SensorNode } from '../../types';

export const SensorNodesView: React.FC = () => {
  const { 
    activeNodes, 
    activeRegion, 
    deployAdditionalNode, 
    isAdditionalNodeDeployed,
    showToast
  } = useSimulation();

  const [filter, setFilter] = useState<'ALL' | 'ONLINE' | 'WARNING' | 'CRITICAL'>('ALL');
  const [pingingNodeId, setPingingNodeId] = useState<string | null>(null);

  const filteredNodes = activeNodes.filter(node => {
    if (filter === 'ALL') return true;
    return node.status === filter;
  });

  const pingNode = (id: string) => {
    setPingingNodeId(id);
    setTimeout(() => {
      setPingingNodeId(null);
      showToast(`Node ${id} Responded`, `Ping round-trip: ${Math.floor(Math.random() * 40) + 95}ms via Gateway GW-01. LoRaWAN link healthy.`, 'success');
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="tactical-card rounded-2xl p-5 shadow-tactical flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#1e2e54]">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Radio className="w-4 h-4" />
            <span>Tactical Field Telemetry Infrastructure</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Self-Powered LoRaWAN Sensor Mesh ({activeRegion.name})
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Ultra-low power multi-sensor nodes streaming colluvial pore saturation, 3-axis MEMS accelerometer FFT vibrations, and scarp tilt.
          </p>
        </div>

        {/* Deploy Additional Node Button */}
        <button
          onClick={deployAdditionalNode}
          disabled={isAdditionalNodeDeployed}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-tactical active:scale-95 ${
            isAdditionalNodeDeployed
              ? 'bg-emerald-950/90 border border-emerald-500 text-emerald-300 cursor-default shadow-glow-emerald'
              : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-glow-cyan'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>{isAdditionalNodeDeployed ? '✓ TS-09 Deployed (Active Mesh)' : 'Deploy Supplementary Node (TS-09)'}</span>
        </button>
      </div>

      {/* Filter Tabs & Telemetry Summary */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          {(['ALL', 'ONLINE', 'WARNING', 'CRITICAL'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === f 
                  ? 'bg-cyan-600 text-white shadow-glow-cyan' 
                  : 'bg-[#0e172a] text-slate-400 hover:text-slate-200 border border-[#1e2f52]'
              }`}
            >
              {f} ({activeNodes.filter(n => f === 'ALL' ? true : n.status === f).length})
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400 font-mono flex items-center space-x-3">
          <span>Active Mesh Nodes: <strong className="text-cyan-300 font-bold">{activeNodes.length}</strong></span>
          <span>•</span>
          <span>Network: <strong className="text-slate-200">868 MHz LoRaWAN / Star-of-Stars</strong></span>
        </div>
      </div>

      {/* Nodes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredNodes.map((node) => {
          let statusBadge = 'bg-emerald-950/80 text-emerald-300 border-emerald-600/50';
          let borderAccent = 'border-[#1e2d4a] hover:border-cyan-500/50';

          if (node.status === 'WARNING') {
            statusBadge = 'bg-amber-950/80 text-amber-300 border-amber-600/50';
            borderAccent = 'border-amber-500/50 hover:border-amber-400';
          } else if (node.status === 'CRITICAL') {
            statusBadge = 'bg-red-950 text-red-200 border-red-500 animate-pulse';
            borderAccent = 'border-red-500/70 hover:border-red-400 shadow-glow-red/30';
          }

          const isPinging = pingingNodeId === node.id;

          return (
            <div
              key={node.id}
              className={`tactical-card rounded-2xl p-4 border transition-all flex flex-col justify-between ${borderAccent}`}
            >
              <div>
                {/* Node Card Header */}
                <div className="flex items-start justify-between pb-3 border-b border-[#1b2a47]">
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-base font-extrabold text-white font-mono">{node.id}</span>
                      {node.isPortableAdditional && (
                        <span className="text-[9px] bg-cyan-950 text-cyan-300 border border-cyan-500 px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                          Tactical Deploy
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate max-w-[160px]" title={node.name}>
                      {node.name.replace(/Node TS-\d+ \((.*?)\)/, '$1')}
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${statusBadge}`}>
                    {node.status}
                  </span>
                </div>

                {/* Live Micro-Vibration Oscillating Curve */}
                <div className="mt-3 bg-[#081022] rounded-xl p-2 border border-[#162547]">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1 font-mono">
                    <span className="flex items-center gap-1">
                      <Activity className="w-3 h-3 text-cyan-400" />
                      <span>FFT Harmonic</span>
                    </span>
                    <span className={node.groundVibration === 'Critical' ? 'text-red-400 font-bold' : 'text-slate-300'}>
                      {node.peakVelocity} mm/s
                    </span>
                  </div>
                  <svg className="w-full h-5 text-cyan-400 opacity-85" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path
                      d={node.groundVibration === 'Critical' 
                        ? "M0,10 Q10,-6 20,24 T40,-8 T60,26 T80,-4 T100,10" 
                        : node.groundVibration === 'High'
                        ? "M0,10 Q15,1 30,19 T60,2 T85,18 T100,10"
                        : "M0,10 Q25,6 50,14 T100,10"}
                      fill="none"
                      stroke={node.groundVibration === 'Critical' ? '#ef4444' : node.groundVibration === 'High' ? '#f97316' : '#06b6d4'}
                      strokeWidth="2"
                      className={node.groundVibration === 'Critical' ? 'animate-pulse' : ''}
                    />
                  </svg>
                </div>

                {/* Telemetry Metrics */}
                <div className="mt-3 space-y-2 text-xs">
                  {/* Soil Moisture */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center space-x-1">
                      <Droplets className="w-3.5 h-3.5 text-blue-400" />
                      <span>Soil Moisture:</span>
                    </span>
                    <span className="font-mono font-bold text-white text-sm">
                      {node.soilMoisture}%
                    </span>
                  </div>

                  {/* Battery */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center space-x-1">
                      <Battery className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Battery Life:</span>
                    </span>
                    <div className="flex items-center space-x-1.5 font-mono">
                      <div className="w-12 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="h-full bg-emerald-400 rounded-full" 
                          style={{ width: `${node.battery}%` }}
                        />
                      </div>
                      <span className="font-bold text-white text-[11px]">{node.battery}%</span>
                    </div>
                  </div>

                  {/* Signal RSSI Meter */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center space-x-1">
                      <Signal className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Signal (RSSI):</span>
                    </span>
                    <div className="flex items-center space-x-1.5 font-mono text-[11px]">
                      {/* Signal Bars */}
                      <div className="flex items-end space-x-0.5 h-3">
                        <div className="w-1 bg-cyan-400 h-1 rounded-sm"></div>
                        <div className="w-1 bg-cyan-400 h-2 rounded-sm"></div>
                        <div className={`w-1 h-2.5 rounded-sm ${node.rssi > -80 ? 'bg-cyan-400' : 'bg-slate-700'}`}></div>
                        <div className={`w-1 h-3 rounded-sm ${node.rssi > -70 ? 'bg-cyan-400' : 'bg-slate-700'}`}></div>
                      </div>
                      <span className="text-slate-200 font-bold">{node.rssi} dBm</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Node Card Footer & Ping Test */}
              <div className="mt-3.5 pt-2.5 border-t border-[#182645] flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  <span>{node.elevation}m MSL</span>
                </span>

                <button
                  onClick={() => pingNode(node.id)}
                  disabled={isPinging}
                  className="flex items-center space-x-1 px-2 py-0.5 rounded bg-[#132242] hover:bg-[#1a2e59] text-cyan-300 font-mono transition-colors border border-[#213560]"
                  title="Test node ping latency"
                >
                  <RefreshCw className={`w-3 h-3 ${isPinging ? 'animate-spin text-cyan-400' : ''}`} />
                  <span>{isPinging ? 'Pinging...' : `${node.lastUpdateSecondsAgo}s ago`}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
