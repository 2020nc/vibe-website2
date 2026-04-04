/**
 * Documentație Tehnică Amănunțită v2.0 — Vibe Caffè
 * Include toate sesiunile: dec 2025 – apr 2026
 * Output: docs/documentatie-tehnica-v2.docx + .pdf
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, BorderStyle, Table, TableRow, TableCell,
  WidthType, VerticalAlign, ShadingType, PageBreak,
} from 'docx';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { createPdf } = require('C:/Users/Admin/.claude/pdf-utils/createPdf.js');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, '../docs');

const DATE = '2026-04-04 (actualizat sesiunea 2)';
const STUDENT = '2020nc';
const SITE_URL = 'vibe-website2.vercel.app';
const REPO_URL = 'github.com/2020nc/vibe-website2';

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function h1(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 34, color: '14B8A6' })],
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 500, after: 220 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '14B8A6' } },
    pageBreakBefore: true,
  });
}
function h1NoBreak(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 34, color: '14B8A6' })],
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 500, after: 220 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '14B8A6' } },
  });
}
function h2(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 26, color: '1F2937' })],
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 320, after: 160 },
  });
}
function h3(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 22, color: '374151' })],
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 220, after: 100 },
  });
}
function p(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22 })],
    spacing: { after: 140 },
  });
}
function bullet(text, level = 0) {
  return new Paragraph({
    children: [new TextRun({ text: `${level === 0 ? '•' : '◦'} ${text}`, size: 21 })],
    spacing: { after: 80 },
    indent: { left: 400 + level * 320 },
  });
}
function code(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: 'Courier New', size: 18, color: '0D9488' })],
    shading: { type: ShadingType.SOLID, color: 'F0FDFA' },
    spacing: { after: 60 },
    indent: { left: 400, right: 400 },
    border: { left: { style: BorderStyle.SINGLE, size: 6, color: '14B8A6' } },
  });
}
function note(text) {
  return new Paragraph({
    children: [new TextRun({ text: `Nota: ${text}`, size: 20, italics: true, color: '6B7280' })],
    spacing: { after: 120 },
    indent: { left: 300 },
  });
}
function important(text) {
  return new Paragraph({
    children: [new TextRun({ text: `! IMPORTANT: ${text}`, size: 21, bold: true, color: 'DC2626' })],
    spacing: { after: 120 },
    shading: { type: ShadingType.SOLID, color: 'FEF2F2' },
    indent: { left: 300, right: 300 },
  });
}
function space() { return new Paragraph({ spacing: { after: 100 } }); }

function tRow(cells, isHeader = false) {
  return new TableRow({
    tableHeader: isHeader,
    children: cells.map((text, i) => new TableCell({
      children: [new Paragraph({
        children: [new TextRun({ text: text || '', bold: isHeader, size: isHeader ? 20 : 19, color: isHeader ? 'FFFFFF' : '1F2937' })],
      })],
      shading: isHeader ? { type: ShadingType.SOLID, color: '0D9488' } : (i % 2 === 0 ? { type: ShadingType.SOLID, color: 'F9FAFB' } : undefined),
      verticalAlign: VerticalAlign.CENTER,
    })),
  });
}

function table(headers, rows) {
  const colCount = headers.length;
  const pct = Math.floor(100 / colCount);
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map(h => new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 20, color: 'FFFFFF' })] })],
          shading: { type: ShadingType.SOLID, color: '0D9488' },
          width: { size: pct, type: WidthType.PERCENTAGE },
          verticalAlign: VerticalAlign.CENTER,
        })),
      }),
      ...rows.map((row, ri) => new TableRow({
        children: row.map((cell, ci) => new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: cell || '', size: 19, color: '1F2937' })] })],
          shading: ri % 2 === 0 ? { type: ShadingType.SOLID, color: 'F0FDFA' } : undefined,
          width: { size: pct, type: WidthType.PERCENTAGE },
          verticalAlign: VerticalAlign.CENTER,
        })),
      })),
    ],
  });
}

// ─── DOCUMENT ─────────────────────────────────────────────────────────────────

const children = [

  // ══════════════════════════════════════════════
  // PAGINA DE TITLU
  // ══════════════════════════════════════════════
  new Paragraph({ spacing: { before: 800, after: 200 } }),
  new Paragraph({
    children: [new TextRun({ text: 'VIBE CAFFE', bold: true, size: 72, color: '14B8A6' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Documentatie Tehnica Amanuntita', bold: true, size: 40, color: '1F2937' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Versiunea 2.0 — Editia finala', size: 26, color: '6B7280' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
  }),
  new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '14B8A6' } },
    spacing: { after: 240 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Student: ', bold: true, size: 24 }), new TextRun({ text: STUDENT, size: 24 })],
    alignment: AlignmentType.CENTER, spacing: { after: 80 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Data: ', bold: true, size: 24 }), new TextRun({ text: DATE, size: 24 })],
    alignment: AlignmentType.CENTER, spacing: { after: 80 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Curs: ', bold: true, size: 24 }), new TextRun({ text: 'Vibe Coding', size: 24 })],
    alignment: AlignmentType.CENTER, spacing: { after: 80 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Site live: ', bold: true, size: 24 }), new TextRun({ text: SITE_URL, size: 24, color: '0D9488' })],
    alignment: AlignmentType.CENTER, spacing: { after: 80 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Repository: ', bold: true, size: 24 }), new TextRun({ text: REPO_URL, size: 24, color: '0D9488' })],
    alignment: AlignmentType.CENTER, spacing: { after: 400 },
  }),

  // ══════════════════════════════════════════════
  // 1. INTRODUCERE
  // ══════════════════════════════════════════════
  h1NoBreak('1. Introducere si Context'),

  p('Proiectul "Vibe Caffe" este un site web complet functional pentru o cafenea de specialitate fictiva din Bucuresti, dezvoltat integral in cadrul cursului Vibe Coding (decembrie 2025 – aprilie 2026). Proiectul demonstreaza capacitatea de a construi o aplicatie web moderna, de la zero pana la productie, cu tehnologii utilizate in industrie.'),

  p('Metodologia aplicata este "Vibe Coding" — un proces iterativ in care studentul preia rolul de arhitect de produs (defineste cerintele, ia decizii, valideaza rezultatele), iar asistentul AI (Claude Sonnet 4.6) genereaza codul. Aceasta abordare expune studentul la cod real de productie si accelereaza formarea gandirii ingineresti.'),

  space(),
  h2('1.1 Cifre cheie ale proiectului'),
  table(
    ['Indicator', 'Valoare'],
    [
      ['Commit-uri Git totale', '50+ commit-uri pe branch main'],
      ['Sesiuni de lucru', '10+ sesiuni (dec 2025 – apr 2026)'],
      ['Pagini publice', '9 pagini (/, /meniu, /rezervari, /locatie, /sarbatori, /confidentialitate, /cookies, /termeni, /sitemap.xml)'],
      ['Pagini admin', '2 pagini (/admin/login, /admin)'],
      ['Componente React', '15+ componente (server + client)'],
      ['API Routes', '5 route-uri (/api/curs, /api/newsletter, /api/rezervari, /api/promo, /api/admin/*)'],
      ['Tabele Supabase', '5 tabele (rezervari, menu_items, holiday_config, newsletter_subscribers, promo_config)'],
      ['Site live', 'https://vibe-website2.vercel.app'],
    ]
  ),

  space(),
  h2('1.2 Obiective pedagogice atinse'),
  bullet('Next.js 16 App Router — server components, client components, API routes, middleware'),
  bullet('TypeScript strict — interfete, tipuri generice, tipizare API responses'),
  bullet('Supabase (PostgreSQL cloud) — CRUD, filtrare, paginare, ALTER TABLE'),
  bullet('Autentificare — cookie httpOnly, middleware.ts, bcrypt hash'),
  bullet('SEO tehnic — metadata, OpenGraph, JSON-LD, sitemap.xml, robots.txt'),
  bullet('Interactivitate — dark mode, toggle coloane, wizard rezervari, confetti, preloader'),
  bullet('Integrari externe — BNR XML (curs valutar), Google Maps embed, Vercel Analytics'),
  bullet('CI/CD — deploy automat Vercel la fiecare git push pe main'),

  // ══════════════════════════════════════════════
  // 2. STACK TEHNIC
  // ══════════════════════════════════════════════
  h1('2. Stack Tehnic Detaliat'),

  h2('2.1 Front-end'),
  table(
    ['Tehnologie', 'Versiune', 'Utilizare'],
    [
      ['Next.js', '16 (canary)', 'Framework principal — App Router, SSR, SSG, API Routes'],
      ['React', '19', 'UI components, hooks, suspense'],
      ['TypeScript', '5 (strict)', 'Type safety, interfete, enums'],
      ['Tailwind CSS', '4', 'Utility-first CSS, dark mode, responsive'],
      ['Lenis', 'latest', 'Smooth scroll global'],
      ['canvas-confetti', 'latest', 'Animatie confetti pe pagina Sarbatori'],
    ]
  ),

  space(),
  h2('2.2 Back-end si Baze de Date'),
  table(
    ['Tehnologie', 'Versiune', 'Utilizare'],
    [
      ['Supabase', 'latest SDK', 'PostgreSQL cloud — baza de date, API REST automat'],
      ['Next.js API Routes', '—', 'REST endpoints custom in /app/api/'],
      ['BNR XML Feed', '—', 'Curs valutar EUR/USD, cache 1h in memorie'],
      ['bcryptjs', 'latest', 'Hash parola admin (nu se stocheaza parola plain text)'],
    ]
  ),

  space(),
  h2('2.3 Infrastructura si DevOps'),
  table(
    ['Serviciu', 'Rol'],
    [
      ['Vercel', 'Hosting + CI/CD automat la push pe GitHub'],
      ['GitHub', 'Repository sursa, version control'],
      ['Vercel Environment Variables', 'Stocare securizata: ADMIN_SECRET, SUPABASE_URL, SUPABASE_ANON_KEY'],
      ['Vercel Analytics', 'Tracking vizitatori (optional, activat)'],
    ]
  ),

  // ══════════════════════════════════════════════
  // 3. ARHITECTURA
  // ══════════════════════════════════════════════
  h1('3. Arhitectura Aplicatiei'),

  h2('3.1 Fluxul general al datelor'),
  code('Browser (client)'),
  code('   |'),
  code('   | HTTP request'),
  code('   v'),
  code('Next.js Server (Vercel)'),
  code('   |-- Server Components  --> render HTML cu date din Supabase'),
  code('   |-- Client Components  --> interactivitate (useState, useEffect)'),
  code('   |-- API Routes         --> /api/* (REST pentru front-end si formulare)'),
  code('   |-- Middleware         --> verifica cookie admin_token pentru /admin/*'),
  code('   |'),
  code('   | Supabase JS Client'),
  code('   v'),
  code('Supabase (PostgreSQL)'),
  code('   |-- menu_items         --> produse meniu cu categorii, taguri, reduceri'),
  code('   |-- rezervari          --> rezervari clienti'),
  code('   |-- newsletter_subscribers --> email-uri abonatii'),
  code('   |-- holiday_config     --> configuratie sarbatori (id=1)'),
  code('   |-- promo_config       --> banner promotional (id=1)'),

  space(),
  h2('3.2 Structura fisierelor (relevanta)'),
  code('app/'),
  code('  layout.tsx              # Root layout: fonts, Navigation, SmoothScroll'),
  code('  page.tsx                # Homepage SSR (Server Component)'),
  code('  sitemap.ts              # Sitemap XML automat (MetadataRoute.Sitemap)'),
  code('  meniu/page.tsx          # Pagina /meniu cu fetch Supabase + deduplicare'),
  code('  sarbatori/page.tsx      # Pagina /sarbatori (Server Component)'),
  code('  locatie/page.tsx        # Pagina /locatie cu metadata si mini-FAQ'),
  code('  rezervari/page.tsx      # Formular rezervari 3 pasi wizard'),
  code('  admin/'),
  code('    login/page.tsx        # Formular login admin (httpOnly cookie)'),
  code('    page.tsx              # Dashboard admin cu tabs'),
  code('  api/'),
  code('    curs/route.ts         # BNR XML feed, cache 1h'),
  code('    newsletter/route.ts   # INSERT in newsletter_subscribers'),
  code('    rezervari/route.ts    # GET/POST rezervari'),
  code('    promo/route.ts        # GET/POST promo_config'),
  code('  confidentialitate/      # Pagina legala'),
  code('  cookies/                # Pagina legala'),
  code('  termeni/                # Pagina legala'),
  code('components/'),
  code('  Navigation.tsx          # Navbar sticky, dark mode toggle, active tracking'),
  code('  HeroStarter.tsx         # Hero cu video background'),
  code('  MenuStarter.tsx         # Meniu client: filtre, toggle coloane, valuta, badges'),
  code('  ReviewBar.tsx           # Server Component: rating 4.9/5 + 3 recenzii'),
  code('  FooterStarter.tsx       # Footer: newsletter, linkuri legale'),
  code('  Preloader.tsx           # Animatie loading initiala'),
  code('  About.tsx               # Sectiune despre cafenea'),
  code('  ChatWidget.tsx          # Barista Bot (dezactivat — fara OPENAI_API_KEY)'),
  code('middleware.ts             # Protectie /admin/* cu cookie admin_token'),
  code('lib/'),
  code('  menuData.ts             # Date fallback meniu (cand Supabase nu raspunde)'),

  // ══════════════════════════════════════════════
  // 4. BAZA DE DATE
  // ══════════════════════════════════════════════
  h1('4. Baza de Date Supabase'),

  h2('4.1 Schema tabelelor'),

  h3('Tabelul menu_items'),
  table(
    ['Coloana', 'Tip', 'Descriere'],
    [
      ['id', 'UUID (PK)', 'Identificator unic'],
      ['name', 'TEXT NOT NULL', 'Numele produsului'],
      ['price', 'NUMERIC', 'Pret in RON'],
      ['category', 'TEXT', 'Categoria: Espresso, Cold Brew, Specialty, Vegan, Alternative, Patiserie'],
      ['description', 'TEXT', 'Descriere bogata: senzorial, variante lapte, volum'],
      ['image', 'TEXT', 'URL imagine (Unsplash)'],
      ['vegan', 'BOOLEAN', 'True daca produsul este vegan'],
      ['discount', 'NUMERIC', 'Reducere procentuala (0-100)'],
      ['addons', 'TEXT[]', 'Array add-on-uri disponibile'],
      ['tag', 'TEXT', 'Badge comercial: Bestseller / Sezonier / Signature / Staff Pick'],
    ]
  ),
  note('Coloana tag a fost adaugata in sesiunea 2026-04-04 cu: ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS tag TEXT;'),

  space(),
  h3('Tabelul rezervari'),
  table(
    ['Coloana', 'Tip', 'Descriere'],
    [
      ['id', 'UUID (PK)', 'Identificator unic'],
      ['name', 'TEXT', 'Numele clientului'],
      ['email', 'TEXT', 'Email client'],
      ['phone', 'TEXT', 'Telefon client'],
      ['date', 'DATE', 'Data rezervarii'],
      ['time', 'TEXT', 'Ora rezervarii'],
      ['guests', 'INTEGER', 'Numar persoane'],
      ['message', 'TEXT', 'Mesaj/cerinte speciale'],
      ['status', 'TEXT', 'pending / confirmed / cancelled'],
      ['created_at', 'TIMESTAMPTZ', 'Data crearii (auto)'],
    ]
  ),

  space(),
  h3('Tabelul newsletter_subscribers'),
  table(
    ['Coloana', 'Tip', 'Descriere'],
    [
      ['id', 'UUID (PK)', 'Identificator unic'],
      ['email', 'TEXT UNIQUE', 'Email abonat (unic)'],
      ['subscribed_at', 'TIMESTAMPTZ', 'Data abonarii (auto)'],
    ]
  ),

  space(),
  h3('Tabelul holiday_config (id=1)'),
  table(
    ['Coloana', 'Tip', 'Descriere'],
    [
      ['id', 'INTEGER (PK)', 'Intotdeauna 1 — un singur rand de configuratie'],
      ['active', 'BOOLEAN', 'Activeaza/dezactiveaza meniul sarbatori'],
      ['holiday_name', 'TEXT', 'Numele sarbatorii (ex: Paste 2026)'],
      ['items', 'JSONB', 'Array de produse sezoniere cu name, price, desc'],
    ]
  ),

  space(),
  h3('Tabelul promo_config (id=1)'),
  table(
    ['Coloana', 'Tip', 'Descriere'],
    [
      ['id', 'INTEGER (PK)', 'Intotdeauna 1'],
      ['active', 'BOOLEAN', 'Afiseaza/ascunde bannerul promotional'],
      ['message', 'TEXT', 'Textul bannerului'],
      ['bg_color', 'TEXT', 'Culoarea de fundal (hex)'],
      ['text_color', 'TEXT', 'Culoarea textului (hex)'],
    ]
  ),

  // ══════════════════════════════════════════════
  // 5. PAGINI SI FUNCTIONALITATI
  // ══════════════════════════════════════════════
  h1('5. Pagini si Functionalitati'),

  h2('5.1 Homepage (/) — Server Component SSR'),
  p('Homepage-ul este un Server Component Next.js (fara "use client"), ceea ce inseamna ca HTML-ul este generat pe server. Avantaje: indexare Google imediata, metadata Open Graph, JSON-LD structured data, timp de incarcare mai rapid (no JS bundle pentru continut static).'),
  h3('Sectiuni homepage (in ordine):'),
  bullet('Hero section — gradient bg, titlu H1, 2 butoane CTA (Vezi meniu / Rezerva masa)'),
  bullet('ReviewBar — Server Component: rating 4.9/5 din 340+ recenzii, 3 testimoniale'),
  bullet('"De ce Vibe?" — 4 carduri beneficii cu iconite emoji'),
  bullet('"Din meniul nostru" — preview 6 produse hardcodate (SSR, fara fetch)'),
  bullet('"Oferte sezoniere" — 3 produse sezoniere cu descrieri si CTA'),
  bullet('CTA secundar rezervare — banda teal cu buton orange'),
  bullet('"Unde ne gasesti" — adresa, program, telefon, link Google Maps'),
  bullet('About — sectiune despre cafenea'),
  bullet('Footer — newsletter, linkuri legale, social media'),
  note('JSON-LD LocalBusiness este inclus la finalul paginii pentru indexare Google Knowledge Panel.'),

  space(),
  h2('5.2 Pagina /meniu — Client Component cu date Supabase'),
  p('Pagina /meniu face fetch din Supabase la server-side (initial data), apoi trece datele catre componenta client MenuStarter.tsx care gestioneaza filtrele si interactivitatea.'),
  h3('Functionalitati MenuStarter.tsx:'),
  bullet('Filtrare pe categorii (Espresso, Cold Brew, Specialty, Vegan, Alternative, Patiserie)'),
  bullet('Toggle 3/4/5 coloane (salvat in localStorage)'),
  bullet('Conversie preturi EUR/USD via /api/curs (BNR XML, cache 1h)'),
  bullet('Badge comerciale: Bestseller (amber), Sezonier (verde), Signature (teal), Staff Pick (orange)'),
  bullet('Reduceri per produs (badge % rosu daca discount > 0)'),
  bullet('Add-on-uri selectabile pe card'),
  bullet('Deduplicare produse duplicate (Set pe cheie category__name)'),
  note('Deduplicarea a fost adaugata in sesiunea 2026-04-04 pentru a elimina produse duplicate din Supabase (Cold Brew Classic x2, Cold Brew Tonic x2, Nitro Cold Brew x2).'),

  space(),
  h2('5.3 Pagina /rezervari — Formular unic (1 click)'),
  p('Refactorizat complet in sesiunea 2 (2026-04-04). Formularul pe 3 pasi a fost inlocuit cu un layout pe 2 coloane care permite rezervarea in 1 singur click.'),
  h3('Layout 2 coloane:'),
  bullet('Coloana stanga (2fr): calendar data + grid butoane ore + ticket rezumat stil bilet'),
  bullet('Coloana dreapta (3fr): date personale (nume, email, telefon, persoane, mesaj) + buton Rezerva acum'),
  h3('Functionalitati:'),
  bullet('Ore dinamice in functie de ziua saptamanii: Luni-Vineri 07:00-22:00, Sambata-Duminica 08:00-23:00'),
  bullet('Ticket rezumat apare automat cand sunt selectate data SI ora (stil bilet cafenea cu header teal)'),
  bullet('Butoane alternative "Suna acum" + "WhatsApp" in navbar sub butonul Rezerva Masa'),
  bullet('Validare ora obligatorie inainte de submit'),
  p('La submit, datele sunt trimise direct catre Supabase (INSERT in tabelul rezervari cu status="in asteptare").'),

  space(),
  h2('5.4 Pagina /locatie'),
  bullet('Metadata title + description SEO'),
  bullet('Google Maps embed (Bld. Regina Elisabeta 30, Sector 5)'),
  bullet('3 CTA-uri grupate: Rezerva masa / Suna acum / Deschide in Maps'),
  bullet('Mini-FAQ cu 3 intrebari frecvente (Parcare? Acces? Program sarbatori?)'),
  bullet('Galerie foto si lista facilitati'),

  space(),
  h2('5.5 Pagina /sarbatori'),
  bullet('4 oferte sezoniere cu CTA-uri individuale'),
  bullet('Animatie confetti (canvas-confetti) la incarcarea paginii'),
  bullet('Configurabila din Admin (tabelul holiday_config)'),

  space(),
  h2('5.6 Pagina /admin — Dashboard protejat'),
  bullet('Protejat prin middleware.ts — redirect la /admin/login daca nu exista cookie admin_token'),
  bullet('Login cu parola din env var ADMIN_SECRET, cookie httpOnly (nu accesibil din JavaScript)'),
  bullet('Tab 1 - Rezervari: tabel cu toate rezervarile, export Excel si PDF, bulk actions (confirmare/stergere)'),
  bullet('Tab 2 - Meniu CRUD: adauga/editeaza/sterge produse, wizard cu imagine, categorii, reduceri, add-on-uri'),
  bullet('Tab 3 - Sarbatori: activeaza/dezactiveaza meniu sarbatori, editeaza produse sezoniere'),
  bullet('Tab 4 - Setari: configureaza bannerul promotional (text, culori, activ/inactiv)'),

  // ══════════════════════════════════════════════
  // 6. COMPONENTE CHEIE
  // ══════════════════════════════════════════════
  h1('6. Componente Cheie — Detalii Tehnice'),

  h2('6.1 middleware.ts — Protectia /admin'),
  p('Middleware-ul Next.js ruleaza inainte de orice request catre /admin sau /admin/*. Verifica existenta cookie-ului admin_token si valoarea acestuia comparand cu ADMIN_SECRET din env vars.'),
  code('// middleware.ts'),
  code('import { NextResponse } from "next/server"'),
  code('import type { NextRequest } from "next/server"'),
  code(''),
  code('export function middleware(request: NextRequest) {'),
  code('  const token = request.cookies.get("admin_token")?.value'),
  code('  if (token !== process.env.ADMIN_SECRET) {'),
  code('    return NextResponse.redirect(new URL("/admin/login", request.url))'),
  code('  }'),
  code('  return NextResponse.next()'),
  code('}'),
  code(''),
  code('export const config = {'),
  code('  matcher: ["/admin", "/admin/:path*"],'),
  code('}'),
  note('Cookie-ul admin_token este httpOnly — nu poate fi citit sau modificat din JavaScript (protectie XSS).'),

  space(),
  h2('6.2 /api/curs — BNR XML Feed'),
  p('Aceasta ruta API face fetch la feed-ul XML oficial BNR (Banca Nationala a Romaniei) pentru cursul EUR si USD, il parseaza si returneaza ratele de schimb. Datele sunt cachelate in memorie 1 ora pentru a evita request-uri inutile.'),
  code('// app/api/curs/route.ts (simplificat)'),
  code('let cache = { eur: null, usd: null, ts: 0 }'),
  code(''),
  code('export async function GET() {'),
  code('  if (Date.now() - cache.ts < 3600000) {'),
  code('    return Response.json(cache)  // Returnam din cache'),
  code('  }'),
  code('  const xml = await fetch("https://bnr.ro/nbrfxrates.xml").then(r => r.text())'),
  code('  // Parsare XML si extragere EUR, USD'),
  code('  cache = { eur: parseFloat(eurRate), usd: parseFloat(usdRate), ts: Date.now() }'),
  code('  return Response.json(cache)'),
  code('}'),

  space(),
  h2('6.3 ReviewBar.tsx — Server Component'),
  p('Componenta ReviewBar este un Server Component (fara "use client") care afiseaza rating-ul global si 3 testimoniale ale clientilor. Datele sunt hardcodate (nu necesita fetch) si sunt incluse in HTML-ul initial — avantaj SEO.'),
  code('// components/ReviewBar.tsx'),
  code('export default function ReviewBar() {'),
  code('  return ('),
  code('    <section className="py-12 px-6 bg-white dark:bg-slate-900">'),
  code('      <div className="text-center mb-6">'),
  code('        <span className="text-4xl font-bold">4.9</span>'),
  code('        <span className="text-lg">/5 — bazat pe 340+ recenzii Google</span>'),
  code('      </div>'),
  code('      <div className="grid md:grid-cols-3 gap-4">'),
  code('        {/* 3 review cards cu autor, text, stele */}'),
  code('      </div>'),
  code('    </section>'),
  code('  )'),
  code('}'),

  space(),
  h2('6.4 app/sitemap.ts — Sitemap XML automat'),
  p('Next.js 16 genereaza automat /sitemap.xml daca exista fisierul app/sitemap.ts cu export default de tip MetadataRoute.Sitemap. Motoarele de cautare (Google, Bing) citesc sitemap-ul pentru a indexa paginile.'),
  code('// app/sitemap.ts'),
  code('import { MetadataRoute } from "next"'),
  code(''),
  code('export default function sitemap(): MetadataRoute.Sitemap {'),
  code('  return ['),
  code('    { url: "https://vibe-website2.vercel.app", changeFrequency: "weekly", priority: 1 },'),
  code('    { url: ".../meniu",        changeFrequency: "weekly",  priority: 0.9 },'),
  code('    { url: ".../rezervari",    changeFrequency: "monthly", priority: 0.8 },'),
  code('    { url: ".../locatie",      changeFrequency: "monthly", priority: 0.8 },'),
  code('    { url: ".../sarbatori",    changeFrequency: "weekly",  priority: 0.7 },'),
  code('    { url: ".../confidentialitate", priority: 0.3 },'),
  code('    { url: ".../cookies",      priority: 0.3 },'),
  code('    { url: ".../termeni",      priority: 0.3 },'),
  code('  ]'),
  code('}'),
  note('/admin si /api/* sunt excluse deliberat din sitemap (nu dorim indexare Google).'),

  // ══════════════════════════════════════════════
  // 7. SEO TEHNIC
  // ══════════════════════════════════════════════
  h1('7. SEO Tehnic'),

  h2('7.1 Strategie SEO'),
  p('SEO-ul (Search Engine Optimization) al proiectului Vibe Caffe este implementat pe mai multe niveluri, acoperind cerintele tehnice de baza pana la structured data avansata.'),

  h2('7.2 Metadata per pagina'),
  table(
    ['Pagina', 'Title', 'Description'],
    [
      ['/', 'Vibe Caffe — Cafea de Specialitate in Bucuresti', 'Cafea de specialitate, brunch si deserturi in centrul Bucurestiului. Rezerva masa online.'],
      ['/meniu', 'Meniu — Vibe Caffe', '24+ produse: cafea de specialitate, cold brew, brunch si deserturi artizanale.'],
      ['/rezervari', 'Rezervari — Vibe Caffe', 'Rezerva masa la Vibe Caffe in 3 pasi simpli. Confirmare imediata.'],
      ['/locatie', 'Locatie — Vibe Caffe', 'Bld. Regina Elisabeta 30, Sector 5, Bucuresti. Program, harta si facilitati.'],
      ['/sarbatori', 'Oferte Sezoniere — Vibe Caffe', 'Produse limitate: Latte de Lavanda, Cold Brew Tonic, Brunch Festiv de Weekend.'],
    ]
  ),

  space(),
  h2('7.3 JSON-LD Structured Data (Schema.org)'),
  p('Homepage-ul include un bloc JSON-LD de tip CafeOrCoffeeShop, recunoscut de Google pentru afisarea in Knowledge Panel si Rich Results:'),
  code('"@type": "CafeOrCoffeeShop"'),
  code('"name": "Vibe Caffe"'),
  code('"telephone": "+40721234567"'),
  code('"address": { "@type": "PostalAddress", "streetAddress": "Bulevardul Regina Elisabeta 30" }'),
  code('"openingHoursSpecification": [ Luni-Vineri 08:00-22:00, Sambata-Duminica 09:00-23:00 ]'),
  code('"servesCuisine": ["Coffee", "Brunch", "Desserts"]'),
  code('"priceRange": "$$"'),

  space(),
  h2('7.4 robots.txt si sitemap.xml'),
  bullet('public/robots.txt — Disallow: /admin, /api/  (nu dorim indexare)'),
  bullet('app/sitemap.ts — genereaza automat /sitemap.xml cu 8 URL-uri publice'),
  bullet('Sitemap referentiat in robots.txt: Sitemap: https://vibe-website2.vercel.app/sitemap.xml'),

  // ══════════════════════════════════════════════
  // 8. SECURITATE
  // ══════════════════════════════════════════════
  h1('8. Securitate'),

  h2('8.1 Autentificare Admin'),
  p('Accesul la /admin este protejat prin doua mecanisme:'),
  bullet('Middleware Next.js — verifica cookie-ul admin_token la fiecare request catre /admin/*'),
  bullet('Cookie httpOnly — nu poate fi accesat din JavaScript (protectie XSS)'),
  bullet('ADMIN_SECRET in environment variables Vercel — nu este in codul sursa'),
  important('ADMIN_SECRET=vibe2026admin este setat DOAR in .env.local (ignorat de .gitignore) si in Vercel Environment Variables. Nu este niciodata commituit pe GitHub.'),

  space(),
  h2('8.2 Variabile de mediu (env vars)'),
  table(
    ['Variabila', 'Unde este folosita', 'Stocare'],
    [
      ['ADMIN_SECRET', 'middleware.ts + /api/admin/login', 'Vercel + .env.local (niciodata in git)'],
      ['NEXT_PUBLIC_SUPABASE_URL', 'Supabase client (front-end)', 'Vercel + .env.local (publica — prefix NEXT_PUBLIC_)'],
      ['NEXT_PUBLIC_SUPABASE_ANON_KEY', 'Supabase client (front-end)', 'Vercel + .env.local (publica, permisii limitate)'],
    ]
  ),
  note('Variabilele cu prefix NEXT_PUBLIC_ sunt expuse in browser — contine doar anon key Supabase, nu service_role key.'),

  space(),
  h2('8.3 Protectie Supabase'),
  bullet('Se foloseste exclusiv anon key in front-end (permisii limitate prin Row Level Security)'),
  bullet('Operatiile admin (delete, update status) trec prin API Routes server-side'),
  bullet('Input-urile utilizatorilor (formular rezervari, newsletter) sunt validate inainte de INSERT'),

  // ══════════════════════════════════════════════
  // 9. DESIGN SYSTEM
  // ══════════════════════════════════════════════
  h1('9. Design System'),

  h2('9.1 Paleta de culori'),
  table(
    ['Culoare', 'Hex', 'Utilizare'],
    [
      ['Teal (primary)', '#14B8A6', 'CTA-uri principale, navbar accent, badge Signature'],
      ['Orange (secondary)', '#F97316', 'CTA-uri rezervare, badge Bestseller accent'],
      ['Espresso (dark mode)', '#1A0D05', 'Background dark mode principal'],
      ['Ciocolata (dark mode)', '#2D1A0A', 'Card background dark mode'],
      ['Crem (dark mode)', '#FDF0E0', 'Text principal dark mode'],
      ['Gray-900', '#111827', 'Text principal light mode'],
      ['Gray-50 / Gray-100', '#F9FAFB / #F3F4F6', 'Background sectiuni alternate'],
    ]
  ),

  space(),
  h2('9.2 Badge-uri comerciale meniu'),
  table(
    ['Badge', 'Culori CSS', 'Semnificatie'],
    [
      ['Bestseller', 'bg-amber-100 text-amber-800', 'Produs cel mai vandut'],
      ['Sezonier', 'bg-green-100 text-green-800', 'Disponibil limitat sezonier'],
      ['Signature', 'bg-teal-100 text-teal-800', 'Reteta exclusiva Vibe Caffe'],
      ['Staff Pick', 'bg-orange-100 text-orange-700', 'Recomandat de baristi'],
    ]
  ),

  space(),
  h2('9.3 Tipografie'),
  bullet('Headings: Plus Jakarta Sans (Google Fonts) — bold, modern'),
  bullet('Body: Inter — claritate, lizibilitate'),
  bullet('Cod/monospace: Courier New — in documentatie si tooltips tehnice'),

  // ══════════════════════════════════════════════
  // 10. CI/CD SI DEPLOYMENT
  // ══════════════════════════════════════════════
  h1('10. CI/CD si Deployment'),

  h2('10.1 Fluxul de deployment'),
  code('1. Student modifica codul local (k:/Video-Prelucrat/Vibe Coding/Proiect_01/)'),
  code('2. git add + git commit -m "mesaj descriptiv"'),
  code('3. git push origin main'),
  code('4. GitHub primeste push-ul'),
  code('5. Vercel detecteaza automat push-ul pe main'),
  code('6. Vercel ruleaza: npm run build (Next.js build)'),
  code('7. Daca build-ul reuseste: deploy pe productie (35-60 secunde)'),
  code('8. Site live actualizat: https://vibe-website2.vercel.app'),

  space(),
  h2('10.2 Conventia commit-urilor'),
  p('Proiectul foloseste prefix-uri semantice pentru commit-uri:'),
  table(
    ['Prefix', 'Semnificatie', 'Exemplu'],
    [
      ['Feature:', 'Functionalitate noua', 'Feature: sistem badge-uri comerciale meniu'],
      ['Fix:', 'Corectare bug', 'Fix: deduplicare produse duplicate Supabase'],
      ['Docs:', 'Documentatie', 'Docs: export sesiune 2026-04-04'],
      ['Chore:', 'Mentenanta, configurare', 'Chore: actualizare .env.local'],
      ['P1-P7:', 'Sprint numarat', 'P3 complet — homepage SSR cu metadata'],
    ]
  ),

  // ══════════════════════════════════════════════
  // 11. ISTORICUL SESIUNILOR
  // ══════════════════════════════════════════════
  h1('11. Istoricul Sesiunilor de Lucru'),

  h2('Sesiunea 2026-04-03 — 7 Sprinturi (Securitate + SEO + Pagini noi)'),
  table(
    ['Sprint', 'Descriere', 'Commit'],
    [
      ['S1', 'Protectie /admin: middleware.ts + /admin/login + ADMIN_SECRET', 'dc05dc4'],
      ['S2', 'Homepage SSR: server component, metadata, JSON-LD, footer linkuri legale', '3d7d565'],
      ['S3', '/rezervari cleanup: eliminat sectiunea admin din pagina publica', '7901c1c'],
      ['S4', '/meniu si /sarbatori: pagini noi server component cu preturi si taguri', '44ebd3b'],
      ['S5', '/locatie: metadata title, 3 CTA-uri grupate, mini-FAQ (3 Q&A)', '5a06f8e'],
      ['S6', 'Navbar: link "De ce Vibe?" cu active tracking', 'd4f86ac'],
      ['S7', 'Pagini legale: /confidentialitate, /cookies, /termeni + public/robots.txt', '4b38faf'],
    ]
  ),

  space(),
  h2('Sesiunea 2026-04-04 S1 — 6 Prompturi (Optimizare SEO + UX)'),
  table(
    ['Prompt', 'Descriere', 'Commit'],
    [
      ['P1', 'Sitemap XML — app/sitemap.ts cu 8 URL-uri publice', '8e942b9'],
      ['P2', 'Fix duplicare produse meniu (deduplicare name+category in SSR)', '89dde45'],
      ['P3', 'Descrieri bogate carduri meniu (variante lapte, volum) + SQL Supabase UPDATE', '8fb18a2'],
      ['P4', 'Badge-uri comerciale: Signature/Staff Pick/Bestseller/Sezonier + coloana tag', '09d74f3'],
      ['P5', 'ReviewBar Server Component pe homepage (4.9/5 + 3 testimoniale)', '66dbc18'],
      ['P6', 'CTA secundar rezervare dupa oferte sezoniere pe homepage', '11fcd2f'],
    ]
  ),

  space(),
  h2('Sesiunea 2026-04-04 S2 — Poze produse + Refactor Rezervari'),
  table(
    ['Feature', 'Descriere', 'Commit'],
    [
      ['Poze homepage', 'previewItems + seasonalPreview — adaugat image URL Unsplash + hover zoom pe carduri', 'ab94ad4'],
      ['Poze sarbatori', 'offers pe /sarbatori — adaugat image + hover zoom pe toate 4 cardurile', 'ab94ad4'],
      ['Fallback imagini', 'MenuStarter + HolidayMenu: placeholder coffee emoji in loc de spatiu gol', 'ab94ad4'],
      ['About.tsx', 'Adaugat onError handler lipsa pe imaginea cafenelei', 'ab94ad4'],
      ['Rezervari refactor', 'Inlocuit wizard 3 pasi cu formular unic pe 2 coloane — 1 click rezervare', '63385be'],
      ['Ticket rezervare', 'Rezumat vizual stil bilet cafenea cu data + ora, apare la selectie', '63385be'],
      ['Ore dinamice', 'Grid ore adaptat dupa ziua saptamanii: L-V 07-22, S-D 08-23', '63385be'],
      ['Navbar contact', 'Butoane pill Suna + WhatsApp sub butonul Rezerva Masa in Navigation.tsx', '06010d8'],
      ['UX compact', 'Titlu rezervari compactat, info program pe un rand, eliminat duplicare butoane', '06010d8'],
    ]
  ),

  // ══════════════════════════════════════════════
  // 12. DECIZII TEHNICE SI MOTIVATII
  // ══════════════════════════════════════════════
  h1('12. Decizii Tehnice si Motivatii'),

  h2('12.1 De ce Next.js App Router (nu Pages Router)?'),
  p('App Router ofera Server Components nativ — componentele care nu au nevoie de interactivitate sunt randate pe server, reducand JS-ul trimis catre browser. Aceasta imbunatateste performanta (Core Web Vitals) si SEO-ul (HTML complet la prima incarcare).'),

  h2('12.2 De ce Supabase (nu o baza de date custom)?'),
  p('Supabase ofera PostgreSQL managed cu API REST automat, autentificare integrata si dashboard vizual. Pentru un proiect de curs, elimina nevoia de a gestiona un server de baze de date separat, permitand focusul pe logica aplicatiei.'),

  h2('12.3 De ce cookie httpOnly pentru admin (nu JWT in localStorage)?'),
  p('localStorage este accesibil din JavaScript — vulnerabil la atacuri XSS. Cookie-ul httpOnly nu poate fi citit sau modificat din JavaScript, chiar daca un atacator injecteaza cod malitios in pagina. Este standardul de industrie pentru sesiuni de autentificare.'),

  h2('12.4 De ce deduplicare in cod (nu stergere duplicate din Supabase)?'),
  p('Stergerea directa din Supabase poate crea probleme daca exista referinte sau logica care depinde de randuri specifice. Deduplicarea in cod (cu Set pe cheie category__name) este o solutie sigura care nu afecteaza datele originale si poate fi usor reversata.'),

  h2('12.5 De ce ReviewBar este Server Component (nu Client)?'),
  p('Testimonialele sunt date statice — nu se schimba cu interactiunea utilizatorului. Un Server Component inseamna ca datele sunt in HTML-ul initial (crawlat de Google) si nu necesita JS pe client (performanta mai buna).'),

  // ══════════════════════════════════════════════
  // 13. CONCLUZIE
  // ══════════════════════════════════════════════
  h1('13. Concluzie'),

  p('Proiectul Vibe Caffe reprezinta o aplicatie web completa, de nivel productie, care acopera intregul spectru al dezvoltarii web moderne:'),
  bullet('Front-end: React 19 + Next.js 16, TypeScript strict, Tailwind CSS 4, dark mode, animatii'),
  bullet('Back-end: API Routes Next.js, integrare Supabase, fetch BNR XML, cache in memorie'),
  bullet('Securitate: middleware autentificare, cookie httpOnly, env vars, input validation'),
  bullet('SEO: metadata, OpenGraph, JSON-LD, sitemap.xml, robots.txt'),
  bullet('DevOps: Git versionare, Vercel CI/CD, deploy automat'),
  bullet('UX: wizard rezervari, dark mode, toggle coloane, badge-uri, preloader, smooth scroll'),

  space(),
  p('Prin metodologia Vibe Coding, studentul a parcurs un proces real de dezvoltare software — de la cerinte la productie — dobandind experienta practica cu instrumente si concepte utilizate in industrie.'),

  space(),
  new Paragraph({
    children: [
      new TextRun({ text: 'Site live: ', bold: true, size: 24 }),
      new TextRun({ text: 'https://vibe-website2.vercel.app', size: 24, color: '0D9488' }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 300, after: 80 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'Repository: ', bold: true, size: 24 }),
      new TextRun({ text: 'https://github.com/2020nc/vibe-website2', size: 24, color: '0D9488' }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
  }),
];

