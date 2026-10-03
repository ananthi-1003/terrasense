import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Globe, 
  UserCheck, 
  AlertTriangle, 
  ShieldAlert, 
  Check, 
  Sparkles,
  Play,
  Square
} from 'lucide-react';
import { 
  type SupportedLanguage, 
  LANGUAGE_CONFIGS, 
  speakAlert, 
  stopSpeech 
} from '../../utils/speech';
import type { LandslideLocation } from '../../data/landslideLocations';

interface MotherTongueVoiceBarProps {
  currentLanguage: SupportedLanguage;
  onChangeLanguage: (lang: SupportedLanguage) => void;
  seniorMode: boolean;
  onToggleSeniorMode: () => void;
  selectedLocation: LandslideLocation;
}

export const MotherTongueVoiceBar: React.FC<MotherTongueVoiceBarProps> = ({
  currentLanguage,
  onChangeLanguage,
  seniorMode,
  onToggleSeniorMode,
  selectedLocation
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const langConfig = LANGUAGE_CONFIGS[currentLanguage] || LANGUAGE_CONFIGS.ta;

  const isDangerous = selectedLocation.riskLevel === 'Critical' || selectedLocation.riskLevel === 'High';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    const spoken = speakAlert(currentLanguage, undefined, seniorMode, () => {
      setIsSpeaking(false);
    });

    if (!spoken) {
      setIsSpeaking(false);
    }
  };

  // If senior citizen mode is on and selected location becomes Critical, auto-speak alert
  useEffect(() => {
    if (seniorMode && isDangerous) {
      const timer = setTimeout(() => {
        setIsSpeaking(true);
        speakAlert(currentLanguage, undefined, true, () => {
          setIsSpeaking(false);
        });
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [selectedLocation.id, seniorMode]);

  return (
    <div className={`w-full rounded-2xl border transition-all duration-300 shadow-2xl relative overflow-hidden ${
      seniorMode 
        ? 'bg-[#0a1329] border-cyan-400 p-4 sm:p-5 ring-2 ring-cyan-500/50' 
        : 'bg-[#060b18] border-[#1f2d4e] p-3 sm:p-4'
    }`}>
      {/* Top accent indicator */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] ${
        isDangerous 
          ? 'bg-gradient-to-r from-red-500 via-amber-400 to-red-500 animate-pulse' 
          : 'bg-gradient-to-r from-emerald-500 via-cyan-400 to-blue-500'
      }`} />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left: Language Selection & Senior Citizen Mode */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Language Selector */}
          <div className="flex items-center space-x-1.5 bg-[#0b1428] p-1 rounded-xl border border-[#22355c]">
            <Globe className="w-4 h-4 text-cyan-400 ml-1.5 hidden sm:inline shrink-0" />
            <div className="flex items-center space-x-1">
              {(['ta', 'ml', 'hi', 'en'] as SupportedLanguage[]).map((code) => {
                const conf = LANGUAGE_CONFIGS[code];
                const active = currentLanguage === code;
                return (
                  <button
                    key={code}
                    onClick={() => {
                      onChangeLanguage(code);
                      stopSpeech();
                      setIsSpeaking(false);
                    }}
                    className={`transition-all rounded-lg font-bold font-mono ${
                      seniorMode ? 'px-3 py-2 text-sm sm:text-base' : 'px-2.5 py-1 text-xs'
                    } ${
                      active
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-950'
                        : 'text-slate-400 hover:text-white hover:bg-[#162544]'
                    }`}
                    title={conf.name}
                  >
                    <span>{conf.nativeName}</span>
                    <span className="opacity-70 text-[10px] ml-1 hidden sm:inline">({conf.code.toUpperCase()})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Senior Citizen Mode Toggle */}
          <button
            onClick={onToggleSeniorMode}
            className={`flex items-center space-x-2 rounded-xl transition-all border font-bold ${
              seniorMode
                ? 'bg-amber-500 text-black border-amber-300 shadow-lg shadow-amber-500/30 px-4 py-2 text-base'
                : 'bg-[#0f1b36] text-amber-300 border-amber-600/40 hover:bg-[#182a52] px-3 py-1.5 text-xs font-mono'
            }`}
            title="Senior Citizen Mode: Big buttons, huge fonts, loud mother-tongue audio alerts"
          >
            <UserCheck className={seniorMode ? 'w-5 h-5 animate-bounce' : 'w-3.5 h-3.5'} />
            <div className="text-left leading-tight">
              <span className="block">
                {seniorMode ? '👴 SENIOR MODE ON' : 'SENIOR CITIZEN MODE'}
              </span>
              {seniorMode && (
                <span className="text-[11px] font-normal opacity-90 block">
                  முதியோர் பயன்முறை &bull; பெரிய எழுத்து
                </span>
              )}
            </div>
          </button>
        </div>

        {/* Right: The BIG SPEAKER ICON "KELUNGAL / LISTEN" */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSpeak}
            className={`relative group flex items-center justify-center space-x-2.5 rounded-2xl font-black transition-all transform active:scale-95 shadow-2xl ${
              seniorMode
                ? 'w-full lg:w-auto px-6 py-3.5 text-lg sm:text-xl'
                : 'w-full lg:w-auto px-5 py-2.5 text-sm sm:text-base'
            } ${
              isDangerous
                ? 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white border-2 border-red-400 shadow-red-950/80 ring-2 ring-red-500/40'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border-2 border-emerald-400 shadow-emerald-950/80'
            }`}
            title="Listen to Landslide Warning in Mother Tongue"
          >
            {/* Animated Audio Ping if speaking or dangerous */}
            {isDangerous && (
              <span className="absolute -inset-1 rounded-2xl bg-red-500 opacity-30 group-hover:opacity-60 blur-sm animate-pulse"></span>
            )}

            <div className="relative flex items-center space-x-2">
              <div className={`rounded-xl p-1.5 ${
                isSpeaking ? 'bg-white text-red-600 animate-pulse' : 'bg-black/30 text-white'
              }`}>
                {isSpeaking ? (
                  <Square className={seniorMode ? 'w-6 h-6 fill-current' : 'w-5 h-5 fill-current'} />
                ) : (
                  <Volume2 className={`${seniorMode ? 'w-6 h-6' : 'w-5 h-5'} ${isDangerous ? 'animate-bounce' : ''}`} />
                )}
              </div>

              <div className="text-left">
                <div className="font-extrabold tracking-wide uppercase flex items-center space-x-1.5">
                  <span>{isSpeaking ? 'STOP AUDIO' : langConfig.listenBtnLabel}</span>
                  {isSpeaking && (
                    <span className="flex space-x-0.5 items-end h-3 ml-1">
                      <span className="w-1 bg-white h-2 animate-pulse"></span>
                      <span className="w-1 bg-white h-3 animate-pulse delay-75"></span>
                      <span className="w-1 bg-white h-1.5 animate-pulse delay-150"></span>
                    </span>
                  )}
                </div>
                <div className="text-[10px] sm:text-xs font-medium opacity-90 font-mono">
                  {langConfig.speakerLabel} ({langConfig.nativeName})
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Spoken Alert Subtitle Bar */}
      <div className={`mt-2.5 rounded-xl border flex items-start space-x-2.5 ${
        isDangerous
          ? 'bg-red-950/70 border-red-500/60 text-red-100'
          : 'bg-emerald-950/50 border-emerald-500/40 text-emerald-100'
      } ${seniorMode ? 'p-3 text-base sm:text-lg font-bold' : 'p-2 text-xs sm:text-sm'}`}>
        <div className="p-1 rounded-lg bg-black/40 shrink-0 mt-0.5">
          <AlertTriangle className={`w-4 h-4 ${isDangerous ? 'text-red-400' : 'text-emerald-400'}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between flex-wrap gap-1">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-300">
              {langConfig.nativeName} VOICE ALERT &bull; {selectedLocation.name} ({selectedLocation.riskLevel})
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              Web Speech Synthesizer
            </span>
          </div>
          <p className="mt-0.5 leading-relaxed font-sans font-medium">
            "{langConfig.dangerAlertText}"
          </p>
          {currentLanguage !== 'en' && (
            <p className="text-[11px] text-slate-400 font-mono italic mt-0.5">
              Phonetic: {langConfig.phoneticText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
