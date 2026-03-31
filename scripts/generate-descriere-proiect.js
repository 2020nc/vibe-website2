/**
 * Generează descrierea completă a proiectului Vibe Caffè
 * Fișiere: docs/descriere-proiect.docx + .pdf
 */

const fs   = require('fs');
const path = require('path');

const { createPdf } = require('C:/Users/Admin/.claude/pdf-utils/createPdf');

const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, BorderStyle, Table, TableRow, TableCell,
  WidthType, ShadingType,
} = require('docx');

const OUT_DIR = path.join(__dirname, '..', 'docs');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const TITLU    = 'Vibe Caffè — Descrierea Proiectului';
const SUBTITLU = 'Prezentare completă a funcționalităților';
const DATA     = '31 martie 2026';

// ── Datele meniului ──────────────────────────────────────────────────────────
const menuData = {
  'Espresso': [
    { name: 'Espresso',        price: 12, description: 'Shot dublu de espresso intens',                vegan: true  },
    { name: 'Americano',       price: 13, description: 'Espresso alungit cu apă caldă',                vegan: true  },
    { name: 'Cappuccino',      price: 16, description: 'Espresso + lapte spumat cremos',               vegan: false },
    { name: 'Latte',           price: 17, description: 'Espresso + lapte cald + spumă fină',           vegan: false },
    { name: 'Flat White',      price: 18, description: 'Double espresso + lapte micro-spumat',         vegan: false },
    { name: 'Macchiato',       price: 14, description: 'Espresso cu o picătură de spumă de lapte',     vegan: false },
    { name: 'Cortado',         price: 15, description: 'Espresso echilibrat cu puțin lapte cald',      vegan: false },
  ],
  'Specialty': [
    { name: 'Raf Coffee',      price: 22, description: 'Espresso + frișcă + sirop vanilie, amestec cremos', vegan: false },
    { name: 'Dalgona',         price: 20, description: 'Spumă cafea bătută peste lapte rece',          vegan: false },
    { name: 'Vietnamese Coffee', price: 19, description: 'Cold brew concentrat cu lapte condensat',    vegan: false },
    { name: 'Mocha',           price: 21, description: 'Espresso + ciocolată + lapte spumat',          vegan: false },
    { name: 'Affogato',        price: 18, description: 'Înghețată vanilie cu espresso turnat deasupra', vegan: false },
    { name: 'Dirty Chai Latte', price: 22, description: 'Chai spiced latte cu shot de espresso',       vegan: false },
  ],
  'Vegan': [
    { name: 'Oat Latte',       price: 19, description: 'Espresso + lapte de ovăz, textură mătăsoasă', vegan: true  },
    { name: 'Coconut Mocha',   price: 21, description: 'Mocha vegan cu lapte de cocos și ciocolată neagră', vegan: true },
    { name: 'Almond Cappuccino', price: 20, description: 'Cappuccino cu lapte de migdale',             vegan: true  },
    { name: 'Matcha Latte',    price: 22, description: 'Matcha cerimoniala cu lapte de ovăz',          vegan: true  },
    { name: 'Tumeric Latte',   price: 18, description: 'Golden milk cu turmeric, ghimbir și lapte vegetal', vegan: true },
  ],
  'Cold': [
    { name: 'Cold Brew',       price: 18, description: 'Cafea cold brew 18h, aromă dulce naturală',   vegan: true  },
    { name: 'Iced Latte',      price: 19, description: 'Espresso peste gheață și lapte rece',          vegan: false },
    { name: 'Nitro Cold Brew', price: 22, description: 'Cold brew infuzat cu nitrogen, textură cremă', vegan: true  },
    { name: 'Iced Matcha',     price: 21, description: 'Matcha cu lapte de ovăz și gheață',            vegan: true  },
    { name: 'Cold Brew Tonic', price: 20, description: 'Cold brew cu apă tonică și portocală',         vegan: true  },
  ],
  'Alternative': [
    { name: 'Matcha Clasic',   price: 16, description: 'Matcha ceremonjală cu apă caldă',              vegan: true  },
    { name: 'Chai Latte',      price: 17, description: 'Ceai masala cu lapte spumat și condimente',    vegan: false },
    { name: 'Hot Chocolate',   price: 15, description: 'Ciocolată belgiana topită cu lapte integral',  vegan: false },
    { name: 'Golden Milk',     price: 16, description: 'Lapte cu turmeric, scorțișoară și miere',      vegan: false },
    { name: 'London Fog',      price: 17, description: 'Earl Grey + lapte spumat + vanilie',           vegan: false },
  ],
  'Pastry': [
    { name: 'Croissant Unt',   price: 12, description: 'Croissant franțuzesc cu unt, crocant și flakey', vegan: false },
    { name: 'Croissant Ciocolată', price: 14, description: 'Croissant cu ciocolată belgiană neagră',   vegan: false },
    { name: 'Muffin Afine',    price: 11, description: 'Muffin pufos cu afine proaspete',              vegan: false },
    { name: 'Banana Bread',    price: 13, description: 'Pâine cu banane și nuci, rețetă tradițională', vegan: true  },
    { name: 'Brownie',         price: 14, description: 'Brownie ciocolătos cu nuci caramelizate',      vegan: false },
    { name: 'Scone Fructe',    price: 12, description: 'Scone britanic cu fructe uscate și unt',       vegan: false },
  ],
};

