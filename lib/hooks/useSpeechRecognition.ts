'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type SpeechRecognitionResultLike = {
  isFinal: boolean;
  0: {
    transcript: string;
  };
};

type SpeechRecognitionEventLike = Event & {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

type SpeechRecognitionLike = EventTarget & {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: Event & { error?: string }) => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  start: () => void;
  stop: () => void;
};

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export function useSpeechRecognition() {
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const SpeechRecognitionApi = useMemo(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
  }, []);

  useEffect(() => {
    if (!SpeechRecognitionApi) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);

    const recognition = new SpeechRecognitionApi();
    recognition.lang = 'ro-RO';
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setError(null);
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      setIsListening(false);

      if (event.error === 'not-allowed') {
        setError('Microfonul este blocat in browser.');
        return;
      }

      if (event.error === 'no-speech') {
        setError('Nu am auzit nimic. Incearca din nou.');
        return;
      }

      if (event.error === 'audio-capture') {
        setError('Nu gasesc un microfon activ.');
        return;
      }

      setError('Dictarea vocala nu a mers. Incearca din nou.');
    };

    recognition.onresult = (event) => {
      let nextTranscript = '';

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        nextTranscript += event.results[index][0].transcript;
      }

      setTranscript(nextTranscript.trim());
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, [SpeechRecognitionApi]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current || isListening) {
      return;
    }

    setTranscript('');
    setError(null);
    recognitionRef.current.start();
  }, [isListening]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  return {
    error,
    isListening,
    isSupported,
    resetTranscript,
    startListening,
    stopListening,
    transcript,
  };
}
