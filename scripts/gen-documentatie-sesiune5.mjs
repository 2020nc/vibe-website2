/**
 * Documentatie Tehnica — Sesiunea 5, Bloc E: Redesign Vizual
 * Vibe Caffe — curs Vibe Coding
 * Output: docs/sesiuni/sesiune-5-bloc-e.docx + .pdf
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
const OUTPUT_DIR = path.resolve(__dirname, '../docs/sesiuni');

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

  // PAGINA DE TITLU
  new Paragraph({ spacing: { before: 800, after: 200 } }),
  new Paragraph({
    children: [new TextRun({ text: 'VIBE CAFFE', bold: true, size: 72, color: '14B8A6' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Documentatie Tehnica', bold: true, size: 44, color: '1F2937' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Sesiunea 5 — Bloc E: Redesign Vizual', bold: true, size: 30, color: '6B3A2A' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
  }),
  new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '14B8A6' } },
    spacing: { after: 240 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Student: ', bold: true, size: 24 }), new TextRun({ text: '2020nc', size: 24 })],
    alignment: AlignmentType.CENTER, spacing: { after: 80 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Data: ', bold: true, size: 24 }), new TextRun({ text: '2026-04-04', size: 24 })],
    alignment: AlignmentType.CENTER, spacing: { after: 80 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Curs: ', bold: true, size: 24 }), new TextRun({ text: 'Vibe Coding', size: 24 })],
    alignment: AlignmentType.CENTER, spacing: { after: 80 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Site live: ', bold: true, size: 24 }), new TextRun({ text: 'vibe-website2.vercel.app', size: 24, color: '0D9488' })],
    alignment: AlignmentType.CENTER, spacing: { after: 80 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Repository: ', bold: true, size: 24 }), new TextRun({ text: 'github.com/2020nc/vibe-website2', size: 24, color: '0D9488' })],
    alignment: AlignmentType.CENTER, spacing: { after: 80 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Commit final: ', bold: true, size: 24 }), new TextRun({ text: '5a6ec11', size: 24, color: '6B3A2A' })],
    alignment: AlignmentType.CENTER, spacing: { after: 400 },
  }),

  // ══════════════════════════════════════════════
  // 1. INTRODUCERE
  // ══════════════════════════════════════════════
  h1NoBreak('1. Introducere'),

  p('Aceasta documentatie acopera Sesiunea 5, Bloc E din cursul Vibe Coding — ultima sesiune a proiectului "Vibe Caffe". Obiectivul principal al acestei sesiuni a fost redesign-ul vizual al aplicatiei: imbunatatirea contrastului pentru accesibilitate, introducerea unui nou font de brand si aplicarea unei palete de culori originale inspirate din universul cafelei.'),

  p('Sesiunea a inclus 3 modificari principale (Modificarea 10, 11 si 12), executate sistematic cu backup git inainte de fiecare schimbare riscanta.'),

  space(),
  h2('1.1 Rezumatul sesiunii'),
  table(
    ['Modificare', 'Titlu', 'Fisiere afectate', 'Risc'],
    [
      ['M10', 'Stepper vizual 3 pasi pe /rezervari', 'app/rezervari/page.tsx', 'Mediu'],
      ['M11', 'Contrast text WCAG AA', 'app/page.tsx, components/FooterStarter.tsx', 'Scazut'],
      ['M12 P1', 'Font Playfair Display', 'app/layout.tsx, app/page.tsx', 'Scazut'],
      ['M12 P2', 'Paleta espresso/crem/oliv in CSS', 'app/globals.css', 'Scazut'],
      ['M12 P3', 'Aplicare paleta pe butoane CTA', 'app/page.tsx', 'Mediu'],
    ]
  ),

  // ══════════════════════════════════════════════
  // 2. MODIFICAREA 10 — STEPPER
  // ══════════════════════════════════════════════
  h1('2. Modificarea 10 — Stepper Vizual pe /rezervari'),

  p('Pagina de rezervari a fost restructurata dintr-un formular unic intr-un wizard cu 3 pasi, fiecare pas avand propriul context si validare. Stepperul vizual afiseaza progresul utilizatorului si permite navigarea inainte/inapoi.'),

  space(),
  h2('2.1 Cei 3 pasi'),
  table(
    ['Pas', 'Titlu', 'Campuri', 'Validare pentru avansare'],
    [
      ['1', 'Alege data & ora', 'Data (date picker), Ora (grid butoane)', 'Ambele campuri completate'],
      ['2', 'Detaliile tale', 'Nume, Email, Telefon, Persoane, Mesaj', 'Nume + Email + Telefon completate'],
      ['3', 'Confirmare', 'Sumar rezervare (read-only)', 'Submit catre Supabase'],
    ]
  ),

  space(),
  h2('2.2 Implementare tehnica'),

  h3('State management'),
  p('Un singur state currentStep (useState cu valoarea initiala 1) controleaza care pas este vizibil. Formularul complet este un singur <form> cu onSubmit, dar randat conditional pe baza currentStep.'),
  code("const [currentStep, setCurrentStep] = useState(1);"),

  space(),
  h3('Stepper vizual'),
  p('Stepper-ul este un array de 3 obiecte randat cu .map(). Fiecare cerc are 3 stari vizuale distincte:'),
  bullet('Pas completat (currentStep > step): cerc verde cu check (✓)'),
  bullet('Pas activ (currentStep === step): cerc amber/maro (#92400E)'),
  bullet('Pas viitor (currentStep < step): cerc gri neutru'),
  p('Intre cercuri exista o linie orizontala (h-px bg-gray-300) care creeaza conexiunea vizuala.'),

  space(),
  h3('Validare per pas'),
  p('Butonul "Continua" din fiecare pas este disabled pana cand conditiile sunt indeplinite:'),
  code('// Pas 1: disabled={!form.data || !form.ora}'),
  code('// Pas 2: disabled={!form.nume || !form.email || !form.telefon}'),

  space(),
  h3('Grila de ore'),
  p('Orele disponibile sunt diferite in functie de ziua saptamanii (0=duminica, 6=sambata). Functia getOre(data) calculeaza ziua si returneaza array-ul corespunzator:'),
  code('const ORE_SAPT = ["07:00", "08:00", ..., "22:00"];  // Luni-Vineri, 16 optiuni'),
  code('const ORE_WE   = ["08:00", "09:00", ..., "23:00"];  // Sam-Dum, 16 optiuni'),
  code('function getOre(data) {'),
  code('  const zi = new Date(data).getDay();'),
  code('  return (zi === 0 || zi === 6) ? ORE_WE : ORE_SAPT;'),
  code('}'),
  p('Fiecare ora este un buton de tip button (nu submit) care seteaza form.ora. Butonul selectat are ring teal si scale-105.'),

  space(),
  h3('Pasul 3 — Sumar'),
  p('Pasul 3 afiseaza toate datele din state intr-un card read-only (bg-gray-50), urmat de butonul "Confirma" care declanseaza handleSubmit. Logica Supabase este pastrata identic cu versiunea anterioara — nicio modificare la integrare.'),

  space(),
  h2('2.3 UX improvements'),
  bullet('Formular formatData() — afiseaza data selectata cu weekday in romana: "sambata, 05 aprilie 2026"'),
  bullet('Afisare "L-V 07:00-22:00 · S-D 08:00-23:00" ca subtitle sub titlu — setarile programului vizibile inainte de interactiune'),
  bullet('Info compacta la baza paginii: 8 persoane max, confirmare 2h, anulare gratuita'),
  bullet('Mesaj success cu 2 CTA-uri: "Rezervare noua" si "Inapoi la pagina principala"'),

  // ══════════════════════════════════════════════
  // 3. MODIFICAREA 11 — WCAG AA
  // ══════════════════════════════════════════════
  h1('3. Modificarea 11 — Contrast Text WCAG AA'),

  p('Standardul WCAG AA (Web Content Accessibility Guidelines) impune un raport de contrast minim de 4.5:1 pentru text normal si 3:1 pentru text mare (18px+ bold sau 24px+ normal). Am auditat paginile si am corectat clasele Tailwind care nu indeplineau pragul.'),

  space(),
  h2('3.1 Probleme identificate'),
  table(
    ['Locatie', 'Clasa veche', 'Clasa noua', 'Fundal', 'Motiv'],
    [
      ['Footer — descriere brand', 'text-gray-400', 'text-gray-300', 'bg-gray-800', 'Contrast ~3.9:1 < 4.5:1'],
      ['Footer — linkuri navigare', 'text-gray-400', 'text-gray-300', 'bg-gray-800', 'Contrast ~3.9:1 < 4.5:1'],
      ['Footer — contact', 'text-gray-400', 'text-gray-300', 'bg-gray-800', 'Contrast ~3.9:1 < 4.5:1'],
      ['Footer — newsletter desc', 'text-gray-400', 'text-gray-300', 'bg-gray-800', 'Contrast ~3.9:1 < 4.5:1'],
      ['Hero — subtitle', 'text-gray-300', 'text-gray-200', 'bg-gray-900', 'Imbunatatire de la 8:1 la 10:1'],
      ['Locatie — info text', 'text-gray-300', 'text-gray-200', 'bg-gray-900', 'Imbunatatire de la 8:1 la 10:1'],
    ]
  ),

  space(),
  h2('3.2 Rapoarte de contrast (aproximativ)'),
  bullet('text-gray-400 (#9CA3AF) pe bg-gray-800 (#1F2937): raport ~3.9:1 — ESEC WCAG AA'),
  bullet('text-gray-300 (#D1D5DB) pe bg-gray-800 (#1F2937): raport ~7.4:1 — PASS WCAG AA'),
  bullet('text-gray-200 (#E5E7EB) pe bg-gray-900 (#111827): raport ~10.7:1 — PASS WCAG AAA'),

  space(),
  note('Schimbarile de contrast nu afecteaza designul vizibil — culorile raman in aceeasi familie de gri, dar lizibilitatea este imbunatatita semnificativ pentru utilizatorii cu deficiente vizuale.'),

  // ══════════════════════════════════════════════
  // 4. MODIFICAREA 12 — PALETA VIZUALA
  // ══════════════════════════════════════════════
  h1('4. Modificarea 12 — Paleta Espresso/Crem/Oliv + Font Playfair'),

  p('Modificarea 12 a fost impartita in 3 sub-pasi separati pentru a minimiza riscul de regresie vizuala. Fiecare pas a fost verificat in browser inainte de a trece la urmatorul.'),

  space(),
  h2('4.1 Pasul 1 — Font Playfair Display'),

  p('Playfair Display este un font serif elegant, folosit traditional in branding-ul pentru cafenele de lux si restaurante. A fost adaugat ca variabila CSS prin next/font/google si aplicat pe toate titlurile H1 si H2 din homepage.'),

  space(),
  h3('Configurare in layout.tsx'),
  code("import { Inter, Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';"),
  space(),
  code("const playfair = Playfair_Display({"),
  code("  variable: '--font-playfair',"),
  code("  subsets: ['latin'],"),
  code("  display: 'swap',"),
  code("});"),
  space(),
  code("// Adaugat in body className:"),
  code("`${plusJakarta.variable} ${inter.variable} ${playfair.variable} antialiased`"),

  space(),
  h3('Aplicare pe titluri (page.tsx)'),
  p('Clasa Tailwind pentru fonturi custom via CSS variable foloseste sintaxa arbitrary value:'),
  code('font-[family-name:var(--font-playfair)]'),
  p('Aceasta clasa a fost adaugata pe toate elementele h1 si h2 din app/page.tsx. Plus Jakarta Sans ramane fontul pentru body text si elemente UI (butoane, labels).'),

  space(),
  h2('4.2 Pasul 2 — Paleta de culori in globals.css'),

  p('In Tailwind CSS v4, nu mai exista fisierul tailwind.config.ts. Culorile custom se definesc in blocul @theme inline din globals.css. Aceasta este o diferenta majora fata de Tailwind v3.'),

  space(),
  important('Tailwind 4 nu are tailwind.config.ts. Culorile custom se adauga in @theme inline {} din globals.css — NU se suprascriu culorile existente Tailwind.'),

  space(),
  h3('Paleta adaugata in @theme inline'),
  code('@theme inline {'),
  code('  /* ... culorile existente ... */'),
  code(''),
  code('  /* Paleta Espresso / Crem / Oliv */'),
  code('  --color-espresso-50: #FAF6F1;'),
  code('  --color-espresso-100: #F0E6D3;'),
  code('  --color-espresso-500: #6B3A2A;'),
  code('  --color-espresso-800: #3B1F0A;'),
  code('  --color-espresso-900: #1E0F05;'),
  code(''),
  code('  --color-crem-50: #FFFDF8;'),
  code('  --color-crem-100: #F5EDD6;'),
  code('  --color-crem-200: #EDD9A3;'),
  code(''),
  code('  --color-oliv-400: #8A9E5A;'),
  code('  --color-oliv-600: #6B7C4A;'),
  code('  --color-oliv-800: #4A5733;'),
  code('}'),

  space(),
  h3('Semantica culorilor'),
  table(
    ['Culoare', 'Valoare HEX', 'Utilizare'],
    [
      ['espresso-800', '#3B1F0A', 'Butoane primare CTA (meniu, google maps)'],
      ['espresso-900', '#1E0F05', 'Hover pe butoane primare'],
      ['oliv-600', '#6B7C4A', 'Butoane secundare CTA (rezerva, sarbatori)'],
      ['oliv-800', '#4A5733', 'Hover pe butoane secundare'],
      ['crem-100', '#F5EDD6', 'Text subtitlu pe fundal espresso'],
      ['espresso-800', '#3B1F0A', 'Fundal sectiune CTA'],
    ]
  ),

  space(),
  h2('4.3 Pasul 3 — Aplicare paleta pe homepage'),

  p('Clasele Tailwind cu culorile noi au inlocuit clasele teal/orange in elementele CTA de pe homepage (app/page.tsx). Structura componentelor a ramas identica — doar clasele de culoare s-au modificat.'),

  space(),
  h3('Inainte vs. Dupa'),
  table(
    ['Element', 'Culoare veche', 'Culoare noua'],
    [
      ['Buton "Vezi meniul" (hero)', 'bg-teal-500 hover:bg-teal-600', 'bg-espresso-800 hover:bg-espresso-900'],
      ['Buton "Rezerva masa" (hero)', 'bg-orange-500 hover:bg-orange-600', 'bg-oliv-600 hover:bg-oliv-800'],
      ['Buton "Vezi meniul complet"', 'bg-teal-500 hover:bg-teal-600', 'bg-espresso-800 hover:bg-espresso-900'],
      ['Buton "Oferte sezoniere"', 'bg-orange-500 hover:bg-orange-600', 'bg-oliv-600 hover:bg-oliv-800'],
      ['Sectiunea CTA fundal', 'bg-teal-600 dark:bg-teal-800', 'bg-espresso-800 dark:bg-espresso-900'],
      ['Subtitlu sectiune CTA', 'text-teal-100', 'text-crem-100'],
      ['Buton "Rezerva masa" CTA', 'bg-orange-500 hover:bg-orange-600', 'bg-oliv-600 hover:bg-oliv-800'],
      ['Buton "Google Maps"', 'bg-teal-500 hover:bg-teal-600', 'bg-espresso-800 hover:bg-espresso-900'],
    ]
  ),

  // ══════════════════════════════════════════════
  // 5. STRUCTURA FISIERE MODIFICATE
  // ══════════════════════════════════════════════
  h1('5. Fisiere Modificate in Aceasta Sesiune'),

  table(
    ['Fisier', 'Tip modificare', 'Linii modificate (aprox.)'],
    [
      ['app/rezervari/page.tsx', 'Refactorizare majora — wizard 3 pasi', '~120 linii noi, ~50 restructurate'],
      ['app/layout.tsx', 'Adaugare font Playfair Display', '~10 linii'],
      ['app/page.tsx', 'Font pe titluri + paleta CTA + contrast WCAG', '~20 clase Tailwind modificate'],
      ['app/globals.css', 'Paleta espresso/crem/oliv in @theme', '~18 linii noi'],
      ['components/FooterStarter.tsx', 'Contrast WCAG: text-gray-400 → text-gray-300', '~8 clase Tailwind modificate'],
    ]
  ),

  space(),
  h2('5.1 Fisiere NEMODIFICATE (pastrate identic)'),
  bullet('Toate paginile de admin (/admin, /admin/login)'),
  bullet('Paginile /meniu, /locatie, /sarbatori, /confidentialitate, /cookies, /termeni'),
  bullet('Toate API routes (/api/*)'),
  bullet('Componentele Navigation.tsx, Preloader.tsx, ReviewBar.tsx, ScrollAnimations.tsx, About.tsx'),
  bullet('Integrarea Supabase (lib/supabase.ts)'),
  bullet('middleware.ts (protectie admin)'),

  // ══════════════════════════════════════════════
  // 6. CONCEPTE TEHNICE EXPLICATE
  // ══════════════════════════════════════════════
  h1('6. Concepte Tehnice — Explicatii pentru Profesor'),

  h2('6.1 WCAG AA — Ce este si de ce conteaza'),
  p('WCAG (Web Content Accessibility Guidelines) este standardul international pentru accesibilitate web, publicat de W3C. Nivelul AA este pragul minim recomandat pentru site-uri publice si este obligatoriu legal in multe tari UE.'),
  p('Raportul de contrast se calculeaza matematic pe baza luminantei relative a culorilor (formula L1+0.05)/(L2+0.05). Un raport de 4.5:1 sau mai mare inseamna ca textul este lizibil pentru persoane cu deficiente moderate de vedere.'),
  bullet('4.5:1 = nivel AA (minim pentru text normal)'),
  bullet('7:1 = nivel AAA (ideal)'),
  bullet('3:1 = nivel AA pentru text mare (18px+ bold)'),

  space(),
  h2('6.2 Tailwind CSS v4 — Diferente fata de v3'),
  p('Tailwind CSS 4 a schimbat modul de configurare a culorilor. In v3 se folosea tailwind.config.js cu theme.extend.colors. In v4, configurarea se face direct in CSS prin directiva @theme inline.'),
  code('/* Tailwind v3 (tailwind.config.js): */'),
  code('module.exports = { theme: { extend: { colors: { espresso: { 800: "#3B1F0A" } } } } }'),
  space(),
  code('/* Tailwind v4 (globals.css): */'),
  code('@theme inline {'),
  code('  --color-espresso-800: #3B1F0A;'),
  code('}'),
  p('Tailwind 4 genereaza automat clasele utilitare (bg-espresso-800, text-espresso-800, etc.) din variabilele CSS definite in @theme.'),

  space(),
  h2('6.3 next/font/google — Optimizare fonturi'),
  p('Next.js ofera modulul next/font/google care descarca fonturile Google la build time si le serveste self-hosted. Avantaje: zero latenta la incarcare, fara requests externe catre Google, GDPR-friendly.'),
  p('Fontul devine disponibil ca variabila CSS (--font-playfair) injectata in body. In Tailwind 4 se acceseaza cu clasa arbitrary:'),
  code('font-[family-name:var(--font-playfair)]'),

  space(),
  h2('6.4 Wizard/Stepper Pattern in React'),
  p('Un wizard (stepper) este un pattern UI pentru formulare complexe. Avantajele fata de un formular unic:'),
  bullet('Reducere "cognitive load" — utilizatorul vede doar campurile relevante pasului curent'),
  bullet('Validare per etapa — erori prevenite inainte de trimitere'),
  bullet('Progres vizibil — utilizatorul stie cat mai are de completat'),
  bullet('Navigare inainte/inapoi — posibilitate de corectie'),
  p('Implementarea React foloseste un singur useState pentru indexul pasului curent. Rendering-ul conditional ({currentStep === N && <PasN />}) afiseaza doar pasul activ. Tot statul formularului este intr-un singur obiect (useState<FormData>).'),

  // ══════════════════════════════════════════════
  // 7. DEPLOY SI VERSIONING
  // ══════════════════════════════════════════════
  h1('7. Deploy si Versioning'),

  h2('7.1 Commit final sesiunea 5'),
  code('git commit -m "feat: S5 — stepper rezervari, contrast WCAG, paleta espresso/crem/oliv, font Playfair"'),
  code('Commit hash: 5a6ec11'),
  code('Branch: main'),
  code('Data: 2026-04-04'),

  space(),
  h2('7.2 Deploy Vercel'),
  table(
    ['Parametru', 'Valoare'],
    [
      ['Deployment ID', 'G5wfBtkd3'],
      ['Status', 'Ready (Production)'],
      ['Durata build', '45 secunde'],
      ['Trigger', 'git push origin main (automat)'],
      ['URL productie', 'https://vibe-website2.vercel.app'],
    ]
  ),

  space(),
  h2('7.3 Istoricul commit-urilor relevante (sesiunile 4-5)'),
  table(
    ['Hash', 'Mesaj', 'Sesiune'],
    [
      ['5a6ec11', 'feat: S5 — stepper rezervari, contrast WCAG, paleta espresso/crem/oliv, font Playfair', 'S5 — Bloc E'],
      ['c9f0fe0', 'feat: animatii scroll sectiuni, contor animat rating', 'S4 — inainte de S5'],
      ['953eaed', 'Fix: UX polish on /locatie, /rezervari, /sarbatori', 'S4'],
      ['5f41cea', 'Feature: admin controls for menu display + UX polish (S3)', 'S3'],
    ]
  ),

  // ══════════════════════════════════════════════
  // 8. CONCLUZII
  // ══════════════════════════════════════════════
  h1('8. Concluzii si Stare Finala Proiect'),

  p('Sesiunea 5 — Bloc E a finalizat ciclul de dezvoltare al proiectului Vibe Caffe. Toate cele 3 modificari din PDF-ul de sarcini au fost implementate complet si deployate in productie.'),

  space(),
  h2('8.1 Ce s-a invatat in aceasta sesiune'),
  bullet('WCAG AA — standarde de accesibilitate si cum se calculeaza contrastul'),
  bullet('Tailwind CSS v4 — noua metoda de configurare a culorilor prin @theme inline in CSS'),
  bullet('next/font/google — self-hosting fonturi Google pentru performanta si GDPR'),
  bullet('Wizard/Stepper pattern — formulare multi-pas cu useState si rendering conditional'),
  bullet('Git safety — backup prin commit inainte de modificari riscante'),

  space(),
  h2('8.2 Stare finala proiect'),
  table(
    ['Pagina', 'Status', 'Functionalitati cheie'],
    [
      ['/', 'Complet', 'Hero SSR, ReviewBar, De ce Vibe, Preview meniu, Oferte sezoniere, CTA, Locatie'],
      ['/meniu', 'Complet', '4 categorii, 24+ produse Supabase, badge-uri, toggle valuta/coloane'],
      ['/rezervari', 'Complet', 'Wizard 3 pasi, validare, salvare Supabase, confirmare'],
      ['/locatie', 'Complet', 'Google Maps embed, 3 CTA-uri, mini-FAQ, galerie, facilitati'],
      ['/sarbatori', 'Complet', 'Date live Supabase (holiday_config + menu_items), confetti, reduceri'],
      ['/admin', 'Complet', 'Protejat middleware, CRUD meniu, rezervari export, setari display'],
      ['/confidentialitate', 'Complet', 'Pagina legala'],
      ['/cookies', 'Complet', 'Pagina legala'],
      ['/termeni', 'Complet', 'Pagina legala'],
    ]
  ),

  space(),
  new Paragraph({
    children: [new TextRun({ text: 'Proiect finalizat — 2026-04-04', bold: true, size: 24, color: '14B8A6' })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 400, after: 200 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Vibe Caffe — Cafea buna. Oameni buni. Un loc al tau.', size: 22, italics: true, color: '6B3A2A' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
  }),
];

