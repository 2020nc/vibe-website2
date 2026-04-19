'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ScrollAnimations = dynamic(() => import('@/components/ScrollAnimations'), {
  ssr: false,
});

type IdleCallbackHandle = number;

type IdleCallbackDeadline = {
  didTimeout: boolean;
  timeRemaining: () => number;
};

type WindowWithIdleCallback = Window & {
  cancelIdleCallback?: (handle: IdleCallbackHandle) => void;
  requestIdleCallback?: (
    callback: (deadline: IdleCallbackDeadline) => void,
    options?: { timeout: number }
  ) => IdleCallbackHandle;
};

const INTERACTION_EVENTS: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'touchstart'];

export default function DeferredScrollAnimations() {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (shouldMount) return;

    const windowWithIdleCallback = window as WindowWithIdleCallback;
    let mounted = false;
    let timeoutId: number | null = null;
    let idleId: IdleCallbackHandle | null = null;

    const mountAnimations = () => {
      if (mounted) return;
      mounted = true;
      setShouldMount(true);
    };

    INTERACTION_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, mountAnimations, { passive: true, once: true });
    });

    if (typeof windowWithIdleCallback.requestIdleCallback === 'function') {
      idleId = windowWithIdleCallback.requestIdleCallback(() => {
        mountAnimations();
      }, { timeout: 1500 });
    }

    timeoutId = window.setTimeout(() => {
      mountAnimations();
    }, 1500);

    return () => {
      INTERACTION_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, mountAnimations);
      });

      if (idleId !== null && typeof windowWithIdleCallback.cancelIdleCallback === 'function') {
        windowWithIdleCallback.cancelIdleCallback(idleId);
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [shouldMount]);

  if (!shouldMount) return null;

  return <ScrollAnimations />;
}