// ── Secțiunile documentului ──────────────────────────────────────────────────
const sectiuni = [
  {
    titlu: '1. Prezentare Generală',
    continut: [
      'Vibe Caffè este o aplicație web modernă pentru o cafenea urbană, dezvoltată cu Next.js 15 (App Router), React 19, Tailwind CSS 4 și TypeScript 5 în mod strict. Baza de date este gestionată prin Supabase (PostgreSQL), iar aplicația este gata de deployment pe Vercel.',
      'Proiectul acoperă întreg ciclul digital al unei cafenele: prezentare vizuală pentru clienți, meniu interactiv, sistem de rezervări, panou de administrare complet și integrare cu servicii externe (curs valutar BNR, AI chat).',
      'Adresa aplicației: configurabilă prin variabile de mediu (.env.local). Funcționează atât local (localhost:3000) cât și în producție.',
    ],
  },
  {
    titlu: '2. Stack Tehnologic',
    continut: [
      'Framework: Next.js 15 cu App Router — arhitectură modernă bazată pe React Server Components, routing prin sistem de foldere, API routes integrate.',
      'UI: React 19 + Tailwind CSS 4 — componente reactive, stilizare utility-first, design system consistent cu variabile CSS personalizate.',
      'Limbaj: TypeScript 5 (strict mode) — tipare stricte pentru toate componentele, interfețe definite pentru datele din API și baza de date.',
      'Bază de date: Supabase (PostgreSQL) — tabele pentru meniu, rezervări și configurări. Acces prin REST API cu Row Level Security.',
      'Fonturi: Plus Jakarta Sans (titluri) + Inter (corp text) — încărcate prin next/font pentru performanță optimă.',
      'Animații scroll: Lenis (smooth scroll) + Intersection Observer API (animații la intrarea în viewport).',
    ],
  },
  {
    titlu: '3. Pagini și Navigare',
    continut: [
      'Homepage (/): pagina principală cu toate secțiunile — Hero video, Features (bento grid), Meniu interactiv, About și Footer.',
      'Locație (/locatie): informații despre localizarea cafenelei, hartă interactivă Google Maps, program de funcționare și date de contact.',
      'Rezervări (/rezervari): formular de rezervare online cu validare completă (nume, email, telefon, dată, oră, număr persoane, mențiuni speciale). Rezervările se salvează în Supabase.',
      'Admin (/admin): panou de administrare protejat, accesibil din bara de navigare pentru gestionarea completă a aplicației.',
      'Navigare: navbar sticky (Navigation.tsx) cu logo, linkuri de pagini, evidențierea automată a secțiunii active la scroll și buton de dark mode. Prezent pe toate paginile prin layout.tsx.',
    ],
  },
  {
    titlu: '4. Funcționalități pentru Vizitatori',
    continut: [
      '4.1 Hero cu Video Background — secțiunea de deschidere a homepage-ului afișează un video ambiant în buclă (hero-coffee.mp4) cu overlay întunecat și text animat. Buton CTA care face scroll la secțiunea de meniu.',
      '4.2 Meniu Interactiv — meniul este încărcat dinamic din Supabase prin /api/menu. Produsele sunt organizate pe categorii (Espresso, Specialty, Vegan, Cold, Alternative, Pastry). Filtrare prin tab-uri animate cu tranziție de opacitate între categorii.',
      '4.3 Toggle Coloane Meniu — vizitatorii pot alege afișarea produselor în 3, 4 sau 5 coloane pe desktop. Preferința este salvată în localStorage și persistă la reîncărcarea paginii.',
      '4.4 Prețuri Multi-Valută — toggle RON / EUR / USD direct în secțiunea de meniu. Cursul de schimb este obținut în timp real de la BNR (Banca Națională a României) prin /api/curs, cu cache server de 1 oră. Dacă BNR nu răspunde, se folosesc rate de rezervă.',
      '4.5 Personalizare Produs (Add-ons) — la click pe un produs din meniu se deschide un panou cu opțiuni de personalizare: lapte de ovăz, lapte de soia, lapte de migdale, shot espresso extra, siropuri (vanilie, caramel, alune). Fiecare add-on are un preț suplimentar afișat în timp real.',
      '4.6 Meniu Special de Sărbători — componenta HolidayMenu verifică automat data curentă și afișează un meniu tematic pentru sărbători (Crăciun, Paște, Valentine\'s Day etc.). Produsele de sărbătoare sunt stocate în Supabase și administrabile din Admin.',
      '4.7 Banner Promoțional — banner configurat din Admin care apare deasupra meniului când este activat. Afișează mesaj personalizat cu condiția promoției (ex: reducere la comenzi peste X RON).',
      '4.8 Dark Mode "Cafea de Noapte" — temă întunecată cu culori calde inspirate din espresso: fundal #1A0D05, carduri culoarea ciocolatei, text crem și caramel. Activat prin butonul ThemeToggle din navbar, cu persistență în localStorage.',
      '4.9 Newsletter — formular de abonare la newsletter cu validare email, stocare în Supabase și mesaj de confirmare.',
      '4.10 Smooth Scroll — defilare fluidă pe întreaga pagină folosind librăria Lenis, wrappată în componenta SmoothScroll.tsx.',
      '4.11 Preloader — animație de încărcare afișată la primul acces al site-ului, pentru o experiență de intrare mai elegantă.',
    ],
  },
  {
    titlu: '5. Panou de Administrare',
    continut: [
      'Accesibil la /admin, panoul oferă control complet asupra conținutului și configurărilor aplicației fără a fi necesară modificarea codului.',
      '5.1 Gestionare Meniu — adăugare, editare și ștergere produse din meniu. Câmpuri disponibile: nume, categorie, preț, descriere, URL imagine, tip discount (procentual sau valoare), disponibilitate (activ/inactiv). Sortare produse prin câmpul sort_order.',
      '5.2 Gestionare Rezervări — vizualizarea tuturor rezervărilor cu detalii complete (client, dată, oră, persoane, mențiuni). Acțiuni individuale: confirmare, respingere, ștergere. Selecție multiplă (bulk) cu acțiuni în masă: Confirmă toate, Respinge toate, Șterge selectate.',
      '5.3 Export Rapoarte — export date rezervări în format Excel (.xlsx) sau PDF cu design profesional. Raportul conține statistici: număr total rezervări, distribuție pe zile și ore, rezervări confirmate vs. respinse.',
      '5.4 Configurare Banner Promoțional — activare/dezactivare banner, setare comandă minimă, tip reducere (procentual/valoare), sumă reducere și mesaj personalizat.',
      '5.5 Meniu de Sărbători — gestionare produse speciale pentru fiecare sărbătoare. Adăugare, editare, ștergere produse cu specificarea sărbătorii asociate.',
    ],
  },
  {
    titlu: '6. API Routes (Backend)',
    continut: [
      '/api/menu — GET: returnează toate produsele active din Supabase, ordonate după sort_order. POST/PUT/DELETE: operații CRUD pentru produse (folosit de Admin).',
      '/api/rezervari — GET: listare rezervări. POST: creare rezervare nouă cu validare câmpuri. PUT: actualizare status (confirmat/respins). DELETE: ștergere rezervare.',
      '/api/promo — GET/POST: citire și actualizare configurație banner promoțional din Supabase.',
      '/api/curs — GET: obține cursul EUR și USD de la BNR XML feed (https://bnr.ro/nbrfxrates.xml), parsează XML-ul și returnează ratele formatate. Cache server-side de 1 oră.',
      '/api/holiday — GET: returnează produsele de sărbătoare pentru data curentă din Supabase.',
      '/api/newsletter — POST: salvează adresa de email în tabela newsletter din Supabase cu validare format și verificare duplicat.',
    ],
  },
  {
    titlu: '7. Design System și UI',
    continut: [
      'Culori principale: Teal (#14B8A6) ca accent primar, Orange (#F97316) ca accent secundar, Amber (#D97706) pentru meniu și elemente cafenea.',
      'Glassmorphism: carduri cu fundal semi-transparent (rgba(255,255,255,0.85)), blur backdrop și border subtil — efect de sticlă mată folosit pe navbar și carduri.',
      'Animații la scroll: hook personalizat useScrollAnimation (Intersection Observer) animă elementele la intrarea în viewport cu fade-in și translateY.',
      'Responsive Design: toate componentele sunt adaptate pentru mobile (1 coloană), tablet (2 coloane) și desktop (3-5 coloane), folosind breakpoints Tailwind: sm, md, lg.',
      'Tipografie: Plus Jakarta Sans pentru titluri (font bold, modern), Inter pentru text body (lizibil, neutru). Ambele încărcate din Google Fonts prin next/font.',
    ],
  },
  {
    titlu: '8. Structura Fișierelor',
    continut: [
      'app/ — paginile aplicației: layout.tsx (root layout global), page.tsx (homepage), locatie/page.tsx, rezervari/page.tsx, admin/page.tsx.',
      'app/api/ — backend: chat/, curs/, holiday/, menu/, newsletter/, promo/, rezervari/ — fiecare cu propriul route.ts.',
      'components/ — toate componentele UI: Navigation, Hero, Features, Menu (MenuStarter), About, Footer, Preloader, SmoothScroll, ThemeToggle, HolidayMenu.',
      'lib/ — utilitare: hooks/useScrollAnimation.ts (Intersection Observer).',
      'public/ — fișiere statice: hero-coffee.mp4 (video background).',
      'docs/ — documentație generată: recap-uri sesiuni, planuri de lucru.',
    ],
  },
];

