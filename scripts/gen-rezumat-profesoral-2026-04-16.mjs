import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require('docx');
const { createPdf } = require('C:/Users/Admin/.claude/pdf-utils/createPdf.js');

const OUTPUT_DIR = 'k:/Video-Prelucrat/Vibe Coding/Proiect_01/docs';
const BASENAME = 'rezumat-profesoral-2026-04-16';

const sections = [
  {
    title: 'Raport sintetic pentru evaluare',
    type: 'main-title',
  },
  {
    title: 'Date de identificare',
    type: 'heading',
    content: [
      'Data: 15–16 aprilie 2026.',
      'Proiect: Vibe Caffè Website.',
      'Tema sesiunii: extinderea widget-ului de chat cu funcționalități vocale complete — sinteză vocală (TTS) și recunoaștere vocală (STT) — și corectarea pronunției în limba română.',
    ],
  },
  {
    title: 'Obiective',
    type: 'heading',
    content: [
      'Adăugarea funcționalității de sinteză vocală (Text-to-Speech) pentru răspunsurile botului Barista.',
      'Adăugarea funcționalității de recunoaștere vocală (Speech-to-Text) pentru input-ul utilizatorului.',
      'Configurarea automată a trimiterii mesajului după dictare vocală.',
      'Optimizarea selecției vocii pentru limba română, cu preferință pentru voci feminine.',
      'Normalizarea textului pentru TTS: abrevieri, simboluri, emoji-uri și cuvinte englezești.',
      'Corectarea pronunției cuvintelor englezești specifice contextului cafenelei.',
      'Consolidarea structurii proiectului prin eliminarea componentelor redundante.',
    ],
  },
  {
    title: 'Metodologie',
    type: 'heading',
    content: [
      'A fost creat hook-ul useSpeechSynthesis.ts pentru encapsularea logicii TTS, cu suport pentru selecția vocii române feminine și normalizarea textului înainte de redare.',
      'A fost creat hook-ul useSpeechRecognition.ts pentru gestionarea Web Speech API, cu suport pentru limba română și trimitere automată după finalizarea dictării.',
      'Componenta ChatWidget.tsx a fost extinsă cu butoane de control vocal (microfon pentru input, difuzor pentru output) și indicatori de stare vizuali.',
      'Au fost realizate iterații succesive de testare în browser și ajustare a selecției vocii, finalizând cu varianta optimă pentru Chrome.',
      'A fost efectuat cleanup tehnic prin unificarea componentei de chat și eliminarea fișierelor deprecate.',
      'Au fost adăugate transcrieri fonetice pentru cuvinte englezești frecvente în contextul cafenelei.',
      'A fost întărită regula din system prompt-ul botului pentru utilizarea diacriticelor corecte în limba română.',
    ],
  },
  {
    title: 'Intervenții realizate',
    type: 'heading',
    content: [
      'Hook useSpeechSynthesis.ts: implementare TTS cu selecție voce română (preferință feminină), rată și tonalitate ajustate, funcție normalizeSpeechText cu peste 30 de reguli de transformare.',
      'Hook useSpeechRecognition.ts: implementare STT cu Web Speech API, limbă română, trimitere automată după dictare, gestionare erori și stări.',
      'ChatWidget.tsx: integrare completă a ambelor hook-uri, buton microfon cu stare vizuală activă, buton „Ascultă" pe răspunsurile botului, stabilizare layout la actualizarea mesajelor.',
      'Normalizare TTS: transcrieri fonetice pentru termeni englezești (cold brew → cold bru, flat white → flat uait, wifi → uai fai, brownie → brauni, croissant → cruasant etc.).',
      'Corecții diacritice în TTS: fallback pentru cuvinte frecvent scrise fără accent (costa → costă, exista → există, poti → poți).',
      'Knowledge base: adăugare link-uri markdown către paginile de locație și rezervări, pentru răspunsuri contextuale cu navigare directă.',
      'System prompt: întărirea regulii de diacritice cu exemple explicite obligatorii.',
      'Cleanup: eliminare ChatWidgetV2.tsx, useSpeechSynthesisV2.ts, middleware.ts; unificare în ChatWidget.tsx unic; actualizare .gitignore.',
    ],
  },
  {
    title: 'Rezultate',
    type: 'heading',
    content: [
      'Utilizatorul poate activa redarea vocală a răspunsurilor botului cu un singur click pe butonul „Ascultă".',
      'Utilizatorul poate dicta mesaje în limba română, iar acestea sunt trimise automat după finalizarea dictării.',
      'Pronunția cuvintelor englezești specifice cafenelei este corectă și naturală în română.',
      'Botul scrie răspunsurile cu diacritice corecte în mod consistent.',
      'Link-urile contextuale din răspunsurile botului permit navigarea directă la paginile relevante.',
      'Structura proiectului este curată, fără componente duplicate sau fișiere neutilizate.',
      'Toate modificările sunt publicate pe GitHub și disponibile în producție.',
    ],
  },
  {
    title: 'Tehnologii utilizate',
    type: 'heading',
    content: [
      'Web Speech API — SpeechSynthesis (TTS) și SpeechRecognition (STT), native în browser.',
      'React Hooks — arhitectură custom hooks pentru izolarea logicii vocale.',
      'Next.js App Router — integrare seamless cu componente client.',
      'Anthropic Claude API — backend pentru generarea răspunsurilor botului.',
      'TypeScript strict mode — tipizare completă pentru toate hook-urile și componentele.',
    ],
  },
  {
    title: 'Concluzii',
    type: 'heading',
    content: [
      'Sesiunea a adăugat un strat de accesibilitate semnificativ widget-ului de chat, transformând interacțiunea text-only într-o experiență vocală completă.',
      'Abordarea iterativă — testare în browser după fiecare modificare — a permis ajustarea fină a comportamentului vocal până la un rezultat natural pentru utilizator.',
      'Din perspectiva evaluării, activitatea demonstrează utilizarea API-urilor native de browser, arhitectura cu custom hooks, integrare full-stack și atenție la detalii de UX (pronunție, diacritice, feedback vizual).',
    ],
  },
];

