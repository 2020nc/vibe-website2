/**
 * Generează rezumat sesiune 2026-04-03 → DOCX + PDF
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, BorderStyle, ShadingType, TableCell,
  TableRow, Table, WidthType
} from 'docx';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { createPdf } = require('C:/Users/Admin/.claude/pdf-utils/createPdf.js');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, '../docs/sesiuni');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const DATE = '2026-04-03';
const TITLU = `Rezumat Sesiune — ${DATE}`;
const SUBTITLU = 'Proiect Vibe Caffè Website2 — 7 Sprinturi de Optimizare';

// ─── Conținut ────────────────────────────────────────────────────────────────

const INTRO = `În această sesiune am parcurs un PDF cu 28 de comenzi grupate în 7 sprinturi, fiecare sprint adăugând o funcționalitate sau îmbunătățire importantă proiectului Vibe Caffè. Toate modificările au fost deployate pe Vercel și verificate live.`;

const SPRINTURI = [
  {
    nr: 1,
    titlu: 'Protecție Admin cu Middleware',
    commit: 'dc05dc4',
    ce: 'Am creat un sistem de autentificare pentru panoul de administrare.',
    cum: [
      'middleware.ts — interceptează toate cererile către /admin și /admin/:path* și verifică dacă există cookie-ul admin_token',
      'app/admin/login/page.tsx — formular de login cu câmp parolă',
      'app/api/admin/login/route.ts — API care verifică parola și setează un cookie httpOnly (mai sigur decât localStorage)',
      '.env.local — variabila ADMIN_SECRET=vibe2026admin, setată și pe Vercel',
      'Fix important: matcher-ul middleware a fost corectat din [\'/admin/:path*\'] în [\'/admin\', \'/admin/:path*\'] pentru a prinde și ruta exactă /admin',
    ],
    rezultat: 'Accesând /admin fără autentificare, utilizatorul este redirecționat automat la /admin/login. Verificat în browser Incognito.',
  },
  {
    nr: 2,
    titlu: 'Homepage SSR + Footer Linkuri Legale',
    commit: '3d7d565',
    ce: 'Am transformat homepage-ul dintr-o pagină client-side într-una server-side rendered (SSR) și am adăugat linkuri legale în footer.',
    cum: [
      'app/page.tsx convertit din "use client" în server component — conținutul apare în HTML fără JavaScript',
      'Adăugat export metadata cu titlu, descriere și OpenGraph (pentru SEO și preview-uri pe social media)',
      'Secțiune Hero SSR cu 2 butoane CTA (Meniu, Rezervă)',
      'Secțiune "De ce Vibe?" cu 4 carduri (id="de-ce-vibe") — cafea specialty, work-friendly, brunch, locație',
      'Preview meniu SSR — 6 produse cu prețuri vizibile fără JS',
      'Oferte sezoniere SSR — 3 carduri cu link spre /sarbatori',
      'Locație rapidă SSR — adresă, program, telefon, link Google Maps',
      'JSON-LD LocalBusiness — date structurate pentru Google (schema.org)',
      'FooterStarter.tsx — adăugate linkuri: Politică confidențialitate, Cookies, Termeni, Contact email',
    ],
    rezultat: 'Homepage vizibil complet cu JavaScript dezactivat în browser. Conținut indexabil de motoare de căutare.',
  },
  {
    nr: 3,
    titlu: 'Curățare Pagină /rezervari',
    commit: '7901c1c',
    ce: 'Am eliminat elementele administrative din pagina de rezervări, lăsând doar formularul pentru clienți.',
    cum: [
      'Eliminat: state-ul "rezervari", funcția fetchRezervari, useEffect-ul aferent',
      'Eliminat: secțiunea "Toate rezervările" cu lista, statusuri, butoane export Excel/PDF și bulk actions',
      'Păstrat: formularul de rezervare pentru clienți (dată, oră, detalii)',
    ],
    rezultat: 'Pagina /rezervari arată curat, doar cu formularul relevant pentru client. Funcțiile administrative există doar în /admin.',
  },
  {
    nr: 4,
    titlu: 'Pagini /meniu și /sarbatori',
    commit: '44ebd3b',
    ce: 'Am creat două pagini dedicate pentru meniu complet și oferte sezoniere.',
    cum: [
      'app/meniu/page.tsx — server component cu 4 categorii: Cafea & Băuturi (10 produse), Brunch (5), Deserturi & Patiserie (6), Sezonier (3)',
      'Taguri vizuale: "Bestseller" (portocaliu) și "Sezonier" (teal) pe produsele relevante',
      'app/sarbatori/page.tsx — 4 carduri cu oferte: Brunch Festiv (36 lei), Coffee Tonic (22 lei), Latte Lavandă (20 lei), Pachet Cadou (80 lei)',
      'Fiecare card are CTA propriu: Rezervă loc, Vezi meniul, Comandă acum, Contactează-ne',
      'Ambele pagini au metadata cu titluri optimizate pentru SEO',
    ],
    rezultat: 'Utilizatorii pot vedea meniul complet cu prețuri la /meniu și ofertele curente la /sarbatori.',
  },
  {
    nr: 5,
    titlu: 'Îmbunătățiri Pagina /locatie',
    commit: '5a06f8e',
    ce: 'Am adăugat metadata SEO, butoane CTA grupate și un mini-FAQ pe pagina de locație.',
    cum: [
      'export metadata cu title: "Locație & Program | Vibe Caffè București" — apare în tab browser și în Google',
      '3 butoane CTA grupate după informațiile de contact: "Deschide în Google Maps" (teal), "Sună acum" (negru), "Rezervă masă" (portocaliu)',
      'Mini-FAQ cu 3 întrebări frecvente: necesitatea rezervării, parcare disponibilă, intervale aglomerate',
    ],
    rezultat: 'Pagina /locatie are title corect în tab, harta Google Maps funcționează cu adresa corectă, cele 3 CTA-uri vizibile.',
  },
  {
    nr: 6,
    titlu: 'Link "De ce Vibe?" în Navbar',
    commit: 'd4f86ac',
    ce: 'Am adăugat un link vizibil în navbar care duce la secțiunea "De ce Vibe?" de pe homepage.',
    cum: [
      'Navigation.tsx — adăugat "de-ce-vibe" în NAV_SECTIONS pentru Intersection Observer (active tracking)',
      'Adăugat link vizibil "De ce Vibe?" cu href="/#de-ce-vibe" între Meniu și Locație',
      'Link-ul se evidențiază în teal când utilizatorul scrollează pe secțiunea respectivă',
      'FooterStarter.tsx — actualizat /#features → /#de-ce-vibe pentru consistență',
    ],
    rezultat: 'Navbar afișează "De ce Vibe?" ca link funcțional cu scroll smooth și active state la scroll.',
  },
  {
    nr: 7,
    titlu: 'Pagini Legale + robots.txt',
    commit: '4b38faf',
    ce: 'Am creat trei pagini legale obligatorii și fișierul robots.txt pentru motoarele de căutare.',
    cum: [
      'app/confidentialitate/page.tsx — Politică GDPR: cine suntem, date colectate, utilizare, drepturi utilizator, retenție, contact',
      'app/cookies/page.tsx — 3 categorii cookies: strict necesare, preferințe, analitice (Vercel Analytics)',
      'app/termeni/page.tsx — Termeni rezervări (anulare, grup >8 persoane), prețuri, utilizare site, legislație română',
      'public/robots.txt — Allow: /, Disallow: /admin și /api/, Sitemap declarat',
      'Toate paginile au metadata SEO și link "Înapoi la homepage"',
    ],
    rezultat: 'Site-ul are acoperire legală completă. robots.txt protejează /admin de indexare. Footer-ul leagă corect spre toate paginile.',
  },
];

const CONCLUZII = [
  'Securitate: panoul admin este protejat prin middleware Next.js cu cookie httpOnly — nu poate fi accesat fără parolă',
  'SEO: homepage SSR, metadata pe toate paginile, JSON-LD LocalBusiness, robots.txt — site-ul este indexabil corect',
  'UX: meniu complet cu prețuri, oferte sezoniere, locație cu hartă și CTA-uri clare, pagini legale accesibile',
  'Arhitectură: paginile de conținut sunt server components (SSR) — performanță mai bună, indexare mai ușoară',
  'Toate cele 7 sprinturi (28 comenzi) au fost deployate pe Vercel și verificate live',
];

// ─── DOCX ────────────────────────────────────────────────────────────────────

async function genDocx(outPath) {
  const children = [];

  const p = (text, opts = {}) => new Paragraph({
    children: [new TextRun({ text, font: 'DejaVu Sans', size: 22, ...opts })],
    spacing: { after: 120 },
    ...opts._p,
  });

  const h1 = (text) => new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
  });

  const h2 = (text) => new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 150 },
  });

  const bullet = (text) => new Paragraph({
    children: [new TextRun({ text, font: 'DejaVu Sans', size: 20, color: '374151' })],
    bullet: { level: 0 },
    spacing: { after: 80 },
  });

  const sep = () => new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: 'E5E7EB' } },
    spacing: { before: 200, after: 200 },
  });

  // Titlu
  children.push(new Paragraph({
    children: [new TextRun({ text: TITLU, bold: true, size: 36, font: 'DejaVu Sans', color: '111827' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
  }));
  children.push(new Paragraph({
    children: [new TextRun({ text: SUBTITLU, size: 24, font: 'DejaVu Sans', color: '6B7280' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
  }));

  // Intro
  children.push(h1('Introducere'));
  children.push(p(INTRO));
  children.push(sep());

  // Sprinturi
  children.push(h1('Sprinturi'));

  for (const s of SPRINTURI) {
    children.push(h2(`Sprint ${s.nr} — ${s.titlu}`));
    children.push(new Paragraph({
      children: [new TextRun({ text: `Commit: ${s.commit}`, font: 'Courier New', size: 18, color: '6B7280' })],
      spacing: { after: 100 },
    }));
    children.push(new Paragraph({
      children: [new TextRun({ text: 'Ce am făcut: ', bold: true, font: 'DejaVu Sans', size: 20 }), new TextRun({ text: s.ce, font: 'DejaVu Sans', size: 20 })],
      spacing: { after: 100 },
    }));
    children.push(new Paragraph({
      children: [new TextRun({ text: 'Cum:', bold: true, font: 'DejaVu Sans', size: 20 })],
      spacing: { after: 60 },
    }));
    for (const item of s.cum) children.push(bullet(item));
    children.push(new Paragraph({
      children: [new TextRun({ text: 'Rezultat: ', bold: true, font: 'DejaVu Sans', size: 20, color: '065F46' }), new TextRun({ text: s.rezultat, font: 'DejaVu Sans', size: 20, color: '065F46' })],
      spacing: { before: 100, after: 200 },
    }));
    children.push(sep());
  }

  // Concluzii
  children.push(h1('Concluzii'));
  for (const c of CONCLUZII) children.push(bullet(c));

  // Footer
  children.push(new Paragraph({
    children: [new TextRun({ text: `Generat automat — ${DATE} | Vibe Caffè Website2`, font: 'DejaVu Sans', size: 16, color: '9CA3AF', italics: true })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 400 },
  }));

  const doc = new Document({ sections: [{ children }] });
  fs.writeFileSync(outPath, await Packer.toBuffer(doc));
  console.log(`✅ DOCX: ${outPath}`);
}

// ─── PDF ─────────────────────────────────────────────────────────────────────

async function genPdf(outPath) {
  const doc = createPdf({ size: 'A4', margins: { top: 55, bottom: 55, left: 65, right: 65 } });
  const out = fs.createWriteStream(outPath);
  doc.pipe(out);

  const W = 465; // lățime utilă

  // Titlu
  doc.font('Bold').fontSize(20).fillColor('#111827').text(TITLU, { align: 'center' });
  doc.moveDown(0.3);
  doc.font('Regular').fontSize(11).fillColor('#6B7280').text(SUBTITLU, { align: 'center' });
  doc.moveDown(1.5);

  // Linie
  const line = () => { doc.moveTo(65, doc.y).lineTo(530, doc.y).strokeColor('#E5E7EB').lineWidth(1).stroke(); doc.moveDown(0.8); };

  // Introducere
  doc.font('Bold').fontSize(14).fillColor('#111827').text('Introducere');
  doc.moveDown(0.4);
  doc.font('Regular').fontSize(10).fillColor('#374151').text(INTRO, { lineGap: 3 });
  doc.moveDown(0.8);
  line();

  // Sprinturi
  doc.font('Bold').fontSize(14).fillColor('#111827').text('Sprinturi');
  doc.moveDown(0.6);

  for (const s of SPRINTURI) {
    if (doc.y > 680) doc.addPage();

    // Header sprint
    doc.font('Bold').fontSize(12).fillColor('#0D9488').text(`Sprint ${s.nr} — ${s.titlu}`);
    doc.font('Regular').fontSize(8.5).fillColor('#9CA3AF').text(`Commit: ${s.commit}`);
    doc.moveDown(0.4);

    // Ce
    doc.font('Bold').fontSize(10).fillColor('#111827').text('Ce am făcut:  ', { continued: true });
    doc.font('Regular').fontSize(10).fillColor('#374151').text(s.ce, { lineGap: 2 });
    doc.moveDown(0.3);

    // Cum
    doc.font('Bold').fontSize(10).fillColor('#111827').text('Cum:');
    doc.moveDown(0.2);
    for (const item of s.cum) {
      if (doc.y > 720) doc.addPage();
      doc.font('Regular').fontSize(9.5).fillColor('#374151').text(`• ${item}`, { indent: 12, lineGap: 2 });
    }
    doc.moveDown(0.3);

    // Rezultat
    doc.font('Bold').fontSize(10).fillColor('#065F46').text('Rezultat:  ', { continued: true });
    doc.font('Regular').fontSize(10).fillColor('#065F46').text(s.rezultat, { lineGap: 2 });
    doc.moveDown(0.8);
    line();
  }

  // Concluzii
  if (doc.y > 650) doc.addPage();
  doc.font('Bold').fontSize(14).fillColor('#111827').text('Concluzii');
  doc.moveDown(0.5);
  for (const c of CONCLUZII) {
    doc.font('Regular').fontSize(10).fillColor('#374151').text(`• ${c}`, { indent: 12, lineGap: 2 });
    doc.moveDown(0.2);
  }

  doc.moveDown(1.5);
  doc.font('Italic').fontSize(8.5).fillColor('#9CA3AF')
    .text(`Generat automat — ${DATE} | Vibe Caffè Website2`, { align: 'center' });

  doc.end();
  await new Promise((res, rej) => { out.on('finish', res); out.on('error', rej); });
  console.log(`✅ PDF:  ${outPath}`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

const base = path.join(OUTPUT_DIR, `sesiune-${DATE}`);
await genDocx(`${base}.docx`);
await genPdf(`${base}.pdf`);
console.log('\n🎉 Gata!');
