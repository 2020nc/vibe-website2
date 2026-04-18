'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ChatWidget = dynamic(() => import('@/components/ChatWidget'), {
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

export default function DeferredChatWidget() {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (shouldMount) return;

    const windowWithIdleCallback = window as WindowWithIdleCallback;
    let mounted = false;
    let timeoutId: number | null = null;
    let idleId: IdleCallbackHandle | null = null;

    const mountWidget = () => {
      if (mounted) return;
      mounted = true;
      setShouldMount(true);
    };

    const cleanupInteractionListeners = () => {
      INTERACTION_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, mountWidget);
      });
    };

    INTERACTION_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, mountWidget, { passive: true, once: true });
    });

    if (typeof windowWithIdleCallback.requestIdleCallback === 'function') {
      idleId = windowWithIdleCallback.requestIdleCallback(() => {
        mountWidget();
      }, { timeout: 2500 });
    }

    timeoutId = window.setTimeout(() => {
      mountWidget();
    }, 2500);

    return () => {
      cleanupInteractionListeners();

      if (idleId !== null && typeof windowWithIdleCallback.cancelIdleCallback === 'function') {
        windowWithIdleCallback.cancelIdleCallback(idleId);
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [shouldMount]);

  if (!shouldMount) return null;

  return <ChatWidget />;
}
