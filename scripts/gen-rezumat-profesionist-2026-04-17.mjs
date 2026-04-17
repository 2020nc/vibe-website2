import fs from 'node:fs';
import path from 'node:path';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import PDFDocument from 'pdfkit';

const outDir = path.join(process.cwd(), 'docs');
fs.mkdirSync(outDir, { recursive: true });

const baseName = 'rezumat-profesionist-activitate-2026-04-17';
const mdPath = path.join(outDir, `${baseName}.md`);
const docxPath = path.join(outDir, `${baseName}.docx`);
const pdfPath = path.join(outDir, `${baseName}.pdf`);

const lines = [
  '# Rezumat profesional activitate — 17 aprilie 2026',
  '',
  '## Context',
  'În data de **17 aprilie 2026** am desfășurat o sesiune completă de optimizare a proiectului Vibe Caffè, cu accent pe calitate vizuală, consistență lingvistică și stabilitate tehnică.',
  '',
  '## Obiectivele zilei',
  '- Implementarea taskurilor din runbook-ul de lucru și validarea lor în codul real.',
  '- Corectarea diacriticelor în textele vizibile utilizatorului, atât pe site-ul public, cât și în zonele administrative.',
  '- Stabilizarea schimbării de temă (light/dark) pentru contrast corect pe toate paginile.',
  '- Validare continuă prin lint și build după fiecare set major de modificări.',
  '',
  '## Ce s-a livrat concret',
  '### 1) Implementare runbook și stabilizare proiect',
  '- Au fost implementate taskurile planificate în runbook-ul curent și sincronizate cu repository-ul activ.',
  '- Au fost rezolvate punctele care influențau stabilitatea generală a codului și a pipeline-ului de build.',
  '',
  '### 2) Corecții lingvistice (diacritice)',
  '- S-a făcut o trecere extinsă a textelor user-facing pentru corectarea diacriticelor în română.',
  '- Au fost corectate texte din pagini cheie (`/`, `/rezervari`, `/locatie`, `/meniu`, `/sarbatori`), din admin și din widget-ul de chat.',
  '- Au fost păstrate intenționat fără diacritice doar elementele tehnice unde este recomandat: slug-uri, path-uri și anumite URL-uri.',
  '',
  '### 3) Stabilizare profesională a temei (light/dark)',
  '- A fost remediată problema de contrast la schimbarea culorii/temei.',
  '- S-au introdus reguli globale coerente pentru suprafețe, text și borduri în dark mode.',
  '- Navigația a fost făcută theme-aware, fără dependență de culori hardcodate care produceau inconsistențe.',
  '- A fost introdusă inițializare timpurie a temei în layout pentru reducerea flash-ului vizual la încărcare.',
  '',
  '## Verificări efectuate',
  '- Verificări repetitive cu căutări țintite (`rg`) pentru depistarea textelor fără diacritice.',
  '- Verificări de calitate cod: `npm run lint`.',
  '- Verificări de stabilitate aplicație: `npm run build`.',
  '- Rezultat final: verificările au trecut după modificările finale.',
  '',
  '## Commit-uri livrate în această zi',
  '- `819d7c2` — Implement runbook Tasks 1-5 and complete lint stabilization',
  '- `61ed6b1` — Finalize Romanian diacritics sweep and sync workspace changes',
  '- `7f7e0b4` — Stabilize global theme contrast and early theme init',
  '',
  '## Impact pentru proiect',
  '- Creștere semnificativă a calității percepute în interfață prin texte corecte și consistente.',
  '- Experiență dark mode mult mai robustă, cu lizibilitate corectă în secțiuni multiple.',
  '- Bază tehnică mai predictibilă pentru dezvoltările următoare, cu validări constante în pipeline.',
  '',
  '## Recomandări pentru pasul următor',
  '- Continuarea migrării treptate către tokeni semantici de design pentru a elimina complet excepțiile locale de stil.',
  '- Introducerea unui checklist automat de QA vizual pentru light/dark înainte de fiecare release.',
  '- Menținerea unei reguli editoriale stricte pentru diacritice în tot conținutul user-facing.',
  '',
  '---',
  'Document generat pentru comunicare internă către Vibe Coding.',
];

const markdown = `${lines.join('\n')}\n`;
fs.writeFileSync(mdPath, markdown, 'utf8');

const docChildren = [];
for (const line of lines) {
  if (!line.trim()) {
    docChildren.push(new Paragraph({ text: '' }));
    continue;
  }

  if (line.startsWith('# ')) {
    docChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: line.replace(/^#\s+/, ''), bold: true })],
      })
    );
    continue;
  }

  if (line.startsWith('## ')) {
    docChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: line.replace(/^##\s+/, ''), bold: true })],
      })
    );
    continue;
  }

  if (line.startsWith('### ')) {
    docChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun({ text: line.replace(/^###\s+/, ''), bold: true })],
      })
    );
    continue;
  }

  if (line.startsWith('- ')) {
    docChildren.push(
      new Paragraph({
        text: line.replace(/^-\s+/, ''),
        bullet: { level: 0 },
      })
    );
    continue;
  }

  if (line === '---') {
    docChildren.push(new Paragraph({ text: '────────────────────────────' }));
    continue;
  }

  docChildren.push(new Paragraph({ text: line }));
}

const doc = new Document({
  sections: [
    {
      properties: {},
      children: docChildren,
    },
  ],
});

const docxBuffer = await Packer.toBuffer(doc);
fs.writeFileSync(docxPath, docxBuffer);

const pdf = new PDFDocument({ margin: 50, size: 'A4' });
const pdfStream = fs.createWriteStream(pdfPath);
pdf.pipe(pdfStream);

const fontRegular = path.join(process.cwd(), 'public', 'DejaVuSans.ttf');
const fontBold = path.join(process.cwd(), 'public', 'DejaVuSans-Bold.ttf');
pdf.registerFont('Regular', fontRegular);
pdf.registerFont('Bold', fontBold);

for (const line of lines) {
  if (!line.trim()) {
    pdf.moveDown(0.6);
    continue;
  }

  if (line.startsWith('# ')) {
    pdf.font('Bold').fontSize(18).text(line.replace(/^#\s+/, ''), { align: 'left' });
    pdf.moveDown(0.5);
    continue;
  }

  if (line.startsWith('## ')) {
    pdf.font('Bold').fontSize(14).text(line.replace(/^##\s+/, ''));
    pdf.moveDown(0.3);
    continue;
  }

  if (line.startsWith('### ')) {
    pdf.font('Bold').fontSize(12).text(line.replace(/^###\s+/, ''));
    pdf.moveDown(0.2);
    continue;
  }

  if (line.startsWith('- ')) {
    pdf.font('Regular').fontSize(11).text(`• ${line.replace(/^-\s+/, '')}`, {
      indent: 10,
      continued: false,
    });
    continue;
  }

  if (line === '---') {
    const y = pdf.y + 4;
    pdf.moveTo(50, y).lineTo(545, y).strokeColor('#888888').lineWidth(0.8).stroke();
    pdf.moveDown(0.8);
    continue;
  }

  pdf.font('Regular').fontSize(11).text(line);
}

pdf.end();
await new Promise((resolve) => pdfStream.on('finish', resolve));

console.log('Generated:');
console.log(mdPath);
console.log(docxPath);
console.log(pdfPath);
