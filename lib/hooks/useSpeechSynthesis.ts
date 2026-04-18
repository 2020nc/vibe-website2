'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

function normalizeSpeechText(text: string) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\b([01]?\d|2[0-3]):([0-5]\d)\b/g, (_match, hours, minutes) => {
      const normalizedHours = String(Number(hours));
      if (minutes === '00') {
        return `ora ${normalizedHours}`;
      }

      return `ora ${normalizedHours} si ${minutes}`;
    })
    .replace(/\bcosta\b/g, 'costa')
    .replace(/\bexista\b/g, 'exista')
    .replace(/\bpoti\b/gi, 'poti')
    .replace(/\bvrei\b/gi, 'vrei')
    .replace(/\bonline\b/gi, 'onlain')
    .replace(/\bcold brew\b/gi, 'cold bru')
    .replace(/\bnitro cold brew\b/gi, 'nitro cold bru')
    .replace(/\biced latte\b/gi, 'aised latte')
    .replace(/\biced\b/gi, 'aised')
    .replace(/\bflat white\b/gi, 'flat uait')
    .replace(/\boat milk\b/gi, 'out milk')
    .replace(/\balmond\b/gi, 'almond')
    .replace(/\bbarista\b/gi, 'barista')
    .replace(/\bcappuccino\b/gi, 'capucino')
    .replace(/\baffogato\b/gi, 'afogato')
    .replace(/\bbrownie\b/gi, 'brauni')
    .replace(/\bcroissant\b/gi, 'cruasant')
    .replace(/\bwifi\b/gi, 'uai fai')
    .replace(/\bwi-fi\b/gi, 'uai fai')
    .replace(/\bpet.friendly\b/gi, 'pet frendli')
    .replace(/\btakeaway\b/gi, 'teicauei')
    .replace(/\btake.away\b/gi, 'teicauei')
    .replace(/\bhey\b/gi, 'Salut')
    .replace(/\bhello\b/gi, 'Salut')
    .replace(/\bhi\b/gi, 'Salut')
    .replace(/\bokay\b/gi, 'Bine')
    .replace(/\bok\b/gi, 'Bine')
    .replace(/\bwow\b/gi, 'Uau')
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, ' ')
    .replace(/[\u{2600}-\u{27BF}]/gu, ' ')
    .replace(/[•→⇒★☆◆◇▪▫⬤◦]/g, ' ')
    .replace(/\bBld\.\s*/gi, 'Bulevardul ')
    .replace(/\bBd\.\s*/gi, 'Bulevardul ')
    .replace(/\bStr\.\s*/gi, 'Strada ')
    .replace(/\bNr\.\s*/gi, 'numarul ')
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
    .replace(/\bL-V\b/gi, 'Luni pana Vineri')
    .replace(/\bS-D\b/gi, 'Sambata pana Duminica')
    .replace(/\s*([!?])\s*/g, '$1 ')
    .replace(/\s*([,:;])\s*/g, '$1 ')
    .replace(/\s+/g, ' ')
    .trim();
}

type SpeakOptions = {
  onBoundary?: (
    event: SpeechSynthesisEvent,
    progress: { spokenText: string; spokenWordCount: number }
  ) => void;
  onEnd?: () => void;
  onStart?: () => void;
};

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const speakOptionsRef = useRef<SpeakOptions | null>(null);

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
    (text: string, options?: SpeakOptions) => {
      if (!isSupported) return;

      window.speechSynthesis.cancel();
      speakOptionsRef.current = options ?? null;

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
      const selectedVoice = femaleRo ?? anyRo ?? null;
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        speakOptionsRef.current?.onStart?.();
      };
      utterance.onboundary = (event) => {
        const spokenLength = event.charIndex + (event.charLength ?? 0);
        const spokenText = cleanText.slice(0, spokenLength);
        const spokenWordCount = (spokenText.match(/\S+\s*/g) ?? []).length;

        speakOptionsRef.current?.onBoundary?.(event, {
          spokenText,
          spokenWordCount,
        });
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        speakOptionsRef.current?.onEnd?.();
        speakOptionsRef.current = null;
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        speakOptionsRef.current = null;
      };

      window.speechSynthesis.speak(utterance);
    },
    [isSupported]
  );

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    speakOptionsRef.current = null;
  }, [isSupported]);

  return { speak, stop, isSpeaking, isSupported };
}
