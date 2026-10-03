import type { Region } from '../types';

export const NER_REGIONS: Region[] = [
  {
    id: 'east-khasi-hills',
    name: 'East Khasi Hills (Mawlynrei Sector)',
    state: 'Meghalaya',
    center: [25.5825, 91.9055],
    zoom: 14,
    hotspots: [
      {
        id: 'hs-ekh-01',
        name: 'Mawlynrei Escarpment Zone-4',
        sector: 'East Khasi Hills / Sector Alpha',
        lat: 25.5822,
        lng: 91.9051,
        elevation: 1420,
        slopeDeg: 42.5,
        nearbyRoad: 'NH-206 Mawlynrei Pass (KM 14.2)',
        nearbyVillage: 'Mawlynrei Upper Village',
        affectedAreaRadiusKm: 1.4,
        historicalIncidents: 6,
        geology: 'Weathered Colluvial Sandstone & Silty Shale'
      },
      {
        id: 'hs-ekh-02',
        name: 'Umshing Valley Drainage Scarp',
        sector: 'East Khasi Hills / Sector Bravo',
        lat: 25.5910,
        lng: 91.9130,
        elevation: 1380,
        slopeDeg: 38.0,
        nearbyRoad: 'NEHU-Umshing Link Bypass',
        nearbyVillage: 'Umshing Settlement',
        affectedAreaRadiusKm: 0.9,
        historicalIncidents: 3,
        geology: 'Fractured Phyllite with High Seepage'
      }
    ],
    nodes: [
      {
        id: 'TS-01',
        name: 'Node TS-01 (Crest Scarp)',
        lat: 25.5840,
        lng: 91.9042,
        elevation: 1435,
        soilMoisture: 58,
        groundVibration: 'Low',
        peakVelocity: 0.08,
        battery: 94,
        connectivity: 'LoRaWAN 868MHz',
        rssi: -72,
        lastUpdateSecondsAgo: 8,
        status: 'ONLINE'
      },
      {
        id: 'TS-02',
        name: 'Node TS-02 (Mid-Slope Failure Plane)',
        lat: 25.5824,
        lng: 91.9050,
        elevation: 1418,
        soilMoisture: 72,
        groundVibration: 'Moderate',
        peakVelocity: 0.32,
        battery: 89,
        connectivity: 'LoRaWAN 868MHz',
        rssi: -68,
        lastUpdateSecondsAgo: 12,
        status: 'ONLINE'
      },
      {
        id: 'TS-03',
        name: 'Node TS-03 (Drainage Gully East)',
        lat: 25.5815,
        lng: 91.9070,
        elevation: 1395,
        soilMoisture: 81,
        groundVibration: 'Moderate',
        peakVelocity: 0.28,
        battery: 91,
        connectivity: '4G Mesh',
        rssi: -79,
        lastUpdateSecondsAgo: 10,
        status: 'ONLINE'
      },
      {
        id: 'TS-04',
        name: 'Node TS-04 (Toe Road Bed Cut)',
        lat: 25.5802,
        lng: 91.9048,
        elevation: 1375,
        soilMoisture: 86,
        groundVibration: 'High',
        peakVelocity: 0.74,
        battery: 82,
        connectivity: 'LoRaWAN 868MHz',
        rssi: -84,
        lastUpdateSecondsAgo: 6,
        status: 'WARNING'
      },
      {
        id: 'TS-05',
        name: 'Node TS-05 (Upper Catchment)',
        lat: 25.5862,
        lng: 91.9025,
        elevation: 1460,
        soilMoisture: 62,
        groundVibration: 'Low',
        peakVelocity: 0.05,
        battery: 96,
        connectivity: 'Satellite',
        rssi: -64,
        lastUpdateSecondsAgo: 14,
        status: 'ONLINE'
      },
      {
        id: 'TS-06',
        name: 'Node TS-06 (South Lateral Flank)',
        lat: 25.5790,
        lng: 91.9030,
        elevation: 1390,
        soilMoisture: 64,
        groundVibration: 'Low',
        peakVelocity: 0.09,
        battery: 88,
        connectivity: 'LoRaWAN 868MHz',
        rssi: -76,
        lastUpdateSecondsAgo: 18,
        status: 'ONLINE'
      },
      {
        id: 'TS-07',
        name: 'Node TS-07 (Colluvial Wedge North)',
        lat: 25.5835,
        lng: 91.9075,
        elevation: 1405,
        soilMoisture: 75,
        groundVibration: 'Moderate',
        peakVelocity: 0.24,
        battery: 79,
        connectivity: 'LoRaWAN 868MHz',
        rssi: -81,
        lastUpdateSecondsAgo: 9,
        status: 'ONLINE'
      },
      {
        id: 'TS-08',
        name: 'Node TS-08 (Stream Outlet Culvert)',
        lat: 25.5782,
        lng: 91.9065,
        elevation: 1360,
        soilMoisture: 89,
        groundVibration: 'High',
        peakVelocity: 0.65,
        battery: 85,
        connectivity: '4G Mesh',
        rssi: -74,
        lastUpdateSecondsAgo: 5,
        status: 'WARNING'
      }
    ],
    infrastructures: [
      {
        id: 'inf-01',
        name: 'Mawlynrei Community Health Sub-Centre',
        type: 'hospital',
        lat: 25.5810,
        lng: 91.9015,
        description: 'Primary emergency trauma post (12 beds)'
      },
      {
        id: 'inf-02',
        name: 'Government Lower Primary School',
        type: 'school',
        lat: 25.5832,
        lng: 91.8998,
        description: 'Designated civil emergency evacuation shelter'
      },
      {
        id: 'inf-03',
        name: 'District Disaster Relief Camp 01',
        type: 'relief_center',
        lat: 25.5870,
        lng: 91.9120,
        description: 'Logistics base and NDRF pre-staging depot'
      }
    ],
    roads: [
      {
        id: 'rd-01',
        name: 'NH-206 Mawlynrei Pass Arterial',
        code: 'NH-206',
        status: 'WATCH',
        affectedLengthKm: 3.2,
        coordinates: [
          [25.5770, 91.9020],
          [25.5795, 91.9042],
          [25.5812, 91.9058],
          [25.5830, 91.9080],
          [25.5855, 91.9110]
        ]
      },
      {
        id: 'rd-02',
        name: 'Upper Ridge Community Access Road',
        code: 'M-RD-04',
        status: 'CLEAR',
        affectedLengthKm: 1.8,
        coordinates: [
          [25.5845, 91.9000],
          [25.5860, 91.9040],
          [25.5875, 91.9090]
        ]
      }
    ],
    villages: [
      {
        id: 'vil-01',
        name: 'Mawlynrei Upper Village',
        lat: 25.5805,
        lng: 91.9020,
        population: 1450,
        status: 'ADVISORY'
      },
      {
        id: 'vil-02',
        name: 'Umshing Valley Hamlets',
        lat: 25.5895,
        lng: 91.9150,
        population: 820,
        status: 'NORMAL'
      }
    ]
  },
  {
    id: 'gangtok-subdivision',
    name: 'Gangtok Corridor (Rani Khola Belt)',
    state: 'Sikkim',
    center: [27.3315, 88.6140],
    zoom: 14,
    hotspots: [
      {
        id: 'hs-gtk-01',
        name: 'Rani Khola Slope Zone 2',
        sector: 'East Sikkim / NH-10 Lifeline',
        lat: 27.3305,
        lng: 88.6120,
        elevation: 1650,
        slopeDeg: 46.0,
        nearbyRoad: 'NH-10 Siliguri-Gangtok Lifeline',
        nearbyVillage: 'Burtuk Sub-Settlement',
        affectedAreaRadiusKm: 1.8,
        historicalIncidents: 9,
        geology: 'Pelitic Schist & Overburden Moraine'
      }
    ],
    nodes: [
      {
        id: 'TS-01',
        name: 'Node TS-01 (Upper Crest)',
        lat: 27.3330,
        lng: 88.6110,
        elevation: 1680,
        soilMoisture: 52,
        groundVibration: 'Low',
        peakVelocity: 0.06,
        battery: 95,
        connectivity: 'LoRaWAN 868MHz',
        rssi: -70,
        lastUpdateSecondsAgo: 7,
        status: 'ONLINE'
      },
      {
        id: 'TS-02',
        name: 'Node TS-02 (Mid-Slope Fissure)',
        lat: 27.3312,
        lng: 88.6125,
        elevation: 1640,
        soilMoisture: 68,
        groundVibration: 'Moderate',
        peakVelocity: 0.25,
        battery: 88,
        connectivity: '4G Mesh',
        rssi: -73,
        lastUpdateSecondsAgo: 11,
        status: 'ONLINE'
      },
      {
        id: 'TS-03',
        name: 'Node TS-03 (Toe Cut NH-10)',
        lat: 27.3295,
        lng: 88.6135,
        elevation: 1590,
        soilMoisture: 79,
        groundVibration: 'High',
        peakVelocity: 0.62,
        battery: 84,
        connectivity: 'LoRaWAN 868MHz',
        rssi: -82,
        lastUpdateSecondsAgo: 4,
        status: 'WARNING'
      },
      {
        id: 'TS-04',
        name: 'Node TS-04 (Culvert Channel)',
        lat: 27.3280,
        lng: 88.6150,
        elevation: 1570,
        soilMoisture: 84,
        groundVibration: 'High',
        peakVelocity: 0.58,
        battery: 81,
        connectivity: 'LoRaWAN 868MHz',
        rssi: -79,
        lastUpdateSecondsAgo: 12,
        status: 'WARNING'
      },
      {
        id: 'TS-05',
        name: 'Node TS-05 (North Drainage Head)',
        lat: 27.3345,
        lng: 88.6095,
        elevation: 1710,
        soilMoisture: 55,
        groundVibration: 'Low',
        peakVelocity: 0.04,
        battery: 97,
        connectivity: 'Satellite',
        rssi: -65,
        lastUpdateSecondsAgo: 15,
        status: 'ONLINE'
      },
      {
        id: 'TS-06',
        name: 'Node TS-06 (South Overhang)',
        lat: 27.3270,
        lng: 88.6115,
        elevation: 1610,
        soilMoisture: 63,
        groundVibration: 'Low',
        peakVelocity: 0.08,
        battery: 90,
        connectivity: 'LoRaWAN 868MHz',
        rssi: -75,
        lastUpdateSecondsAgo: 16,
        status: 'ONLINE'
      },
      {
        id: 'TS-07',
        name: 'Node TS-07 (Burtuk Flank)',
        lat: 27.3320,
        lng: 88.6155,
        elevation: 1635,
        soilMoisture: 70,
        groundVibration: 'Moderate',
        peakVelocity: 0.22,
        battery: 86,
        connectivity: 'LoRaWAN 868MHz',
        rssi: -80,
        lastUpdateSecondsAgo: 8,
        status: 'ONLINE'
      },
      {
        id: 'TS-08',
        name: 'Node TS-08 (River Toe Bank)',
        lat: 27.3265,
        lng: 88.6160,
        elevation: 1540,
        soilMoisture: 88,
        groundVibration: 'Moderate',
        peakVelocity: 0.44,
        battery: 78,
        connectivity: '4G Mesh',
        rssi: -85,
        lastUpdateSecondsAgo: 6,
        status: 'ONLINE'
      }
    ],
    infrastructures: [
      {
        id: 'inf-gtk-01',
        name: 'Sir Thutob Namgyal Memorial Hospital Post',
        type: 'hospital',
        lat: 27.3350,
        lng: 88.6180,
        description: 'Territorial emergency response base'
      },
      {
        id: 'inf-gtk-02',
        name: 'Burtuk Senior Secondary School',
        type: 'school',
        lat: 27.3335,
        lng: 88.6080,
        description: 'Designated high-ground relief shelter'
      }
    ],
    roads: [
      {
        id: 'rd-gtk-01',
        name: 'National Highway 10 Lifeline',
        code: 'NH-10',
        status: 'WATCH',
        affectedLengthKm: 4.5,
        coordinates: [
          [27.3250, 88.6170],
          [27.3285, 88.6145],
          [27.3315, 88.6125],
          [27.3350, 88.6110]
        ]
      }
    ],
    villages: [
      {
        id: 'vil-gtk-01',
        name: 'Burtuk Sub-Settlement',
        lat: 27.3325,
        lng: 88.6165,
        population: 2100,
        status: 'ADVISORY'
      }
    ]
  },
  {
    id: 'champhai-hillslope',
    name: 'Champhai Border Ridge',
    state: 'Mizoram',
    center: [23.4735, 93.3285],
    zoom: 14,
    hotspots: [
      {
        id: 'hs-chp-01',
        name: 'Zote Scarp Fault Zone',
        sector: 'Champhai Valley East',
        lat: 23.4720,
        lng: 93.3270,
        elevation: 1340,
        slopeDeg: 39.5,
        nearbyRoad: 'Zote-Champhai Border Link',
        nearbyVillage: 'Zote Settlement',
        affectedAreaRadiusKm: 1.2,
        historicalIncidents: 4,
        geology: 'Unconsolidated Siltstone & Clay Bed'
      }
    ],
    nodes: [
      {
        id: 'TS-01',
        name: 'Node TS-01 (Scarp)',
        lat: 23.4750,
        lng: 93.3260,
        elevation: 1360,
        soilMoisture: 54,
        groundVibration: 'Low',
        peakVelocity: 0.05,
        battery: 92,
        connectivity: 'LoRaWAN 868MHz',
        rssi: -71,
        lastUpdateSecondsAgo: 10,
        status: 'ONLINE'
      },
      {
        id: 'TS-02',
        name: 'Node TS-02 (Mid-Terrace)',
        lat: 23.4730,
        lng: 93.3275,
        elevation: 1335,
        soilMoisture: 69,
        groundVibration: 'Moderate',
        peakVelocity: 0.28,
        battery: 87,
        connectivity: 'LoRaWAN 868MHz',
        rssi: -75,
        lastUpdateSecondsAgo: 8,
        status: 'ONLINE'
      },
      {
        id: 'TS-03',
        name: 'Node TS-03 (Road Cut)',
        lat: 23.4710,
        lng: 93.3290,
        elevation: 1310,
        soilMoisture: 83,
        groundVibration: 'High',
        peakVelocity: 0.68,
        battery: 80,
        connectivity: '4G Mesh',
        rssi: -83,
        lastUpdateSecondsAgo: 5,
        status: 'WARNING'
      },
      {
        id: 'TS-04',
        name: 'Node TS-04 (Drainage)',
        lat: 23.4695,
        lng: 93.3305,
        elevation: 1290,
        soilMoisture: 85,
        groundVibration: 'High',
        peakVelocity: 0.59,
        battery: 83,
        connectivity: 'LoRaWAN 868MHz',
        rssi: -77,
        lastUpdateSecondsAgo: 9,
        status: 'WARNING'
      },
      {
        id: 'TS-05',
        name: 'Node TS-05 (North Spur)',
        lat: 23.4765,
        lng: 93.3245,
        elevation: 1380,
        soilMoisture: 58,
        groundVibration: 'Low',
        peakVelocity: 0.06,
        battery: 95,
        connectivity: 'Satellite',
        rssi: -66,
        lastUpdateSecondsAgo: 14,
        status: 'ONLINE'
      },
      {
        id: 'TS-06',
        name: 'Node TS-06 (South Gully)',
        lat: 23.4685,
        lng: 93.3270,
        elevation: 1315,
        soilMoisture: 66,
        groundVibration: 'Low',
        peakVelocity: 0.08,
        battery: 91,
        connectivity: 'LoRaWAN 868MHz',
        rssi: -74,
        lastUpdateSecondsAgo: 15,
        status: 'ONLINE'
      },
      {
        id: 'TS-07',
        name: 'Node TS-07 (Colluvial Deposit)',
        lat: 23.4740,
        lng: 93.3300,
        elevation: 1330,
        soilMoisture: 72,
        groundVibration: 'Moderate',
        peakVelocity: 0.26,
        battery: 85,
        connectivity: 'LoRaWAN 868MHz',
        rssi: -79,
        lastUpdateSecondsAgo: 7,
        status: 'ONLINE'
      },
      {
        id: 'TS-08',
        name: 'Node TS-08 (Toe Channel)',
        lat: 23.4680,
        lng: 93.3315,
        elevation: 1275,
        soilMoisture: 87,
        groundVibration: 'Moderate',
        peakVelocity: 0.48,
        battery: 79,
        connectivity: '4G Mesh',
        rssi: -82,
        lastUpdateSecondsAgo: 11,
        status: 'ONLINE'
      }
    ],
    infrastructures: [
      {
        id: 'inf-chp-01',
        name: 'Zote Sub-Centre Clinic',
        type: 'hospital',
        lat: 23.4715,
        lng: 93.3240,
        description: 'Rural healthcare post'
      },
      {
        id: 'inf-chp-02',
        name: 'Champhai Government College Ground',
        type: 'relief_center',
        lat: 23.4770,
        lng: 93.3320,
        description: 'Designated helipad & staging area'
      }
    ],
    roads: [
      {
        id: 'rd-chp-01',
        name: 'Zote-Champhai Border Highway',
        code: 'ZR-01',
        status: 'WATCH',
        affectedLengthKm: 2.7,
        coordinates: [
          [23.4670, 93.3320],
          [23.4705, 93.3295],
          [23.4735, 93.3275],
          [23.4775, 93.3255]
        ]
      }
    ],
    villages: [
      {
        id: 'vil-chp-01',
        name: 'Zote Settlement',
        lat: 23.4710,
        lng: 93.3250,
        population: 1150,
        status: 'ADVISORY'
      }
    ]
  },
  {
    id: 'kohima-ridge',
    name: 'Kohima Bypass (NH-29 Phesama Sector)',
    state: 'Nagaland',
    center: [25.6455, 94.1085],
    zoom: 14,
    hotspots: [
      {
        id: 'hs-khm-01',
        name: 'Phesama Slope Instability Zone',
        sector: 'Kohima South / NH-29',
        lat: 25.6440,
        lng: 94.1070,
        elevation: 1490,
        slopeDeg: 44.0,
        nearbyRoad: 'NH-29 Kohima-Dimapur Arterial',
        nearbyVillage: 'Phesama Village',
        affectedAreaRadiusKm: 1.5,
        historicalIncidents: 8,
        geology: 'Disveined Barail Group Carbonaceous Shale'
      }
    ],
    nodes: [
      {
        id: 'TS-01',
        name: 'Node TS-01 (Ridge Crest)',
        lat: 25.6470,
        lng: 94.1060,
        elevation: 1520,
        soilMoisture: 56,
        groundVibration: 'Low',
        peakVelocity: 0.07,
        battery: 93,
        connectivity: 'LoRaWAN 868MHz',
        rssi: -69,
        lastUpdateSecondsAgo: 8,
        status: 'ONLINE'
      },
      {
        id: 'TS-02',
        name: 'Node TS-02 (Mid Creep Scarp)',
        lat: 25.6450,
        lng: 94.1075,
        elevation: 1485,
        soilMoisture: 71,
        groundVibration: 'Moderate',
        peakVelocity: 0.31,
        battery: 89,
        connectivity: 'LoRaWAN 868MHz',
        rssi: -74,
        lastUpdateSecondsAgo: 10,
        status: 'ONLINE'
      },
      {
        id: 'TS-03',
        name: 'Node TS-03 (NH-29 Cutting Foot)',
        lat: 25.6430,
        lng: 94.1090,
        elevation: 1445,
        soilMoisture: 85,
        groundVibration: 'High',
        peakVelocity: 0.72,
        battery: 82,
        connectivity: '4G Mesh',
        rssi: -82,
        lastUpdateSecondsAgo: 5,
        status: 'WARNING'
      },
      {
        id: 'TS-04',
        name: 'Node TS-04 (Phesama Stream Drainage)',
        lat: 25.6415,
        lng: 94.1105,
        elevation: 1420,
        soilMoisture: 88,
        groundVibration: 'High',
        peakVelocity: 0.66,
        battery: 84,
        connectivity: 'LoRaWAN 868MHz',
        rssi: -78,
        lastUpdateSecondsAgo: 7,
        status: 'WARNING'
      },
      {
        id: 'TS-05',
        name: 'Node TS-05 (North Shoulder)',
        lat: 25.6485,
        lng: 94.1045,
        elevation: 1540,
        soilMoisture: 60,
        groundVibration: 'Low',
        peakVelocity: 0.05,
        battery: 96,
        connectivity: 'Satellite',
        rssi: -65,
        lastUpdateSecondsAgo: 16,
        status: 'ONLINE'
      },
      {
        id: 'TS-06',
        name: 'Node TS-06 (South Flank)',
        lat: 25.6405,
        lng: 94.1070,
        elevation: 1460,
        soilMoisture: 65,
        groundVibration: 'Low',
        peakVelocity: 0.09,
        battery: 89,
        connectivity: 'LoRaWAN 868MHz',
        rssi: -73,
        lastUpdateSecondsAgo: 14,
        status: 'ONLINE'
      },
      {
        id: 'TS-07',
        name: 'Node TS-07 (Terraced Colluvium)',
        lat: 25.6460,
        lng: 94.1095,
        elevation: 1475,
        soilMoisture: 74,
        groundVibration: 'Moderate',
        peakVelocity: 0.25,
        battery: 86,
        connectivity: 'LoRaWAN 868MHz',
        rssi: -80,
        lastUpdateSecondsAgo: 9,
        status: 'ONLINE'
      },
      {
        id: 'TS-08',
        name: 'Node TS-08 (Toe Culvert Basin)',
        lat: 25.6400,
        lng: 94.1115,
        elevation: 1400,
        soilMoisture: 90,
        groundVibration: 'Moderate',
        peakVelocity: 0.49,
        battery: 77,
        connectivity: '4G Mesh',
        rssi: -84,
        lastUpdateSecondsAgo: 6,
        status: 'ONLINE'
      }
    ],
    infrastructures: [
      {
        id: 'inf-khm-01',
        name: 'Phesama Primary Health Post',
        type: 'hospital',
        lat: 25.6435,
        lng: 94.1040,
        description: 'First responder station'
      },
      {
        id: 'inf-khm-02',
        name: 'St. Paul School Ground',
        type: 'school',
        lat: 25.6490,
        lng: 94.1110,
        description: 'Emergency assembly ground'
      }
    ],
    roads: [
      {
        id: 'rd-khm-01',
        name: 'National Highway 29 Arterial Corridor',
        code: 'NH-29',
        status: 'WATCH',
        affectedLengthKm: 3.8,
        coordinates: [
          [25.6390, 94.1125],
          [25.6425, 94.1095],
          [25.6455, 94.1075],
          [25.6495, 94.1050]
        ]
      }
    ],
    villages: [
      {
        id: 'vil-khm-01',
        name: 'Phesama Village Council Ward',
        lat: 25.6430,
        lng: 94.1050,
        population: 1890,
        status: 'ADVISORY'
      }
    ]
  }
];
