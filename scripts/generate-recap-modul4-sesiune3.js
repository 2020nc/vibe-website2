/**
 * Generează recapitularea sesiunii 3 din Modul 4 — Vibe Caffè
 * Fișiere: docs/recap-modul4-sesiune3.docx + .pdf
 *
 * Subiecte acoperite:
 *  - Navbar permanent vizibil + activ la scroll
 *  - Dark mode "Cafea de Noapte" (tema caldă)
 *  - Navigation adăugat în layout.tsx (global)
 *  - Fix text navbar imun la dark mode
 */

const fs   = require('fs');
const path = require('path');

const { createPdf } = require('C:/Users/Admin/.claude/pdf-utils/createPdf');

const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, BorderStyle,
} = require('docx');

const OUT_DIR = path.join(__dirname, '..', 'docs');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const TITLU    = 'Vibe Caffè — Modul 4, Sesiunea 3';
const SUBTITLU = 'Navbar Global, Secțiune Activă, Dark Mode Cafea';
const DATA     = '31 martie 2026';

const sectiuni = [
  {
    titlu: '1. Ce am construit în această sesiune',
    continut: [
      'Această sesiune a finalizat interfața vizuală a proiectului Vibe Caffè cu trei îmbunătățiri: un navbar permanent vizibil pe toate paginile, evidențierea automată a secțiunii active la scroll, și un dark mode cu temă caldă inspirată din cafea.',
    ],
  },
  {
    titlu: '2. Navbar global în layout.tsx',
    continut: [
      'Componenta Navigation.tsx exista în proiect dar nu era folosită nicăieri — nici în page.tsx, nici în layout.tsx. De aceea navbar-ul nu apărea deloc pe pagină.',
      'Fix: importat și adăugat <Navigation /> în app/layout.tsx, înaintea {children}. Astfel navbar-ul apare automat pe TOATE paginile (homepage, rezervări, locație, admin) fără a fi nevoie să-l adăugăm manual în fiecare pagină.',
      'Lecție cheie: layout.tsx este "scheletul" care înconjoară toate paginile. Componentele plasate aici (navbar, footer global) sunt moștenite automat de fiecare rută din aplicație.',
    ],
  },
  {
    titlu: '3. Navbar permanent alb — fără transparent',
    continut: [
      'Versiunea anterioară a navbar-ului era complet transparent pe hero, ceea ce îl făcea invizibil pe imaginile întunecate. Am simplificat: navbar-ul este mereu alb (rgba(255,255,255,0.97)) cu blur și shadow subtil.',
      'Fundal inline style în loc de clase Tailwind: folosim style={{ backgroundColor: "rgba(255,255,255,0.97)" }} pentru a fi imun la dark mode. Clasele Tailwind bg-white sunt suprascrise de CSS-ul dark mode care le schimbă în maro-ciocolată. Stilurile inline au prioritate mai mare și nu sunt afectate.',
      'Același principiu se aplică textului: color: "#111827" direct pe element garantează că textul rămâne negru indiferent de tema activă.',
    ],
  },
  {
    titlu: '4. Secțiune activă la scroll (Intersection Observer)',
    continut: [
      'Butonul "Meniu" din navbar se colorează în verde (bg-primary) automat când vizitatorul derulează la secțiunea meniului. Aceasta este o tehnică standard de UX numită "active navigation".',
      'Implementare: IntersectionObserver observă fiecare secțiune din lista NAV_SECTIONS (["menu", "features", "sarbatori", "footer"]). Când o secțiune devine vizibilă (threshold: 0.1 + rootMargin: "-60px 0px -40% 0px"), setActiveSection(id) actualizează starea.',
      'rootMargin explică: "-60px 0px -40% 0px" înseamnă că secțiunea este considerată activă când intră cu cel puțin 60px sub navbar și ocupă cel puțin 60% din înălțimea viewport-ului de sus. Aceasta evită activarea prematură.',
      'Fiecare secțiune din pagină trebuie să aibă un id= corespunzător: <section id="menu">, <section id="features"> etc.',
    ],
  },
  {
    titlu: '5. Dark mode "Cafea de Noapte"',
    continut: [
      'Tema dark mode anterioară folosea gri neutru (#1A1A1A) — neinspirată pentru o cafenea. Am înlocuit-o cu o temă caldă inspirată din espresso.',
      'Culorile noi: fundal body #1A0D05 (espresso închis), carduri .bg-white → #2D1A0A (ciocolată), text principal #FDF0E0 (crem cald), text secundar #F0D9B5 (caramel deschis), text terțiar #C8A882 (caramel mediu).',
      'Glass background: rgba(45, 26, 10, 0.88) cu border rgba(249, 115, 22, 0.15) — un halou portocaliu subtil în jurul elementelor glassmorphism.',
      'Rezultat vizual: în dark mode, site-ul arată ca o cafenea iluminată noaptea — cald, intim, consistent cu brandul.',
    ],
  },
  {
    titlu: '6. Fișiere modificate',
    continut: [
      'app/layout.tsx — adăugat import Navigation + <Navigation /> înaintea {children}',
      'components/Navigation.tsx — navbar mereu alb (inline style), text #111827 (inline style imun la dark mode), IntersectionObserver cu threshold 0.1 + rootMargin corectat, eliminat cod condițional isScrolled',
      'app/globals.css — dark mode: culori calde espresso (#1A0D05, #2D1A0A, #FDF0E0, #F0D9B5, #C8A882)',
    ],
  },
  {
    titlu: '7. Concepte cheie din această sesiune',
    continut: [
      'layout.tsx vs page.tsx: layout este persistent între navigări și ideal pentru elemente globale (navbar, footer). page este specific fiecărei rute.',
      'CSS specificity: inline style > clase Tailwind > CSS global. Când vrei ca un element să ignore dark mode, folosește style={{ color: "..." }} direct.',
      'IntersectionObserver rootMargin: acceptă valori negative pentru a "micșora" zona de detecție. Util pentru a activa elementele cu o mică întârziere față de marginea viewport-ului.',
      'Tema dark mode și brandul: culorile unui dark mode nu trebuie să fie neapărat gri. O cafenea poate folosi maro-espresso, o agenție creativă poate folosi violet închis etc. Dark mode bun = dark mode care respectă identitatea vizuală a brandului.',
    ],
  },
];

