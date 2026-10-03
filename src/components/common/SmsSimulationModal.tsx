import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Radio, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  Signal, 
  Languages 
} from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

export const SmsSimulationModal: React.FC = () => {
  const { 
    smsModalOpen, 
    setSmsModalOpen, 
    activeHotspot, 
    telemetry, 
    showToast 
  } = useSimulation();

  const [language, setLanguage] = useState<'en' | 'hi' | 'local'>('en');
  const [isDispatched, setIsDispatched] = useState<boolean>(false);

  if (!smsModalOpen) return null;

  const handleDispatch = () => {
    setIsDispatched(true);
    showToast('SMS Cell Broadcast Dispatched', 'Simulated emergency broadcast pushed to 1,450 registered devices in sector.', 'danger');
    setTimeout(() => {
      // Keep modal open so user can inspect device preview
    }, 500);
  };

  const close = () => {
    setIsDispatched(false);
    setSmsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0e172a] border border-[#233863] rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-[#1e2f54] flex items-center justify-between bg-[#111e3b]">
          <div className="flex items-center space-x-2.5">
            <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Emergency Cell Broadcast SMS Terminal
              </h3>
              <p className="text-[11px] text-slate-400">
                CAP-Compliant Common Alerting Protocol Simulation
              </p>
            </div>
          </div>
          <button
            onClick={close}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1a2c52] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Target Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-[#12203f] p-2.5 rounded-lg border border-[#1d325e]">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center space-x-1">
                <Signal className="w-3 h-3 text-cyan-400" />
                <span>Coverage Sector</span>
              </div>
              <div className="text-xs font-semibold text-white mt-1 truncate">{activeHotspot.sector}</div>
            </div>
            <div className="bg-[#12203f] p-2.5 rounded-lg border border-[#1d325e]">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center space-x-1">
                <Users className="w-3 h-3 text-cyan-400" />
                <span>Target Pop.</span>
              </div>
              <div className="text-xs font-semibold text-white mt-1">1,450 Residents</div>
            </div>
            <div className="bg-[#12203f] p-2.5 rounded-lg border border-[#1d325e]">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Towers Active</div>
              <div className="text-xs font-semibold text-white mt-1">Cell Towers #4 & #7</div>
            </div>
            <div className="bg-[#12203f] p-2.5 rounded-lg border border-[#1d325e]">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Risk Level</div>
              <div className="text-xs font-bold text-red-400 mt-1">{telemetry.riskLevel} ({telemetry.riskScore}/100)</div>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex items-center justify-between bg-[#12203f] p-2 rounded-lg border border-[#1d325e]">
            <div className="flex items-center space-x-1.5 text-xs text-slate-300 font-medium">
              <Languages className="w-4 h-4 text-cyan-400" />
              <span>Broadcast Language Preview:</span>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                  language === 'en' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                  language === 'hi' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                हिन्दी (Hindi)
              </button>
              <button
                onClick={() => setLanguage('local')}
                className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                  language === 'local' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Khasi / Local
              </button>
            </div>
          </div>

          {/* Smartphone Mockup */}
          <div className="bg-[#090e1a] rounded-2xl p-4 border border-[#1c2e54] max-w-sm mx-auto shadow-inner">
            <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800">
              <span className="flex items-center space-x-1">
                <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                <span>Simulated Resident Device</span>
              </span>
              <span>4G LTE • 94%</span>
            </div>

            {/* Emergency Pop-Up Alert */}
            <div className="mt-3 bg-red-950/90 border-2 border-red-500 rounded-xl p-3 text-red-100 shadow-lg shadow-red-950/60">
              <div className="flex items-center space-x-2 text-red-400 font-bold text-xs uppercase tracking-wider pb-1.5 border-b border-red-800/60">
                <AlertTriangle className="w-4 h-4 animate-bounce" />
                <span>EMERGENCY DISASTER ALERT</span>
              </div>
              
              <div className="mt-2 text-xs leading-relaxed space-y-1.5 text-slate-100">
                {language === 'en' && (
                  <>
                    <p className="font-semibold text-white">
                      [TerraSense Early Warning] Landslide Precursor Warning for {activeHotspot.name}.
                    </p>
                    <p className="text-slate-300">
                      Risk: <strong className="text-red-400">{telemetry.riskScore}/100 ({telemetry.riskLevel})</strong>. 
                      Estimated Risk Window: <strong className="text-amber-300">{telemetry.estimatedRiskWindow || '10–20 minutes'}</strong>.
                    </p>
                    <p className="text-slate-200">
                      Immediate Action: Restrict movement near slope toe. Prepare to move to high-ground assembly point (Govt Primary School). Stay clear of {activeHotspot.nearbyRoad}.
                    </p>
                    <p className="text-[10px] text-slate-400 pt-1">
                      Issued by SDMA / TerraSense Automated Sensor Mesh Grid.
                    </p>
                  </>
                )}

                {language === 'hi' && (
                  <>
                    <p className="font-semibold text-white">
                      [टेरासेंस पूर्व चेतावनी] {activeHotspot.name} क्षेत्र में भूस्खलन का उच्च जोखिम दर्ज किया गया है।
                    </p>
                    <p className="text-slate-300">
                      अनुमानित जोखिम समय: <strong className="text-amber-300">{telemetry.estimatedRiskWindow || '10–20 मिनट'}</strong>।
                    </p>
                    <p className="text-slate-200">
                      निर्देश: ढलान और जल निकासी मार्गों से तुरंत दूर रहें। सरकारी प्राथमिक विद्यालय राहत शिविर की ओर प्रस्थान करें।
                    </p>
                    <p className="text-[10px] text-slate-400 pt-1">
                      राज्य आपदा प्रबंधन प्राधिकरण (SDMA) द्वारा प्रेषित।
                    </p>
                  </>
                )}

                {language === 'local' && (
                  <>
                    <p className="font-semibold text-white">
                      [TerraSense Jingmaham] Ka jingmaham jingshlei khyndew ha {activeHotspot.name}.
                    </p>
                    <p className="text-slate-300">
                      Por jingmaham: <strong className="text-amber-300">{telemetry.estimatedRiskWindow || '10–20 minit'}</strong>.
                    </p>
                    <p className="text-slate-200">
                      Kiew sha ki jaka ba la buh kyrpang (Skul Primary). Kieng ban iaid lyngba ka surok {activeHotspot.nearbyRoad}.
                    </p>
                    <p className="text-[10px] text-slate-400 pt-1">
                      SDMA Meghalaya & TerraSense Mesh Network.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Dispatch Status feedback */}
          {isDispatched && (
            <div className="bg-emerald-950/80 border border-emerald-500 rounded-xl p-3 flex items-center space-x-3 text-emerald-200 text-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="font-bold">Cell Broadcast Successfully Dispatched</p>
                <p className="text-[11px] opacity-80">
                  Transmitted across 2 BTS cell antennas (Coverage: 100%). Carrier ACK received from Jio, Airtel, and BSNL gateways.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-[#1e2f54] bg-[#111e3b] flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Common Alerting Protocol (CAP v1.2)
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={close}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:bg-[#1a2c52] transition-colors"
            >
              Close Terminal
            </button>
            <button
              onClick={handleDispatch}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-lg shadow-red-600/30 transition-all active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
