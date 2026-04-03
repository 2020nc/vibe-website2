/**
 * Generează rezumat profesionist complet al proiectului Vibe Caffè
 * Output: docs/rezumat-proiect.docx + .pdf
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, BorderStyle, Table, TableRow,
  TableCell, WidthType, VerticalAlign
} from 'docx';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { createPdf } = require('C:/Users/Admin/.claude/pdf-utils/createPdf.js');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, '../docs');

const DATE = '2026-04-03';

// ─── HELPERS ───────────────────────────────────────────────────────────────────

function h1(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
  });
}

function h2(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 150 },
  });
}

function h3(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
  });
}

function p(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22 })],
    spacing: { after: 120 },
  });
}

function bullet(text) {
  return new Paragraph({
    children: [new TextRun({ text: `• ${text}`, size: 22 })],
    spacing: { after: 80 },
    indent: { left: 400 },
  });
}

function bold(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 22 })],
    spacing: { after: 100 },
  });
}

function divider() {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '14B8A6' } },
    spacing: { after: 200 },
  });
}

function tableRow(label, value) {
  return new TableRow({
    children: [
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: label, bold: true, size: 20 })] })],
        width: { size: 30, type: WidthType.PERCENTAGE },
        verticalAlign: VerticalAlign.CENTER,
      }),
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: value, size: 20 })] })],
        width: { size: 70, type: WidthType.PERCENTAGE },
        verticalAlign: VerticalAlign.CENTER,
      }),
    ],
  });
}

// ─── DOCUMENT ──────────────────────────────────────────────────────────────────

const children = [

  // TITLU
  new Paragraph({
    children: [new TextRun({ text: 'VIBE CAFFÈ', bold: true, size: 52, color: '14B8A6' })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 100 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Rezumat Profesionist al Proiectului', bold: true, size: 32, color: '1F2937' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
  }),
  new Paragraph({
    children: [new TextRun({ text: `Vibe Coding — Proiect 01 | ${DATE}`, size: 22, color: '6B7280' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
  }),
  divider(),

  // 1. PREZENTARE GENERALĂ
  h1('1. Prezentare Generală'),
  p('Vibe Caffè Website este un proiect web complet, realizat în cadrul cursului Vibe Coding, ce reprezintă site-ul oficial al unei cafenele de specialitate din București. Proiectul a fost construit de la zero folosind Next.js 15, TypeScript și Tailwind CSS, cu integrare Supabase pentru date în timp real.'),
  p('Site-ul este publicat pe Vercel și accesibil la adresa: vibe-website2.vercel.app'),
  divider(),

  // 2. STACK TEHNIC
  h1('2. Stack Tehnic'),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      tableRow('Framework', 'Next.js 15 (App Router)'),
      tableRow('Limbaj', 'TypeScript 5 (strict mode)'),
      tableRow('UI', 'React 19 + Tailwind CSS 4'),
      tableRow('Bază de date', 'Supabase (PostgreSQL)'),
      tableRow('Hosting', 'Vercel (auto-deploy din GitHub)'),
      tableRow('Font-uri', 'Plus Jakarta Sans + Inter'),
      tableRow('Animații scroll', 'Lenis Smooth Scroll'),
    ],
  }),
  new Paragraph({ spacing: { after: 200 } }),
  divider(),

  // 3. PAGINI ȘI FUNCȚIONALITĂȚI
  h1('3. Pagini și Funcționalități'),

  h2('3.1 Homepage (/)'),
  bullet('Hero section cu titlu, subtitlu și butoane CTA'),
  bullet('Secțiunea "De ce Vibe?" — 4 carduri cu diferențiatori'),
  bullet('Preview meniu — 6 produse cu prețuri'),
  bullet('Oferte sezoniere — 3 produse cu descrieri'),
  bullet('Secțiunea locație cu program și telefon'),
  bullet('JSON-LD LocalBusiness pentru SEO'),
  new Paragraph({ spacing: { after: 100 } }),

  h2('3.2 Meniu (/meniu)'),
  bullet('Meniu complet cu categorii: Espresso, Specialty, Vegan, Cold, Alternative, Pastry'),
  bullet('Filtrare pe categorii în timp real (client-side)'),
  bullet('Prețuri și descrieri pentru fiecare produs'),
  bullet('OpenGraph metadata pentru partajare socială'),
  new Paragraph({ spacing: { after: 100 } }),

  h2('3.3 Rezervări (/rezervari)'),
  bullet('Formular de rezervare conectat la Supabase'),
  bullet('Câmpuri: nume, telefon, dată, oră, număr persoane, mesaj'),
  bullet('Validare input și mesaj de succes personalizat'),
  bullet('Caseta informativă cu reguli (program, confirmare, anulare)'),
  bullet('Metadata SEO dedicată'),
  new Paragraph({ spacing: { after: 100 } }),

  h2('3.4 Locație (/locatie)'),
  bullet('Adresă completă: Bld. Regina Elisabeta 30, Sector 5, București'),
  bullet('Program detaliat (Luni–Vineri și Weekend)'),
  bullet('Link Google Maps'),
  bullet('JSON-LD LocalBusiness + OpenGraph'),
  new Paragraph({ spacing: { after: 100 } }),

  h2('3.5 Oferte Sezoniere (/sarbatori)'),
  bullet('Pagina dedicată ofertelor sezoniere și de sărbători'),
  bullet('Produse disponibile cu prețuri și perioade de disponibilitate'),
  bullet('Link în footer și preview pe homepage'),
  new Paragraph({ spacing: { after: 100 } }),

  h2('3.6 Pagini Legale'),
  bullet('/confidentialitate — Politică de confidențialitate'),
  bullet('/cookies — Politică cookies'),
  bullet('/termeni — Termeni și condiții'),
  new Paragraph({ spacing: { after: 100 } }),

  h2('3.7 Panou Admin (/admin)'),
  bullet('Autentificare securizată cu parolă (SHA-256 + cookie httpOnly)'),
  bullet('Gestionare rezervări: vizualizare, confirmare, anulare'),
  bullet('Gestionare meniu: adăugare, editare, ștergere produse'),
  bullet('Gestionare oferte sezoniere'),
  bullet('Tab Setări: schimbare parolă admin din panou'),
  bullet('Protecție middleware Next.js pe toate rutele /admin'),
  new Paragraph({ spacing: { after: 100 } }),

  h2('3.8 Barista Bot (ChatWidget)'),
  bullet('Asistent virtual integrat în toate paginile'),
  bullet('Răspunde la întrebări despre meniu, program, locație'),
  bullet('Knowledge base actualizat cu datele reale ale cafenelei'),
  new Paragraph({ spacing: { after: 100 } }),
  divider(),

  // 4. BAZA DE DATE
  h1('4. Baza de Date Supabase'),
  h2('Tabele principale:'),
  bullet('rezervari — Stochează rezervările clienților'),
  bullet('menu_items — Produsele din meniu cu prețuri și categorii'),
  bullet('seasonal_items — Ofertele sezoniere'),
  bullet('newsletter_subscribers — Abonații la newsletter'),
  bullet('admin_config — Configurări admin (hash parolă)'),
  divider(),

  // 5. SEO
  h1('5. SEO și Performanță'),
  bullet('Metadata completă pentru toate paginile (title, description)'),
  bullet('OpenGraph pe homepage, /meniu, /locatie, /sarbatori'),
  bullet('JSON-LD schema CafeOrCoffeeShop pe homepage și /locatie'),
  bullet('Title template global: "[Pagina] | Vibe Caffè"'),
  bullet('metadataBase configurat pentru URL-uri absolute'),
  bullet('robots.txt — permite indexarea paginilor publice, blochează /admin'),
  bullet('Sitemap generat automat de Next.js'),
  bullet('SSR (Server Side Rendering) pentru toate paginile publice'),
  divider(),

  // 6. SECURITATE
  h1('6. Securitate'),
  bullet('Autentificare admin: SHA-256 hash stocată în Supabase'),
  bullet('Cookie httpOnly, Secure, SameSite=Lax (8 ore valabilitate)'),
  bullet('Middleware Next.js: validare format token pe toate rutele /admin'),
  bullet('Schimbare parolă: verifică parola veche înainte de actualizare'),
  bullet('Variabile de mediu în .env.local (niciodată în git)'),
  divider(),

  // 7. STRUCTURA FIȘIERE
  h1('7. Structura Proiectului'),
  bold('app/ — Paginile Next.js (App Router)'),
  bullet('page.tsx — Homepage'),
  bullet('meniu/page.tsx — Pagina meniu'),
  bullet('rezervari/page.tsx — Pagina rezervări'),
  bullet('locatie/page.tsx — Pagina locație'),
  bullet('sarbatori/page.tsx — Oferte sezoniere'),
  bullet('admin/page.tsx — Panou administrare'),
  bullet('api/ — API Routes (rezervări, meniu, admin, newsletter, chat)'),
  bullet('confidentialitate/, cookies/, termeni/ — Pagini legale'),
  new Paragraph({ spacing: { after: 100 } }),
  bold('components/ — Componente reutilizabile'),
  bullet('Navigation.tsx — Navbar sticky cu active tracking'),
  bullet('FooterStarter.tsx — Footer cu newsletter și social media'),
  bullet('HeroStarter.tsx — Hero section SSR'),
  bullet('ChatWidget.tsx — Barista Bot'),
  bullet('Preloader.tsx — Animație de încărcare'),
  new Paragraph({ spacing: { after: 100 } }),
  bold('lib/ — Logică și date'),
  bullet('supabase.ts — Client Supabase'),
  bullet('knowledge-base.ts — Date pentru ChatWidget'),
  bullet('hooks/useScrollAnimation.ts — Intersection Observer'),
  new Paragraph({ spacing: { after: 100 } }),
  divider(),

  // 8. ETAPELE DEZVOLTĂRII
  h1('8. Etapele Dezvoltării'),
  h2('Sprint 1 — Fundație'),
  bullet('Setup Next.js 15 + Tailwind CSS 4 + TypeScript'),
  bullet('Design system: culori, tipografie, CSS variables'),
  bullet('Homepage cu Hero, Features, Menu preview, Footer'),
  new Paragraph({ spacing: { after: 100 } }),

  h2('Sprint 2 — Homepage indexabil SSR'),
  bullet('Conținut real SSR (nu client-side)'),
  bullet('Secțiuni: De ce Vibe?, Preview meniu, Locație rapidă'),
  new Paragraph({ spacing: { after: 100 } }),

  h2('Sprint 3 — Pagina /meniu'),
  bullet('Meniu complet cu categorii și prețuri'),
  bullet('Filtrare client-side pe categorii'),
  new Paragraph({ spacing: { after: 100 } }),

  h2('Sprint 4 — Oferte sezoniere'),
  bullet('Pagina /sarbatori cu produse sezoniere'),
  bullet('Preview pe homepage'),
  new Paragraph({ spacing: { after: 100 } }),

  h2('Sprint 5 — Locație și rezervări'),
  bullet('Pagina /locatie cu toate informațiile'),
  bullet('Formular rezervări cu Supabase'),
  new Paragraph({ spacing: { after: 100 } }),

  h2('Sprint 6 — Navigare și UX'),
  bullet('Link "De ce Vibe?" în navbar cu scroll smooth'),
  bullet('Active tracking pe toate linkurile navbar'),
  new Paragraph({ spacing: { after: 100 } }),

  h2('Sprint 7 — Pagini legale + robots.txt'),
  bullet('Confidențialitate, Cookies, Termeni'),
  bullet('robots.txt configurat corect'),
  new Paragraph({ spacing: { after: 100 } }),

  h2('Modulul 4 (Optimizare) — P1–P7'),
  bullet('P1: Admin panel — protecție, login curat, navbar ascuns'),
  bullet('P2: Brand unificat "Vibe Caffè" în toate componentele'),
  bullet('P3: Metadata globală, title template, metadataBase'),
  bullet('P4: Rezervări — metadata SEO, caseta reguli, mesaj succes'),
  bullet('P5: /sarbatori completă + footer link + preview homepage'),
  bullet('P6: OpenGraph /meniu și /locatie, JSON-LD pe /locatie'),
  bullet('P7: Audit homepage — eliminat import neutilizat'),
  bullet('Extra: Schimbare parolă admin din panou (fără email)'),
  divider(),

  // 9. CONCLUZIE
  h1('9. Concluzie'),
  p('Proiectul Vibe Caffè reprezintă un site web complet, modern și funcțional pentru o cafenea de specialitate. Acoperă toate aspectele unui produs web real: design responsive, SEO tehnic, autentificare securizată, bază de date în timp real, panou de administrare și asistent virtual.'),
  p('Proiectul a fost realizat integral prin Vibe Coding — proces iterativ de dezvoltare colaborativă între utilizator și Claude AI, în sesiuni structurate pe sprinturi.'),
  new Paragraph({ spacing: { after: 100 } }),
  new Paragraph({
    children: [new TextRun({ text: `Generat automat • ${DATE} • Vibe Coding Proiect 01`, size: 18, color: '9CA3AF', italics: true })],
    alignment: AlignmentType.CENTER,
  }),
];

// ─── GENERARE ──────────────────────────────────────────────────────────────────

const doc = new Document({
  sections: [{ children }],
  styles: {
    paragraphStyles: [
      {
        id: 'Heading1',
        name: 'Heading 1',
        run: { bold: true, size: 32, color: '14B8A6' },
        paragraph: { spacing: { before: 400, after: 200 } },
      },
      {
        id: 'Heading2',
        name: 'Heading 2',
        run: { bold: true, size: 26, color: '1F2937' },
        paragraph: { spacing: { before: 300, after: 150 } },
      },
      {
        id: 'Heading3',
        name: 'Heading 3',
        run: { bold: true, size: 24, color: '374151' },
        paragraph: { spacing: { before: 200, after: 100 } },
      },
    ],
  },
});

const docxPath = path.join(OUTPUT_DIR, 'rezumat-proiect.docx');
const pdfPath = path.join(OUTPUT_DIR, 'rezumat-proiect.pdf');

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(docxPath, buffer);
console.log(`✅ DOCX salvat: ${docxPath}`);

// ─── PDF cu PDFKit ────────────────────────────────────────────────────────────
async function genPdf(outPath) {
  const pdf = createPdf({ size: 'A4', margins: { top: 50, bottom: 50, left: 60, right: 60 } });
  const out = fs.createWriteStream(outPath);
  pdf.pipe(out);

  const W = 480;

  // Titlu
  pdf.moveDown(2);
  pdf.font('Bold').fontSize(24).fillColor('#14B8A6').text('VIBE CAFFÈ', { align: 'center' });
  pdf.moveDown(0.4);
  pdf.font('Bold').fontSize(14).fillColor('#1F2937').text('Rezumat Profesionist al Proiectului', { align: 'center' });
  pdf.moveDown(0.3);
  pdf.font('Regular').fontSize(10).fillColor('#6B7280').text(`Vibe Coding — Proiect 01 | ${DATE}`, { align: 'center' });
  pdf.moveDown(1);
  pdf.moveTo(60, pdf.y).lineTo(540, pdf.y).strokeColor('#14B8A6').lineWidth(1.5).stroke();
  pdf.moveDown(1);

  function h1pdf(t) {
    pdf.moveDown(0.8);
    pdf.font('Bold').fontSize(14).fillColor('#14B8A6').text(t);
    pdf.moveDown(0.2);
    pdf.moveTo(60, pdf.y).lineTo(540, pdf.y).strokeColor('#14B8A6').lineWidth(0.5).stroke();
    pdf.moveDown(0.4);
  }
  function h2pdf(t) {
    pdf.moveDown(0.5);
    pdf.font('Bold').fontSize(11).fillColor('#1F2937').text(t);
    pdf.moveDown(0.2);
  }
  function ppdf(t) {
    pdf.font('Regular').fontSize(10).fillColor('#374151').text(t, { width: W });
    pdf.moveDown(0.3);
  }
  function bpdf(t) {
    pdf.font('Regular').fontSize(10).fillColor('#374151').text(`• ${t}`, { indent: 15, width: W });
    pdf.moveDown(0.15);
  }
  function trow(label, value) {
    const y = pdf.y;
    pdf.font('Bold').fontSize(9).fillColor('#1F2937').text(label, 60, y, { width: 140 });
    pdf.font('Regular').fontSize(9).fillColor('#374151').text(value, 210, y, { width: 330 });
    pdf.moveDown(0.5);
  }

  // 1. Prezentare generală
  h1pdf('1. Prezentare Generală');
  ppdf('Vibe Caffè Website este un proiect web complet, realizat în cadrul cursului Vibe Coding, ce reprezintă site-ul oficial al unei cafenele de specialitate din București. Proiectul a fost construit de la zero folosind Next.js 15, TypeScript și Tailwind CSS, cu integrare Supabase pentru date în timp real.');
  ppdf('Site-ul este publicat pe Vercel: vibe-website2.vercel.app');

  // 2. Stack tehnic
  h1pdf('2. Stack Tehnic');
  trow('Framework', 'Next.js 15 (App Router)');
  trow('Limbaj', 'TypeScript 5 (strict mode)');
  trow('UI', 'React 19 + Tailwind CSS 4');
  trow('Bază de date', 'Supabase (PostgreSQL)');
  trow('Hosting', 'Vercel (auto-deploy din GitHub)');
  trow('Font-uri', 'Plus Jakarta Sans + Inter');

  // 3. Pagini
  h1pdf('3. Pagini și Funcționalități');
  h2pdf('3.1 Homepage (/)');
  bpdf('Hero section cu titlu, subtitlu și butoane CTA');
  bpdf('Secțiunea "De ce Vibe?" — 4 carduri cu diferențiatori');
  bpdf('Preview meniu — 6 produse cu prețuri');
  bpdf('Oferte sezoniere — 3 produse cu descrieri');
  bpdf('JSON-LD LocalBusiness pentru SEO');
  h2pdf('3.2 Meniu (/meniu)');
  bpdf('Meniu complet cu categorii: Espresso, Specialty, Vegan, Cold, Alternative, Pastry');
  bpdf('Filtrare pe categorii în timp real (client-side)');
  bpdf('OpenGraph metadata pentru partajare socială');
  h2pdf('3.3 Rezervări (/rezervari)');
  bpdf('Formular de rezervare conectat la Supabase');
  bpdf('Validare input și mesaj de succes personalizat');
  bpdf('Caseta informativă cu reguli (program, confirmare, anulare)');
  h2pdf('3.4 Locație (/locatie)');
  bpdf('Adresă, program, link Google Maps, JSON-LD + OpenGraph');
  h2pdf('3.5 Oferte Sezoniere (/sarbatori)');
  bpdf('Produse cu prețuri și perioade de disponibilitate');
  bpdf('Link în footer și preview pe homepage');
  h2pdf('3.6 Pagini Legale');
  bpdf('/confidentialitate, /cookies, /termeni');
  h2pdf('3.7 Panou Admin (/admin)');
  bpdf('Autentificare securizată (SHA-256 + cookie httpOnly)');
  bpdf('Gestionare rezervări, meniu, oferte sezoniere');
  bpdf('Tab Setări: schimbare parolă admin din panou');
  bpdf('Protecție middleware Next.js pe toate rutele /admin');
  h2pdf('3.8 Barista Bot (ChatWidget)');
  bpdf('Asistent virtual integrat, răspunde la întrebări despre meniu și locație');

  // 4. Baza de date
  pdf.addPage();
  h1pdf('4. Baza de Date Supabase');
  bpdf('rezervari — Stochează rezervările clienților');
  bpdf('menu_items — Produsele din meniu cu prețuri și categorii');
  bpdf('seasonal_items — Ofertele sezoniere');
  bpdf('newsletter_subscribers — Abonații la newsletter');
  bpdf('admin_config — Configurări admin (hash parolă)');

  // 5. SEO
  h1pdf('5. SEO și Performanță');
  bpdf('Metadata completă pentru toate paginile (title, description)');
  bpdf('OpenGraph pe homepage, /meniu, /locatie, /sarbatori');
  bpdf('JSON-LD schema CafeOrCoffeeShop pe homepage și /locatie');
  bpdf('Title template global: "[Pagina] | Vibe Caffè"');
  bpdf('robots.txt — permite indexarea paginilor publice, blochează /admin');
  bpdf('SSR (Server Side Rendering) pentru toate paginile publice');

  // 6. Securitate
  h1pdf('6. Securitate');
  bpdf('Autentificare admin: SHA-256 hash stocată în Supabase');
  bpdf('Cookie httpOnly, Secure, SameSite=Lax (8 ore valabilitate)');
  bpdf('Middleware Next.js: validare format token pe toate rutele /admin');
  bpdf('Schimbare parolă: verifică parola veche înainte de actualizare');
  bpdf('Variabile de mediu în .env.local (niciodată în git)');

  // 7. Etape
  h1pdf('7. Etapele Dezvoltării');
  h2pdf('Sprint 1–7 — Construirea site-ului');
  bpdf('Sprint 1: Fundație — design system, homepage inițial');
  bpdf('Sprint 2: Homepage SSR cu conținut real');
  bpdf('Sprint 3: Pagina /meniu cu filtrare pe categorii');
  bpdf('Sprint 4: Oferte sezoniere /sarbatori');
  bpdf('Sprint 5: Locație și formular rezervări');
  bpdf('Sprint 6: Navigare îmbunătățită cu active tracking');
  bpdf('Sprint 7: Pagini legale + robots.txt');
  h2pdf('Modulul 4 — Optimizare (P1–P7 + Extra)');
  bpdf('P1: Admin panel securizat — protecție, login, navbar ascuns');
  bpdf('P2: Brand unificat "Vibe Caffè" în toate componentele');
  bpdf('P3: Metadata globală, title template, metadataBase');
  bpdf('P4: Rezervări — SEO, caseta reguli, mesaj succes');
  bpdf('P5: /sarbatori completă + footer link + preview homepage');
  bpdf('P6: OpenGraph /meniu și /locatie, JSON-LD /locatie');
  bpdf('P7: Audit homepage — eliminat import neutilizat');
  bpdf('Extra: Schimbare parolă admin din panou (fără email recovery)');

  // 8. Concluzie
  h1pdf('8. Concluzie');
  ppdf('Proiectul Vibe Caffè reprezintă un site web complet, modern și funcțional pentru o cafenea de specialitate. Acoperă toate aspectele unui produs web real: design responsive, SEO tehnic, autentificare securizată, bază de date în timp real, panou de administrare și asistent virtual.');
  ppdf('Proiectul a fost realizat integral prin Vibe Coding — proces iterativ de dezvoltare colaborativă între utilizator și Claude AI, în sesiuni structurate pe sprinturi.');

  pdf.moveDown(2);
  pdf.font('Italic').fontSize(9).fillColor('#9CA3AF').text(`Generat automat • ${DATE} • Vibe Coding Proiect 01`, { align: 'center' });

  pdf.end();
  await new Promise((res, rej) => { out.on('finish', res); out.on('error', rej); });
}

await genPdf(pdfPath);
console.log(`✅ PDF salvat: ${pdfPath}`);
console.log('\n🎉 Rezumat profesionist generat!');
