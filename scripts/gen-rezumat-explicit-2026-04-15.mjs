import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require('docx');
const { createPdf } = require('C:/Users/Admin/.claude/pdf-utils/createPdf.js');

const OUTPUT_DIR = 'k:/Video-Prelucrat/Vibe Coding/Proiect_01/docs';
const BASENAME = 'rezumat-explicit-2026-04-15';

const sections = [
  {
    title: 'Rezumat explicit al sesiunii din 15 aprilie 2026',
    type: 'main-title',
  },
  {
    title: 'Contextul initial',
    type: 'heading',
    content: [
      'Proiectul Vibe Caffe avea o eroare 500 in fluxul de chat cu Claude.',
      'In plus, utilizatorul observase diferente intre varianta locala si varianta publicata pe Vercel, mai ales in zona butonului de vorbire si a selectiei vocii.',
      'Obiectivul sesiunii a fost dublu: repararea integrarii Claude in productie si stabilizarea functionalitatii de speech synthesis din widget-ul de chat.',
    ],
  },
  {
    title: '1. Diagnosticarea erorii 500 la Claude',
    type: 'heading',
    content: [
      'A fost inspectata structura proiectului si s-au identificat fisierele relevante pentru chat: app/api/chat/route.ts, components/ChatWidget.tsx si knowledge base-ul folosit in prompt.',
      'S-a verificat configurarea locala a variabilei ANTHROPIC_API_KEY si s-a confirmat ca exista in .env.local.',
      'S-a rulat build-ul proiectului si s-a confirmat ca aplicatia compileaza corect, deci problema nu era una de TypeScript sau build local.',
      'A fost verificat direct accesul la Anthropic API si s-a confirmat ca cheia locala functioneaza si ca endpoint-ul poate raspunde.',
      'Concluzia a fost ca eroarea 500 nu provenea din indisponibilitatea providerului, ci din configurarea din deployment sau din lipsa vizibilitatii mesajului real de eroare in UI.',
    ],
  },
  {
    title: '2. Remedierea endpoint-ului /api/chat',
    type: 'heading',
    content: [
      'Endpoint-ul app/api/chat/route.ts a fost imbunatatit pentru a fi mai robust si mai usor de diagnosticat.',
      'Mesajul utilizatorului este acum trim-uit inainte de validare si trimitere catre Anthropic.',
      'Modelul Anthropic a fost facut configurabil prin ANTHROPIC_MODEL, cu fallback sigur in cod.',
      'Tratarea erorilor a fost imbunatatita astfel incat raspunsurile 400, 401 si 500 sa returneze detalii mai utile.',
      'Logarea erorilor a fost facuta mai explicita, pentru a putea vedea mai usor statusul, tipul erorii si modelul folosit.',
    ],
  },
  {
    title: '3. Verificarea si repararea configurarii din Vercel',
    type: 'heading',
    content: [
      'A fost identificat proiectul Vercel corect: vibe-website2.',
      'A fost verificata existenta variabilei de mediu ANTHROPIC_API_KEY in Vercel.',
      'Dupa configurarea cheii in proiectul corect si redeploy, logurile Vercel pentru POST /api/chat au inceput sa raspunda cu status 200.',
      'A fost confirmat in dashboard-ul Vercel ca endpoint-ul /api/chat functioneaza in productie.',
      'A fost confirmat si in UI-ul site-ului ca botul raspunde corect in productie.',
    ],
  },
  {
    title: '4. Restaurarea si deploy-ul butonului de vorbire',
    type: 'heading',
    content: [
      'A fost observat ca butonul de vorbire exista local, dar nu si in productie.',
      'Analiza git a aratat ca implementarea TTS era prezenta doar in fisiere locale nemise in repository.',
      'A fost adaugat si deployat suportul de speech synthesis in widget-ul de chat.',
      'Dupa commit si push pe origin/main, Vercel a publicat o versiune in care butonul Asculta apare si pe site-ul live.',
      'A fost confirmat prin test vizual ca butonul este vizibil si functional in productie.',
    ],
  },
  {
    title: '5. Incercarea de selectie a unei voci feminine',
    type: 'heading',
    content: [
      'A fost implementata o selectie mai agresiva a vocilor feminine, cu prioritizare pentru nume si voci feminine cunoscute.',
      'Testul real in Chrome a aratat ca rezultatul este mai slab decat vocea initiala.',
      'S-a concluzionat ca, in browser, calitatea vocii depinde de vocile pe care sistemul de operare si browserul le expun efectiv.',
      'Pentru a mentine experienta buna, a fost facut revert la selectia initiala a vocii.',
      'Varianta finala ramane cea care suna mai natural pentru utilizator, chiar daca nu este explicit feminina.',
    ],
  },
  {
    title: '6. Cleanup tehnic al proiectului',
    type: 'heading',
    content: [
      'A fost migrat fisierul deprecated middleware.ts la noua conventie proxy.ts.',
      'A fost eliminat hook-ul nefolosit useSpeechSynthesisV2.ts.',
      'A fost unificat widget-ul de chat intr-un singur fisier components/ChatWidget.tsx.',
      'A fost eliminat components/ChatWidgetV2.tsx dupa ce importul din app/layout.tsx a fost readus la ChatWidget.',
      'A fost actualizat .gitignore pentru a exclude exporturile generate local si arhivele .zip.',
      'A fost adaugat in repository scriptul scripts/recap-m6-l2.mjs.',
    ],
  },
  {
    title: '7. Verificari finale',
    type: 'heading',
    content: [
      'La finalul sesiunii, git status este curat.',
      'Build-ul proiectului trece cu succes prin npm run build.',
      'Chat-ul cu Claude functioneaza in productie.',
      'Butonul Asculta apare si functioneaza in productie.',
      'Repo-ul este mai curat, cu structura simplificata si fara fisiere temporare relevante ramase in tracking.',
    ],
  },
  {
    title: '8. Recomandare importanta de securitate',
    type: 'heading',
    content: [
      'Cheia ANTHROPIC_API_KEY a aparut intr-un screenshot pe parcursul sesiunii.',
      'Este recomandata rotirea cheii in Anthropic Console si actualizarea ei in Vercel.',
      'Acest pas nu afecteaza arhitectura aplicatiei, dar este important pentru siguranta contului si a costurilor API.',
    ],
  },
  {
    title: 'Concluzie',
    type: 'heading',
    content: [
      'Sesiunea s-a incheiat cu remedierea completa a problemei 500 la Claude, restaurarea functionalitatii de vorbire in productie, revenirea la vocea initiala preferata si un cleanup tehnic consistent al proiectului.',
      'Aplicatia este acum stabila, functionala si mai usor de mentinut.',
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
          spacing: { after: 300 },
        })
      );
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'Proiect: Vibe Caffe | Data: 15 aprilie 2026',
              italics: true,
              color: '666666',
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 450 },
        })
      );
      continue;
    }

    children.push(
      new Paragraph({
        text: section.title,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 280, after: 140 },
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
    .text('Rezumat explicit al sesiunii din 15 aprilie 2026', 50, 50, { width, align: 'center' });
  doc.font('Italic').fontSize(10).fillColor('#666666')
    .text('Proiect: Vibe Caffe | Generat automat', { width, align: 'center' });
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

console.log('Generez rezumatul explicit al sesiunii din 15 aprilie 2026...');
await generateDocx();
generatePdf();
console.log('Gata.');
