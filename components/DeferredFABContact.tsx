'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const FABContact = dynamic(() => import('@/components/FABContact'), {
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

export default function DeferredFABContact() {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (shouldMount) return;

    const windowWithIdleCallback = window as WindowWithIdleCallback;
    let mounted = false;
    let timeoutId: number | null = null;
    let idleId: IdleCallbackHandle | null = null;

    const mountFab = () => {
      if (mounted) return;
      mounted = true;
      setShouldMount(true);
    };

    INTERACTION_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, mountFab, { passive: true, once: true });
    });

    if (typeof windowWithIdleCallback.requestIdleCallback === 'function') {
      idleId = windowWithIdleCallback.requestIdleCallback(() => {
        mountFab();
      }, { timeout: 2000 });
    }

    timeoutId = window.setTimeout(() => {
      mountFab();
    }, 2000);

    return () => {
      INTERACTION_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, mountFab);
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

  return <FABContact />;
}
