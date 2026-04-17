# Audit Context Codex V2

## Arbore proiect până la nivel 4

```text
|-- .claude
|   |-- settings.json
|   +-- settings.local.json
|-- .vercel
|   |-- project.json
|   +-- README.txt
|-- app
|   |-- admin
|   |   |-- login
|   |   |   |-- layout.tsx
|   |   |   +-- page.tsx
|   |   +-- page.tsx
|   |-- api
|   |   |-- admin
|   |   |   |-- change-password
|   |   |   |-- login
|   |   |   +-- me
|   |   |-- chat
|   |   |   +-- route.ts
|   |   |-- curs
|   |   |   +-- route.ts
|   |   |-- holiday
|   |   |   +-- route.ts
|   |   |-- menu
|   |   |   |-- bulk
|   |   |   +-- route.ts
|   |   |-- menu-settings
|   |   |   +-- route.ts
|   |   |-- newsletter
|   |   |   +-- route.ts
|   |   |-- promo
|   |   |   +-- route.ts
|   |   +-- rezervari
|   |       +-- route.ts
|   |-- confidentialitate
|   |   +-- page.tsx
|   |-- cookies
|   |   +-- page.tsx
|   |-- locatie
|   |   +-- page.tsx
|   |-- meniu
|   |   +-- page.tsx
|   |-- rezervari
|   |   |-- layout.tsx
|   |   +-- page.tsx
|   |-- sarbatori
|   |   +-- page.tsx
|   |-- termeni
|   |   +-- page.tsx
|   |-- favicon.ico
|   |-- globals.css
|   |-- layout.tsx
|   |-- not-found.tsx
|   |-- page.tsx
|   +-- sitemap.ts
|-- checkpoints
|   +-- README.md
|-- components
|   |-- About.tsx
|   |-- ChatWidget.tsx
|   |-- CoffeeLoader.tsx
|   |-- DayAtVibe.tsx
|   |-- FABContact.tsx
|   |-- Features.tsx
|   |-- FeaturesStarter.tsx
|   |-- Footer.tsx
|   |-- FooterStarter.tsx
|   |-- Hero.tsx
|   |-- HeroStarter.tsx
|   |-- HolidayMenu.tsx
|   |-- Menu.tsx
|   |-- MenuStarter.tsx
|   |-- Navigation.tsx
|   |-- Preloader.tsx
|   |-- ReviewBar.tsx
|   |-- ScrollAnimations.tsx
|   |-- SmoothScroll.tsx
|   +-- ThemeToggle.tsx
|-- docs
|   |-- sesiuni
|   |   |-- Backup of documentatie-vibe-caffe.wbk
|   |   |-- Backup of sesiune-2026-04-01.wbk
|   |   |-- Documentatie-vibe-caffe -Claude.pdf
|   |   |-- documentatie-vibe-caffe.docx
|   |   |-- documentatie-vibe-caffe.pdf
|   |   |-- sesiune-2026-03-23.docx
|   |   |-- sesiune-2026-03-23.pdf
|   |   |-- sesiune-2026-03-24-1.docx
|   |   |-- sesiune-2026-03-24-1.pdf
|   |   |-- sesiune-2026-03-24-2.docx
|   |   |-- sesiune-2026-03-24-2.pdf
|   |   |-- sesiune-2026-03-25.docx
|   |   |-- sesiune-2026-03-25.pdf
|   |   |-- sesiune-2026-03-29-1.docx
|   |   |-- sesiune-2026-03-29-1.pdf
|   |   |-- sesiune-2026-03-29-2.docx
|   |   |-- sesiune-2026-03-29-2.pdf
|   |   |-- sesiune-2026-03-29-3.docx
|   |   |-- sesiune-2026-03-29-3.pdf
|   |   |-- sesiune-2026-03-29-4.docx
|   |   |-- sesiune-2026-03-29-4.pdf
|   |   |-- sesiune-2026-03-31-1.docx
|   |   |-- sesiune-2026-03-31-1.pdf
|   |   |-- sesiune-2026-03-31-2.docx
|   |   |-- sesiune-2026-03-31-2.pdf
|   |   |-- sesiune-2026-03-31-3.docx
|   |   |-- sesiune-2026-03-31-3.pdf
|   |   |-- sesiune-2026-03-31-4.docx
|   |   |-- sesiune-2026-03-31-4.pdf
|   |   |-- sesiune-2026-04-01.docx
|   |   |-- sesiune-2026-04-01.pdf
|   |   |-- sesiune-2026-04-03.docx
|   |   |-- sesiune-2026-04-03.pdf
|   |   |-- sesiune-2026-04-04.docx
|   |   |-- sesiune-2026-04-04.pdf
|   |   |-- sesiune-5-bloc-e.docx
|   |   +-- sesiune-5-bloc-e.pdf
|   |-- Backup of descriere-proiect.wbk
|   |-- Backup of prezentare-modul3.wbk
|   |-- Backup of raport-comparatie.wbk
|   |-- cerinte-meniu-modul3.docx
|   |-- cerinte-meniu-modul3.pdf
|   |-- descriere-proiect.docx
|   |-- descriere-proiect.pdf
|   |-- documentatie-profesor.docx
|   |-- documentatie-profesor.pdf
|   |-- documentatie-tehnica-v2.docx
|   |-- documentatie-tehnica-v2.pdf
|   |-- manual-administrator.docx
|   |-- manual-administrator.pdf
|   |-- manual-utilizator.docx
|   |-- manual-utilizator.pdf
|   |-- meniu-vibe-caffe-2026-03-30 (1).xlsx
|   |-- meniu-vibe-caffe-2026-03-30.pdf
|   |-- meniu-vibe-caffe-2026-03-30.xlsx
|   |-- plan-modul4.docx
|   |-- plan-modul4.pdf
|   |-- Prezentare modul3 facilități.docx
|   |-- Prezentare modul3 facilități.pdf
|   |-- prezentare-modul3.docx
|   |-- prezentare-modul3.pdf
|   |-- Proiect-facilități.pdf
|   |-- Proiect-Raport.pdf
|   |-- Raport-activitate-tehnica-Vibe-Caffe-15-04-2026.docx
|   |-- Raport-activitate-tehnica-Vibe-Caffe-15-04-2026.pdf
|   |-- raport-comparatie.docx
|   |-- raport-comparatie.pdf
|   |-- Raport-final-Vibe-Coding-si-CODEX-2026-04-16.docx
|   |-- Raport-final-Vibe-Coding-si-CODEX-2026-04-16.pdf
|   |-- Raport-oficial-Vibe-Coding-si-CODEX-2026-04-16.docx
|   |-- Raport-oficial-Vibe-Coding-si-CODEX-2026-04-16.pdf
|   |-- raport-verificare-vibe-coding-2026-04-16.docx
|   |-- raport-verificare-vibe-coding-2026-04-16.pdf
|   |-- recap-m6-l1.docx
|   |-- recap-m6-l1.pdf
|   |-- recap-m6-l2.docx
|   |-- recap-m6-l2.pdf
|   |-- recap-modul4-sesiune1.docx
|   |-- recap-modul4-sesiune2.docx
|   |-- recap-modul4-sesiune3.docx
|   |-- rezumat-academic-2026-04-15.docx
|   |-- rezumat-academic-2026-04-15.pdf
|   |-- rezumat-explicit-2026-04-15.docx
|   |-- rezumat-explicit-2026-04-15.pdf
|   |-- rezumat-profesionist-activitate-2026-04-17.docx
|   |-- rezumat-profesionist-activitate-2026-04-17.md
|   |-- rezumat-profesionist-activitate-2026-04-17.pdf
|   |-- rezumat-profesoral-2026-04-16.docx
|   |-- rezumat-profesoral-2026-04-16.pdf
|   |-- rezumat-proiect.docx
|   |-- rezumat-proiect.pdf
|   |-- rezumat-pro-v4-2026-04-16.docx
|   |-- rezumat-pro-v4-2026-04-16.pdf
|   |-- sesiune-2026-04-01.docx
|   |-- sesiune-2026-04-01.pdf
|   |-- sesiune-2026-04-03.docx
|   |-- sesiune-2026-04-03.pdf
|   |-- sesiune-2026-04-04.docx
|   |-- sesiune-2026-04-04.pdf
|   |-- sesiune-2026-04-06.docx
|   |-- sesiune-2026-04-06.pdf
|   |-- sesiune-2026-04-09.docx
|   |-- sesiune-2026-04-09.pdf
|   |-- sesiune-2026-04-15.docx
|   |-- sesiune-2026-04-15.pdf
|   |-- sesiune-2026-04-16.docx
|   |-- sesiune-2026-04-16.pdf
|   |-- structura-proiect.docx
|   |-- structura-proiect.pdf
|   +-- supabase-setup.sql
|-- lib
|   |-- hooks
|   |   |-- useScrollAnimation.ts
|   |   |-- useSpeechRecognition.ts
|   |   +-- useSpeechSynthesis.ts
|   |-- knowledge-base.ts
|   |-- menuData.ts
|   +-- supabase.ts
|-- public
|   |-- 2853793-uhd_3840_2160_24fps.mp4
|   |-- arial.ttf
|   |-- arialbd.ttf
|   |-- DejaVuSans.ttf
|   |-- DejaVuSans-Bold.ttf
|   |-- file.svg
|   |-- globe.svg
|   |-- hero-coffee.mp4
|   |-- next.svg
|   |-- og-image.jpg
|   |-- robots.txt
|   |-- vercel.svg
|   +-- window.svg
|-- scripts
|   |-- export-chat.mjs
|   |-- gen-documentatie.mjs
|   |-- gen-documentatie-profesor.mjs
|   |-- gen-documentatie-sesiune5.mjs
|   |-- gen-documentatie-tehnica-v2.mjs
|   |-- generate-descriere-proiect.js
|   |-- generate-docs.js
|   |-- generate-plan-modul4.js
|   |-- generate-prezentare-modul3.js
|   |-- generate-raport-comparatie.js
|   |-- generate-recap-modul4-sesiune1.js
|   |-- generate-recap-modul4-sesiune2.js
|   |-- generate-recap-modul4-sesiune3.js
|   |-- gen-manual-admin.mjs
|   |-- gen-manual-utilizator.mjs
|   |-- gen-raport-final-vibe-coding-codex-2026-04-16.mjs
|   |-- gen-raport-oficial-vibe-coding-codex-2026-04-16.mjs
|   |-- gen-raport-vibe-coding-2026-04-16.mjs
|   |-- gen-rezumat-academic-2026-04-15.mjs
|   |-- gen-rezumat-explicit-2026-04-15.mjs
|   |-- gen-rezumat-profesionist-2026-04-17.mjs
|   |-- gen-rezumat-profesoral-2026-04-15.mjs
|   |-- gen-rezumat-profesoral-2026-04-16.mjs
|   |-- gen-rezumat-proiect.mjs
|   |-- gen-rezumat-pro-v4-2026-04-16.mjs
|   |-- gen-rezumat-sesiune.mjs
|   |-- gen-rezumat-sesiune-04-04.mjs
|   |-- gen-structura.js
|   |-- recap-29-martie.mjs
|   |-- recap-lectia2-modulul3.mjs
|   |-- recap-m6-l1.mjs
|   |-- recap-m6-l2.mjs
|   |-- seed-rezervari.mjs
|   +-- sumar-sesiune-29-martie.mjs
|-- supabase
|   |-- .temp
|   |   |-- cli-latest
|   |   |-- gotrue-version
|   |   |-- pooler-url
|   |   |-- postgres-version
|   |   |-- project-ref
|   |   |-- rest-version
|   |   |-- storage-migration
|   |   +-- storage-version
|   +-- migrations
|       |-- 20260329_create_rezervari.sql
|       |-- 20260330_seed_rezervari.sql
|       |-- 20260401_enable_rls_all_tables.sql
|       |-- 20260409_add_rls_policies.sql
|       +-- 20260416_fix_rezervari_status_constraint.sql
|-- .env.local
|-- .gitignore
|-- audit-context-codex.md
|-- Backup of Recapitulare-29-Martie-2026.wbk
|-- CLAUDE.md
|-- DEPLOYMENT_GUIDE.md
|-- DOCUMENTATIE_CURSANTI.md
|-- eslint.config.mjs
|-- ETAPE_CONSTRUCTIE.md
|-- GHID-3.1-SETUP-SUPABASE.md
|-- GHID-3.2-FORMULAR-SI-API.md
|-- GHID-3.3-ADMIN-SI-DEPLOY.md
|-- Ghid-Recuperare-Vibe-Caffe.docx
|-- Ghid-Recuperare-Vibe-Caffe.pdf
|-- Gmail - Security vulnerabilities detected in your Supabase projects.pdf
|-- MODERNIZATION_GUIDE.md
|-- next.config.ts
|-- next-env.d.ts
|-- package.json
|-- package-lock.json
|-- postcss.config.mjs
|-- PREZENTARE-3.1-BAZA-DE-DATE.md
|-- PREZENTARE-3.2-FORMULAR-REZERVARI.md
|-- PREZENTARE-3.3-ADMIN-SI-DEPLOY.md
|-- Proiect_01.zip
|-- PROJECT_HISTORY.md
|-- proxy.ts
|-- README.md
|-- README-CURS.md
|-- Recapitulare-25-Martie-2026.docx
|-- Recapitulare-25-Martie-2026.pdf
|-- Recapitulare-29-Martie-2026 docx.pdf
|-- Recapitulare-29-Martie-2026.docx
|-- Recapitulare-29-Martie-2026.pdf
|-- Recapitulare-Modulul3-Lectia2.docx
|-- Recapitulare-Modulul3-Lectia2.pdf
|-- rezervari.xlsx
|-- rezervari_rows.csv
|-- Rezumat-Modul3-Lectia3.docx
|-- Rezumat-Modul3-Lectia3.pdf
|-- SESSION-LOG.md
|-- structura-proiect.md
|-- Sumar-Sesiune-29-Martie-2026.docx
|-- Sumar-Sesiune-29-Martie-2026.pdf
|-- tmp_runbook_claude.txt
|-- tsconfig.json
+-- tsconfig.tsbuildinfo
```

