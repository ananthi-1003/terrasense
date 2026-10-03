import type { TelemetryState, SimulationStage } from '../types';

export const STAGE_TELEMETRY: Record<SimulationStage, Omit<TelemetryState, 'activeNodesCount' | 'totalNodesCount' | 'lastUpdateSecondsAgo'>> = {
  0: {
    riskScore: 32,
    riskLevel: 'LOW',
    rainfallMm: 24,
    rainfallIntensity: 'Low',
    soilMoisturePercent: 55,
    groundVibration: 'Low',
    slopeCondition: 'Stable',
    factorOfSafety: 1.84,
    estimatedRiskWindow: null,
    aiConfidencePercent: 76,
    aiExplanation: 'Baseline environmental and seismic status normal. Current cumulative precipitation (24 mm) remains well beneath critical geotechnical thresholds. Subsurface pore-water pressure is nominal across all telemetry nodes.',
    contributions: {
      rainfall: 22,
      soilMoisture: 28,
      groundVibration: 15,
      terrainHistory: 35
    },
    trend: [
      { time: '09:00', score: 28, rainfall: 18, moisture: 50 },
      { time: '09:15', score: 29, rainfall: 20, moisture: 52 },
      { time: '09:30', score: 31, rainfall: 22, moisture: 53 },
      { time: '09:45', score: 32, rainfall: 23, moisture: 54 },
      { time: '10:00', score: 32, rainfall: 24, moisture: 55 }
    ],
    affectedAreaRadiusKm: 0.4
  },
  1: {
    riskScore: 51,
    riskLevel: 'MODERATE',
    rainfallMm: 52,
    rainfallIntensity: 'Moderate',
    soilMoisturePercent: 71,
    groundVibration: 'Moderate',
    slopeCondition: 'Marginal',
    factorOfSafety: 1.45,
    estimatedRiskWindow: '30–45 minutes',
    aiConfidencePercent: 82,
    aiExplanation: 'Risk is moderately increasing as sustained precipitation (52 mm) triggers rapid infiltration. Colluvial overburden is progressively absorbing runoff, reducing effective cohesive friction on upper slope segments.',
    contributions: {
      rainfall: 38,
      soilMoisture: 32,
      groundVibration: 16,
      terrainHistory: 14
    },
    trend: [
      { time: '09:00', score: 28, rainfall: 18, moisture: 50 },
      { time: '09:15', score: 32, rainfall: 24, moisture: 55 },
      { time: '09:30', score: 41, rainfall: 38, moisture: 63 },
      { time: '09:45', score: 47, rainfall: 46, moisture: 67 },
      { time: '10:00', score: 51, rainfall: 52, moisture: 71 }
    ],
    affectedAreaRadiusKm: 0.8
  },
  2: {
    riskScore: 68,
    riskLevel: 'HIGH',
    rainfallMm: 68,
    rainfallIntensity: 'High',
    soilMoisturePercent: 82,
    groundVibration: 'Moderate',
    slopeCondition: 'Marginal',
    factorOfSafety: 1.21,
    estimatedRiskWindow: '20–35 minutes',
    aiConfidencePercent: 87,
    aiExplanation: 'Subsurface soil moisture (82%) is approaching near-saturation levels. Accelerometer node TS-02 at mid-slope failure plane is detecting low-amplitude vibrational harmonics, signaling potential shear zone expansion.',
    contributions: {
      rainfall: 36,
      soilMoisture: 33,
      groundVibration: 18,
      terrainHistory: 13
    },
    trend: [
      { time: '09:00', score: 28, rainfall: 18, moisture: 50 },
      { time: '09:15', score: 35, rainfall: 28, moisture: 58 },
      { time: '09:30', score: 48, rainfall: 45, moisture: 69 },
      { time: '09:45', score: 59, rainfall: 58, moisture: 76 },
      { time: '10:00', score: 68, rainfall: 68, moisture: 82 }
    ],
    affectedAreaRadiusKm: 1.2
  },
  3: {
    riskScore: 82,
    riskLevel: 'HIGH',
    rainfallMm: 82,
    rainfallIntensity: 'High',
    soilMoisturePercent: 89,
    groundVibration: 'High',
    slopeCondition: 'Critical',
    factorOfSafety: 1.06,
    estimatedRiskWindow: '10–20 minutes',
    aiConfidencePercent: 91,
    aiExplanation: 'Risk is rapidly escalating because rainfall intensity has increased (82 mm), soil moisture is approaching complete saturation (89%), and multiple nearby nodes (TS-03, TS-04, TS-08) are exhibiting abnormal low-frequency vibration signatures consistent with subsurface shear strain.',
    contributions: {
      rainfall: 35,
      soilMoisture: 30,
      groundVibration: 20,
      terrainHistory: 15
    },
    trend: [
      { time: '09:00', score: 35, rainfall: 24, moisture: 55 },
      { time: '09:15', score: 42, rainfall: 38, moisture: 64 },
      { time: '09:30', score: 51, rainfall: 52, moisture: 72 },
      { time: '09:45', score: 64, rainfall: 68, moisture: 81 },
      { time: '10:00', score: 82, rainfall: 82, moisture: 89 }
    ],
    affectedAreaRadiusKm: 1.6
  },
  4: {
    riskScore: 94,
    riskLevel: 'CRITICAL',
    rainfallMm: 110,
    rainfallIntensity: 'Extreme',
    soilMoisturePercent: 96,
    groundVibration: 'Critical',
    slopeCondition: 'Failure Imminent',
    factorOfSafety: 0.92,
    estimatedRiskWindow: '< 10 minutes',
    aiConfidencePercent: 96,
    aiExplanation: 'CRITICAL PRECURSOR THRESHOLD EXCEEDED. Soil moisture has achieved super-saturation (96%) with severe pore-pressure liquefaction risk. Toe-cutting accelerometer nodes register sustained high-amplitude micro-tremors (>0.82 mm/s), indicating active sliding plane displacement.',
    contributions: {
      rainfall: 34,
      soilMoisture: 32,
      groundVibration: 24,
      terrainHistory: 10
    },
    trend: [
      { time: '09:00', score: 35, rainfall: 24, moisture: 55 },
      { time: '09:15', score: 48, rainfall: 42, moisture: 66 },
      { time: '09:30', score: 65, rainfall: 64, moisture: 80 },
      { time: '09:45', score: 82, rainfall: 86, moisture: 90 },
      { time: '10:00', score: 94, rainfall: 110, moisture: 96 }
    ],
    affectedAreaRadiusKm: 2.1
  }
};
