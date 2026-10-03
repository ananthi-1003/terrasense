import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { 
  Region, 
  Hotspot, 
  SensorNode, 
  TelemetryState, 
  SimulationStage, 
  AlertItem, 
  RecommendationItem 
} from '../types';
import { NER_REGIONS } from '../data/regions';
import { STAGE_TELEMETRY } from '../data/mockTelemetry';
import { getRecommendationsForStage } from '../data/recommendations';
import { startSiren as audioStartSiren, stopSiren as audioStopSiren, playAlertChirp, playBroadcastTone } from '../utils/audio';

interface ToastData {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'danger' | 'success';
}

interface SimulationContextType {
  activeRegion: Region;
  setActiveRegion: (region: Region) => void;
  activeHotspot: Hotspot;
  setActiveHotspot: (hotspot: Hotspot) => void;
  selectedHotspotForModal: Hotspot | null;
  setSelectedHotspotForModal: (hotspot: Hotspot | null) => void;
  
  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Simulation Controls
  simulationStage: SimulationStage;
  setSimulationStage: (stage: SimulationStage) => void;
  isSimulating: boolean;
  simSpeed: number;
  setSimSpeed: (speed: number) => void;
  startSimulation: () => void;
  pauseSimulation: () => void;
  stepSimulation: () => void;
  resetSimulation: () => void;

  // Telemetry & State
  telemetry: TelemetryState;
  activeNodes: SensorNode[];
  recommendations: RecommendationItem[];
  alerts: AlertItem[];
  
  // Adaptive Deployment
  deployAdditionalNode: () => void;
  isAdditionalNodeDeployed: boolean;

  // Emergency Action Triggers
  isSirenActive: boolean;
  triggerSiren: () => void;
  stopSiren: () => void;
  triggerSMS: () => void;
  triggerAuthorityAlert: () => void;
  recommendRoadClosure: () => void;

