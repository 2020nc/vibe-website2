/**
 * Export sesiune Claude Code → DOCX + PDF
 *
 * Utilizare:
 *   node scripts/export-chat.mjs                  # exportă sesiunea curentă (cel mai recent .jsonl)
 *   node scripts/export-chat.mjs <session-id>     # exportă o sesiune specifică
 *
 * Output:
 *   docs/sesiune-YYYY-MM-DD.docx
 *   docs/sesiune-YYYY-MM-DD.pdf
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  ImageRun, AlignmentType, BorderStyle, Table, TableRow,
  TableCell, WidthType, ShadingType
} from 'docx';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { createPdf } = require('C:/Users/Admin/.claude/pdf-utils/createPdf.js');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = path.resolve(__dirname, '..');

// Derivă automat SESSIONS_DIR din PROJECT_DIR
// ex: "k:/Video-Prelucrat/Vibe Coding/Proiect_02" → "k--Video-Prelucrat-Vibe-Coding-Proiect-02"
const projectSlug = PROJECT_DIR
  .replace(/\\/g, '/')
  .replace(/^([a-zA-Z]):\//, (_, d) => d.toLowerCase() + '--')
  .replace(/[\/ _]/g, '-');
const SESSIONS_DIR = `C:/Users/Admin/.claude/projects/${projectSlug}`;
const OUTPUT_DIR = path.join(PROJECT_DIR, 'docs');

// ─── Găsește sesiunea ────────────────────────────────────────────────────────

function findSession(sessionId) {
  const files = fs.readdirSync(SESSIONS_DIR)
    .filter(f => f.endsWith('.jsonl'))
    .map(f => ({
      name: f,
      path: path.join(SESSIONS_DIR, f),
      mtime: fs.statSync(path.join(SESSIONS_DIR, f)).mtime
    }))
    .sort((a, b) => b.mtime - a.mtime);

  if (sessionId) {
    const found = files.find(f => f.name.includes(sessionId));
    if (!found) throw new Error(`Sesiunea '${sessionId}' nu a fost găsită.`);
    return found;
  }
  return files[0]; // cea mai recentă
}

// ─── Parsează mesajele ───────────────────────────────────────────────────────

function parseSession(filePath) {
  const lines = fs.readFileSync(filePath, 'utf8').trim().split('\n');
  const messages = [];

  for (const line of lines) {
    const obj = JSON.parse(line);
    const msg = obj.message;
    if (!msg || !msg.role || !msg.content) continue;
    if (msg.role !== 'user' && msg.role !== 'assistant') continue;

    const content = Array.isArray(msg.content) ? msg.content : [{ type: 'text', text: msg.content }];

    const parts = [];
    for (const block of content) {
      if (block.type === 'text' && block.text?.trim()) {
        parts.push({ type: 'text', text: block.text.trim() });
      } else if (block.type === 'image') {
        const src = block.source;
        if (src?.type === 'base64' && src.data) {
          parts.push({ type: 'image', data: src.data, mediaType: src.media_type });
        }
      } else if (block.type === 'document') {
        // PDF atașat ca document
        parts.push({ type: 'text', text: '[📄 Document atașat]' });
      }
      // ignorăm tool_use, tool_result, thinking
    }

    if (parts.length > 0) {
      messages.push({ role: msg.role, parts });
    }
  }

  return messages;
}

// ─── Export DOCX ─────────────────────────────────────────────────────────────

async function exportDocx(messages, outputPath, dateStr) {
  const children = [];

  // Titlu
  children.push(new Paragraph({
    text: `Sesiune Claude Code — ${dateStr}`,
    heading: HeadingLevel.HEADING_1,
    spacing: { after: 400 },
  }));

  for (const msg of messages) {
    const isUser = msg.role === 'user';
    const label = isUser ? '👤 Tu' : '🤖 Claude';
    const color = isUser ? '1D4ED8' : '065F46';
    const bgColor = isUser ? 'EFF6FF' : 'ECFDF5';

    // Label rol
    children.push(new Paragraph({
      children: [new TextRun({ text: label, bold: true, color, size: 22 })],
      spacing: { before: 300, after: 100 },
    }));

    for (const part of msg.parts) {
      if (part.type === 'text') {
        // Împarte pe linii
        const lines = part.text.split('\n');
        for (const line of lines) {
          const isCode = line.startsWith('    ') || line.startsWith('\t');
          children.push(new Paragraph({
            children: [new TextRun({
              text: line || ' ',
              font: isCode ? 'Courier New' : 'DejaVu Sans',
              size: isCode ? 18 : 20,
              color: isCode ? '374151' : '111827',
            })],
            shading: isCode ? { type: ShadingType.CLEAR, fill: 'F3F4F6' } : undefined,
            spacing: { after: 60 },
          }));
        }
      } else if (part.type === 'image') {
        try {
          const imgBuffer = Buffer.from(part.data, 'base64');
          children.push(new Paragraph({
            children: [new ImageRun({
              data: imgBuffer,
              transformation: { width: 500, height: 300 },
              type: part.mediaType?.includes('png') ? 'png' : 'jpg',
            })],
            spacing: { before: 200, after: 200 },
          }));
        } catch (e) {
          children.push(new Paragraph({ children: [new TextRun({ text: '[Imagine - eroare la inserare]', italics: true })] }));
        }
      }
    }

    // Linie separator
    children.push(new Paragraph({
      border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: 'E5E7EB' } },
      spacing: { after: 200 },
    }));
  }

  const doc = new Document({ sections: [{ children }] });
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ DOCX salvat: ${outputPath}`);
}

// ─── Export PDF ──────────────────────────────────────────────────────────────

async function exportPdf(messages, outputPath, dateStr) {
  const doc = createPdf({ size: 'A4', margins: { top: 50, bottom: 50, left: 60, right: 60 } });
  const out = fs.createWriteStream(outputPath);
  doc.pipe(out);

  // Titlu
  doc.font('Bold').fontSize(18).fillColor('#111827')
    .text(`Sesiune Claude Code — ${dateStr}`, { align: 'center' });
  doc.moveDown(1.5);

  for (const msg of messages) {
    const isUser = msg.role === 'user';
    const label = isUser ? 'Tu:' : 'Claude:';
    const labelColor = isUser ? '#1D4ED8' : '#065F46';
    const bgColor = isUser ? '#EFF6FF' : '#ECFDF5';

    // Label
    doc.font('Bold').fontSize(11).fillColor(labelColor).text(label);
    doc.moveDown(0.3);

    for (const part of msg.parts) {
      if (part.type === 'text') {
        doc.font('Regular').fontSize(10).fillColor('#111827').text(part.text, {
          align: 'left',
          lineGap: 2,
        });
        doc.moveDown(0.3);
      } else if (part.type === 'image') {
        try {
          const imgBuffer = Buffer.from(part.data, 'base64');
          const maxWidth = 450;
          const maxHeight = 280;
          doc.image(imgBuffer, { fit: [maxWidth, maxHeight], align: 'center' });
          doc.moveDown(0.5);
        } catch (e) {
          doc.font('Italic').fontSize(9).fillColor('#6B7280').text('[Imagine atașată]');
        }
      }
    }

    // Separator
    doc.moveTo(60, doc.y).lineTo(535, doc.y).strokeColor('#E5E7EB').stroke();
    doc.moveDown(0.8);

    // Verifică dacă trebuie pagină nouă
    if (doc.y > 740) doc.addPage();
  }

  doc.end();

  await new Promise((resolve, reject) => {
    out.on('finish', resolve);
    out.on('error', reject);
  });

  console.log(`✅ PDF salvat: ${outputPath}`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const sessionId = process.argv[2];
  const session = findSession(sessionId);

  const dateStr = session.mtime.toISOString().slice(0, 10);
  const baseName = `sesiune-${dateStr}`;

  console.log(`📂 Sesiune: ${session.name}`);
  console.log(`📅 Data: ${dateStr}`);

  const messages = parseSession(session.path);
  console.log(`💬 Mesaje găsite: ${messages.length}`);

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const docxPath = path.join(OUTPUT_DIR, `${baseName}.docx`);
  const pdfPath = path.join(OUTPUT_DIR, `${baseName}.pdf`);

  await exportDocx(messages, docxPath, dateStr);
  await exportPdf(messages, pdfPath, dateStr);

  console.log('\n🎉 Export complet!');
}

main().catch(err => {
  console.error('❌ Eroare:', err.message);
  process.exit(1);
});
