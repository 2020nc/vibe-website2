import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require('docx');
const { createPdf } = require('C:/Users/Admin/.claude/pdf-utils/createPdf.js');

const OUTPUT_DIR = 'k:/Video-Prelucrat/Vibe Coding/Proiect_01/docs';
const BASENAME = 'Raport-oficial-Vibe-Coding-si-CODEX-2026-04-16';

const meta = {
  title: 'Raport oficial de evaluare tehnică și de optimizare',
  subtitle:
    'Privind intervențiile realizate de Vibe Coding și optimizările suplimentare executate de CODEX pentru site-ul Vibe Caffè',
  date: '16 aprilie 2026',
  project: 'Vibe Caffè Website',
};

const sections = [
  {
    title: '1. Obiectul raportului',
    paragraphs: [
      'Prezentul document are caracter de raport oficial și a fost întocmit pentru a evalua în mod clar, documentat și profesionist intervențiile realizate asupra site-ului Vibe Caffè.',
      'Scopul principal al raportului este delimitarea exactă dintre contribuția executată de Vibe Coding și intervențiile suplimentare realizate ulterior de CODEX, pe baza analizelor furnizate de beneficiar, a verificării directe a codului sursă și a validării tehnice finale a aplicației.',
      'Raportul tratează exclusiv site-ul beneficiarului și nu face referire operațională la alte site-uri analizate în documentele comparative inițiale, decât în măsura în care acestea au influențat recomandările generale de optimizare.',
    ],
  },
  {
    title: '2. Baza documentară și metodologia de lucru',
    paragraphs: [
      'Analiza a avut la bază trei documente PDF furnizate de beneficiar, o captură a sesiunii de lucru în care erau prezentate modificările implementate de Vibe Coding și codul sursă local al proiectului activ.',
      'Metodologia utilizată a inclus: citirea și interpretarea documentelor PDF, verificarea directă a diferențelor din repository, inspecția fișierelor relevante, identificarea neconcordanțelor dintre recomandări și starea reală a codului, implementarea optimizărilor necesare și validarea finală prin build complet.',
      'Toate concluziile din prezentul raport au fost formulate pornind de la codul verificat efectiv și nu exclusiv de la afirmațiile descriptive din documentele externe.',
    ],
    bullets: [
      'Raport Final Corectat - Vibe Caffè 97_100.pdf',
      'recomandari_profesioniste_vibe_caffe.pdf',
      'recomandari_profesioniste_vibe_caffe_98.pdf',
      'Captura cu lista modificărilor prezentate de Vibe Coding',
      'Repository-ul local al proiectului Vibe Caffè',
    ],
  },
  {
    title: '3. Constatări privind intervenția Vibe Coding',
    paragraphs: [
      'În urma verificării directe, s-a constatat că Vibe Coding a executat o parte importantă dintre recomandările de rafinare, în special în zonele cu impact imediat asupra percepției vizuale și asupra utilității site-ului.',
      'Intervenția Vibe Coding a fost una reală și confirmabilă în cod. Nu a fost o intervenție fictivă sau doar declarativă. Totuși, aceasta nu a acoperit integral toate recomandările relevante rezultate din analizele profesioniste.',
    ],
    bullets: [
      'A eliminat blocul duplicat de navigație din pagina /sarbatori, remediind problema structurală cea mai vizibilă din analiza profesionistă.',
      'A curățat parțial limbajul mixt de pe homepage prin înlocuirea unor formulări română-engleză cu variante mai curate în limba română.',
      'A actualizat anul din footerul principal de la 2024 la 2026.',
      'A schimbat quick replies din asistentul virtual către variante mai utile comercial și mai apropiate de intențiile reale ale utilizatorului.',
      'A introdus o notă discretă în widgetul de chat, cu rol de orientare a utilizatorului în privința funcției vocale.',
    ],
  },
  {
    title: '4. Evaluarea profesională a muncii Vibe Coding',
    paragraphs: [
      'Evaluarea profesională corectă este că Vibe Coding a lucrat în direcția potrivită și a bifat elemente relevante, însă intervenția a rămas parțială din perspectiva unei închideri complete și mature a recomandărilor.',
      'Mai precis, Vibe Coding a atacat corect zonele de impact ridicat, dar nu a dus proiectul până la capăt în ceea ce privește consistența globală de limbaj, rafinarea tuturor microcopiilor publice, optimizarea anumitor blocuri de conversie și introducerea unui nivel minim de măsurare pentru asistentul virtual.',
      'Prin urmare, contribuția Vibe Coding trebuie evaluată ca utilă, validă și meritorie, dar incompletă în raport cu standardul final sugerat de analize.',
    ],
  },
  {
    title: '5. Aspecte rămase incomplete după intervenția Vibe Coding',
    bullets: [
      'Limbajul mixt nu era eliminat complet din toate zonele publice relevante.',
      'Metadata principală păstra încă expresii de tip work-friendly în formularea publică.',
      'Footerul secundar păstra text tehnic orientat către tehnologia folosită, nu către experiența clientului.',
      'Pagina Locație mai conținea zone prea compacte, în special în aria acțiunilor și în modul de afișare a facilităților.',
      'Pagina Rezervări păstra o linie informativă prea înghesuită, fără separarea clară a beneficiilor și regulilor.',
      'Asistentul virtual nu avea încă un tracking minim pentru a putea fi evaluat ca instrument măsurabil de conversie.',
    ],
    paragraphs: [
      'Aceste elemente nu anulează meritele intervenției inițiale, dar explică de ce a fost necesară o a doua etapă de consolidare și finisare.',
    ],
  },
  {
    title: '6. Intervenția suplimentară realizată de CODEX',
    paragraphs: [
      'În urma auditului, CODEX a efectuat o rundă suplimentară de optimizare concentrată exclusiv pe zonele rămase incomplete sau insuficient rafinate.',
      'Intervenția CODEX a avut caracter de consolidare și închidere profesională. Nu a urmărit schimbarea inutilă a structurii bune deja existente, ci uniformizarea, clarificarea și maturizarea produsului digital rezultat.',
    ],
    bullets: [
      'A rescris metadata globală într-o formulare mai clară, coerentă și potrivită pentru prezentarea publică a site-ului.',
      'A uniformizat limbajul în elemente vizibile precum ReviewBar și în alte microcopii cu ton public.',
      'A eliminat textul tehnic din footerul public secundar și a introdus o formulare de brand, adecvată experienței comerciale.',
      'A rafinat mesajul newsletter-ului pentru a comunica beneficii concrete utilizatorului.',
      'A corectat un termen mixt din pagina Meniu, înlocuind smooth cu gust catifelat.',
      'A reorganizat acțiunile principale din pagina Locație în carduri CTA mai clare și mai bine aerisite vizual.',
      'A transformat facilitățile din pagina Locație într-o prezentare mai lizibilă și mai ușor de parcurs.',
      'A reconfigurat banda informativă din pagina Rezervări într-o structură cu trei blocuri distincte, pentru claritate și ierarhie vizuală.',
      'A introdus tracking minim în widgetul de chat pentru interacțiunile esențiale ale utilizatorului.',
      'A verificat stabilitatea modificărilor prin build complet al aplicației.',
    ],
  },
  {
    title: '7. Delimitarea contribuțiilor',
    paragraphs: [
      'Pentru acuratețea arhivării și a evaluării tehnice, delimitarea contribuțiilor trebuie formulată explicit.',
      'Vibe Coding este autorul unei prime runde de remedieri și de rafinare punctuală, confirmate în cod și validate în mod direct.',
      'CODEX este autorul etapei suplimentare de audit, de completare a recomandărilor rămase deschise, de uniformizare a produsului și de validare finală prin verificare tehnică.',
      'În termeni simpli, Vibe Coding a corectat o parte relevantă a problemelor semnalate, iar CODEX a finalizat profesional această direcție de lucru și a adus produsul într-o stare mai solidă și mai coerentă.',
    ],
  },
  {
    title: '8. Fișiere în care s-au confirmat intervențiile Vibe Coding',
    bullets: [
      'app/sarbatori/page.tsx',
      'app/page.tsx',
      'components/Footer.tsx',
      'components/ChatWidget.tsx',
    ],
  },
  {
    title: '9. Fișiere optimizate suplimentar de CODEX',
    bullets: [
      'app/layout.tsx',
      'app/locatie/page.tsx',
      'app/meniu/page.tsx',
      'app/rezervari/page.tsx',
      'components/ChatWidget.tsx',
      'components/FooterStarter.tsx',
      'components/ReviewBar.tsx',
    ],
  },
  {
    title: '10. Verificări tehnice finale',
    bullets: [
      'Verificarea directă a fișierelor și a diferențelor de cod relevante pentru intervenția Vibe Coding.',
      'Confirmarea existenței și a conținutului documentelor PDF furnizate de beneficiar.',
      'Verificarea zonelor-cheie ale site-ului: Acasă, Meniu, Locație, Rezervări, Sărbători, Footer și Chat.',
      'Confirmarea introducerii trackingului de bază pentru interacțiunile importante din widgetul de chat.',
      'Rulare build complet Next.js după optimizările suplimentare executate de CODEX.',
    ],
    paragraphs: [
      'Build-ul final al aplicației a trecut cu succes, ceea ce confirmă că optimizările introduse ulterior nu au degradat compilarea și nu au introdus erori de validare TypeScript în fluxul principal de build.',
    ],
  },
  {
    title: '11. Concluzia oficială',
    paragraphs: [
      'Concluzia oficială a prezentului raport este că Vibe Coding a executat corect și util o parte importantă dintre recomandările de optimizare pentru site-ul Vibe Caffè, însă intervenția sa nu a reprezentat o închidere completă a tuturor direcțiilor de rafinare evidențiate în analizele profesioniste.',
      'CODEX a realizat ulterior o intervenție suplimentară cu rol de audit, completare, uniformizare și validare finală, aducând site-ul într-o stare mai coerentă, mai matură și mai bine aliniată la standardul sugerat de recomandările inițiale.',
      'Rezultatul final este, așadar, unul cumulativ: o primă etapă utilă și confirmată executată de Vibe Coding, urmată de o etapă de consolidare și de finisare profesionistă executată de CODEX.',
    ],
  },
  {
    title: '12. Formulare sintetică pentru arhivă sau prezentare',
    paragraphs: [
      'Vibe Coding a implementat corect o parte relevantă dintre recomandările de optimizare pentru site-ul Vibe Caffè, în special pe zona de structură, copy și asistent virtual. CODEX a verificat aceste intervenții, a confirmat contribuțiile valide, a optimizat suplimentar zonele rămase incomplete și a validat tehnic rezultatul final prin build complet. Forma actuală a site-ului reflectă atât contribuția inițială a Vibe Coding, cât și etapa ulterioară de consolidare executată de CODEX.',
    ],
  },
];