// ── Helpers DOCX ─────────────────────────────────────────────────────────────
function makeTitle(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.TITLE,
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
  });
}

function makeSubtitle(text, color = '6B7280') {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    children: [new TextRun({ text, size: 26, color, font: 'Calibri' })],
  });
}

function makeHeading(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 480, after: 160 },
    border: { bottom: { color: '14B8A6', style: BorderStyle.SINGLE, size: 6 } },
  });
}

function makeBody(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22, font: 'Calibri' })],
    spacing: { after: 160 },
  });
}

function makeTableHeaderRow(headers) {
  return new TableRow({
    tableHeader: true,
    children: headers.map((h) =>
      new TableCell({
        shading: { type: ShadingType.SOLID, color: '14B8A6' },
        children: [
          new Paragraph({
            children: [new TextRun({ text: h, bold: true, color: 'FFFFFF', size: 20, font: 'Calibri' })],
            spacing: { before: 60, after: 60 },
          }),
        ],
      })
    ),
  });
}

function makeTableDataRow(cells, isAlt) {
  return new TableRow({
    children: cells.map((c) =>
      new TableCell({
        shading: isAlt
          ? { type: ShadingType.SOLID, color: 'F0FDFB' }
          : { type: ShadingType.CLEAR, fill: 'FFFFFF' },
        children: [
          new Paragraph({
            children: [new TextRun({ text: String(c), size: 20, font: 'Calibri' })],
            spacing: { before: 60, after: 60 },
          }),
        ],
      })
    ),
  });
}

