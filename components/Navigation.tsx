/**
 * 🧭 NAVIGATION - Sticky navigation cu blur effect
 * MODERN: Position fixed, backdrop-filter blur, shrink on scroll
 */

'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const NAV_SECTIONS = ['menu', 'de-ce-vibe', 'features', 'sarbatori', 'footer'];

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  if (pathname?.startsWith('/admin')) return null;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.1, rootMargin: '-60px 0px -40% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300" style={{ backgroundColor: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)', boxShadow: '0 1px 8px rgba(0,0,0,0.08)' }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <svg className={`transition-all duration-300 ${
            isScrolled ? 'w-8 h-8' : 'w-10 h-10'
          } text-primary`} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5a8.25 8.25 0 0 0 15 0" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5h1.875A1.125 1.125 0 0 1 22.5 11.625v0a3.375 3.375 0 0 1-3.375 3.375H19.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18h12" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21h9" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 18v3" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 18v3" />
          </svg>
          <span className="font-bold text-xl transition-all duration-300" style={{ color: '#111827', fontFamily: 'var(--font-playfair)' }}
          >
            Vibe Caffè
          </span>
        </Link>

        {/* Menu Links */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="/meniu"
            className="font-semibold transition-all duration-200 px-3 py-1.5 rounded-full hover:text-primary"
            style={{ color: '#111827' }}
          >
            Meniu
          </a>
          <a
            href="/#de-ce-vibe"
            className={`font-semibold transition-all duration-200 px-3 py-1.5 rounded-full ${
              activeSection === 'de-ce-vibe' ? 'bg-primary text-white shadow-sm' : 'hover:text-primary'
            }`}
            style={{ color: activeSection === 'de-ce-vibe' ? undefined : '#111827' }}
          >
            De ce Vibe?
          </a>
          <a
            href="/locatie"
            className="font-semibold transition-all duration-200 px-3 py-1.5 rounded-full hover:text-primary"
            style={{ color: '#111827' }}
          >
            Locație
          </a>

          {/* DARK MODE TOGGLE */}
          <ThemeToggle />

          <div className="flex flex-col items-center gap-1">
            <a
              href="/rezervari"
              className="px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-primary text-white hover:bg-primary-dark"
            >
              Rezervă Masă
            </a>
            <div className="flex gap-2">
              <a href="tel:+40721234567" className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors">📞 Sună</a>
              <a href="https://wa.me/40721234567" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors">💬 WhatsApp</a>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-900">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
