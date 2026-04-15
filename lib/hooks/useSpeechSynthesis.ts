'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

function normalizeSpeechText(text: string) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, ' ')
    .replace(/[\u{2600}-\u{27BF}]/gu, ' ')
    .replace(/[•→⇒★☆◆◇▪▫⬤◦]/g, ' ')
    .replace(/\bBld\.\s*/gi, 'Bulevardul ')
    .replace(/\bBd\.\s*/gi, 'Bulevardul ')
    .replace(/\bStr\.\s*/gi, 'Strada ')
    .replace(/\bNr\.\s*/gi, 'numărul ')
    .replace(/\bbl\.\s*/gi, 'blocul ')
    .replace(/\bsc\.\s*/gi, 'scara ')
    .replace(/\bap\.\s*/gi, 'apartamentul ')
    .replace(/\bTel\.\s*/gi, 'telefon ')
    .replace(/\btel\.\s*/gi, 'telefon ')
    .replace(/\bDr\.\s*/gi, 'doctor ')
    .replace(/\bProf\.\s*/gi, 'profesor ')
    .replace(/\bsect\.\s*/gi, 'sectorul ')
    .replace(/\bS\.R\.L\.?\b/gi, 'S R L')
    .replace(/\bRON\b/gi, 'lei')
    .replace(/\bTVA\b/gi, 'T V A')
    .replace(/(\d+)\s*ml\b/gi, '$1 mililitri')
    .replace(/(\d+)\s*g\b/gi, '$1 grame')
    .replace(/(\d+)\s*kg\b/gi, '$1 kilograme')
    .replace(/(\d+)\s*min\b/gi, '$1 minute')
    .replace(/(\d+)\s*h\b/gi, '$1 ore')
    .replace(/\bL-V\b/gi, 'Luni până Vineri')
    .replace(/\bS-D\b/gi, 'Sâmbătă până Duminică')
    .replace(/\s+/g, ' ')
    .trim();
}

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

      window.speechSynthesis.cancel();

      const cleanText = normalizeSpeechText(text.replace(/\n/g, ' '));

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ro-RO';
      utterance.rate = 0.82;
      utterance.pitch = 0.88;

      const voices =
        voicesRef.current.length > 0
          ? voicesRef.current
          : window.speechSynthesis.getVoices();

      const femaleRo = voices.find(
        (voice) => voice.lang.startsWith('ro') && /female|woman|andra|ioana|diana/i.test(voice.name)
      );
      const anyRo = voices.find((voice) => voice.lang.startsWith('ro'));
      const femaleEn = voices.find(
        (voice) =>
          voice.lang.startsWith('en') &&
          /female|woman|samantha|karen|moira|victoria|fiona/i.test(voice.name)
      );

      const selectedVoice = femaleRo ?? anyRo ?? femaleEn ?? null;
      if (selectedVoice) {
        utterance.voice = selectedVoice;
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
