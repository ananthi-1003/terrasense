export interface PastLandslideEvent {
  id: string;
  name: string;
  locationName: string;
  state: string;
  district: string;
  lat: number;
  lng: number;
  date: string;
  year: number;
  peopleAffected: number;
  severity: 'Catastrophic' | 'Severe' | 'High';
  description: string;
  cause: string;
}

export const PAST_LANDSLIDES: PastLandslideEvent[] = [
  {
    id: 'wayanad-2024',
    name: 'Wayanad Mega Debris Flow',
    locationName: 'Chooralmala & Meppadi, Wayanad',
    state: 'Kerala',
    district: 'Wayanad',
    lat: 11.5534,
    lng: 76.1558,
    date: '30 July 2024',
    year: 2024,
    peopleAffected: 420,
    severity: 'Catastrophic',
    description: 'Devastating nocturnal landslide and river mudflow that flattened settlements in Chooralmala, Mundakkai, and Attamala.',
    cause: 'Extreme torrential rainfall (>372mm in 24 hours) trigger.'
  },
  {
    id: 'kedarnath-2013',
    name: 'Kedarnath Valley Disaster',
    locationName: 'Kedarnath & Mandakini Basin',
    state: 'Uttarakhand',
    district: 'Rudraprayag',
    lat: 30.7346,
    lng: 79.0669,
    date: '16 June 2013',
    year: 2013,
    peopleAffected: 5700,
    severity: 'Catastrophic',
    description: 'Chorabari glacial lake burst and massive multi-slope landslides washed away Kedarnath township and transit camps.',
    cause: 'Glacial lake breach (GLOF) & cloudburst downpour.'
  },
  {
    id: 'malin-2014',
    name: 'Malin Village Burial',
    locationName: 'Malin, Ambegaon Taluka',
    state: 'Maharashtra',
    district: 'Pune',
    lat: 19.1604,
    lng: 73.6888,
    date: '30 July 2014',
    year: 2014,
    peopleAffected: 151,
    severity: 'Catastrophic',
    description: 'Entire village hillside broke off during pre-dawn hours, burying 44 houses and residents under 30ft of heavy mud.',
    cause: 'Continuous monsoon rainfall and slope destabilization.'
  },
  {
    id: 'ooty-2009',
    name: 'Ooty-Nilgiris Multi-Slide',
    locationName: 'Ooty & Marappalam Ghat',
    state: 'Tamil Nadu',
    district: 'Nilgiris',
    lat: 11.4102,
    lng: 76.6950,
    date: '08 November 2009',
    year: 2009,
    peopleAffected: 43,
    severity: 'Severe',
    description: 'Over 1,100 landslides triggered across Nilgiris district in 48 hours following cyclone Phyan torrential rains.',
    cause: 'Cyclonic cloudburst on saturated tea plantation slopes.'
  },
  {
    id: 'pettimudi-2020',
    name: 'Pettimudi Tea Estate Slide',
    locationName: 'Pettimudi, Rajamala, Munnar',
    state: 'Kerala',
    district: 'Idukki',
    lat: 10.1658,
    lng: 77.0145,
    date: '07 August 2020',
    year: 2020,
    peopleAffected: 66,
    severity: 'Catastrophic',
    description: 'A colossal debris avalanche from high ridges swept away four tea-estate worker settlement rows while they slept.',
    cause: 'Heavy torrential rains (>600mm over 3 days) and gravel bed failure.'
  },
  {
    id: 'irshalwadi-2023',
    name: 'Irshalwadi Tribal Hamlet Slide',
    locationName: 'Irshalwadi, Khalapur, Raigad',
    state: 'Maharashtra',
    district: 'Raigad',
    lat: 18.9328,
    lng: 73.2324,
    date: '19 July 2023',
    year: 2023,
    peopleAffected: 84,
    severity: 'Catastrophic',
    description: 'Hillock above tribal village caved in around midnight, sliding over 48 houses on the steep cliff terrace.',
    cause: 'Severe rainfall of 498mm in Raigad over 48 hours.'
  },
  {
    id: 'shimla-2023',
    name: 'Shimla Summer Hill Disaster',
    locationName: 'Summer Hill & Krishna Nagar, Shimla',
    state: 'Himachal Pradesh',
    district: 'Shimla',
    lat: 31.1048,
    lng: 77.1734,
    date: '14 August 2023',
    year: 2023,
    peopleAffected: 51,
    severity: 'Severe',
    description: 'Shiv Bawdi temple was buried under huge uprooted pine trees and sludge when mountain crest sheared off.',
    cause: 'Intense 3-day cloudburst on fractured shale rock slopes.'
  },
  {
    id: 'darjeeling-2015',
    name: 'Mirik & Kalimpong Landslides',
    locationName: 'Mirik, Darjeeling Hills',
    state: 'West Bengal',
    district: 'Darjeeling',
    lat: 26.8906,
    lng: 88.1752,
    date: '01 July 2015',
    year: 2015,
    peopleAffected: 38,
    severity: 'Severe',
    description: 'Multiple simultaneous slides severed National Highway 10 and NH-55, cutting off Sikkim and Darjeeling.',
    cause: 'Incessant monsoon deluge weakening vulnerable sub-Himalayan roads.'
  },
  {
    id: 'guwahati-2022',
    name: 'Guwahati Boragaon Slide',
    locationName: 'Boragaon Hill, Guwahati',
    state: 'Assam',
    district: 'Kamrup Metro',
    lat: 26.1445,
    lng: 91.7362,
    date: '14 June 2022',
    year: 2022,
    peopleAffected: 22,
    severity: 'High',
    description: 'Hill cutting and retaining wall collapse crushed construction settlements and worker sheds.',
    cause: 'Pre-monsoon urban flooding and hill base destabilization.'
  },
  {
    id: 'kodagu-2018',
    name: 'Kodagu (Coorg) Escarpment Rupture',
    locationName: 'Madikeri & Jodupala, Kodagu',
    state: 'Karnataka',
    district: 'Kodagu',
    lat: 12.4244,
    lng: 75.7382,
    date: '17 August 2018',
    year: 2018,
    peopleAffected: 18,
    severity: 'Severe',
    description: 'Massive hill fissures and deep translational slides devastated whole plantations and disconnected Coorg from Mangalore.',
    cause: 'Saturated Western Ghats laterite soil under relentless precipitation.'
  },
  {
    id: 'kavalappara-2019',
    name: 'Kavalappara Hill Collapse',
    locationName: 'Bhoodanam, Nilambur, Malappuram',
    state: 'Kerala',
    district: 'Malappuram',
    lat: 11.3327,
    lng: 76.2842,
    date: '08 August 2019',
    year: 2019,
    peopleAffected: 59,
    severity: 'Catastrophic',
    description: 'A 70-acre hill slice collapsed into Muthappan hill valley, burying 40 homes under 40-foot deep sludge.',
    cause: 'High-intensity monsoon downpour on unscientific rubber terracing.'
  },
  {
    id: 'pithoragarh-2016',
    name: 'Bastari Cloudburst Slide',
    locationName: 'Bastari, Pithoragarh',
    state: 'Uttarakhand',
    district: 'Pithoragarh',
    lat: 29.5828,
    lng: 80.2182,
    date: '01 July 2016',
    year: 2016,
    peopleAffected: 30,
    severity: 'Severe',
    description: 'Violent cloudburst unleashed debris and boulders down the gorge, razing Bastari and adjoining mountain villages.',
    cause: 'Extreme cloudburst exceeding 100mm/hr in steep gorge.'
  },
  {
    id: 'chamoli-2021',
    name: 'Rishi Ganga Rock-Ice Avalanche',
    locationName: 'Raini & Tapovan, Chamoli',
    state: 'Uttarakhand',
    district: 'Chamoli',
    lat: 30.4854,
    lng: 79.6974,
    date: '07 February 2021',
    year: 2021,
    peopleAffected: 204,
    severity: 'Catastrophic',
    description: 'Huge section of Nanda Devi glacier rock broke off, cascading down Rishi Ganga gorge and washing away hydro projects.',
    cause: 'Deep structural rock detachment combined with hanging glacier shear.'
  },
  {
    id: 'tupul-2022',
    name: 'Tupul Railway Yard Mudslide',
    locationName: 'Tupul, Noney District',
    state: 'Manipur',
    district: 'Noney',
    lat: 24.8152,
    lng: 93.6821,
    date: '30 June 2022',
    year: 2022,
    peopleAffected: 61,
    severity: 'Catastrophic',
    description: 'Colossal hillside slumped directly on Territorial Army camp guarding the Jiribam-Imphal railway tunnel portal.',
    cause: 'Geological thrust fault displacement fueled by heavy unremitting rain.'
  },
  {
    id: 'mandi-2017',
    name: 'Kotropi Double Bus Landslide',
    locationName: 'Kotropi, Mandi-Pathankot Highway',
    state: 'Himachal Pradesh',
    district: 'Mandi',
    lat: 31.9128,
    lng: 76.9248,
    date: '13 August 2017',
    year: 2017,
    peopleAffected: 46,
    severity: 'Catastrophic',
    description: 'An entire ridge collapsed onto NH-154 during midnight, sweeping two passenger buses into a 1km-deep gorge.',
    cause: 'Severe flash flood weakening highly sheared Himalayan sandstone.'
  },
  {
    id: 'coonoor-2021',
    name: 'Coonoor Ghat Mountain Slide',
    locationName: 'Coonoor-Mettupalayam Pass',
    state: 'Tamil Nadu',
    district: 'Nilgiris',
    lat: 11.3530,
    lng: 76.7959,
    date: '18 October 2021',
    year: 2021,
    peopleAffected: 14,
    severity: 'High',
    description: 'Multiple debris and boulder slides blocked the Nilgiri Mountain Railway heritage line and Ghat Road.',
    cause: 'Northeast monsoon cloud bursts over fragile steep slopes.'
  },
  {
    id: 'idukki-2018',
    name: 'Cheruthoni & Munnar Multi-Slide',
    locationName: 'Idukki Arch Dam Rim & Munnar',
    state: 'Kerala',
    district: 'Idukki',
    lat: 9.8510,
    lng: 76.9740,
    date: '15 August 2018',
    year: 2018,
    peopleAffected: 82,
    severity: 'Catastrophic',
    description: 'Over 14 major landslides and massive flash-flooding destroyed highways and cut off central Kerala hills.',
    cause: 'Centenary worst monsoon deluge in Kerala history.'
  },
  {
    id: 'mangan-2024',
    name: 'Mangan Flash Slide Emergency',
    locationName: 'Mangan, North Sikkim',
    state: 'Sikkim',
    district: 'Mangan',
    lat: 27.5028,
    lng: 88.5283,
    date: '13 June 2024',
    year: 2024,
    peopleAffected: 12,
    severity: 'High',
    description: 'Landslides washed away Sankalang bridge and houses, isolating over 1,200 tourists in Lachung and Chungthang.',
    cause: 'Glacial stream swelling combined with pre-monsoon cloud bursts.'
  }
];

