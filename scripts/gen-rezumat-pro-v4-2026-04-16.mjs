import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require('docx');
const { createPdf } = require('C:/Users/Admin/.claude/pdf-utils/createPdf.js');

const OUTPUT_DIR = 'k:/Video-Prelucrat/Vibe Coding/Proiect_01/docs';
const BASENAME = 'rezumat-pro-v4-2026-04-16';

const sections = [
  {
    title: 'Raport tehnic — Modulul 6 Lecția 2 Pro V4',
    type: 'main-title',
  },
  {
    title: 'Date de identificare',
    type: 'heading',
    content: [
      'Data: 16 aprilie 2026.',
      'Proiect: Vibe Caffè Website — vibe-website2.vercel.app.',
      'Tema sesiunii: îmbunătățiri UX pentru ChatWidget — buton „Ascultă" sticky, gestionarea opririi vocii la închiderea ferestrei, redimensionarea ferestrei chat și restilizarea textului de ajutor.',
    ],
  },
  {
    title: 'Obiective sesiune',
    type: 'heading',
    content: [
      '1. Butonul „Ascultă" să rămână vizibil indiferent de scroll în fereastra de chat.',
      '2. Oprirea vocii la închiderea ferestrei și semnalizare vizuală la redeschidere.',
      '3. Fereastra chat să nu depășească înălțimea viewport-ului și să nu acopere navbar-ul.',
      '4. Textul de ajutor din footer să fie mai compact și stilizat profesionist.',
    ],
  },
  {
    title: 'Probleme identificate',
    type: 'heading',
    content: [
      'Butonul „Ascultă" era poziționat lângă fiecare mesaj bot în zona scroll-abilă — dispărea la derulare.',
      'Fereastra chat avea înălțime fixă sm:h-[600px], depășind viewport-ul la zoom 100%.',
      'La închiderea ferestrei, sinteza vocală (TTS) continua în fundal fără oprire.',
      'Textul „Te pot ajuta cu: meniu, rezervari, program si locatie. Apasa microfonul pentru dictare." era prea mare și nestilistizat.',
    ],
  },
  {
    title: 'Soluții implementate',
    type: 'heading',
    content: [
      'Buton „Ascultă" sticky mutat în footer (shrink-0) — mereu vizibil, referit la ultimul mesaj bot. Eliminat butonul per-mesaj din zona scroll-abilă.',
      'Înălțime fereastră: sm:h-[600px] → sm:max-h-[min(600px,calc(100vh-90px))] — se adaptează la viewport și nu acoperă navbar-ul (90px rezervat).',
      'Logică pauză/reluare: la închiderea ferestrei în timp ce TTS-ul este activ, vocea se oprește și se salvează mesajul în state. La redeschidere, butonul apare portocaliu (var --secondary) cu animație pulse și textul „▶ Ascultă din nou". Apăsând butonul, mesajul se reia de la început (limitare Web Speech API — nu suportă resume din mijloc).',
      'Textul de ajutor restilizat ca pill compact: fundal teal transparent (bg-[var(--primary)]/10), border teal subtil, font 10px bold, whitespace-nowrap cu text-ellipsis, conținut scurtat la „🎤 Meniu · Rezervări · Program · Locație".',
    ],
  },
  {
    title: 'Fișiere modificate',
    type: 'heading',
    content: [
      'components/ChatWidget.tsx — toate modificările sesiunii.',
    ],
  },
  {
    title: 'Detalii tehnice',
    type: 'heading',
    content: [
      'State nou adăugat: pausedSpeech: { id, text } | null — pentru a putea reda indicatorul vizual la redeschidere.',
      'Ref nou: pausedSpeakRef — pentru accesul sincron la mesajul întrerupt.',
      'useEffect monitorizează isOpen: la tranziția true→false cu TTS activ, oprește vocea și salvează mesajul; la tranziția false→true nu mai reia automat (decizie UX: userul controlează reluarea).',
      'Butonul sticky folosește IIFE ((() => {})()) pentru a calcula lastBot și starea wasPaused direct în JSX.',
      'Limitare documentată: Web Speech API (window.speechSynthesis) nu expune o metodă de pause/resume cu poziție exactă în text — reluarea e întotdeauna de la începutul mesajului.',
    ],
  },
  {
    title: 'Probleme rămase pentru sesiunea următoare',
    type: 'heading',
    content: [
      'Pill-ul cu textul de ajutor se poate trunchia dacă fereastra e prea mică — de verificat pe mobile.',
      'Fereastra chat poate în continuare acopera navbar-ul pe rezoluții nestandard — de testat pe Vercel.',
      'Butonul „Ascultă din nou" apare portocaliu doar pentru ultimul mesaj bot — de discutat dacă e corect sau trebuie să apară pentru orice mesaj întrerupt.',
    ],
  },
  {
    title: 'Commit și deployment',
    type: 'heading',
    content: [
      'Commit: f25937e — feat: M6 L2 Pro V4 — ChatWidget UX improvements.',
      'Branch: main.',
      'Push: origin/main — Vercel auto-deploy declanșat.',
      'Status Vercel: Ready în 41 secunde (deployment 6NSguHCWx).',
    ],
  },
  {
    title: 'Concluzie',
    type: 'heading',
    content: [
      'Sesiunea Pro V4 a adus îmbunătățiri vizibile în experiența utilizatorului cu ChatWidget-ul Vibe Caffè: butonul de ascultare este acum mereu accesibil, vocea se oprește civilizat la închiderea ferestrei, iar interfața este mai bine proporționată față de viewport. Rămân câteva aspecte de rafinat în sesiunea următoare, în special comportamentul pe rezoluții mici și feedback-ul vizual al stării de pauză.',
    ],
  },
];

// ─── DOCX ────────────────────────────────────────────────────────────────────

function buildDocx() {
  const children = [];

  for (const sec of sections) {
    if (sec.type === 'main-title') {
      children.push(
        new Paragraph({
          text: sec.title,
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        })
      );
    } else {
      children.push(
        new Paragraph({
          text: sec.title,
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 100 },
        })
      );
      for (const line of sec.content || []) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: line, size: 22 })],
            spacing: { after: 100 },
          })
        );
      }
    }
  }

  return new Document({ sections: [{ children }] });
}

// ─── PDF ─────────────────────────────────────────────────────────────────────

function buildPdf(outPath) {
  const doc = createPdf();
  const stream = fs.createWriteStream(outPath);
  doc.pipe(stream);

  const pageWidth = doc.page.width - 100;

  for (const sec of sections) {
    if (sec.type === 'main-title') {
      doc.font('Bold').fontSize(18).text(sec.title, { align: 'center', width: pageWidth });
      doc.moveDown(1.2);
    } else {
      doc.font('Bold').fontSize(13).text(sec.title, { width: pageWidth });
      doc.moveDown(0.3);
      for (const line of sec.content || []) {
        doc.font('Regular').fontSize(10).text(line, { width: pageWidth });
        doc.moveDown(0.4);
      }
      doc.moveDown(0.4);
    }
  }

  doc.end();
  return new Promise(resolve => stream.on('finish', resolve));
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // DOCX
  const docxPath = path.join(OUTPUT_DIR, BASENAME + '.docx');
  const docxBuf = await Packer.toBuffer(buildDocx());
  fs.writeFileSync(docxPath, docxBuf);
  console.log('DOCX salvat:', docxPath);

  // PDF
  const pdfPath = path.join(OUTPUT_DIR, BASENAME + '.pdf');
  await buildPdf(pdfPath);
  console.log('PDF salvat:', pdfPath);
}

main().catch(err => { console.error(err); process.exit(1); });
