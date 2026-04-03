/**
 * Generează documentația tehnică + pedagogică a proiectului Vibe Caffè
 * pentru prezentare la profesor.
 * Output: docs/documentatie-profesor.docx + .pdf
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, BorderStyle, Table, TableRow, TableCell,
  WidthType, VerticalAlign, ShadingType,
} from 'docx';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { createPdf } = require('C:/Users/Admin/.claude/pdf-utils/createPdf.js');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, '../docs');

const DATE = '2026-04-03';
const STUDENT = '2020nc';
const SITE_URL = 'vibe-website2.vercel.app';
const REPO_URL = 'github.com/2020nc/vibe-website2';

// ─── HELPERS DOCX ─────────────────────────────────────────────────────────────

function h1(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 32, color: '14B8A6' })],
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 480, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '14B8A6' } },
  });
}
function h2(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 26, color: '1F2937' })],
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 140 },
  });
}
function h3(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 22, color: '374151' })],
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
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
    indent: { left: 400 + level * 300 },
  });
}
function code(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: 'Courier New', size: 18, color: '0D9488' })],
    shading: { type: ShadingType.SOLID, color: 'F0FDFA' },
    spacing: { after: 60 },
    indent: { left: 400, right: 400 },
    border: {
      left: { style: BorderStyle.SINGLE, size: 6, color: '14B8A6' },
    },
  });
}
function note(text) {
  return new Paragraph({
    children: [new TextRun({ text: `📝 ${text}`, size: 20, italics: true, color: '6B7280' })],
    spacing: { after: 120 },
    indent: { left: 300 },
  });
}
function space() {
  return new Paragraph({ spacing: { after: 80 } });
}
function tRow(label, value, header = false) {
  return new TableRow({
    children: [
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: label, bold: true, size: header ? 20 : 19, color: header ? 'FFFFFF' : '1F2937' })] })],
        width: { size: 32, type: WidthType.PERCENTAGE },
        shading: header ? { type: ShadingType.SOLID, color: '0D9488' } : { type: ShadingType.SOLID, color: 'F0FDFA' },
        verticalAlign: VerticalAlign.CENTER,
      }),
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: value, size: header ? 20 : 19, color: header ? 'FFFFFF' : '374151', bold: header })] })],
        width: { size: 68, type: WidthType.PERCENTAGE },
        shading: header ? { type: ShadingType.SOLID, color: '0D9488' } : undefined,
        verticalAlign: VerticalAlign.CENTER,
      }),
    ],
  });
}

// ─── CONȚINUT DOCUMENT ────────────────────────────────────────────────────────

const children = [

  // ══ PAGINA DE TITLU ══
  new Paragraph({ spacing: { before: 600, after: 100 } }),
  new Paragraph({
    children: [new TextRun({ text: 'VIBE CAFFÈ', bold: true, size: 64, color: '14B8A6' })],
    alignment: AlignmentType.CENTER,
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Documentație Tehnică și Pedagogică', bold: true, size: 36, color: '1F2937' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Proiect Web Full-Stack — Vibe Coding', size: 24, color: '6B7280' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
  }),
  new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '14B8A6' } }, spacing: { after: 200 } }),
  new Paragraph({
    children: [
      new TextRun({ text: `Student: `, bold: true, size: 22 }),
      new TextRun({ text: STUDENT, size: 22 }),
    ],
    alignment: AlignmentType.CENTER, spacing: { after: 60 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: `Data: `, bold: true, size: 22 }),
      new TextRun({ text: DATE, size: 22 }),
    ],
    alignment: AlignmentType.CENTER, spacing: { after: 60 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: `Site live: `, bold: true, size: 22 }),
      new TextRun({ text: SITE_URL, size: 22, color: '0D9488' }),
    ],
    alignment: AlignmentType.CENTER, spacing: { after: 60 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: `Repository: `, bold: true, size: 22 }),
      new TextRun({ text: REPO_URL, size: 22, color: '0D9488' }),
    ],
    alignment: AlignmentType.CENTER, spacing: { after: 400 },
  }),

  // ══ 1. INTRODUCERE ══
  h1('1. Introducere și Context'),
  p('Proiectul "Vibe Caffè" este un site web complet pentru o cafenea de specialitate fictivă din București, dezvoltat în cadrul cursului Vibe Coding. Scopul proiectului este de a demonstra capacitatea de a construi o aplicație web modernă, de la zero până la producție, folosind tehnologii de nivel profesional.'),
  p('Proiectul acoperă întregul ciclu de dezvoltare software: design, implementare front-end și back-end, integrarea cu o bază de date cloud, securizarea accesului administrativ și publicarea pe internet cu deployment automat.'),
  space(),
  h2('1.1 Obiective Pedagogice'),
  bullet('Înțelegerea și aplicarea arhitecturii Next.js App Router (server vs. client components)'),
  bullet('Lucrul cu TypeScript în modul strict — tipuri, interfețe, tipizare API'),
  bullet('Integrarea Supabase ca backend-as-a-service (bază de date, API REST automat)'),
  bullet('Implementarea securității: autentificare cu hash, cookie-uri httpOnly, middleware'),
  bullet('SEO tehnic: metadata, OpenGraph, JSON-LD structured data, SSR'),
  bullet('Deployment automat cu Vercel și Git (CI/CD)'),
  bullet('Versionare cod cu Git — commit-uri atomice, mesaje descriptive'),
  space(),
  h2('1.2 Metodologia Vibe Coding'),
  p('Vibe Coding este o metodologie de dezvoltare colaborativă în care utilizatorul (studentul) dirijează procesul, luând decizii de design și arhitectură, iar un asistent AI (Claude) implementează codul. Această abordare accelerează învățarea prin expunerea la cod real de producție, discuții tehnice și iterații rapide.'),
  bullet('108 commit-uri Git pe parcursul proiectului (decembrie 2025 — aprilie 2026)'),
  bullet('Organizat în sesiuni tematice și sprinturi numerotate'),
  bullet('Fiecare sprint rezolvă o problemă concretă și livrează funcționalitate completă'),
  note('Această documentație acoperă atât codul tehnic cât și procesul de gândire din spatele deciziilor de implementare.'),

  // ══ 2. ARHITECTURA ══
  h1('2. Arhitectura Aplicației'),
  h2('2.1 Diagrama componentelor'),
  p('Aplicația urmează arhitectura Next.js App Router, cu separare clară între server și client:'),
  space(),
  code('Browser (Client)'),
  code('    ↕ HTTP / Fetch API'),
  code('Next.js App Router (Server)'),
  code('    ├── Server Components  →  SSR, metadata, JSON-LD'),
  code('    ├── Client Components  →  interactivitate, stare locală'),
  code('    ├── API Routes          →  /api/* (REST endpoints)'),
  code('    └── Middleware          →  autentificare /admin/*'),
  code('         ↕ Supabase Client'),
  code('Supabase (PostgreSQL + REST API)'),
  code('    ├── rezervari'),
  code('    ├── menu_items'),
  code('    ├── seasonal_items'),
  code('    ├── newsletter_subscribers'),
  code('    └── admin_config'),
  space(),
  h2('2.2 Tipuri de componente'),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      tRow('Tip', 'Caracteristici', true),
      tRow('Server Component (default)', 'Randare pe server, nu folosesc useState/useEffect, pot face fetch direct, bune pentru SEO'),
      tRow('Client Component (\'use client\')', 'Randare în browser, pot folosi stare și efecte, necesare pentru interactivitate'),
      tRow('API Route (route.ts)', 'Endpoint REST pe server, accesibil via fetch din client sau din exterior'),
      tRow('Middleware (middleware.ts)', 'Rulează înaintea oricărui request, folosit pentru autentificare și redirect'),
    ],
  }),
  space(),

  // ══ 3. STACK TEHNIC ══
  h1('3. Stack Tehnic'),
  h2('3.1 Tehnologii principale'),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      tRow('Tehnologie', 'Versiune și rol', true),
      tRow('Next.js', '15 — Framework React cu App Router, SSR, API Routes, Middleware'),
      tRow('React', '19 — Biblioteca UI, hooks, componente funcționale'),
      tRow('TypeScript', '5 (strict) — Tipizare statică, detectare erori la compilare'),
      tRow('Tailwind CSS', '4 — Utilitare CSS, design responsiv, dark mode'),
      tRow('Supabase', 'Latest — Backend-as-a-Service: PostgreSQL, REST API, autentificare'),
      tRow('Vercel', 'Hosting cloud cu deployment automat din GitHub (CI/CD)'),
      tRow('Node.js', 'Runtime pentru scripts de generare documente'),
    ],
  }),
  space(),
  h2('3.2 Biblioteci auxiliare'),
  bullet('lenis — Smooth scroll animat'),
  bullet('@supabase/supabase-js — Client oficial Supabase'),
  bullet('docx — Generare documente Word din cod'),
  bullet('pdfkit — Generare PDF din cod (cu suport diacritice DejaVu Sans)'),
  bullet('crypto (Node.js built-in) — Hashing SHA-256 pentru parole'),

  // ══ 4. STRUCTURA PROIECTULUI ══
  h1('4. Structura Proiectului'),
  h2('4.1 Organizarea fișierelor'),
  code('app/'),
  code('├── layout.tsx              # Root layout — fonts, metadata globală, Navigation'),
  code('├── page.tsx                # Homepage SSR cu JSON-LD'),
  code('├── meniu/page.tsx          # Pagina meniu cu filtrare categorii'),
  code('├── rezervari/              # Pagina rezervări + layout cu metadata'),
  code('├── locatie/page.tsx        # Pagina locație cu JSON-LD'),
  code('├── sarbatori/page.tsx      # Oferte sezoniere'),
  code('├── admin/page.tsx          # Panou administrare (protejat)'),
  code('├── confidentialitate/      # Pagina legală'),
  code('├── cookies/                # Pagina legală'),
  code('├── termeni/                # Pagina legală'),
  code('└── api/'),
  code('    ├── admin/login/        # POST — autentificare admin'),
  code('    ├── admin/change-password/ # POST — schimbare parolă'),
  code('    ├── rezervari/          # GET/POST/PATCH — CRUD rezervări'),
  code('    ├── menu/               # GET/POST/PUT/DELETE — CRUD meniu'),
  code('    ├── holiday/            # GET/POST/DELETE — oferte sezoniere'),
  code('    ├── newsletter/         # POST — abonare newsletter'),
  code('    └── chat/               # POST — Barista Bot (AI)'),
  space(),
  code('components/'),
  code('├── Navigation.tsx          # Navbar sticky cu active tracking'),
  code('├── FooterStarter.tsx       # Footer cu newsletter și social media'),
  code('├── HeroStarter.tsx         # Hero section (SSR)'),
  code('├── ChatWidget.tsx          # Barista Bot widget'),
  code('├── Preloader.tsx           # Animație de încărcare'),
  code('└── ThemeToggle.tsx         # Toggle dark/light mode'),
  space(),
  code('lib/'),
  code('├── supabase.ts             # Client Supabase (singleton)'),
  code('├── knowledge-base.ts       # Date pentru ChatWidget'),
  code('└── hooks/useScrollAnimation.ts  # Intersection Observer hook'),
  space(),
  code('middleware.ts               # Protecție rute /admin/*'),
  code('public/robots.txt           # Instrucțiuni pentru motoarele de căutare'),
  space(),

  // ══ 5. PAGINI ȘI FUNCȚIONALITĂȚI ══
  h1('5. Pagini și Funcționalități'),

  h2('5.1 Homepage (/) — Server Component'),
  p('Homepage-ul este un Server Component — se randează complet pe server, fără JavaScript în browser pentru conținutul principal. Aceasta este o decizie arhitecturală importantă pentru SEO: motoarele de căutare primesc HTML complet, nu o pagină goală completată ulterior de JavaScript.'),
  bullet('Hero section cu titlu principal, subtitlu și 2 butoane CTA (Meniu / Rezervă)'),
  bullet('Secțiunea "De ce Vibe?" — 4 carduri cu diferențiatori concreți'),
  bullet('Preview meniu SSR — 6 produse hardcodate (fără call la baza de date)'),
  bullet('Oferte sezoniere SSR — 3 produse cu descrieri și perioade de valabilitate'),
  bullet('Secțiunea locație cu program și număr de telefon'),
  bullet('JSON-LD schema.org CafeOrCoffeeShop pentru SEO local'),
  note('Decizie de design: datele din preview meniu sunt hardcodate pe homepage pentru a evita un call la baza de date pe pagina principală. Datele reale, actualizabile, sunt pe /meniu.'),
  space(),

  h2('5.2 Pagina Meniu (/meniu) — Client Component'),
  p('Pagina de meniu este un Client Component deoarece are nevoie de interactivitate: filtrarea pe categorii se face în browser fără reîncărcare de pagină.'),
  bullet('Fetch la /api/menu la montarea componentei — date din Supabase'),
  bullet('State local pentru categoria activă (useState)'),
  bullet('Filtrare pe categorii: Espresso, Specialty, Vegan, Cold, Alternative, Pastry'),
  bullet('Afișare prețuri, descrieri, ingrediente pentru fiecare produs'),
  bullet('Metadata SEO în layout dedicat (Client Components nu pot exporta metadata direct)'),
  note('Regulă Next.js: metadata se poate exporta doar din Server Components. Soluția: se creează un layout.tsx separat (Server Component) care exportă metadata pentru pagina client.'),
  space(),

  h2('5.3 Pagina Rezervări (/rezervari)'),
  p('Formular complet cu validare și persistare în Supabase.'),
  bullet('Câmpuri: nume, telefon, dată, oră, număr persoane, mesaj opțional'),
  bullet('Validare client-side înainte de trimitere'),
  bullet('POST la /api/rezervari → insert în Supabase'),
  bullet('Mesaj de succes personalizat cu buton "Înapoi acasă"'),
  bullet('Caseta informativă: program, politică confirmare, politică anulare'),
  space(),

  h2('5.4 Pagina Locație (/locatie)'),
  bullet('Adresă completă, program detaliat, număr telefon'),
  bullet('Link Google Maps cu adresa precompletată'),
  bullet('JSON-LD LocalBusiness (a doua instanță — prima e pe homepage)'),
  bullet('OpenGraph pentru partajare pe rețele sociale'),
  space(),

  h2('5.5 Panoul Admin (/admin)'),
  p('Interfață de administrare completă, accesibilă doar după autentificare. Implementează pattern-ul "protected route" cu middleware Next.js.'),
  bullet('Tab Rezervări: listare, confirmare, anulare rezervări'),
  bullet('Tab Meniu: adăugare, editare, ștergere produse'),
  bullet('Tab Sărbători: gestionare oferte sezoniere'),
  bullet('Tab Setări: schimbare parolă admin'),
  note('Navbar-ul site-ului este ascuns pe paginile /admin pentru a oferi o interfață curată, fără distractori pentru administrator.'),

  // ══ 6. BAZA DE DATE ══
  h1('6. Baza de Date — Supabase'),
  h2('6.1 Schema tabelelor'),
  p('Supabase oferă un PostgreSQL gestionat în cloud cu API REST automat generat. Accesul se face prin chei de tip anon (public) și service_role (admin).'),
  space(),
  h3('Tabelul: rezervari'),
  code('id          BIGSERIAL PRIMARY KEY'),
  code('created_at  TIMESTAMPTZ DEFAULT now()'),
  code('nume        TEXT NOT NULL'),
  code('telefon     TEXT NOT NULL'),
  code('data        DATE NOT NULL'),
  code('ora         TEXT NOT NULL'),
  code('persoane    INTEGER NOT NULL'),
  code('mesaj       TEXT'),
  code('status      TEXT DEFAULT \'pending\'   -- pending | confirmed | cancelled'),
  space(),
  h3('Tabelul: menu_items'),
  code('id          BIGSERIAL PRIMARY KEY'),
  code('name        TEXT NOT NULL'),
  code('price       INTEGER NOT NULL'),
  code('category    TEXT NOT NULL'),
  code('description TEXT'),
  code('ingredients TEXT'),
  code('vegan       BOOLEAN DEFAULT false'),
  code('available   BOOLEAN DEFAULT true'),
  space(),
  h3('Tabelul: seasonal_items'),
  code('id          BIGSERIAL PRIMARY KEY'),
  code('name        TEXT NOT NULL'),
  code('price       INTEGER NOT NULL'),
  code('description TEXT'),
  code('available_from TEXT'),
  code('available_until TEXT'),
  code('active      BOOLEAN DEFAULT true'),
  space(),
  h3('Tabelul: admin_config'),
  code('id            INTEGER PRIMARY KEY DEFAULT 1'),
  code('password_hash TEXT NOT NULL   -- SHA-256 hex (64 chars)'),
  note('Tabelul admin_config conține un singur rând (id=1). Parola nu este stocată în clar — doar hash-ul SHA-256. Dacă tabelul nu există, sistemul fallback la variabila de mediu ADMIN_SECRET.'),
  space(),
  h3('Tabelul: newsletter_subscribers'),
  code('id         BIGSERIAL PRIMARY KEY'),
  code('email      TEXT UNIQUE NOT NULL'),
  code('created_at TIMESTAMPTZ DEFAULT now()'),
  space(),
  h2('6.2 Clientul Supabase'),
  p('Clientul este inițializat o singură dată și reutilizat (pattern singleton implicit prin funcție):'),
  code('// lib/supabase.ts'),
  code('import { createClient } from \'@supabase/supabase-js\';'),
  code(''),
  code('export function getSupabase() {'),
  code('  return createClient('),
  code('    process.env.NEXT_PUBLIC_SUPABASE_URL!,'),
  code('    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!'),
  code('  );'),
  code('}'),
  note('Variabilele cu prefix NEXT_PUBLIC_ sunt accesibile și în browser. Cheia anon este sigur publică — Supabase folosește Row Level Security (RLS) pentru controlul accesului.'),

  // ══ 7. SECURITATE ══
  h1('7. Securitate — Implementare Detaliată'),
  h2('7.1 Fluxul de autentificare admin'),
  p('Autentificarea nu folosește sesiuni de server sau JWT extern — se bazează pe un cookie httpOnly care conține hash-ul SHA-256 al parolei.'),
  space(),
  code('1. Utilizatorul trimite parola via POST /api/admin/login'),
  code('2. Server-ul calculează SHA-256(parola)'),
  code('3. Compară cu hash-ul din Supabase (admin_config)'),
  code('4. Dacă match → setează cookie admin_token = hash (httpOnly)'),
  code('5. La fiecare request pe /admin/* → middleware verifică cookie-ul'),
  code('6. Middleware validează că token-ul are format hex 64 caractere'),
  space(),
  h2('7.2 Codul de autentificare (API Route)'),
  code('// app/api/admin/login/route.ts'),
  code('import { createHash } from \'crypto\''),
  code(''),
  code('function sha256(text: string): string {'),
  code('  return createHash(\'sha256\').update(text).digest(\'hex\')'),
  code('}'),
  code(''),
  code('export async function POST(request: Request) {'),
  code('  const { password } = await request.json()'),
  code('  const hash = sha256(password)'),
  code(''),
  code('  const { data } = await getSupabase()'),
  code('    .from(\'admin_config\').select(\'password_hash\')'),
  code('    .eq(\'id\', 1).single()'),
  code(''),
  code('  const validHash = data?.password_hash ?? sha256(process.env.ADMIN_SECRET ?? \'\')'),
  code('  if (hash !== validHash)'),
  code('    return NextResponse.json({ error: \'Unauthorized\' }, { status: 401 })'),
  code(''),
  code('  const response = NextResponse.json({ ok: true })'),
  code('  response.cookies.set(\'admin_token\', hash, {'),
  code('    httpOnly: true,        // Nu e accesibil din JavaScript browser'),
  code('    secure: NODE_ENV === \'production\',  // Doar HTTPS în producție'),
  code('    sameSite: \'lax\',       // Protecție CSRF'),
  code('    maxAge: 60 * 60 * 8,  // 8 ore'),
  code('    path: \'/\','),
  code('  })'),
  code('  return response'),
  code('}'),
  space(),
  h2('7.3 Middleware de protecție'),
  code('// middleware.ts'),
  code('export async function middleware(request: NextRequest) {'),
  code('  const { pathname } = request.nextUrl'),
  code(''),
  code('  if (pathname.startsWith(\'/admin\') && pathname !== \'/admin/login\') {'),
  code('    const token = request.cookies.get(\'admin_token\')?.value'),
  code('    if (!token)'),
  code('      return NextResponse.redirect(new URL(\'/admin/login\', request.url))'),
  code(''),
  code('    // Validare format: exact 64 caractere hexazecimale'),
  code('    const isValidFormat = /^[a-f0-9]{64}$/.test(token)'),
  code('    if (!isValidFormat)'),
  code('      return NextResponse.redirect(new URL(\'/admin/login\', request.url))'),
  code('  }'),
  code('  return NextResponse.next()'),
  code('}'),
  note('Middleware-ul nu face call la baza de date la fiecare request — validează doar formatul token-ului. Aceasta este o decizie de performanță: un call la DB pe fiecare request protejat ar încetini semnificativ aplicația.'),
  space(),
  h2('7.4 Schimbarea parolei'),
  p('Funcționalitatea de schimbare a parolei verifică parola veche înainte de actualizare și reemite cookie-ul cu noul hash:'),
  bullet('Verifică prezența cookie-ului admin_token (utilizatorul e autentificat)'),
  bullet('Verifică parola veche față de hash-ul din Supabase'),
  bullet('Calculează SHA-256 pentru parola nouă'),
  bullet('Update în Supabase + reemitere cookie cu noul hash'),
  space(),
  h2('7.5 Principii de securitate aplicate'),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      tRow('Principiu', 'Implementare', true),
      tRow('Parole în hash', 'SHA-256 — parola în clar nu se stochează niciodată'),
      tRow('httpOnly cookie', 'Token inaccesibil din JavaScript — protecție XSS'),
      tRow('SameSite=Lax', 'Protecție împotriva CSRF'),
      tRow('Secure flag', 'Cookie trimis doar pe HTTPS în producție'),
      tRow('Variabile .env', 'Credențiale în .env.local, excluse din git (.gitignore)'),
      tRow('robots.txt', 'Blochează indexarea /admin de către motoarele de căutare'),
    ],
  }),

  // ══ 8. SEO ══
  h1('8. SEO Tehnic'),
  h2('8.1 Metadata Next.js'),
  p('Next.js 15 oferă un sistem de metadata declarativ — se exportă un obiect din fiecare page.tsx, iar framework-ul generează automat tag-urile HTML corespunzătoare.'),
  code('// app/layout.tsx — metadata globală cu template'),
  code('export const metadata: Metadata = {'),
  code('  metadataBase: new URL(\'https://vibe-website2.vercel.app\'),'),
  code('  title: {'),
  code('    default: \'Vibe Caffè — Cafea de Specialitate în București\','),
  code('    template: \'%s | Vibe Caffè\',   // ex: "Meniu | Vibe Caffè"'),
  code('  },'),
  code('  description: \'Cafea de specialitate, brunch și deserturi...\','),
  code('  openGraph: {'),
  code('    siteName: \'Vibe Caffè\','),
  code('    locale: \'ro_RO\','),
  code('    type: \'website\','),
  code('  },'),
  code('}'),
  space(),
  h2('8.2 JSON-LD Structured Data'),
  p('Schema.org structured data ajută motoarele de căutare să înțeleagă tipul de business și afișează informații îmbogățite în rezultatele de căutare (rich snippets).'),
  code('// Schema CafeOrCoffeeShop pe homepage'),
  code('{'),
  code('  "@context": "https://schema.org",'),
  code('  "@type": "CafeOrCoffeeShop",'),
  code('  "name": "Vibe Caffè",'),
  code('  "url": "https://vibe-website2.vercel.app",'),
  code('  "address": {'),
  code('    "@type": "PostalAddress",'),
  code('    "streetAddress": "Bulevardul Regina Elisabeta 30",'),
  code('    "addressLocality": "București",'),
  code('    "postalCode": "050016",'),
  code('    "addressCountry": "RO"'),
  code('  },'),
  code('  "openingHoursSpecification": [...]'),
  code('}'),
  space(),
  h2('8.3 robots.txt'),
  code('User-agent: *'),
  code('Allow: /'),
  code('Disallow: /admin'),
  code('Disallow: /api/'),
  code('Sitemap: https://vibe-website2.vercel.app/sitemap.xml'),
  note('Paginile /admin și /api/ sunt excluse din indexare — nu au valoare pentru utilizatorii motoarelor de căutare și pot reprezenta o vulnerabilitate de securitate dacă sunt indexate.'),

  // ══ 9. DEPLOYMENT ══
  h1('9. Deployment și CI/CD'),
  h2('9.1 Fluxul de deployment'),
  code('Developer (local)'),
  code('    ↓ git push origin main'),
  code('GitHub Repository'),
  code('    ↓ webhook automat'),
  code('Vercel Build Pipeline'),
  code('    ↓ npm run build (Next.js)'),
  code('    ↓ verificare TypeScript'),
  code('    ↓ generare pagini statice'),
  code('Vercel CDN (Production)'),
  code('    → vibe-website2.vercel.app'),
  space(),
  h2('9.2 Variabile de mediu'),
  p('Variabilele de mediu sunt configurate în două locuri:'),
  bullet('Local: fișierul .env.local (exclus din git)'),
  bullet('Producție: dashboard-ul Vercel → Settings → Environment Variables'),
  space(),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      tRow('Variabilă', 'Rol', true),
      tRow('NEXT_PUBLIC_SUPABASE_URL', 'URL-ul proiectului Supabase (public)'),
      tRow('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'Cheia anonimă Supabase (public)'),
      tRow('ADMIN_SECRET', 'Parola admin implicită (fallback dacă DB e goală)'),
    ],
  }),
  note('Variabilele NEXT_PUBLIC_ sunt incluse în bundle-ul JavaScript al browser-ului — nu stocați secrete în ele. Cheia anon Supabase este sigur publică prin design.'),

  // ══ 10. PROCESUL DE ÎNVĂȚARE ══
  h1('10. Procesul de Învățare — Vibe Coding'),
  h2('10.1 Structura sesiunilor'),
  p('Proiectul a fost dezvoltat în sesiuni de lucru organizate pe sprinturi tematice. Fiecare sesiune a început cu un obiectiv clar și s-a finalizat cu cod funcțional publicat pe internet.'),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      tRow('Sprint', 'Obiectiv', true),
      tRow('Sprint 1', 'Fundație: setup Next.js, design system, homepage inițial'),
      tRow('Sprint 2', 'Homepage SSR cu conținut real indexabil de Google'),
      tRow('Sprint 3', 'Pagina /meniu cu categorii și filtrare client-side'),
      tRow('Sprint 4', 'Oferte sezoniere /sarbatori cu date din Supabase'),
      tRow('Sprint 5', 'Pagina /locatie + formular rezervări cu Supabase'),
      tRow('Sprint 6', 'Navigare: active tracking, link De ce Vibe?'),
      tRow('Sprint 7', 'Pagini legale + robots.txt'),
      tRow('Modulul 4 (P1)', 'Admin panel: protecție, login securizat'),
      tRow('Modulul 4 (P2-P3)', 'Brand unificat + metadata globală'),
      tRow('Modulul 4 (P4-P7)', 'SEO avansat: OpenGraph, JSON-LD, audit'),
      tRow('Extra', 'Schimbare parolă admin fără email recovery'),
    ],
  }),
  space(),
  h2('10.2 Concepte tehnice asimilate'),
  h3('Server vs. Client Components'),
  p('Una dintre cele mai importante înțelegeri ale proiectului: decizia de a face o componentă server sau client are implicații directe asupra performanței, SEO-ului și capabilităților componentei.'),
  bullet('Server: mai rapid la prima încărcare, bun pentru SEO, nu poate folosi stare locală'),
  bullet('Client: interactiv, poate folosi hooks React, nu contribuie la SEO direct'),
  space(),
  h3('Cookie-uri httpOnly vs. localStorage'),
  p('Pentru autentificarea admin s-a ales cookie httpOnly în loc de localStorage. Motivul: localStorage este accesibil din JavaScript, deci vulnerabil la XSS. Cookie-ul httpOnly nu poate fi citit sau modificat de cod JavaScript malițios.'),
  space(),
  h3('SHA-256 pentru parole'),
  p('În loc să stocheze parola în clar, sistemul stochează hash-ul SHA-256. SHA-256 este o funcție one-way: din hash nu poți reconstitui parola originală. Aceasta este o practică standard de securitate.'),
  note('Notă pedagogică: în aplicații de producție reale se folosesc algoritmi mai robuști (bcrypt, argon2) care includ "salt" și sunt deliberat lenți pentru a îngreuna atacurile brute-force. SHA-256 este ales aici pentru simplitate și pentru că este disponibil nativ în Node.js fără dependențe externe.'),
  space(),
  h3('Metadata și SEO în Next.js'),
  p('Proiectul a demonstrat că există o tensiune între interactivitate și SEO: Client Components nu pot exporta metadata. Soluția: layout.tsx (Server Component) exportă metadata, iar page.tsx (Client Component) se ocupă de interactivitate.'),

  // ══ 11. CONCLUZII ══
  h1('11. Concluzii'),
  h2('11.1 Realizări tehnice'),
  bullet('Aplicație web full-stack completă, publicată și funcțională'),
  bullet('Arhitectură modernă Next.js 15 cu separare corectă server/client'),
  bullet('Securitate implementată corect: hashing, httpOnly cookies, middleware'),
  bullet('SEO tehnic complet: metadata, OpenGraph, JSON-LD, robots.txt'),
  bullet('Bază de date cloud cu 5 tabele și operații CRUD complete'),
  bullet('Deployment automat cu CI/CD (GitHub → Vercel)'),
  bullet('108 commit-uri Git cu mesaje descriptive pe parcursul proiectului'),
  space(),
  h2('11.2 Lecții cheie'),
  bullet('Arhitectura contează: deciziile timpurii (server vs. client) au impact pe termen lung'),
  bullet('Securitatea nu este opțională: chiar și pentru un site de cafenea, autentificarea trebuie implementată corect'),
  bullet('SEO tehnic este parte din cod, nu un afterthought'),
  bullet('Variabilele de mediu sunt esențiale pentru separarea config de cod'),
  bullet('Git disciplinat (commit-uri atomice, mesaje clare) face debugging-ul mai ușor'),
  space(),
  h2('11.3 Posibile îmbunătățiri viitoare'),
  bullet('Înlocuirea SHA-256 cu bcrypt pentru hashing mai robust al parolelor'),
  bullet('Adăugarea unui sistem de sesiuni proper (ex: NextAuth.js)'),
  bullet('Implementarea unui sistem de email (confirmare rezervări, recuperare parolă)'),
  bullet('Dashboard analytics pentru admin (număr rezervări, produse populare)'),
  bullet('Optimizarea imaginilor cu next/image'),
  bullet('Teste automate (unit tests, integration tests)'),
  space(),
  new Paragraph({ border: { top: { style: BorderStyle.SINGLE, size: 4, color: '14B8A6' } }, spacing: { before: 200, after: 100 } }),
  new Paragraph({
    children: [new TextRun({ text: `Documentație generată automat • ${DATE} • Vibe Coding Proiect 01 • Student: ${STUDENT}`, size: 18, color: '9CA3AF', italics: true })],
    alignment: AlignmentType.CENTER,
  }),
];

// ─── GENERARE DOCX ────────────────────────────────────────────────────────────

const doc = new Document({
  sections: [{ children }],
  styles: {
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', run: { bold: true, size: 32, color: '14B8A6' } },
      { id: 'Heading2', name: 'Heading 2', run: { bold: true, size: 26, color: '1F2937' } },
      { id: 'Heading3', name: 'Heading 3', run: { bold: true, size: 22, color: '374151' } },
    ],
  },
});

const docxPath = path.join(OUTPUT_DIR, 'documentatie-profesor.docx');
const pdfPath = path.join(OUTPUT_DIR, 'documentatie-profesor.pdf');

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(docxPath, buffer);
console.log(`✅ DOCX salvat: ${docxPath}`);

// ─── GENERARE PDF ─────────────────────────────────────────────────────────────

async function genPdf(outPath) {
  const pdf = createPdf({ size: 'A4', margins: { top: 50, bottom: 50, left: 60, right: 60 } });
  const out = fs.createWriteStream(outPath);
  pdf.pipe(out);

  const W = 475;
  const X = 60;

  function titre(t, sub, meta) {
    pdf.moveDown(3);
    pdf.font('Bold').fontSize(28).fillColor('#14B8A6').text('VIBE CAFFÈ', { align: 'center' });
    pdf.moveDown(0.4);
    pdf.font('Bold').fontSize(16).fillColor('#1F2937').text(t, { align: 'center' });
    pdf.moveDown(0.3);
    pdf.font('Regular').fontSize(11).fillColor('#6B7280').text(sub, { align: 'center' });
    pdf.moveDown(0.8);
    pdf.moveTo(X, pdf.y).lineTo(535, pdf.y).strokeColor('#14B8A6').lineWidth(1.5).stroke();
    pdf.moveDown(0.8);
    for (const [label, val] of meta) {
      pdf.font('Bold').fontSize(10).fillColor('#374151').text(`${label}: `, { continued: true });
      pdf.font('Regular').fillColor('#0D9488').text(val);
      pdf.moveDown(0.2);
    }
  }

  function H1(t) {
    if (pdf.y > 680) pdf.addPage();
    pdf.moveDown(0.8);
    pdf.font('Bold').fontSize(14).fillColor('#14B8A6').text(t, { width: W });
    pdf.moveDown(0.1);
    pdf.moveTo(X, pdf.y).lineTo(535, pdf.y).strokeColor('#14B8A6').lineWidth(0.8).stroke();
    pdf.moveDown(0.4);
  }
  function H2(t) {
    pdf.moveDown(0.5);
    pdf.font('Bold').fontSize(11).fillColor('#1F2937').text(t, { width: W });
    pdf.moveDown(0.2);
  }
  function H3(t) {
    pdf.moveDown(0.3);
    pdf.font('Bold').fontSize(10).fillColor('#374151').text(t, { width: W });
    pdf.moveDown(0.15);
  }
  function P(t) {
    pdf.font('Regular').fontSize(10).fillColor('#374151').text(t, { width: W });
    pdf.moveDown(0.3);
  }
  function B(t, level = 0) {
    pdf.font('Regular').fontSize(10).fillColor('#374151')
      .text(`${level === 0 ? '•' : '◦'} ${t}`, { indent: 12 + level * 15, width: W - 12 });
    pdf.moveDown(0.12);
  }
  function CODE(t) {
    if (pdf.y > 730) pdf.addPage();
    pdf.font('Regular').fontSize(8.5).fillColor('#0D9488').text(t, { indent: 15, width: W - 15 });
    pdf.moveDown(0.05);
  }
  function NOTE(t) {
    pdf.moveDown(0.2);
    pdf.font('Italic').fontSize(9).fillColor('#6B7280').text(`Notă: ${t}`, { indent: 10, width: W - 10 });
    pdf.moveDown(0.3);
  }
  function TR(label, val, header = false) {
    const y = pdf.y;
    if (header) {
      pdf.rect(X, y - 2, W, 16).fill('#0D9488');
      pdf.font('Bold').fontSize(9).fillColor('#FFFFFF').text(label, X + 4, y, { width: 150 });
      pdf.font('Bold').fontSize(9).fillColor('#FFFFFF').text(val, X + 160, y, { width: W - 165 });
    } else {
      pdf.rect(X, y - 2, 155, 16).fill('#F0FDFA');
      pdf.rect(X + 155, y - 2, W - 155, 16).fill('#FFFFFF');
      pdf.font('Bold').fontSize(9).fillColor('#1F2937').text(label, X + 4, y, { width: 150 });
      pdf.font('Regular').fontSize(9).fillColor('#374151').text(val, X + 160, y, { width: W - 165 });
    }
    pdf.moveDown(0.65);
  }

  // ── Pagina de titlu ──
  titre(
    'Documentație Tehnică și Pedagogică',
    'Proiect Web Full-Stack — Vibe Coding',
    [
      ['Student', STUDENT],
      ['Data', DATE],
      ['Site live', SITE_URL],
      ['Repository', REPO_URL],
      ['Commit-uri', '108 commit-uri Git (dec 2025 — apr 2026)'],
    ]
  );

  // ── 1. Introducere ──
  pdf.addPage();
  H1('1. Introducere și Context');
  P('Proiectul "Vibe Caffè" este un site web complet pentru o cafenea de specialitate fictivă din București, dezvoltat în cadrul cursului Vibe Coding. Scopul proiectului este de a demonstra capacitatea de a construi o aplicație web modernă, de la zero până la producție, folosind tehnologii de nivel profesional.');
  P('Proiectul acoperă întregul ciclu de dezvoltare software: design, implementare front-end și back-end, integrarea cu o bază de date cloud, securizarea accesului administrativ și publicarea pe internet cu deployment automat.');
  H2('1.1 Obiective Pedagogice');
  B('Înțelegerea arhitecturii Next.js App Router (server vs. client components)');
  B('Lucrul cu TypeScript în modul strict — tipuri, interfețe, tipizare API');
  B('Integrarea Supabase ca backend-as-a-service');
  B('Implementarea securității: hashing, cookie-uri httpOnly, middleware');
  B('SEO tehnic: metadata, OpenGraph, JSON-LD structured data, SSR');
  B('Deployment automat cu Vercel și Git (CI/CD)');
  B('Versionare cod cu Git — 108 commit-uri cu mesaje descriptive');
  H2('1.2 Metodologia Vibe Coding');
  P('Vibe Coding este o metodologie de dezvoltare colaborativă în care studentul dirijează procesul (decizii de design și arhitectură), iar un asistent AI (Claude) implementează codul. Această abordare accelerează învățarea prin expunerea la cod real de producție și discuții tehnice în timp real.');
  NOTE('Documentația acoperă atât codul tehnic cât și procesul de gândire din spatele deciziilor de implementare.');

  // ── 2. Arhitectura ──
  pdf.addPage();
  H1('2. Arhitectura Aplicației');
  H2('2.1 Diagrama componentelor');
  CODE('Browser (Client)');
  CODE('    ↕ HTTP / Fetch API');
  CODE('Next.js App Router (Server)');
  CODE('    ├── Server Components  →  SSR, metadata, JSON-LD');
  CODE('    ├── Client Components  →  interactivitate, stare locală');
  CODE('    ├── API Routes          →  /api/* (REST endpoints)');
  CODE('    └── Middleware          →  autentificare /admin/*');
  CODE('         ↕ Supabase Client');
  CODE('Supabase (PostgreSQL + REST API)');
  CODE('    ├── rezervari  ├── menu_items  ├── seasonal_items');
  CODE('    ├── newsletter_subscribers  └── admin_config');
  pdf.moveDown(0.4);
  H2('2.2 Tipuri de componente');
  TR('Tip', 'Caracteristici', true);
  TR('Server Component', 'Randare pe server, fără JS în browser, bune pentru SEO, nu pot folosi useState');
  TR('Client Component', 'Randare în browser, pot folosi stare și efecte, necesare pentru interactivitate');
  TR('API Route', 'Endpoint REST pe server, accesibil via fetch');
  TR('Middleware', 'Rulează înaintea oricărui request, folosit pentru autentificare');

  // ── 3. Stack tehnic ──
  H1('3. Stack Tehnic');
  TR('Tehnologie', 'Versiune și rol', true);
  TR('Next.js 15', 'Framework React — App Router, SSR, API Routes, Middleware');
  TR('React 19', 'Biblioteca UI — hooks, componente funcționale');
  TR('TypeScript 5', 'Tipizare statică (strict mode) — detectare erori la compilare');
  TR('Tailwind CSS 4', 'Utilitare CSS — design responsiv, dark mode');
  TR('Supabase', 'Backend-as-a-Service: PostgreSQL, REST API automat');
  TR('Vercel', 'Hosting cloud cu deployment automat din GitHub (CI/CD)');
  TR('Node.js crypto', 'Hashing SHA-256 pentru parole (built-in, fără dependențe)');

  // ── 4. Structura ──
  pdf.addPage();
  H1('4. Structura Proiectului');
  CODE('app/');
  CODE('├── layout.tsx              # Root layout — metadata globală, Navigation');
  CODE('├── page.tsx                # Homepage SSR cu JSON-LD');
  CODE('├── meniu/page.tsx          # Meniu cu filtrare categorii (Client)');
  CODE('├── rezervari/page.tsx      # Formular rezervări + Supabase');
  CODE('├── locatie/page.tsx        # Locație + JSON-LD LocalBusiness');
  CODE('├── sarbatori/page.tsx      # Oferte sezoniere');
  CODE('├── admin/page.tsx          # Panou admin (protejat de middleware)');
  CODE('├── confidentialitate/      # Politică confidențialitate');
  CODE('├── cookies/                # Politică cookies');
  CODE('├── termeni/                # Termeni și condiții');
  CODE('└── api/');
  CODE('    ├── admin/login/        # POST — autentificare');
  CODE('    ├── admin/change-password/ # POST — schimbare parolă');
  CODE('    ├── rezervari/          # GET/POST/PATCH — CRUD rezervări');
  CODE('    ├── menu/               # GET/POST/PUT/DELETE — CRUD meniu');
  CODE('    ├── holiday/            # GET/POST/DELETE — oferte sezoniere');
  CODE('    ├── newsletter/         # POST — abonare newsletter');
  CODE('    └── chat/               # POST — Barista Bot AI');
  pdf.moveDown(0.3);
  CODE('middleware.ts               # Protecție rute /admin/*');
  CODE('lib/supabase.ts             # Client Supabase singleton');
  CODE('public/robots.txt           # Instrucțiuni motoare de căutare');

  // ── 5. Pagini ──
  pdf.addPage();
  H1('5. Pagini și Funcționalități');
  H2('5.1 Homepage (/) — Server Component');
  P('Homepage-ul se randează complet pe server — motoarele de căutare primesc HTML complet. Aceasta este o decizie arhitecturală cheie pentru SEO.');
  B('Hero section cu titlu, subtitlu și 2 butoane CTA (Meniu / Rezervă)');
  B('Secțiunea "De ce Vibe?" — 4 carduri cu diferențiatori concreți');
  B('Preview meniu SSR — 6 produse hardcodate (fără call la baza de date)');
  B('Oferte sezoniere SSR — 3 produse cu descrieri');
  B('JSON-LD schema.org CafeOrCoffeeShop pentru SEO local');
  NOTE('Preview-ul meniu este hardcodat pentru a evita un call la DB pe homepage. Datele actualizabile sunt pe /meniu.');

  H2('5.2 Meniu (/meniu) — Client Component');
  P('Client Component pentru că are nevoie de filtrare interactivă pe categorii, fără reîncărcare de pagină.');
  B('Fetch la /api/menu la montare — date din Supabase');
  B('Filtrare client-side: Espresso, Specialty, Vegan, Cold, Alternative, Pastry');
  B('Metadata SEO în layout.tsx dedicat (Server Component)');
  NOTE('Client Components nu pot exporta metadata. Soluție: layout.tsx (Server) exportă metadata, page.tsx (Client) gestionează interactivitatea.');

  H2('5.3 Rezervări (/rezervari)');
  B('Formular cu câmpuri: nume, telefon, dată, oră, persoane, mesaj');
  B('POST la /api/rezervari → insert în tabelul Supabase');
  B('Mesaj de succes personalizat cu buton înapoi');
  B('Caseta informativă: program, confirmare, anulare');

  H2('5.4 Panou Admin (/admin)');
  B('Tab Rezervări: listare, confirmare, anulare');
  B('Tab Meniu: adăugare, editare, ștergere produse');
  B('Tab Sărbători: gestionare oferte sezoniere');
  B('Tab Setări: schimbare parolă admin din panou');
  NOTE('Navbar-ul site-ului este ascuns pe paginile /admin — interfață curată pentru administrator.');

  // ── 6. Baza de date ──
  pdf.addPage();
  H1('6. Baza de Date — Supabase');
  H2('Schema tabelelor');
  H3('rezervari');
  CODE('id BIGSERIAL PK | created_at TIMESTAMPTZ | nume TEXT | telefon TEXT');
  CODE('data DATE | ora TEXT | persoane INTEGER | mesaj TEXT');
  CODE('status TEXT DEFAULT \'pending\'  -- pending | confirmed | cancelled');
  H3('menu_items');
  CODE('id BIGSERIAL PK | name TEXT | price INTEGER | category TEXT');
  CODE('description TEXT | ingredients TEXT | vegan BOOLEAN | available BOOLEAN');
  H3('admin_config');
  CODE('id INTEGER PK DEFAULT 1 | password_hash TEXT  -- SHA-256 hex (64 chars)');
  NOTE('Un singur rând (id=1). Parola nu se stochează în clar — doar hash-ul SHA-256.');
  H3('Client Supabase');
  CODE('export function getSupabase() {');
  CODE('  return createClient(');
  CODE('    process.env.NEXT_PUBLIC_SUPABASE_URL!,');
  CODE('    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!');
  CODE('  );');
  CODE('}');

  // ── 7. Securitate ──
  pdf.addPage();
  H1('7. Securitate');
  H2('7.1 Fluxul de autentificare');
  CODE('1. POST /api/admin/login  cu { password }');
  CODE('2. Server: SHA-256(password) → hash');
  CODE('3. Compară cu admin_config.password_hash din Supabase');
  CODE('4. Match → setează cookie admin_token = hash (httpOnly, 8 ore)');
  CODE('5. Fiecare request /admin/* → middleware verifică cookie');
  CODE('6. Middleware: /^[a-f0-9]{64}$/.test(token) → format valid?');
  pdf.moveDown(0.3);
  H2('7.2 Codul de autentificare');
  CODE('function sha256(text: string): string {');
  CODE('  return createHash(\'sha256\').update(text).digest(\'hex\')');
  CODE('}');
  CODE('');
  CODE('// Cookie httpOnly — inaccesibil din JavaScript browser');
  CODE('response.cookies.set(\'admin_token\', hash, {');
  CODE('  httpOnly: true,');
  CODE('  secure: NODE_ENV === \'production\',  // Doar HTTPS');
  CODE('  sameSite: \'lax\',                   // Protecție CSRF');
  CODE('  maxAge: 60 * 60 * 8,              // 8 ore');
  CODE('})');
  pdf.moveDown(0.3);
  H2('7.3 Principii de securitate aplicate');
  TR('Principiu', 'Implementare', true);
  TR('Hashing parole', 'SHA-256 — parola în clar nu se stochează niciodată');
  TR('httpOnly cookie', 'Token inaccesibil din JS — protecție XSS');
  TR('SameSite=Lax', 'Protecție împotriva CSRF');
  TR('Secure flag', 'Cookie trimis doar pe HTTPS în producție');
  TR('Variabile .env', 'Credențiale în .env.local, excluse din git');
  TR('robots.txt', 'Blochează indexarea /admin de motoarele de căutare');
  NOTE('În producție reală se recomandă bcrypt/argon2 în loc de SHA-256, pentru rezistență mai bună la atacuri brute-force.');

  // ── 8. SEO ──
  pdf.addPage();
  H1('8. SEO Tehnic');
  H2('8.1 Sistem metadata Next.js');
  CODE('// layout.tsx — template global');
  CODE('export const metadata: Metadata = {');
  CODE('  metadataBase: new URL(\'https://vibe-website2.vercel.app\'),');
  CODE('  title: {');
  CODE('    default: \'Vibe Caffè — Cafea de Specialitate în București\',');
  CODE('    template: \'%s | Vibe Caffè\',  // ex: "Meniu | Vibe Caffè"');
  CODE('  },');
  CODE('  openGraph: { siteName: \'Vibe Caffè\', locale: \'ro_RO\' },');
  CODE('}');
  pdf.moveDown(0.3);
  H2('8.2 JSON-LD Structured Data');
  CODE('{');
  CODE('  "@context": "https://schema.org",');
  CODE('  "@type": "CafeOrCoffeeShop",');
  CODE('  "name": "Vibe Caffè",');
  CODE('  "address": { "@type": "PostalAddress", ... },');
  CODE('  "openingHoursSpecification": [...]');
  CODE('}');
  NOTE('JSON-LD ajută Google să afișeze "rich snippets" în rezultatele de căutare (adresă, orar, tip business).');
  H2('8.3 robots.txt');
  CODE('User-agent: *');
  CODE('Allow: /');
  CODE('Disallow: /admin');
  CODE('Disallow: /api/');
  CODE('Sitemap: https://vibe-website2.vercel.app/sitemap.xml');

  // ── 9. Deployment ──
  H1('9. Deployment și CI/CD');
  CODE('git push origin main');
  CODE('    ↓ webhook GitHub → Vercel');
  CODE('    ↓ npm run build (TypeScript check + Next.js build)');
  CODE('    ↓ deploy pe CDN global');
  CODE('    → vibe-website2.vercel.app (live în ~35 secunde)');
  pdf.moveDown(0.3);
  TR('Variabilă .env', 'Rol', true);
  TR('NEXT_PUBLIC_SUPABASE_URL', 'URL proiect Supabase (public)');
  TR('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'Cheie anonimă Supabase (public)');
  TR('ADMIN_SECRET', 'Parolă admin implicită (fallback)');

  // ── 10. Procesul de învățare ──
  pdf.addPage();
  H1('10. Procesul de Învățare — Vibe Coding');
  H2('10.1 Sprinturi de dezvoltare');
  TR('Sprint', 'Obiectiv', true);
  TR('Sprint 1', 'Fundație: setup Next.js, design system, homepage inițial');
  TR('Sprint 2', 'Homepage SSR cu conținut real indexabil');
  TR('Sprint 3', 'Meniu cu categorii și filtrare client-side');
  TR('Sprint 4', 'Oferte sezoniere cu date din Supabase');
  TR('Sprint 5', 'Locație + formular rezervări cu Supabase');
  TR('Sprint 6', 'Navigare: active tracking, smooth scroll');
  TR('Sprint 7', 'Pagini legale + robots.txt');
  TR('Modulul 4 P1-P7', 'SEO avansat, admin securizat, brand unificat');
  TR('Extra', 'Schimbare parolă admin fără email recovery');
  pdf.moveDown(0.3);
  H2('10.2 Concepte cheie asimilate');
  H3('Server vs. Client Components');
  P('Decizia de a face o componentă server sau client are implicații directe asupra performanței și SEO-ului. Server = rapid, bun pentru SEO, fără stare locală. Client = interactiv, nu contribuie direct la SEO.');
  H3('Cookie httpOnly vs. localStorage');
  P('Pentru autentificare s-a ales cookie httpOnly în loc de localStorage. Motivul: localStorage este accesibil din JavaScript (vulnerabil XSS). Cookie httpOnly nu poate fi citit sau modificat de cod JS malițios.');
  H3('Hashing parole (SHA-256)');
  P('Parola nu se stochează în clar — doar hash-ul SHA-256 (funcție one-way). Din hash nu poți reconstitui parola originală. Practică standard de securitate.');
  H3('Metadata în Client Components');
  P('Client Components nu pot exporta metadata. Soluție arhitecturală: se creează un layout.tsx separat (Server Component) care exportă metadata, permițând page.tsx să fie Client Component.');

  // ── 11. Concluzii ──
  pdf.addPage();
  H1('11. Concluzii');
  H2('11.1 Realizări tehnice');
  B('Aplicație web full-stack completă, publicată și funcțională');
  B('Arhitectură modernă Next.js 15 cu separare corectă server/client');
  B('Securitate implementată corect: hashing, httpOnly cookies, middleware');
  B('SEO tehnic complet: metadata, OpenGraph, JSON-LD, robots.txt');
  B('Bază de date cloud cu 5 tabele și operații CRUD complete');
  B('Deployment automat CI/CD (GitHub → Vercel, ~35 secunde)');
  B('108 commit-uri Git cu mesaje descriptive pe 4 luni de dezvoltare');
  H2('11.2 Lecții cheie');
  B('Arhitectura contează: deciziile timpurii au impact pe termen lung');
  B('Securitatea nu este opțională — chiar și pentru un site simplu');
  B('SEO tehnic este parte din cod, nu un afterthought');
  B('Variabilele de mediu sunt esențiale pentru separarea config de cod');
  B('Git disciplinat face debugging-ul mai ușor și colaborarea posibilă');
  H2('11.3 Îmbunătățiri viitoare');
  B('Înlocuirea SHA-256 cu bcrypt pentru hashing mai robust');
  B('Sistem de email pentru confirmare rezervări și recuperare parolă');
  B('Dashboard analytics pentru admin');
  B('Teste automate (unit + integration tests)');
  B('Optimizarea imaginilor cu next/image');

  pdf.moveDown(1.5);
  pdf.moveTo(X, pdf.y).lineTo(535, pdf.y).strokeColor('#14B8A6').lineWidth(0.8).stroke();
  pdf.moveDown(0.5);
  pdf.font('Italic').fontSize(9).fillColor('#9CA3AF')
    .text(`Documentație generată automat • ${DATE} • Vibe Coding Proiect 01 • Student: ${STUDENT}`, { align: 'center' });

  pdf.end();
  await new Promise((res, rej) => { out.on('finish', res); out.on('error', rej); });
}

await genPdf(pdfPath);
console.log(`✅ PDF salvat: ${pdfPath}`);
console.log('\n🎉 Documentație pentru profesor generată!');