  // UI state
  smsModalOpen: boolean;
  setSmsModalOpen: (open: boolean) => void;
  toast: ToastData | null;
  showToast: (title: string, message: string, type?: 'info' | 'warning' | 'danger' | 'success') => void;
  roadClosureActive: boolean;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'alt-01',
    type: 'INDIVIDUAL',
    title: 'Baseline Sensor Health Check Verified',
    location: 'Sector Alpha Escarpment (All Nodes)',
    timestamp: '10:00:15',
    riskLevel: 'LOW',
    status: 'ACKNOWLEDGED',
    details: 'LoRaWAN mesh signal integrity verified at -72 dBm across 8 field telemetry nodes.'
  }
];

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRegion, setActiveRegionState] = useState<Region>(NER_REGIONS[0]);
  const [activeHotspot, setActiveHotspotState] = useState<Hotspot>(NER_REGIONS[0].hotspots[0]);
  const [selectedHotspotForModal, setSelectedHotspotForModal] = useState<Hotspot | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const [simulationStage, setSimulationStage] = useState<SimulationStage>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simSpeed, setSimSpeed] = useState<number>(1);
  const [isAdditionalNodeDeployed, setIsAdditionalNodeDeployed] = useState<boolean>(false);
  const [isSirenActive, setIsSirenActive] = useState<boolean>(false);
  const [roadClosureActive, setRoadClosureActive] = useState<boolean>(false);
  const [smsModalOpen, setSmsModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastData | null>(null);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [lastUpdateSecondsAgo, setLastUpdateSecondsAgo] = useState<number>(8);

  const showToast = useCallback((title: string, message: string, type: 'info' | 'warning' | 'danger' | 'success' = 'info') => {
    const id = Date.now().toString();
    setToast({ id, title, message, type });
    playAlertChirp();
    setTimeout(() => {
      setToast(curr => (curr?.id === id ? null : curr));
    }, 4500);
  }, []);

  const setActiveRegion = useCallback((region: Region) => {
    setActiveRegionState(region);
    setActiveHotspotState(region.hotspots[0]);
    setIsAdditionalNodeDeployed(false);
    showToast('Region Changed', `Switched monitoring sector to ${region.name}`, 'info');
  }, [showToast]);

  const setActiveHotspot = useCallback((hotspot: Hotspot) => {
    setActiveHotspotState(hotspot);
    showToast('Hotspot Focused', `Targeting telemetry on ${hotspot.name}`, 'info');
  }, [showToast]);

  // Handle active nodes based on stage and extra deployment
  const activeNodes = useMemo(() => {
    const baseNodes = activeRegion.nodes.map(node => {
      let status = node.status;
      let moisture = node.soilMoisture;
      let vibration = node.groundVibration;
      let peakVel = node.peakVelocity;

      if (simulationStage === 0) {
        status = 'ONLINE';
        moisture = Math.max(45, Math.min(65, node.soilMoisture - 10));
        vibration = 'Low';
        peakVel = Math.min(peakVel, 0.12);
      } else if (simulationStage === 1) {
        status = 'ONLINE';
        moisture = Math.min(74, node.soilMoisture + 5);
        if (node.id === 'TS-02' || node.id === 'TS-04') {
          vibration = 'Moderate';
          peakVel = 0.38;
        }
      } else if (simulationStage === 2) {
        moisture = Math.min(84, node.soilMoisture + 12);
        if (node.id === 'TS-02' || node.id === 'TS-04') {
          status = 'WARNING';
          vibration = 'High';
          peakVel = 0.65;
        }
      } else if (simulationStage === 3) {
        moisture = Math.min(92, node.soilMoisture + 18);
        if (['TS-02', 'TS-03', 'TS-04', 'TS-08'].includes(node.id)) {
          status = 'WARNING';
          vibration = 'High';
          peakVel = 0.78;
        }
      } else if (simulationStage === 4) {
        moisture = Math.min(97, node.soilMoisture + 24);
        if (['TS-02', 'TS-04', 'TS-08'].includes(node.id)) {
          status = 'CRITICAL';
          vibration = 'Critical';
          peakVel = 0.94;
        } else if (['TS-03', 'TS-07'].includes(node.id)) {
          status = 'WARNING';
          vibration = 'High';
          peakVel = 0.75;
        }
      }

      return {
        ...node,
        status,
        soilMoisture: moisture,
        groundVibration: vibration,
        peakVelocity: peakVel,
        lastUpdateSecondsAgo: Math.floor(Math.random() * 8) + 2
      };
    });

    if (isAdditionalNodeDeployed) {
      const extraNode: SensorNode = {
        id: 'TS-09',
        name: 'Node TS-09 (Dynamic Adaptive Deploy)',
        lat: activeHotspot.lat + 0.0015,
        lng: activeHotspot.lng - 0.0012,
        elevation: activeHotspot.elevation + 15,
        soilMoisture: simulationStage >= 3 ? 91 : simulationStage === 2 ? 83 : 68,
        groundVibration: simulationStage >= 3 ? 'High' : 'Moderate',
        peakVelocity: simulationStage >= 4 ? 0.88 : simulationStage === 3 ? 0.71 : 0.28,
        battery: 100,
        connectivity: '4G Mesh',
        rssi: -62,
        lastUpdateSecondsAgo: 3,
        status: simulationStage >= 4 ? 'CRITICAL' : simulationStage === 3 ? 'WARNING' : 'ONLINE',
        isPortableAdditional: true
      };
      return [...baseNodes, extraNode];
    }

    return baseNodes;
  }, [activeRegion, simulationStage, isAdditionalNodeDeployed, activeHotspot]);

  // Telemetry computation
  const telemetry = useMemo<TelemetryState>(() => {
    const stageData = STAGE_TELEMETRY[simulationStage];
    const onlineOrWarning = activeNodes.filter(n => n.status !== 'OFFLINE').length;

    return {
      ...stageData,
      activeNodesCount: onlineOrWarning,
      totalNodesCount: activeNodes.length,
      lastUpdateSecondsAgo
    };
  }, [simulationStage, activeNodes, lastUpdateSecondsAgo]);

  const recommendations = useMemo(() => {
    return getRecommendationsForStage(simulationStage);
  }, [simulationStage]);

  // Auto-advance simulation loop
  useEffect(() => {
    if (!isSimulating) return;

    const intervalMs = Math.round(7000 / simSpeed);
    const timer = setInterval(() => {
      setSimulationStage(prev => {
        if (prev < 4) {
          const next = (prev + 1) as SimulationStage;
          const ts = new Date().toLocaleTimeString();

          // Trigger automated alert for stage
          if (next === 2) {
            showToast('Hazard Escalating', 'Soil moisture saturation >80%. Advisory triggered.', 'warning');
            setAlerts(a => [{
              id: `alt-stage2-${Date.now()}`,
              type: 'INDIVIDUAL',
              title: '⚠️ HIGH Risk Advisory — Soil Saturation >80%',
              location: 'Hotspot Alpha Scarp / TS-02 Node',
              timestamp: ts,
              riskLevel: 'HIGH',
              status: 'ACTIVE',
              details: 'Soil moisture at 82%. Shear vibrational harmonics detected at TS-02. Subsurface pore-pressure building. Advisory monitoring escalated.'
            }, ...a]);
          } else if (next === 3) {
            playBroadcastTone();
            showToast('HIGH RISK WARNING', 'Estimated risk window: 10–20 min. Alert center updated.', 'danger');
            setAlerts(a => [{
              id: `alt-stage3-${Date.now()}`,
              type: 'INDIVIDUAL',
              title: '🔴 DANGER — Active Shear Zone Detected (10–20 min Window)',
              location: 'Nodes TS-02, TS-03, TS-04, TS-08',
              timestamp: ts,
              riskLevel: 'HIGH',
              status: 'ACTIVE',
              details: 'Multi-node shear anomaly cluster confirmed. FoS dropped to 1.06. Rainfall 82mm. Slope condition CRITICAL. Immediate preventive evacuation advisory issued.'
            }, ...a]);
          } else if (next === 4) {
            playBroadcastTone();
            showToast('CRITICAL THRESHOLD', 'Estimated risk window: <10 min! Immediate preventive action recommended.', 'danger');
            setAlerts(a => [{
              id: `alt-stage4-${Date.now()}`,
              type: 'EVACUATION',
              title: '🚨 CRITICAL — IMMINENT FAILURE PRECURSOR (<10 min Window)',
              location: 'Full Hotspot Sector — All Downstream Settlements',
              timestamp: ts,
              riskLevel: 'CRITICAL',
              status: 'ACTIVE',
              details: 'FoS = 0.92 (below stability threshold). Soil at 96% saturation (liquefaction risk). Nodes TS-02, TS-04, TS-08 registering sustained micro-tremors >0.82 mm/s. IMMEDIATE evacuation and road closure required.'
            }, ...a]);
          }
          return next;
        } else {
          setIsSimulating(false);
          showToast('Simulation Complete', 'Reached maximum critical hazard escalation stage.', 'danger');
          return prev;
        }
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isSimulating, simSpeed, showToast]);


  // Secondary ticker for "Last updated X seconds ago"
  useEffect(() => {
    const ticker = setInterval(() => {
      setLastUpdateSecondsAgo(prev => (prev > 18 ? 3 : prev + 1));
    }, 1000);
    return () => clearInterval(ticker);
  }, []);

  // Synchronize road closure status with high stages
  useEffect(() => {
    if (simulationStage >= 3) {
      setRoadClosureActive(true);
    }
  }, [simulationStage]);

  const startSimulation = useCallback(() => {
    setIsSimulating(true);
    showToast('Simulation Started', 'Dynamic risk escalation sequence initialized.', 'info');
  }, [showToast]);

  const pauseSimulation = useCallback(() => {
    setIsSimulating(false);
    showToast('Simulation Paused', 'Hold telemetry state for current stage.', 'info');
  }, [showToast]);

  const stepSimulation = useCallback(() => {
    setSimulationStage(prev => {
      const next = (prev >= 4 ? 0 : prev + 1) as SimulationStage;
      showToast(`Simulation Stepped to Stage ${next}`, `Risk Score: ${STAGE_TELEMETRY[next].riskScore} (${STAGE_TELEMETRY[next].riskLevel})`, next >= 3 ? 'danger' : 'info');
      return next;
    });
  }, [showToast]);

  const resetSimulation = useCallback(() => {
    setIsSimulating(false);
    setSimulationStage(0);
    setIsAdditionalNodeDeployed(false);
    setRoadClosureActive(false);
    if (isSirenActive) {
      audioStopSiren();
      setIsSirenActive(false);
    }
    showToast('Simulation Reset', 'All environmental telemetry and sensor states restored to normal baseline.', 'success');
  }, [isSirenActive, showToast]);

  const deployAdditionalNode = useCallback(() => {
    if (isAdditionalNodeDeployed) {
      showToast('Node Already Deployed', 'TS-09 is already active at the hotspot slope scarp.', 'info');
      return;
    }
    setIsAdditionalNodeDeployed(true);
    playAlertChirp();
    showToast('Node TS-09 Deployed', 'Adaptive mesh density increased. TS-09 active at hotspot crest (+1 node).', 'success');

    // Add alert entry
    const newAlert: AlertItem = {
      id: `alt-${Date.now()}`,
      type: 'INDIVIDUAL',
      title: 'Adaptive Node TS-09 Deployed to Active Hotspot',
      location: activeHotspot.name,
      timestamp: new Date().toLocaleTimeString(),
      riskLevel: simulationStage >= 3 ? 'HIGH' : 'MODERATE',
      status: 'ACTIVE',
      details: 'Spatial monitoring resolution tightened. Accelerometer and high-frequency pore pressure sensors streaming.'
    };
    setAlerts(prev => [newAlert, ...prev]);
  }, [isAdditionalNodeDeployed, activeHotspot, simulationStage, showToast]);

  const triggerSiren = useCallback(() => {
    const success = audioStartSiren();
    if (success) {
      setIsSirenActive(true);
      showToast('Acoustic Siren Activated', 'Community warning siren sounding across sector. Decibel coverage active.', 'danger');
      const newAlert: AlertItem = {
        id: `alt-siren-${Date.now()}`,
        type: 'SIREN',
        title: 'Community Warning Siren Activated',
        location: `${activeHotspot.name} & Downstream Settlements`,
        timestamp: new Date().toLocaleTimeString(),
        riskLevel: 'CRITICAL',
        status: 'ACTIVE',
        details: 'Civil acoustic warning broadcast active. Audible across 2.5 km radius.'
      };
      setAlerts(prev => [newAlert, ...prev]);
    }
  }, [activeHotspot, showToast]);

  const stopSiren = useCallback(() => {
    audioStopSiren();
    setIsSirenActive(false);
    showToast('Siren Silenced', 'Emergency acoustic warning beacon disengaged.', 'info');
  }, [showToast]);

  const triggerSMS = useCallback(() => {
    setSmsModalOpen(true);
    playBroadcastTone();
  }, []);

  const triggerAuthorityAlert = useCallback(() => {
    playAlertChirp();
    showToast('Authority Flash Telegram Dispatched', 'Priority bulletin sent to SDMA, District Magistrate & NDRF 1st Bn.', 'warning');
    const newAlert: AlertItem = {
      id: `alt-auth-${Date.now()}`,
      type: 'AUTHORITY',
      title: 'Urgent Dispatch to SDMA & NDRF Headquarters',
      location: `NER Operations Center -> ${activeRegion.name}`,
      timestamp: new Date().toLocaleTimeString(),
      riskLevel: simulationStage >= 3 ? 'HIGH' : 'MODERATE',
      status: 'DISPATCHED',
      details: `Official Incident Report: Landslide Risk Score ${telemetry.riskScore}/100. Estimated window: ${telemetry.estimatedRiskWindow || 'Advisory'}. Requesting standby response units.`
    };
    setAlerts(prev => [newAlert, ...prev]);
  }, [activeRegion, simulationStage, telemetry, showToast]);

  const recommendRoadClosure = useCallback(() => {
    setRoadClosureActive(true);
    playAlertChirp();
    showToast('Road Closure Advisory Issued', `Recommended immediate closure of ${activeHotspot.nearbyRoad}. Traffic diverted to ridge arterial.`, 'danger');
    const newAlert: AlertItem = {
      id: `alt-road-${Date.now()}`,
      type: 'ROAD_CLOSURE',
      title: `Emergency Diversion & Road Closure: ${activeHotspot.nearbyRoad}`,
      location: activeHotspot.nearbyRoad,
      timestamp: new Date().toLocaleTimeString(),
      riskLevel: 'HIGH',
      status: 'ACTIVE',
      details: 'Traffic police notified. Physical barricading requested at checkposts to prevent vehicle entrapment.'
    };
    setAlerts(prev => [newAlert, ...prev]);
  }, [activeHotspot, showToast]);

  return (
    <SimulationContext.Provider
      value={{
        activeRegion,
        setActiveRegion,
        activeHotspot,
        setActiveHotspot,
        selectedHotspotForModal,
        setSelectedHotspotForModal,
        activeTab,
        setActiveTab,
        simulationStage,
        setSimulationStage,
        isSimulating,
        simSpeed,
        setSimSpeed,
        startSimulation,
        pauseSimulation,
        stepSimulation,
        resetSimulation,
        telemetry,
        activeNodes,
        recommendations,
        alerts,
        deployAdditionalNode,
        isAdditionalNodeDeployed,
        isSirenActive,
        triggerSiren,
        stopSiren,
        triggerSMS,
        triggerAuthorityAlert,
        recommendRoadClosure,
        smsModalOpen,
        setSmsModalOpen,
        toast,
        showToast,
        roadClosureActive
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
