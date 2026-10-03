import React, { useState, useCallback, useEffect } from 'react';
import { TopHeader } from './components/dashboard/TopHeader';
import { DisasterHeroBanner } from './components/dashboard/DisasterHeroBanner';
import { TelemetryGrid } from './components/dashboard/TelemetryGrid';
import { TerraSenseMap } from './components/dashboard/TerraSenseMap';
import { PanelACurrentRisk } from './components/dashboard/PanelACurrentRisk';
import { PanelBRecommendations } from './components/dashboard/PanelBRecommendations';
import { TechStackDataSources } from './components/dashboard/TechStackDataSources';
import { BottomAlertsLog, type AlertActionType } from './components/dashboard/BottomAlertsLog';
import { MotherTongueVoiceBar } from './components/voice/MotherTongueVoiceBar';
import { SafeRouteFinder } from './components/routing/SafeRouteFinder';
import { PastHistoryTimeline } from './components/history/PastHistoryTimeline';

import { LANDSLIDE_LOCATIONS, type LandslideLocation } from './data/landslideLocations';
import { PAST_LANDSLIDES, type PastLandslideEvent } from './data/landslideHistory';
import { 
  calculateSafeAndDangerousRoutes, 
  PRESET_ROUTES,
  type DangerZone, 
  type RouteCalculationResult 
} from './utils/routing';
import { 
  type SupportedLanguage, 
  speakAlert, 
  stopSpeech, 
  LANGUAGE_CONFIGS 
} from './utils/speech';
import { startSiren, stopSiren, playAlertChirp, playBroadcastTone } from './utils/audio';
import { ShieldCheck, Info, Sparkles, CheckCircle2, Route, History } from 'lucide-react';

