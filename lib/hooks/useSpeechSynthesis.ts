'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);

    const synth = window.speechSynthesis;

    const loadVoices = () => {
      voicesRef.current = synth.getVoices();
    };

    loadVoices();
    synth.addEventListener?.('voiceschanged', loadVoices);

    return () => {
      synth.removeEventListener?.('voiceschanged', loadVoices);
    };
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!isSupported) return;

      // Oprește orice redare activă
      window.speechSynthesis.cancel();

      // Curăță markdown din text înainte de redare
      const cleanText = text
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/\n/g, ' ');

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ro-RO';
      utterance.rate = 0.82;   // calm, fără grabă
      utterance.pitch = 0.88;  // ton cald, mai jos — mai puțin strident

      // Selectează o voce feminină dacă e disponibilă
      const voices = voicesRef.current.length > 0
        ? voicesRef.current
        : window.speechSynthesis.getVoices();

      // Prioritate: voce feminină română > orice voce română > voce feminină en > default
      const femaleRo = voices.find(
        (v) => v.lang.startsWith('ro') && /female|woman|andra|ioana|diana/i.test(v.name)
      );
      const anyRo = voices.find((v) => v.lang.startsWith('ro'));
      const femaleEn = voices.find(
        (v) => v.lang.startsWith('en') && /female|woman|samantha|karen|moira|victoria|fiona/i.test(v.name)
      );

      const selectedVoice = femaleRo ?? anyRo ?? femaleEn ?? null;
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        // Dacă folosim voce engleză, nu forțăm ro-RO ca lang
        if (!selectedVoice.lang.startsWith('ro')) {
          utterance.lang = selectedVoice.lang;
        }
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [isSupported]
  );

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  return { speak, stop, isSpeaking, isSupported };
}
