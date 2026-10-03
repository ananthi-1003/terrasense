import React, { useState } from 'react';
import { 
  BellRing, 
  Smartphone, 
  Volume2, 
  VolumeX, 
  ShieldAlert, 
  Truck, 
  Users, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  Activity, 
  Radio, 
  FileText,
  Download,
  Filter,
  Volume1
} from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';
import type { AlertItem } from '../../types';

export const AlertCenterView: React.FC = () => {
  const { 
    alerts, 
    triggerSMS, 
    isSirenActive, 
    triggerSiren, 
    stopSiren, 
    triggerAuthorityAlert, 
    recommendRoadClosure, 
    roadClosureActive, 
    activeHotspot, 
    telemetry,
    showToast
  } = useSimulation();

  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredAlerts = alerts.filter(a => {
    if (filterType === 'ALL') return true;
    return a.type === filterType;
  });

  const exportIncidentLog = () => {
    const textData = JSON.stringify(alerts, null, 2);
    const blob = new Blob([textData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `terrasense_incident_audit_${Date.now()}.json`;
    link.click();
    showToast('Audit Log Exported', 'Downloaded timestamped multi-agency incident logs.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Alert Center Control Header */}
      <div className="tactical-card rounded-2xl p-5 shadow-tactical border border-[#1e2e54]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <BellRing className="w-4 h-4" />
              <span>Multi-Agency Incident Command Terminal</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Emergency Alert Management & Dispatch Deck
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Simulate localized cell broadcast alerts, community sirens, NDRF authority dispatch, and arterial highway closure protocols.
            </p>
          </div>

          <div className="flex items-center space-x-2.5">
            <div className="flex items-center space-x-2 bg-[#0e1830] border border-[#213560] rounded-xl px-3.5 py-2 shadow-inner">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              <div className="text-xs font-mono">
                <span className="text-slate-400">Total Audit Logs: </span>
                <span className="text-white font-bold">{alerts.length}</span>
              </div>
            </div>

            <button
              onClick={exportIncidentLog}
              className="flex items-center space-x-1.5 bg-[#122040] hover:bg-[#1a2d59] text-slate-200 border border-[#213866] px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
              title="Export incident audit logs as JSON"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Export Log</span>
            </button>
          </div>
        </div>

        {/* Live Audio Siren Frequency Equalizer (Visible when Siren is sounding) */}
        {isSirenActive && (
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-red-950/95 via-rose-950/90 to-red-950/95 border border-red-500 shadow-glow-red flex flex-col sm:flex-row items-center justify-between gap-3 animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-red-800 text-white animate-bounce">
                <Volume2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-white">
                    ACOUSTIC SIREN ACTIVE (DUAL-TONE SYNTHESIZER)
                  </span>
                  <span className="text-[10px] bg-red-900 text-red-200 px-2 py-0.2 rounded font-mono font-bold">
                    85–105 dB Coverage
                  </span>
                </div>
                <p className="text-xs text-red-200 mt-0.5">
                  Synthesizing ~650Hz–950Hz sweeping emergency civil warning tone across {activeHotspot.name} sector.
                </p>
              </div>
            </div>

            {/* Audio Wave Bars */}
            <div className="flex items-center space-x-3">
              <div className="flex items-end space-x-1 h-8">
                <div className="w-1.5 bg-white rounded-t audio-bar-1"></div>
                <div className="w-1.5 bg-white rounded-t audio-bar-2"></div>
                <div className="w-1.5 bg-white rounded-t audio-bar-3"></div>
                <div className="w-1.5 bg-white rounded-t audio-bar-4"></div>
                <div className="w-1.5 bg-white rounded-t audio-bar-5"></div>
              </div>

              <button
                onClick={stopSiren}
                className="bg-white hover:bg-slate-100 text-red-700 font-extrabold text-xs px-4 py-2 rounded-xl shadow-lg transition-transform active:scale-95"
              >
                Silence Siren
              </button>
            </div>
          </div>
        )}

        {/* Emergency Action Buttons Ribbon */}
        <div className="mt-5 pt-4 border-t border-[#1b2b4d] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Button 1: SMS Simulation */}
          <button
            onClick={triggerSMS}
            className="flex items-center space-x-3 bg-gradient-to-r from-blue-700 to-cyan-700 hover:from-blue-600 hover:to-cyan-600 text-white p-3.5 rounded-2xl shadow-glow-cyan transition-all active:scale-95 text-left group"
          >
            <div className="p-2.5 bg-black/30 rounded-xl group-hover:scale-110 transition-transform">
              <Smartphone className="w-5 h-5 text-cyan-200" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider">Send SMS Simulation</div>
              <div className="text-[11px] text-cyan-200 opacity-80">Cell Broadcast (~1,450 users)</div>
            </div>
          </button>

          {/* Button 2: Siren Activation */}
          {!isSirenActive ? (
            <button
              onClick={triggerSiren}
              className="flex items-center space-x-3 bg-gradient-to-r from-red-700 to-rose-700 hover:from-red-600 hover:to-rose-600 text-white p-3.5 rounded-2xl shadow-glow-red transition-all active:scale-95 text-left group"
            >
              <div className="p-2.5 bg-black/30 rounded-xl group-hover:scale-110 transition-transform">
                <Volume2 className="w-5 h-5 text-red-200" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider">Activate Siren</div>
                <div className="text-[11px] text-red-200 opacity-80">Web Audio Acoustic Alarm</div>
              </div>
            </button>
          ) : (
            <button
              onClick={stopSiren}
              className="flex items-center space-x-3 bg-amber-600 hover:bg-amber-500 text-white p-3.5 rounded-2xl shadow-glow-amber transition-all active:scale-95 text-left animate-pulse"
            >
              <div className="p-2.5 bg-black/30 rounded-xl">
                <VolumeX className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider">Silence Siren</div>
                <div className="text-[11px] text-amber-100 font-medium">Acoustic Alarm Sounding!</div>
              </div>
            </button>
          )}

          {/* Button 3: Authority Alert */}
          <button
            onClick={triggerAuthorityAlert}
            className="flex items-center space-x-3 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white p-3.5 rounded-2xl shadow-lg shadow-purple-950/40 transition-all active:scale-95 text-left group"
          >
            <div className="p-2.5 bg-black/30 rounded-xl group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-5 h-5 text-purple-200" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider">Notify Authority</div>
              <div className="text-[11px] text-purple-200 opacity-80">SDMA & NDRF Headquarters</div>
            </div>
          </button>

          {/* Button 4: Road Closure */}
          <button
            onClick={recommendRoadClosure}
            className={`flex items-center space-x-3 p-3.5 rounded-2xl transition-all active:scale-95 text-left ${
              roadClosureActive 
                ? 'bg-emerald-950 border border-emerald-500 text-emerald-200' 
                : 'bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 text-white shadow-glow-amber'
            }`}
          >
            <div className="p-2.5 bg-black/30 rounded-xl">
              <Truck className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider">
                {roadClosureActive ? '✓ Barricade Active' : 'Barricade Highway'}
              </div>
              <div className="text-[11px] opacity-80">
                {roadClosureActive ? 'Route Barricade Active' : 'Issue Traffic Diversion'}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Count */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-cyan-400" /> Filter Logs:
          </span>
          {['ALL', 'INDIVIDUAL', 'SMS_BROADCAST', 'SIREN', 'AUTHORITY', 'ROAD_CLOSURE'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                filterType === type 
                  ? 'bg-cyan-600 text-white shadow-glow-cyan' 
                  : 'bg-[#0e172a] text-slate-400 hover:text-slate-200 border border-[#1e2f52]'
              }`}
            >
              {type.replace('_', ' ')}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-400 font-mono">
          Showing <strong className="text-white">{filteredAlerts.length}</strong> incidents
        </span>
      </div>

      {/* Alert Feed Table / Cards */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="tactical-card rounded-2xl p-8 text-center text-slate-400 border border-[#1e2d4a]">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-white">No Active Alerts In This Category</p>
            <p className="text-xs mt-1">Telemetry triggers will automatically generate entries here during escalation.</p>
          </div>
        ) : (
          filteredAlerts.map(alert => {
            let riskBadge = 'bg-emerald-950/80 text-emerald-300 border-emerald-600/40';
            if (alert.riskLevel === 'MODERATE') riskBadge = 'bg-amber-950/80 text-amber-300 border-amber-600/40';
            if (alert.riskLevel === 'HIGH') riskBadge = 'bg-orange-950/80 text-orange-300 border-orange-600/40';
            if (alert.riskLevel === 'CRITICAL') riskBadge = 'bg-red-950 text-red-200 border-red-500 animate-pulse';

            let statusBadge = 'bg-slate-800 text-slate-300';
            if (alert.status === 'DISPATCHED') statusBadge = 'bg-blue-950 text-blue-300 border border-blue-700/50';
            if (alert.status === 'ACTIVE') statusBadge = 'bg-red-950 text-red-300 border border-red-700/50';
            if (alert.status === 'ACKNOWLEDGED') statusBadge = 'bg-emerald-950 text-emerald-300 border border-emerald-700/50';

            return (
              <div
                key={alert.id}
                className="tactical-card rounded-2xl p-4 sm:p-5 border border-[#1e2d4a] hover:border-cyan-500/50 transition-all shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-[#182645]">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#132242] text-cyan-300 border border-[#213766]">
                      {alert.type.replace('_', ' ')}
                    </span>
                    <h3 className="text-sm font-bold text-white">
                      {alert.title}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2 text-xs font-mono">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${riskBadge}`}>
                      {alert.riskLevel}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${statusBadge}`}>
                      {alert.status}
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-slate-200">{alert.location}</span>
                    </span>
                    <span className="flex items-center space-x-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{alert.timestamp} IST</span>
                    </span>
                  </div>
                </div>

                <p className="mt-2 text-xs text-slate-200 leading-relaxed bg-[#091122] p-3 rounded-xl border border-[#162547]">
                  {alert.details}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
