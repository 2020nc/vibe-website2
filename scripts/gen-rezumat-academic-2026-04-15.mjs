import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require('docx');
const { createPdf } = require('C:/Users/Admin/.claude/pdf-utils/createPdf.js');

const OUTPUT_DIR = 'k:/Video-Prelucrat/Vibe Coding/Proiect_01/docs';
const BASENAME = 'rezumat-academic-2026-04-15';

const sections = [
  {
    title: 'Raport de activitate tehnica',
    type: 'main-title',
  },
  {
    title: 'Date generale',
    type: 'heading',
    content: [
      'Data activitatii: 15 aprilie 2026.',
      'Proiect analizat: Vibe Caffe Website.',
      'Obiectiv principal: identificarea si remedierea erorii 500 aparute in integrarea Claude, urmate de stabilizarea functionalitatilor de chat si speech synthesis.',
    ],
  },
  {
    title: '1. Situatia initiala',
    type: 'heading',
    content: [
      'La inceputul sesiunii a fost semnalata o eroare 500 in fluxul de chat dintre aplicatia web si serviciul Claude.',
      'In paralel, a fost observata o neconcordanta intre mediul local si mediul de productie, concretizata prin absenta butonului de vorbire in varianta publicata pe Vercel.',
      'Aceste simptome au impus o analiza separata a backend-ului de chat, a configurarii de deployment si a componentei client-side responsabile de text-to-speech.',
    ],
  },
  {
    title: '2. Metodologia de investigatie',
    type: 'heading',
    content: [
      'A fost inspectata structura proiectului si au fost identificate fisierele critice implicate in functionalitatea de chat.',
      'A fost verificata existenta variabilei ANTHROPIC_API_KEY in configurarea locala.',
      'A fost rulat procesul de build pentru validarea integritatii aplicatiei din punct de vedere al compilarii si al tipizarii.',
      'A fost testata direct conectivitatea cu Anthropic API pentru a separa problemele de cod de problemele de configurare sau de furnizor extern.',
      'A fost verificata configurarea proiectului in Vercel si au fost consultate logurile de runtime pentru endpoint-ul /api/chat.',
    ],
  },
  {
    title: '3. Interventii realizate asupra backend-ului de chat',
    type: 'heading',
    content: [
      'Endpoint-ul app/api/chat/route.ts a fost ajustat pentru a trata mai sigur mesajele primite de la client.',
      'Mesajele utilizatorului au fost normalizate prin trim-uire inainte de validare si transmitere.',
      'Modelul Anthropic a fost facut configurabil prin variabila ANTHROPIC_MODEL, cu fallback in cod.',
      'Tratarea erorilor a fost extinsa astfel incat raspunsurile de tip 400, 401 si 500 sa poata transmite informatii utile pentru diagnostic.',
      'Logarea erorilor a fost imbunatatita pentru a include statusul, tipul erorii si modelul utilizat.',
    ],
  },
  {
    title: '4. Interventii realizate asupra deployment-ului',
    type: 'heading',
    content: [
      'A fost identificat proiectul Vercel corect asociat aplicatiei: vibe-website2.',
      'A fost verificata si corectata configurarea variabilei ANTHROPIC_API_KEY in mediul Vercel.',
      'Dupa actualizarea variabilei si redeploy, endpoint-ul /api/chat a inceput sa raspunda cu status 200 in logurile de productie.',
      'Validarea functionala a demonstrat ca raspunsurile botului au devenit disponibile in interfata publica a site-ului.',
    ],
  },
  {
    title: '5. Interventii asupra componentei de chat si text-to-speech',
    type: 'heading',
    content: [
      'A fost confirmat faptul ca implementarea pentru butonul de vorbire era disponibila doar in fisierele locale si nu fusese publicata.',
      'Functionalitatea speech synthesis a fost integrata si deployata in versiunea publica a aplicatiei.',
      'A fost realizata o tentativa de prioritizare a unei voci feminine, insa testarea practica in browserul Chrome a demonstrat o degradare a calitatii perceptibile.',
      'In consecinta, a fost restaurata selectia initiala a vocii, considerata mai potrivita din punct de vedere al experientei utilizatorului.',
    ],
  },
  {
    title: '6. Activitati de cleanup si refactorizare',
    type: 'heading',
    content: [
      'Fisierul deprecated middleware.ts a fost inlocuit cu proxy.ts, conform conventiilor actuale ale framework-ului.',
      'Hook-ul neutilizat useSpeechSynthesisV2.ts a fost eliminat.',
      'Componentele ChatWidget si ChatWidgetV2 au fost unificate, proiectul ramanand cu un singur ChatWidget.tsx activ.',
      'Fisierul .gitignore a fost extins pentru a exclude exporturile generate local si arhivele auxiliare.',
      'A fost adaugat si versionat scriptul scripts/recap-m6-l2.mjs, relevant pentru generarea documentatiei asociate.',
    ],
  },
  {
    title: '7. Rezultate finale',
    type: 'heading',
    content: [
      'Eroarea 500 din integrarea Claude a fost eliminata.',
      'Fluxul de chat functioneaza corect in productie.',
      'Butonul de vorbire este prezent si functional in productie.',
      'Build-ul proiectului se finalizeaza cu succes.',
      'Repository-ul se afla intr-o stare curata, fara modificari locale ramase dupa incheierea sesiunii.',
    ],
  },
  {
    title: '8. Observatie privind securitatea operationala',
    type: 'heading',
    content: [
      'Pe parcursul sesiunii, cheia ANTHROPIC_API_KEY a fost expusa intr-un screenshot.',
      'Prin urmare, se recomanda rotirea cheii in Anthropic Console si actualizarea ulterioara a valorii in Vercel.',
      'Aceasta masura este importanta pentru prevenirea utilizarii neautorizate si pentru protectia costurilor asociate API-ului.',
    ],
  },
  {
    title: 'Concluzie generala',
    type: 'heading',
    content: [
      'Activitatea desfasurata in data de 15 aprilie 2026 a avut ca rezultat remedierea completa a integrarii Claude in productie, stabilizarea functionalitatii de speech synthesis si imbunatatirea structurii tehnice a proiectului.',
      'Prin interventiile efectuate, aplicatia a fost adusa intr-o stare functionala, coerenta si mai usor de mentinut pe termen mediu.',
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
              text: 'Proiect: Vibe Caffe Website | Data: 15 aprilie 2026',
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
        spacing: { before: 260, after: 130 },
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
    .text('Raport de activitate tehnica', 50, 50, { width, align: 'center' });
  doc.font('Italic').fontSize(10).fillColor('#666666')
    .text('Proiect: Vibe Caffe Website | Data: 15 aprilie 2026', { width, align: 'center' });
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

console.log('Generez varianta academica a rezumatului pentru 15 aprilie 2026...');
await generateDocx();
generatePdf();
console.log('Gata.');
