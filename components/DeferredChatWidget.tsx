'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const ChatWidget = dynamic(() => import('@/components/ChatWidget'), {
  ssr: false,
});

export default function DeferredChatWidget() {
  const [shouldMount, setShouldMount] = useState(false);

  if (shouldMount) {
    return <ChatWidget initiallyOpen />;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={() => setShouldMount(true)}
        aria-label="Deschide asistentul virtual Vibe"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white shadow-2xl transition-all duration-300 hover:scale-110"
      >
        <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
          <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
        </svg>
      </button>

      <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--secondary)] text-xs font-bold text-white">
        1
      </div>
    </div>
  );
}
