// Web Audio API emergency acoustic synthesizer
// Runs locally without external audio files or network requests

let audioCtx: AudioContext | null = null;
let sirenOscillator: OscillatorNode | null = null;
let sirenModulator: OscillatorNode | null = null;
let sirenGain: GainNode | null = null;
let isSirenActive = false;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Starts a realistic dual-tone disaster warning siren
 */
export function startSiren(): boolean {
  if (isSirenActive) return true;
  
  try {
    const ctx = getAudioContext();
    
    // Main Carrier Oscillator
    sirenOscillator = ctx.createOscillator();
    sirenOscillator.type = 'sawtooth';
    sirenOscillator.frequency.setValueAtTime(650, ctx.currentTime);

    // Modulator for siren sweeping frequency (0.6 Hz sweep between 550Hz and 950Hz)
    sirenModulator = ctx.createOscillator();
    sirenModulator.type = 'sine';
    sirenModulator.frequency.setValueAtTime(0.7, ctx.currentTime);

    const modGain = ctx.createGain();
    modGain.gain.setValueAtTime(250, ctx.currentTime);

    sirenModulator.connect(modGain);
    modGain.connect(sirenOscillator.frequency);

    // Master volume gain for siren
    sirenGain = ctx.createGain();
    sirenGain.gain.setValueAtTime(0.01, ctx.currentTime);
    sirenGain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.5);

    // Low-pass filter to soften sawtooth harshness
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, ctx.currentTime);

    sirenOscillator.connect(filter);
    filter.connect(sirenGain);
    sirenGain.connect(ctx.destination);

    sirenOscillator.start();
    sirenModulator.start();
    isSirenActive = true;
    return true;
  } catch (err) {
    console.warn("Audio Context init blocked or unavailable:", err);
    return false;
  }
}

/**
 * Stops the siren
 */
export function stopSiren() {
  if (!isSirenActive) return;
  try {
    if (sirenGain && audioCtx) {
      sirenGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);
      setTimeout(() => {
        try {
          sirenOscillator?.stop();
          sirenModulator?.stop();
          sirenOscillator?.disconnect();
          sirenModulator?.disconnect();
        } catch {
          // ignore cleanup errors
        }
        isSirenActive = false;
      }, 350);
    } else {
      isSirenActive = false;
    }
  } catch {
    isSirenActive = false;
  }
}

export function isSirenRunning(): boolean {
  return isSirenActive;
}

/**
 * Tactical radio chirp for alert dispatches and node updates
 */
export function playAlertChirp() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) {
    console.warn("Audio playback skipped", e);
  }
}

/**
 * Emergency broadcast 3-tone warning chime
 */
export function playBroadcastTone() {
  try {
    const ctx = getAudioContext();
    const notes = [659.25, 587.33, 523.25]; // E5, D5, C5
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + idx * 0.14;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.13);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.14);
    });
  } catch (e) {
    console.warn("Audio tone skipped", e);
  }
}
