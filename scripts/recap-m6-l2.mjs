/**
 * Recapitulare Modul 6, Lecția 2 — Quick Replies, Link-uri, Guardrails și Redesign ChatWidget
 * Generează DOCX și PDF
 */

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Packer } = require('docx');
const { createPdf } = require('C:/Users/Admin/.claude/pdf-utils/createPdf.js');

const OUTPUT_DIR = 'k:/Video-Prelucrat/Vibe Coding/Proiect_01/docs';

// ─── CONȚINUT RECAPITULARE ────────────────────────────────────────────────────

const sections = [
  {
    title: 'Modul 6, Lecția 2 — Quick Replies, Link-uri, Guardrails și Redesign ChatWidget',
    type: 'main-title',
  },
  {
    title: 'Ce am construit azi?',
    type: 'heading',
    content: [
      'Am îmbunătățit ChatWidget-ul Barista Bot cu patru funcționalități noi: butoane rapide (quick replies) contextuale, link-uri clickabile în chat, reguli stricte de comportament (guardrails) în system prompt, și un redesign complet adaptat design system-ului site-ului. La final, am făcut deploy pe Vercel cu ANTHROPIC_API_KEY configurată.',
    ],
  },
  {
    title: '1. Quick Replies — Butoane Rapide',
    type: 'heading',
    content: [
      'Ce sunt: Butoane afișate sub mesajele botului care permit trimiterea unui mesaj cu un singur click.',
      '',
      'Cum funcționează:',
      '• La deschiderea chat-ului apar 4 butoane inițiale: „Vezi meniu", „Recomandări", „Rezervări", „Program"',
      '• Click pe buton = trimite mesajul exact ca și cum l-ar fi scris userul',
      '• Butoanele apar doar sub ultimul mesaj al botului (nu pe tot istoricul)',
      '',
      'Quick replies contextuale — după răspunsul botului:',
      '• Dacă botul vorbește despre meniu/cafea → „Opțiuni vegane", „Deserturi", „Cafea rece"',
      '• Dacă botul vorbește despre rezervări → „Fă o rezervare", „Program"',
      '',
      'Butoanele dispar automat când userul scrie un mesaj propriu (flag userTyped).',
      '',
      'Implementare tehnică:',
      '• State nou: userTyped (boolean) — devine true la prima tastare manuală',
      '• Parametru isQuickReply în handleSendMessage() — diferențiază click de tastare',
      '• Funcție getContextualReplies(responseText) — detectează cuvinte cheie în răspunsul botului',
      '• showReplies — condiție: !userTyped && isLastBotMessage && quickReplies.length > 0',
    ],
  },
  {
    title: '2. Link-uri Clickabile în Chat',
    type: 'heading',
    content: [
      'Problema: Claude AI răspunde cu link-uri în format markdown [text](url), dar erau afișate ca text brut.',
      '',
      'Soluție: Extins funcția renderMarkdown() cu suport pentru link-uri markdown.',
      '',
      'Cum funcționează renderMarkdown() acum:',
      '• **bold** → element <strong>',
      '• *italic* → element <em>',
      '• [text](url) → element <a> cu href și styling',
      '• \\n → element <br>',
      '',
      'Detalii implementare:',
      '• Link-uri interne (/rezervari, /meniu) → navigare normală în site (fără target)',
      '• Link-uri externe (https://...) → deschis în tab nou cu target="_blank" și rel="noopener noreferrer"',
      '• Stilizare: underline + font-semibold + hover:opacity-80',
      '',
      'Actualizări knowledge base pentru link-uri:',
      '• Secțiunea REZERVĂRI include: [Fă o rezervare](/rezervari)',
      '• Secțiunea MENIU include: [Vezi meniul complet](/meniu)',
      '• Instrucțiune în system prompt: „Când userul vrea să facă o acțiune, oferă link-ul relevant"',
    ],
  },
  {
    title: '3. Guardrails — Reguli Stricte în System Prompt',
    type: 'heading',
    content: [
      'Am adăugat 7 reguli stricte de comportament în KNOWLEDGE_BASE pentru a preveni răspunsuri greșite:',
      '',
      '1. NU inventa produse sau prețuri — folosește DOAR datele din knowledge base',
      '2. NU vorbi despre alte cafenele, restaurante sau competitori',
      '3. NU da sfaturi medicale sau nutriționale complexe',
      '4. Răspunsuri SCURTE — maxim 2-3 propoziții per mesaj',
      '5. Dacă nu știi răspunsul → „Nu am informația asta, dar ne poți contacta la office@vibecaffe.ro"',
      '6. Rămâi pe tema cafenelei — dacă userul întreabă altceva, redirecționează politicos',
      '7. Scrie întotdeauna în română cu diacritice corecte (ă, â, î, ș, ț)',
      '',
      'Rezultate testare guardrails:',
      '✅ „Cum e vremea?" → „Sunt specialistă doar în cafeaua Vibe ☕ Cu ce te pot ajuta la noi?"',
      '✅ „Aveți Unicorn Frappuccino?" → Nu inventează preț, oferă alternative reale',
      '✅ „Aveți frappucino?" → Menționează că e marcă Starbucks, oferă Cold Brew-uri din meniu',
    ],
  },
  {
    title: '4. Redesign ChatWidget — Design System Consistent',
    type: 'heading',
    content: [
      'Am rescris stilurile ChatWidget să folosească CSS variables din globals.css în loc de culori hardcodate.',
      '',
      'Schimbări principale:',
      '• Buton floating: from-[var(--primary)] to-[var(--primary-dark)] — preia automat culoarea din tema',
      '• Header: gradient primar + font Plus Jakarta Sans via var(--font-plus-jakarta-sans)',
      '• Bubble user: bg-[var(--primary)] în loc de bg-[#14B8A6] hardcodat',
      '• Quick replies: border-[var(--primary)] text-[var(--primary)] — consistent cu design system-ul',
      '• Border-radius: rounded-2xl consistent (în loc de rounded-3xl mixt)',
      '• Typing indicator: punctele animate folosesc culoarea primară',
      '',
      'Layout mobil full-screen (cerință nouă):',
      '• Pe mobil (< sm): fixed inset-0 rounded-none — fereastra ocupă tot ecranul',
      '• Pe desktop (sm+): relative w-[380px] h-[600px] rounded-2xl — fereastra flotantă',
      '• Butonul floating dispare când chat-ul e deschis pe mobil (nu se suprapune)',
      '',
      'Variabile CSS folosite:',
      '• --primary: #14B8A6 (Teal)',
      '• --primary-dark: #0D9488',
      '• --secondary: #F97316 (Orange — badge notificări)',
    ],
  },
  {
    title: '5. Testare Completă și Rezultate',
    type: 'heading',
    content: [
      'Toate scenariile testate pe localhost și pe Vercel (producție):',
      '',
      '✅ Quick replies funcționează — click pe fiecare buton trimite mesajul',
      '✅ „Ce cafea aveți?" → produse reale cu prețuri corecte + link meniu',
      '✅ „Aveți opțiuni vegane?" → lista celor 9 produse vegane cu prețuri exacte',
      '✅ „Vreau să fac o rezervare" → link clickabil [Fă o rezervare](/rezervari)',
      '✅ „Cum e vremea?" → redirecționare politicoasă, fără răspuns off-topic',
      '✅ „Cât costă Unicorn Frappuccino?" → nu inventează, oferă alternative reale',
      '✅ Pe mobil fereastra ocupă tot ecranul (full-screen)',
    ],
  },
  {
    title: '6. Deploy pe Vercel',
    type: 'heading',
    content: [
      'Pași realizați pentru deploy:',
      '1. git commit — „feat: enhance ChatWidget with quick replies, links, guardrails and redesign (M6 L2)"',
      '2. git push → Vercel a detectat automat push-ul și a pornit build-ul',
      '3. Build: Ready în 40 secunde (deploy automat)',
      '4. Problemă depistată: ANTHROPIC_API_KEY lipsea din Environment Variables Vercel',
      '5. Soluție: adăugat cheia în Settings → Environment Variables → All Environments',
      '6. Redeploy → chatbot funcțional pe producție',
      '',
      'Site live: vibe-website2.vercel.app',
    ],
  },
  {
    title: '7. Concepte Cheie Învățate',
    type: 'heading',
    content: [
      '• Quick Replies — butoane de răspuns rapid care îmbunătățesc UX-ul unui chatbot',
      '• Contextual Replies — detectarea temei conversației pentru sugestii relevante',
      '• userTyped flag — pattern pentru a distinge interacțiunea manuală de cea automată',
      '• Markdown Links în React — parsarea [text](url) și randarea ca element <a>',
      '• CSS Variables în Tailwind — bg-[var(--primary)] pentru design system consistent',
      '• Guardrails AI — reguli stricte în system prompt pentru comportament predictibil',
      '• Environment Variables Vercel — configurarea cheilor API pentru producție',
      '• Responsive Chat — fixed inset-0 pe mobil vs. relative pe desktop',
    ],
  },
  {
    title: 'Structura Fișierelor Modificate',
    type: 'heading',
    content: [
      'components/ChatWidget.tsx  → Quick replies, renderMarkdown cu link-uri, redesign CSS vars, mobil full-screen',
      'lib/knowledge-base.ts      → Link-uri în system prompt, secțiuni REZERVĂRI și MENIU, 7 guardrails',
    ],
  },
];

