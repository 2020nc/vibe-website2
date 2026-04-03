/**
 * Generează structura proiectului ca .pdf și .docx
 */
const fs = require('fs');
const path = require('path');
const { createPdf } = require('C:/Users/Admin/.claude/pdf-utils/createPdf');

// ── docx ──────────────────────────────────────────────────────────────────
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require('docx');

const OUTPUT_DIR = path.join(__dirname, '../docs');

// ── Date structură ─────────────────────────────────────────────────────────
const sections = [
  {
    heading: 'Stack Tehnic',
    items: [
      'Framework: Next.js 16 (App Router)',
      'UI: React 19 + Tailwind CSS 4',
      'Limbaj: TypeScript 5 (strict mode)',
      'Baza de date: Supabase (PostgreSQL)',
      'Fonts: Plus Jakarta Sans + Inter',
      'Smooth Scroll: Lenis',
    ],
  },
  {
    heading: 'app/ — Next.js App Router',
    items: [
      'globals.css               — Stiluri globale + CSS variables',
      'layout.tsx                — Root layout cu fonturi',
      'page.tsx                  — Homepage',
      'locatie/page.tsx          — Pagina Locație',
      'rezervari/page.tsx        — Pagina Rezervări',
      'admin/page.tsx            — Panou admin',
      'api/chat/route.ts         — Barista Bot AI',
      'api/rezervari/route.ts    — CRUD rezervări',
      'api/menu/route.ts         — Meniu din Supabase',
      'api/menu/bulk/route.ts    — Import bulk meniu',
      'api/newsletter/route.ts   — Newsletter',
      'api/promo/route.ts        — Promoții',
      'api/holiday/route.ts      — Meniu sărbători',
      'api/curs/route.ts         — API curs',
    ],
  },
  {
    heading: 'components/ — Componente React',
    items: [
      'Navigation.tsx            — Navbar sticky',
      'Hero.tsx                  — Hero cu video background',
      'Features.tsx              — Bento grid features',
      'Menu.tsx                  — Meniu cu categorii',
      'About.tsx                 — Secțiune despre noi',
      'Footer.tsx                — Footer cu wave SVG',
      'ChatWidget.tsx            — Barista Bot chat',
      'Preloader.tsx             — Loading animation',
      'SmoothScroll.tsx          — Lenis wrapper',
      'ThemeToggle.tsx           — Dark mode toggle',
      'HolidayMenu.tsx           — Meniu sărbători',
      '*Starter.tsx              — Versiuni starter (referință)',
    ],
  },
  {
    heading: 'lib/ — Utilități',
    items: [
      'supabase.ts                    — Client Supabase',
      'menuData.ts                    — Date meniu static',
      'knowledge-base.ts              — Date pentru ChatWidget',
      'hooks/useScrollAnimation.ts    — Intersection Observer hook',
    ],
  },
  {
    heading: 'Alte foldere',
    items: [
      'supabase/    — Configurare și migrări Supabase',
      'public/      — Fișiere statice (video, imagini)',
      'scripts/     — Scripturi utilitare',
      'docs/        — Documentație și rapoarte',
      'checkpoints/ — Backup-uri versiuni anterioare',
    ],
  },
];

// ── PDF ───────────────────────────────────────────────────────────────────
function generatePdf() {
  const doc = createPdf({ size: 'A4', margin: 50 });
  const outPath = path.join(OUTPUT_DIR, 'structura-proiect.pdf');
  doc.pipe(fs.createWriteStream(outPath));

  // Titlu
  doc.font('Bold').fontSize(20).text('Structura Proiectului Vibe Caffè', { align: 'center' });
  doc.moveDown(0.5);
  doc.font('Regular').fontSize(10).fillColor('#666666')
    .text('Generat: ' + new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' }), { align: 'center' });
  doc.moveDown(1.5);

  sections.forEach((section) => {
    // Heading secțiune
    doc.font('Bold').fontSize(13).fillColor('#14B8A6').text(section.heading);
    doc.moveDown(0.3);

    section.items.forEach((item) => {
      doc.font('Regular').fontSize(10).fillColor('#1F2937')
        .text('  • ' + item, { lineGap: 2 });
    });

    doc.moveDown(1);
  });

  doc.end();
  console.log('PDF generat:', outPath);
}

// ── DOCX ──────────────────────────────────────────────────────────────────
async function generateDocx() {
  const children = [];

  // Titlu
  children.push(
    new Paragraph({
      text: 'Structura Proiectului Vibe Caffè',
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Generat: ' + new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' }),
          color: '666666',
          size: 20,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
  );

  sections.forEach((section) => {
    children.push(
      new Paragraph({
        text: section.heading,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 100 },
      }),
    );

    section.items.forEach((item) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: '• ' + item, size: 20 }),
          ],
          spacing: { after: 60 },
          indent: { left: 360 },
        }),
      );
    });
  });

  const doc = new Document({ sections: [{ children }] });
  const buffer = await Packer.toBuffer(doc);
  const outPath = path.join(OUTPUT_DIR, 'structura-proiect.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('DOCX generat:', outPath);
}

// ── Run ───────────────────────────────────────────────────────────────────
generatePdf();
generateDocx().catch(console.error);