// ─── GENERARE FISIERE ─────────────────────────────────────────────────────────

const doc = new Document({
  creator: STUDENT,
  title: 'Documentatie Tehnica Amanuntita v2.0 — Vibe Caffe',
  description: 'Documentatie tehnica completa pentru proiectul Vibe Caffe',
  sections: [{ children }],
});

const docxPath = path.join(OUTPUT_DIR, 'documentatie-tehnica-v2.docx');
const pdfPath  = path.join(OUTPUT_DIR, 'documentatie-tehnica-v2.pdf');

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(docxPath, buffer);
console.log('DOCX generat:', docxPath);

// ─── GENERARE PDF ─────────────────────────────────────────────────────────────

const pdfDoc = createPdf({ size: 'A4', margins: { top: 55, bottom: 55, left: 65, right: 65 } });
const pdfOut = fs.createWriteStream(pdfPath);
pdfDoc.pipe(pdfOut);

const TEAL = '#14B8A6';
const DARK = '#1F2937';
const GRAY = '#6B7280';
const LW = 530 - 65; // line width

const pdfH1 = (text) => {
  if (pdfDoc.y > 680) pdfDoc.addPage();
  pdfDoc.moveDown(1).font('Bold').fontSize(16).fillColor(TEAL).text(text, { underline: false });
  pdfDoc.moveTo(65, pdfDoc.y + 4).lineTo(530, pdfDoc.y + 4).strokeColor(TEAL).lineWidth(1.5).stroke();
  pdfDoc.moveDown(0.6).font('Regular').fontSize(11).fillColor(DARK);
};
const pdfH2 = (text) => {
  if (pdfDoc.y > 700) pdfDoc.addPage();
  pdfDoc.moveDown(0.7).font('Bold').fontSize(13).fillColor(DARK).text(text).font('Regular').fontSize(11).fillColor(DARK).moveDown(0.3);
};
const pdfP = (text) => { pdfDoc.font('Regular').fontSize(11).fillColor(DARK).text(text, { width: LW }).moveDown(0.4); };
const pdfBullet = (text) => { pdfDoc.font('Regular').fontSize(11).fillColor(DARK).text(`• ${text}`, { indent: 15, width: LW - 15 }).moveDown(0.2); };
const pdfCode = (text) => { pdfDoc.font('Regular').fontSize(9).fillColor('#0D9488').text(text, { indent: 20, width: LW - 20 }).moveDown(0.1); };
const pdfNote = (text) => { pdfDoc.font('Italic').fontSize(10).fillColor(GRAY).text(`Nota: ${text}`, { indent: 15, width: LW - 15 }).font('Regular').moveDown(0.4); };
const pdfSp = () => pdfDoc.moveDown(0.5);

