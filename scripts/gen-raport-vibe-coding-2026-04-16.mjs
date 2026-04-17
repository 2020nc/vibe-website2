import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require('docx');
const { createPdf } = require('C:/Users/Admin/.claude/pdf-utils/createPdf.js');

const OUTPUT_DIR = 'k:/Video-Prelucrat/Vibe Coding/Proiect_01/docs';
const BASENAME = 'raport-verificare-vibe-coding-2026-04-16';

const meta = {
  title: 'Raport profesionist de verificare \\u0219i remediere',
  subtitle: 'Analiz\\u0103 a modific\\u0103rilor realizate de Vibe Coding pentru proiectul Vibe Caff\\u00E8',
  date: '16 aprilie 2026',
  project: 'Vibe Caff\\u00E8 Website',
};

const sections = [
  {
    title: '1. Contextul solicit\\u0103rii',
    paragraphs: [
      'Am primit sarcina de a verifica modific\\u0103rile realizate de Vibe Coding dup\\u0103 un set de recomand\\u0103ri furnizate anterior \\u00EEn format HTML. Scopul a fost dublu: audit tehnic al implement\\u0103rii \\u0219i, acolo unde era necesar, remediere complet\\u0103 a problemelor descoperite.',
      'Analiza a pornit de la trei interven\\u021Bii raportate de Vibe Coding: transformarea num\\u0103rului din footer \\u00EEn link telefonic, ad\\u0103ugarea unui endpoint POST pentru rezerv\\u0103ri \\u0219i introducerea unui bloc de contact flotant cu telefon \\u0219i WhatsApp.',
    ],
  },
  {
    title: '2. Ce a implementat corect Vibe Coding',
    bullets: [
      'Num\\u0103rul din footer a fost transformat \\u00EEntr-un link telefonic func\\u021Bional.',
      'A fost creat\\u0103 componenta FABContact pentru butoane flotante de contact.',
      'FABContact a fost integrat\\u0103 \\u00EEn layout-ul global al aplica\\u021Biei.',
      'A fost ad\\u0103ugat un endpoint POST \\u00EEn ruta /api/rezervari.',
    ],
  },
  {
    title: '3. Problemele identificate \\u00EEn urma auditului',
    bullets: [
      'Endpointul nou POST /api/rezervari nu era folosit de formularul public; pagina public\\u0103 scria \\u00EEn continuare direct \\u00EEn Supabase.',
      'Implementarea POST avea o incompatibilitate \\u00EEntre statusurile folosite \\u00EEn cod \\u0219i schema real\\u0103 a bazei de date.',
      'Exista nealiniere \\u00EEntre migrarea local\\u0103, codul aplica\\u021Biei \\u0219i schema live din Supabase pentru coloana status din tabelul rezervari.',
      'Panoul admin trata inconsistent statusurile istorice salvate \\u00EEn rom\\u00E2n\\u0103 \\u0219i englez\\u0103.',
      'Migrarea Supabase din 2026-04-09 nu era idempotent\\u0103 \\u0219i bloca aplicarea altor migra\\u021Bii \\u00EEn live.',
      'Fi\\u0219ierele atinse de interven\\u021Bie nu erau complet curate la nivel de lint \\u00EEnainte de predare.',
    ],
  },
  {
    title: '4. Remedierile efectuate',
    bullets: [
      'Am mutat fluxul public de rezerv\\u0103ri pe endpointul API, astfel \\u00EEnc\\u00E2t pagina /rezervari s\\u0103 foloseasc\\u0103 POST /api/rezervari \\u00EEn loc de insert direct \\u00EEn Supabase.',
      'Am corectat endpointul /api/rezervari pentru a include tenant_id \\u0219i pentru a r\\u0103m\\u00E2ne aliniat cu structura actual\\u0103 a aplica\\u021Biei.',
      'Am unificat interpretarea statusurilor \\u00EEn panoul admin, astfel \\u00EEnc\\u00E2t valorile vechi \\u0219i noi s\\u0103 fie afi\\u0219ate coerent \\u00EEn filtre, badge-uri \\u0219i ac\\u021Biuni.',
      'Am cur\\u0103\\u021Bat app/admin/page.tsx p\\u00E2n\\u0103 la nivel lint-clean, elimin\\u00E2nd erori \\u0219i warning-uri relevante.',
      'Am creat migrarea 20260416_fix_rezervari_status_constraint.sql pentru a repara schema live a coloanei status.',
      'Am f\\u0103cut migrarea 20260409_add_rls_policies.sql sigur\\u0103 de rerulat prin introducerea de DROP POLICY IF EXISTS \\u00EEnainte de recrearea politicilor.',
      'Am aplicat migra\\u021Biile \\u00EEn Supabase live prin supabase db push.',
    ],
  },
  {
    title: '5. Verific\\u0103ri \\u0219i valid\\u0103ri realizate',
    bullets: [
      'Am verificat fi\\u0219ierele modificate de Vibe Coding prin diff \\u0219i analiz\\u0103 direct\\u0103 \\u00EEn cod.',
      'Am rulat lint pe fi\\u0219ierele corectate p\\u00E2n\\u0103 la ob\\u021Binerea unui rezultat curat pentru zonele afectate.',
      'Am rulat build complet Next.js; buildul final a trecut f\\u0103r\\u0103 erori.',
      'Am testat endpointul /api/rezervari local pe buildul aplica\\u021Biei.',
      'Am diagnosticat direct baza Supabase live prin interog\\u0103ri REST pentru a confirma valorile reale din tabelul rezervari.',
      'Am confirmat end-to-end c\\u0103 o rezervare nou\\u0103 se salveaz\\u0103 corect \\u00EEn baza live dup\\u0103 aplicarea migr\\u0103rii.',
    ],
  },
  {
    title: '6. Rezultatul final confirmat',
    paragraphs: [
      'Dup\\u0103 remediere \\u0219i migrare, fluxul public de rezerv\\u0103ri func\\u021Bioneaz\\u0103 cap-coad\\u0103. Endpointul POST /api/rezervari r\\u0103spunde cu success: true, iar rezervarea creat\\u0103 apare \\u00EEn Supabase cu tenant_id corect \\u0219i statusul „\\u00EEn a\\u0219teptare”.',
      'Panoul admin trateaz\\u0103 acum coerent statusurile, iar fi\\u0219ierele principale implicate \\u00EEn interven\\u021Bie sunt curate \\u0219i verificabile.',
    ],
    bullets: [
      'Build final: trecut cu succes.',
      'Lint pentru fi\\u0219ierele cheie: trecut.',
      'Migra\\u021Bii Supabase: aplicate \\u00EEn live.',
      'Test final API: trecut.',
      'Persisten\\u021B\\u0103 \\u00EEn baza live: confirmat\\u0103.',
    ],
  },
  {
    title: '7. Fi\\u0219iere \\u0219i zone modificate de mine',
    bullets: [
      'app/api/rezervari/route.ts',
      'app/rezervari/page.tsx',
      'app/admin/page.tsx',
      'supabase/migrations/20260409_add_rls_policies.sql',
      'supabase/migrations/20260416_fix_rezervari_status_constraint.sql',
    ],
  },
  {
    title: '8. Concluzii pentru Vibe Coding',
    paragraphs: [
      'Implementarea ini\\u021Bial\\u0103 a avut elemente bune la nivel de interfa\\u021B\\u0103 \\u0219i direc\\u021Bie, dar a fost incomplet\\u0103 la nivel de integrare \\u0219i verificare opera\\u021Bional\\u0103. Principala lec\\u021Bie este c\\u0103 o modificare raportat\\u0103 ca „implementat\\u0103” trebuie validat\\u0103 nu doar vizual, ci \\u0219i pe fluxul real, \\u00EEn baza de date real\\u0103 \\u0219i \\u00EEn administra\\u021Bia real\\u0103 a aplica\\u021Biei.',
      'Pentru interven\\u021Bii viitoare, recomandarea este ca orice schimbare care introduce un endpoint nou sau atinge o schem\\u0103 de date s\\u0103 fie \\u00EEnso\\u021Bit\\u0103 obligatoriu de: integrare \\u00EEn UI, verificare build, verificare lint, test API real \\u0219i verificare pe datele live sau \\u00EEntr-un mediu c\\u00E2t mai apropiat de live.',
    ],
  },
  {
    title: '9. Mesaj scurt pentru prezentare',
    paragraphs: [
      'Vibe Coding a implementat corect partea vizibil\\u0103 a cerin\\u021Bei, dar au r\\u0103mas probleme de integrare \\u0219i consisten\\u021B\\u0103 \\u00EEntre frontend, API \\u0219i baza de date. Aceste probleme au fost identificate, corectate \\u0219i validate end-to-end, inclusiv prin aplicarea unei migr\\u0103ri \\u00EEn Supabase live.',
    ],
  },
];

