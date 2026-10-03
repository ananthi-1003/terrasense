import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Layers, 
  MapPin, 
  Maximize2, 
  Minimize2,
  Radio, 
  Route, 
  Home, 
  Building2, 
  Compass, 
  Waves,
  Eye,
  Sparkles,
  Crosshair,
  Satellite,
  ShieldAlert
} from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';
import type { Hotspot } from '../../types';

export const InteractiveRiskMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);

  const { 
    activeRegion, 
    activeHotspot, 
    setActiveHotspot, 
    setSelectedHotspotForModal, 
    activeNodes, 
    telemetry,
    roadClosureActive 
  } = useSimulation();

  const [mapStyle, setMapStyle] = useState<'dark' | 'satellite'>('dark');
  const [showNodes, setShowNodes] = useState<boolean>(true);
  const [showZones, setShowZones] = useState<boolean>(true);
  const [showInfrastructure, setShowInfrastructure] = useState<boolean>(true);
  const [showRadarSweep, setShowRadarSweep] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [cursorCoords, setCursorCoords] = useState<{ lat: string; lng: string }>({
    lat: activeRegion.center[0].toFixed(4),
    lng: activeRegion.center[1].toFixed(4)
  });

  // Initialize map once
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: activeRegion.center,
      zoom: activeRegion.zoom,
      zoomControl: false,
      attributionControl: false
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Default OpenStreetMap free tile layer
    const tileLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    );
    tileLayer.addTo(map);

    const layerGroup = L.layerGroup().addTo(map);

    // Track mouse coordinate readout
    map.on('mousemove', (e) => {
      setCursorCoords({
        lat: e.latlng.lat.toFixed(4),
        lng: e.latlng.lng.toFixed(4)
      });
    });

    mapInstanceRef.current = map;
    layerGroupRef.current = layerGroup;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      layerGroupRef.current = null;
    };
  }, [activeRegion.center, activeRegion.zoom]);

  // Update basemap style
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    const url = mapStyle === 'dark'
      ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

    L.tileLayer(url, { 
      maxZoom: 18, 
      attribution: mapStyle === 'dark' 
        ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        : '&copy; Esri & ISRO Satellite GIS'
    }).addTo(map);

    if (layerGroupRef.current) {
      layerGroupRef.current.eachLayer((layer: any) => {
        if (typeof layer.bringToFront === 'function') {
          layer.bringToFront();
        }
      });
    }
  }, [mapStyle]);

  // Update center when region changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.flyTo(activeRegion.center, activeRegion.zoom, { duration: 1.2 });
  }, [activeRegion]);

  // Re-invalidate map size when toggling fullscreen
  useEffect(() => {
    setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 200);
  }, [isFullscreen]);

  // Draw Geo-Layers (Zones, Nodes, Roads, Buildings, Drainage)
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    const [centerLat, centerLng] = activeRegion.center;

    // 1. FLOOD INUNDATION PREDICTION ZONES
    if (showZones) {
      // Safe (Green) Inundation Zone
      const greenPolygon = L.polygon([
        [centerLat + 0.009, centerLng - 0.012],
        [centerLat + 0.012, centerLng + 0.008],
        [centerLat + 0.002, centerLng + 0.016],
        [centerLat - 0.009, centerLng + 0.006],
        [centerLat - 0.008, centerLng - 0.010]
      ], {
        color: '#10b981',
        fillColor: '#10b981',
        fillOpacity: 0.16,
        weight: 1.5,
        dashArray: '4, 4'
      }).bindTooltip('Safe (Green) Zone: High-Ground Drainage Corridor (<1.5m level)', { permanent: false });
      layerGroup.addLayer(greenPolygon);

      // Watch (Yellow - 2.5m) Inundation Zone
      const yellowPolygon = L.polygon([
        [centerLat + 0.006, centerLng - 0.007],
        [centerLat + 0.007, centerLng + 0.005],
        [centerLat - 0.001, centerLng + 0.009],
        [centerLat - 0.006, centerLng + 0.002],
        [centerLat - 0.004, centerLng - 0.006]
      ], {
        color: '#facc15',
        fillColor: '#facc15',
        fillOpacity: 0.24,
        weight: 2
      }).bindTooltip('Watch (Yellow - 2.5m) Zone: River Gauge Alert & Subsurface Runoff Standby', { permanent: false });
      layerGroup.addLayer(yellowPolygon);

      // Evacuate (Red - 3.5m+) Flash Flood Zone
      const hotspotFillOpacity = telemetry.riskScore >= 75 ? 0.52 : 0.32;
      const redPolygon = L.polygon([
        [activeHotspot.lat + 0.0022, activeHotspot.lng - 0.0024],
        [activeHotspot.lat + 0.0024, activeHotspot.lng + 0.0020],
        [activeHotspot.lat - 0.0018, activeHotspot.lng + 0.0028],
        [activeHotspot.lat - 0.0025, activeHotspot.lng - 0.0018]
      ], {
        color: '#ef4444',
        fillColor: '#ef4444',
        fillOpacity: hotspotFillOpacity,
        weight: 3.5,
        dashArray: '4, 4'
      }).bindTooltip(`Evacuate (Red - 3.5m+) Zone: Immediate River Overflow & Flood Inundation at ${activeHotspot.name}`, { permanent: false });

      redPolygon.on('click', () => {
        setSelectedHotspotForModal(activeHotspot);
      });
      layerGroup.addLayer(redPolygon);
    }

    // 2. DRAINAGE / STREAM RUNOFF VECTORS
    const streamCoords: [number, number][] = [
      [centerLat + 0.010, centerLng - 0.002],
      [centerLat + 0.006, centerLng + 0.001],
      [centerLat + 0.001, centerLng + 0.003],
      [centerLat - 0.004, centerLng + 0.006],
      [centerLat - 0.008, centerLng + 0.008]
    ];
    const streamPolyline = L.polyline(streamCoords, {
      color: '#38bdf8',
      weight: 3,
      opacity: 0.85,
      dashArray: '6, 8'
    }).bindTooltip('Perennial Hillside Drainage Stream & Surface Runoff Channel', { permanent: false });
    layerGroup.addLayer(streamPolyline);

    // 3. ROADS & TRAFFIC VECTORS
    activeRegion.roads.forEach(road => {
      const isRoadRestricted = roadClosureActive && road.id.includes('01');
      const roadLine = L.polyline(road.coordinates, {
        color: isRoadRestricted ? '#ef4444' : '#f8fafc',
        weight: isRoadRestricted ? 6 : 4,
        opacity: isRoadRestricted ? 0.95 : 0.85,
        dashArray: isRoadRestricted ? '8, 8' : undefined
      });

      const roadTooltip = `
        <div class="p-2 text-xs font-sans">
          <strong class="text-white text-sm">${road.name}</strong><br/>
          Corridor Status: <span class="${isRoadRestricted ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}">
            ${isRoadRestricted ? '⛔ CLOSED & TRAFFIC DIVERTED' : 'CLEAR (OPEN)'}
          </span><br/>
          Affected Envelope: <span class="text-cyan-300 font-mono">${road.affectedLengthKm} km</span>
        </div>
      `;
      roadLine.bindTooltip(roadTooltip, { permanent: false });
      layerGroup.addLayer(roadLine);
    });

    // 4. INFRASTRUCTURE & SETTLEMENTS
    if (showInfrastructure) {
      // Villages
      activeRegion.villages.forEach(v => {
        const villageIcon = L.divIcon({
          className: 'custom-village-icon',
          html: `
            <div class="flex items-center space-x-1.5 bg-[#0a1326]/95 text-cyan-200 border border-cyan-500/60 rounded-md px-2 py-0.5 shadow-lg text-[10px] whitespace-nowrap cursor-pointer hover:border-cyan-300 transition-all">
              <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span class="font-bold">${v.name}</span>
            </div>
          `,
          iconSize: [120, 22],
          iconAnchor: [60, 11]
        });

        const marker = L.marker([v.lat, v.lng], { icon: villageIcon });
        marker.bindPopup(`
          <div class="p-2.5 text-xs font-sans">
            <h4 class="font-bold text-white text-sm">${v.name} Settlement</h4>
            <p class="text-slate-300 mt-1">Population Exposure: <strong class="text-white">${v.population}</strong> residents</p>
            <p class="text-slate-300 mt-0.5">Civil Protection Status: <strong class="${telemetry.riskScore >= 75 ? 'text-red-400 font-bold' : 'text-emerald-400'}">${telemetry.riskScore >= 75 ? 'STANDBY FOR EVACUATION' : 'NORMAL SURVEILLANCE'}</strong></p>
          </div>
        `);
        layerGroup.addLayer(marker);
      });

      // Buildings
      activeRegion.infrastructures.forEach(inf => {
        const iconColor = inf.type === 'hospital' ? '#ef4444' : inf.type === 'school' ? '#f59e0b' : '#10b981';
        const buildingIcon = L.divIcon({
          className: 'custom-inf-icon',
          html: `
            <div class="w-7 h-7 rounded-lg bg-[#0a1326] border-2 flex items-center justify-center shadow-lg" style="border-color: ${iconColor}">
              <div class="w-3 h-3 rounded-full" style="background: ${iconColor}"></div>
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        const marker = L.marker([inf.lat, inf.lng], { icon: buildingIcon });
        marker.bindPopup(`
          <div class="p-2.5 text-xs font-sans">
            <h4 class="font-bold text-white text-sm">${inf.name}</h4>
            <p class="text-slate-400 capitalize mt-1">Classification: <span class="text-slate-200 font-semibold">${inf.type.replace('_', ' ')}</span></p>
            <p class="text-slate-300 text-[11px] mt-0.5">${inf.description}</p>
          </div>
        `);
        layerGroup.addLayer(marker);
      });
    }

    // 5. CRITICAL HOTSPOT BEACON (Interactive Clickable Target)
    const hotspotIcon = L.divIcon({
      className: 'custom-hotspot-beacon',
      html: `
        <div class="relative flex items-center justify-center cursor-pointer group">
          <div class="absolute w-12 h-12 rounded-full bg-red-600/30 pulsing-hazard-marker"></div>
          <div class="relative w-6 h-6 rounded-full bg-red-600 border-2 border-white flex items-center justify-center shadow-glow-red">
            <div class="w-2 h-2 rounded-full bg-white"></div>
          </div>
          <div class="absolute top-7 whitespace-nowrap bg-red-950/95 border border-red-500 text-red-100 text-[10px] font-bold px-2 py-0.5 rounded shadow-lg">
            ${activeHotspot.name} (${telemetry.riskScore}/100)
          </div>
        </div>
      `,
      iconSize: [48, 48],
      iconAnchor: [24, 24]
    });

    const hotspotMarker = L.marker([activeHotspot.lat, activeHotspot.lng], { icon: hotspotIcon });
    hotspotMarker.on('click', () => {
      setSelectedHotspotForModal(activeHotspot);
    });
    hotspotMarker.bindTooltip('Click to open Detailed AI Hotspot Diagnostic Panel', { permanent: false });
    layerGroup.addLayer(hotspotMarker);

    // 6. SENSOR NODES (TS-01 to TS-08, + TS-09)
    if (showNodes) {
      activeNodes.forEach(node => {
        const isWarning = node.status === 'WARNING';
        const isCritical = node.status === 'CRITICAL';
        const isExtra = node.isPortableAdditional;

        const ringColor = isCritical ? 'border-red-500 bg-red-950 text-red-400' : isWarning ? 'border-amber-500 bg-amber-950 text-amber-400' : isExtra ? 'border-cyan-400 bg-cyan-950 text-cyan-300' : 'border-emerald-500 bg-emerald-950 text-emerald-400';
        const dotColor = isCritical ? 'bg-red-400' : isWarning ? 'bg-amber-400' : isExtra ? 'bg-cyan-300' : 'bg-emerald-400';

        const nodeIcon = L.divIcon({
          className: 'custom-sensor-node',
          html: `
            <div class="relative flex items-center justify-center cursor-pointer group">
              ${(isWarning || isCritical) ? `<div class="absolute w-8 h-8 rounded-full node-radar-ping ${isCritical ? 'bg-red-500/50' : 'bg-amber-500/40'}"></div>` : ''}
              <div class="relative w-5 h-5 rounded-full border-2 ${ringColor} flex items-center justify-center shadow-md">
                <div class="w-2 h-2 rounded-full ${dotColor}"></div>
              </div>
              <div class="absolute -top-4 whitespace-nowrap bg-[#081021]/90 border border-slate-700 text-slate-200 text-[9px] font-mono px-1 rounded shadow">
                ${node.id}
              </div>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const nodeMarker = L.marker([node.lat, node.lng], { icon: nodeIcon });
        nodeMarker.bindPopup(`
          <div class="p-3 text-xs font-sans">
            <div class="flex items-center justify-between border-b border-[#21355e] pb-1.5 mb-1.5">
              <strong class="text-white text-sm">${node.id} — ${node.name}</strong>
              <span class="text-[10px] px-2 py-0.5 rounded font-bold uppercase font-mono ${
                isCritical ? 'bg-red-950 text-red-300 border border-red-700' : isWarning ? 'bg-amber-950 text-amber-300 border border-amber-700' : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
              }">${node.status}</span>
            </div>
            <div class="space-y-1 text-slate-300 text-[11px]">
              <div class="flex justify-between"><span>Soil Moisture:</span> <strong class="text-cyan-300 font-mono">${node.soilMoisture}%</strong></div>
              <div class="flex justify-between"><span>Vibration FFT:</span> <strong class="text-white">${node.groundVibration} (${node.peakVelocity} mm/s)</strong></div>
              <div class="flex justify-between"><span>Battery Level:</span> <strong class="text-emerald-400 font-mono">${node.battery}%</strong></div>
              <div class="flex justify-between"><span>Mesh Link RSSI:</span> <strong class="text-slate-200 font-mono">${node.rssi} dBm (${node.connectivity})</strong></div>
              <div class="text-[10px] text-slate-400 pt-1.5 border-t border-[#1e2f52] flex justify-between">
                <span>Elevation: ${node.elevation}m MSL</span>
                <span>${node.lastUpdateSecondsAgo}s ago</span>
              </div>
            </div>
          </div>
        `);
        layerGroup.addLayer(nodeMarker);
      });
    }

  }, [
    activeRegion, 
    activeHotspot, 
    activeNodes, 
    showNodes, 
    showZones, 
    showInfrastructure, 
    telemetry, 
    roadClosureActive, 
    setSelectedHotspotForModal
  ]);

  return (
    <div className={`tactical-card rounded-2xl overflow-hidden shadow-tactical flex flex-col transition-all duration-300 ${
      isFullscreen ? 'fixed inset-2 z-50 rounded-2xl' : 'relative w-full'
    }`}>
      {/* Map Tactical Toolbar */}
      <div className="px-3 sm:px-5 py-3 border-b border-[#1c2c4f] bg-[#091122] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-800/50 text-cyan-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span>Geospatial Risk & Tactical Sensor Mesh Map</span>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-700/50">
                {activeRegion.name}
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Sector: <strong className="text-slate-200">{activeHotspot.sector}</strong> • Active Sensor Nodes: <span className="text-cyan-300 font-mono font-bold">{activeNodes.length}</span>
            </p>
          </div>
        </div>

        {/* Tactical Controls & Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Basemap Switcher */}
          <div className="flex items-center bg-[#0d162a] border border-[#203257] rounded-lg p-0.5 text-xs shadow-inner">
            <button
              onClick={() => setMapStyle('dark')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                mapStyle === 'dark' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Dark Tactical
            </button>
            <button
              onClick={() => setMapStyle('satellite')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                mapStyle === 'satellite' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Satellite
            </button>
          </div>

          {/* Layer toggle buttons */}
          <button
            onClick={() => setShowZones(!showZones)}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
              showZones ? 'bg-[#152545] text-cyan-300 border-cyan-600/60 shadow-sm' : 'bg-[#0f172a] text-slate-400 border-[#1c2c4d]'
            }`}
            title="Toggle hazard zoning overlays"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Zones</span>
          </button>

          <button
            onClick={() => setShowNodes(!showNodes)}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
              showNodes ? 'bg-[#152545] text-cyan-300 border-cyan-600/60 shadow-sm' : 'bg-[#0f172a] text-slate-400 border-[#1c2c4d]'
            }`}
            title="Toggle telemetry field nodes"
          >
            <Radio className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nodes ({activeNodes.length})</span>
          </button>

          <button
            onClick={() => setShowInfrastructure(!showInfrastructure)}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
              showInfrastructure ? 'bg-[#152545] text-cyan-300 border-cyan-600/60 shadow-sm' : 'bg-[#0f172a] text-slate-400 border-[#1c2c4d]'
            }`}
            title="Toggle settlements and civic assets"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Civic Assets</span>
          </button>

          <button
            onClick={() => setShowRadarSweep(!showRadarSweep)}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
              showRadarSweep ? 'bg-[#152545] text-cyan-300 border-cyan-600/60 shadow-sm' : 'bg-[#0f172a] text-slate-400 border-[#1c2c4d]'
            }`}
            title="Toggle animated radar sweep overlay"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Radar Scan</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg bg-[#0d162a] border border-[#203257] hover:border-cyan-500 text-slate-300 hover:text-white transition-all"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Map Mode'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Map Canvas */}
      <div className={`relative w-full ${isFullscreen ? 'h-[calc(100vh-80px)]' : 'h-[460px] lg:h-[540px]'}`}>
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Radar Sweep Animation Overlay (Optional high-tech HUD layer) */}
        {showRadarSweep && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-[300]">
            <div className="w-[800px] h-[800px] rounded-full radar-sweep-cone opacity-40"></div>
          </div>
        )}

        {/* Inundation Prediction Overlay Banner */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[400] bg-[#091124]/90 backdrop-blur-md border border-cyan-500/50 rounded-xl px-3.5 py-1.5 text-[11px] font-mono text-cyan-300 flex items-center space-x-2 shadow-2xl pointer-events-none">
          <Waves className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="font-bold">Inundation Prediction based on Rainfall + River Discharge + Drainage Data</span>
        </div>

        {/* Floating Tactical Legend - Flood Inundation Prediction Zones */}
        <div className="absolute top-3 left-3 z-[400] bg-[#091124]/90 backdrop-blur-md border border-[#1e2f52] rounded-xl p-3 shadow-tactical text-[10px] space-y-1.5 max-w-[240px]">
          <div className="font-bold text-white uppercase tracking-wider border-b border-slate-700/60 pb-1 flex items-center justify-between">
            <span className="flex items-center space-x-1">
              <Waves className="w-3 h-3 text-cyan-400" />
              <span>Flood Inundation Zones</span>
            </span>
            <span className="text-[9px] font-mono text-cyan-400">ACTIVE</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white shrink-0"></span>
            <span className="text-emerald-300 font-semibold">Safe (Green - Low Level)</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-white shrink-0"></span>
            <span className="text-yellow-300 font-semibold">Watch (Yellow - 2.5m)</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-600 border border-white animate-ping shrink-0"></span>
            <span className="text-red-400 font-bold">Evacuate (Red - 3.5m+)</span>
          </div>

          <div className="flex items-center space-x-2 pt-1 border-t border-slate-700/60">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 border border-white shrink-0"></span>
            <span className="text-cyan-300">IoT River Gauge / Nodes</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="w-4 h-1 bg-sky-400 border-dashed shrink-0"></span>
            <span className="text-slate-300">Drainage Runoff Vector</span>
          </div>

          {roadClosureActive && (
            <div className="pt-1 text-red-400 font-bold border-t border-slate-700/60 flex items-center space-x-1.5 animate-pulse">
              <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
              <span>NH-206 INUNDATION BARRICADED</span>
            </div>
          )}
        </div>

        {/* Live Cursor Coordinates Readout HUD */}
        <div className="absolute bottom-3 right-12 z-[400] bg-[#091124]/90 backdrop-blur-md border border-[#1e2f52] rounded-lg px-2.5 py-1 text-[10px] font-mono text-cyan-300 flex items-center space-x-2 shadow">
          <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
          <span>{cursorCoords.lat}° N, {cursorCoords.lng}° E</span>
        </div>

        {/* Click Hint Bar */}
        <div className="absolute bottom-3 left-3 z-[400] bg-[#091124]/90 backdrop-blur-md border border-cyan-500/40 rounded-lg px-3 py-1.5 text-[11px] text-cyan-300 flex items-center space-x-2 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>Click any hotspot polygon or node marker to inspect telemetry diagnostics.</span>
        </div>
      </div>
    </div>
  );
};