// ─── GENERARE DOCX ────────────────────────────────────────────────────────────

async function generateDocx() {
  const children = [];

  for (const section of sections) {
    if (section.type === 'main-title') {
      children.push(
        new Paragraph({
          text: section.title,
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        })
      );
      children.push(
        new Paragraph({
          children: [new TextRun({ text: 'Data: 15 aprilie 2026 | Curs Vibe Coding', italics: true, color: '666666' })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
        })
      );
    } else {
      children.push(
        new Paragraph({
          text: section.title,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 200 },
        })
      );

      for (const line of section.content || []) {
        if (line === '') {
          children.push(new Paragraph({ text: '', spacing: { after: 100 } }));
        } else {
          children.push(
            new Paragraph({
              children: [new TextRun({ text: line, size: 22 })],
              spacing: { after: 120 },
            })
          );
        }
      }
    }
  }

  const doc = new Document({
    sections: [{ children }],
    styles: {
      paragraphStyles: [
        {
          id: 'Title',
          name: 'Title',
          run: { size: 52, bold: true, color: '14B8A6' },
        },
        {
          id: 'Heading2',
          name: 'Heading 2',
          run: { size: 28, bold: true, color: '0D9488' },
        },
      ],
    },
  });

  const buffer = await Packer.toBuffer(doc);
  const docxPath = path.join(OUTPUT_DIR, 'recap-m6-l2.docx');
  fs.writeFileSync(docxPath, buffer);
  console.log('✅ DOCX salvat:', docxPath);
}