function decodeUnicode(text) {
  return JSON.parse(`"${text}"`);
}

function para(text, options = {}) {
  return new Paragraph({
    children: [new TextRun({ text: decodeUnicode(text), size: 22, ...options })],
    spacing: { after: 140 },
  });
}

function bullet(text) {
  return new Paragraph({
    children: [new TextRun({ text: decodeUnicode(text), size: 22 })],
    bullet: { level: 0 },
    spacing: { after: 80 },
  });
}

async function generateDocx() {
  const children = [
    new Paragraph({
      text: decodeUnicode(meta.title),
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 180 },
    }),
    new Paragraph({
      children: [new TextRun({ text: decodeUnicode(meta.subtitle), italics: true, color: '666666' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
    }),
    new Paragraph({
      children: [new TextRun({ text: `${decodeUnicode(meta.project)} | ${meta.date}`, color: '666666' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 340 },
    }),
  ];

  for (const section of sections) {
    children.push(
      new Paragraph({
        text: decodeUnicode(section.title),
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
    .text(decodeUnicode(meta.title), 50, 50, { width, align: 'center' });
  pdf.moveDown(0.3);
  pdf.font('Italic').fontSize(10).fillColor('#6B7280')
    .text(decodeUnicode(meta.subtitle), { width, align: 'center' });
  pdf.moveDown(0.2);
  pdf.font('Regular').fontSize(10).fillColor('#6B7280')
    .text(`${decodeUnicode(meta.project)} | ${meta.date}`, { width, align: 'center' });
  pdf.moveDown(1.2);

  for (const section of sections) {
    if (pdf.y > pdf.page.height - 120) {
      pdf.addPage();
    }

    pdf.font('Bold').fontSize(13).fillColor('#0F766E').text(decodeUnicode(section.title), { width });
    pdf.moveDown(0.25);

    for (const paragraph of section.paragraphs || []) {
      if (pdf.y > pdf.page.height - 90) {
        pdf.addPage();
      }
      pdf.font('Regular').fontSize(10).fillColor('#111827').text(decodeUnicode(paragraph), { width, lineGap: 3 });
      pdf.moveDown(0.35);
    }

    for (const item of section.bullets || []) {
      if (pdf.y > pdf.page.height - 80) {
        pdf.addPage();
      }
      pdf.font('Regular').fontSize(10).fillColor('#111827').text(`• ${decodeUnicode(item)}`, { width, indent: 14, lineGap: 2 });
      pdf.moveDown(0.2);
    }

    pdf.moveDown(0.5);
  }

  pdf.end();
  console.log(`PDF generat: ${outPath}`);
}

console.log('Generez raportul de verificare pentru Vibe Coding cu diacritice corecte...');
await generateDocx();
generatePdf();
console.log('Raport generat complet.');