function makeTitle(text) {
  return new Paragraph({
    text, heading: HeadingLevel.TITLE,
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
  });
}
function makeHeading(text) {
  return new Paragraph({
    text, heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 120 },
    border: { bottom: { color: '14B8A6', style: BorderStyle.SINGLE, size: 4 } },
  });
}
function makeBody(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22, font: 'Calibri' })],
    spacing: { after: 160 },
  });
}

async function genDocx() {
  const children = [
    makeTitle(TITLU),
    new Paragraph({
      alignment: AlignmentType.CENTER, spacing: { after: 100 },
      children: [new TextRun({ text: SUBTITLU, size: 26, color: '6B7280', font: 'Calibri' })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER, spacing: { after: 600 },
      children: [new TextRun({ text: DATA, size: 22, color: '9CA3AF', font: 'Calibri' })],
    }),
  ];
  for (const sec of sectiuni) {
    children.push(makeHeading(sec.titlu));
    for (const para of sec.continut) children.push(makeBody(para));
  }
  const doc = new Document({ sections: [{ children }] });
  const buf = await Packer.toBuffer(doc);
  const outPath = path.join(OUT_DIR, 'recap-modul4-sesiune3.docx');
  fs.writeFileSync(outPath, buf);
  console.log('DOCX salvat:', outPath);
}

function genPdf() {
  const lines = [];
  lines.push({ type: 'title', text: TITLU });
  lines.push({ type: 'subtitle', text: SUBTITLU });
  lines.push({ type: 'subtitle', text: DATA });
  lines.push({ type: 'spacer' });
  for (const sec of sectiuni) {
    lines.push({ type: 'heading', text: sec.titlu });
    for (const para of sec.continut) lines.push({ type: 'body', text: para });
    lines.push({ type: 'spacer' });
  }
  const outPath = path.join(OUT_DIR, 'recap-modul4-sesiune3.pdf');
  createPdf(lines, outPath);
  console.log('PDF salvat:', outPath);
}

(async () => {
  await genDocx();
  genPdf();
  console.log('\nDocumentație generată cu succes în /docs/');
})();