function makeMenuTable(items) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      makeTableHeaderRow(['Produs', 'Preț (RON)', 'Vegan', 'Descriere']),
      ...items.map((item, i) =>
        makeTableDataRow(
          [item.name, item.price + ' RON', item.vegan ? 'Da' : 'Nu', item.description],
          i % 2 === 1
        )
      ),
    ],
  });
}

// ── Generare DOCX ─────────────────────────────────────────────────────────────
async function genDocx() {
  const children = [
    makeTitle(TITLU),
    makeSubtitle(SUBTITLU),
    makeSubtitle(DATA, '9CA3AF'),
    new Paragraph({ spacing: { after: 400 } }),
  ];

  for (const sec of sectiuni) {
    children.push(makeHeading(sec.titlu));
    for (const para of sec.continut) children.push(makeBody(para));
  }

  // Anexe — tabele meniu
  children.push(
    new Paragraph({
      text: 'ANEXE — Tabelele Meniului',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 600, after: 200 },
      border: { bottom: { color: 'D97706', style: BorderStyle.SINGLE, size: 6 } },
    })
  );

  const categLabels = {
    'Espresso':    'Anexa A1 — Meniu Espresso',
    'Specialty':   'Anexa A2 — Meniu Specialty',
    'Vegan':       'Anexa A3 — Meniu Vegan',
    'Cold':        'Anexa A4 — Meniu Cold Brew & Iced',
    'Alternative': 'Anexa A5 — Meniu Alternative (Ceaiuri & Ciocolată)',
    'Pastry':      'Anexa A6 — Meniu Patiserie (Pastry)',
  };

  for (const [cat, label] of Object.entries(categLabels)) {
    children.push(
      new Paragraph({
        text: label,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 160 },
      })
    );
    children.push(makeMenuTable(menuData[cat]));
    children.push(new Paragraph({ spacing: { after: 200 } }));
  }

  const doc = new Document({ sections: [{ children }] });
  const buf = await Packer.toBuffer(doc);
  const outPath = path.join(OUT_DIR, 'descriere-proiect.docx');
  fs.writeFileSync(outPath, buf);
  console.log('DOCX salvat:', outPath);
}

