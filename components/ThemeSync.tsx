'use client';

import { useEffect, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

const applyStoredTheme = () => {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.classList.remove('dark');
    }
  } catch {}
};

export default function ThemeSync() {
  const pathname = usePathname();

  // useLayoutEffect rulează înainte de paint — elimină flash-ul
  useLayoutEffect(() => {
    applyStoredTheme();
  }, [pathname]);

  // Fallback pentru SSR (useLayoutEffect nu rulează pe server)
  useEffect(() => {
    applyStoredTheme();
  }, [pathname]);

  return null;
}
