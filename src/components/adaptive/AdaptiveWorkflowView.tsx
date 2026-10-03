import React from 'react';
import { 
  Activity, 
  Satellite, 
  MapPin, 
  Compass, 
  Radio, 
  Database, 
  Sparkles, 
  TrendingUp, 
  Layers, 
  BellRing, 
  Plus, 
  CheckCircle2, 
  ArrowDown, 
  ArrowRight,
  ShieldAlert,
  Cpu,
  Zap,
  Target
} from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

export const AdaptiveWorkflowView: React.FC = () => {
  const { 
    deployAdditionalNode, 
    isAdditionalNodeDeployed, 
    activeNodes, 
    activeHotspot, 
    simulationStage,
    setActiveTab 
  } = useSimulation();

  const workflowSteps = [
    {
      step: 1,
      title: 'Satellite / GIS Screening',
      icon: Satellite,
      desc: 'Regional synoptic scan utilizing Sentinel-1 InSAR surface interferometry and ISRO Bhuvan 10m digital elevation terrain models.',
      status: 'Continuous Sync',
      badge: 'ISRO / ESA'
    },
    {
      step: 2,
      title: 'Identify Vulnerable Topographic Areas',
      icon: Compass,
      desc: 'Automated screening of scarp gradient (>35°), colluvium depth, historical recurrence inventories, and antecedent rainfall index (ARI).',
      status: 'Automated Matrix',
      badge: 'GIS Layer'
    },
    {
      step: 3,
      title: 'Select High-Risk Hotspot',
      icon: MapPin,
      desc: `Pinpoints vulnerable scarp corridors intersecting critical transport lifelines (${activeHotspot.nearbyRoad}) and downstream settlements (${activeHotspot.nearbyVillage}).`,
      status: 'Targeted Scarp',
      badge: activeHotspot.name
    },
    {
      step: 4,
      title: 'Deploy Tactical Field Nodes',
      icon: Radio,
      desc: 'Rapid ground deployment of solar/battery powered LoRaWAN mesh nodes (TS-01 to TS-08) along the active shear failure plane.',
      status: 'Field Mesh Active',
      badge: '8 Nodes'
    },
    {
      step: 5,
      title: 'Collect Local Geotechnical Data',
      icon: Database,
      desc: 'Subsurface colluvial moisture saturation, volumetric pore-water pressure, and 3-axis MEMS accelerometer micro-seismic velocity.',
      status: 'Real-time (60s)',
      badge: 'Multi-Modal'
    },
    {
      step: 6,
      title: 'Edge-AI Risk Inference Engine',
      icon: Sparkles,
      desc: 'Continuous geotechnical reasoning computing dynamic Factor of Safety (FoS) and temporal precursor slip trajectories.',
      status: 'AI Inference',
      badge: 'Model v2.4'
    },
    {
      step: 7,
      title: 'Threshold Trigger Escalation',
      icon: TrendingUp,
      desc: 'Multi-sensor consensus alerts triggered when soil moisture approaches critical saturation (>80%) and micro-vibrations surge.',
      status: simulationStage >= 2 ? 'ESCALATION ACTIVE' : 'Equilibrium',
      isConditional: true,
      badge: simulationStage >= 2 ? 'SURGE' : 'Nominal'
    },
    {
      step: 8,
      title: 'Increase Monitoring Density (Adaptive Deploy)',
      icon: Layers,
      desc: 'Tactically deploy supplementary sensor nodes (TS-09) to tighten spatial telemetry resolution over emerging shear fractures.',
      status: isAdditionalNodeDeployed ? 'TS-09 DEPLOYED (+1)' : 'Standby Ready',
      actionable: true,
      badge: isAdditionalNodeDeployed ? 'Tight Mesh' : 'Standard'
    },
    {
      step: 9,
      title: 'Generate Proactive Alerts & Recommendations',
      icon: BellRing,
      desc: 'Dispatches localized cell-broadcast SMS, acoustic sirens, SDMA flash bulletins, and proactive traffic diversion protocols.',
      status: simulationStage >= 3 ? 'ACTIVE DISPATCH' : 'Standard Watch',
      badge: simulationStage >= 3 ? 'EMERGENCY' : 'Watch'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="tactical-card rounded-2xl p-5 shadow-tactical flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#1e2e54]">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4" />
            <span>Closed-Loop Spatial Intelligence Architecture</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Adaptive Surveillance & Dynamic Node Density
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            How TerraSense scales from wide-area satellite remote sensing down to high-density tactical ground telemetry.
          </p>
        </div>

        {/* Deploy Node Action Button */}
        <button
          onClick={deployAdditionalNode}
          disabled={isAdditionalNodeDeployed}
          className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs font-bold transition-all shadow-tactical active:scale-95 ${
            isAdditionalNodeDeployed
              ? 'bg-emerald-950 border border-emerald-500 text-emerald-300 cursor-default shadow-glow-emerald'
              : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-glow-cyan'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>{isAdditionalNodeDeployed ? '✓ TS-09 Deployed at Hotspot' : 'Deploy Supplementary Node (TS-09)'}</span>
        </button>
      </div>

      {/* Adaptive Density Status HUD */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="tactical-card rounded-2xl p-4 border border-[#1e2e54]">
          <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Active Monitoring Nodes</div>
          <div className="text-2xl font-extrabold font-mono text-cyan-300 mt-1">
            {activeNodes.length} Mesh Nodes Active
          </div>
          <div className="text-[11px] text-slate-300 mt-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{isAdditionalNodeDeployed ? 'Target density scaled with TS-09 (+1)' : 'Standard 8-node baseline configuration'}</span>
          </div>
        </div>

        <div className="tactical-card rounded-2xl p-4 border border-[#1e2e54]">
          <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Adaptive Spatial Resolution</div>
          <div className="text-2xl font-extrabold font-mono text-white mt-1">
            {isAdditionalNodeDeployed ? '~35 meters' : '~75 meters'}
          </div>
          <div className="text-[11px] text-slate-300 mt-1">
            {isAdditionalNodeDeployed ? 'High-density micro-shear plane coverage' : 'Standard regional scarp envelope spacing'}
          </div>
        </div>

        <div className="tactical-card rounded-2xl p-4 border border-[#1e2e54]">
          <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Current Hotspot Focus</div>
          <div className="text-lg font-bold text-amber-300 mt-1 truncate">
            {activeHotspot.name}
          </div>
          <div className="text-[11px] text-slate-300 mt-1">
            Elevation: {activeHotspot.elevation} m MSL | Incline: {activeHotspot.slopeDeg}°
          </div>
        </div>
      </div>

      {/* Visual Step-by-Step Pipeline */}
      <div className="tactical-card rounded-2xl p-5 sm:p-6 shadow-tactical border border-[#1e2e54]">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6 flex items-center space-x-2 border-b border-[#1b2b4d] pb-3">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Complete 9-Stage Adaptive Surveillance Pipeline</span>
        </h3>

        <div className="space-y-4">
          {workflowSteps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === workflowSteps.length - 1;
            const isHighlighted = step.actionable && isAdditionalNodeDeployed;

            return (
              <div key={step.step} className="flex flex-col">
                <div className={`flex items-start space-x-4 p-4 rounded-2xl border transition-all ${
                  isHighlighted 
                    ? 'bg-cyan-950/50 border-cyan-500 shadow-glow-cyan' 
                    : step.isConditional && simulationStage >= 2
                    ? 'bg-amber-950/50 border-amber-500/70 shadow-glow-amber'
                    : 'bg-[#0c1426] border-[#1b2b4d] hover:border-cyan-500/40'
                }`}>
                  {/* Step Number & Icon */}
                  <div className="relative">
                    <div className="w-11 h-11 rounded-2xl bg-[#142345] border border-[#233866] text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0 shadow-inner">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-cyan-600 text-white font-mono text-[10px] font-bold flex items-center justify-center shadow">
                      {step.step}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{step.title}</span>
                        <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-[#101e38] text-cyan-300 border border-[#1e2f52]">
                          {step.badge}
                        </span>
                      </h4>
                      <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-md border font-bold uppercase ${
                        step.status.includes('DEPLOYED') || step.status.includes('ACTIVE') || step.status.includes('ESCALATION')
                          ? 'bg-red-950 text-red-200 border-red-500 animate-pulse'
                          : 'bg-[#0f1933] text-slate-300 border-[#1f3159]'
                      }`}>
                        {step.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {step.desc}
                    </p>

                    {/* Special Action Button for Step 8 */}
                    {step.step === 8 && (
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <button
                          onClick={deployAdditionalNode}
                          disabled={isAdditionalNodeDeployed}
                          className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            isAdditionalNodeDeployed
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-600 cursor-default'
                              : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-glow-cyan active:scale-95'
                          }`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{isAdditionalNodeDeployed ? '✓ TS-09 Active on Map' : 'Deploy Node TS-09 Now'}</span>
                        </button>
                        {isAdditionalNodeDeployed && (
                          <span className="text-[11px] text-emerald-400 font-semibold flex items-center space-x-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Mesh density scaled from 8 to 9 nodes. Real-time telemetry synchronized.</span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Flow Indicator Arrow Down */}
                {!isLast && (
                  <div className="py-1 pl-10 flex items-center">
                    <ArrowDown className="w-4 h-4 text-slate-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