// ── Generare PDF ──────────────────────────────────────────────────────────────
function genPdf() {
  const outPath = path.join(OUT_DIR, 'descriere-proiect.pdf');
  const ws  = fs.createWriteStream(outPath);
  const doc = createPdf({ size: 'A4', margin: 50, bufferPages: true });
  doc.pipe(ws);

  const PW = doc.page.width;
  const M  = 50;
  const W  = PW - M * 2;

  // ── Header pagina de titlu ──
  doc.rect(0, 0, PW, 120).fill('#0D9488');
  doc.fillColor('#FFFFFF').font('Bold').fontSize(18)
     .text(TITLU, M, 35, { width: W, align: 'center' });
  doc.fillColor('#CCFBF1').font('Regular').fontSize(11)
     .text(SUBTITLU, M, 68, { width: W, align: 'center' });
  doc.fillColor('#99F6E4').fontSize(9)
     .text(DATA, M, 90, { width: W, align: 'center' });
  doc.y = 140;

  function needSpace(needed) {
    if (doc.y + needed > doc.page.height - 60) {
      doc.addPage();
      doc.y = M;
    }
  }

  function heading(text) {
    needSpace(40);
    doc.moveDown(0.6);
    doc.fillColor('#0D9488').font('Bold').fontSize(12)
       .text(text, M, doc.y, { width: W });
    doc.moveDown(0.2);
    doc.moveTo(M, doc.y).lineTo(M + W, doc.y)
       .strokeColor('#0D9488').lineWidth(1.5).stroke();
    doc.moveDown(0.4);
  }

  function body(text) {
    needSpace(20);
    doc.fillColor('#374151').font('Regular').fontSize(9.5)
       .text(text, M, doc.y, { width: W, lineGap: 3 });
    doc.moveDown(0.4);
  }

  function heading2(text) {
    needSpace(30);
    doc.moveDown(0.4);
    doc.fillColor('#1F2937').font('Bold').fontSize(10.5)
       .text(text, M, doc.y, { width: W });
    doc.moveDown(0.3);
  }

  function drawTable(headers, rows) {
    const colW = [110, 55, 40, W - 205];
    const hH   = 18;
    const rH   = 16;

    needSpace(hH + rows.length * rH + 10);

    // Header
    const startY = doc.y;
    doc.rect(M, startY, W, hH).fill('#14B8A6');
    let cx = M;
    headers.forEach((h, i) => {
      doc.fillColor('#FFFFFF').font('Bold').fontSize(8.5)
         .text(h, cx + 4, startY + 4, { width: colW[i] - 8, lineBreak: false });
      cx += colW[i];
    });
    doc.y = startY + hH;

    // Rows
    rows.forEach((row, ri) => {
      needSpace(rH + 4);
      const y  = doc.y;
      const bg = ri % 2 === 0 ? '#F0FDFB' : '#FFFFFF';
      doc.rect(M, y, W, rH).fill(bg);
      doc.rect(M, y, W, rH).strokeColor('#E5E7EB').lineWidth(0.4).stroke();
      let rx = M;
      row.forEach((cell, ci) => {
        doc.fillColor('#1F2937').font('Regular').fontSize(8.5)
           .text(String(cell), rx + 4, y + 3, { width: colW[ci] - 8, lineBreak: false });
        rx += colW[ci];
      });
      doc.y = y + rH;
    });
    doc.moveDown(0.8);
  }

  // ── Secțiuni principale ──
  for (const sec of sectiuni) {
    heading(sec.titlu);
    for (const para of sec.continut) body(para);
  }

  // ── Anexe ──
  doc.addPage();
  doc.y = M;
  heading('ANEXE — Tabelele Meniului');

  const categLabels = {
    'Espresso':    'Anexa A1 — Meniu Espresso',
    'Specialty':   'Anexa A2 — Meniu Specialty',
    'Vegan':       'Anexa A3 — Meniu Vegan',
    'Cold':        'Anexa A4 — Meniu Cold Brew & Iced',
    'Alternative': 'Anexa A5 — Meniu Alternative',
    'Pastry':      'Anexa A6 — Meniu Patiserie',
  };

  for (const [cat, label] of Object.entries(categLabels)) {
    heading2(label);
    drawTable(
      ['Produs', 'Pret (RON)', 'Vegan', 'Descriere'],
      menuData[cat].map((item) => [
        item.name,
        item.price + ' RON',
        item.vegan ? 'Da' : 'Nu',
        item.description,
      ])
    );
  }

  // ── Footer pe toate paginile ──
  const range = doc.bufferedPageRange();
  for (let i = 0; i < range.count; i++) {
    doc.switchToPage(range.start + i);
    const pH = doc.page.height;
    doc.moveTo(M, pH - 38).lineTo(M + W, pH - 38)
       .strokeColor('#E5E7EB').lineWidth(0.5).stroke();
    doc.fillColor('#9CA3AF').font('Regular').fontSize(7.5)
       .text('Vibe Caffè — Descrierea Proiectului', M, pH - 28, { width: W / 2 });
    doc.text(`Pagina ${i + 1} din ${range.count}`, M, pH - 28,
       { width: W, align: 'right' });
  }

  doc.end();
  ws.on('finish', () => console.log('PDF salvat:', outPath));
  ws.on('error', (e) => console.error('Eroare PDF:', e));
}

(async () => {
  await genDocx();
  genPdf();
  console.log('\nDocumentele au fost generate cu succes în /docs/');
})();