## Fișier

Path complet: `K:\Video-Prelucrat\Vibe Coding\Proiect_01\package.json`

De ce e relevant: definește stack-ul aplicației, versiunile de runtime/dependințe și scripturile de rulare/build/lint.

Conținut integral:

```json
{
  "name": "vibe-website",
  "version": "0.1.0",
  "private": true,
  "browserslist": [
    "last 2 Chrome versions",
    "last 2 Edge versions",
    "last 2 Firefox versions",
    "last 2 Safari versions",
    "iOS >= 16",
    "not dead"
  ],
  "scripts": {
    "dev": "next dev --webpack",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.89.0",
    "@supabase/supabase-js": "^2.100.1",
    "canvas-confetti": "^1.9.4",
    "docx": "^9.6.1",
    "jspdf": "^4.2.1",
    "jspdf-autotable": "^5.0.7",
    "lenis": "^1.3.16",
    "next": "^16.2.1",
    "openai": "^6.15.0",
    "pdfkit": "^0.18.0",
    "react": "19.2.1",
    "react-dom": "19.2.1",
    "xlsx": "^0.18.5"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/canvas-confetti": "^1.9.0",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.0.10",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

## Fișier

Path complet: `K:\Video-Prelucrat\Vibe Coding\Proiect_01\next.config.ts`

De ce e relevant: definește configurarea Next.js, în special politica pentru imagini remote folosite în landing page.

Conținut integral:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
```

## Fișier

Path complet: `K:\Video-Prelucrat\Vibe Coding\Proiect_01\app\globals.css`

De ce e relevant: conține design system-ul global, font mapping, dark mode, animații, utilitare pentru hero, hover, scroll și elemente animate pe toată aplicația.

Conținut integral:

