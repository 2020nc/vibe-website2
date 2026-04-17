import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require('docx');
const { createPdf } = require('C:/Users/Admin/.claude/pdf-utils/createPdf.js');

const OUTPUT_DIR = 'k:/Video-Prelucrat/Vibe Coding/Proiect_01/docs';
const BASENAME = 'rezumat-profesoral-2026-04-15';

const sections = [
  {
    title: 'Raport sintetic pentru evaluare',
    type: 'main-title',
  },
  {
    title: 'Date de identificare',
    type: 'heading',
    content: [
      'Data: 15 aprilie 2026.',
      'Proiect: Vibe Caffe Website.',
      'Tema sesiunii: remedierea integrarii Claude, validarea deployment-ului si stabilizarea functionalitatii de vorbire din widget-ul de chat.',
    ],
  },
  {
    title: 'Obiective',
    type: 'heading',
    content: [
      'Identificarea cauzei erorii 500 aparute in comunicarea dintre aplicatia web si Claude.',
      'Verificarea configurarii corecte a cheilor si variabilelor de mediu din Vercel.',
      'Publicarea in productie a functionalitatii de speech synthesis deja existente local.',
      'Stabilirea unei variante de voce acceptabile pentru utilizarea reala in browser.',
      'Curatarea tehnica a proiectului prin eliminarea componentelor redundant si actualizarea structurii.',
    ],
  },
  {
    title: 'Metodologie',
    type: 'heading',
    content: [
      'A fost efectuata inspectia structurii proiectului si a fisierelor implicate direct in chat: ruta API, componenta de UI si hook-urile asociate.',
      'A fost verificata configurarea locala a variabilei ANTHROPIC_API_KEY si a fost testata conectivitatea efectiva la Anthropic API.',
      'A fost verificat proiectul publicat in Vercel, inclusiv identificarea proiectului corect, a variabilelor de mediu si a logurilor aferente request-urilor /api/chat.',
      'Au fost realizate modificari iterative asupra codului, urmate de build local, commit, push si validare in productie.',
      'Pentru livrarea documentatiei finale, au fost generate exporturi in format DOCX si PDF.',
    ],
  },
  {
    title: 'Interventii realizate',
    type: 'heading',
    content: [
      'A fost consolidat endpoint-ul app/api/chat/route.ts prin normalizarea mesajelor, configurarea modelului prin variabila de mediu si imbunatatirea tratarii erorilor.',
      'A fost confirmat faptul ca problema majora din productie era asociata configurarii si deploy-ului, nu indisponibilitatii serviciului Anthropic.',
      'A fost verificata si corectata configurarea ANTHROPIC_API_KEY in Vercel, iar dupa redeploy endpoint-ul /api/chat a inceput sa raspunda cu status 200.',
      'A fost publicata in productie functionalitatea de speech synthesis, initial existenta doar local.',
      'A fost testata o varianta de selectie a unei voci feminine, insa, in browserul Chrome, rezultatul auditiv a fost inferior variantei initiale.',
      'In consecinta, s-a revenit la selectia de voce initiala, considerata mai naturala si mai potrivita pentru utilizator.',
      'A fost facut cleanup tehnic prin inlocuirea fisierului deprecated middleware.ts cu proxy.ts, eliminarea unui hook nefolosit si unificarea chat-ului intr-un singur ChatWidget.tsx.',
      'A fost actualizat .gitignore pentru a exclude fisierele generate local si a fost adaugat in repository scriptul recap-m6-l2.mjs.',
    ],
  },
  {
    title: 'Rezultate',
    type: 'heading',
    content: [
      'Eroarea 500 aferenta integrarii Claude a fost eliminata.',
      'Endpoint-ul /api/chat functioneaza corect in productie.',
      'Widget-ul de chat raspunde corect si afiseaza raspunsurile botului in mediul public.',
      'Butonul de vorbire este vizibil si functional in productie.',
      'Structura proiectului a fost simplificata si stabilizata.',
      'Build-ul aplicatiei se finalizeaza cu succes.',
      'Repository-ul a fost adus intr-o stare curata si coerenta din punct de vedere tehnic.',
    ],
  },
  {
    title: 'Concluzii',
    type: 'heading',
    content: [
      'Sesiunea a avut un rezultat pozitiv, conducand la remedierea unei probleme functionale reale din productie si la consolidarea unei functionalitati suplimentare de accesibilitate.',
      'Pe langa rezolvarea problemei principale, proiectul a beneficiat de refactorizare si cleanup, ceea ce reduce riscul de confuzie si faciliteaza mentenanta ulterioara.',
      'Din perspectiva evaluarii, activitatea demonstreaza analiza tehnica, depanare iterativa, validare in mediu de productie si documentare adecvata a modificarilor realizate.',
    ],
  },
  {
    title: 'Recomandare finala',
    type: 'heading',
    content: [
      'Se recomanda rotirea cheii ANTHROPIC_API_KEY, intrucat aceasta a aparut intr-un screenshot pe parcursul sesiunii. Aceasta masura este necesara pentru securitatea operationala a proiectului.',
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
              text: 'Proiect: Vibe Caffe Website | Format: varianta pentru predare',
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
    .text('Proiect: Vibe Caffe Website | Varianta profesorală', { width, align: 'center' });
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

console.log('Generez varianta profesorală pentru 15 aprilie 2026...');
await generateDocx();
generatePdf();
console.log('Gata.');
