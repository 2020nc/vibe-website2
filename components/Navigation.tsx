/**
 * 🧭 NAVIGATION - Sticky navigation cu blur effect
 * MODERN: Position fixed, backdrop-filter blur, shrink on scroll
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const NAV_SECTIONS = ['menu', 'features', 'sarbatori', 'footer'];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-black/30 backdrop-blur-sm py-5'
      }`}
    >
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
          <span className={`font-bold transition-all duration-300 ${
            isScrolled ? 'text-xl text-gray-900' : 'text-2xl text-white dark:text-gray-900'
          }`}
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Vibe Coffee
          </span>
        </Link>

        {/* Menu Links */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="#menu"
            className={`font-semibold transition-all duration-200 px-3 py-1.5 rounded-full ${
              activeSection === 'menu'
                ? 'bg-primary text-white shadow-sm'
                : isScrolled
                  ? 'text-gray-900 hover:text-primary'
                  : 'text-white hover:text-primary-dark'
            }`}
          >
            Meniu
          </a>
          <a
            href="/locatie"
            className={`font-semibold transition-all duration-200 px-3 py-1.5 rounded-full ${
              isScrolled ? 'text-gray-900 hover:text-primary' : 'text-white hover:text-primary-dark'
            }`}
          >
            Locație
          </a>

          {/* DARK MODE TOGGLE */}
          <ThemeToggle />

          <a
            href="/rezervari"
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              isScrolled
                ? 'bg-primary text-white hover:bg-primary-dark'
                : 'bg-white text-primary hover:bg-gray-100'
            }`}
          >
            Rezervă Masă
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${isScrolled ? 'text-gray-900' : 'text-white'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
