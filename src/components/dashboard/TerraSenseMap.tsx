import React, { useEffect, useState, useMemo } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  useMap, 
  useMapEvents,
  Circle, 
  Polyline 
} from 'react-leaflet';
import L from 'leaflet';
import { 
  Layers, 
  Crosshair, 
  MapPin, 
  AlertTriangle, 
  Maximize2, 
  Eye, 
  Activity,
  ArrowRight,
  ShieldAlert,
  Compass,
  Route,
  History,
  Flame,
  Globe2,
  CheckCircle2,
  Navigation,
  Waves
} from 'lucide-react';
import type { LandslideLocation } from '../../data/landslideLocations';
import type { PastLandslideEvent } from '../../data/landslideHistory';
import { HISTORICAL_HEATMAP_ZONES } from '../../data/landslideHistory';
import type { RouteCalculationResult } from '../../utils/routing';

interface MapFlyToProps {
  center: [number, number];
  zoom: number;
}

// Helper to smoothly fly to selected location
const MapFlyTo: React.FC<MapFlyToProps> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 1.2,
      easeLinearity: 0.25
    });
  }, [center, zoom, map]);
  return null;
};

// Map click listener for picking Start & Destination on map
interface MapClickHandlerProps {
  isPicking: boolean;
  onMapClick: (latlng: [number, number]) => void;
}

const MapClickHandler: React.FC<MapClickHandlerProps> = ({ isPicking, onMapClick }) => {
  useMapEvents({
    click(e) {
      if (isPicking) {
        onMapClick([e.latlng.lat, e.latlng.lng]);
      }
    }
  });
  return null;
};

// Create custom tactical Leaflet divIcons for the 5 live sensor markers
const createCustomMarkerIcon = (loc: LandslideLocation, isSelected: boolean) => {
  const isCritical = loc.riskLevel === 'Critical';
  const isHigh = loc.riskLevel === 'High';
  const isMedium = loc.riskLevel === 'Medium';
  
  let baseColor = '#22c55e'; // Green (Low)
  let ringColor = 'rgba(34, 197, 94, 0.4)';
  if (isCritical) {
    baseColor = '#ef4444'; // Red (Critical)
    ringColor = 'rgba(239, 68, 68, 0.6)';
  } else if (isHigh) {
    baseColor = '#f97316'; // Orange-Red (High)
    ringColor = 'rgba(249, 115, 22, 0.5)';
  } else if (isMedium) {
    baseColor = '#eab308'; // Yellow (Medium)
    ringColor = 'rgba(234, 179, 8, 0.4)';
  }

  const html = `
    <div class="relative flex items-center justify-center cursor-pointer group" style="width: 44px; height: 44px;">
      ${(isCritical || isHigh) ? `
        <div class="absolute inset-0 rounded-full animate-ping" 
             style="background-color: ${ringColor};"></div>
      ` : ''}
      <div class="relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
        isSelected ? 'scale-125 border-white shadow-[0_0_20px_' + baseColor + ']' : 'border-slate-900 shadow-md'
      }" style="background-color: ${baseColor};">
        <span class="text-[11px] font-mono font-black text-black select-none">
          ${loc.riskScore}
        </span>
      </div>
      <div class="absolute -bottom-5 px-1.5 py-0.5 rounded bg-black/90 border border-slate-700 text-[10px] font-mono font-bold text-white whitespace-nowrap shadow-lg">
        ${loc.name}
      </div>
    </div>
  `;

  return L.divIcon({
    html: html,
    className: 'custom-landslide-marker',
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    popupAnchor: [0, -22]
  });
};