```css
@import "tailwindcss";

/* đźŽ‰ HOLIDAY MENU â€” animaČ›ie preČ› tÄiat */
@keyframes strikethrough {
  from { width: 0%; }
  to   { width: 100%; }
}
@keyframes popIn {
  0%   { opacity: 0; transform: scale(0.5); }
  70%  { transform: scale(1.2); }
  100% { opacity: 1; transform: scale(1); }
}

.price-strike {
  position: relative;
  display: inline-block;
}
.price-strike::after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  height: 2px;
  width: 0%;
  background-color: #ef4444;
  animation: strikethrough 1.2s ease-out forwards;
  animation-delay: var(--strike-delay, 0.3s);
}

.price-new {
  opacity: 0;
  animation: popIn 0.4s ease-out forwards;
  animation-delay: var(--pop-delay, 0.9s);
}

/* Scroll smooth global */
html {
  scroll-behavior: smooth;
}

/* Offset 80px pentru navigation bar */
[id] {
  scroll-margin-top: 80px;
}

/* đźŚ™ DARK MODE - Class Strategy (not media query) */
@variant dark (&:where(.dark, .dark *));

/*
  đźŽ¨ VIBE COFFEE SHOP - MODERN CLEAN DESIGN SYSTEM
  - Tipografie: Plus Jakarta Sans (H1-H6, UI) + Inter (body) - 100% Sans-Serif
  - Primary: Teal (#14B8A6) - Fresh, modern
  - Secondary: Orange (#F97316) - Warm, energetic
*/

:root {
  /* Culori principale */
  --primary: #14B8A6;
  --primary-dark: #0D9488;
  --secondary: #F97316;
  --secondary-dark: #EA580C;

  /* Background & Text - Light Mode */
  --background: #FAFAFA;
  --foreground: #1F2937;
  --surface-page: #FAFAFA;
  --surface-card: #FFFFFF;
  --surface-muted: #F9FAFB;
  --text-main: #111827;
  --text-muted: #4B5563;
  --border-subtle: #E5E7EB;

  /* Glassmorphism */
  --glass-bg: rgba(255, 255, 255, 0.85);
  --glass-border: rgba(255, 255, 255, 0.3);
}

/* đźŚ™ DARK MODE */
:is([data-theme='dark'], .dark) {
  --background: #1A0D05;
  --foreground: #FDF0E0;
  --surface-page: #1A0D05;
  --surface-card: #2D1A0A;
  --surface-muted: #241308;
  --text-main: #FDF0E0;
  --text-muted: #F0D9B5;
  --border-subtle: #5A3A22;
  --glass-bg: rgba(45, 26, 10, 0.88);
  --glass-border: rgba(249, 115, 22, 0.15);
}

:is([data-theme='dark'], .dark) body {
  background: linear-gradient(135deg, #1A0D05 0%, #0D0702 100%);
  color: var(--foreground);
}

:is([data-theme='dark'], .dark) .bg-white,
:is([data-theme='dark'], .dark) .bg-gray-50,
:is([data-theme='dark'], .dark) .bg-gray-100,
:is([data-theme='dark'], .dark) .bg-white\/95,
:is([data-theme='dark'], .dark) .bg-white\/90,
:is([data-theme='dark'], .dark) .bg-white\/80,
:is([data-theme='dark'], .dark) .bg-gray-50\/95,
:is([data-theme='dark'], .dark) .bg-gray-50\/90,
:is([data-theme='dark'], .dark) .bg-gray-50\/80 {
  background-color: #2D1A0A !important;
}

:is([data-theme='dark'], .dark) .border-gray-50,
:is([data-theme='dark'], .dark) .border-gray-100,
:is([data-theme='dark'], .dark) .border-gray-200,
:is([data-theme='dark'], .dark) .border-gray-300 {
  border-color: #5A3A22 !important;
}

:is([data-theme='dark'], .dark) .text-gray-900 {
  color: #FDF0E0 !important;
}

:is([data-theme='dark'], .dark) .text-gray-800,
:is([data-theme='dark'], .dark) .text-gray-700 {
  color: #F0D9B5 !important;
}

:is([data-theme='dark'], .dark) .text-gray-600,
:is([data-theme='dark'], .dark) .text-gray-500,
:is([data-theme='dark'], .dark) .text-gray-400 {
  color: #C8A882 !important;
}

.surface-page { background-color: var(--surface-page); }
.surface-card { background-color: var(--surface-card); }
.surface-muted { background-color: var(--surface-muted); }
.text-main { color: var(--text-main); }
.text-muted { color: var(--text-muted); }
.border-subtle { border-color: var(--border-subtle); }

@theme inline {
  --color-primary: var(--primary);
  --color-primary-dark: var(--primary-dark);
  --color-secondary: var(--secondary);
  --color-secondary-dark: var(--secondary-dark);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-heading: var(--font-heading);
  --font-body: var(--font-inter);

  /* đźŽ¨ Paleta Espresso / Crem / Oliv */
  --color-espresso-50: #FAF6F1;
  --color-espresso-100: #F0E6D3;
  --color-espresso-500: #6B3A2A;
  --color-espresso-800: #3B1F0A;
  --color-espresso-900: #1E0F05;

  --color-crem-50: #FFFDF8;
  --color-crem-100: #F5EDD6;
  --color-crem-200: #EDD9A3;

  --color-oliv-400: #8A9E5A;
  --color-oliv-600: #6B7C4A;
  --color-oliv-800: #4A5733;
}

/* đź“ť TIPOGRAFIE MODERNÄ‚ */
body {
  background: linear-gradient(135deg, #FAFAFA 0%, #E0F2FE 100%);
  color: var(--foreground);
  font-family: var(--font-inter), Arial, Helvetica, sans-serif;
  font-size: 18px;
  line-height: 1.6;
  min-height: 100vh;
}

/* TIPOGRAFIE 100% SANS-SERIF - Modern Clean */

/* TOATE titlurile folosesc Plus Jakarta Sans (sans-serif modern) */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading), -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em; /* Tracking subtil pentru aspect modern */
}

h1 {
  font-size: 64px;
  font-weight: 800;
}

h2 {
  font-size: 48px;
  font-weight: 700;
}

h3 {
  font-size: 32px;
  font-weight: 700;
}

h4 {
  font-size: 24px;
  font-weight: 600;
}

h5 {
  font-size: 20px;
  font-weight: 600;
}

h6 {
  font-size: 18px;
  font-weight: 600;
}

/* Paragrafe folosesc Inter (sans-serif) */
p {
  font-family: var(--font-inter), Arial, sans-serif;
  font-size: 18px;
  line-height: 1.6;
}

/*
  đźŞź GLASSMORPHISM UTILITY CLASSES
*/
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
}

.glass-hover {
  transition: all 0.3s ease;
}

.glass-hover:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Dark mode pentru glass */
[data-theme='dark'] .glass-hover:hover {
  background: rgba(55, 65, 81, 0.95) !important; /* gray-700 */
}

/*
  âś¨ MICRO-INTERACČšIUNI
  AnimaČ›ii subtile pentru butoane, link-uri, card-uri
*/

/* Butoane cu efect de scale + shadow */
button, .btn {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

button:hover, .btn:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

button:active, .btn:active {
  transform: scale(0.98);
}

/* Link-uri cu underline animat */
.link-underline {
  position: relative;
  text-decoration: none;
}

.link-underline::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background-color: var(--primary);
  transition: width 0.3s ease-in-out;
}

.link-underline:hover::after {
  width: 100%;
}

/* Card-uri cu efect tilt subtle */
.card-tilt {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-tilt:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
}

/* IconiČ›e social media - "sare" Ă®n sus */
.social-icon {
  transition: transform 0.2s ease;
  display: inline-block;
}

.social-icon:hover {
  transform: translateY(-5px);
}

/*
  đźŽ¬ ANIMAČšII KEYFRAMES
*/

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@layer utilities {
  .hero-anim {
    opacity: 0;
    animation: fadeInUp 0.7s ease-out forwards;
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Smooth scroll behavior - dezactivat pentru Lenis */
html.lenis {
  height: auto;
}

html.lenis-smooth {
  scroll-behavior: auto;
}

/* PerformanČ›Ä: GPU acceleration pentru animaČ›ii */
.gpu-accelerate {
  transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
}

/* Selection color */
::selection {
  background-color: var(--primary);
  color: white;
}

::-moz-selection {
  background-color: var(--primary);
  color: white;
}

/* Hide scrollbar pentru tab-uri */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Dark mode pentru Features cards - suprascrie inline styles */
[data-theme='dark'] .features-card {
  background-color: #374151 !important; /* gray-700 */
}

/* AnimaČ›ii scroll â€” Intersection Observer */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.65s ease,
              transform 0.65s ease;
}
.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}
```

## Fișier

Path complet: `K:\Video-Prelucrat\Vibe Coding\Proiect_01\app\layout.tsx`

De ce e relevant: definește fonturile globale, metadata, viewport, inițializarea temei și componentele globale persistente precum navbar, chat și FAB CTA.

Conținut integral:

```tsx
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ChatWidget from "@/components/ChatWidget";
import FABContact from "@/components/FABContact";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  preload: false,
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vibe-website2.vercel.app"),
  title: {
    default: "Vibe Caffe - Cafea de Specialitate Ă®n BucureČ™ti",
    template: "%s | Vibe Caffe",
  },
  description:
    "Cafea single-origin, brunch de weekend Č™i un spaČ›iu potrivit pentru lucru Ă®n centrul BucureČ™tiului. RezervÄ masÄ online.",
  keywords: [
    "cafea specialitate",
    "cafenea bucureČ™ti",
    "specialty coffee",
    "brunch bucuresti",
    "vibe caffe",
  ],
  authors: [{ name: "Vibe Caffe Team" }],
  openGraph: {
    title: "Vibe Caffe - Cafea de Specialitate",
    description: "Cafea single-origin Č™i brunch Ă®n inima BucureČ™tiului.",
    url: "https://vibe-website2.vercel.app",
    siteName: "Vibe Caffe",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Interiorul Vibe Caffe",
      },
    ],
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Caffe - Cafea de Specialitate",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeInitScript = `
    (function () {
      try {
        var saved = localStorage.getItem('theme');
        var dark = saved === 'dark';
        var root = document.documentElement;
        if (dark) {
          root.setAttribute('data-theme', 'dark');
          root.classList.add('dark');
        } else {
          root.removeAttribute('data-theme');
          root.classList.remove('dark');
        }
      } catch (e) {}
    })();
  `;

  return (
    <html lang="ro">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${plusJakarta.variable} ${inter.variable} ${playfair.variable} antialiased`}
      >
        <Navigation />
        {children}
        <ChatWidget />
        <FABContact />
      </body>
    </html>
  );
}
```

## Fișier

Path complet: `K:\Video-Prelucrat\Vibe Coding\Proiect_01\app\page.tsx`

De ce e relevant: este implementarea actuală a homepage-ului, cu hero SSR inline, preview-uri de imagini, secțiuni animate, CTA-uri, date structurale SEO și compunerea secțiunilor principale.

Conținut integral:

```tsx
import Image from 'next/image';
import About from '@/components/About';
import FooterStarter from '@/components/FooterStarter';
import ReviewBar from '@/components/ReviewBar';
import ScrollAnimations from '@/components/ScrollAnimations';
import DayAtVibe from '@/components/DayAtVibe';

export const metadata = {
  title: 'Vibe CaffĂ¨ â€” Cafea de Specialitate Ă®n BucureČ™ti',
  description:
    'Cafea bunÄ. Oameni buni. Un loc al tÄu Ă®n centrul BucureČ™tiului. ' +
    'RezervÄ masÄ online. Bld. Regina Elisabeta 30, Sector 5.',
  openGraph: {
    title: 'Vibe CaffĂ¨ â€” Cafea de Specialitate Ă®n BucureČ™ti',
    description:
      'Cafea bunÄ. Oameni buni. Un loc al tÄu Ă®n centrul BucureČ™tiului.',
    url: 'https://vibe-website2.vercel.app',
    siteName: 'Vibe CaffĂ¨',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Interiorul Vibe CaffĂ¨' }],
    locale: 'ro_RO',
    type: 'website',
  },
};