export function App() {
  // 1. Core State
  const [selectedLocation, setSelectedLocation] = useState<LandslideLocation>(LANDSLIDE_LOCATIONS[0]);
  const [audioActive, setAudioActive] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [demoAlertPopup, setDemoAlertPopup] = useState<boolean>(false);

  // 2. Feature 2 State: AI Voice Alert & Senior Citizen Mode
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('ta');
  const [seniorMode, setSeniorMode] = useState<boolean>(false);

  // 3. Feature 1 State: Safe Route Finder
  const [isSafeRouteActive, setIsSafeRouteActive] = useState<boolean>(true);
  const [routeResult, setRouteResult] = useState<RouteCalculationResult | null>(null);
  const [isCalculatingRoute, setIsCalculatingRoute] = useState<boolean>(false);
  const [activeRouteName, setActiveRouteName] = useState<{ start: string; end: string } | null>({
    start: PRESET_ROUTES[0].start.name,
    end: PRESET_ROUTES[0].end.name
  });
  const [routeWaypoints, setRouteWaypoints] = useState<{
    start?: { coords: [number, number]; name: string };
    end?: { coords: [number, number]; name: string };
  }>({
    start: { coords: PRESET_ROUTES[0].start.coords, name: PRESET_ROUTES[0].start.name },
    end: { coords: PRESET_ROUTES[0].end.coords, name: PRESET_ROUTES[0].end.name }
  });
  const [isMapPickingMode, setIsMapPickingMode] = useState<boolean>(false);

  // 4. Feature 3 State: Past Landslide History Layer & Timeline
  const [isHistoryLayerVisible, setIsHistoryLayerVisible] = useState<boolean>(true);
  const [isHeatmapVisible, setIsHeatmapVisible] = useState<boolean>(true);
  const [selectedYear, setSelectedYear] = useState<number | 'ALL'>('ALL');

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  }, []);

  const handleSelectLocation = useCallback((loc: LandslideLocation) => {
    setSelectedLocation(loc);
    playAlertChirp();
    showToast(`Focused on ${loc.name} (${loc.riskLevel} Risk - ${loc.riskScore}%)`);
    if (seniorMode && (loc.riskLevel === 'Critical' || loc.riskLevel === 'High')) {
      speakAlert(currentLanguage, undefined, true);
    }
  }, [currentLanguage, seniorMode, showToast]);

  const handleToggleAudio = useCallback(() => {
    if (audioActive) {
      stopSiren();
      setAudioActive(false);
      showToast('Acoustic Siren Silenced');
    } else {
      startSiren();
      setAudioActive(true);
      setDemoAlertPopup(true);
      showToast('Demo Alert Triggered - No real SMS sent');
    }
  }, [audioActive, showToast]);

  const handleDispatchAction = useCallback((type: AlertActionType) => {
    setDemoAlertPopup(true);
    if (type === 'RiverOverflow') {
      if (!audioActive) {
        startSiren();
        setAudioActive(true);
      }
      playAlertChirp();
      showToast('Demo Alert Triggered - No real SMS sent');
    } else if (type === 'Siren') {
      if (!audioActive) {
        startSiren();
        setAudioActive(true);
      }
      playBroadcastTone();
      showToast('Demo Alert Triggered - No real SMS sent');
    } else if (type === 'Email') {
      playAlertChirp();
      showToast('Demo Alert Triggered - No real SMS sent');
    } else if (type === 'SMS') {
      playAlertChirp();
      showToast('Demo Alert Triggered - No real SMS sent');
    } else {
      playAlertChirp();
      showToast('Demo Alert Triggered - No real SMS sent');
    }
  }, [audioActive, showToast]);

  // Language Change Handler
  const handleChangeLanguage = useCallback((lang: SupportedLanguage) => {
    setCurrentLanguage(lang);
    const langObj = LANGUAGE_CONFIGS[lang];
    showToast(`Language set to ${langObj.name} (${langObj.nativeName})`);
  }, [showToast]);

  // Senior Citizen Mode Toggle Handler
  const handleToggleSeniorMode = useCallback(() => {
    setSeniorMode(prev => {
      const next = !prev;
      if (next) {
        showToast('👴 Senior Citizen Mode ON: Big text, large buttons, auto-voice alerts active');
        speakAlert(currentLanguage, LANGUAGE_CONFIGS[currentLanguage].dangerAlertText, true);
      } else {
        showToast('Senior Citizen Mode OFF: Standard tactical display restored');
        stopSpeech();
      }
      return next;
    });
  }, [currentLanguage, showToast]);

  // Safe Route Calculation
  const handleCalculateRoute = useCallback(async (
    start: [number, number],
    end: [number, number],
    startName: string,
    endName: string
  ) => {
    setIsCalculatingRoute(true);
    setRouteWaypoints({
      start: { coords: start, name: startName },
      end: { coords: end, name: endName }
    });
    setActiveRouteName({ start: startName, end: endName });

    // Active danger zones: locations with Critical or High risk
    const dangerZones: DangerZone[] = LANDSLIDE_LOCATIONS
      .filter(l => l.riskLevel === 'Critical' || l.riskLevel === 'High')
      .map(l => ({
        id: l.id,
        name: l.name,
        lat: l.lat,
        lng: l.lng,
        radiusKm: l.riskLevel === 'Critical' ? 15 : 10,
        riskLevel: l.riskLevel as 'Critical' | 'High'
      }));

    try {
      const result = await calculateSafeAndDangerousRoutes(start, end, dangerZones);
      setRouteResult(result);
      setIsSafeRouteActive(true);
      showToast(result.safeRoute.summary);
      if (seniorMode) {
        speakAlert(currentLanguage, result.safeRoute.summary, true);
      }
    } catch (e) {
      console.error('Route calculation error:', e);
      showToast('Error calculating route. Falling back to alternative safety corridor.');
    } finally {
      setIsCalculatingRoute(false);
    }
  }, [currentLanguage, seniorMode, showToast]);

  // Clear Route
  const handleClearRoute = useCallback(() => {
    setRouteResult(null);
    setActiveRouteName(null);
    setRouteWaypoints({});
    showToast('Safe Route overlay cleared.');
  }, [showToast]);

  // Map Click Coordinate Handler for interactive route destination picking
  const handleMapClickCoord = useCallback((coord: [number, number]) => {
    if (!isMapPickingMode) return;
    const startPoint: [number, number] = [selectedLocation.lat, selectedLocation.lng];
    const destinationLabel = `Target Pin (${coord[0].toFixed(2)}°N, ${coord[1].toFixed(2)}°E)`;
    handleCalculateRoute(startPoint, coord, selectedLocation.name, destinationLabel);
    setIsMapPickingMode(false);
    showToast(`Calculated route from ${selectedLocation.name} to target pin!`);
  }, [isMapPickingMode, selectedLocation, handleCalculateRoute, showToast]);

  // Initial calculation on mount for demonstration
  useEffect(() => {
    handleCalculateRoute(
      PRESET_ROUTES[0].start.coords,
      PRESET_ROUTES[0].end.coords,
      PRESET_ROUTES[0].start.name,
      PRESET_ROUTES[0].end.name
    );
  }, []);

  return (
    <div className={`min-h-screen flex flex-col bg-[#030712] text-slate-100 selection:bg-cyan-500 selection:text-white font-sans bg-tactical-grid transition-all duration-300 ${
      seniorMode ? 'senior-citizen-mode' : ''
    }`}>
      {/* 1. Top Header: TerraSense | Live Landslide Risk Monitoring - North Eastern Region | Current Time */}
      <TopHeader
        locations={LANDSLIDE_LOCATIONS}
        selectedLocation={selectedLocation}
        onSelectLocation={handleSelectLocation}
        audioActive={audioActive}
        onToggleAudio={handleToggleAudio}
        currentLanguage={currentLanguage}
        onChangeLanguage={handleChangeLanguage}
        seniorMode={seniorMode}
        onToggleSeniorMode={handleToggleSeniorMode}
      />

      {/* Main Single Page Layout */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto p-3 sm:p-4 lg:p-5 flex flex-col space-y-4">
        {/* Disaster Management Hero Banner */}
        <DisasterHeroBanner
          selectedLocation={selectedLocation}
          audioActive={audioActive}
          onToggleAudio={handleToggleAudio}
          onSelectLocation={handleSelectLocation}
        />

        {/* 2 NEW LIVE DATA CARDS in existing dashboard grid (Rainfall Intensity in Blue, Water Level in Red) */}
        <TelemetryGrid 
          rainfallIntensityVal="85 mm/hr"
          rainfallStatus="Heavy Rainfall Alert"
          waterLevelVal="3.2m / 4.0m"
          waterLevelStatus="DANGER - Overflow Risk"
          soilMoistureVal={parseInt(selectedLocation.factors.soilMoisture) || 92}
          vibrationVal="0.38 mm/s Baseline FFT"
          slopeVal={selectedLocation.factors.slope}
        />

        {/* FEATURE 2: AI Voice Alert in Mother Tongue & Senior Citizen Mode Bar */}
        <MotherTongueVoiceBar
          currentLanguage={currentLanguage}
          onChangeLanguage={handleChangeLanguage}
          seniorMode={seniorMode}
          onToggleSeniorMode={handleToggleSeniorMode}
          selectedLocation={selectedLocation}
        />

        {/* Upper Workspace: 70% Map / 30% Right Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 lg:gap-5 items-stretch">
          {/* Left (70%): Leaflet Map with Safe Route & Past History Layers */}
          <div className="lg:col-span-7 flex flex-col min-h-[520px] lg:min-h-[660px]">
            <TerraSenseMap
              locations={LANDSLIDE_LOCATIONS}
              selectedLocation={selectedLocation}
              onSelectLocation={handleSelectLocation}
              // Feature 1 Props
              routeResult={routeResult}
              isSafeRouteActive={isSafeRouteActive}
              onToggleSafeRoute={() => setIsSafeRouteActive(!isSafeRouteActive)}
              routeWaypoints={routeWaypoints}
              isMapPickingMode={isMapPickingMode}
              onMapClickCoord={handleMapClickCoord}
              // Feature 3 Props
              pastLandslides={PAST_LANDSLIDES}
              isHistoryLayerVisible={isHistoryLayerVisible}
              onToggleHistoryLayer={() => setIsHistoryLayerVisible(!isHistoryLayerVisible)}
              isHeatmapVisible={isHeatmapVisible}
              selectedYear={selectedYear}
              seniorMode={seniorMode}
            />
          </div>

          {/* Right (30%): Two Panels */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            {/* Panel A - Current Risk */}
            <PanelACurrentRisk location={selectedLocation} />

            {/* Panel B - AI Actionable Recommendations */}
            <PanelBRecommendations 
              location={selectedLocation}
              onTriggerAlert={handleDispatchAction}
            />
          </div>
        </div>

        {/* FEATURE 1 CONTROLS: Safe Route (Safe Root Finder) Drawer / Panel */}
        {isSafeRouteActive && (
          <div className="w-full">
            <SafeRouteFinder
              locations={LANDSLIDE_LOCATIONS}
              onCalculateRoute={handleCalculateRoute}
              onClearRoute={handleClearRoute}
              routeResult={routeResult}
              isLoading={isCalculatingRoute}
              activeRouteName={activeRouteName}
              isMapPickingMode={isMapPickingMode}
              onToggleMapPickMode={() => setIsMapPickingMode(!isMapPickingMode)}
              seniorMode={seniorMode}
            />
          </div>
        )}

        {/* FEATURE 3 CONTROLS: Previous Landslide History Layer & Timeline Slider */}
        <div className="w-full">
          <PastHistoryTimeline
            pastLandslides={PAST_LANDSLIDES}
            isHistoryLayerVisible={isHistoryLayerVisible}
            onToggleHistoryLayer={() => setIsHistoryLayerVisible(!isHistoryLayerVisible)}
            isHeatmapVisible={isHeatmapVisible}
            onToggleHeatmap={() => setIsHeatmapVisible(!isHeatmapVisible)}
            selectedYear={selectedYear}
            onChangeYear={setSelectedYear}
            seniorMode={seniorMode}
          />
        </div>

        {/* SIH26192: TECH STACK & MULTI-SOURCE DATA SOURCES SECTION */}
        <div className="w-full">
          <TechStackDataSources />
        </div>

        {/* Bottom Bar: Location-based Alerts Log with SMS/Siren/Email/Authority status */}
        <div className="w-full">
          <BottomAlertsLog
            location={selectedLocation}
            audioActive={audioActive}
            onToggleAudio={handleToggleAudio}
            onDispatchAction={handleDispatchAction}
          />
        </div>
      </main>

      {/* Footer Banner */}
      <footer className="w-full bg-[#02050c] border-t border-[#131d33] px-4 py-3 text-slate-400 text-xs font-mono flex flex-col space-y-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-slate-300">
              TerraSence Flash Flood & Landslide AI Early Warning Platform &bull; Ministry of Home Affairs (SIH26192) &bull; Integrated with ISRO-Bhuvan &amp; NDMA CAP Gateway
            </span>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <span className="text-emerald-400 font-bold">&bull; 5 BASIN HUBS ONLINE</span>
            <span>NOWCASTING: LSTM + RANDOM FOREST</span>
            <span>MHA DISASTER PROTOCOL v5.2</span>
          </div>
        </div>
        <div className="p-2.5 rounded-xl bg-[#070e1c] border border-yellow-500/40 text-yellow-300 text-[11px] leading-relaxed text-center sm:text-left">
          <span className="font-bold text-yellow-400">Disclaimer: </span>
          This is a software prototype for SIH26192. Sensor values are simulated. Target Accuracy ∼75-80% after training, Target Resolution Village Level, Target Cost ~₹5000-8000/node. These are estimates, not claims.
        </div>
      </footer>

      {/* Demo Alert Triggered Modal Popup */}
      {demoAlertPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0b1428] border-2 border-yellow-400 rounded-2xl p-6 max-w-md w-full shadow-2xl shadow-yellow-950/80 text-center flex flex-col items-center space-y-4 animate-scaleUp">
            <div className="w-14 h-14 rounded-2xl bg-yellow-400/10 border border-yellow-400 text-yellow-400 flex items-center justify-center shadow-inner">
              <ShieldCheck className="w-8 h-8 text-yellow-400 animate-pulse" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-yellow-400 text-black font-extrabold font-mono text-[10px] tracking-wide uppercase">
                SIH DEMO MODE
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white mt-2 tracking-tight">
                Demo Alert Triggered - No real SMS sent
              </h3>
              <p className="text-xs text-slate-300 font-mono mt-2 leading-relaxed">
                Emergency broadcast simulated for SIH judging demonstration. All siren and SMS triggers are safely isolated in demo mode.
              </p>
            </div>
            <button
              onClick={() => setDemoAlertPopup(false)}
              className="px-6 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold font-mono text-xs uppercase tracking-wider shadow-lg shadow-yellow-950 transition-all cursor-pointer"
            >
              OK, Understood
            </button>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0c162c] border border-cyan-500/80 text-white px-4 py-3 rounded-xl shadow-2xl shadow-cyan-950/80 text-xs font-mono flex items-center space-x-2.5 animate-slideUp">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;
