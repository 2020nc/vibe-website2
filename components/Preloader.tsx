'use client';

import { useEffect, useRef, useState } from 'react';

const INITIAL_SHOW_DURATION_MS = 700;
const INITIAL_FADE_DURATION_MS = 250;
const LOGO_SHOW_DURATION_MS = 450;
const LOGO_FADE_DURATION_MS = 180;
const PRELOADER_EVENT = 'vibe-preloader:show';

export default function Preloader() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const enterTimerRef = useRef<number | null>(null);
  const exitTimerRef = useRef<number | null>(null);

  const startSequence = (showDuration: number, fadeDuration: number) => {
    if (enterTimerRef.current !== null) {
      window.clearTimeout(enterTimerRef.current);
    }

    if (exitTimerRef.current !== null) {
      window.clearTimeout(exitTimerRef.current);
    }

    setIsVisible(true);
    setIsLeaving(false);

    enterTimerRef.current = window.setTimeout(() => {
      setIsLeaving(true);

      exitTimerRef.current = window.setTimeout(() => {
        setIsVisible(false);
      }, fadeDuration);
    }, showDuration);
  };

  useEffect(() => {
    const handleShowPreloader = () => {
      startSequence(LOGO_SHOW_DURATION_MS, LOGO_FADE_DURATION_MS);
    };

    window.addEventListener(PRELOADER_EVENT, handleShowPreloader);

    return () => {
      window.removeEventListener(PRELOADER_EVENT, handleShowPreloader);

      if (enterTimerRef.current !== null) {
        window.clearTimeout(enterTimerRef.current);
      }

      if (exitTimerRef.current !== null) {
        window.clearTimeout(exitTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    startSequence(INITIAL_SHOW_DURATION_MS, INITIAL_FADE_DURATION_MS);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.12),transparent_18%),linear-gradient(135deg,#28b8b2_0%,#1fa6a1_38%,#5db6a9_66%,#ff8b2a_100%)] transition-opacity duration-[180ms] ${
        isLeaving ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'
      }`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.14),transparent_28%),radial-gradient(circle_at_68%_58%,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_82%_88%,rgba(255,201,120,0.24),transparent_24%)]" />

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center px-6 text-center text-white">
        <div className="mb-5 flex h-32 w-32 items-center justify-center rounded-full bg-white/8 shadow-[0_0_60px_rgba(255,255,255,0.12)] backdrop-blur-[2px]">
          <div className="text-7xl drop-shadow-[0_8px_12px_rgba(0,0,0,0.28)] animate-[preloaderFloat_1.2s_ease-in-out_infinite]">
            ☕
          </div>
        </div>

        <div className="mt-6 h-[5px] w-full max-w-[220px] overflow-hidden rounded-full bg-white/30">
          <div className="h-full w-full origin-left rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.38)] animate-[preloaderBar_0.8s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
