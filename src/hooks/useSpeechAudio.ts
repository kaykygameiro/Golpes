import { useCallback, useEffect, useState } from 'react';

export function useSpeechAudio() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasSupport, setHasSupport] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setHasSupport(false);
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (!hasSupport || !audioEnabled) return;
    
    // Stop any current speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.85; // Slower for elderly, clearer
    utterance.pitch = 1.0;
    
    // Attempt to pick a higher quality Portuguese voice if available
    const voices = window.speechSynthesis.getVoices();
    const ptVoices = voices.filter(v => v.lang.startsWith('pt-BR'));
    // Usually Google or Microsoft voices are better
    const preferredVoice = ptVoices.find(v => v.name.includes('Google') || v.name.includes('Premium')) || ptVoices[0];
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  }, [hasSupport, audioEnabled]);

  const stop = useCallback(() => {
    if (!hasSupport) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [hasSupport]);

  return { speak, stop, isSpeaking, hasSupport, audioEnabled, setAudioEnabled };
}
