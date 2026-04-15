'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const FEMALE_VOICE_PATTERNS = [
  /andreea/i,
  /ioana/i,
  /alina/i,
  /ana/i,
  /female/i,
  /woman/i,
  /aria/i,
  /samantha/i,
  /victoria/i,
  /zira/i,
  /libby/i,
  /sonia/i,
  /ava/i,
  /serena/i,
  /fiona/i,
  /moira/i,
  /karen/i,
];

const PREFERRED_FEMALE_VOICE_NAMES = [
  'Microsoft Andreea Online (Natural) - Romanian (Romania)',
  'Microsoft Andreea - Romanian (Romania)',
  'Microsoft Alina Online (Natural)',
  'Microsoft Sonia Online (Natural) - English (United Kingdom)',
  'Microsoft Aria Online (Natural) - English (United States)',
  'Microsoft Ana Online (Natural)',
  'Google UK English Female',
  'Google US English',
  'Samantha',
  'Victoria',
  'Moira',
  'Karen',
  'Zira',
];

function isFemaleLikeVoice(voice: SpeechSynthesisVoice) {
  return FEMALE_VOICE_PATTERNS.some((pattern) => pattern.test(voice.name));
}

function findPreferredVoice(voices: SpeechSynthesisVoice[]) {
  const exactPreferred = PREFERRED_FEMALE_VOICE_NAMES
    .map((name) => voices.find((voice) => voice.name === name))
    .find(Boolean);

  if (exactPreferred) {
    return exactPreferred;
  }

  const femaleRo = voices.find((voice) => voice.lang.startsWith('ro') && isFemaleLikeVoice(voice));
  if (femaleRo) {
    return femaleRo;
  }

  const femaleEn = voices.find((voice) => voice.lang.startsWith('en') && isFemaleLikeVoice(voice));
  if (femaleEn) {
    return femaleEn;
  }

  const anyRo = voices.find((voice) => voice.lang.startsWith('ro'));
  if (anyRo) {
    return anyRo;
  }

  return voices.find(isFemaleLikeVoice) ?? null;
}

export function useSpeechSynthesisV2() {
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

      const cleanText = text
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/\n/g, ' ');

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ro-RO';
      utterance.rate = 0.92;
      utterance.pitch = 1.12;

      const voices =
        voicesRef.current.length > 0 ? voicesRef.current : window.speechSynthesis.getVoices();

      const selectedVoice = findPreferredVoice(voices);
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
