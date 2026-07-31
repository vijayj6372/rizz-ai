"use client";

let audioCtx: AudioContext | null = null;
let clickBuffer: AudioBuffer | null = null;
let isBufferLoading = false;
let lastPlayTime = 0;

/**
 * Get or create singleton AudioContext
 */
function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioCtxClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtxClass) {
      audioCtx = new AudioCtxClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Preload user's custom btnClick.wav audio file into Web Audio API memory
 */
export function preloadClickSound() {
  if (typeof window === "undefined") return;
  const ctx = getAudioContext();
  if (!ctx || clickBuffer || isBufferLoading) return;

  isBufferLoading = true;

  fetch("/audio/btnClick.wav")
    .then((res) => res.arrayBuffer())
    .then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer))
    .then((decoded) => {
      clickBuffer = decoded;
    })
    .catch(() => {
      // Fallback if needed
    })
    .finally(() => {
      isBufferLoading = false;
    });
}

/**
 * Plays the user's custom btnClick.wav sound when pressing buttons across the app
 */
export function playClickSound() {
  if (typeof window === "undefined") return;

  const now = Date.now();
  // Throttle within 35ms to avoid duplicate audio triggers on event propagation
  if (now - lastPlayTime < 35) return;
  lastPlayTime = now;

  const ctx = getAudioContext();

  // Mode 1: Web Audio API decoded buffer (btnClick.wav - instant 0ms latency)
  if (ctx && clickBuffer) {
    try {
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      const source = ctx.createBufferSource();
      const gainNode = ctx.createGain();
      gainNode.gain.value = 0.8; // Full clear volume
      source.buffer = clickBuffer;
      source.connect(gainNode);
      gainNode.connect(ctx.destination);
      source.start(0);
      return;
    } catch {
      // Fall through if buffer source fails
    }
  }

  // Mode 2: HTMLAudioElement fallback with btnClick.wav
  try {
    const audio = new Audio("/audio/btnClick.wav");
    audio.volume = 0.8;
    audio.play().catch(() => {});
  } catch {
    // Audio autoplay policy fallback
  }
}

/**
 * Gentle hover sound variant
 */
export function playHoverSound() {
  if (typeof window === "undefined") return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    const currentTime = ctx.currentTime;
    osc.frequency.setValueAtTime(600, currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, currentTime + 0.04);
    gain.gain.setValueAtTime(0.04, currentTime);
    gain.gain.linearRampToValueAtTime(0.001, currentTime + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(currentTime);
    osc.stop(currentTime + 0.04);
  } catch {
    // Ignore audio context errors
  }
}