async function generateDocx() {
  const children = [];

  for (const section of sections) {
    if (section.type === 'main-title') {
      children.push(
        new Paragraph({
          text: section.title,
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          spacing: { after: 260 },
        })
      );
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'Proiect: Vibe Caffè Website | Format: variantă pentru predare',
              italics: true,
              color: '666666',
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 420 },
        })
      );
      continue;
    }

    children.push(
      new Paragraph({
        text: section.title,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 250, after: 130 },
      })
    );

    for (const line of section.content || []) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: line, size: 22 })],
          spacing: { after: 120 },
        })
      );
    }
  }

  const doc = new Document({
    sections: [{ children }],
  });

  const outPath = path.join(OUTPUT_DIR, `${BASENAME}.docx`);
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outPath, buffer);
  console.log(`DOCX generat: ${outPath}`);
}

function generatePdf() {
  const doc = createPdf({ margin: 50 });
  const outPath = path.join(OUTPUT_DIR, `${BASENAME}.pdf`);
  doc.pipe(fs.createWriteStream(outPath));

  const width = doc.page.width - 100;

  doc.font('Bold').fontSize(18).fillColor('#14B8A6')
    .text('Raport sintetic pentru evaluare', 50, 50, { width, align: 'center' });
  doc.font('Italic').fontSize(10).fillColor('#666666')
    .text('Proiect: Vibe Caffè Website | Variantă profesorală', { width, align: 'center' });
  doc.moveDown(1.4);

  for (const section of sections) {
    if (section.type === 'main-title') continue;

    if (doc.y > doc.page.height - 120) {
      doc.addPage();
    }

    doc.font('Bold').fontSize(13).fillColor('#0D9488').text(section.title, { width });
    doc.moveDown(0.25);
    doc.moveTo(50, doc.y).lineTo(50 + width, doc.y).strokeColor('#14B8A6').lineWidth(0.6).stroke();
    doc.moveDown(0.35);

    for (const line of section.content || []) {
      if (doc.y > doc.page.height - 70) {
        doc.addPage();
      }
      doc.font('Regular').fontSize(10).fillColor('#1F2937').text(line, { width, lineGap: 2 });
      doc.moveDown(0.22);
    }

    doc.moveDown(0.5);
  }

  doc.end();
  console.log(`PDF generat: ${outPath}`);
}

console.log('Generez varianta profesorală pentru 15-16 aprilie 2026...');
await generateDocx();
generatePdf();
console.log('Gata.');
