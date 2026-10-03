export type SupportedLanguage = 'ta' | 'ml' | 'hi' | 'en';

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  listenBtnLabel: string;
  speakerLabel: string;
  dangerAlertText: string;
  phoneticText: string;
  safeRouteAlert: string;
}

export const LANGUAGE_CONFIGS: Record<SupportedLanguage, LanguageConfig> = {
  ta: {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    listenBtnLabel: 'கேளுங்கள் / KELUNGAL',
    speakerLabel: 'குரல் எச்சரிக்கை',
    dangerAlertText: 'ஆபத்து! அந்த மலை பக்கம் போகாதீங்க, மண் சரிவு வரலாம். உடனே பாதுகாப்பான இடத்திற்கு செல்லுங்கள்!',
    phoneticText: 'Aabathu! Andha mala pakkam pogatheenga, mannu sarivu varalam. Udane paadhukaappaana idathirkku sellungal!',
    safeRouteAlert: 'பாதுகாப்பான பாதை கணக்கிடப்பட்டது. அபாய மண்டலங்களை தவிர்க்கிறது.'
  },
  ml: {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    listenBtnLabel: 'കേൾക്കൂ / LISTEN',
    speakerLabel: 'ശബ്ദ മുന്നറിയിപ്പ്',
    dangerAlertText: 'അപകടം! ആ മലയുടെ അടുത്തേക്ക് പോകരുത്, ഉരുൾപൊട്ടൽ ഉണ്ടാകാം. ഉടൻ സുരക്ഷിതമായ സ്ഥലത്തേക്ക് മാറുക!',
    phoneticText: 'Apakadam! Aa malayude aduthekk pokaruth, urul pottal undaakaam. Udan surakshithamaaya sthalaththekk maaruka!',
    safeRouteAlert: 'സുരക്ഷിതമായ പാത കണ്ടെത്തി. അപകട മേഖലകൾ ഒഴിവാക്കി സഞ്ചരിക്കുക.'
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    listenBtnLabel: 'सुनिए / LISTEN',
    speakerLabel: 'ध्वनि चेतावनी',
    dangerAlertText: 'खतरा! उस पहाड़ी की तरफ मत जाइए, भूस्खलन हो सकता है। तुरंत सुरक्षित स्थान पर जाएं!',
    phoneticText: 'Khatra! Us pahaadi ki taraf mat jaaiye, bhooskhalan ho sakta hai. Turant surakshit sthaan par jaayein!',
    safeRouteAlert: 'सुरक्षित मार्ग तैयार है। भूस्खलन खतरे वाले क्षेत्रों से बचा गया है।'
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    listenBtnLabel: 'LISTEN / PLAY ALERT',
    speakerLabel: 'AI Voice Broadcast',
    dangerAlertText: 'Danger! Do not go near the mountain slope, a landslide may occur. Move to a safe location immediately!',
    phoneticText: 'Danger! Do not go near the mountain slope, a landslide may occur. Move to a safe location immediately!',
    safeRouteAlert: 'Safe route calculated. All active landslide danger zones are avoided.'
  }
};

let activeUtterance: SpeechSynthesisUtterance | null = null;

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      activeUtterance = null;
    } catch (e) {
      console.warn('Speech cancellation error:', e);
    }
  }
};

export const speakAlert = (
  lang: SupportedLanguage,
  customText?: string,
  isSeniorMode: boolean = false,
  onEndCallback?: () => void
): boolean => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Web Speech API is not supported in this browser.');
    return false;
  }

  try {
    stopSpeech();

    const config = LANGUAGE_CONFIGS[lang] || LANGUAGE_CONFIGS.en;
    const textToSpeak = customText || config.dangerAlertText;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    activeUtterance = utterance;

    // Set voice language tags
    const langMap: Record<SupportedLanguage, string> = {
      ta: 'ta-IN',
      ml: 'ml-IN',
      hi: 'hi-IN',
      en: 'en-IN'
    };

    utterance.lang = langMap[lang] || 'en-US';

    // Senior citizen mode: slightly slower rate and maximum volume for clarity
    if (isSeniorMode) {
      utterance.rate = 0.88; // Slower, clearer speech
      utterance.pitch = 1.05;
      utterance.volume = 1.0; // Max volume
    } else {
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.volume = 0.95;
    }

    // Try finding matching installed voices
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const targetPrefix = langMap[lang]?.toLowerCase() || 'en';
      const matchedVoice = voices.find(v => 
        v.lang.toLowerCase().startsWith(targetPrefix.slice(0, 2)) ||
        v.lang.toLowerCase().includes(targetPrefix)
      );

      if (matchedVoice) {
        utterance.voice = matchedVoice;
      } else if (lang !== 'en') {
        // If native regional voice isn't installed on device, speak phonetic version with default voice
        const fallbackVoice = voices.find(v => v.lang.startsWith('en-IN')) || voices[0];
        if (fallbackVoice) {
          utterance.voice = fallbackVoice;
          if (!customText) {
            utterance.text = config.phoneticText;
          }
        }
      }
    }

    utterance.onend = () => {
      activeUtterance = null;
      if (onEndCallback) onEndCallback();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      activeUtterance = null;
      if (onEndCallback) onEndCallback();
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.error('Failed to trigger speech:', err);
    return false;
  }
};
