// Persistent reference to prevent garbage collection on Mobile Safari/Chrome
let currentUtterance: SpeechSynthesisUtterance | null = null;

export const speakThai = (text: string, onStart?: () => void, onEnd?: () => void) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported on this browser');
    return;
  }

  // Cancel any previous speech
  window.speechSynthesis.cancel();

  // Resume synthesis if it was suspended by mobile browser
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'th-TH';
  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  // Try finding Thai voice
  const voices = window.speechSynthesis.getVoices();
  const thaiVoice = voices.find(
    v => v.lang === 'th-TH' || v.lang === 'th_TH' || v.lang.toLowerCase().startsWith('th') || v.name.includes('Thai')
  );
  if (thaiVoice) {
    utterance.voice = thaiVoice;
  }

  utterance.onstart = () => {
    onStart?.();
  };

  utterance.onend = () => {
    currentUtterance = null;
    onEnd?.();
  };

  utterance.onerror = (e) => {
    console.warn('TTS error or cancelled:', e);
    currentUtterance = null;
    onEnd?.();
  };

  // Keep reference on window to prevent premature garbage collection
  currentUtterance = utterance;
  (window as any).__ttsUtterance = utterance;

  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};