// Create custom grey/black dot icon for FEATURE 3: Past Landslide History
const createPastHistoryMarkerIcon = (item: PastLandslideEvent) => {
  const isCatastrophic = item.severity === 'Catastrophic';
  const html = `
    <div class="relative flex items-center justify-center cursor-pointer group" style="width: 28px; height: 28px;" title="${item.name}">
      ${isCatastrophic ? `
        <div class="absolute inset-0 rounded-full bg-slate-500/40 animate-pulse"></div>
      ` : ''}
      <div class="relative flex items-center justify-center w-5 h-5 rounded-full bg-slate-900 border-2 border-slate-400 shadow-lg group-hover:scale-125 group-hover:border-cyan-400 transition-all">
        <div class="w-2 h-2 rounded-full ${isCatastrophic ? 'bg-red-400' : 'bg-slate-300'}"></div>
      </div>
      <div class="absolute -bottom-4 px-1 py-0.2 rounded bg-black/85 border border-slate-700 text-[8px] font-mono text-slate-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        ${item.year}
      </div>
    </div>
  `;

  return L.divIcon({
    html: html,
    className: 'custom-past-landslide-dot',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14]
  });
};

// Route Origin (A) & Destination (B) Pin Icons
const createRouteWaypointIcon = (type: 'START' | 'END', label: string) => {
  const isStart = type === 'START';
  const bg = isStart ? 'bg-cyan-500 border-cyan-200' : 'bg-red-500 border-red-200';
  const html = `
    <div class="relative flex flex-col items-center cursor-pointer" style="width: 32px; height: 36px;">
      <div class="flex items-center justify-center w-6 h-6 rounded-full border-2 text-white font-bold text-[10px] font-mono shadow-xl ${bg}">
        ${isStart ? 'A' : 'B'}
      </div>
      <div class="w-1.5 h-2 bg-white/80 rounded-b"></div>
      <div class="px-1 py-0.2 rounded bg-black/90 text-white border border-slate-700 text-[8px] font-mono whitespace-nowrap mt-0.5">
        ${label.slice(0, 10)}
      </div>
    </div>
  `;

  return L.divIcon({
    html: html,
    className: 'custom-route-waypoint',
    iconSize: [32, 36],
    iconAnchor: [16, 28],
    popupAnchor: [0, -28]
  });
};

interface TerraSenseMapProps {
  locations: LandslideLocation[];
  selectedLocation: LandslideLocation;
  onSelectLocation: (loc: LandslideLocation) => void;
  // Feature 1: Safe Route Finder Props
  routeResult?: RouteCalculationResult | null;
  isSafeRouteActive?: boolean;
  onToggleSafeRoute?: () => void;
  routeWaypoints?: {
    start?: { coords: [number, number]; name: string };
    end?: { coords: [number, number]; name: string };
  };
  isMapPickingMode?: boolean;
  onMapClickCoord?: (coord: [number, number]) => void;
  // Feature 3: Past History Layer Props
  pastLandslides?: PastLandslideEvent[];
  isHistoryLayerVisible?: boolean;
  onToggleHistoryLayer?: () => void;
  isHeatmapVisible?: boolean;
  selectedYear?: number | 'ALL';
  seniorMode?: boolean;
}

