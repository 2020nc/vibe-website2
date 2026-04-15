/**
 * Recapitulare Modul 6, Lecția 1 — Barista Bot cu Claude AI
 * Generează DOCX și PDF
 */

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Packer, BorderStyle } = require('docx');
const { createPdf } = require('C:/Users/Admin/.claude/pdf-utils/createPdf.js');

const OUTPUT_DIR = 'k:/Video-Prelucrat/Vibe Coding/Proiect_01/docs';

// ─── CONȚINUT RECAPITULARE ────────────────────────────────────────────────────

const sections = [
  {
    title: 'Modul 6, Lecția 1 — Barista Bot cu Claude AI',
    type: 'main-title',
  },
  {
    title: 'Ce am construit azi?',
    type: 'heading',
    content: [
      'Un chatbot inteligent integrat în site-ul Vibe Caffè, alimentat de Claude AI (Anthropic). Utilizatorii pot întreba despre meniu, prețuri, program, opțiuni vegane și pot primi recomandări personalizate — direct din fereastra de chat de pe site.',
    ],
  },
  {
    title: '1. Knowledge Base (lib/knowledge-base.ts)',
    type: 'heading',
    content: [
      'Ce este: Un fișier TypeScript care conține toate informațiile pe care botul le cunoaște.',
      '',
      'Ce conține:',
      '• menuItems — toate cele 30 de produse cu: nume, preț, categorie, ingrediente, vegan (da/nu)',
      '• categories — cele 6 categorii cu emoji-uri (☕ Espresso, 🌱 Vegan, ❄️ Cold etc.)',
      '• cafeInfo — program (08:00-22:00), adresă, facilități (WiFi, pet-friendly), rezervări',
      '• recommendations — cel mai popular, cel mai ieftin, cel mai scump, opțiuni vegane',
      '• KNOWLEDGE_BASE — un string mare care combină toate datele de mai sus, gata de trimis ca system prompt către Claude AI',
      '',
      'De ce e important: Botul știe exact ce produse există și la ce prețuri. Nu inventează informații.',
    ],
  },
  {
    title: '2. Personalitatea Botului',
    type: 'heading',
    content: [
      'Am ales o personalitate mixtă din 3 variante propuse:',
      '',
      '• Vibe (entuziast) + Sofia (expert) + Max (umoristic) = personalitate echilibrată',
      '',
      'Reguli de comportament salvate în KNOWLEDGE_BASE:',
      '• Vorbește ca o persoană reală, nu ca un robot',
      '• Cunoaște cafeaua bine, fără să fie snob',
      '• Umor ușor și natural — 1-2 emoji per răspuns',
      '• Răspunsuri scurte (max 3-4 propoziții)',
      '• Când clientul e indecis, oferă 2 opțiuni concrete',
      '• Nu inventează informații',
    ],
  },
  {
    title: '3. ChatWidget.tsx — Interfața de Chat',
    type: 'heading',
    content: [
      'Componenta React care afișează fereastra de chat pe site.',
      '',
      'Funcționalități implementate:',
      '• Buton floating rotund în colțul dreapta-jos, cu animație pulse când e închis',
      '• Header cu numele botului "Vibe • Asistent virtual • Online"',
      '• Message bubbles diferite: user (teal, dreapta) și bot (alb cu shadow, stânga)',
      '• Typing indicator — 3 puncte animate când botul "scrie"',
      '• Auto-scroll la ultimul mesaj',
      '• Enter trimite mesajul, input se golește după trimitere',
      '• Quick replies — butoane cu sugestii rapide',
      '• Markdown rendering — **bold** și *italic* afișate corect',
      '• Mesaj de eroare prietenos dacă API-ul nu răspunde',
      '',
      'Adăugat în app/layout.tsx → apare pe toate paginile site-ului.',
    ],
  },
  {
    title: '4. API Endpoint (app/api/chat/route.ts)',
    type: 'heading',
    content: [
      'Endpoint-ul care face legătura între ChatWidget și Claude AI.',
      '',
      'Cum funcționează:',
      '1. ChatWidget trimite POST /api/chat cu { message, conversationHistory }',
      '2. Endpoint-ul construiește mesajele pentru Claude: system prompt + ultimele 6 mesaje + mesajul nou',
      '3. Trimite cererea la Anthropic API folosind ANTHROPIC_API_KEY din .env.local',
      '4. Primește răspunsul și îl returnează la ChatWidget',
      '5. ChatWidget afișează răspunsul ca bubble de bot',
      '',
      'Detalii tehnice:',
      '• Model: claude-sonnet-4-5-20250929',
      '• max_tokens: 300 (răspunsuri complete, nu tăiate)',
      '• Ultimele 6 mesaje ca context (botul "ține minte" conversația)',
      '• SDK: @anthropic-ai/sdk',
    ],
  },
  {
    title: '5. Probleme Rezolvate pe Parcurs',
    type: 'heading',
    content: [
      'a) Eroare Edge Runtime cu crypto:',
      '   Cauză: Funcțiile de login/change-password foloseau modulul Node.js "crypto" incompatibil cu Edge Runtime.',
      '   Soluție: Înlocuit cu Web Crypto API (crypto.subtle.digest) — funcționează în orice runtime.',
      '',
      'b) Turbopack afișa erori vechi din cache:',
      '   Cauză: Bug cunoscut în Turbopack cu detectarea modulelor Node.js.',
      '   Soluție: Trecut la webpack cu flag-ul --webpack în package.json.',
      '',
      'c) Markdown afișat ca text brut (**bold** în loc de bold):',
      '   Cauză: Claude AI răspunde cu markdown, dar React îl afișa ca text simplu.',
      '   Soluție: Funcție renderMarkdown() care parsează **bold** și *italic* în elemente React.',
    ],
  },
  {
    title: '6. Testare și Rezultate',
    type: 'heading',
    content: [
      'Toate întrebările de test au primit răspunsuri corecte:',
      '',
      '✅ "Ce cafea recomandați?" → Recomandă Cappuccino, Flat White, Nitro Cold Brew cu prețuri corecte',
      '✅ "Aveți opțiuni vegane?" → Listează toate 9 opțiuni vegane cu prețuri',
      '✅ "Cât costă un cappuccino?" → 16 lei — preț corect din knowledge base',
      '✅ "Ce program aveți?" → 08:00-22:00 zilnic, last call 21:30',
      '✅ "Vreau ceva dulce" → Recomandă Caramel Macchiato, Mocha, Affogato, Brownie, Tiramisu',
    ],
  },
  {
    title: '7. Concepte Cheie Învățate',
    type: 'heading',
    content: [
      '• System Prompt — instrucțiunile date AI-ului despre cine este și ce știe',
      '• Knowledge Base — baza de cunoștințe structurată pe care o folosește botul',
      '• Conversation History — păstrarea contextului pentru conversații coerente',
      '• max_tokens — limitarea lungimii răspunsurilor AI',
      '• Edge Runtime vs Node.js Runtime — diferența în Next.js API routes',
      '• Web Crypto API — alternativa nativă la modulul crypto din Node.js',
      '• Markdown rendering în React — parsarea și afișarea formatării text',
    ],
  },
  {
    title: 'Structura Fișierelor Modificate',
    type: 'heading',
    content: [
      'lib/knowledge-base.ts     → Baza de cunoștințe + KNOWLEDGE_BASE string',
      'components/ChatWidget.tsx → Interfața de chat (floating button + fereastră)',
      'app/api/chat/route.ts     → Endpoint Claude AI',
      'app/layout.tsx            → ChatWidget adăugat pe toate paginile',
      'app/api/admin/login/route.ts         → Fix crypto → Web Crypto',
      'app/api/admin/change-password/route.ts → Fix crypto → Web Crypto',
      'package.json              → --webpack flag, @anthropic-ai/sdk',
      '.env.local                → ANTHROPIC_API_KEY adăugat',
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
      // Heading
      children.push(
        new Paragraph({
          text: section.title,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 200 },
        })
      );

      // Content lines
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
  const docxPath = path.join(OUTPUT_DIR, 'recap-m6-l1.docx');
  fs.writeFileSync(docxPath, buffer);
  console.log('✅ DOCX salvat:', docxPath);
}

// ─── GENERARE PDF ─────────────────────────────────────────────────────────────

function generatePdf() {
  const doc = createPdf({ margin: 50 });
  const pdfPath = path.join(OUTPUT_DIR, 'recap-m6-l1.pdf');
  doc.pipe(fs.createWriteStream(pdfPath));

  const W = doc.page.width - 100;

  // Title
  doc.font('Bold').fontSize(22).fillColor('#14B8A6')
     .text('Modul 6, Lecția 1 — Barista Bot cu Claude AI', 50, 50, { width: W, align: 'center' });
  doc.font('Italic').fontSize(10).fillColor('#666666')
     .text('Data: 15 aprilie 2026 | Curs Vibe Coding', { align: 'center' });
  doc.moveDown(1.5);

  for (const section of sections) {
    if (section.type === 'main-title') continue;

    // Check page space
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

console.log('📝 Generez recapitularea Modul 6, Lecția 1...');
generateDocx().then(() => {
  generatePdf();
  console.log('🎉 Done!');
}).catch(console.error);
