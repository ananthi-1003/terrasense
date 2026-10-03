import React, { useState, useEffect } from 'react';
import { 
  History, 
  Layers, 
  Flame, 
  Play, 
  Pause, 
  RotateCcw, 
  Calendar, 
  Info, 
  MapPin,
  Sparkles
} from 'lucide-react';
import type { PastLandslideEvent } from '../../data/landslideHistory';

interface PastHistoryTimelineProps {
  pastLandslides: PastLandslideEvent[];
  isHistoryLayerVisible: boolean;
  onToggleHistoryLayer: () => void;
  isHeatmapVisible: boolean;
  onToggleHeatmap: () => void;
  selectedYear: number | 'ALL';
  onChangeYear: (year: number | 'ALL') => void;
  seniorMode: boolean;
}

export const PastHistoryTimeline: React.FC<PastHistoryTimelineProps> = ({
  pastLandslides,
  isHistoryLayerVisible,
  onToggleHistoryLayer,
  isHeatmapVisible,
  onToggleHeatmap,
  selectedYear,
  onChangeYear,
  seniorMode
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Year bounds
  const minYear = 2008;
  const maxYear = 2025;

  // Auto playback through years
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const current = selectedYear === 'ALL' ? maxYear : selectedYear;
      const next = current >= maxYear ? minYear : current + 1;
      onChangeYear(next);
    }, 1400);

    return () => clearInterval(interval);
  }, [isPlaying, selectedYear, onChangeYear, maxYear, minYear]);

  // Compute how many events are visible
  const visibleCount = pastLandslides.filter(item => {
    if (selectedYear === 'ALL') return true;
    return item.year <= selectedYear;
  }).length;

  const totalCasualties = pastLandslides
    .filter(item => selectedYear === 'ALL' || item.year <= selectedYear)
    .reduce((acc, curr) => acc + curr.peopleAffected, 0);

  const currentSliderValue = selectedYear === 'ALL' ? maxYear : selectedYear;

  return (
    <div className={`bg-[#050b18]/95 backdrop-blur-md rounded-2xl border border-[#1b2b4d] shadow-2xl p-3 sm:p-4 ${
      seniorMode ? 'text-base' : 'text-xs'
    }`}>
      {/* Top Row: Layer toggles & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-[#182645] pb-2.5 mb-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-xl bg-slate-800 border border-slate-600 text-slate-300">
            <History className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-300 uppercase bg-slate-800/80 px-2 py-0.5 rounded border border-slate-600">
                FEATURE 3 // PAST HISTORY LAYER
              </span>
              <span className="text-[10px] font-mono text-cyan-400 font-semibold hidden sm:inline">
                National Landslide Geodatabase
              </span>
            </div>
            <h3 className={`font-black text-white tracking-tight ${seniorMode ? 'text-lg' : 'text-sm'}`}>
              Historical Landslide Archive (India 2008–2025)
            </h3>
          </div>
        </div>

        {/* Toggles: Past History Layer & Heatmap Effect */}
        <div className="flex items-center space-x-2">
          {/* Past History Toggle */}
          <button
            onClick={onToggleHistoryLayer}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all border ${
              isHistoryLayerVisible
                ? 'bg-slate-700 text-white border-cyan-400 shadow-md shadow-cyan-950'
                : 'bg-[#091122] text-slate-400 border-[#22355c] hover:text-white'
            }`}
          >
            <span className={`h-2.5 w-2.5 rounded-full ${isHistoryLayerVisible ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`}></span>
            <span>{isHistoryLayerVisible ? 'History: ON' : 'History: OFF'}</span>
          </button>

          {/* Heatmap Toggle */}
          <button
            onClick={onToggleHeatmap}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all border ${
              isHeatmapVisible
                ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white border-orange-400 shadow-md shadow-red-950'
                : 'bg-[#091122] text-slate-400 border-[#22355c] hover:text-white'
            }`}
          >
            <Flame className={`w-3.5 h-3.5 ${isHeatmapVisible ? 'text-yellow-300 animate-bounce' : 'text-slate-500'}`} />
            <span>{isHeatmapVisible ? 'Heatmap: ON' : 'Heatmap: OFF'}</span>
          </button>
        </div>
      </div>

      {/* Timeline Controls & Year Slider */}
      <div className="bg-[#081022] border border-[#1d2d4f] rounded-xl p-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2.5">
          {/* Year Display & Playback */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-2 rounded-xl border transition-all font-mono font-bold flex items-center space-x-1 ${
                isPlaying 
                  ? 'bg-amber-500 text-black border-amber-300 shadow-md' 
                  : 'bg-[#101b33] text-cyan-300 border-[#22355c] hover:bg-[#16274e]'
              }`}
              title={isPlaying ? 'Pause Auto-Play' : 'Play Timeline Animation'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-slate-400 text-xs font-mono uppercase font-bold">YEAR:</span>
              <span className="text-xl font-black text-cyan-300 font-mono tracking-wider">
                {selectedYear === 'ALL' ? 'ALL YEARS' : selectedYear}
              </span>
            </div>

            <button
              onClick={() => onChangeYear('ALL')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all border ${
                selectedYear === 'ALL'
                  ? 'bg-cyan-600 text-white border-cyan-400 shadow-sm'
                  : 'bg-[#0f172a] text-slate-400 border-[#22355c] hover:text-white'
              }`}
            >
              All Records
            </button>
          </div>

          {/* Incident Stats Counters */}
          <div className="flex items-center space-x-3 text-xs font-mono">
            <div className="bg-[#050b18] px-2.5 py-1 rounded-lg border border-[#192744]">
              <span className="text-slate-400">DISASTERS SHOWN:</span>{' '}
              <span className="text-cyan-400 font-bold">{visibleCount} of {pastLandslides.length}</span>
            </div>
            <div className="bg-[#050b18] px-2.5 py-1 rounded-lg border border-[#192744]">
              <span className="text-slate-400">AFFECTED TOTAL:</span>{' '}
              <span className="text-amber-400 font-bold">{totalCasualties.toLocaleString('en-IN')}+</span>
            </div>
          </div>
        </div>

        {/* The Slider Track */}
        <div className="space-y-1">
          <input
            type="range"
            min={minYear}
            max={maxYear}
            step={1}
            value={currentSliderValue}
            onChange={(e) => {
              setIsPlaying(false);
              onChangeYear(Number(e.target.value));
            }}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 hover:accent-cyan-300 transition-all"
          />

          {/* Year Tick Marks */}
          <div className="flex justify-between text-[10px] font-mono text-slate-500 px-1 pt-1">
            <span>2008 (Ooty)</span>
            <span className="hidden sm:inline">2013 (Kedarnath)</span>
            <span>2014 (Malin)</span>
            <span className="hidden sm:inline">2018 (Kodagu/Idukki)</span>
            <span>2020 (Pettimudi)</span>
            <span className="hidden sm:inline">2023 (Shimla/Irshalwadi)</span>
            <span className="text-cyan-400 font-bold">2024–2025 (Wayanad)</span>
          </div>
        </div>
      </div>

      {/* Quick Info Tagline */}
      <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span className="flex items-center space-x-1">
          <span className="h-2 w-2 rounded-full bg-slate-500 inline-block"></span>
          <span>Click any grey/black dot on map to view past disaster date & casualty stats.</span>
        </span>
        <span className="text-slate-500 hidden md:inline">
          Heatmap clusters indicate Western Ghats, Sahyadri & Himalayan high-risk zones.
        </span>
      </div>
    </div>
  );
};