function para(text, options = {}) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22, ...options })],
    spacing: { after: 140 },
  });
}

function bullet(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22 })],
    bullet: { level: 0 },
    spacing: { after: 80 },
  });
}

async function generateDocx() {
  const children = [
    new Paragraph({
      text: meta.title,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 180 },
    }),
    new Paragraph({
      children: [new TextRun({ text: meta.subtitle, italics: true, color: '666666' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
    }),
    new Paragraph({
      children: [new TextRun({ text: `${meta.project} | ${meta.date}`, color: '666666' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 340 },
    }),
  ];

  for (const section of sections) {
    children.push(
      new Paragraph({
        text: section.title,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 220, after: 120 },
      })
    );

    for (const paragraph of section.paragraphs || []) {
      children.push(para(paragraph));
    }

    for (const item of section.bullets || []) {
      children.push(bullet(item));
    }
  }

  const doc = new Document({ sections: [{ children }] });
  const outPath = path.join(OUTPUT_DIR, `${BASENAME}.docx`);
  fs.writeFileSync(outPath, await Packer.toBuffer(doc));
  console.log(`DOCX generat: ${outPath}`);
}

function generatePdf() {
  const pdf = createPdf({ margin: 50 });
  const outPath = path.join(OUTPUT_DIR, `${BASENAME}.pdf`);
  pdf.pipe(fs.createWriteStream(outPath));

  const width = pdf.page.width - 100;

  pdf.font('Bold').fontSize(18).fillColor('#0F766E')
    .text(meta.title, 50, 50, { width, align: 'center' });
  pdf.moveDown(0.3);
  pdf.font('Italic').fontSize(10).fillColor('#6B7280')
    .text(meta.subtitle, { width, align: 'center' });
  pdf.moveDown(0.2);
  pdf.font('Regular').fontSize(10).fillColor('#6B7280')
    .text(`${meta.project} | ${meta.date}`, { width, align: 'center' });
  pdf.moveDown(1.2);

  for (const section of sections) {
    if (pdf.y > pdf.page.height - 120) {
      pdf.addPage();
    }

    pdf.font('Bold').fontSize(13).fillColor('#0F766E').text(section.title, { width });
    pdf.moveDown(0.25);

    for (const paragraph of section.paragraphs || []) {
      if (pdf.y > pdf.page.height - 90) {
        pdf.addPage();
      }
      pdf.font('Regular').fontSize(10).fillColor('#111827').text(paragraph, { width, lineGap: 3 });
      pdf.moveDown(0.35);
    }

    for (const item of section.bullets || []) {
      if (pdf.y > pdf.page.height - 80) {
        pdf.addPage();
      }
      pdf.font('Regular').fontSize(10).fillColor('#111827').text(`• ${item}`, { width, indent: 14, lineGap: 2 });
      pdf.moveDown(0.2);
    }

    pdf.moveDown(0.5);
  }

  pdf.end();
  console.log(`PDF generat: ${outPath}`);
}

console.log('Generez raportul oficial Vibe Coding + CODEX...');
await generateDocx();
generatePdf();
console.log('Raportul oficial a fost generat complet.');
