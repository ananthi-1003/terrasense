import type { RecommendationItem, SimulationStage } from '../types';

export const BASELINE_RECOMMENDATIONS: RecommendationItem[] = [
  {
    id: 'rec-01',
    order: 1,
    title: 'Maintain Routine Sensor Telemetry Inspection',
    description: 'Ensure all 8 mesh-connected monitoring nodes report regular heartbeat pings and soil moisture readings every 60 seconds.',
    target: 'Field Engineers',
    urgency: 'STANDARD',
    status: 'RECOMMENDED'
  },
  {
    id: 'rec-02',
    order: 2,
    title: 'Routine Visual Inspection of Culvert Drainage',
    description: 'Check drainage channels at toe-cutting slopes for sedimentation or debris buildup during routine patrol.',
    target: 'Civil Administration',
    urgency: 'STANDARD',
    status: 'RECOMMENDED'
  },
  {
    id: 'rec-03',
    order: 3,
    title: 'Community Preparedness Signage Verification',
    description: 'Verify emergency evacuation markers and siren testing audibility along vulnerable residential sectors.',
    target: 'Public & Village Heads',
    urgency: 'STANDARD',
    status: 'RECOMMENDED'
  }
];

export const ELEVATED_RECOMMENDATIONS: RecommendationItem[] = [
  {
    id: 'rec-04',
    order: 1,
    title: 'Alert Vulnerable Residents in the Affected Zone',
    description: 'Dispatch localized cell-broadcast advisory alerts informing residents of elevated slope instability and advising standby posture.',
    target: 'Public & Village Heads',
    urgency: 'URGENT',
    status: 'RECOMMENDED'
  },
  {
    id: 'rec-05',
    order: 2,
    title: 'Restrict Movement Near the Identified Danger Area',
    description: 'Enforce perimeter control around high-risk scarps and prohibit non-essential pedestrian and livestock traversal.',
    target: 'Police & Traffic',
    urgency: 'URGENT',
    status: 'RECOMMENDED'
  },
  {
    id: 'rec-06',
    order: 3,
    title: 'Consider Temporary Road Closure on the Affected Route',
    description: 'Issue preliminary traffic diversion advisories for heavy haulage vehicles along the primary arterial highway pass.',
    target: 'Traffic Police',
    urgency: 'URGENT',
    status: 'RECOMMENDED'
  },
  {
    id: 'rec-07',
    order: 4,
    title: 'Increase Monitoring Density in the Hotspot',
    description: 'Deploy supplementary portable mesh sensor node (TS-09) to increase spatial resolution along the active shear fracture zone.',
    target: 'Field Engineers',
    urgency: 'ELEVATED',
    status: 'RECOMMENDED'
  },
  {
    id: 'rec-08',
    order: 5,
    title: 'Notify Local Disaster-Management Authorities (SDMA / NDRF)',
    description: 'Issue Flash Telemetry Incident Bulletin to State Disaster Management Authority and nearest NDRF / SDRF battalion.',
    target: 'Emergency SDRF/NDRF',
    urgency: 'URGENT',
    status: 'RECOMMENDED'
  },
  {
    id: 'rec-09',
    order: 6,
    title: 'Check Drainage Conditions & Remove Safe-to-Address Blockages',
    description: 'Deploy road maintenance teams to unblock surface catch-basins where safe, mitigating dangerous perched water table surcharge.',
    target: 'Field Engineers',
    urgency: 'ELEVATED',
    status: 'RECOMMENDED'
  },
  {
    id: 'rec-10',
    order: 7,
    title: 'Prepare Evacuation Routes & Emergency Response Teams',
    description: 'Stage primary medical ambulances and volunteer transport vehicles at community school assembly ground.',
    target: 'Civil Administration',
    urgency: 'URGENT',
    status: 'RECOMMENDED'
  }
];

export const CRITICAL_RECOMMENDATIONS: RecommendationItem[] = [
  {
    id: 'rec-c1',
    order: 1,
    title: 'IMMEDIATE EVACUATION of High-Hazard Sector',
    description: 'Execute rapid staged evacuation of all homes within the 1.4 km hazard radius to designated high-ground relief centers.',
    target: 'Public & Village Heads',
    urgency: 'CRITICAL',
    status: 'TRIGGERED'
  },
  {
    id: 'rec-c2',
    order: 2,
    title: 'TOTAL ARTERIAL ROAD CLOSURE & BARRICADING',
    description: 'Immediately barricade Highway Pass KM 14.2 to both directions. Reroute all traffic via Upper Ridge Bypass.',
    target: 'Traffic Police',
    urgency: 'CRITICAL',
    status: 'TRIGGERED'
  },
  {
    id: 'rec-c3',
    order: 3,
    title: 'ACTIVATE COMMUNITY ACOUSTIC WARNING SIRENS',
    description: 'Trigger dual-tone civil defense sirens across sectors Alpha and Bravo to alert non-phone carrying residents.',
    target: 'Civil Administration',
    urgency: 'CRITICAL',
    status: 'TRIGGERED'
  },
  {
    id: 'rec-c4',
    order: 4,
    title: 'DISPATCH RAPID RESPONSE FORCE (NDRF / SDRF)',
    description: 'Deploy staged rescue squads with heavy clearance gear to staging perimeter outside slide runout envelope.',
    target: 'Emergency SDRF/NDRF',
    urgency: 'CRITICAL',
    status: 'TRIGGERED'
  },
  {
    id: 'rec-c5',
    order: 5,
    title: 'CONTINUOUS HIGH-FREQUENCY NODE SAMPLING (10 Hz)',
    description: 'Switch active nodes TS-01 through TS-09 to continuous LoRa burst telemetry mode to track minute slip progression.',
    target: 'Field Engineers',
    urgency: 'CRITICAL',
    status: 'TRIGGERED'
  }
];

export function getRecommendationsForStage(stage: SimulationStage): RecommendationItem[] {
  if (stage <= 1) return BASELINE_RECOMMENDATIONS;
  if (stage <= 3) return ELEVATED_RECOMMENDATIONS;
  return CRITICAL_RECOMMENDATIONS;
}