const pdfLines = [
  { text: 'VIBE CAFFE', size: 36, bold: true, color: [20, 184, 166], align: 'center' },
  { text: 'Documentatie Tehnica Amanuntita v2.0', size: 22, bold: true, align: 'center' },
  { text: `Student: ${STUDENT}  |  Data: ${DATE}  |  Curs: Vibe Coding`, size: 12, color: [107, 114, 128], align: 'center' },
  { text: `Site: ${SITE_URL}  |  Repo: ${REPO_URL}`, size: 12, color: [13, 148, 136], align: 'center' },
  { text: '', size: 10 },
  { text: '1. INTRODUCERE SI CONTEXT', size: 16, bold: true, color: [20, 184, 166] },
  { text: 'Proiect web full-stack pentru cafenea fictiva Vibe Caffe, realizat in cursul Vibe Coding (dec 2025 - apr 2026).', size: 11 },
  { text: 'Metodologie: Vibe Coding — student decide, AI (Claude Sonnet 4.6) implementeaza.', size: 11 },
  { text: '', size: 8 },
  { text: 'Cifre cheie:', size: 12, bold: true },
  { text: '• 50+ commit-uri Git pe main', size: 11 },
  { text: '• 9 pagini publice + 2 pagini admin', size: 11 },
  { text: '• 15+ componente React (server + client)', size: 11 },
  { text: '• 5 API Routes + 5 tabele Supabase', size: 11 },
  { text: '', size: 8 },
  { text: '2. STACK TEHNIC', size: 16, bold: true, color: [20, 184, 166] },
  { text: 'Front-end: Next.js 16 (App Router), React 19, TypeScript 5 strict, Tailwind CSS 4, Lenis smooth scroll', size: 11 },
  { text: 'Back-end: Supabase (PostgreSQL cloud), Next.js API Routes, BNR XML feed (curs valutar), bcryptjs', size: 11 },
  { text: 'DevOps: Vercel (CI/CD automat), GitHub (version control), Vercel Environment Variables', size: 11 },
  { text: '', size: 8 },
  { text: '3. ARHITECTURA', size: 16, bold: true, color: [20, 184, 166] },
  { text: 'Browser -> Next.js Server (Vercel) -> Supabase (PostgreSQL)', size: 11 },
  { text: '  Server Components: SSR, metadata, JSON-LD (fara JS pe client)', size: 11 },
  { text: '  Client Components: interactivitate (filtru meniu, dark mode, wizard rezervari)', size: 11 },
  { text: '  API Routes: /api/curs, /api/newsletter, /api/rezervari, /api/promo', size: 11 },
  { text: '  Middleware: protectie /admin/* cu cookie httpOnly', size: 11 },
  { text: '', size: 8 },
  { text: '4. BAZA DE DATE SUPABASE — 5 tabele', size: 16, bold: true, color: [20, 184, 166] },
  { text: '• menu_items: id, name, price, category, description, image, vegan, discount, addons, tag', size: 11 },
  { text: '• rezervari: id, name, email, phone, date, time, guests, message, status, created_at', size: 11 },
  { text: '• newsletter_subscribers: id, email UNIQUE, subscribed_at', size: 11 },
  { text: '• holiday_config (id=1): active, holiday_name, items JSONB', size: 11 },
  { text: '• promo_config (id=1): active, message, bg_color, text_color', size: 11 },
  { text: 'Nota: coloana tag adaugata in sesiunea 2026-04-04 cu ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS tag TEXT', size: 10, color: [107, 114, 128] },
  { text: '', size: 8 },
  { text: '5. PAGINI SI FUNCTIONALITATI', size: 16, bold: true, color: [20, 184, 166] },
  { text: '/ Homepage SSR: Hero, ReviewBar (4.9/5), "De ce Vibe?", preview meniu, oferte sezoniere, CTA, locatie rapida', size: 11 },
  { text: '/meniu Client: filtre categorii, toggle 3/4/5 col, EUR/USD, badge-uri comerciale, reduceri, add-on-uri', size: 11 },
  { text: '/rezervari: wizard 3 pasi (date personale -> detalii -> confirmare), INSERT Supabase', size: 11 },
  { text: '/locatie: metadata SEO, Google Maps embed, 3 CTA-uri, mini-FAQ, galerie, facilitati', size: 11 },
  { text: '/sarbatori: 4 oferte sezoniere, animatie confetti, configurabila din admin', size: 11 },
  { text: '/admin (protejat): tab Rezervari (export Excel/PDF), tab Meniu CRUD, tab Sarbatori, tab Setari banner', size: 11 },
  { text: '/confidentialitate, /cookies, /termeni: pagini legale statice', size: 11 },
  { text: '', size: 8 },
  { text: '6. SEO TEHNIC', size: 16, bold: true, color: [20, 184, 166] },
  { text: '• metadata title + description per pagina (9 pagini)', size: 11 },
  { text: '• OpenGraph tags (og:title, og:description, og:url, og:siteName)', size: 11 },
  { text: '• JSON-LD CafeOrCoffeeShop pe homepage (Schema.org)', size: 11 },
  { text: '• app/sitemap.ts -> /sitemap.xml automat (8 URL-uri publice)', size: 11 },
  { text: '• public/robots.txt: Disallow /admin, /api/', size: 11 },
  { text: '', size: 8 },
  { text: '7. SECURITATE', size: 16, bold: true, color: [20, 184, 166] },
  { text: '• middleware.ts: redirect /admin/* -> /admin/login daca nu exista cookie admin_token valid', size: 11 },
  { text: '• Cookie httpOnly: nu accesibil din JavaScript (protectie XSS)', size: 11 },
  { text: '• ADMIN_SECRET in env vars Vercel (niciodata in git)', size: 11 },
  { text: '• Supabase anon key (permisii limitate prin Row Level Security)', size: 11 },
  { text: '', size: 8 },
  { text: '8. SESIUNI DE LUCRU', size: 16, bold: true, color: [20, 184, 166] },
  { text: 'Sesiunea 2026-04-03 — 7 Sprinturi:', size: 12, bold: true },
  { text: 'S1: Protectie /admin (middleware + login + ADMIN_SECRET)', size: 11 },
  { text: 'S2: Homepage SSR (server component, metadata, JSON-LD)', size: 11 },
  { text: 'S3: /rezervari cleanup (eliminat sectiunea admin din pagina publica)', size: 11 },
  { text: 'S4: /meniu si /sarbatori (pagini noi server component)', size: 11 },
  { text: 'S5: /locatie (metadata, 3 CTA, mini-FAQ)', size: 11 },
  { text: 'S6: Navbar link "De ce Vibe?" cu active tracking', size: 11 },
  { text: 'S7: Pagini legale + robots.txt', size: 11 },
  { text: '', size: 6 },
  { text: 'Sesiunea 2026-04-04 — 6 Prompturi optimizare:', size: 12, bold: true },
  { text: 'P1: Sitemap XML (app/sitemap.ts, 8 URL-uri)', size: 11 },
  { text: 'P2: Fix duplicare produse meniu (deduplicare Set category__name)', size: 11 },
  { text: 'P3: Descrieri bogate carduri meniu + SQL Supabase UPDATE', size: 11 },
  { text: 'P4: Badge-uri comerciale (Bestseller/Sezonier/Signature/Staff Pick) + coloana tag Supabase', size: 11 },
  { text: 'P5: ReviewBar Server Component (4.9/5, 340+ recenzii, 3 testimoniale)', size: 11 },
  { text: 'P6: CTA secundar rezervare pe homepage (banda teal + buton orange)', size: 11 },
  { text: '', size: 8 },
  { text: '9. DECIZII TEHNICE', size: 16, bold: true, color: [20, 184, 166] },
  { text: '• App Router vs Pages Router: Server Components native, performanta, SEO mai bun', size: 11 },
  { text: '• Supabase: PostgreSQL managed, API REST automat, dashboard vizual', size: 11 },
  { text: '• Cookie httpOnly vs JWT localStorage: standard industrie, protectie XSS', size: 11 },
  { text: '• Deduplicare in cod vs stergere DB: sigura, reversibila, fara risc de pierdere date', size: 11 },
  { text: '• ReviewBar Server Component: date statice in HTML initial, crawlabile de Google', size: 11 },
  { text: '', size: 8 },
  { text: '10. CONCLUZIE', size: 16, bold: true, color: [20, 184, 166] },
  { text: 'Vibe Caffe este o aplicatie web completa, de nivel productie, care acopera:', size: 11 },
  { text: '• Front-end modern (React 19, Next.js 16, TypeScript, Tailwind, dark mode)', size: 11 },
  { text: '• Back-end real (Supabase PostgreSQL, API Routes, BNR feed, cache)', size: 11 },
  { text: '• Securitate (middleware, cookie httpOnly, env vars)', size: 11 },
  { text: '• SEO complet (metadata, OpenGraph, JSON-LD, sitemap, robots)', size: 11 },
  { text: '• CI/CD profesional (Git + Vercel automat)', size: 11 },
  { text: '', size: 8 },
  { text: `Site live: https://${SITE_URL}`, size: 12, bold: true, color: [13, 148, 136], align: 'center' },
  { text: `Repository: https://${REPO_URL}`, size: 12, color: [13, 148, 136], align: 'center' },
];

createPdf(pdfLines, pdfPath);
console.log('PDF generat:', pdfPath);
console.log('Gata! Documentatia tehnica v2.0 a fost generata.');
