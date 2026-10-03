import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  Clock, 
  Wifi, 
  Layers, 
  AlertTriangle, 
  Activity, 
  ListChecks, 
  Radio, 
  Compass, 
  BellRing,
  Menu,
  X,
  Volume2,
  VolumeX,
  ChevronDown,
  Satellite
} from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';
import { NER_REGIONS } from '../../data/regions';

export const Header: React.FC = () => {
  const { 
    activeRegion, 
    setActiveRegion, 
    activeTab, 
    setActiveTab, 
    telemetry,
    alerts,
    isSirenActive,
    stopSiren
  } = useSimulation();

  const [currentTime, setCurrentTime] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Layers, desc: 'Overview & Geospatial Map' },
    { id: 'analysis', label: 'Risk Analysis', icon: Compass, desc: 'Causal Factor Diagnostic' },
    { id: 'warning', label: 'Early Warning', icon: AlertTriangle, desc: '10–20m Risk Window' },
    { id: 'recommendations', label: 'Action Protocol', icon: ListChecks, desc: 'Mitigation Checklist' },
    { id: 'alerts', label: 'Alert Center', icon: BellRing, badge: alerts.length, desc: 'Cell SMS & Siren Dispatch' },
    { id: 'sensors', label: 'Sensor Nodes', icon: Radio, desc: 'Field LoRa Telemetry' },
    { id: 'adaptive', label: 'Adaptive Monitoring', icon: Activity, desc: 'Dynamic Density Workflow' }
  ];

  const riskBadgeStyles = {
    LOW: 'bg-emerald-950/80 text-emerald-300 border-emerald-600/50 shadow-emerald-950/30',
    MODERATE: 'bg-amber-950/80 text-amber-300 border-amber-600/50 shadow-amber-950/30',
    HIGH: 'bg-orange-950/80 text-orange-300 border-orange-600/50 shadow-orange-950/30',
    CRITICAL: 'bg-red-950/90 text-red-300 border-red-500 shadow-glow-red animate-pulse'
  };

  return (
    <header className="bg-[#091022]/95 backdrop-blur-md border-b border-[#1c2c4f] sticky top-0 z-40 shadow-tactical">
      {/* Top Mission Control Bar */}
      <div className="px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 border-b border-[#152342]/80">
        {/* Brand & Identity */}
        <div className="flex items-center space-x-3">
          <div className="relative group cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 p-0.5 shadow-lg shadow-cyan-500/25 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <div className="w-full h-full bg-[#091022] rounded-[10px] flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            {/* Status dot */}
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#091022] rounded-full"></span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center font-sans">
                Terra<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">Sense</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-cyan-950/90 text-cyan-300 border border-cyan-700/60 shadow-inner">
                SIH Prototype
              </span>
              <span className="px-2 py-0.5 rounded bg-yellow-400 text-black font-extrabold font-mono text-[10px] tracking-wide shadow-sm border border-yellow-300">
                PROTOTYPE - Demo Mode | Data: Live API + Simulated Sensors
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block tracking-wide">
              Sense the Ground. Save Lives. • <span className="text-cyan-400 font-medium">Himalayan & NER Landslide Early Warning</span>
            </p>
          </div>
        </div>

        {/* Center / Right Control Panel */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Active Siren Quick Alert Banner (if sounding) */}
          {isSirenActive && (
            <div className="flex items-center space-x-2 bg-red-950/90 border border-red-500 text-red-200 px-2.5 py-1.5 rounded-lg shadow-glow-red animate-pulse">
              <Volume2 className="w-4 h-4 text-red-300 animate-bounce" />
              <span className="text-[11px] font-bold tracking-wider uppercase hidden sm:inline">SIREN ACTIVE</span>
              <button
                onClick={stopSiren}
                className="bg-red-700 hover:bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded transition-all"
                title="Silence Siren"
              >
                SILENCE
              </button>
            </div>
          )}

          {/* Current Threat Badge */}
          <div className={`hidden md:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-bold font-mono tracking-wider shadow ${riskBadgeStyles[telemetry.riskLevel]}`}>
            <span className="w-2 h-2 rounded-full bg-current"></span>
            <span>{telemetry.riskLevel} THREAT</span>
            <span className="text-[11px] opacity-80">({telemetry.riskScore}/100)</span>
          </div>

          {/* Region Selector */}
          <div className="relative flex items-center bg-[#0d162a] border border-[#203257] hover:border-cyan-500/50 rounded-lg px-2.5 py-1.5 transition-colors shadow-inner">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mr-1.5" />
            <select
              value={activeRegion.id}
              onChange={(e) => {
                const found = NER_REGIONS.find(r => r.id === e.target.value);
                if (found) setActiveRegion(found);
              }}
              className="bg-transparent text-xs font-semibold text-slate-100 focus:outline-none cursor-pointer pr-4 appearance-none"
              title="Select vulnerable NER sector"
            >
              {NER_REGIONS.map((r) => (
                <option key={r.id} value={r.id} className="bg-[#0b1324] text-slate-100">
                  {r.name} ({r.state})
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 pointer-events-none" />
          </div>

          {/* Live UTC/IST Clock */}
          <div className="hidden lg:flex items-center space-x-1.5 text-xs text-slate-200 font-mono bg-[#0d162a] border border-[#203257] rounded-lg px-2.5 py-1.5 shadow-inner">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{currentTime || '10:00:00 IST'}</span>
          </div>

          {/* Online Link Status */}
          <div className="hidden xl:flex items-center space-x-2 bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 rounded-lg px-2.5 py-1.5 text-xs font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Satellite className="w-3.5 h-3.5 text-emerald-400" />
            <span className="tracking-wide text-[10px] font-mono uppercase">ISRO/Bhuvan Sync</span>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#0d162a] border border-[#203257] text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Primary Navigation Tabs (Desktop & Tablet Horizontal Bar) */}
      <div className="hidden md:flex px-4 lg:px-6 overflow-x-auto no-scrollbar items-center space-x-1 py-1.5 bg-[#070d1c]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-950 to-blue-950 text-cyan-300 border border-cyan-500/50 shadow-glow-cyan'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#101b33]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
              {item.id === 'alerts' && telemetry.riskScore >= 70 && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile Drawer Navigation (When Hamburger Is Open) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a1124] border-b border-[#1f3159] p-3 space-y-1.5 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="pb-2 border-b border-[#1c2c4d] flex items-center justify-between text-xs text-slate-400">
            <span>Navigation Terminal</span>
            <span className="font-mono text-cyan-400">{currentTime}</span>
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-600/50'
                    : 'text-slate-300 hover:bg-[#121c36]'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <div className="text-left">
                    <div className="font-semibold text-white">{item.label}</div>
                    <div className="text-[10px] text-slate-400">{item.desc}</div>
                  </div>
                </div>
                {item.id === 'alerts' && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-700">
                    {alerts.length} Logs
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