// High-risk cluster zones for the Heatmap effect
export interface HeatmapZone {
  name: string;
  lat: number;
  lng: number;
  radiusKm: number;
  intensity: number; // 0.1 to 1.0
  color: string;
}

export const HISTORICAL_HEATMAP_ZONES: HeatmapZone[] = [
  {
    name: 'Western Ghats - Wayanad & Nilgiris Hotspot',
    lat: 11.45,
    lng: 76.45,
    radiusKm: 65,
    intensity: 0.85,
    color: '#ef4444' // Red hot
  },
  {
    name: 'Central Himalayas - Kedarnath & Chamoli Basin',
    lat: 30.60,
    lng: 79.40,
    radiusKm: 75,
    intensity: 0.90,
    color: '#dc2626'
  },
  {
    name: 'Himachal - Shimla & Mandi Ridge Corridor',
    lat: 31.50,
    lng: 77.05,
    radiusKm: 60,
    intensity: 0.80,
    color: '#ea580c'
  },
  {
    name: 'North-East - Meghalaya & Sikkim Scarp',
    lat: 26.40,
    lng: 90.80,
    radiusKm: 85,
    intensity: 0.88,
    color: '#ef4444'
  },
  {
    name: 'Maharashtra Sahyadri - Raigad & Pune Ghats',
    lat: 19.05,
    lng: 73.50,
    radiusKm: 55,
    intensity: 0.78,
    color: '#f97316'
  }
];
