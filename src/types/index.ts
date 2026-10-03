export const TERRA_SENSE_VERSION = '1.0.0';

export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
export type VibrationLevel = 'Low' | 'Moderate' | 'High' | 'Critical';
export type RainfallIntensity = 'Low' | 'Moderate' | 'High' | 'Extreme';
export type SlopeCondition = 'Stable' | 'Marginal' | 'Critical' | 'Failure Imminent';
export type NodeStatus = 'ONLINE' | 'WARNING' | 'CRITICAL' | 'OFFLINE';

export interface SensorNode {
  id: string;
  name: string;
  lat: number;
  lng: number;
  elevation: number;
  soilMoisture: number;
  groundVibration: VibrationLevel;
  peakVelocity: number; // mm/s
  battery: number;
  connectivity: 'LoRaWAN 868MHz' | '4G Mesh' | 'Satellite';
  rssi: number; // dBm
  lastUpdateSecondsAgo: number;
  status: NodeStatus;
  isPortableAdditional?: boolean;
}

export interface InfrastructureItem {
  id: string;
  name: string;
  type: 'hospital' | 'school' | 'relief_center' | 'bridge';
  lat: number;
  lng: number;
  description: string;
}

export interface VulnerableRoad {
  id: string;
  name: string;
  code: string;
  status: 'CLEAR' | 'WATCH' | 'RESTRICTED' | 'CLOSED';
  coordinates: [number, number][];
  affectedLengthKm: number;
}

export interface VillageSettlement {
  id: string;
  name: string;
  lat: number;
  lng: number;
  population: number;
  status: 'NORMAL' | 'ADVISORY' | 'EVACUATION_STANDBY' | 'EVACUATING';
}

export interface Hotspot {
  id: string;
  name: string;
  sector: string;
  lat: number;
  lng: number;
  elevation: number;
  slopeDeg: number;
  nearbyRoad: string;
  nearbyVillage: string;
  affectedAreaRadiusKm: number;
  historicalIncidents: number;
  geology: string;
}

export interface Region {
  id: string;
  name: string;
  state: string;
  center: [number, number];
  zoom: number;
  hotspots: Hotspot[];
  nodes: SensorNode[];
  infrastructures: InfrastructureItem[];
  roads: VulnerableRoad[];
  villages: VillageSettlement[];
}

export interface FactorContributions {
  rainfall: number;
  soilMoisture: number;
  groundVibration: number;
  terrainHistory: number;
}

export interface TrendPoint {
  time: string;
  score: number;
  rainfall: number;
  moisture: number;
}

export interface TelemetryState {
  riskScore: number;
  riskLevel: RiskLevel;
  rainfallMm: number;
  rainfallIntensity: RainfallIntensity;
  soilMoisturePercent: number;
  groundVibration: VibrationLevel;
  slopeCondition: SlopeCondition;
  factorOfSafety: number;
  activeNodesCount: number;
  totalNodesCount: number;
  lastUpdateSecondsAgo: number;
  estimatedRiskWindow: string | null;
  aiConfidencePercent: number;
  aiExplanation: string;
  contributions: FactorContributions;
  trend: TrendPoint[];
  affectedAreaRadiusKm: number;
}

export type SimulationStage = 0 | 1 | 2 | 3 | 4;

export interface AlertItem {
  id: string;
  type: 'INDIVIDUAL' | 'SMS_BROADCAST' | 'SIREN' | 'AUTHORITY' | 'ROAD_CLOSURE' | 'EVACUATION';
  title: string;
  location: string;
  timestamp: string;
  riskLevel: RiskLevel;
  status: 'PENDING' | 'DISPATCHED' | 'ACTIVE' | 'ACKNOWLEDGED';
  details: string;
}

export interface RecommendationItem {
  id: string;
  order: number;
  title: string;
  description: string;
  target: 'Civil Administration' | 'Traffic Police' | 'Emergency SDRF/NDRF' | 'Public & Village Heads' | 'Field Engineers' | 'Police & Traffic';
  urgency: 'STANDARD' | 'ELEVATED' | 'URGENT' | 'CRITICAL';
  status: 'RECOMMENDED' | 'TRIGGERED' | 'EXECUTED';
}
