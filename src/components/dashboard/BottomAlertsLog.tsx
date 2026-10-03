import React, { useState } from 'react';
import { 
  Bell, 
  Send, 
  Radio, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Users, 
  Volume2, 
  VolumeX, 
  Download, 
  PlusCircle, 
  RefreshCw,
  PhoneCall,
  Waves,
  Mail
} from 'lucide-react';
import type { LandslideLocation } from '../../data/landslideLocations';

export type AlertActionType = 'SMS' | 'Siren' | 'Authority' | 'RiverOverflow' | 'Email';

interface BottomAlertsLogProps {
  location: LandslideLocation;
  audioActive: boolean;
  onToggleAudio: () => void;
  onDispatchAction: (type: AlertActionType) => void;
}

export const BottomAlertsLog: React.FC<BottomAlertsLogProps> = ({
  location,
  audioActive,
  onToggleAudio,
  onDispatchAction
}) => {
  const [localLogs, setLocalLogs] = useState(location.alertsLog);
  const [activeFilter, setActiveFilter] = useState<'ALL' | AlertActionType>('ALL');
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // Sync logs when location changes, ensuring the river overflow alert is always prominent
  React.useEffect(() => {
    // If not present in current location's logs, inject the River Overflow alert
    const hasRiverOverflow = location.alertsLog.some(l => l.type === 'RiverOverflow');
    if (!hasRiverOverflow && (location.id === 'cherapunji' || location.riskLevel === 'Critical')) {
      const riverAlert = {
        id: `overflow-${location.id}`,
        time: '18:50:12',
        type: 'RiverOverflow' as const,
        status: 'Active' as const,
        statusClass: 'bg-red-950 text-red-400 border-red-500 animate-pulse font-bold',
        message: 'RIVER OVERFLOW ALERT: Water level crossed 3.2m at Khasi Hills',
        target: 'Khasi Hills River Basin & Emergency Services'
      };
      setLocalLogs([riverAlert, ...location.alertsLog]);
    } else {
      setLocalLogs(location.alertsLog);
    }
  }, [location]);

  const handleManualAction = (type: AlertActionType) => {
    const timeNow = new Date().toLocaleTimeString('en-IN', { hour12: false });
    const newAlert = {
      id: `manual-${Date.now()}`,
      time: timeNow,
      type,
      status: (type === 'Siren' || type === 'RiverOverflow' ? 'Active' : type === 'SMS' || type === 'Email' ? 'Sent' : 'Dispatched') as any,
      statusClass: type === 'RiverOverflow'
        ? 'bg-red-950 text-red-400 border-red-500 animate-pulse font-bold'
        : type === 'Siren' 
        ? 'bg-red-950 text-red-400 border-red-500 animate-pulse' 
        : type === 'Email'
        ? 'bg-blue-950 text-blue-300 border-blue-500/50'
        : type === 'SMS' 
        ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40' 
        : 'bg-amber-950 text-amber-300 border-amber-500/40',
      message: type === 'RiverOverflow'
        ? 'RIVER OVERFLOW ALERT: Water level crossed 3.2m at Khasi Hills'
        : type === 'Email'
        ? `Emergency flood warning bulletin dispatched via secure email to SDMA & IMD Severe Weather Cell.`
        : type === 'SMS' 
        ? `Manual CAP broadcast pushed to emergency contacts in ${location.name}.`
        : type === 'Siren'
        ? `Station acoustic siren manually activated at ${location.name} high-vulnerability rim.`
        : `Manual SitRep dispatched to NDRF & State Emergency Operations Center.`,
      target: type === 'RiverOverflow' 
        ? 'Khasi Hills River Catchment & Local Authorities' 
        : type === 'Email' 
        ? 'SDMA & IMD Duty Officers' 
        : type === 'SMS' 
        ? 'Emergency Broadcast List' 
        : type === 'Siren' 
        ? `${location.name} Sector` 
        : 'NDRF & SEOC'
    };

    setLocalLogs(prev => [newAlert, ...prev]);
    onDispatchAction(type);

    setActionSuccessMsg('Demo Alert Triggered - No real SMS sent');
    setTimeout(() => {
      setActionSuccessMsg(null);
    }, 4000);
  };

  const filteredLogs = activeFilter === 'ALL' 
    ? localLogs 
    : localLogs.filter(l => l.type === activeFilter);

  // Status summaries
  const overflowAlert = localLogs.find(l => l.type === 'RiverOverflow');
  const smsAlert = localLogs.find(l => l.type === 'SMS');
  const sirenAlert = localLogs.find(l => l.type === 'Siren');
  const emailAlert = localLogs.find(l => l.type === 'Email');
  const authorityAlert = localLogs.find(l => l.type === 'Authority');

  return (
    <div className="bg-[#040711] border border-[#1d2d4f] rounded-2xl p-4 shadow-2xl relative overflow-hidden">
      {/* Glow highlight line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 via-cyan-400 to-amber-500 opacity-70"></div>

      {/* Top Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-[#182644] pb-3.5 mb-3.5">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-[#0e1933] border border-cyan-500/40 text-cyan-400">
            <Bell className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-800/40">
                MULTI-CHANNEL ALERT & DISPATCH TERMINAL
              </span>
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Basin: <span className="text-white font-bold">{location.name}</span> ({location.state})
              </span>
            </div>
            <h3 className="text-sm font-bold text-white tracking-tight mt-0.5">
              Live Flash Flood & Landslide Warning Broadcast Stream
            </h3>
          </div>
        </div>

        {/* Live Status Indicators (River Overflow / SMS / Siren / Email / Authority) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
          {/* River Overflow Indicator */}
          <div className="bg-[#1f0a12] border border-red-600/70 px-2.5 py-1.5 rounded-xl flex items-center space-x-2">
            <Waves className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <div>
              <div className="text-[9.5px] text-red-300 font-semibold">RIVER OVERFLOW</div>
              <div className="font-black text-red-400 flex items-center space-x-1">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping"></span>
                <span>3.2m DANGER</span>
              </div>
            </div>
          </div>

          {/* SMS Status */}
          <div className="bg-[#091122] border border-[#1d2e50] px-2.5 py-1.5 rounded-xl flex items-center space-x-2">
            <Send className="w-3.5 h-3.5 text-emerald-400" />
            <div>
              <div className="text-[9.5px] text-slate-400">SMS CAP</div>
              <div className="font-bold text-emerald-400 flex items-center space-x-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>{smsAlert ? smsAlert.status : 'Active'}</span>
              </div>
            </div>
          </div>

          {/* Siren Status */}
          <div className="bg-[#091122] border border-[#1d2e50] px-2.5 py-1.5 rounded-xl flex items-center space-x-2">
            <Radio className={`w-3.5 h-3.5 ${audioActive || sirenAlert?.status === 'Active' ? 'text-red-400 animate-pulse' : 'text-slate-400'}`} />
            <div>
              <div className="text-[9.5px] text-slate-400">SIREN</div>
              <div className={`font-bold flex items-center space-x-1 ${
                audioActive || sirenAlert?.status === 'Active' ? 'text-red-400' : 'text-amber-400'
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${
                  audioActive || sirenAlert?.status === 'Active' ? 'bg-red-500 animate-pulse' : 'bg-amber-500'
                }`}></span>
                <span>{audioActive ? 'SOUNDING' : (sirenAlert ? sirenAlert.status : 'Standby')}</span>
              </div>
            </div>
          </div>

          {/* Email Status */}
          <div className="bg-[#091122] border border-[#1d2e50] px-2.5 py-1.5 rounded-xl flex items-center space-x-2">
            <Mail className="w-3.5 h-3.5 text-blue-400" />
            <div>
              <div className="text-[9.5px] text-slate-400">EMAIL</div>
              <div className="font-bold text-blue-300 flex items-center space-x-1">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                <span>{emailAlert ? emailAlert.status : 'Dispatched'}</span>
              </div>
            </div>
          </div>

          {/* Authority Status */}
          <div className="bg-[#091122] border border-[#1d2e50] px-2.5 py-1.5 rounded-xl flex items-center space-x-2">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <div>
              <div className="text-[9.5px] text-slate-400">NDRF / SEOC</div>
              <div className="font-bold text-amber-300 flex items-center space-x-1">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping"></span>
                <span>{authorityAlert ? authorityAlert.status : 'Dispatched'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success alert message if manual action triggered */}
      {actionSuccessMsg && (
        <div className="mb-3 px-3 py-2 rounded-xl bg-cyan-950/80 border border-cyan-500 text-cyan-300 text-xs font-mono flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>{actionSuccessMsg}</span>
          </div>
          <span className="text-[10px] text-cyan-400 uppercase font-bold">DISPATCH ACKNOWLEDGED</span>
        </div>
      )}

      {/* Filter and Trigger Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center space-x-1 bg-[#0a1020] p-1 rounded-xl border border-[#1a2948] text-xs font-mono">
          {(['ALL', 'RiverOverflow', 'SMS', 'Siren', 'Email', 'Authority'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeFilter === cat
                  ? 'bg-cyan-600 text-white font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'RiverOverflow' ? 'River Overflow' : cat}
            </button>
          ))}
        </div>

        {/* Action Trigger Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* New River Overflow Alert Trigger Button */}
          <button
            onClick={() => handleManualAction('RiverOverflow')}
            className="px-3 py-1.5 bg-red-950 hover:bg-red-900 border border-red-500 text-red-200 rounded-xl text-xs font-mono font-bold flex items-center space-x-1.5 transition-all shadow-lg shadow-red-950/60 animate-pulse"
          >
            <Waves className="w-3.5 h-3.5 text-red-400" />
            <span>River Overflow Alert</span>
          </button>

          <button
            onClick={() => handleManualAction('SMS')}
            className="px-3 py-1.5 bg-[#0e1b36] hover:bg-[#16274e] border border-cyan-600/40 text-cyan-300 rounded-xl text-xs font-mono font-bold flex items-center space-x-1.5 transition-all"
          >
            <Send className="w-3.5 h-3.5 text-cyan-400" />
            <span>Send SMS (Demo)</span>
          </button>

          <button
            onClick={() => handleManualAction('Siren')}
            className="px-3 py-1.5 bg-red-950/80 hover:bg-red-900 border border-red-600 text-red-300 rounded-xl text-xs font-mono font-bold flex items-center space-x-1.5 transition-all"
          >
            <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>Activate Siren (Demo)</span>
          </button>

          <button
            onClick={() => handleManualAction('Email')}
            className="px-3 py-1.5 bg-[#0c1b33] hover:bg-[#152a50] border border-blue-500/50 text-blue-300 rounded-xl text-xs font-mono font-bold flex items-center space-x-1.5 transition-all"
          >
            <Mail className="w-3.5 h-3.5 text-blue-400" />
            <span>Dispatch Email</span>
          </button>

          <button
            onClick={() => handleManualAction('Authority')}
            className="px-3 py-1.5 bg-amber-950/80 hover:bg-amber-900 border border-amber-600 text-amber-300 rounded-xl text-xs font-mono font-bold flex items-center space-x-1.5 transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            <span>Notify Control Room (Demo)</span>
          </button>
        </div>
      </div>

      {/* Alerts Log Stream Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-[#1b2b4d] text-[11px] text-slate-400 bg-[#080d1c]">
              <th className="py-2 px-3 font-semibold">TIME</th>
              <th className="py-2 px-3 font-semibold">ALERT CHANNEL / TYPE</th>
              <th className="py-2 px-3 font-semibold">TARGET RECIPIENT</th>
              <th className="py-2 px-3 font-semibold">STATUS</th>
              <th className="py-2 px-3 font-semibold">INCIDENT MESSAGE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#15233e]">
            {filteredLogs.map((log) => {
              const channelIcon = 
                log.type === 'RiverOverflow' ? <Waves className="w-3.5 h-3.5 text-red-400 animate-pulse" /> :
                log.type === 'Email' ? <Mail className="w-3.5 h-3.5 text-blue-400" /> :
                log.type === 'SMS' ? <Send className="w-3.5 h-3.5 text-cyan-400" /> :
                log.type === 'Siren' ? <Radio className="w-3.5 h-3.5 text-red-400" /> :
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />;

              const isRiverOverflow = log.type === 'RiverOverflow';

              return (
                <tr key={log.id} className={`transition-colors ${isRiverOverflow ? 'bg-red-950/30 hover:bg-red-950/50' : 'hover:bg-[#0c1426]'}`}>
                  <td className="py-2.5 px-3 text-slate-400 whitespace-nowrap">
                    {log.time} IST
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap font-bold text-slate-200">
                    <div className="flex items-center space-x-1.5">
                      {channelIcon}
                      <span className={isRiverOverflow ? 'text-red-300 font-black' : ''}>
                        {log.type === 'RiverOverflow' ? 'River Overflow' : log.type}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300 whitespace-nowrap font-medium">
                    {log.target}
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded font-bold border text-[10px] ${log.statusClass}`}>
                      {log.status.toUpperCase()}
                    </span>
                  </td>
                  <td className={`py-2.5 px-3 ${isRiverOverflow ? 'text-red-200 font-bold' : 'text-slate-300'}`}>
                    {log.message}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BottomAlertsLog;
