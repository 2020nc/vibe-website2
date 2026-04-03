/**
 * Generează documentație profesionistă Vibe Caffè Website2
 * Output: docs/sesiuni/documentatie-vibe-caffe.docx + .pdf
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, BorderStyle, ShadingType, Table, TableRow,
  TableCell, WidthType, VerticalAlign
} from 'docx';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { createPdf } = require('C:/Users/Admin/.claude/pdf-utils/createPdf.js');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, '../docs/sesiuni');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const DATE = '2026-04-03';
const VERSION = '2.0';

// ═══════════════════════════════════════════════════════════════════════════════
// DATE DOCUMENTAȚIE
// ═══════════════════════════════════════════════════════════════════════════════

const DOC = {
  titlu: 'Documentație Tehnică — Vibe Caffè Website',
  versiune: `v${VERSION} · ${DATE}`,
  repo: 'https://github.com/2020nc/vibe-website2',
  live: 'https://vibe-website2.vercel.app',
  local: 'k:/Video-Prelucrat/Vibe Coding/Proiect_01/',

  sectiuni: [

    // ── 1. PREZENTARE ─────────────────────────────────────────────────────────
    {
      titlu: '1. Prezentare Generală',
      continut: [
        {
          tip: 'paragraf',
          text: 'Vibe Caffè Website este un site web complet pentru o cafenea fictivă din București, construit ca proiect de curs în cadrul programului Vibe Coding. Proiectul acoperă toate aspectele unui site de business real: prezentare, meniu, rezervări, locație, pagini legale și panou de administrare securizat.',
        },
        {
          tip: 'paragraf',
          text: 'Site-ul este optimizat pentru motoare de căutare (SEO), randează conținut pe server (SSR) și este deploiat automat pe platforma Vercel la fiecare commit pe branch-ul main.',
        },
        {
          tip: 'tabel',
          cap: ['Proprietate', 'Valoare'],
          randuri: [
            ['URL live', 'https://vibe-website2.vercel.app'],
            ['Repository GitHub', 'https://github.com/2020nc/vibe-website2'],
            ['Framework', 'Next.js 16 (App Router)'],
            ['Limbaj', 'TypeScript 5 (strict mode)'],
            ['UI', 'React 19 + Tailwind CSS 4'],
            ['Bază de date', 'Supabase (PostgreSQL)'],
            ['Deploy', 'Vercel (CI/CD automat)'],
            ['Versiune documentație', `v${VERSION} — ${DATE}`],
          ],
        },
      ],
    },

    // ── 2. STACK TEHNIC ───────────────────────────────────────────────────────
    {
      titlu: '2. Stack Tehnic',
      continut: [
        {
          tip: 'subtitlu',
          text: 'Frontend',
        },
        {
          tip: 'lista',
          items: [
            'Next.js 16 cu App Router — sistem de rutare bazat pe sistemul de fișiere, server components by default',
            'React 19 — biblioteca UI, folosit pentru componente interactive (client components)',
            'TypeScript 5 în mod strict — tipare statice pentru toate componentele și funcțiile',
            'Tailwind CSS 4 — CSS utility-first, fără fișiere CSS separate per componentă',
            'Plus Jakarta Sans (heading) + Inter (body) — fonturi Google încărcate prin next/font',
            'Lenis — smooth scroll library pentru animații fluide la navigare',
          ],
        },
        {
          tip: 'subtitlu',
          text: 'Backend & Date',
        },
        {
          tip: 'lista',
          items: [
            'Next.js API Routes (app/api/) — endpoint-uri REST rulate pe serverul Vercel',
            'Supabase — bază de date PostgreSQL hosted, accesat prin SDK JavaScript',
            'Row Level Security (RLS) activat pe toate tabelele publice din Supabase',
            'BNR XML Feed — curs valutar EUR/USD în timp real, cu cache în memorie de 1 oră',
          ],
        },
        {
          tip: 'subtitlu',
          text: 'Securitate',
        },
        {
          tip: 'lista',
          items: [
            'Next.js Middleware — protejează rutele /admin prin verificarea unui cookie httpOnly',
            'Cookie httpOnly admin_token — nu poate fi accesat prin JavaScript din browser',
            'Variabile de mediu — ADMIN_SECRET și cheile Supabase stocate în .env.local și Vercel Environment Variables, niciodată în cod sau Git',
            'robots.txt — blochează indexarea rutelor /admin și /api/ de motoarele de căutare',
          ],
        },
        {
          tip: 'subtitlu',
          text: 'DevOps',
        },
        {
          tip: 'lista',
          items: [
            'Vercel — platform as a service, deploy automat la fiecare git push pe main',
            'GitHub — repository privat, control versiune, istoric complet al modificărilor',
            'CI/CD implicit — fiecare push declanșează un build Vercel (~35 secunde)',
          ],
        },
      ],
    },

    // ── 3. STRUCTURA PROIECTULUI ──────────────────────────────────────────────
    {
      titlu: '3. Structura Proiectului',
      continut: [
        {
          tip: 'paragraf',
          text: 'Proiectul urmează structura standard Next.js App Router. Fiecare folder din app/ reprezintă o rută URL accesibilă în browser.',
        },
        {
          tip: 'cod',
          text:
`vibe-website2/
├── app/
│   ├── layout.tsx              # Root layout: fonturi, Navigation, metadata globală
│   ├── page.tsx                # Homepage (server component, SSR)
│   ├── globals.css             # Stiluri globale + CSS variables (--primary, --secondary)
│   ├── favicon.ico
│   ├── admin/
│   │   ├── page.tsx            # Dashboard admin (rezervări, meniu, sărbători)
│   │   └── login/page.tsx      # Formular login admin
│   ├── api/
│   │   ├── admin/login/        # POST — autentificare admin, setează cookie
│   │   ├── rezervari/          # PATCH (status), DELETE
│   │   ├── newsletter/         # POST — abonare newsletter
│   │   ├── menu/               # GET, POST, PATCH, DELETE (CRUD meniu)
│   │   ├── menu/bulk/          # POST — operații bulk pe produse
│   │   ├── curs/               # GET — curs BNR EUR/USD cu cache 1h
│   │   ├── holiday/            # GET, POST — configurare meniu sărbători
│   │   ├── promo/              # GET, POST — banner promoțional
│   │   └── chat/               # POST — Barista Bot (OpenAI, neactivat)
│   ├── meniu/page.tsx          # Meniu complet cu prețuri
│   ├── sarbatori/page.tsx      # Oferte sezoniere
│   ├── locatie/page.tsx        # Locație, hartă, galerie foto
│   ├── rezervari/page.tsx      # Formular rezervare clienți
│   ├── confidentialitate/      # Politică GDPR
│   ├── cookies/                # Politică cookies
│   └── termeni/                # Termeni și condiții
├── components/
│   ├── Navigation.tsx          # Navbar sticky cu active tracking la scroll
│   ├── HeroStarter.tsx         # Hero section cu video background
│   ├── MenuStarter.tsx         # Meniu interactiv cu filtrare pe categorii
│   ├── FeaturesStarter.tsx     # Secțiune beneficii (bento grid)
│   ├── About.tsx               # Secțiune despre cafenea
│   ├── FooterStarter.tsx       # Footer cu newsletter + linkuri legale
│   ├── HolidayMenu.tsx         # Meniu sărbători cu confetti
│   ├── ChatWidget.tsx          # Barista Bot UI (neactivat)
│   ├── Preloader.tsx           # Animație loading la prima încărcare
│   ├── SmoothScroll.tsx        # Wrapper Lenis smooth scroll
│   └── ThemeToggle.tsx         # Buton dark/light mode
├── lib/
│   ├── supabase.ts             # Client Supabase singleton
│   ├── menuData.ts             # Date statice meniu (fallback)
│   ├── knowledge-base.ts       # Date pentru Barista Bot
│   └── hooks/
│       └── useScrollAnimation.ts  # Intersection Observer hook
├── public/
│   ├── robots.txt              # SEO: Allow /, Disallow /admin /api/
│   ├── hero-coffee.mp4         # Video background Hero
│   └── DejaVuSans*.ttf         # Fonturi pentru export PDF
├── middleware.ts               # Protecție rute /admin
└── scripts/                   # Scripturi Node.js pentru documente`,
        },
      ],
    },

    // ── 4. PAGINI ─────────────────────────────────────────────────────────────
    {
      titlu: '4. Pagini și Rute',
      continut: [
        {
          tip: 'tabel',
          cap: ['Rută', 'Tip', 'Descriere'],
          randuri: [
            ['/', 'Server Component', 'Homepage: Hero, De ce Vibe?, preview meniu, oferte sezoniere, locație rapidă, JSON-LD'],
            ['/meniu', 'Server Component', '4 categorii, 24 produse cu prețuri în lei, taguri Bestseller/Sezonier'],
            ['/sarbatori', 'Server Component', '4 oferte sezoniere cu prețuri și CTA-uri individuale'],
            ['/locatie', 'Server Component', 'Adresă, program, hartă Google Maps embed, galerie 6 foto, mini-FAQ, facilități'],
            ['/rezervari', 'Client Component', 'Formular rezervare 3 pași: dată, oră, detalii — trimis în Supabase'],
            ['/admin', 'Client Component', 'Dashboard: listare rezervări, CRUD meniu, configurare sărbători/promo — PROTEJAT'],
            ['/admin/login', 'Client Component', 'Formular parolă — setează cookie httpOnly la autentificare reușită'],
            ['/confidentialitate', 'Server Component', 'Politică GDPR: date colectate, drepturi, retenție, contact'],
            ['/cookies', 'Server Component', '3 categorii cookies: tehnice, preferințe, analitice'],
            ['/termeni', 'Server Component', 'Termeni rezervări, prețuri, utilizare site, legislație română'],
          ],
        },
      ],
    },

    // ── 5. API ROUTES ─────────────────────────────────────────────────────────
    {
      titlu: '5. API Routes',
      continut: [
        {
          tip: 'paragraf',
          text: 'Toate endpoint-urile sunt definite în app/api/ și rulează ca funcții serverless pe Vercel. Nu există server dedicat — fiecare request pornește o funcție izolată.',
        },
        {
          tip: 'tabel',
          cap: ['Endpoint', 'Metode', 'Descriere'],
          randuri: [
            ['/api/admin/login', 'POST', 'Verifică parola vs ADMIN_SECRET, setează cookie httpOnly admin_token (7 zile)'],
            ['/api/rezervari', 'PATCH, DELETE', 'PATCH: schimbă status (în așteptare/confirmat/respins). DELETE: șterge rezervare după id'],
            ['/api/newsletter', 'POST', 'Abonare email în tabelul newsletter_subscribers. 409 dacă email există deja'],
            ['/api/menu', 'GET, POST, PATCH, DELETE', 'CRUD complet produse meniu din Supabase'],
            ['/api/menu/bulk', 'POST', 'Operații bulk: activare/dezactivare/ștergere multiple produse simultan'],
            ['/api/curs', 'GET', 'Curs valutar BNR (EUR, USD vs RON). Parsează XML, cache în memorie 1 oră'],
            ['/api/holiday', 'GET, POST', 'Configurare meniu sărbători: activare/dezactivare, produse speciale'],
            ['/api/promo', 'GET, POST', 'Banner promoțional: text, culoare, activ/inactiv — stocat în Supabase'],
            ['/api/chat', 'POST', 'Barista Bot powered by OpenAI — neactivat, necesită OPENAI_API_KEY'],
          ],
        },
      ],
    },

    // ── 6. BAZA DE DATE ───────────────────────────────────────────────────────
    {
      titlu: '6. Baza de Date (Supabase)',
      continut: [
        {
          tip: 'paragraf',
          text: 'Proiectul folosește Supabase ca backend as a service — PostgreSQL managed cu API REST automat și Row Level Security (RLS) activat pe toate tabelele publice.',
        },
        {
          tip: 'subtitlu',
          text: 'Tabele',
        },
        {
          tip: 'tabel',
          cap: ['Tabel', 'Coloane principale', 'Utilizare'],
          randuri: [
            ['rezervari', 'id, nume, email, telefon, data, ora, persoane, mesaj, status, created_at', 'Rezervările primite de la clienți prin formularul /rezervari'],
            ['menu_items', 'id, name, price, category, description, tag, active', 'Produsele din meniu, gestionate din panoul admin'],
            ['newsletter_subscribers', 'id, email, created_at', 'Emailuri abonate prin footer-ul site-ului'],
            ['holiday_config', 'id=1, active, title, items (JSON)', 'Configurare unică meniu sărbători (1 rând)'],
            ['promo_config', 'id=1, active, text, color, link', 'Configurare banner promoțional (1 rând)'],
          ],
        },
        {
          tip: 'subtitlu',
          text: 'Securitate date',
        },
        {
          tip: 'lista',
          items: [
            'RLS activat — fiecare tabel are politici care controlează cine poate citi/scrie',
            'Cheile Supabase (URL + anon key) sunt variabile de mediu, nu sunt expuse în cod',
            'Operațiile de scriere din admin folosesc aceleași chei — sistemul de autentificare este gestionat la nivel de middleware Next.js, nu Supabase Auth',
          ],
        },
      ],
    },

    // ── 7. SECURITATE ─────────────────────────────────────────────────────────
    {
      titlu: '7. Securitate',
      continut: [
        {
          tip: 'subtitlu',
          text: 'Autentificare Admin',
        },
        {
          tip: 'paragraf',
          text: 'Sistemul de autentificare pentru admin folosește un middleware Next.js care rulează la edge — înainte ca pagina să fie randată. Fluxul complet:',
        },
        {
          tip: 'lista',
          items: [
            '1. Utilizatorul accesează /admin',
            '2. middleware.ts verifică dacă există cookie-ul admin_token cu valoarea corectă (ADMIN_SECRET din env)',
            '3. Dacă nu există sau e incorect → redirect automat la /admin/login',
            '4. La login, /api/admin/login verifică parola și setează cookie httpOnly cu durata 7 zile',
            '5. Cookie httpOnly = JavaScript din browser NU poate citi sau modifica acest cookie (protecție XSS)',
          ],
        },
        {
          tip: 'subtitlu',
          text: 'Variabile de Mediu',
        },
        {
          tip: 'tabel',
          cap: ['Variabilă', 'Utilizare', 'Unde e setată'],
          randuri: [
            ['ADMIN_SECRET', 'Parola admin și valoarea cookie-ului', '.env.local + Vercel Environment'],
            ['NEXT_PUBLIC_SUPABASE_URL', 'URL-ul proiectului Supabase', '.env.local + Vercel Environment'],
            ['NEXT_PUBLIC_SUPABASE_ANON_KEY', 'Cheia publică Supabase (RLS activ)', '.env.local + Vercel Environment'],
            ['OPENAI_API_KEY', 'Pentru Barista Bot (neactivat momentan)', 'Nesetat'],
          ],
        },
        {
          tip: 'subtitlu',
          text: 'Protecție SEO',
        },
        {
          tip: 'lista',
          items: [
            'robots.txt — Disallow: /admin și /api/ — motoarele de căutare nu indexează rutele administrative',
            'Toate rutele /api/ returnează JSON, nu pagini HTML, deci nu sunt indexabile oricum',
          ],
        },
      ],
    },

    // ── 8. SEO ────────────────────────────────────────────────────────────────
    {
      titlu: '8. SEO și Performanță',
      continut: [
        {
          tip: 'subtitlu',
          text: 'Server Side Rendering (SSR)',
        },
        {
          tip: 'paragraf',
          text: 'Paginile principale sunt server components — conținutul este generat pe server și trimis ca HTML complet. Avantaje: Google indexează conținutul fără să execute JavaScript, timp de încărcare mai mic (First Contentful Paint redus), funcționează și cu JS dezactivat în browser.',
        },
        {
          tip: 'subtitlu',
          text: 'Metadata per pagină',
        },
        {
          tip: 'tabel',
          cap: ['Pagină', 'Title tag'],
          randuri: [
            ['/', 'Vibe Caffè — Cafea de Specialitate în București'],
            ['/meniu', 'Meniu & Prețuri | Vibe Caffè București'],
            ['/sarbatori', 'Oferte Sezoniere & Sărbători | Vibe Caffè București'],
            ['/locatie', 'Locație & Program | Vibe Caffè București'],
            ['/confidentialitate', 'Politică de Confidențialitate | Vibe Caffè'],
            ['/cookies', 'Politică Cookies | Vibe Caffè'],
            ['/termeni', 'Termeni și Condiții | Vibe Caffè'],
          ],
        },
        {
          tip: 'subtitlu',
          text: 'Date structurate (JSON-LD)',
        },
        {
          tip: 'paragraf',
          text: 'Homepage-ul include un script JSON-LD de tip CafeOrCoffeeShop (schema.org) cu: nume, URL, telefon, email, adresă poștală, program de funcționare (luni-vineri 08-22, weekend 09-23), tipuri de bucătărie și link spre meniu. Aceste date permit Google să afișeze un Knowledge Panel cu informații despre cafenea direct în rezultatele de căutare.',
        },
        {
          tip: 'subtitlu',
          text: 'OpenGraph',
        },
        {
          tip: 'paragraf',
          text: 'Metadata OpenGraph configurată pe homepage pentru preview corect când link-ul este distribuit pe Facebook, WhatsApp, Slack etc. Conține: title, description, URL canonic, siteName, locale (ro_RO), type (website).',
        },
      ],
    },

    // ── 9. COMPONENTE ─────────────────────────────────────────────────────────
    {
      titlu: '9. Componente Principale',
      continut: [
        {
          tip: 'tabel',
          cap: ['Componentă', 'Tip', 'Descriere'],
          randuri: [
            ['Navigation.tsx', 'Client', 'Navbar sticky fixat în layout.tsx. Active tracking prin Intersection Observer pe secțiunile: menu, de-ce-vibe, features, sarbatori, footer. Link-uri: Meniu, De ce Vibe?, Locație, Rezervă Masă.'],
            ['HeroStarter.tsx', 'Client', 'Hero section cu video background (hero-coffee.mp4), overlay, titlu animat și butoane CTA.'],
            ['MenuStarter.tsx', 'Client', 'Meniu interactiv: filtrare pe categorii, toggle 3/4/5 coloane (salvat în localStorage), prețuri EUR/USD via /api/curs.'],
            ['FeaturesStarter.tsx', 'Server', 'Secțiune "De ce Vibe?" cu 4 carduri beneficii.'],
            ['FooterStarter.tsx', 'Client', 'Newsletter conectat la /api/newsletter cu feedback: success, duplicate, error. Social media icons. Linkuri navigare și pagini legale.'],
            ['HolidayMenu.tsx', 'Client', 'Meniu special de sărbători cu animație confetti, activat din panoul admin.'],
            ['ThemeToggle.tsx', 'Client', 'Toggle dark/light mode cu atribut data-theme pe documentElement.'],
            ['Preloader.tsx', 'Client', 'Animație loading afișată la prima vizită, dispare după încărcare completă.'],
            ['SmoothScroll.tsx', 'Client', 'Wrapper Lenis pentru smooth scroll pe întregul site.'],
            ['ChatWidget.tsx', 'Client', 'Barista Bot UI — neactivat, necesită OPENAI_API_KEY.'],
          ],
        },
      ],
    },

    // ── 10. DESIGN SYSTEM ─────────────────────────────────────────────────────
    {
      titlu: '10. Design System',
      continut: [
        {
          tip: 'subtitlu',
          text: 'Paletă de culori (CSS Variables)',
        },
        {
          tip: 'tabel',
          cap: ['Variabilă', 'Valoare', 'Utilizare'],
          randuri: [
            ['--primary', '#14B8A6 (Teal)', 'Butoane principale, link-uri active, accente UI'],
            ['--primary-dark', '#0D9488', 'Hover pe butoane primare'],
            ['--secondary', '#F97316 (Orange)', 'Butoane secundare, CTA-uri evidențiate, prețuri sezoniere'],
            ['--secondary-dark', '#EA580C', 'Hover pe butoane secundare'],
            ['--background', '#FAFAFA', 'Fundal general light mode'],
            ['--foreground', '#1F2937', 'Text principal'],
            ['--glass-bg', 'rgba(255,255,255,0.85)', 'Carduri glassmorphism'],
          ],
        },
        {
          tip: 'subtitlu',
          text: 'Tipografie',
        },
        {
          tip: 'lista',
          items: [
            'Plus Jakarta Sans — heading font (H1-H6): modern, sans-serif, greutăți 400-800',
            'Inter — body font: curat, lizibil, greutăți 300-700',
            'Ambele fonturi încărcate prin next/font/google cu display:swap (nu blochează randarea)',
          ],
        },
        {
          tip: 'subtitlu',
          text: 'Dark Mode',
        },
        {
          tip: 'paragraf',
          text: 'Implementat prin atributul data-theme="dark" pe elementul <html>. Tailwind CSS folosește clasa dark: pentru stiluri condiționate. Preferința este salvată în localStorage și aplicată la încărcare pentru a evita flickerul.',
        },
      ],
    },

    // ── 11. DEPLOY ────────────────────────────────────────────────────────────
    {
      titlu: '11. Deploy și CI/CD',
      continut: [
        {
          tip: 'paragraf',
          text: 'Proiectul folosește Vercel ca platformă de hosting cu deploy continuu. Fluxul de lucru:',
        },
        {
          tip: 'lista',
          items: [
            '1. Modificare cod în local (VS Code sau Claude Code)',
            '2. git add + git commit + git push → GitHub',
            '3. Vercel detectează push-ul automat prin webhook GitHub',
            '4. Build Next.js (~35 secunde): TypeScript check, optimizare imagini, bundle JS/CSS',
            '5. Deploy pe CDN global Vercel — site live în ~60 secunde de la push',
          ],
        },
        {
          tip: 'subtitlu',
          text: 'Istoricul deployurilor (sesiunea curentă)',
        },
        {
          tip: 'tabel',
          cap: ['Commit', 'Descriere', 'Status'],
          randuri: [
            ['dc05dc4', 'Sprint 1 — Protecție admin middleware + login', 'Ready'],
            ['3d7d565', 'Sprint 2 — Homepage SSR + footer linkuri legale', 'Ready'],
            ['7901c1c', 'Sprint 3 — /rezervari cleanup (eliminat secțiunea admin)', 'Ready'],
            ['44ebd3b', 'Sprint 4 — /meniu + /sarbatori pagini noi', 'Ready'],
            ['5a06f8e', 'Sprint 5 — /locatie metadata + CTA-uri + mini-FAQ', 'Ready'],
            ['d4f86ac', 'Sprint 6 — Navbar link "De ce Vibe?" + active tracking', 'Ready'],
            ['4b38faf', 'Sprint 7 — Pagini legale + robots.txt', 'Ready ✦ Current'],
          ],
        },
      ],
    },

    // ── 12. FUNCȚIONALITĂȚI NEACTIVATE ────────────────────────────────────────
    {
      titlu: '12. Funcționalități în Așteptare',
      continut: [
        {
          tip: 'tabel',
          cap: ['Funcționalitate', 'Status', 'Condiție activare'],
          randuri: [
            ['Barista Bot (ChatWidget)', 'Cod complet, neactivat', 'Setare OPENAI_API_KEY în Vercel Environment Variables'],
            ['Sitemap XML (/sitemap.xml)', 'Referit în robots.txt, negenecat', 'Creare app/sitemap.ts cu Next.js Metadata API'],
            ['Email notificări rezervări', 'Neimplementat', 'Integrare Resend sau SendGrid în /api/rezervari'],
          ],
        },
      ],
    },

  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS DOCX
// ═══════════════════════════════════════════════════════════════════════════════

function mkPara(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, font: 'DejaVu Sans', size: 20, color: '374151', ...opts })],
    spacing: { after: 140 },
  });
}

function mkH1(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: 'DejaVu Sans', bold: true, size: 32, color: '111827' })],
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 500, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: '14B8A6' } },
  });
}

function mkH2(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: 'DejaVu Sans', bold: true, size: 24, color: '0D9488' })],
    spacing: { before: 300, after: 120 },
  });
}

function mkBullet(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: 'DejaVu Sans', size: 19, color: '374151' })],
    bullet: { level: 0 },
    spacing: { after: 80 },
  });
}

function mkCode(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: 'Courier New', size: 16, color: '1F2937' })],
    shading: { type: ShadingType.CLEAR, fill: 'F3F4F6' },
    spacing: { after: 40 },
  });
}

function mkTable(cap, randuri) {
  const headerCells = cap.map(c => new TableCell({
    children: [new Paragraph({
      children: [new TextRun({ text: c, bold: true, font: 'DejaVu Sans', size: 18, color: 'FFFFFF' })],
    })],
    shading: { type: ShadingType.CLEAR, fill: '0D9488' },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    verticalAlign: VerticalAlign.CENTER,
  }));

  const rows = [new TableRow({ children: headerCells, tableHeader: true })];

  randuri.forEach((rand, ri) => {
    rows.push(new TableRow({
      children: rand.map(cell => new TableCell({
        children: [new Paragraph({
          children: [new TextRun({ text: cell, font: 'DejaVu Sans', size: 17, color: '374151' })],
        })],
        shading: { type: ShadingType.CLEAR, fill: ri % 2 === 0 ? 'FFFFFF' : 'F0FDFA' },
        margins: { top: 60, bottom: 60, left: 120, right: 120 },
      })),
    }));
  });

  return new Table({
    rows,
    width: { size: 100, type: WidthType.PERCENTAGE },
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// GENERARE DOCX
// ═══════════════════════════════════════════════════════════════════════════════

async function genDocx(outPath) {
  const children = [];

  // Pagina de titlu
  children.push(new Paragraph({
    children: [new TextRun({ text: DOC.titlu, font: 'DejaVu Sans', bold: true, size: 44, color: '111827' })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 800, after: 200 },
  }));
  children.push(new Paragraph({
    children: [new TextRun({ text: DOC.versiune, font: 'DejaVu Sans', size: 22, color: '6B7280' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
  }));
  children.push(new Paragraph({
    children: [new TextRun({ text: DOC.live, font: 'DejaVu Sans', size: 20, color: '0D9488' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 800 },
  }));
  children.push(new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 3, color: '14B8A6' } },
    spacing: { after: 600 },
  }));

  // Cuprins simplu
  children.push(new Paragraph({
    children: [new TextRun({ text: 'Cuprins', font: 'DejaVu Sans', bold: true, size: 28, color: '111827' })],
    spacing: { after: 200 },
  }));
  DOC.sectiuni.forEach(s => {
    children.push(new Paragraph({
      children: [new TextRun({ text: s.titlu, font: 'DejaVu Sans', size: 20, color: '374151' })],
      bullet: { level: 0 },
      spacing: { after: 80 },
    }));
  });
  children.push(new Paragraph({ spacing: { after: 400 } }));

  // Secțiuni
  for (const sec of DOC.sectiuni) {
    children.push(mkH1(sec.titlu));
    for (const bloc of sec.continut) {
      if (bloc.tip === 'paragraf') children.push(mkPara(bloc.text));
      else if (bloc.tip === 'subtitlu') children.push(mkH2(bloc.text));
      else if (bloc.tip === 'lista') bloc.items.forEach(i => children.push(mkBullet(i)));
      else if (bloc.tip === 'cod') {
        bloc.text.split('\n').forEach(l => children.push(mkCode(l)));
        children.push(new Paragraph({ spacing: { after: 200 } }));
      }
      else if (bloc.tip === 'tabel') {
        children.push(mkTable(bloc.cap, bloc.randuri));
        children.push(new Paragraph({ spacing: { after: 200 } }));
      }
    }
  }

  // Footer document
  children.push(new Paragraph({
    children: [new TextRun({ text: `Vibe Caffè Website · Documentație Tehnică v${VERSION} · ${DATE}`, font: 'DejaVu Sans', size: 16, color: '9CA3AF', italics: true })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 600 },
  }));

  const doc = new Document({ sections: [{ children }] });
  fs.writeFileSync(outPath, await Packer.toBuffer(doc));
  console.log(`✅ DOCX: ${outPath}`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// GENERARE PDF
// ═══════════════════════════════════════════════════════════════════════════════

async function genPdf(outPath) {
  const doc = createPdf({ size: 'A4', margins: { top: 55, bottom: 55, left: 65, right: 65 } });
  const out = fs.createWriteStream(outPath);
  doc.pipe(out);

  const LINE_X1 = 65, LINE_X2 = 530;
  const hline = (color = '#E5E7EB') => {
    doc.moveTo(LINE_X1, doc.y).lineTo(LINE_X2, doc.y).strokeColor(color).lineWidth(0.8).stroke();
    doc.moveDown(0.6);
  };

  // ── Pagina de titlu ──
  doc.moveDown(3);
  doc.font('Bold').fontSize(22).fillColor('#111827').text(DOC.titlu, { align: 'center' });
  doc.moveDown(0.5);
  doc.font('Regular').fontSize(11).fillColor('#6B7280').text(DOC.versiune, { align: 'center' });
  doc.moveDown(0.3);
  doc.font('Regular').fontSize(10).fillColor('#0D9488').text(DOC.live, { align: 'center' });
  doc.moveDown(0.3);
  doc.font('Regular').fontSize(10).fillColor('#6B7280').text(DOC.repo, { align: 'center' });
  doc.moveDown(2);
  hline('#14B8A6');

  // ── Cuprins ──
  doc.moveDown(0.5);
  doc.font('Bold').fontSize(13).fillColor('#111827').text('Cuprins');
  doc.moveDown(0.5);
  for (const s of DOC.sectiuni) {
    doc.font('Regular').fontSize(10).fillColor('#374151').text(`• ${s.titlu}`, { indent: 10 });
    doc.moveDown(0.15);
  }
  doc.addPage();

  // ── Secțiuni ──
  for (const sec of DOC.sectiuni) {
    if (doc.y > 650) doc.addPage();

    // H1
    doc.font('Bold').fontSize(14).fillColor('#111827').text(sec.titlu);
    doc.moveDown(0.2);
    hline('#14B8A6');

    for (const bloc of sec.continut) {

      if (bloc.tip === 'paragraf') {
        if (doc.y > 710) doc.addPage();
        doc.font('Regular').fontSize(10).fillColor('#374151').text(bloc.text, { lineGap: 2.5 });
        doc.moveDown(0.5);
      }

      else if (bloc.tip === 'subtitlu') {
        if (doc.y > 700) doc.addPage();
        doc.moveDown(0.3);
        doc.font('Bold').fontSize(11).fillColor('#0D9488').text(bloc.text);
        doc.moveDown(0.3);
      }

      else if (bloc.tip === 'lista') {
        for (const item of bloc.items) {
          if (doc.y > 720) doc.addPage();
          doc.font('Regular').fontSize(9.5).fillColor('#374151').text(`• ${item}`, { indent: 12, lineGap: 2 });
          doc.moveDown(0.2);
        }
        doc.moveDown(0.3);
      }

      else if (bloc.tip === 'cod') {
        if (doc.y > 650) doc.addPage();
        const startY = doc.y;
        doc.font('Regular').fontSize(8).fillColor('#1F2937')
          .text(bloc.text, { lineGap: 1.5 });
        doc.moveDown(0.5);
      }

      else if (bloc.tip === 'tabel') {
        if (doc.y > 620) doc.addPage();
        const colW = Math.floor(465 / bloc.cap.length);

        // Header tabel
        const hY = doc.y;
        doc.rect(LINE_X1, hY, 465, 18).fill('#0D9488');
        bloc.cap.forEach((c, i) => {
          doc.font('Bold').fontSize(8.5).fillColor('#FFFFFF')
            .text(c, LINE_X1 + i * colW + 4, hY + 4, { width: colW - 8, lineBreak: false });
        });
        doc.y = hY + 20;

        // Rânduri tabel
        for (let ri = 0; ri < bloc.randuri.length; ri++) {
          const rand = bloc.randuri[ri];
          const rowH = 16;
          const rY = doc.y;

          if (rY + rowH > 760) {
            doc.addPage();
            // Reafișează header
            const hY2 = doc.y;
            doc.rect(LINE_X1, hY2, 465, 18).fill('#0D9488');
            bloc.cap.forEach((c, i) => {
              doc.font('Bold').fontSize(8.5).fillColor('#FFFFFF')
                .text(c, LINE_X1 + i * colW + 4, hY2 + 4, { width: colW - 8, lineBreak: false });
            });
            doc.y = hY2 + 20;
          }

          const curY = doc.y;
          const bgColor = ri % 2 === 0 ? '#FFFFFF' : '#F0FDFA';
          doc.rect(LINE_X1, curY, 465, rowH).fill(bgColor);
          rand.forEach((cell, i) => {
            doc.font('Regular').fontSize(8).fillColor('#374151')
              .text(cell, LINE_X1 + i * colW + 4, curY + 3, { width: colW - 8, lineBreak: false });
          });
          doc.rect(LINE_X1, curY, 465, rowH).stroke('#E5E7EB');
          doc.y = curY + rowH;
        }
        doc.moveDown(0.8);
      }
    }
    doc.moveDown(0.5);
  }

  // Footer final
  doc.moveDown(1);
  hline('#E5E7EB');
  doc.font('Italic').fontSize(8.5).fillColor('#9CA3AF')
    .text(`Vibe Caffè Website · Documentație Tehnică v${VERSION} · ${DATE}`, { align: 'center' });

  doc.end();
  await new Promise((res, rej) => { out.on('finish', res); out.on('error', rej); });
  console.log(`✅ PDF:  ${outPath}`);
}

// ── Main ──
const base = path.join(OUTPUT_DIR, 'documentatie-vibe-caffe');
await genDocx(`${base}.docx`);
await genPdf(`${base}.pdf`);
console.log('\n🎉 Documentație generată!');
