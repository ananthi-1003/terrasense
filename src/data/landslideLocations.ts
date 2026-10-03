export interface DelayTactic {
  id: string;
  action: string;
  aiReason: string;
  timeGainEstimate: string;
}

export interface LandslideLocation {
  id: string;
  name: string;
  state: string;
  district: string;
  lat: number;
  lng: number;
  elevation: string;
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
  riskScore: number;
  color: string; // hex color for markers and charts
  badgeClass: string;
  factors: {
    rainfall: string;
    soilMoisture: string;
    vibration: string;
    slope: string;
    poreWaterPressure: string;
    displacementVelocity: string;
    safetyFactor: number;
  };
  recommendations: DelayTactic[];
  estimatedTimeWindow: string;
  affected: {
    summary: string;
    roads: string;
    villages: string;
    people: string;
  };
  trend24h: {
    time: string;
    risk: number;
    rainfall: number;
    threshold: number;
  }[];
  alertsLog: {
    id: string;
    time: string;
    type: 'SMS' | 'Siren' | 'Authority' | 'RiverOverflow' | 'Email';
    status: 'Sent' | 'Active' | 'Dispatched' | 'Standby' | 'Monitoring' | 'Normal';
    statusClass: string;
    message: string;
    target: string;
  }[];
}

export const LANDSLIDE_LOCATIONS: LandslideLocation[] = [
  {
    id: 'cherapunji',
    name: 'Cherapunji',
    state: 'Meghalaya',
    district: 'East Khasi Hills',
    lat: 25.2702,
    lng: 91.7323,
    elevation: '1,430 m',
    riskLevel: 'Critical',
    riskScore: 94,
    color: '#ef4444', // Red
    badgeClass: 'bg-red-950/80 text-red-400 border-red-500/50',
    factors: {
      rainfall: '120mm',
      soilMoisture: '92%',
      vibration: 'High',
      slope: '45deg',
      poreWaterPressure: '44.8 kPa',
      displacementVelocity: '16.4 mm/h',
      safetyFactor: 0.82
    },
    recommendations: [
      {
        id: 'cp-1',
        action: '1. Increase monitoring frequency',
        aiReason: 'AI Reason: Continuous 1-min telemetry bursts detect sudden slope acceleration early, extending decision lead-time by 45-60 minutes.',
        timeGainEstimate: '+45-60 min warning lead-time'
      },
      {
        id: 'cp-2',
        action: '2. Restrict movement on NH-13',
        aiReason: 'AI Reason: Reduces exposure while critical window passes - prevents vehicular entrapment during imminent slope collapse.',
        timeGainEstimate: 'Zero civilian exposure in impact corridor'
      },
      {
        id: 'cp-3',
        action: '3. Check drainage',
        aiReason: 'AI Reason: Diverting water can reduce pore pressure and potentially delay slope failure by 2-3 hours - gaining evacuation time.',
        timeGainEstimate: '+2-3 hours slope failure delay'
      },
      {
        id: 'cp-4',
        action: '4. Prepare evacuation for 2 villages',
        aiReason: 'AI Reason: Early staging enables orderly exit before peak saturation, ensuring 120 residents reach high ground ahead of debris flow.',
        timeGainEstimate: '+90 min evacuation safety margin'
      }
    ],
    estimatedTimeWindow: 'High risk in next 6-12 hours',
    affected: {
      summary: 'Affected: 2 roads, 3 villages, 120 people',
      roads: '2 roads (NH-13 Corridor & Mawmluh feeder pass)',
      villages: '3 villages (Nongpriang, Mawmluh, Laitkynsew)',
      people: '120 people within the primary debris trajectory'
    },
    trend24h: [
      { time: '00:00', risk: 38, rainfall: 12, threshold: 75 },
      { time: '02:00', risk: 42, rainfall: 18, threshold: 75 },
      { time: '04:00', risk: 45, rainfall: 25, threshold: 75 },
      { time: '06:00', risk: 53, rainfall: 38, threshold: 75 },
      { time: '08:00', risk: 62, rainfall: 54, threshold: 75 },
      { time: '10:00', risk: 71, rainfall: 72, threshold: 75 },
      { time: '12:00', risk: 79, rainfall: 86, threshold: 75 },
      { time: '14:00', risk: 84, rainfall: 98, threshold: 75 },
      { time: '16:00', risk: 88, rainfall: 108, threshold: 75 },
      { time: '18:00', risk: 91, rainfall: 115, threshold: 75 },
      { time: '20:00', risk: 93, rainfall: 118, threshold: 75 },
      { time: '22:00', risk: 94, rainfall: 120, threshold: 75 }
    ],
    alertsLog: [
      {
        id: 'alt-c0',
        time: '18:50:12',
        type: 'RiverOverflow',
        status: 'Active',
        statusClass: 'bg-red-950 text-red-400 border-red-500 animate-pulse font-bold',
        message: 'RIVER OVERFLOW ALERT: Water level crossed 3.2m at Khasi Hills',
        target: 'Khasi Hills Drainage Basin & District Administration'
      },
      {
        id: 'alt-c-email',
        time: '18:49:00',
        type: 'Email',
        status: 'Sent',
        statusClass: 'bg-blue-950 text-blue-300 border-blue-500/40',
        message: 'Dispatched emergency flood bulletin email to State Disaster Management Authority (SDMA) & IMD Guwahati.',
        target: 'SDMA & IMD Severe Weather Cell'
      },
      {
        id: 'alt-c1',
        time: '18:42:10',
        type: 'SMS',
        status: 'Sent',
        statusClass: 'bg-emerald-950 text-emerald-400 border-emerald-500/40',
        message: 'Dispatched emergency warning SMS to 120 residents & village headmen via NDMA CAP Cell.',
        target: '120 Residents & Local Council'
      },
      {
        id: 'alt-c2',
        time: '18:45:00',
        type: 'Siren',
        status: 'Active',
        statusClass: 'bg-red-950 text-red-400 border-red-500 animate-pulse',
        message: '110dB High-Intensity Acoustic Siren #2 sounding continuous warble cycle at Mawmluh Sector.',
        target: 'Sector Mawmluh Station'
      },
      {
        id: 'alt-c3',
        time: '18:48:30',
        type: 'Authority',
        status: 'Dispatched',
        statusClass: 'bg-amber-950 text-amber-300 border-amber-500/40',
        message: 'NDRF 1st Battalion Guwahati & SDRF Shillong Quick Response Team deployed to NH-13 checkpost.',
        target: 'NDRF & District Police'
      }
    ]
  },
  {
    id: 'tawang',
    name: 'Tawang',
    state: 'Arunachal Pradesh',
    district: 'Tawang',
    lat: 27.5860,
    lng: 91.8650,
    elevation: '3,048 m',
    riskLevel: 'High',
    riskScore: 78,
    color: '#f97316', // Orange-Red
    badgeClass: 'bg-orange-950/80 text-orange-400 border-orange-500/50',
    factors: {
      rainfall: '88mm',
      soilMoisture: '81%',
      vibration: 'High',
      slope: '48deg',
      poreWaterPressure: '33.2 kPa',
      displacementVelocity: '9.4 mm/h',
      safetyFactor: 1.04
    },
    recommendations: [
      {
        id: 'tw-1',
        action: '1. Increase monitoring frequency',
        aiReason: 'AI Reason: Tiltmeter and LiDAR cadence raised to 5-min intervals to catch shear strain shifts, securing 1-2 hours response cushion.',
        timeGainEstimate: '+60-90 min response window'
      },
      {
        id: 'tw-2',
        action: '2. Restrict movement on BCT / Sela Pass Route',
        aiReason: 'AI Reason: Reduces exposure while critical window passes - prevents vehicle tailbacks under unstable moraine cliffs.',
        timeGainEstimate: 'Eliminates high-altitude transit hazard'
      },
      {
        id: 'tw-3',
        action: '3. Check drainage',
        aiReason: 'AI Reason: Diverting water can reduce pore pressure and potentially delay slope failure by 2-3 hours - gaining evacuation time.',
        timeGainEstimate: '+2-3 hours failure delay'
      },
      {
        id: 'tw-4',
        action: '4. Prepare evacuation for 2 outposts',
        aiReason: 'AI Reason: Pre-positioning heavy troop carriers allows phased retreat of 120 military and civilian personnel before freeze-thaw failure.',
        timeGainEstimate: '+2 hours orderly evacuation'
      }
    ],
    estimatedTimeWindow: 'High risk in next 6-12 hours',
    affected: {
      summary: 'Affected: 2 roads, 3 villages, 120 people',
      roads: '2 roads (BCT Sela Route & Gompa bypass)',
      villages: '3 villages (Lhou, Urgelling, Kitpi)',
      people: '120 people in steep moraine slope buffer'
    },
    trend24h: [
      { time: '00:00', risk: 32, rainfall: 8, threshold: 75 },
      { time: '02:00', risk: 35, rainfall: 14, threshold: 75 },
      { time: '04:00', risk: 39, rainfall: 22, threshold: 75 },
      { time: '06:00', risk: 44, rainfall: 30, threshold: 75 },
      { time: '08:00', risk: 51, rainfall: 42, threshold: 75 },
      { time: '10:00', risk: 59, rainfall: 56, threshold: 75 },
      { time: '12:00', risk: 65, rainfall: 68, threshold: 75 },
      { time: '14:00', risk: 70, rainfall: 74, threshold: 75 },
      { time: '16:00', risk: 73, rainfall: 80, threshold: 75 },
      { time: '18:00', risk: 75, rainfall: 84, threshold: 75 },
      { time: '20:00', risk: 77, rainfall: 86, threshold: 75 },
      { time: '22:00', risk: 78, rainfall: 88, threshold: 75 }
    ],
    alertsLog: [
      {
        id: 'alt-t1',
        time: '18:15:20',
        type: 'SMS',
        status: 'Sent',
        statusClass: 'bg-emerald-950 text-emerald-400 border-emerald-500/40',
        message: 'High Risk automated alert sent to Border Roads Org (BRO Project Vartak) & DC Tawang.',
        target: 'BRO 42 TF & DC Office'
      },
      {
        id: 'alt-t2',
        time: '18:22:10',
        type: 'Siren',
        status: 'Standby',
        statusClass: 'bg-amber-950 text-amber-300 border-amber-500/40',
        message: 'Sela Tunnel South Portal siren on standby armed trigger (auto-fire at 85% risk).',
        target: 'Sela Portal Hooter'
      },
      {
        id: 'alt-t3',
        time: '18:30:05',
        type: 'Authority',
        status: 'Dispatched',
        statusClass: 'bg-amber-950 text-amber-300 border-amber-500/40',
        message: 'Army 190 Mountain Brigade & BRO rapid earthmovers mobilized to vulnerable hairpin KM 14.',
        target: 'Indian Army & BRO Team'
      }
    ]
  },
  {
    id: 'aizawl',
    name: 'Aizawl',
    state: 'Mizoram',
    district: 'Aizawl',
    lat: 23.7271,
    lng: 92.7176,
    elevation: '1,132 m',
    riskLevel: 'High',
    riskScore: 72,
    color: '#f97316', // Orange-Red
    badgeClass: 'bg-orange-950/80 text-orange-400 border-orange-500/50',
    factors: {
      rainfall: '74mm',
      soilMoisture: '78%',
      vibration: 'High',
      slope: '38deg',
      poreWaterPressure: '28.4 kPa',
      displacementVelocity: '6.8 mm/h',
      safetyFactor: 1.15
    },
    recommendations: [
      {
        id: 'az-1',
        action: '1. Increase monitoring frequency',
        aiReason: 'AI Reason: Inclinometer polling tracks tension crack expansion in urban fill, granting 45 mins tactical alert before road shearing.',
        timeGainEstimate: '+45 min decision lead-time'
      },
      {
        id: 'az-2',
        action: '2. Restrict movement on Chanmari artery',
        aiReason: 'AI Reason: Reduces exposure while critical window passes - prevents traffic snarls in acute downhill rockfall zones.',
        timeGainEstimate: 'Prevents urban commuter gridlock'
      },
      {
        id: 'az-3',
        action: '3. Check drainage',
        aiReason: 'AI Reason: Diverting water can reduce pore pressure and potentially delay slope failure by 2-3 hours - gaining evacuation time.',
        timeGainEstimate: '+2-3 hours delay in slope liquefaction'
      },
      {
        id: 'az-4',
        action: '4. Prepare evacuation for 2 hillside wards',
        aiReason: 'AI Reason: Early warden alerts allow orderly relocation of 120 residents from Laipuitlang escarpment before evening downpours.',
        timeGainEstimate: '+2 hours safe evacuation window'
      }
    ],
    estimatedTimeWindow: 'High risk in next 6-12 hours',
    affected: {
      summary: 'Affected: 2 roads, 3 villages, 120 people',
      roads: '2 roads (Chanmari-Bawngkawn arterial & Ring bypass)',
      villages: '3 villages (Laipuitlang, Ramhlun, Durtlang hill slopes)',
      people: '120 people in active tension-crack wards'
    },
    trend24h: [
      { time: '00:00', risk: 28, rainfall: 4, threshold: 75 },
      { time: '02:00', risk: 31, rainfall: 10, threshold: 75 },
      { time: '04:00', risk: 34, rainfall: 18, threshold: 75 },
      { time: '06:00', risk: 40, rainfall: 26, threshold: 75 },
      { time: '08:00', risk: 46, rainfall: 35, threshold: 75 },
      { time: '10:00', risk: 52, rainfall: 46, threshold: 75 },
      { time: '12:00', risk: 58, rainfall: 55, threshold: 75 },
      { time: '14:00', risk: 64, rainfall: 62, threshold: 75 },
      { time: '16:00', risk: 68, rainfall: 68, threshold: 75 },
      { time: '18:00', risk: 70, rainfall: 71, threshold: 75 },
      { time: '20:00', risk: 71, rainfall: 73, threshold: 75 },
      { time: '22:00', risk: 72, rainfall: 74, threshold: 75 }
    ],
    alertsLog: [
      {
        id: 'alt-a1',
        time: '17:50:45',
        type: 'SMS',
        status: 'Sent',
        statusClass: 'bg-emerald-950 text-emerald-400 border-emerald-500/40',
        message: 'Aizawl Municipal Corporation & Disaster Management Directorate broadcasted text alerts.',
        target: 'Urban Hillside Wards'
      },
      {
        id: 'alt-a2',
        time: '18:05:10',
        type: 'Siren',
        status: 'Standby',
        statusClass: 'bg-amber-950 text-amber-300 border-amber-500/40',
        message: 'Ward siren station primed. Continuous monitoring of retaining wall inclinometers.',
        target: 'Laipuitlang Siren Post'
      },
      {
        id: 'alt-a3',
        time: '18:18:22',
        type: 'Authority',
        status: 'Dispatched',
        statusClass: 'bg-amber-950 text-amber-300 border-amber-500/40',
        message: 'State Disaster Management Authority quick action team positioned at Chanmari.',
        target: 'Mizoram SDMA Taskforce'
      }
    ]
  },
  {
    id: 'gangtok',
    name: 'Gangtok',
    state: 'Sikkim',
    district: 'East Sikkim',
    lat: 27.3389,
    lng: 88.6065,
    elevation: '1,650 m',
    riskLevel: 'Medium',
    riskScore: 52,
    color: '#eab308', // Yellow
    badgeClass: 'bg-yellow-950/80 text-yellow-400 border-yellow-500/50',
    factors: {
      rainfall: '46mm',
      soilMoisture: '63%',
      vibration: 'Medium',
      slope: '34deg',
      poreWaterPressure: '19.1 kPa',
      displacementVelocity: '2.4 mm/h',
      safetyFactor: 1.42
    },
    recommendations: [
      {
        id: 'gt-1',
        action: '1. Increase monitoring frequency',
        aiReason: 'AI Reason: Stepping up piezometer polling detects sudden hydrological spikes, expanding warning lead-time by 2-3 hours.',
        timeGainEstimate: '+2-3 hours strategic notice'
      },
      {
        id: 'gt-2',
        action: '2. Restrict movement on NH-10 Teesta corridor',
        aiReason: 'AI Reason: Reduces exposure while critical window passes, preventing vehicles from entering vulnerable riverbank scarp sections.',
        timeGainEstimate: 'Averts transit entrapment'
      },
      {
        id: 'gt-3',
        action: '3. Check drainage',
        aiReason: 'AI Reason: Diverting water can reduce pore pressure and potentially delay slope failure by 2-3 hours - gaining evacuation time.',
        timeGainEstimate: '+2-3 hours delay in slope destabilization'
      },
      {
        id: 'gt-4',
        action: '4. Prepare evacuation for 2 riverside hamlets',
        aiReason: 'AI Reason: Pre-briefing riverbank communities ensures rapid uphill movement if debris blocks stream channels.',
        timeGainEstimate: '+2.5 hours response margin'
      }
    ],
    estimatedTimeWindow: 'Moderate risk in next 18-24 hours',
    affected: {
      summary: 'Affected: 1 road, 2 villages, 45 people',
      roads: '1 road (NH-10 Teesta Valley link road)',
      villages: '2 villages (Ranipool periphery & Singtam scarp)',
      people: '45 people along riverbank slope foot'
    },
    trend24h: [
      { time: '00:00', risk: 36, rainfall: 10, threshold: 75 },
      { time: '02:00', risk: 37, rainfall: 14, threshold: 75 },
      { time: '04:00', risk: 38, rainfall: 18, threshold: 75 },
      { time: '06:00', risk: 42, rainfall: 22, threshold: 75 },
      { time: '08:00', risk: 45, rainfall: 28, threshold: 75 },
      { time: '10:00', risk: 48, rainfall: 32, threshold: 75 },
      { time: '12:00', risk: 50, rainfall: 36, threshold: 75 },
      { time: '14:00', risk: 51, rainfall: 40, threshold: 75 },
      { time: '16:00', risk: 53, rainfall: 42, threshold: 75 },
      { time: '18:00', risk: 52, rainfall: 44, threshold: 75 },
      { time: '20:00', risk: 52, rainfall: 45, threshold: 75 },
      { time: '22:00', risk: 52, rainfall: 46, threshold: 75 }
    ],
    alertsLog: [
      {
        id: 'alt-g1',
        time: '16:30:00',
        type: 'SMS',
        status: 'Sent',
        statusClass: 'bg-emerald-950 text-emerald-400 border-emerald-500/40',
        message: 'Advisory bulletin sent to Sikkim DDMA and Highway Patrol authorities.',
        target: 'Sikkim DDMA & Traffic'
      },
      {
        id: 'alt-g2',
        time: '17:00:00',
        type: 'Siren',
        status: 'Standby',
        statusClass: 'bg-slate-900 text-slate-400 border-slate-700',
        message: 'Station siren inactive. Acoustic trigger threshold set at >=75% risk.',
        target: 'Ranipool Siren Node'
      },
      {
        id: 'alt-g3',
        time: '17:35:10',
        type: 'Authority',
        status: 'Monitoring',
        statusClass: 'bg-blue-950 text-blue-300 border-blue-500/40',
        message: 'Sikkim PWD engineers conducting culvert desiltation along NH-10.',
        target: 'Sikkim PWD Road Cell'
      }
    ]
  },
  {
    id: 'kohima',
    name: 'Kohima',
    state: 'Nagaland',
    district: 'Kohima',
    lat: 25.6751,
    lng: 94.1086,
    elevation: '1,444 m',
    riskLevel: 'Low',
    riskScore: 24,
    color: '#22c55e', // Green
    badgeClass: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/50',
    factors: {
      rainfall: '18mm',
      soilMoisture: '38%',
      vibration: 'Low',
      slope: '29deg',
      poreWaterPressure: '8.2 kPa',
      displacementVelocity: '0.3 mm/h',
      safetyFactor: 2.15
    },
    recommendations: [
      {
        id: 'kh-1',
        action: '1. Maintain standard monitoring frequency',
        aiReason: 'AI Reason: Telemetry confirms slope stability; 15-min cycles conserve node battery while retaining rapid trip capabilities.',
        timeGainEstimate: 'Baseline alert readiness'
      },
      {
        id: 'kh-2',
        action: '2. Maintain normal transit on NH-29',
        aiReason: 'AI Reason: Factor of Safety > 2.0; no restriction required, maintaining vital logistics flow without safety compromise.',
        timeGainEstimate: 'Normal traffic flow'
      },
      {
        id: 'kh-3',
        action: '3. Routine drainage inspection',
        aiReason: 'AI Reason: Checking roadside gutters prevents water ponding and preserves soil suction against future monsoonal downpours.',
        timeGainEstimate: 'Preventative pore-pressure control'
      },
      {
        id: 'kh-4',
        action: '4. Village emergency councils on standby',
        aiReason: 'AI Reason: Keeps community disaster committees briefed without triggering premature disruptions or anxiety.',
        timeGainEstimate: 'Preparedness reserve'
      }
    ],
    estimatedTimeWindow: 'Stable (No risk in next 48+ hours)',
    affected: {
      summary: 'Affected: 0 roads, 0 villages, 0 people',
      roads: '0 roads closed (NH-29 open and unrestricted)',
      villages: '0 villages at risk',
      people: 'Normal daily operations active'
    },
    trend24h: [
      { time: '00:00', risk: 18, rainfall: 2, threshold: 75 },
      { time: '02:00', risk: 19, rainfall: 4, threshold: 75 },
      { time: '04:00', risk: 20, rainfall: 6, threshold: 75 },
      { time: '06:00', risk: 21, rainfall: 8, threshold: 75 },
      { time: '08:00', risk: 22, rainfall: 10, threshold: 75 },
      { time: '10:00', risk: 24, rainfall: 12, threshold: 75 },
      { time: '12:00', risk: 25, rainfall: 14, threshold: 75 },
      { time: '14:00', risk: 24, rainfall: 16, threshold: 75 },
      { time: '16:00', risk: 25, rainfall: 17, threshold: 75 },
      { time: '18:00', risk: 24, rainfall: 18, threshold: 75 },
      { time: '20:00', risk: 24, rainfall: 18, threshold: 75 },
      { time: '22:00', risk: 24, rainfall: 18, threshold: 75 }
    ],
    alertsLog: [
      {
        id: 'alt-k1',
        time: '15:10:00',
        type: 'SMS',
        status: 'Normal',
        statusClass: 'bg-slate-900 text-slate-400 border-slate-700',
        message: 'Routine health telemetry broadcasted to Nagaland NSDMA Control Hub.',
        target: 'Nagaland State Control'
      },
      {
        id: 'alt-k2',
        time: '15:10:00',
        type: 'Siren',
        status: 'Normal',
        statusClass: 'bg-slate-900 text-slate-400 border-slate-700',
        message: 'All acoustic siren nodes in silent diagnostic standby mode.',
        target: 'Phesama Tower #1'
      },
      {
        id: 'alt-k3',
        time: '15:10:00',
        type: 'Authority',
        status: 'Monitoring',
        statusClass: 'bg-emerald-950 text-emerald-300 border-emerald-500/40',
        message: 'Standard weather radar satellite scan confirmed minimal precipitation cell.',
        target: 'IMD & Kohima District Cell'
      }
    ]
  }
];
