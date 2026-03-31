/**
 * Generează raportul de comparație: proiectul studentului vs. proiectul profesorului
 * Fișiere: docs/raport-comparatie.docx + .pdf
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

const TITLU    = 'Vibe Caffè — Raport de Comparație';
const SUBTITLU = 'Proiectul studentului vs. Proiectul profesorului';
const DATA     = '31 martie 2026';

// ── Date comparație ──────────────────────────────────────────────────────────

const inPlus = [
  {
    functie: 'Meniu dinamic din Supabase',
    descriere: 'Meniul este încărcat în timp real din baza de date Supabase prin /api/menu. Produsele pot fi adăugate, editate sau șterse din Admin fără a modifica codul. Profesorul are meniu static (date hardcodate în cod).',
  },
  {
    functie: 'Toggle 3/4/5 coloane meniu',
    descriere: 'Vizitatorul poate alege afișarea produselor în 3, 4 sau 5 coloane direct din interfață. Preferința se salvează în localStorage. Profesorul afișează meniul într-un grid fix.',
  },
  {
    functie: 'Prețuri multi-valută (RON/EUR/USD)',
    descriere: 'Toggle de valută direct în meniu. Cursul de schimb este obținut în timp real de la BNR (Banca Națională a României) prin /api/curs, cu cache server de 1 oră. Profesorul afișează prețuri doar în RON.',
  },
  {
    functie: 'Personalizare produs cu Add-ons',
    descriere: 'La click pe produs se deschide un panou cu opțiuni de personalizare: lapte alternativ (ovăz, soia, migdale), shot extra, siropuri (vanilie, caramel, alune). Prețul total se calculează în timp real. Profesorul listează add-ons ca informație statică, fără calcul de preț.',
  },
  {
    functie: 'Reduceri per produs (discount sistem)',
    descriere: 'Fiecare produs din Admin poate avea o reducere configurată: procentuală (ex: -20%) sau valoare fixă (ex: -3 RON). Pe card apare badge-ul reducerii, prețul original tăiat și prețul final calculat. Profesorul nu are sistem de reduceri pe produse.',
  },
  {
    functie: 'Banner promoțional configurat din Admin',
    descriere: 'Banner activabil/dezactivabil din Admin cu mesaj personalizat, comandă minimă și tip reducere. Se afișează deasupra meniului când este activ. Profesorul nu are această funcționalitate.',
  },
  {
    functie: 'Meniu special de Sărbători',
    descriere: 'Componenta HolidayMenu afișează automat un meniu tematic bazat pe data curentă (Crăciun, Paște, Valentine etc.). Produsele și reducerea de sărbătoare sunt configurabile din Admin prin Supabase. Profesorul nu are meniu de sărbători.',
  },
  {
    functie: 'Export Excel și PDF din Admin',
    descriere: 'Exportul rezervărilor și al meniului în format Excel (.xlsx) și PDF cu design profesional, statistici și diacritice corecte. Profesorul nu are funcționalitate de export.',
  },
  {
    functie: 'Acțiuni bulk în Admin (selecție multiplă)',
    descriere: 'Selectare multiplă a rezervărilor sau produselor cu checkbox și acțiuni în masă: Confirmă toate, Respinge toate, Șterge selectate, Setează reducere. Profesorul nu are acțiuni bulk.',
  },
  {
    functie: 'Curs valutar BNR live',
    descriere: 'API route /api/curs parsează XML-ul feed-ului oficial BNR și returnează cursul EUR și USD cu cache de 1 oră. Dacă BNR nu răspunde, se folosesc valori de rezervă. Profesorul nu are integrare valutară.',
  },
  {
    functie: 'Dark mode "Cafea de Noapte"',
    descriere: 'Temă întunecată cu culori calde inspirate din espresso: fundal #1A0D05, carduri culoarea ciocolatei, text crem și caramel. Persistență în localStorage. Profesorul nu are dark mode.',
  },
  {
    functie: 'Buton activ la scroll (Active Navigation)',
    descriere: 'Link-urile din navbar se colorează automat în funcție de secțiunea vizibilă pe ecran, folosind Intersection Observer. Profesorul nu are această funcționalitate.',
  },
  {
    functie: 'Newsletter cu stocare în Supabase',
    descriere: 'Formular de abonare newsletter cu validare email, verificare duplicat și stocare în tabela newsletter_subscribers din Supabase. Profesorul are câmpul de email dar fără backend funcțional conectat la bază de date.',
  },
];

const inMinus = [
  {
    functie: 'Galerie foto pe pagina Locație',
    descriere: 'Profesorul are o galerie cu 6 imagini ale cafenelei (interior, bar, terasă etc.) cu efecte hover: zoom, overlay cu titlu și descriere. Proiectul studentului nu are galerie foto pe pagina Locație.',
  },
  {
    functie: 'Happy Hour pe pagina Locație',
    descriere: 'Profesorul afișează explicit programul de Happy Hour (16:00-18:00, reducere 20%) în secțiunea de informații de pe pagina Locație. Proiectul studentului nu menționează Happy Hour.',
  },
  {
    functie: 'Facilități cu tag-uri interactive pe pagina Locație',
    descriere: 'Profesorul listează facilitățile cafenelei ca tag-uri interactive cu emoji-uri (WiFi, prize, acces dizabilități, parcare, pet-friendly). Proiectul studentului nu are această secțiune structurată.',
  },
  {
    functie: 'Secțiunea "De ce ne aleg clienții?" (3 coloane)',
    descriere: 'Profesorul are o secțiune dedicată cu 3 coloane: Cafea de Specialitate, Patiserie Artizanală, Ambient Relaxant — fiecare cu imagine și descriere. Proiectul studentului are o secțiune Features diferită ca structură.',
  },
  {
    functie: 'Iconuri Social Media în Footer',
    descriere: 'Profesorul are iconuri pentru Facebook, Instagram și TikTok cu efecte hover (schimbare culoare la primary). Proiectul studentului nu are iconuri social media în footer.',
  },
];

// ── Helpers DOCX ─────────────────────────────────────────────────────────────
function makeTitle(text) {
  return new Paragraph({
    text, heading: HeadingLevel.TITLE,
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
  });
}
function makeSubtitle(text, color = '6B7280') {
  return new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { after: 120 },
    children: [new TextRun({ text, size: 26, color, font: 'Calibri' })],
  });
}
function makeHeading(text, color = '0D9488') {
  return new Paragraph({
    text, heading: HeadingLevel.HEADING_1,
    spacing: { before: 480, after: 160 },
    border: { bottom: { color, style: BorderStyle.SINGLE, size: 6 } },
  });
}
function makeBody(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22, font: 'Calibri' })],
    spacing: { after: 160 },
  });
}

function makeCompareTable(rows, headerColor, altColor) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        tableHeader: true,
        children: ['Funcționalitate', 'Detalii'].map((h) =>
          new TableCell({
            shading: { type: ShadingType.SOLID, color: headerColor },
            children: [new Paragraph({
              children: [new TextRun({ text: h, bold: true, color: 'FFFFFF', size: 20, font: 'Calibri' })],
              spacing: { before: 80, after: 80 },
            })],
          })
        ),
      }),
      ...rows.map((row, i) =>
        new TableRow({
          children: [
            new TableCell({
              shading: i % 2 === 1
                ? { type: ShadingType.SOLID, color: altColor }
                : { type: ShadingType.CLEAR, fill: 'FFFFFF' },
              children: [new Paragraph({
                children: [new TextRun({ text: row.functie, bold: true, size: 20, font: 'Calibri' })],
                spacing: { before: 80, after: 80 },
              })],
            }),
            new TableCell({
              shading: i % 2 === 1
                ? { type: ShadingType.SOLID, color: altColor }
                : { type: ShadingType.CLEAR, fill: 'FFFFFF' },
              children: [new Paragraph({
                children: [new TextRun({ text: row.descriere, size: 20, font: 'Calibri' })],
                spacing: { before: 80, after: 80 },
              })],
            }),
          ],
        })
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
    new Paragraph({ spacing: { after: 200 } }),
    makeBody('Acest raport compară funcționalitățile proiectului Vibe Caffè al studentului cu proiectul de referință al profesorului (https://vibe-website-rho.vercel.app/), evidențiind ce a fost adăugat în plus și ce lipsește față de versiunea profesorului.'),
    new Paragraph({ spacing: { after: 200 } }),

    makeHeading('1. Funcționalități în PLUS față de proiectul profesorului', '059669'),
    makeBody(`Proiectul studentului conține ${inPlus.length} funcționalități suplimentare față de proiectul profesorului:`),
    new Paragraph({ spacing: { after: 160 } }),
    makeCompareTable(inPlus, '059669', 'ECFDF5'),
    new Paragraph({ spacing: { after: 400 } }),

    makeHeading('2. Funcționalități în MINUS față de proiectul profesorului', 'DC2626'),
    makeBody(`Proiectul studentului nu include ${inMinus.length} funcționalități prezente în proiectul profesorului:`),
    new Paragraph({ spacing: { after: 160 } }),
    makeCompareTable(inMinus, 'DC2626', 'FEF2F2'),
    new Paragraph({ spacing: { after: 400 } }),

    makeHeading('3. Concluzie', '0D9488'),
    makeBody(`Proiectul studentului depășește semnificativ proiectul profesorului ca funcționalități tehnice: ${inPlus.length} funcționalități extra față de doar ${inMinus.length} funcționalități lipsă.`),
    makeBody('Plusurile sunt în principal funcționalități backend și de administrare avansate: bază de date live, sistem de reduceri, export documente, integrare BNR, dark mode și acțiuni bulk în Admin.'),
    makeBody('Minusurile sunt elemente de prezentare vizuală (galerie foto, tag-uri facilități, iconuri social media) care pot fi adăugate rapid fără a necesita backend.'),
  ];

  const doc = new Document({ sections: [{ children }] });
  const buf = await Packer.toBuffer(doc);
  const outPath = path.join(OUT_DIR, 'raport-comparatie.docx');
  fs.writeFileSync(outPath, buf);
  console.log('DOCX salvat:', outPath);
}

// ── Generare PDF ──────────────────────────────────────────────────────────────
function genPdf() {
  const outPath = path.join(OUT_DIR, 'raport-comparatie.pdf');
  const ws  = fs.createWriteStream(outPath);
  const doc = createPdf({ size: 'A4', margin: 50, bufferPages: true });
  doc.pipe(ws);

  const PW = doc.page.width;
  const M  = 50;
  const W  = PW - M * 2;

  // Header
  doc.rect(0, 0, PW, 120).fill('#1F2937');
  doc.fillColor('#FFFFFF').font('Bold').fontSize(17)
     .text(TITLU, M, 30, { width: W, align: 'center' });
  doc.fillColor('#D1D5DB').font('Regular').fontSize(10)
     .text(SUBTITLU, M, 62, { width: W, align: 'center' });
  doc.fillColor('#9CA3AF').fontSize(9)
     .text(DATA, M, 84, { width: W, align: 'center' });
  doc.y = 140;

  function needSpace(needed) {
    if (doc.y + needed > doc.page.height - 60) {
      doc.addPage();
      doc.y = M;
    }
  }

  function heading(text, color) {
    needSpace(45);
    doc.moveDown(0.5);
    doc.fillColor(color).font('Bold').fontSize(12)
       .text(text, M, doc.y, { width: W });
    doc.moveDown(0.2);
    doc.moveTo(M, doc.y).lineTo(M + W, doc.y)
       .strokeColor(color).lineWidth(1.5).stroke();
    doc.moveDown(0.5);
  }

  function body(text) {
    needSpace(20);
    doc.fillColor('#374151').font('Regular').fontSize(9.5)
       .text(text, M, doc.y, { width: W, lineGap: 3 });
    doc.moveDown(0.4);
  }

  function drawTable(rows, headerColor, altColor) {
    const col1 = 130;
    const col2 = W - col1;
    const hH   = 20;

    // Header tabel
    const sy = doc.y;
    doc.rect(M, sy, W, hH).fill(headerColor);
    doc.fillColor('#FFFFFF').font('Bold').fontSize(8.5)
       .text('Functionalitate', M + 4, sy + 5, { width: col1 - 8, lineBreak: false });
    doc.text('Detalii', M + col1 + 4, sy + 5, { width: col2 - 8, lineBreak: false });
    doc.y = sy + hH;

    rows.forEach((row, rowIdx) => {
      const bg = rowIdx % 2 === 0 ? '#FFFFFF' : altColor;
      const textHeight1 = doc.heightOfString(row.functie, { width: col1 - 8, font: 'Bold', fontSize: 8.5 });
      const textHeight2 = doc.heightOfString(row.descriere, { width: col2 - 8, font: 'Regular', fontSize: 8.5 });
      const rowH = Math.max(textHeight1, textHeight2) + 12;

      needSpace(rowH + 2);
      const yy = doc.y;
      doc.rect(M, yy, W, rowH).fill(bg);
      doc.rect(M, yy, W, rowH).strokeColor('#E5E7EB').lineWidth(0.4).stroke();
      doc.fillColor('#111827').font('Bold').fontSize(8.5)
         .text(row.functie, M + 4, yy + 5, { width: col1 - 8 });
      doc.fillColor('#374151').font('Regular').fontSize(8.5)
         .text(row.descriere, M + col1 + 4, yy + 5, { width: col2 - 8 });
      doc.y = yy + rowH;
    });
    doc.moveDown(0.8);
  }

  // Intro
  body('Acest raport compara functiile proiectului Vibe Caffe al studentului cu proiectul profesorului (vibe-website-rho.vercel.app), evidentind ce este in plus si ce lipseste.');

  // Secțiunea PLUS
  heading(`1. Functionalitati in PLUS (${inPlus.length} functii extra)`, '#059669');
  drawTable(inPlus, '#059669', '#F0FDF4');

  // Secțiunea MINUS
  heading(`2. Functionalitati in MINUS (${inMinus.length} functii lipsa)`, '#DC2626');
  drawTable(inMinus, '#DC2626', '#FEF2F2');

  // Concluzie
  heading('3. Concluzie', '#0D9488');
  body(`Proiectul studentului depaseste proiectul profesorului cu ${inPlus.length} functionalitati extra fata de doar ${inMinus.length} functionalitati lipsa.`);
  body('Plusurile sunt functionalitati backend avansate: baza de date live, sistem de reduceri, export documente, integrare BNR, dark mode si actiuni bulk in Admin.');
  body('Minusurile sunt elemente vizuale (galerie foto, tag-uri facilitati, iconuri social media) care pot fi adaugate rapid fara a necesita backend.');

  // Footer
  const range = doc.bufferedPageRange();
  for (let i = 0; i < range.count; i++) {
    doc.switchToPage(range.start + i);
    const pH = doc.page.height;
    doc.moveTo(M, pH - 38).lineTo(M + W, pH - 38)
       .strokeColor('#E5E7EB').lineWidth(0.5).stroke();
    doc.fillColor('#9CA3AF').font('Regular').fontSize(7.5)
       .text('Vibe Caffe — Raport Comparatie', M, pH - 28, { width: W / 2 });
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
  console.log('\nRaportul a fost generat cu succes in /docs/');
})();