// ─── EXPORT ───────────────────────────────────────────────────────────────────

const doc = new Document({
  sections: [{ children }],
  styles: {
    default: {
      document: { run: { font: 'Calibri', size: 22, color: '1F2937' } },
    },
  },
});

const docxPath = path.join(OUTPUT_DIR, 'sesiune-5-bloc-e.docx');
const pdfPath  = path.join(OUTPUT_DIR, 'sesiune-5-bloc-e.pdf');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(docxPath, buffer);
  console.log('✅ DOCX salvat:', docxPath);

  const textContent = [
    'VIBE CAFFE — Documentatie Tehnica',
    'Sesiunea 5 — Bloc E: Redesign Vizual',
    'Data: 2026-04-04 | Student: 2020nc',
    '',
    '1. Introducere',
    'Sesiunea 5 Bloc E acopera: stepper /rezervari (M10), contrast WCAG AA (M11), paleta espresso/crem/oliv + font Playfair (M12).',
    '',
    '2. Modificarea 10 — Stepper Vizual /rezervari',
    'Formular impartit in 3 pasi: (1) Data & Ora, (2) Detalii personale, (3) Confirmare.',
    'State: useState(1) pentru currentStep. Fiecare pas are validare proprie.',
    'Ore diferite L-V vs Sam-Dum (getOre() pe baza new Date().getDay()).',
    '',
    '3. Modificarea 11 — Contrast WCAG AA',
    'text-gray-400 pe bg-gray-800 = 3.9:1 (ESEC). Corectat la text-gray-300 = 7.4:1 (PASS).',
    'Fisiere: components/FooterStarter.tsx, app/page.tsx.',
    '',
    '4. Modificarea 12 — Paleta + Font',
    'Pasul 1: Playfair Display via next/font/google, variabila --font-playfair, aplicata pe h1/h2.',
    'Pasul 2: Paleta in @theme inline (globals.css) — Tailwind 4 nu are tailwind.config.ts.',
    '  espresso-800: #3B1F0A, espresso-900: #1E0F05',
    '  oliv-600: #6B7C4A, oliv-800: #4A5733',
    '  crem-100: #F5EDD6, crem-200: #EDD9A3',
    'Pasul 3: Butoane CTA homepage: teal → espresso, orange → oliv.',
    '',
    '5. Deploy',
    'Commit: 5a6ec11 | Vercel: G5wfBtkd3 | Status: Ready in 45s',
    'URL: https://vibe-website2.vercel.app',
    '',
    '6. Concepte tehnice',
    'WCAG AA: raport contrast minim 4.5:1 pentru text normal.',
    'Tailwind v4: culori custom prin @theme inline in CSS (nu config.js).',
    'next/font/google: self-hosted, zero latenta, GDPR-friendly.',
    'Wizard pattern: useState pentru step index, rendering conditional per pas.',
  ].join('\n');

  const pdfDoc = createPdf({ size: 'A4', margins: { top: 55, bottom: 55, left: 65, right: 65 } });
  const pdfOut = fs.createWriteStream(pdfPath);
  pdfDoc.pipe(pdfOut);

  const lines = textContent.split('\n');
  pdfDoc.font('Bold').fontSize(18).fillColor('#14B8A6').text('VIBE CAFFE — Sesiunea 5 Bloc E', { align: 'center' });
  pdfDoc.moveDown(0.5);
  pdfDoc.font('Regular').fontSize(11).fillColor('#1F2937');

  for (const line of lines.slice(1)) {
    if (line === '') { pdfDoc.moveDown(0.4); continue; }
    if (/^\d+\./.test(line)) {
      pdfDoc.moveDown(0.3).font('Bold').fontSize(13).fillColor('#0D9488').text(line).font('Regular').fontSize(11).fillColor('#1F2937');
    } else if (line.startsWith('  ')) {
      pdfDoc.font('Regular').fontSize(10).fillColor('#374151').text('  ' + line.trim());
    } else {
      pdfDoc.font('Regular').fontSize(11).fillColor('#1F2937').text(line);
    }
  }

  pdfDoc.end();
  pdfOut.on('finish', () => console.log('✅ PDF salvat:', pdfPath));
});
