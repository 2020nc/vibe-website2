/**
 * Generează Manual de Utilizare Administrator → DOCX + PDF
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { createPdf } = require('C:/Users/Admin/.claude/pdf-utils/createPdf.js');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, '../docs');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const DATE = '2026-04-04';
const TITLU = 'Manual de Utilizare Administrator — Vibe Caffè';
const SUBTITLU = 'Ghid complet pentru gestionarea panoului de administrare /admin';
const AVERTISMENT = '⚠ CONFIDENȚIAL — Acest document conține informații de acces. Nu distribuiți parola de admin.';

const SECTIUNI = [
  {
    titlu: 'Accesul în panoul de administrare',
    continut: [
      { tip: 'subtitlu', text: 'URL și autentificare' },
      { tip: 'bullet', text: 'URL admin: https://vibe-website2.vercel.app/admin' },
      { tip: 'bullet', text: 'Dacă nu ești autentificat, ești redirecționat automat la /admin/login' },
      { tip: 'bullet', text: 'Introdu parola în câmpul "Parolă Admin" și apasă "Intră în Admin"' },
      { tip: 'bullet', text: 'Parola este configurată în variabila de mediu ADMIN_SECRET (setată pe Vercel)' },
      { tip: 'subtitlu', text: 'Mecanism de securitate' },
      { tip: 'bullet', text: 'La autentificare reușită, browserul primește un cookie httpOnly "admin_token"' },
      { tip: 'bullet', text: 'Middleware-ul Next.js verifică cookie-ul la fiecare acces la /admin sau /admin/*' },
      { tip: 'bullet', text: 'Cookie-ul nu este accesibil din JavaScript — protecție împotriva XSS' },
      { tip: 'bullet', text: 'Sesiunea rămâne activă până la închiderea browserului sau expirarea cookie-ului' },
      { tip: 'subtitlu', text: 'Deconectare' },
      { tip: 'text', text: 'Șterge manual cookie-ul "admin_token" din DevTools → Application → Cookies, sau închide browserul.' },
    ],
  },
  {
    titlu: 'Structura panoului — Tab-uri disponibile',
    continut: [
      { tip: 'text', text: 'Panoul admin are 4 tab-uri principale accesibile din bara de navigare internă:' },
      { tip: 'bullet', text: '📋 Rezervări — gestionarea tuturor rezervărilor primite' },
      { tip: 'bullet', text: '☕ Meniu — administrarea produselor (CRUD complet)' },
      { tip: 'bullet', text: '🎉 Sărbători — configurarea meniului special și reducerilor sezoniere' },
      { tip: 'bullet', text: '⚙ Setări — banner promoțional și configurări generale' },
    ],
  },
  {
    titlu: 'Tab Rezervări',
    continut: [
      { tip: 'text', text: 'Afișează toate rezervările înregistrate în baza de date Supabase, ordonate cronologic.' },
      { tip: 'subtitlu', text: 'Informații afișate per rezervare' },
      { tip: 'bullet', text: 'Nume client, telefon, email (dacă a fost furnizat)' },
      { tip: 'bullet', text: 'Data și ora rezervării' },
      { tip: 'bullet', text: 'Număr de persoane' },
      { tip: 'bullet', text: 'Status: Nouă / Confirmată / Anulată' },
      { tip: 'subtitlu', text: 'Acțiuni disponibile' },
      { tip: 'bullet', text: 'Schimbare status — click pe statusul rezervării pentru a-l modifica (Nouă → Confirmată → Anulată)' },
      { tip: 'bullet', text: 'Bulk actions — selectează mai multe rezervări cu checkbox și aplică o acțiune în masă' },
      { tip: 'subtitlu', text: 'Export date' },
      { tip: 'bullet', text: 'Export Excel (.xlsx) — generează un fișier Excel cu toate rezervările + analiză pe zile și ore' },
      { tip: 'bullet', text: 'Export PDF — generează un PDF cu lista rezervărilor și grafice de distribuție' },
      { tip: 'bullet', text: 'Fișierele se descarcă automat cu numele "rezervari-vibe-caffe-YYYY-MM-DD"' },
      { tip: 'subtitlu', text: 'Analiza rezervărilor (în export)' },
      { tip: 'bullet', text: 'Distribuție pe zile ale săptămânii — câte rezervări s-au primit per zi' },
      { tip: 'bullet', text: 'Distribuție pe ore — care sunt orele de vârf' },
    ],
  },
  {
    titlu: 'Tab Meniu — Gestionare produse',
    continut: [
      { tip: 'text', text: 'Afișează toate produsele din tabelul menu_items din Supabase. Modificările sunt vizibile imediat pe site (cache 1 oră pentru SSR).' },
      { tip: 'subtitlu', text: 'Adăugare produs nou (Wizard)' },
      { tip: 'bullet', text: 'Apasă butonul "+ Produs nou"' },
      { tip: 'bullet', text: 'Pas 1 — Informații de bază: Nume, Categorie (Espresso/Cold Brew/Patiserie/Specialty), Preț în RON' },
      { tip: 'bullet', text: 'Pas 2 — Detalii: Descriere, URL imagine, Sort order (ordinea în categorie)' },
      { tip: 'bullet', text: 'Pas 3 — Reducere (opțional): tip (procent sau valoare fixă) și suma reducerii' },
      { tip: 'bullet', text: 'Confirmă — produsul apare imediat în lista admin și pe site după revalidare cache' },
      { tip: 'subtitlu', text: 'Editare produs existent' },
      { tip: 'bullet', text: 'Apasă butonul "✏ Editează" pe cardul produsului' },
      { tip: 'bullet', text: 'Wizard cu aceleași 3 pași, pre-completat cu datele existente' },
      { tip: 'bullet', text: 'Modificările sunt salvate în Supabase prin PATCH /api/menu' },
      { tip: 'subtitlu', text: 'Activare / Dezactivare produs' },
      { tip: 'bullet', text: 'Toggle "Disponibil" pe fiecare card — dezactivarea ascunde produsul de pe site fără a-l șterge' },
      { tip: 'bullet', text: 'Util pentru produse temporar indisponibile (sezoniere, stoc epuizat)' },
      { tip: 'subtitlu', text: 'Ștergere produs' },
      { tip: 'bullet', text: 'Apasă "🗑 Șterge" — operațiune ireversibilă, produsul este eliminat din Supabase' },
      { tip: 'bullet', text: 'Alternativa recomandată: dezactivare (toggle Disponibil) în loc de ștergere' },
      { tip: 'subtitlu', text: 'Reduceri individuale per produs' },
      { tip: 'bullet', text: 'Tip procentual: ex. -15% → prețul afișat scade cu 15%' },
      { tip: 'bullet', text: 'Tip valoare fixă: ex. -7 RON → badge "-7 RON" apare pe card în colțul stânga-sus' },
      { tip: 'bullet', text: 'Reducerile sunt convertite automat în EUR/USD când utilizatorul schimbă valuta' },
      { tip: 'subtitlu', text: 'Bulk Discount — reducere în masă' },
      { tip: 'bullet', text: 'Selectează mai multe produse cu checkbox' },
      { tip: 'bullet', text: 'Apasă "Reducere în masă" — aplică aceeași reducere la toate produsele selectate simultan' },
      { tip: 'subtitlu', text: 'Export meniu' },
      { tip: 'bullet', text: 'Export Excel — tabel cu toate produsele, prețuri, categorii, reduceri' },
      { tip: 'bullet', text: 'Export PDF — meniu formatat, gata de tipărit sau distribuit' },
      { tip: 'subtitlu', text: 'Gestiunea tagurilor (badge-uri)' },
      { tip: 'text', text: 'Tagurile (Bestseller, Signature, Staff Pick, Sezonier) se setează direct în Supabase → tabelul menu_items → coloana tag. Valori acceptate: "Bestseller", "Signature", "Staff Pick", "Sezonier" sau NULL (fără badge).' },
    ],
  },
  {
    titlu: 'Tab Sărbători — Meniu Special',
    continut: [
      { tip: 'text', text: 'Configurează un meniu special cu reduceri pentru perioadele festive (ex. Crăciun, 1 Decembrie, Valentine\'s Day).' },
      { tip: 'subtitlu', text: 'Configurare reducere globală' },
      { tip: 'bullet', text: 'Label sărbătoare — textul afișat vizitatorilor (ex. "1 Decembrie — Ziua Națională")' },
      { tip: 'bullet', text: 'Tip reducere — valoare fixă (ex. -5 RON per produs) sau procent (ex. -10%)' },
      { tip: 'bullet', text: 'Suma reducerii — câmpul numeric aferent' },
      { tip: 'bullet', text: 'Apasă "Salvează" pentru a aplica configurarea' },
      { tip: 'subtitlu', text: 'Previzualizare meniu sărbătoare' },
      { tip: 'bullet', text: 'Filtrare pe categorie (toate / Espresso / Cold Brew etc.)' },
      { tip: 'bullet', text: 'Cardurile afișează prețul original și prețul redus cu label-ul sărbătorii' },
      { tip: 'bullet', text: 'Efectul de confetti — activat automat când meniul de sărbători este vizitat de clienți' },
      { tip: 'subtitlu', text: 'Export meniu sărbătoare' },
      { tip: 'bullet', text: 'Export Excel — prețuri normale vs. prețuri reduse, cu label-ul evenimentului' },
      { tip: 'bullet', text: 'Export PDF — meniu special formatat pentru tipărire/afișaj în cafenea' },
    ],
  },
  {
    titlu: 'Tab Setări — Banner Promoțional',
    continut: [
      { tip: 'text', text: 'Bannerul promoțional apare deasupra meniului pe pagina /meniu când este activat.' },
      { tip: 'subtitlu', text: 'Configurare banner' },
      { tip: 'bullet', text: 'Toggle Activat/Dezactivat — controlează vizibilitatea bannerului' },
      { tip: 'bullet', text: 'Comandă minimă — suma de la care se aplică promoția (ex. 50 RON)' },
      { tip: 'bullet', text: 'Tip reducere — procent sau valoare fixă' },
      { tip: 'bullet', text: 'Valoare reducere — suma/procentul oferit' },
      { tip: 'bullet', text: 'Mesaj personalizat — text afișat în banner (opțional; dacă e gol, se generează automat din celelalte câmpuri)' },
      { tip: 'bullet', text: 'Apasă "Salvează setările" — bannerul apare imediat pe site' },
      { tip: 'subtitlu', text: 'Exemplu banner generat automat' },
      { tip: 'text', text: '"Comandă de peste 50 RON și primești 10% reducere! Menționează la comandă."' },
    ],
  },
  {
    titlu: 'Gestionarea datelor din Supabase',
    continut: [
      { tip: 'text', text: 'Accesul direct la baza de date este disponibil pe https://supabase.com/dashboard → proiect "vibe-caffe".' },
      { tip: 'subtitlu', text: 'Tabele principale' },
      { tip: 'bullet', text: 'menu_items — produsele din meniu (id, name, category, price, description, image_url, discount_type, discount_amount, available, sort_order, tag, tenant_id)' },
      { tip: 'bullet', text: 'rezervari — rezervările clienților (id, name, phone, email, date, time, persons, status, created_at)' },
      { tip: 'bullet', text: 'holiday_config (id=1) — configurarea meniului de sărbători' },
      { tip: 'bullet', text: 'promo_config (id=1) — configurarea bannerului promoțional' },
      { tip: 'bullet', text: 'newsletter_subscribers — abonații la newsletter' },
      { tip: 'subtitlu', text: 'SQL Editor — operații utile' },
      { tip: 'bullet', text: 'Vizualizare produse: SELECT * FROM menu_items ORDER BY category, sort_order;' },
      { tip: 'bullet', text: 'Setare tag: UPDATE menu_items SET tag = \'Bestseller\' WHERE name = \'Flat White\';' },
      { tip: 'bullet', text: 'Dezactivare produs: UPDATE menu_items SET available = false WHERE name = \'Produs\';' },
      { tip: 'bullet', text: 'Vizualizare rezervări noi: SELECT * FROM rezervari WHERE status = \'noua\' ORDER BY created_at DESC;' },
    ],
  },
  {
    titlu: 'Configurarea variabilelor de mediu (Vercel)',
    continut: [
      { tip: 'text', text: 'Accesează https://vercel.com → proiect vibe-website2 → Settings → Environment Variables.' },
      { tip: 'bullet', text: 'NEXT_PUBLIC_SUPABASE_URL — URL-ul proiectului Supabase' },
      { tip: 'bullet', text: 'NEXT_PUBLIC_SUPABASE_ANON_KEY — cheia publică Supabase (anon key)' },
      { tip: 'bullet', text: 'ADMIN_SECRET — parola de acces în /admin (schimb-o periodic pentru securitate)' },
      { tip: 'text', text: 'IMPORTANT: după modificarea oricărei variabile de mediu, este necesară un nou deploy pe Vercel pentru ca schimbarea să intre în vigoare.' },
    ],
  },
  {
    titlu: 'Fluxuri de lucru recomandate',
    continut: [
      { tip: 'subtitlu', text: 'Adăugare produs nou în meniu' },
      { tip: 'bullet', text: '1. Intră în /admin → tab Meniu' },
      { tip: 'bullet', text: '2. Apasă "+ Produs nou"' },
      { tip: 'bullet', text: '3. Completează wizard-ul (3 pași)' },
      { tip: 'bullet', text: '4. Confirmă — produsul apare live după max. 1 oră (cache SSR)' },
      { tip: 'subtitlu', text: 'Activare promoție de weekend' },
      { tip: 'bullet', text: '1. Intră în /admin → tab Setări' },
      { tip: 'bullet', text: '2. Activează bannerul, setează comandă minimă și reducere' },
      { tip: 'bullet', text: '3. Adaugă mesaj personalizat (opțional)' },
      { tip: 'bullet', text: '4. Apasă "Salvează" — bannerul apare imediat pe /meniu' },
      { tip: 'bullet', text: '5. La finalul weekendului: dezactivează bannerul și salvează din nou' },
      { tip: 'subtitlu', text: 'Confirmarea rezervărilor de dimineață' },
      { tip: 'bullet', text: '1. Intră în /admin → tab Rezervări' },
      { tip: 'bullet', text: '2. Filtrează rezervările cu status "Nouă"' },
      { tip: 'bullet', text: '3. Contactează clienții la telefon pentru confirmare' },
      { tip: 'bullet', text: '4. Schimbă statusul în "Confirmată" sau "Anulată"' },
      { tip: 'subtitlu', text: 'Export lunar al rezervărilor' },
      { tip: 'bullet', text: '1. Intră în /admin → tab Rezervări' },
      { tip: 'bullet', text: '2. Apasă "Export Excel" pentru raportul complet cu analiză' },
      { tip: 'bullet', text: '3. Fișierul se descarcă automat pe calculator' },
    ],
  },
  {
    titlu: 'Rezolvarea problemelor frecvente',
    continut: [
      { tip: 'subtitlu', text: 'Nu mă pot loga în /admin' },
      { tip: 'bullet', text: 'Verifică că introduci parola corectă (case-sensitive)' },
      { tip: 'bullet', text: 'Verifică variabila ADMIN_SECRET pe Vercel (Settings → Environment Variables)' },
      { tip: 'bullet', text: 'Dacă ai schimbat ADMIN_SECRET recent, așteaptă un nou deploy Vercel' },
      { tip: 'subtitlu', text: 'Un produs nu apare pe site după adăugare' },
      { tip: 'bullet', text: 'Verifică că toggle-ul "Disponibil" este activat' },
      { tip: 'bullet', text: 'Pagina /meniu are cache SSR de 1 oră (revalidate: 3600) — produsul apare după max. 1 oră' },
      { tip: 'bullet', text: 'Pentru vizibilitate imediată: trigger manual un nou deploy pe Vercel' },
      { tip: 'subtitlu', text: 'Produsele apar duplicate în meniu' },
      { tip: 'bullet', text: 'Verifică în Supabase → tabel menu_items că nu există rânduri duplicate cu același name + category' },
      { tip: 'bullet', text: 'Șterge rândurile duplicate din SQL Editor: DELETE FROM menu_items WHERE id IN (SELECT id FROM menu_items WHERE name = \'Produs\' LIMIT 1);' },
      { tip: 'subtitlu', text: 'Cursul valutar afișează "(estimativ)"' },
      { tip: 'bullet', text: 'BNR nu a răspuns în ultimele 60 de minute — se folosesc rate de fallback (EUR=4.97, USD=4.56)' },
      { tip: 'bullet', text: 'Nu necesită intervenție — se corectează automat când BNR revine online' },
    ],
  },
];

// ─── DOCX ────────────────────────────────────────────────────────────────────

async function genDocx(outPath) {
  const children = [];

  const sep = () => new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: 'E5E7EB' } },
    spacing: { before: 200, after: 200 },
  });

  // Copertă
  children.push(new Paragraph({
    children: [new TextRun({ text: TITLU, bold: true, size: 40, font: 'DejaVu Sans', color: '991B1B' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
  }));
  children.push(new Paragraph({
    children: [new TextRun({ text: SUBTITLU, size: 22, font: 'DejaVu Sans', color: '6B7280' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
  }));
  children.push(new Paragraph({
    children: [new TextRun({ text: AVERTISMENT, size: 20, font: 'DejaVu Sans', color: 'B91C1C', bold: true })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
  }));
  children.push(new Paragraph({
    children: [new TextRun({ text: `Versiune: ${DATE}`, size: 18, font: 'DejaVu Sans', color: '9CA3AF', italics: true })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 500 },
  }));
  children.push(sep());

  for (const sectiune of SECTIUNI) {
    children.push(new Paragraph({
      text: sectiune.titlu,
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 200 },
    }));

    for (const item of sectiune.continut) {
      if (item.tip === 'text') {
        children.push(new Paragraph({
          children: [new TextRun({ text: item.text, font: 'DejaVu Sans', size: 21, color: '374151' })],
          spacing: { after: 120 },
        }));
      } else if (item.tip === 'subtitlu') {
        children.push(new Paragraph({
          children: [new TextRun({ text: item.text, font: 'DejaVu Sans', size: 22, bold: true, color: '111827' })],
          spacing: { before: 200, after: 80 },
        }));
      } else if (item.tip === 'bullet') {
        children.push(new Paragraph({
          children: [new TextRun({ text: item.text, font: 'DejaVu Sans', size: 20, color: '374151' })],
          bullet: { level: 0 },
          spacing: { after: 70 },
        }));
      }
    }
    children.push(sep());
  }

  children.push(new Paragraph({
    children: [new TextRun({ text: `Manual Administrator · Vibe Caffè · ${DATE} · CONFIDENȚIAL`, font: 'DejaVu Sans', size: 16, color: '9CA3AF', italics: true })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 300 },
  }));

  const doc = new Document({ sections: [{ children }] });
  fs.writeFileSync(outPath, await Packer.toBuffer(doc));
  console.log(`✅ DOCX: ${outPath}`);
}

// ─── PDF ─────────────────────────────────────────────────────────────────────

async function genPdf(outPath) {
  const doc = createPdf({ size: 'A4', margins: { top: 55, bottom: 55, left: 65, right: 65 } });
  const out = fs.createWriteStream(outPath);
  doc.pipe(out);

  const line = () => {
    doc.moveTo(65, doc.y).lineTo(530, doc.y).strokeColor('#E5E7EB').lineWidth(1).stroke();
    doc.moveDown(0.8);
  };

  // Copertă
  doc.font('Bold').fontSize(20).fillColor('#991B1B').text(TITLU, { align: 'center' });
  doc.moveDown(0.3);
  doc.font('Regular').fontSize(11).fillColor('#6B7280').text(SUBTITLU, { align: 'center' });
  doc.moveDown(0.3);
  doc.font('Bold').fontSize(10).fillColor('#B91C1C').text(AVERTISMENT, { align: 'center' });
  doc.moveDown(0.3);
  doc.font('Italic').fontSize(9).fillColor('#9CA3AF').text(`Versiune: ${DATE}`, { align: 'center' });
  doc.moveDown(1.2);
  line();

  for (const sectiune of SECTIUNI) {
    if (doc.y > 680) doc.addPage();

    doc.font('Bold').fontSize(13).fillColor('#111827').text(sectiune.titlu);
    doc.moveDown(0.4);

    for (const item of sectiune.continut) {
      if (doc.y > 730) doc.addPage();

      if (item.tip === 'text') {
        doc.font('Regular').fontSize(10).fillColor('#374151').text(item.text, { lineGap: 2 });
        doc.moveDown(0.4);
      } else if (item.tip === 'subtitlu') {
        doc.moveDown(0.2);
        doc.font('Bold').fontSize(10.5).fillColor('#1F2937').text(item.text);
        doc.moveDown(0.2);
      } else if (item.tip === 'bullet') {
        doc.font('Regular').fontSize(9.5).fillColor('#374151').text(`• ${item.text}`, { indent: 12, lineGap: 2 });
        doc.moveDown(0.15);
      }
    }
    doc.moveDown(0.4);
    line();
  }

  doc.font('Italic').fontSize(8.5).fillColor('#9CA3AF')
    .text(`Manual Administrator · Vibe Caffè · ${DATE} · CONFIDENȚIAL`, { align: 'center' });

  doc.end();
  await new Promise((res, rej) => { out.on('finish', res); out.on('error', rej); });
  console.log(`✅ PDF:  ${outPath}`);
}

const base = path.join(OUTPUT_DIR, 'manual-administrator');
await genDocx(`${base}.docx`);
await genPdf(`${base}.pdf`);
console.log('\n🎉 Gata!');
