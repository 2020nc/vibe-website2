/**
 * NAVIGATION - Sticky navigation cu blur effect
 * MODERN: Position fixed, backdrop-filter blur, shrink on scroll
 */

'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const ThemeToggle = dynamic(() => import('./ThemeToggle'), {
  ssr: false,
});

const NAV_SECTIONS = ['menu', 'de-ce-vibe', 'features', 'sarbatori', 'footer'];

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAdminRoute = pathname?.startsWith('/admin');
  const isHomePage = pathname === '/';
  const isReservationRoute = pathname?.startsWith('/rezervari');
  const shouldRenderNav = !isAdminRoute && !isReservationRoute;
  const shouldReserveSpace = shouldRenderNav && pathname !== '/';

  useEffect(() => {
    if (!shouldRenderNav) return;

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [shouldRenderNav]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!shouldRenderNav || !isHomePage) {
      setActiveSection('');
      return;
    }

    const observers: IntersectionObserver[] = [];
    NAV_SECTIONS.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.1, rootMargin: '-60px 0px -40% 0px' }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [isHomePage, shouldRenderNav]);

  if (!shouldRenderNav) return null;

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-100 bg-white/95 py-4 shadow-sm backdrop-blur-md transition-all duration-300 dark:border-[#5A3A22] dark:bg-[#1A120C]/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <Link href="/" className="group flex items-center gap-2">
            <svg
              className={`text-primary transition-all duration-300 ${isScrolled ? 'h-8 w-8' : 'h-10 w-10'}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5a8.25 8.25 0 0 0 15 0" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5h1.875A1.125 1.125 0 0 1 22.5 11.625v0a3.375 3.375 0 0 1-3.375 3.375H19.5" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18h12" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21h9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18v3" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 18v3" />
            </svg>
            <span
              className="text-xl font-bold text-gray-900 transition-all duration-300 dark:text-gray-100"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Vibe Caffè
            </span>
          </Link>

          <div className="hidden items-center gap-6 text-gray-900 dark:text-gray-100 md:flex">
            <Link href="/meniu#produse" className="rounded-full px-3 py-1.5 font-semibold transition-all duration-200 hover:text-primary">
              Meniu
            </Link>

            <Link
              href="/#de-ce-vibe"
              className={`rounded-full px-3 py-1.5 font-semibold transition-all duration-200 ${
                activeSection === 'de-ce-vibe' ? 'bg-primary text-white shadow-sm' : 'hover:text-primary'
              }`}
              style={{ color: activeSection === 'de-ce-vibe' ? undefined : 'inherit' }}
            >
              De ce Vibe?
            </Link>

            <Link href="/locatie#harta" className="rounded-full px-3 py-1.5 font-semibold transition-all duration-200 hover:text-primary">
              Locație
            </Link>

            <ThemeToggle />

            <div className="flex flex-col items-center gap-1">
              <Link
                href="/rezervari"
                className="rounded-full bg-primary px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-primary-dark"
              >
                Rezervă Masă
              </Link>

              <div className="flex gap-2">
                <a
                  href="tel:+40721234567"
                  className="rounded-full bg-orange-200 px-2.5 py-1 text-xs font-semibold text-orange-900 transition-colors hover:bg-orange-300"
                >
                  Sună
                </a>
                <a
                  href="https://wa.me/40721234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700 transition-colors hover:bg-green-200"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? 'Închide meniul de navigare' : 'Deschide meniul de navigare'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            className="text-gray-900 dark:text-gray-100 md:hidden"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div
            id="mobile-navigation-menu"
            className="border-t border-gray-100 bg-white/95 px-6 py-4 shadow-sm dark:border-[#5A3A22] dark:bg-[#1A120C]/95 md:hidden"
          >
            <div className="flex flex-col gap-3 text-gray-900 dark:text-gray-100">
              <Link href="/meniu#produse" className="rounded-xl px-3 py-2 font-semibold hover:bg-gray-100 dark:hover:bg-[#2D1A0A]">
                Meniu
              </Link>
              <Link href="/#de-ce-vibe" className="rounded-xl px-3 py-2 font-semibold hover:bg-gray-100 dark:hover:bg-[#2D1A0A]">
                De ce Vibe?
              </Link>
              <Link href="/locatie#harta" className="rounded-xl px-3 py-2 font-semibold hover:bg-gray-100 dark:hover:bg-[#2D1A0A]">
                Locație
              </Link>
              <Link href="/rezervari" className="rounded-xl bg-primary px-3 py-3 text-center font-semibold text-white hover:bg-primary-dark">
                Rezervă Masă
              </Link>
              <div className="flex items-center justify-between pt-2">
                <ThemeToggle />
                <div className="flex gap-2">
                  <a href="tel:+40721234567" className="rounded-full bg-orange-200 px-3 py-1.5 text-xs font-semibold text-orange-900">
                    Sună
                  </a>
                  <a
                    href="https://wa.me/40721234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {shouldReserveSpace && <div aria-hidden="true" className={isMobileMenuOpen ? 'h-[20rem] md:h-28' : 'h-24 md:h-28'} />}
    </>
  );
}