export const TerraSenseMap: React.FC<TerraSenseMapProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
  routeResult,
  isSafeRouteActive = false,
  onToggleSafeRoute,
  routeWaypoints,
  isMapPickingMode = false,
  onMapClickCoord,
  pastLandslides = [],
  isHistoryLayerVisible = false,
  onToggleHistoryLayer,
  isHeatmapVisible = false,
  selectedYear = 'ALL',
  seniorMode = false
}) => {
  const [mapType, setMapType] = useState<'tactical' | 'satellite'>('tactical');
  const [mapZoom, setMapZoom] = useState<number>(7.5);
  const [targetCoords, setTargetCoords] = useState<[number, number]>([26.5, 92.5]); // North East India center

  const nerCenter: [number, number] = [26.5, 92.5];
  const indiaCenter: [number, number] = [22.5, 82.5];

  // When selected location changes, smoothly shift target
  useEffect(() => {
    if (selectedLocation) {
      setTargetCoords([selectedLocation.lat, selectedLocation.lng]);
      setMapZoom(9);
    }
  }, [selectedLocation]);

  // Adjust zoom/view when route is calculated to fit path
  useEffect(() => {
    if (routeResult?.safeRoute?.coordinates?.length) {
      const midIdx = Math.floor(routeResult.safeRoute.coordinates.length / 2);
      setTargetCoords(routeResult.safeRoute.coordinates[midIdx]);
      setMapZoom(8);
    }
  }, [routeResult]);

  const handleResetToNER = () => {
    setTargetCoords(nerCenter);
    setMapZoom(7);
  };

  const handleViewAllIndia = () => {
    setTargetCoords(indiaCenter);
    setMapZoom(5);
  };

  const tileLayerUrl = mapType === 'tactical'
    ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

  const tileLayerAttr = mapType === 'tactical'
    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    : '&copy; Esri & ISRO Satellite GIS';

  // Filter historical landslides based on selected timeline year
  const filteredPastLandslides = useMemo(() => {
    if (!isHistoryLayerVisible) return [];
    return pastLandslides.filter(item => {
      if (selectedYear === 'ALL') return true;
      return item.year <= selectedYear;
    });
  }, [pastLandslides, isHistoryLayerVisible, selectedYear]);

  return (
    <div className="relative w-full h-full min-h-[520px] lg:min-h-[660px] rounded-2xl overflow-hidden border border-[#1e2e50] bg-[#050811] shadow-2xl flex flex-col">
      {/* Top Map HUD Bar with Layer & Feature Controls */}
      <div className="absolute top-3 left-3 z-[1000] flex flex-wrap items-center gap-2">
        {/* Status Pill */}
        <div className="bg-[#0b1329]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#22355c] shadow-lg flex items-center space-x-2 text-xs font-mono">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="text-slate-300 font-semibold">NER GRID:</span>
          <span className="text-cyan-400 font-bold">5 ACTIVE SENSORS</span>
        </div>

        {/* Feature 1: Safe Route Button */}
        {onToggleSafeRoute && (
          <button
            onClick={onToggleSafeRoute}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all border flex items-center space-x-1.5 shadow-lg ${
              isSafeRouteActive
                ? 'bg-emerald-600 text-white border-emerald-400 ring-2 ring-emerald-500/40'
                : 'bg-[#0b1329]/90 text-emerald-400 border-emerald-600/50 hover:bg-[#122240]'
            }`}
            title="Calculate safe navigation route avoiding landslide zones"
          >
            <Route className="w-3.5 h-3.5" />
            <span>{isSafeRouteActive ? 'SAFE ROUTE ACTIVE' : 'FIND SAFE ROUTE'}</span>
          </button>
        )}

        {/* Feature 3: Past History Layer Button */}
        {onToggleHistoryLayer && (
          <button
            onClick={onToggleHistoryLayer}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all border flex items-center space-x-1.5 shadow-lg ${
              isHistoryLayerVisible
                ? 'bg-slate-700 text-cyan-300 border-cyan-400 ring-2 ring-cyan-500/40'
                : 'bg-[#0b1329]/90 text-slate-300 border-[#22355c] hover:bg-[#122240] hover:text-white'
            }`}
            title="Toggle India Past Landslide History Layer"
          >
            <History className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isHistoryLayerVisible ? 'PAST HISTORY ON' : 'PAST HISTORY'}</span>
          </button>
        )}

        {/* Tactical vs Satellite Layer Switch */}
        <div className="bg-[#0b1329]/90 backdrop-blur-md p-0.5 rounded-xl border border-[#22355c] shadow-lg flex items-center">
          <button
            onClick={() => setMapType('tactical')}
            className={`px-2.5 py-1 text-xs font-mono font-medium rounded-lg transition-all ${
              mapType === 'tactical' 
                ? 'bg-cyan-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Tactical
          </button>
          <button
            onClick={() => setMapType('satellite')}
            className={`px-2.5 py-1 text-xs font-mono font-medium rounded-lg transition-all ${
              mapType === 'satellite' 
                ? 'bg-cyan-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Satellite
          </button>
        </div>

        {/* View Switchers: Reset to NER & India Overview */}
        <div className="flex items-center space-x-1">
          <button
            onClick={handleResetToNER}
            className="bg-[#0b1329]/90 hover:bg-[#152345] backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-[#22355c] text-xs font-mono text-slate-300 hover:text-white shadow-lg flex items-center space-x-1 transition-all"
            title="Reset view to North East India Center [26.5, 92.5]"
          >
            <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden xl:inline">NER Focus</span>
          </button>

          <button
            onClick={handleViewAllIndia}
            className="bg-[#0b1329]/90 hover:bg-[#152345] backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-[#22355c] text-xs font-mono text-slate-300 hover:text-white shadow-lg flex items-center space-x-1 transition-all"
            title="Pan view to all India for national landslide history"
          >
            <Globe2 className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden xl:inline">All India</span>
          </button>
        </div>
      </div>

      {/* Map Picking HUD Prompt (When user chooses to pick points on map) */}
      {isMapPickingMode && (
        <div className="absolute top-16 left-3 right-3 sm:right-auto z-[1000] bg-amber-500 text-black px-4 py-2 rounded-xl shadow-2xl font-mono text-xs font-black flex items-center space-x-2 animate-bounce">
          <Navigation className="w-4 h-4 fill-current" />
          <span>MAP PICKING ACTIVE: Click any point on map to set route destination!</span>
        </div>
      )}

      {/* Flood Inundation Prediction Banner Overlay */}
      <div className="absolute top-14 sm:top-3 left-1/2 -translate-x-1/2 z-[1000] bg-[#070d1d]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-cyan-500/50 shadow-2xl flex items-center space-x-2 text-[11px] font-mono text-cyan-300 text-center pointer-events-none max-w-[90%] sm:max-w-none">
        <Waves className="w-4 h-4 text-cyan-400 shrink-0 animate-pulse" />
        <span className="font-bold tracking-tight">
          Inundation Prediction based on Rainfall + River Discharge + Drainage Data
        </span>
      </div>

      {/* Map Legend (Bottom Left HUD) - Flood Inundation Prediction Zones */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-[#070d1d]/95 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-cyan-500/40 text-[10px] sm:text-[11px] font-mono shadow-2xl max-w-[290px]">
        <div className="font-bold text-white mb-1 flex items-center space-x-1.5">
          <Waves className="w-3.5 h-3.5 text-cyan-400" />
          <span>Flood Inundation Prediction Zones</span>
        </div>
        <div className="text-[9px] text-cyan-300/90 bg-[#09152b] px-2 py-1 rounded border border-[#1d3257] mb-2 leading-tight">
          Inundation Prediction based on Rainfall + River Discharge + Drainage Data
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] border border-white/50 shrink-0"></span>
            <span className="text-emerald-300 font-bold">Safe (Green)</span>
            <span className="text-slate-400 text-[9.5px]">Valley Crest &bull; Freeflow</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400 shadow-[0_0_8px_#facc15] border border-white/50 shrink-0"></span>
            <span className="text-yellow-300 font-bold">Watch (Yellow - 2.5m)</span>
            <span className="text-slate-400 text-[9.5px]">River Gauge Alert</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] border border-white/50 shrink-0 animate-ping"></span>
            <span className="text-red-400 font-bold">Evacuate (Red - 3.5m+)</span>
            <span className="text-red-300 text-[9.5px] font-bold">Overflow Risk</span>
          </div>
          {/* Safe Route line legend */}
          {routeResult && (
            <>
              <div className="flex items-center space-x-2 pt-1 border-t border-[#1a2948]">
                <span className="w-4 h-1 bg-emerald-400 rounded-full inline-block shadow-[0_0_6px_#10b981]"></span>
                <span className="text-emerald-400 font-bold">Safe Evacuation Route</span>
              </div>
              {routeResult.dangerousRoute && (
                <div className="flex items-center space-x-2">
                  <span className="w-4 h-1 bg-red-500 rounded-full inline-block shadow-[0_0_6px_#ef4444]"></span>
                  <span className="text-red-400 font-bold">Submerged Corridor</span>
                </div>
              )}
            </>
          )}
          {/* Past History legend */}
          {isHistoryLayerVisible && (
            <div className="flex items-center space-x-2 pt-1 border-t border-[#1a2948]">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-900 border border-slate-400 inline-block"></span>
              <span className="text-slate-300 font-bold">Past Inundations (Grey)</span>
            </div>
          )}
        </div>
      </div>

      {/* Target Focus Coordinates HUD (Top Right) */}
      <div className="absolute top-3 right-3 z-[1000] bg-[#070d1d]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#1e2e50] text-[11px] font-mono shadow-2xl text-right hidden sm:block">
        <div className="text-slate-400 text-[10px] font-semibold">ACTIVE FOCUS</div>
        <div className="text-cyan-400 font-bold">
          {selectedLocation.name} ({selectedLocation.lat.toFixed(2)}°N, {selectedLocation.lng.toFixed(2)}°E)
        </div>
      </div>

      {/* The Leaflet Map Container */}
      <MapContainer
        center={nerCenter}
        zoom={mapZoom}
        scrollWheelZoom={true}
        className="w-full h-full flex-1 z-10"
        style={{ minHeight: '100%', background: '#050811' }}
      >
        <MapFlyTo center={targetCoords} zoom={mapZoom} />

        {/* Map click listener */}
        {onMapClickCoord && (
          <MapClickHandler 
            isPicking={isMapPickingMode} 
            onMapClick={onMapClickCoord} 
          />
        )}

        <TileLayer
          attribution={tileLayerAttr}
          url={tileLayerUrl}
          maxZoom={18}
        />

        {/* FLOOD INUNDATION PREDICTION ZONES (Safe Green, Watch Yellow - 2.5m, Evacuate Red - 3.5m+) */}
        {/* 1. Safe Zone (Green) */}
        <Circle
          center={[selectedLocation.lat + 0.04, selectedLocation.lng - 0.03]}
          radius={18000}
          pathOptions={{
            color: '#10b981',
            fillColor: '#10b981',
            fillOpacity: 0.14,
            weight: 2,
            dashArray: '4, 4'
          }}
        >
          <Popup>
            <div className="bg-[#0b1426] text-white p-2.5 rounded-xl border border-emerald-500 text-xs font-mono">
              <div className="font-bold text-emerald-400 flex items-center space-x-1">
                <span>SAFE ZONE (GREEN)</span>
              </div>
              <p className="text-slate-200 mt-1">Water level &lt;1.5m. Highland drainage corridor safe from flash flooding.</p>
            </div>
          </Popup>
        </Circle>

        {/* 2. Watch Zone (Yellow - 2.5m) */}
        <Circle
          center={[selectedLocation.lat + 0.015, selectedLocation.lng + 0.01]}
          radius={11000}
          pathOptions={{
            color: '#facc15',
            fillColor: '#facc15',
            fillOpacity: 0.22,
            weight: 2.5,
            dashArray: '6, 6'
          }}
        >
          <Popup>
            <div className="bg-[#0b1426] text-white p-2.5 rounded-xl border border-yellow-400 text-xs font-mono">
              <div className="font-bold text-yellow-300 flex items-center space-x-1">
                <span>WATCH ZONE (YELLOW - 2.5m)</span>
              </div>
              <p className="text-slate-200 mt-1">River Gauge reached 2.5m. Secondary runoff accelerating. Advisory standby.</p>
            </div>
          </Popup>
        </Circle>

        {/* 3. Evacuate Zone (Red - 3.5m+) */}
        <Circle
          center={[selectedLocation.lat, selectedLocation.lng]}
          radius={6500}
          pathOptions={{
            color: '#ef4444',
            fillColor: '#ef4444',
            fillOpacity: 0.38,
            weight: 3.5
          }}
        >
          <Popup>
            <div className="bg-[#0b1426] text-white p-2.5 rounded-xl border border-red-500 text-xs font-mono">
              <div className="font-bold text-red-400 flex items-center space-x-1">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span>EVACUATE ZONE (RED - 3.5m+)</span>
              </div>
              <p className="text-slate-200 mt-1">River Gauge at 3.2m approaching critical 3.5m threshold! Overflow & inundation imminent.</p>
            </div>
          </Popup>
        </Circle>

        {/* Heatmap Clusters for High-Risk Historical Zones (Feature 3) */}
        {isHeatmapVisible && HISTORICAL_HEATMAP_ZONES.map((heat, idx) => (
          <React.Fragment key={`heat-${idx}`}>
            {/* Outer soft glow ring */}
            <Circle
              center={[heat.lat, heat.lng]}
              radius={heat.radiusKm * 1000}
              pathOptions={{
                color: heat.color,
                fillColor: heat.color,
                fillOpacity: 0.16 * heat.intensity,
                weight: 0,
              }}
            />
            {/* Middle core ring */}
            <Circle
              center={[heat.lat, heat.lng]}
              radius={heat.radiusKm * 600}
              pathOptions={{
                color: heat.color,
                fillColor: heat.color,
                fillOpacity: 0.28 * heat.intensity,
                weight: 1,
                dashArray: '4, 4'
              }}
            />
            {/* Inner dense epicenter */}
            <Circle
              center={[heat.lat, heat.lng]}
              radius={heat.radiusKm * 250}
              pathOptions={{
                color: heat.color,
                fillColor: heat.color,
                fillOpacity: 0.45 * heat.intensity,
                weight: 1.5,
              }}
            />
          </React.Fragment>
        ))}

        {/* Hazard influence radii around critical/high hotspots (Live Sensors) */}
        {locations.map((loc) => {
          if (loc.riskLevel === 'Critical' || loc.riskLevel === 'High') {
            return (
              <Circle
                key={`circle-${loc.id}`}
                center={[loc.lat, loc.lng]}
                radius={loc.riskLevel === 'Critical' ? 15000 : 9500}
                pathOptions={{
                  color: loc.color,
                  fillColor: loc.color,
                  fillOpacity: 0.15,
                  weight: 2,
                  dashArray: '5, 6'
                }}
              />
            );
          }
          return null;
        })}

        {/* FEATURE 1: ROUTING POLYLINES */}
        {/* 1. Dangerous Direct Route in RED (With hazard dash and alert popup) */}
        {routeResult?.dangerousRoute && (
          <Polyline
            positions={routeResult.dangerousRoute.coordinates}
            pathOptions={{
              color: '#ef4444', // Red
              weight: 4,
              opacity: 0.85,
              dashArray: '8, 8',
              lineCap: 'round',
              lineJoin: 'round'
            }}
          >
            <Popup>
              <div className="bg-[#0b1426] text-white p-2.5 rounded-xl border border-red-500/80 text-xs font-mono">
                <div className="flex items-center space-x-1.5 font-bold text-red-400 mb-1">
                  <AlertTriangle className="w-4 h-4" />
                  <span>DANGEROUS ROUTE</span>
                </div>
                <p className="text-slate-200">
                  {routeResult.dangerousRoute.warningText}
                </p>
                <div className="text-[10px] text-red-300 mt-1 font-bold">
                  Distance: {routeResult.dangerousRoute.distanceKm} km
                </div>
              </div>
            </Popup>
          </Polyline>
        )}

        {/* 2. Safe Route in GREEN (Glow outer line + solid core line) */}
        {routeResult?.safeRoute && (
          <>
            {/* Green Glow Underlay */}
            <Polyline
              positions={routeResult.safeRoute.coordinates}
              pathOptions={{
                color: '#22c55e',
                weight: 9,
                opacity: 0.35,
                lineCap: 'round',
                lineJoin: 'round'
              }}
            />
            {/* Green Core Line */}
            <Polyline
              positions={routeResult.safeRoute.coordinates}
              pathOptions={{
                color: '#10b981',
                weight: 5,
                opacity: 0.95,
                lineCap: 'round',
                lineJoin: 'round'
              }}
            >
              <Popup>
                <div className="bg-[#0b1426] text-white p-2.5 rounded-xl border border-emerald-500 text-xs font-mono">
                  <div className="flex items-center space-x-1.5 font-bold text-emerald-400 mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>SAFE ROUTE</span>
                  </div>
                  <p className="text-slate-200">
                    {routeResult.safeRoute.summary}
                  </p>
                  <div className="text-[10px] text-emerald-300 mt-1 font-bold">
                    Distance: {routeResult.safeRoute.distanceKm} km &bull; Time: ~{routeResult.safeRoute.durationMin} min
                  </div>
                </div>
              </Popup>
            </Polyline>
          </>
        )}

        {/* Start & End Waypoint Pins */}
        {routeWaypoints?.start && (
          <Marker
            position={routeWaypoints.start.coords}
            icon={createRouteWaypointIcon('START', routeWaypoints.start.name)}
          >
            <Popup>
              <div className="bg-[#0b1426] text-white p-2 rounded text-xs font-mono">
                <span className="text-cyan-400 font-bold block">ORIGIN (START)</span>
                <span>{routeWaypoints.start.name}</span>
              </div>
            </Popup>
          </Marker>
        )}

        {routeWaypoints?.end && (
          <Marker
            position={routeWaypoints.end.coords}
            icon={createRouteWaypointIcon('END', routeWaypoints.end.name)}
          >
            <Popup>
              <div className="bg-[#0b1426] text-white p-2 rounded text-xs font-mono">
                <span className="text-red-400 font-bold block">DESTINATION (END)</span>
                <span>{routeWaypoints.end.name}</span>
              </div>
            </Popup>
          </Marker>
        )}

        {/* FEATURE 3: Past Landslide History Layer (Grey/Black dots) */}
        {filteredPastLandslides.map((item) => (
          <Marker
            key={`history-${item.id}`}
            position={[item.lat, item.lng]}
            icon={createPastHistoryMarkerIcon(item)}
          >
            {/* Requirement: When clicked, show a popup: "Here landslide happened on [Date], [X] people affected" */}
            <Popup className="custom-tactical-popup">
              <div className="bg-[#070d1a] text-white p-3 rounded-xl border border-slate-600 min-w-[220px] max-w-[280px]">
                <div className="flex items-center justify-between pb-1 mb-2 border-b border-slate-800">
                  <span className="font-bold text-xs text-cyan-300 flex items-center space-x-1">
                    <History className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{item.name}</span>
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {item.year}
                  </span>
                </div>

                {/* EXACT REQUIRED TEXT */}
                <div className="p-2 rounded-lg bg-[#0d1629] border border-[#1f2d4e] mb-2">
                  <p className="text-xs font-bold text-white leading-snug">
                    Here landslide happened on <span className="text-amber-300">{item.date}</span>, <span className="text-red-400 font-black">{item.peopleAffected}</span> people affected.
                  </p>
                </div>

                <div className="space-y-1 text-[11px] font-mono text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="text-white text-right font-medium">{item.locationName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">State:</span>
                    <span className="text-slate-200">{item.state}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Severity:</span>
                    <span className={`font-bold ${
                      item.severity === 'Catastrophic' ? 'text-red-400' : 'text-orange-400'
                    }`}>
                      {item.severity}
                    </span>
                  </div>
                </div>

                <p className="mt-2 text-[10px] text-slate-400 border-t border-slate-800 pt-1.5 leading-relaxed font-sans">
                  {item.cause}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* The 5 Live Markers: Tawang, Cherapunji, Gangtok, Aizawl, Kohima */}
        {locations.map((loc) => {
          const isSelected = loc.id === selectedLocation.id;
          const markerIcon = createCustomMarkerIcon(loc, isSelected);

          return (
            <Marker
              key={loc.id}
              position={[loc.lat, loc.lng]}
              icon={markerIcon}
              eventHandlers={{
                click: () => {
                  onSelectLocation(loc);
                }
              }}
            >
              <Popup className="custom-tactical-popup">
                <div className="bg-[#0b1426] text-white p-3 rounded-xl border border-[#233860] min-w-[210px]">
                  <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-[#1f2d48]">
                    <span className="font-bold text-sm text-white flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{loc.name}</span>
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${loc.badgeClass}`}>
                      {loc.riskLevel} ({loc.riskScore}%)
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-slate-300 font-mono mb-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">State:</span>
                      <span className="text-slate-200 font-medium">{loc.state}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Rainfall:</span>
                      <span className="text-cyan-300 font-bold">{loc.factors.rainfall}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Soil Moisture:</span>
                      <span className="text-cyan-300 font-bold">{loc.factors.soilMoisture}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Slope:</span>
                      <span className="text-amber-300 font-bold">{loc.factors.slope}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectLocation(loc)}
                    className="w-full py-1.5 px-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg text-xs font-bold font-mono flex items-center justify-center space-x-1 transition-all"
                  >
                    <span>SELECT TELEMETRY</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