// Primele 6 produse pentru preview SSR
const previewItems = [
  { name: 'Flat White', price: 17, alt: 'Flat White servit Ă®n ceaČ™cÄ albÄ pe farfurioarÄ de lemn, 17 lei', image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&auto=format&fit=crop' },
  { name: 'Cappuccino', price: 16, alt: 'Cappuccino cu spumÄ de lapte cremoasÄ, 16 lei', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop' },
  { name: 'Cold Brew Tonic', price: 22, alt: 'Cold Brew Tonic cu portocalÄ Č™i gheaČ›Ä, 22 lei', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop' },
  { name: 'Cheesecake', price: 22, alt: 'Felie de Cheesecake New York cu sos de fructe, 22 lei', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop' },
  { name: 'Croissant cu Unt', price: 14, alt: 'Croissant cu unt proaspÄt, crocant, 14 lei', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop' },
  { name: 'Brownie', price: 18, alt: 'Brownie cu ciocolatÄ neagrÄ Č™i nuci, 18 lei', image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&auto=format&fit=crop' },
];

// Produse sezoniere pentru preview SSR
const seasonalPreview = [
  { name: 'Latte de LavandÄ', price: 20, alt: 'Latte de LavandÄ cu sirop artizanal, 20 lei', desc: 'Espresso, lapte microspumat Č™i sirop de lavandÄ. Disponibil: aprilieâ€“iunie.', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop' },
  { name: 'Cold Brew Tonic', price: 22, alt: 'Cold Brew Tonic cu portocalÄ Č™i gheaČ›Ä, 22 lei', desc: 'Cold brew, apÄ tonicÄ Č™i portocalÄ proaspÄtÄ. Disponibil: tot sezonul.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop' },
  { name: 'Brunch Festiv de Weekend', price: 36, alt: 'Brunch Festiv de Weekend cu Eggs Benedict, granola Č™i cafea de specialitate, 36 lei', desc: 'Eggs Benedict, granola, fresh Č™i cafea de specialitate. Disponibil: sĂ˘mbÄtÄ Č™i duminicÄ.', image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&auto=format&fit=crop' },
];

export default function Home() {
  return (
    <>
      <main>
      {/* Hero SSR */}
      <section className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center text-center px-6">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)]">
            Cafea bunÄ. Oameni buni. Un loc al tÄu.
          </h1>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Meniu clar, rezervÄri rapide Č™i locaČ›ie uČ™or de gÄsit Ă®n centrul BucureČ™tiului.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/meniu" className="px-8 py-4 bg-espresso-800 hover:bg-espresso-900 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105">
              Vezi meniul
            </a>
            <a href="/rezervari" className="px-8 py-4 bg-oliv-600 hover:bg-oliv-800 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105">
              RezervÄ masÄ
            </a>
          </div>
        </div>
      </section>

      <ScrollAnimations />

      <ReviewBar />

      <DayAtVibe />

      {/* Beneficii SSR */}
      <section id="de-ce-vibe" className="py-20 px-6 bg-white animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 font-[family-name:var(--font-playfair)]">De ce Vibe?</h2>
          <p className="text-lg text-gray-500 text-center mb-12">DiferenČ›iatori concreČ›i, nu afirmaČ›ii vagi.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Cafea de specialitate',
                desc: 'Boabe selectate din origini single-origin, preparate dupÄ reČ›ete calibrate pentru consistenČ›Ä Ă®n fiecare ceaČ™cÄ.',
                icon: 'â•',
              },
              {
                title: 'SpaČ›iu de lucru',
                desc: 'Wi-Fi stabil, prize la fiecare masÄ Č™i o atmosferÄ care face munca mai plÄcutÄ. Potrivit pentru Ă®ntĂ˘lniri Č™i sesiuni de lucru.',
                icon: 'đź’»',
              },
              {
                title: 'Deserturi de weekend',
                desc: 'Meniu special disponibil Ă®n fiecare weekend, cu ingrediente proaspete Č™i deserturi de patiserie artizanalÄ.',
                icon: 'đźĄ',
              },
              {
                title: 'LocaČ›ie centralÄ',
                desc: 'Bld. Regina Elisabeta 30, Sector 5 â€” uČ™or de gÄsit, aproape de centrul BucureČ™tiului, cu acces facil din mai multe zone.',
                icon: 'đź“Ť',
              },
            ].map((card) => (
              <div key={card.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Meniu SSR */}
      <section className="py-20 px-6 bg-gray-50 animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 font-[family-name:var(--font-playfair)]">Din meniul nostru</h2>
          <p className="text-lg text-gray-500 text-center mb-12">Cafea bunÄ. Oameni buni. Un loc al tÄu.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {previewItems.map((item) => (
              <div key={item.name} className="bg-white rounded-2xl shadow-sm overflow-hidden group">
                <div className="h-40 overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={600}
                    height={320}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="font-semibold text-gray-900">{item.name}</span>
                  <span className="text-teal-600 font-bold">{item.price} lei</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href="/meniu" className="px-8 py-4 bg-espresso-800 hover:bg-espresso-900 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 inline-block">
              Vezi meniul complet
            </a>
          </div>
        </div>
      </section>

      {/* Oferte sezoniere SSR */}
      <section className="py-20 px-6 bg-white animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 font-[family-name:var(--font-playfair)]">Oferte sezoniere</h2>
          <p className="text-lg text-gray-500 text-center mb-12">Produse disponibile Ă®n aceastÄ perioadÄ.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {seasonalPreview.map((item) => (
              <div key={item.name} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-teal-100 group">
                <div className="h-48 overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={600}
                    height={384}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    <span className="text-teal-600 font-bold whitespace-nowrap ml-2">{item.price} lei</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href="/sarbatori" className="px-8 py-4 bg-oliv-600 hover:bg-oliv-800 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 inline-block">
              Vezi toate ofertele sezoniere
            </a>
          </div>
        </div>
      </section>

      {/* CTA secundar rezervare */}
      <section className="bg-espresso-800 dark:bg-espresso-900 py-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-3 font-[family-name:var(--font-playfair)]">
          Čši-a plÄcut ce ai vÄzut?
        </h2>
        <p className="text-crem-100 mb-8 text-base max-w-md mx-auto">
          RezervÄ o masÄ acum Č™i garantÄm locul tÄu.
        </p>
        <a
          href="/rezervari"
          className="inline-block bg-oliv-600 hover:bg-oliv-800 text-white font-bold px-8 py-4 rounded-full text-lg transition-colors duration-200"
        >
          RezervÄ masÄ
        </a>
      </section>

      {/* LocaČ›ie rapidÄ SSR */}
      <section className="py-20 px-6 bg-gray-900 text-white animate-on-scroll">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 font-[family-name:var(--font-playfair)]">Unde ne gÄseČ™ti</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div>
              <div className="text-3xl mb-3">đź“Ť</div>
              <p className="font-semibold text-lg">AdresÄ</p>
              <p className="text-gray-200">Bld. Regina Elisabeta 30, Sector 5, BucureČ™ti</p>
            </div>
            <div>
              <div className="text-3xl mb-3">đź•</div>
              <p className="font-semibold text-lg">Program</p>
              <p className="text-gray-200">Luniâ€“Vineri 08:00â€“22:00</p>
              <p className="text-gray-200">SĂ˘mbÄtÄâ€“DuminicÄ 09:00â€“23:00</p>
            </div>
            <div>
              <div className="text-3xl mb-3">đź“ž</div>
              <p className="font-semibold text-lg">Telefon</p>
              <a href="tel:+40721234567" className="text-teal-400 hover:text-teal-300">+40 721 234 567</a>
            </div>
          </div>
          <a
            href="https://maps.google.com/?q=Bld.+Regina+Elisabeta+30+Bucuresti"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-espresso-800 hover:bg-espresso-900 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 inline-block"
          >
            Deschide Ă®n Google Maps
          </a>
        </div>
      </section>

      <div className="animate-on-scroll">
        <About />
      </div>
      <FooterStarter />
      </main>

      {/* JSON-LD LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CafeOrCoffeeShop',
            name: 'Vibe CaffĂ¨',
            url: 'https://vibe-website2.vercel.app',
            telephone: '+40721234567',
            email: 'contact@vibecaffe.ro',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Bulevardul Regina Elisabeta 30',
              addressLocality: 'BucureČ™ti',
              postalCode: '050016',
              addressCountry: 'RO',
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '08:00',
                closes: '22:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Saturday', 'Sunday'],
                opens: '09:00',
                closes: '23:00',
              },
            ],
            servesCuisine: ['Coffee', 'Brunch', 'Desserts'],
            priceRange: '$$',
            menu: 'https://vibe-website2.vercel.app/meniu',
          }),
        }}
      />
    </>
  );
}
```

## Fișier

Path complet: `K:\Video-Prelucrat\Vibe Coding\Proiect_01\components\Preloader.tsx`

De ce e relevant: este componenta dedicată preloader-ului animat pe temă de cafea.

Conținut integral:

```tsx
'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 3200);
    return () => clearTimeout(timer);
  }, []);

  if (hidden) return null;

  return (
    <div className="preloader-overlay">
      <div className="preloader-cup">
        {/* CeaČ™cÄ SVG */}
        <svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Clip path pentru lichidul din ceaČ™cÄ */}
          <defs>
            <clipPath id="cupClip">
              <path d="M18 40 Q16 95 20 105 Q30 118 60 118 Q90 118 100 105 Q104 95 102 40 Z" />
            </clipPath>
          </defs>

          {/* Lichidul care se umple */}
          <rect
            x="10" y="0" width="110" height="120"
            fill="#92400e"
            clipPath="url(#cupClip)"
            className="coffee-fill"
          />

          {/* Corpul ceČ™tii */}
          <path
            d="M18 40 Q16 95 20 105 Q30 118 60 118 Q90 118 100 105 Q104 95 102 40 Z"
            stroke="white" strokeWidth="3.5" fill="none"
          />

          {/* Marginea de sus */}
          <ellipse cx="60" cy="40" rx="42" ry="8" stroke="white" strokeWidth="3.5" fill="none" />

          {/* Toarta */}
          <path
            d="M102 55 Q125 55 125 75 Q125 95 102 90"
            stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round"
          />

          {/* Farfurioara */}
          <ellipse cx="60" cy="122" rx="52" ry="7" stroke="white" strokeWidth="3" fill="none" />

          {/* Abur 1 */}
          <path d="M45 28 Q42 18 45 10 Q48 2 45 -5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" className="steam steam-1" />
          {/* Abur 2 */}
          <path d="M60 26 Q57 16 60 8 Q63 0 60 -7" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" className="steam steam-2" />
          {/* Abur 3 */}
          <path d="M75 28 Q72 18 75 10 Q78 2 75 -5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" className="steam steam-3" />
        </svg>

      </div>

      <style>{`
        .preloader-overlay {
          position: fixed;
          inset: 0;
          background: #1a0a00;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: preloaderFadeOut 0.6s ease-out 2.8s forwards;
        }

        .preloader-cup {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        /* Umplerea cu cafea: de jos Ă®n sus, duratÄ 2.2s */
        .coffee-fill {
          transform-origin: bottom;
          transform: scaleY(0);
          animation: fillCup 2.2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;
        }

        @keyframes fillCup {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }

        /* Abur */
        .steam {
          opacity: 0;
          stroke-dasharray: 30;
          stroke-dashoffset: 30;
        }
        .steam-1 { animation: steamRise 1s ease-out 2s infinite; }
        .steam-2 { animation: steamRise 1s ease-out 2.3s infinite; }
        .steam-3 { animation: steamRise 1s ease-out 2.6s infinite; }

        @keyframes steamRise {
          0%   { opacity: 0; stroke-dashoffset: 30; }
          30%  { opacity: 1; }
          100% { opacity: 0; stroke-dashoffset: 0; }
        }

        /* Fade out overlay */
        @keyframes preloaderFadeOut {
          from { opacity: 1; pointer-events: all; }
          to   { opacity: 0; pointer-events: none; }
        }
      `}</style>
    </div>
  );
}
```

## Fișier

Path complet: `K:\Video-Prelucrat\Vibe Coding\Proiect_01\components\CoffeeLoader.tsx`

De ce e relevant: este un loader vizual alternativ pentru conținut cu imagini, bazat pe SVG animat.

Conținut integral:

```tsx
'use client'

export default function CoffeeLoader({ size = 48 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center w-full h-full" style={{ minHeight: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Se Ă®ncarcÄ..."
        role="img"
      >
        {/* FarfurioarÄ */}
        <ellipse cx="24" cy="38" rx="14" ry="3" fill="#D4A96A" opacity="0.4"/>

        {/* CeaČ™cÄ */}
        <path d="M12 20 Q12 36 24 36 Q36 36 36 20 Z" fill="#C8956C"/>
        <path d="M12 20 H36" stroke="#A0724A" strokeWidth="1.5"/>

        {/* ToartÄ */}
        <path d="M36 22 Q44 22 44 28 Q44 34 36 34"
          stroke="#A0724A" strokeWidth="2" fill="none"
          strokeLinecap="round"/>

        {/* Cafea Ă®n ceaČ™cÄ â€” nivel care creČ™te */}
        <clipPath id="cupClip">
          <path d="M12 20 Q12 36 24 36 Q36 36 36 20 Z"/>
        </clipPath>
        <rect x="12" y="20" width="24" height="16" fill="#6B3F1F"
          clipPath="url(#cupClip)" opacity="0.85">
          <animate attributeName="y" values="36;20" dur="1.4s"
            repeatCount="indefinite" calcMode="ease-in-out"/>
          <animate attributeName="height" values="0;16" dur="1.4s"
            repeatCount="indefinite" calcMode="ease-in-out"/>
        </rect>

        {/* Abur */}
        <g opacity="0.6">
          <path d="M20 16 Q21 13 20 10" stroke="#9CA3AF" strokeWidth="1.5"
            strokeLinecap="round" fill="none">
            <animate attributeName="opacity" values="0;0.7;0" dur="1.8s"
              repeatCount="indefinite" begin="0s"/>
          </path>
          <path d="M24 14 Q25 11 24 8" stroke="#9CA3AF" strokeWidth="1.5"
            strokeLinecap="round" fill="none">
            <animate attributeName="opacity" values="0;0.7;0" dur="1.8s"
              repeatCount="indefinite" begin="0.4s"/>
          </path>
          <path d="M28 16 Q29 13 28 10" stroke="#9CA3AF" strokeWidth="1.5"
            strokeLinecap="round" fill="none">
            <animate attributeName="opacity" values="0;0.7;0" dur="1.8s"
              repeatCount="indefinite" begin="0.8s"/>
          </path>
        </g>
      </svg>
    </div>
  )
}
```

## Fișier

Path complet: `K:\Video-Prelucrat\Vibe Coding\Proiect_01\components\Navigation.tsx`

De ce e relevant: controlează navbar-ul sticky, secțiunea activă, CTA-urile persistente și toggle-ul de temă.

Conținut integral:

```tsx
/**
 * NAVIGATION - Sticky navigation cu blur effect
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
  const isAdminRoute = pathname?.startsWith('/admin');

  useEffect(() => {
    if (isAdminRoute) return;
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdminRoute]);

  useEffect(() => {
    if (isAdminRoute) return;
    const observers: IntersectionObserver[] = [];
    NAV_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.1, rootMargin: '-60px 0px -40% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isAdminRoute]);

  if (isAdminRoute) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 bg-white/95 dark:bg-[#1A120C]/95 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-[#5A3A22]">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <svg
            className={`transition-all duration-300 ${isScrolled ? 'w-8 h-8' : 'w-10 h-10'} text-primary`}
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
            className="font-bold text-xl transition-all duration-300 text-gray-900 dark:text-gray-100"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Vibe Caffè
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-gray-900 dark:text-gray-100">
          <Link href="/meniu" className="font-semibold transition-all duration-200 px-3 py-1.5 rounded-full hover:text-primary">
            Meniu
          </Link>

          <Link
            href="/#de-ce-vibe"
            className={`font-semibold transition-all duration-200 px-3 py-1.5 rounded-full ${
              activeSection === 'de-ce-vibe' ? 'bg-primary text-white shadow-sm' : 'hover:text-primary'
            }`}
            style={{ color: activeSection === 'de-ce-vibe' ? undefined : 'inherit' }}
          >
            De ce Vibe?
          </Link>

          <Link href="/locatie" className="font-semibold transition-all duration-200 px-3 py-1.5 rounded-full hover:text-primary">
            Locație
          </Link>

          <ThemeToggle />

          <div className="flex flex-col items-center gap-1">
            <Link
              href="/rezervari"
              className="px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-primary text-white hover:bg-primary-dark"
            >
              Rezervă Masă
            </Link>

            <div className="flex gap-2">
              <a
                href="tel:+40721234567"
                className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-200 text-orange-900 hover:bg-orange-300 transition-colors"
              >
                Sună
              </a>
              <a
                href="https://wa.me/40721234567"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <button type="button" aria-label="Deschide meniul de navigare" className="md:hidden text-gray-900 dark:text-gray-100">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
```

## Fișier

Path complet: `K:\Video-Prelucrat\Vibe Coding\Proiect_01\components\ThemeToggle.tsx`

De ce e relevant: gestionează dark mode-ul și partea de accesibilitate pentru schimbarea temei.

Conținut integral:

```tsx
/**
 * đźŚ“ THEME TOGGLE - Dark Mode Switch
 * Toggle Ă®ntre light Č™i dark mode cu localStorage
 */

'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // CiteČ™te preferinČ›a din localStorage
    const savedTheme = localStorage.getItem('theme');

    // DOAR foloseČ™te savedTheme, NU detecta automat OS dark mode
    const shouldBeDark = savedTheme === 'dark';
    setIsDark(shouldBeDark);

    if (shouldBeDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      // AsigurÄ-te cÄ dark mode e complet dezactivat Ă®n light mode
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="w-14 h-8" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label="Toggle dark mode"
    >
      <div
        className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center ${
          isDark ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {isDark ? (
          <svg className="w-3 h-3 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    </button>
  );
}
```

## Fișier

Path complet: `K:\Video-Prelucrat\Vibe Coding\Proiect_01\components\ScrollAnimations.tsx`

De ce e relevant: aplică animațiile la scroll și animează contorii de rating/recenzii.

Conținut integral:

```tsx
'use client';

import { useEffect, useRef } from 'react';

/**
 * ScrollAnimations â€” Client Component
 *
 * Modificarea 8: Intersection Observer care adaugÄ clasa "visible"
 * pe toate elementele cu clasa "animate-on-scroll" cĂ˘nd intrÄ Ă®n viewport.
 *
 * Modificarea 9: Contor animat pentru rating (4.9) Č™i recenzii (340)
 * din secČ›iunea ReviewBar / hero. Se animeazÄ o singurÄ datÄ (flag useRef).
 */
export default function ScrollAnimations() {
  // Refs pentru elementele cu contor
  const ratingRef  = useRef<HTMLElement | null>(null);
  const reviewsRef = useRef<HTMLElement | null>(null);
  const animatedRef = useRef(false); // flag anti re-animare

  useEffect(() => {
    // --- Modificarea 8: scroll animations ---
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    // --- Modificarea 9: contor animat ---
    function animateCounter(
      element: HTMLElement,
      targetValue: number,
      duration: number,
      decimals: number
    ) {
      let start: number | null = null;

      function step(timestamp: number) {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        element.textContent = (progress * targetValue).toFixed(decimals);
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }

      requestAnimationFrame(step);
    }

    // GÄsim elementele cu rating Č™i recenzii prin data attributes
    ratingRef.current  = document.querySelector('[data-rating]') as HTMLElement | null;
    reviewsRef.current = document.querySelector('[data-reviews]') as HTMLElement | null;

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            if (ratingRef.current) {
              animateCounter(ratingRef.current, 4.9, 1500, 1);
            }
            if (reviewsRef.current) {
              animateCounter(reviewsRef.current, 340, 1500, 0);
              // AdÄugÄm "+" Ă®napoi dupÄ animaČ›ie
              setTimeout(() => {
                if (reviewsRef.current) {
                  reviewsRef.current.textContent = '340+';
                }
              }, 1520);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ratingRef.current) {
      counterObserver.observe(ratingRef.current);
    }

    return () => {
      observer.disconnect();
      counterObserver.disconnect();
    };
  }, []);

  return null; // Component invizibil â€” doar logicÄ
}
```

## Fișier

Path complet: `K:\Video-Prelucrat\Vibe Coding\Proiect_01\components\SmoothScroll.tsx`

De ce e relevant: implementează smooth scrolling cu Lenis, componentă relevantă pentru comportamentul de animație și navigare, chiar dacă nu este montată în layout-ul actual.

Conținut integral:

```tsx
/**
 * đźŽ˘ SMOOTH SCROLL - Implementare Lenis pentru scroll premium
 * PREMIUM: ExperienČ›Ä de scroll fluida Č™i naturalÄ
 */

'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  useEffect(() => {
    // IniČ›ializeazÄ Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // RAF (Request Animation Frame) pentru smooth scrolling
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return null; // ComponentÄ fÄrÄ UI, doar funcČ›ionalitate
}
```

## Fișier

Path complet: `K:\Video-Prelucrat\Vibe Coding\Proiect_01\components\ReviewBar.tsx`

De ce e relevant: oferă social proof, contori animați și text expus în homepage.

Conținut integral:

```tsx
const reviews = [
  {
    text: "Cea mai bunÄ cafea de specialitate pe care am gÄsit-o Ă®n centrul BucureČ™tiului.",
    author: "- Andreea M., martie 2026",
  },
  {
    text: "Brunch-ul de weekend e o revelaČ›ie. OuÄle Benedict Č™i cold brew-ul sunt combinaČ›ia perfectÄ.",
    author: "- Mihai T., februarie 2026",
  },
  {
    text: "Atmosfera potrivitÄ pentru lucru. WiFi stabil, prize la fiecare masÄ Č™i cafea excelentÄ.",
    author: "- Raluca D., martie 2026",
  },
];

export default function ReviewBar() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p
            className="text-4xl font-bold"
            style={{ color: "var(--primary, #14B8A6)" }}
          >
            <span aria-hidden="true">â…</span> <span data-rating>4.9</span> / 5
          </p>
          <p className="text-sm text-slate-500 mt-1">
            bazat pe <span data-reviews>340+</span> recenzii Google
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm"
            >
              <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="text-xs font-bold text-teal-600 dark:text-teal-400 mt-3">
                {review.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## Fișier

Path complet: `K:\Video-Prelucrat\Vibe Coding\Proiect_01\components\DayAtVibe.tsx`

De ce e relevant: este secțiune interactivă de homepage cu CTA-uri, reveal animation și suport de focus/touch pentru accesibilitate.

Conținut integral:

```tsx
'use client';

import { useState, useEffect, useRef } from 'react';

const cards = [
  {
    id: 'focus-start',
    time: '08:00',
    title: 'Focus Start',
    description: 'DimineaČ›a mai bunÄ Ă®ncepe cu o ceaČ™cÄ clarÄ Č™i un loc al tÄu.',
    drink: 'â• Flat White sau Cappuccino â€” de la 16 lei',
    cta: 'Vezi meniul',
    ctaHref: '/meniu',
    dynamicSubtitle: 'DimineaČ›a ta, locul tÄu.',
    activeHours: [8, 9, 10, 11],
  },
  {
    id: 'reset-pranz',
    time: '13:00',
    title: 'Reset de PrĂ˘nz',
    description: 'Pauza care reĂ®ncarcÄ. IeČ™i din rutinÄ, revii mai focusat.',
    drink: 'â• Cold Brew Tonic + Croissant â€” de la 36 lei',
    cta: 'RezervÄ masÄ',
    ctaHref: '/rezervari',
    dynamicSubtitle: 'Pauza care chiar reĂ®ncarcÄ.',
    activeHours: [12, 13, 14, 15, 16],
  },
  {
    id: 'slow-evenings',
    time: '18:30',
    title: 'Slow Evenings',
    description: 'Seara nu trebuie grÄbitÄ. Un loc, o bÄuturÄ, liniČ™tea ta.',
    drink: 'â• Latte de LavandÄ sau Brownie â€” de la 18 lei',
    cta: 'RezervÄ masÄ',
    ctaHref: '/rezervari',
    dynamicSubtitle: 'Seara ta, Ă®n ritmul tÄu.',
    activeHours: [17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7],
  },
];

const STATIC_SUBTITLE = 'Alege momentul tÄu.';

function getActiveCardId(): string {
  const hour = new Date().getHours();
  for (const card of cards) {
    if (card.activeHours.includes(hour)) return card.id;
  }
  return 'slow-evenings';
}

export default function DayAtVibe() {
  const [activeCardId, setActiveCardId] = useState<string>('slow-evenings');
  const [subtitle, setSubtitle] = useState(STATIC_SUBTITLE);
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setActiveCardId(getActiveCardId());
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealed) {
          setRevealed(true);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed]);

  const handleCardEnter = (card: typeof cards[0]) => {
    setSubtitle(card.dynamicSubtitle);
  };

  const handleCardLeave = () => {
    setSubtitle(STATIC_SUBTITLE);
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 bg-crem-50"
      aria-label="Cum aratÄ ziua ta la Vibe?"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-[400ms] ease-out ${
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-playfair)]">
            Cum aratÄ ziua ta la Vibe?
          </h2>
          <p
            className="text-lg text-gray-500 transition-opacity duration-200"
            aria-live="polite"
          >
            {subtitle}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const isActive = card.id === activeCardId;
            return (
              <div
                key={card.id}
                role="article"
                tabIndex={0}
                onMouseEnter={() => handleCardEnter(card)}
                onMouseLeave={handleCardLeave}
                onFocus={() => handleCardEnter(card)}
                onBlur={handleCardLeave}
                onTouchStart={() => handleCardEnter(card)}
                onTouchEnd={handleCardLeave}
                className={`
                  rounded-2xl p-6 border cursor-default outline-none
                  transition-transform duration-200
                  hover:-translate-y-1 hover:shadow-md
                  focus-visible:ring-2 focus-visible:ring-espresso-800 focus-visible:ring-offset-2
                  ${revealed
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-5'
                  }
                  ${isActive
                    ? 'bg-white border-espresso-800 shadow-sm'
                    : 'bg-white border-gray-200'
                  }
                `}
                style={{
                  transitionDelay: revealed ? `${index * 80}ms` : '0ms',
                  transitionProperty: 'opacity, transform',
                  transitionDuration: '400ms',
                  transitionTimingFunction: 'ease-out',
                }}
              >
                {/* Time label */}
                <p
                  className={`text-sm font-semibold mb-1 ${
                    isActive ? 'text-espresso-800' : 'text-gray-400'
                  }`}
                >
                  {card.time}
                </p>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-playfair)]">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {card.description}
                </p>

                {/* Drink recommendation */}
                <p className="text-gray-700 text-sm mb-5">{card.drink}</p>

                {/* CTA */}
                <a
                  href={card.ctaHref}
                  className={`
                    inline-block text-sm font-semibold underline-offset-2 hover:underline
                    focus-visible:ring-2 focus-visible:ring-espresso-800 focus-visible:ring-offset-2 rounded
                    ${isActive ? 'text-espresso-800' : 'text-gray-500 hover:text-gray-800'}
                  `}
                >
                  â†’ {card.cta}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

## Fișier

Path complet: `K:\Video-Prelucrat\Vibe Coding\Proiect_01\components\About.tsx`

De ce e relevant: combină imagine de ambient, parallax, animație la scroll și CTA principal de conversie.

Conținut integral:

```tsx
/**
 * đź“– ABOUT SECTION - Cu scroll animations
 * MODERNIZAT: Intersection Observer + Parallax effect
 */

'use client';

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { useEffect, useState } from 'react';

export default function About() {
  const { elementRef, isVisible } = useScrollAnimation(0.2);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // Efect parallax pe imagine - compatibil cu Lenis smooth scroll
  useEffect(() => {
    let rafId: number;

    const handleParallax = () => {
      const element = elementRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const offset = scrollProgress * 100 - 50; // Parallax range: -50px to +50px
        setParallaxOffset(offset);
      }
      rafId = requestAnimationFrame(handleParallax);
    };

    rafId = requestAnimationFrame(handleParallax);
    return () => cancelAnimationFrame(rafId);
  }, [elementRef]);

  return (
    <section className="py-20 px-6 bg-white/50" ref={elementRef}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* IMAGINE - Slide in from left + Parallax */}
          <div
            className={`order-2 md:order-1 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
              <img
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&auto=format&fit=crop"
                alt="Interior cafenea modern Č™i primitor"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                style={{
                  transform: `translateY(${parallaxOffset}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = 'none';
                  const parent = img.parentElement;
                  if (parent) {
                    parent.style.cssText += 'display:flex;align-items:center;justify-content:center;min-height:400px;background:linear-gradient(135deg,#fef3c7,#fed7aa)';
                    parent.innerHTML = '<span style="font-size:5rem">â•</span>';
                  }
                }}
              />
            </div>
          </div>

          {/* TEXT - Slide in from right */}
          <div
            className={`order-1 md:order-2 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="inline-block px-4 py-2 bg-secondary/10 text-secondary font-semibold rounded-full mb-4">
              Despre Noi
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Pasiunea pentru cafea,{' '}
              <span className="text-primary">din 2020</span>
            </h2>

            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Am deschis Vibe CaffĂ¨ cu o singurÄ regulÄ: nicio ceaČ™cÄ nu pleacÄ
              la masÄ dacÄ nu am fi bucuroČ™i s-o bem noi Ă®nČ™ine. De atunci,
              Andreea M. ne-a dat 5 stele de 3 ori, Mihai T. vine Ă®n fiecare
              dimineaČ›Ä de marČ›i Č™i Raluca D. Č™i-a scris teza de doctorat la
              masa din colČ›ul din dreapta.
            </p>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              ColaborÄm direct cu plantaČ›ii din America de Sud Č™i Africa,
              selectĂ˘nd doar cele mai bune boabe, prÄjite sÄptÄmĂ˘nal Ă®n micul
              nostru atelier din BucureČ™ti.
            </p>

            <a
              href="/rezervari"
              className="inline-block px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              ProgrameazÄ o VizitÄ
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

## Fișier

Path complet: `K:\Video-Prelucrat\Vibe Coding\Proiect_01\components\FooterStarter.tsx`

De ce e relevant: este footer-ul folosit efectiv în homepage și alte pagini publice, conținând navigare, newsletter, linkuri și CTA secundare.

Conținut integral:

```tsx
'use client';

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

      await res.json();

      if (res.status === 409) {
        setStatus('duplicate');
      } else if (res.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <footer id="footer" className="relative">
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

      <div className="bg-gray-800 text-gray-300 pt-4 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Vibe <span className="text-primary">Caffe</span>
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Cafea de specialitate Ă®ntr-un ambient modern Č™i relaxant.
              Te aČ™teptÄm la Bld. Regina Elisabeta 30, BucureČ™ti.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="w-10 h-10 bg-gray-700 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 bg-gray-700 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="#" aria-label="TikTok" className="w-10 h-10 bg-gray-700 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Navigare</h4>
            <ul className="space-y-3">
              <li><Link href="/meniu" className="text-gray-300 hover:text-primary transition-colors duration-200">Meniu</Link></li>
              <li><Link href="/rezervari" className="text-gray-300 hover:text-primary transition-colors duration-200">RezervÄri</Link></li>
              <li><Link href="/locatie" className="text-gray-300 hover:text-primary transition-colors duration-200">LocaČ›ie</Link></li>
              <li><a href="/#de-ce-vibe" className="text-gray-300 hover:text-primary transition-colors duration-200">De ce Vibe?</a></li>
              <li><Link href="/sarbatori" className="text-gray-300 hover:text-primary transition-colors duration-200">Oferte SÄrbÄtori</Link></li>
            </ul>

            <h4 className="text-lg font-semibold text-white mt-8 mb-3">Contact</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Bld. Regina Elisabeta, Nr. 30
              <br />
              Sector 5, BucureČ™ti
              <br />
              <a href="tel:+40721234567" className="hover:text-primary transition-colors">+40 721 234 567</a>
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Newsletter</h4>
            <p className="text-gray-300 text-sm mb-4">PrimeČ™te oferte sezoniere, noutÄČ›i din meniu Č™i invitaČ›ii la evenimentele Vibe, fÄrÄ mesaje inutile.</p>

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
                {status === 'loading' ? 'Se trimite...' : 'AboneazÄ-te'}
              </button>
            </form>

            {status === 'success' && <p className="mt-3 text-green-700 text-sm py-3 px-4 bg-green-50 rounded-xl leading-relaxed">Bun venit Ă®n familia Vibe! Prima ta ofertÄ exclusivÄ ajunge Ă®n inbox Ă®n mai puČ›in de 5 minute.</p>}
            {status === 'duplicate' && <p className="mt-3 text-yellow-400 text-sm">Acest email este deja abonat.</p>}
            {status === 'error' && <p className="mt-3 text-red-400 text-sm">Eroare. Te rugÄm, Ă®ncearcÄ din nou.</p>}
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-700 text-center text-gray-500 text-sm space-y-2">
          <div>Â© 2026 Vibe Caffe. Cafea bunÄ, oameni buni, un loc al tÄu.</div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <a href="/confidentialitate" className="hover:text-gray-300 transition-colors">Politica de confidenČ›ialitate</a>
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
```

## Fișier

Path complet: `K:\Video-Prelucrat\Vibe Coding\Proiect_01\components\Footer.tsx`

De ce e relevant: este o variantă alternativă de footer cu pattern, wave, social și newsletter, relevantă pentru zona de CTA/footer chiar dacă nu este folosită în homepage-ul actual.

Conținut integral:

```tsx
/**
 * đź¦¶ FOOTER - Modern footer cu wave separator
 * MODERNIZAT: SVG wave separator + gradient background + social icons
 */

export default function Footer() {
  return (
    <footer className="relative">
      {/* đźŚŠ WAVE SEPARATOR SVG */}
      <div className="w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-24"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#3D2B1F"
          />
        </svg>
      </div>

      {/* đź“¦ FOOTER CONTENT - Gradient Background */}
      <div className="bg-gradient-to-b from-[#3D2B1F] to-[#1A1A1A] text-gray-300 py-16 px-6 relative">
        {/* Pattern decorativ cu boabe de cafea */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* GRID 3 COLOANE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* COLOANA 1: CONTACT */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
                <span className="text-primary">Vibe</span>{' '}
                <span className="text-secondary">CaffĂ¨</span>
              </h3>
              <p className="mb-6 leading-relaxed text-lg">
                Locul perfect pentru cafeaua ta zilnicÄ Č™i momente de relaxare
              </p>

              <div className="space-y-3">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Str. Cafenelelor nr. 42, BucureČ™ti, RomĂ˘nia</span>
                </div>

                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-primary mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a href="tel:+40721234567" className="hover:text-primary transition-colors">+40 721 234 567</a>
                </div>

                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-primary mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>hello@vibecoffee.ro</span>
                </div>
              </div>
            </div>

            {/* COLOANA 2: PROGRAM */}
            <div>
              <h4 className="text-xl font-bold text-white mb-4">Program</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Luni - Vineri</span>
                  <span className="text-white font-semibold">07:00 - 22:00</span>
                </div>
                <div className="flex justify-between">
                  <span>SĂ˘mbÄtÄ</span>
                  <span className="text-white font-semibold">08:00 - 23:00</span>
                </div>
                <div className="flex justify-between">
                  <span>DuminicÄ</span>
                  <span className="text-white font-semibold">09:00 - 20:00</span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-xl font-bold text-white mb-4">Link-uri Rapide</h4>
                <div className="space-y-2">
                  <a href="/meniu" className="block hover:text-primary transition-colors">
                    Meniu
                  </a>
                  <a href="/locatie" className="block hover:text-primary transition-colors">
                    LocaČ›ie
                  </a>
                  <a href="/rezervari" className="block hover:text-primary transition-colors">
                    RezervÄri
                  </a>
                </div>
              </div>
            </div>

            {/* COLOANA 3: SOCIAL MEDIA */}
            <div>
              <h4 className="text-xl font-bold text-white mb-4">UrmÄreČ™te-ne</h4>
              <p className="mb-6">AlÄturÄ-te comunitÄČ›ii noastre Č™i fii la curent cu cele mai noi oferte!</p>

              <div className="flex gap-4 mb-8">
                <a
                  href="#"
                  className="social-icon w-12 h-12 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center text-white text-xl transition-all"
                  aria-label="Facebook"
                >
                  <span>f</span>
                </a>
                <a
                  href="#"
                  className="social-icon w-12 h-12 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center text-white text-xl transition-all"
                  aria-label="Instagram"
                >
                  <span>đź“·</span>
                </a>
                <a
                  href="#"
                  className="social-icon w-12 h-12 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center text-white text-xl transition-all"
                  aria-label="TikTok"
                >
                  <span>đźŽµ</span>
                </a>
              </div>

              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                <h5 className="text-white font-bold mb-2">Newsletter</h5>
                <p className="text-sm mb-4">PrimeČ™te oferte exclusive</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Email-ul tÄu"
                    className="flex-1 px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button className="px-6 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors">
                    â†’
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-sm">
              &copy; 2026 Vibe CaffĂ¨. Toate drepturile rezervate. | Creat cu âť¤ď¸Ź pentru iubitorii de cafea
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

## Fișier

Path complet: `K:\Video-Prelucrat\Vibe Coding\Proiect_01\components\FABContact.tsx`

De ce e relevant: adaugă CTA-uri flotante persistente pentru telefon și WhatsApp.

Conținut integral:

```tsx
'use client';

/**
 * đź“ž FAB CONTACT â€” Butoane flotante telefon + WhatsApp
 * PoziČ›ie: stĂ˘nga-jos (ChatWidget e dreapta-jos)
 */
export default function FABContact() {
  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex flex-col gap-3">
      {/* Buton Telefon */}
      <a
        href="tel:+40721234567"
        aria-label="SunÄ-ne"
        className="w-12 h-12 rounded-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </a>

      {/* Buton WhatsApp */}
      <a
        href="https://wa.me/40721234567"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
```

## Fișier

Path complet: `K:\Video-Prelucrat\Vibe Coding\Proiect_01\components\Hero.tsx`

De ce e relevant: este componenta hero dedicată cu video background, parallax și CTA-uri, relevantă pentru arhitectura existentă chiar dacă homepage-ul curent folosește un hero inline în `app/page.tsx`.

Conținut integral:

```tsx
/**
 * đźŽŻ HERO SECTION - Prima secČ›iune pe care o vede utilizatorul
 * MODERNIZAT: Full-screen cu animaČ›ii fade-in
 */

'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    // DeclanČ™eazÄ animaČ›ia dupÄ mount
    setIsVisible(true);
  }, []);

  // Parallax effect pe video background
  useEffect(() => {
    let rafId: number;

    const handleParallax = () => {
      const scrollY = window.scrollY;
      const offset = scrollY * 0.5; // Parallax speed: 50% of scroll
      setParallaxOffset(offset);
      rafId = requestAnimationFrame(handleParallax);
    };

    rafId = requestAnimationFrame(handleParallax);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* đźŽ¬ BACKGROUND VIDEO - Full Screen Loop with Parallax */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: `translateY(${parallaxOffset}px)`,
            transition: 'transform 0.1s ease-out'
          }}
          onLoadedData={(e) => {
            const video = e.currentTarget;
            video.playbackRate = 0.5; // Redare la 50% din viteza normalÄ (ultra-lent, cinematic)
            video.play().catch(error => {
              console.log('Video autoplay prevented:', error);
            });
          }}
        >
          {/* Video local pentru Ă®ncÄrcare rapidÄ Č™i sigurÄ */}
          <source
            src="/hero-coffee.mp4"
            type="video/mp4"
          />
          {/* Fallback pentru browsere vechi */}
          Your browser does not support the video tag.
        </video>
        {/* Overlay semi-transparent pentru contrast */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* đźŽ¨ CONTENT - Direct pe fundal, fÄrÄ glassmorphism card */}
      <div
        className={`relative z-10 max-w-6xl mx-auto px-6 py-16 md:px-12 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* đź“ť TITLU PRINCIPAL - MÄrit la 96px (6rem) */}
        <h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 leading-tight"
          style={{
            textShadow: '0 4px 12px rgba(0,0,0,0.8)',
            animation: isVisible ? 'fadeInUp 1s ease-out' : 'none'
          }}
        >
          Cafeaua ta preferatÄ,{' '}
          <span className="text-secondary block mt-2" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.8)' }}>
            perfect preparatÄ
          </span>
        </h1>

        {/* đź“„ SUBTITLU */}
        <p
          className="text-xl md:text-3xl text-white/90 mb-10 max-w-3xl mx-auto font-light leading-relaxed"
          style={{
            textShadow: '0 3px 8px rgba(0,0,0,0.8)',
            animation: isVisible ? 'fadeInUp 1s ease-out 0.2s both' : 'none'
          }}
        >
          DescoperÄ aromele autentice ale cafelei de specialitate Ă®ntr-un ambient modern Č™i prietenos
        </p>

        {/* đź” CTA BUTTONS */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{
            animation: isVisible ? 'fadeInUp 1s ease-out 0.4s both' : 'none'
          }}
        >
          <a
            href="#menu"
            className="px-10 py-5 bg-primary hover:bg-primary-dark text-white text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Vezi Meniul
          </a>

          <a
            href="/locatie"
            className="px-10 py-5 bg-secondary hover:bg-secondary-dark text-white text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            ViziteazÄ-ne
          </a>
        </div>
      </div>

      {/* â¬‡ď¸Ź SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 text-white/80"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>

      {/* đźŽ¬ KEYFRAMES pentru animaČ›ii */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
```

## Fișier

Path complet: `K:\Video-Prelucrat\Vibe Coding\Proiect_01\components\HeroStarter.tsx`

De ce e relevant: este varianta alternativă/starter pentru hero, cu video local, clase globale de animație și CTA-uri.

Conținut integral:

```tsx
/**
 * đźŽŻ HERO STARTER - Versiunea simplÄ pentru cursanČ›i
 *
 * Aceasta este versiunea MINIMALISTÄ‚ de la care plecÄm Ă®n curs.
 * FÄrÄ animaČ›ii, fÄrÄ video, fÄrÄ JavaScript complex.
 * Doar HTML + Tailwind CSS = fundaČ›ia de bazÄ.
 */

export default function HeroStarter({ showHoliday = false }: { showHoliday?: boolean }) {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/2853793-uhd_3840_2160_24fps.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />

<div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        {/* TITLU PRINCIPAL */}
        <h1
          className="hero-anim text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight"
          style={{ textShadow: '0 4px 24px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.5)', animationDelay: '3.4s' }}
        >
          Cafeaua care te trezeČ™te
        </h1>

        {/* SUBTITLU */}
        <p
          className="hero-anim text-6xl md:text-7xl lg:text-8xl font-bold italic mb-8 text-white/80"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)', animationDelay: '3.7s' }}
        >
          Vino pentru aromÄ, rÄmĂ˘i pentru atmosferÄ
        </p>

        {/* BUTOANE CTA */}
        <div className="hero-anim flex flex-col sm:flex-row gap-6 justify-center" style={{ animationDelay: '4.0s' }}>
          <a
            href="#menu"
            className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Vezi Meniul
          </a>
          {showHoliday && (
            <a
              href="#sarbatori"
              className="px-8 py-4 bg-rose-500 hover:bg-rose-400 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              đźŽ‰ Meniu SÄrbÄtoare
            </a>
          )}
          <a
            href="#contact"
            className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/10"
          >
            ViziteazÄ-ne
          </a>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        style={{ opacity: 0, animation: 'fadeInUp 0.7s ease-out 4.3s forwards' }}
      >
        <a
          href="#features"
          className="block text-white/75 hover:text-amber-500 transition-colors duration-300 animate-bounce"
          aria-label="Scroll Ă®n jos"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </a>
      </div>
    </section>
  );
}
```

## Fișier

Path complet: `K:\Video-Prelucrat\Vibe Coding\Proiect_01\lib\hooks\useScrollAnimation.ts`

De ce e relevant: hook-ul suport pentru animațiile de intrare folosite în componenta `About`.

Conținut integral:

```ts
'use client';

import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(threshold = 0.1) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (elementRef.current) observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [threshold]);

  return { elementRef, isVisible };
}
```

## Observații tehnice certe, bazate strict pe codul actual

- Homepage-ul actual din `app/page.tsx` nu importă `Hero.tsx`, `HeroStarter.tsx`, `Preloader.tsx` sau `SmoothScroll.tsx`; hero-ul curent este scris inline în fișierul paginii.
- `app/layout.tsx` montează global `Navigation`, `ChatWidget` și `FABContact` pentru tot site-ul.
- Fonturile globale active sunt încărcate din `next/font/google`: `Plus_Jakarta_Sans`, `Playfair_Display` și `Inter`.
- `next.config.ts` permite imagini remote doar de la `images.unsplash.com`.
- În homepage, imaginile de produs și sezoniere folosesc `next/image`, dar în `components/About.tsx` imaginea principală folosește tag-ul HTML `<img>`.
- `components/About.tsx` folosește `useScrollAnimation` și un loop cu `requestAnimationFrame` pentru parallax.
- `components/ScrollAnimations.tsx` adaugă clasa `visible` pe elementele `.animate-on-scroll` și animează valorile din elementele cu `data-rating` și `data-reviews`.
- `components/Navigation.tsx` ascunde complet navbar-ul pe rutele care încep cu `/admin`.
- În `components/Navigation.tsx`, butonul de meniu pentru mobil are doar icon și `aria-label`, fără logică de deschidere a unui meniu mobil în acest fișier.
- `components/DayAtVibe.tsx` include suport explicit pentru `onFocus`, `onBlur`, `onTouchStart`, `onTouchEnd`, `tabIndex={0}` și `aria-live="polite"`.
- `components/FABContact.tsx` oferă două CTA-uri persistente: `tel:+40721234567` și `https://wa.me/40721234567`.
- `components/FooterStarter.tsx` este footer-ul folosit în `app/page.tsx`; `components/Footer.tsx` există în repo, dar nu este importat în homepage-ul curent.
- `components/CoffeeLoader.tsx` există și este referențiat de `components/MenuStarter.tsx`, nu de homepage-ul curent.
- `app/page.tsx` injectează JSON-LD de tip `CafeOrCoffeeShop` prin `dangerouslySetInnerHTML`.
- `app/layout.tsx` injectează un script inline în `<head>` pentru inițializarea temei din `localStorage`.
