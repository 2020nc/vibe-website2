'use client';

/**
 * FOOTER - Newsletter, social media, linkuri utile
 *
 * Ce face acest component:
 * - Wave SVG separator vizual între conținut și footer
 * - 3 coloane: Brand, Navigare, Newsletter
 * - Social media: Instagram, Facebook, TikTok
 * - Formular newsletter conectat la Supabase via /api/newsletter
 * - Feedback vizual: loading → success/eroare
 */

import { useState } from 'react';
import Link from 'next/link';

export default function FooterStarter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle');

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.status === 409) {
        setStatus('duplicate');
      } else if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <footer id="footer" className="relative">
      {/* Wave separator */}
      <div className="w-full overflow-hidden leading-none bg-white dark:bg-gray-900">
        <svg
          className="relative block w-full h-16"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#1F2937"
          />
        </svg>
      </div>

      {/* Footer content */}
      <div className="bg-gray-800 text-gray-300 pt-4 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Coloana 1 — Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Vibe <span className="text-primary">Coffee</span>
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Cafea de specialitate într-un ambient modern și relaxant.
              Te așteptăm la Bld. Regina Elisabeta 30, București.
            </p>
            {/* Social media */}
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 bg-gray-700 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300"
              >
                {/* Instagram icon */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 bg-gray-700 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300"
              >
                {/* Facebook icon */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="w-10 h-10 bg-gray-700 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300"
              >
                {/* TikTok icon */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Coloana 2 — Navigare */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Navigare</h4>
            <ul className="space-y-3">
              <li>
                <a href="/#menu" className="text-gray-400 hover:text-primary transition-colors duration-200">
                  Meniu
                </a>
              </li>
              <li>
                <Link href="/rezervari" className="text-gray-400 hover:text-primary transition-colors duration-200">
                  Rezervări
                </Link>
              </li>
              <li>
                <Link href="/locatie" className="text-gray-400 hover:text-primary transition-colors duration-200">
                  Locație
                </Link>
              </li>
              <li>
                <a href="/#de-ce-vibe" className="text-gray-400 hover:text-primary transition-colors duration-200">
                  De ce Vibe?
                </a>
              </li>
              <li>
                <Link href="/sarbatori" className="text-gray-400 hover:text-primary transition-colors duration-200">
                  Oferte Sărbători
                </Link>
              </li>
            </ul>

            <h4 className="text-lg font-semibold text-white mt-8 mb-3">Contact</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Bld. Regina Elisabeta, Nr. 30<br />
              Sector 5, București<br />
              <a href="tel:+40721234567" className="hover:text-primary transition-colors">+40 721 234 567</a>
            </p>
          </div>

          {/* Coloana 3 — Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Abonează-te pentru oferte exclusive, noutăți despre meniu și evenimente speciale.
            </p>

            <form onSubmit={handleNewsletter} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="adresa@email.com"
                required
                disabled={status === 'loading' || status === 'success'}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="w-full px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Se trimite...' : 'Abonează-te'}
              </button>
            </form>

            {/* Feedback */}
            {status === 'success' && (
              <p className="mt-3 text-green-400 text-sm">
                Te-ai abonat cu succes! Bine ai venit în comunitatea Vibe.
              </p>
            )}
            {status === 'duplicate' && (
              <p className="mt-3 text-yellow-400 text-sm">
                Acest email este deja abonat.
              </p>
            )}
            {status === 'error' && (
              <p className="mt-3 text-red-400 text-sm">
                Eroare. Te rugăm încearcă din nou.
              </p>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-700 text-center text-gray-500 text-sm space-y-2">
          <div>© 2026 Vibe Caffè. Construit cu Next.js + Tailwind CSS.</div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <a href="/confidentialitate" className="hover:text-gray-300 transition-colors">Politică confidențialitate</a>
            <span>|</span>
            <a href="/cookies" className="hover:text-gray-300 transition-colors">Cookies</a>
            <span>|</span>
            <a href="/termeni" className="hover:text-gray-300 transition-colors">Termeni</a>
            <span>|</span>
            <a href="mailto:contact@vibecaffe.ro" className="hover:text-gray-300 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