// ─── GENERARE PDF ─────────────────────────────────────────────────────────────

function generatePdf() {
  const doc = createPdf({ margin: 50 });
  const pdfPath = path.join(OUTPUT_DIR, 'recap-m6-l2.pdf');
  doc.pipe(fs.createWriteStream(pdfPath));

  const W = doc.page.width - 100;

  // Title
  doc.font('Bold').fontSize(18).fillColor('#14B8A6')
     .text('Modul 6, Lecția 2 — Quick Replies, Link-uri,', 50, 50, { width: W, align: 'center' });
  doc.font('Bold').fontSize(18).fillColor('#14B8A6')
     .text('Guardrails și Redesign ChatWidget', { width: W, align: 'center' });
  doc.font('Italic').fontSize(10).fillColor('#666666')
     .text('Data: 15 aprilie 2026 | Curs Vibe Coding', { align: 'center' });
  doc.moveDown(1.5);

  for (const section of sections) {
    if (section.type === 'main-title') continue;

    if (doc.y > doc.page.height - 150) doc.addPage();

    // Section heading
    doc.font('Bold').fontSize(13).fillColor('#0D9488')
       .text(section.title, { width: W });
    doc.moveDown(0.3);

    // Underline
    doc.moveTo(50, doc.y).lineTo(50 + W, doc.y).strokeColor('#14B8A6').lineWidth(0.5).stroke();
    doc.moveDown(0.4);

    // Content
    for (const line of section.content || []) {
      if (doc.y > doc.page.height - 80) doc.addPage();

      if (line === '') {
        doc.moveDown(0.4);
      } else {
        doc.font('Regular').fontSize(10).fillColor('#1F2937')
           .text(line, { width: W });
        doc.moveDown(0.2);
      }
    }

    doc.moveDown(0.8);
  }

  doc.end();
  console.log('✅ PDF salvat:', pdfPath);
}

// ─── RUN ─────────────────────────────────────────────────────────────────────

console.log('📝 Generez recapitularea Modul 6, Lecția 2...');
generateDocx().then(() => {
  generatePdf();
  console.log('🎉 Done!');
}).catch(console.error);
