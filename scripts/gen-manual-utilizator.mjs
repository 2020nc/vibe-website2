/**
 * Generează Manual de Utilizare (vizitatori site) → DOCX + PDF
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
const TITLU = 'Manual de Utilizare — Vibe Caffè';
const SUBTITLU = 'Ghid complet pentru vizitatorii site-ului vibe-website2.vercel.app';

const SECTIUNI = [
  {
    titlu: 'Prezentare generală',
    continut: [
      { tip: 'text', text: 'Site-ul Vibe Caffè este disponibil la adresa https://vibe-website2.vercel.app și oferă vizitatorilor acces rapid la meniu, prețuri, rezervări și informații de locație.' },
      { tip: 'text', text: 'Nu este necesară crearea unui cont pentru a accesa nicio funcționalitate publică a site-ului.' },
    ],
  },
  {
    titlu: 'Navigarea pe site',
    continut: [
      { tip: 'subtitlu', text: 'Bara de navigare (Navbar)' },
      { tip: 'text', text: 'În partea de sus a fiecărei pagini se află bara de navigare cu următoarele elemente:' },
      { tip: 'bullet', text: 'Meniu — duce la pagina cu meniul complet și prețurile actualizate' },
      { tip: 'bullet', text: 'De ce Vibe? — derulează homepage-ul la secțiunea cu diferențiatorii cafenelei' },
      { tip: 'bullet', text: 'Locație — duce la pagina cu adresa, harta și programul' },
      { tip: 'bullet', text: 'Toggle lumină/întuneric (☀️/🌙) — schimbă tema site-ului între light și dark mode' },
      { tip: 'bullet', text: 'Rezervă Masă (buton teal) — duce direct la formularul de rezervare' },
      { tip: 'subtitlu', text: 'Dark Mode (Tema întunecată)' },
      { tip: 'text', text: 'Apasă pe iconița ☀️/🌙 din navbar pentru a comuta între tema deschisă și cea "Cafea de Noapte" (fonduri maro-închis, text crem). Preferința nu se salvează automat între vizite.' },
    ],
  },
  {
    titlu: 'Homepage',
    continut: [
      { tip: 'text', text: 'Pagina principală (/) conține toate informațiile esențiale organizate de sus în jos:' },
      { tip: 'subtitlu', text: 'Hero — Prima secțiune' },
      { tip: 'bullet', text: '"Cafea de specialitate, brunch și un loc în care vrei să revii" — titlul principal' },
      { tip: 'bullet', text: 'Buton "Vezi meniul" (teal) — duce la /meniu' },
      { tip: 'bullet', text: 'Buton "Rezervă masă" (portocaliu) — duce la /rezervari' },
      { tip: 'subtitlu', text: 'Recenzii (ReviewBar)' },
      { tip: 'bullet', text: 'Rating agregat: ⭐ 4.9 / 5 bazat pe 340+ recenzii Google' },
      { tip: 'bullet', text: '3 testimoniale de la clienți reali: Andreea M., Mihai T., Raluca D.' },
      { tip: 'subtitlu', text: 'De ce Vibe? — Diferențiatori' },
      { tip: 'bullet', text: 'Cafea de specialitate — boabe single-origin, preparare calibrată' },
      { tip: 'bullet', text: 'Spațiu work-friendly — Wi-Fi stabil, prize la fiecare masă' },
      { tip: 'bullet', text: 'Brunch & deserturi — ingrediente proaspete, patiserie artizanală' },
      { tip: 'bullet', text: 'Locație centrală — Bld. Regina Elisabeta 30, Sector 5' },
      { tip: 'subtitlu', text: 'Din meniul nostru — Preview' },
      { tip: 'text', text: '6 produse reprezentative cu prețuri (Flat White, Cappuccino, Cold Brew Tonic, Cheesecake, Croissant, Brownie). Butonul "Vezi meniul complet" duce la pagina /meniu.' },
      { tip: 'subtitlu', text: 'Oferte sezoniere' },
      { tip: 'text', text: '3 produse disponibile în perioada curentă: Latte de Lavandă, Cold Brew Tonic, Brunch Festiv de Weekend. Butonul "Vezi toate ofertele" duce la /sarbatori.' },
      { tip: 'subtitlu', text: 'CTA Rezervare' },
      { tip: 'text', text: 'Bloc teal cu butonul "Rezervă masă" (portocaliu) — calea directă spre rezervare fără să urci înapoi în navbar.' },
      { tip: 'subtitlu', text: 'Unde ne găsești' },
      { tip: 'bullet', text: 'Adresă: Bld. Regina Elisabeta 30, Sector 5, București' },
      { tip: 'bullet', text: 'Program: Luni–Vineri 08:00–22:00 / Sâmbătă–Duminică 09:00–23:00' },
      { tip: 'bullet', text: 'Telefon: +40 721 234 567 (link apelabil pe mobil)' },
      { tip: 'bullet', text: 'Buton "Deschide în Google Maps" — deschide harta direct în browser/aplicație' },
    ],
  },
  {
    titlu: 'Pagina Meniu (/meniu)',
    continut: [
      { tip: 'text', text: 'Accesibilă din navbar sau din butonul "Vezi meniu" de pe homepage. Afișează produsele din Supabase organizate pe categorii cu filtre interactive.' },
      { tip: 'subtitlu', text: 'Categorii disponibile' },
      { tip: 'bullet', text: 'Cold Brew — 5 produse: Cold Brew Classic, Cold Brew Tonic, Nitro Cold Brew, Iced Latte, Iced Matcha Latte' },
      { tip: 'bullet', text: 'Espresso — 5 produse: Espresso, Americano, Cappuccino, Flat White, Latte' },
      { tip: 'bullet', text: 'Patiserie — 6 produse: Croissant cu Unt, Pain au Chocolat, Cheesecake, Brownie, Carrot Cake, Banana Bread' },
      { tip: 'bullet', text: 'Specialty — produse de filtru: V60 Pour Over, AeroPress, Chemex, Cortado, Magic Coffee, Cold Drip' },
      { tip: 'subtitlu', text: 'Cum folosești filtrele' },
      { tip: 'bullet', text: 'Apasă pe numele categoriei (Cold Brew, Espresso etc.) pentru a vedea doar produsele din acea categorie' },
      { tip: 'bullet', text: 'Cardurile se schimbă cu o animație de fade' },
      { tip: 'subtitlu', text: 'Toggle valută (RON / EUR / USD)' },
      { tip: 'bullet', text: 'Apasă RON, EUR sau USD pentru a vedea prețurile în valuta dorită' },
      { tip: 'bullet', text: 'Cursul de schimb este actualizat automat de la BNR (cache 1 oră)' },
      { tip: 'bullet', text: 'Cursul curent este afișat lângă toggle: "1€=5.10 RON · 1$=4.42 RON"' },
      { tip: 'subtitlu', text: 'Toggle coloane (3 / 4 / 5) — doar desktop' },
      { tip: 'bullet', text: 'Controlează câte produse apar pe un rând în grid' },
      { tip: 'bullet', text: 'Preferința este salvată în browser (localStorage) — rămâne la vizita următoare' },
      { tip: 'subtitlu', text: 'Badge-uri pe carduri' },
      { tip: 'bullet', text: 'Bestseller (portocaliu-auriu) — produsul cel mai comandat' },
      { tip: 'bullet', text: 'Signature (teal) — rețetă exclusivă Vibe Caffè' },
      { tip: 'bullet', text: 'Staff Pick (portocaliu) — recomandarea echipei' },
      { tip: 'bullet', text: 'Sezonier (verde) — disponibil limitat, în funcție de sezon' },
      { tip: 'bullet', text: '-X RON sau -X% (roșu) — produs cu reducere activă' },
      { tip: 'subtitlu', text: 'Descrierile produselor' },
      { tip: 'text', text: 'Fiecare card afișează: descriere senzorială scurtă · Variante de lapte disponibile · Volum în ml. Exemplu: "Infuzie la rece 18 ore, smooth și fără aciditate. · Variante: clasic / lapte de ovăz · 300ml"' },
      { tip: 'subtitlu', text: 'Personalizează comanda' },
      { tip: 'bullet', text: 'Apasă "▼ Personalizează comanda" pe orice card pentru a deschide panoul de add-on-uri' },
      { tip: 'bullet', text: 'Add-on-uri disponibile: Lapte de ovăz (+3 RON), Lapte de soia (+3 RON), Lapte de migdale (+3 RON), Shot espresso extra (+4 RON), Sirop vanilie/caramel/alune (+2 RON fiecare)' },
      { tip: 'bullet', text: 'Totalul estimat se calculează automat pe măsură ce bifezi opțiunile' },
      { tip: 'bullet', text: 'Menționează opțiunile selectate la comandă — panoul este informativ, nu trimite comanda automat' },
      { tip: 'subtitlu', text: 'Banner promoțional' },
      { tip: 'text', text: 'Dacă este activă o promoție (configurată de admin), apare un banner galben deasupra meniului cu detaliile ofertei.' },
    ],
  },
  {
    titlu: 'Pagina Rezervări (/rezervari)',
    continut: [
      { tip: 'text', text: 'Formularul de rezervare în 3 pași. Nu este necesară autentificarea — oricine poate rezerva o masă.' },
      { tip: 'subtitlu', text: 'Pasul 1 — Detalii rezervare' },
      { tip: 'bullet', text: 'Data dorită — selectezi din calendar' },
      { tip: 'bullet', text: 'Ora — selectezi din lista de intervale disponibile' },
      { tip: 'bullet', text: 'Număr de persoane' },
      { tip: 'subtitlu', text: 'Pasul 2 — Date de contact' },
      { tip: 'bullet', text: 'Nume complet' },
      { tip: 'bullet', text: 'Număr de telefon (pentru confirmare)' },
      { tip: 'bullet', text: 'Email (opțional)' },
      { tip: 'subtitlu', text: 'Pasul 3 — Confirmare' },
      { tip: 'bullet', text: 'Rezumatul rezervării pentru verificare finală' },
      { tip: 'bullet', text: 'Buton "Confirmă rezervarea" — trimite datele în baza de date' },
      { tip: 'bullet', text: 'Mesaj de confirmare la trimitere reușită' },
      { tip: 'text', text: 'Rezervarea apare imediat în panoul de admin. Cafeneaua te poate contacta la numărul furnizat pentru confirmare.' },
    ],
  },
  {
    titlu: 'Pagina Locație (/locatie)',
    continut: [
      { tip: 'bullet', text: 'Adresă completă: Bld. Regina Elisabeta 30, Sector 5, București' },
      { tip: 'bullet', text: 'Hartă Google Maps încorporată — interactivă, se poate zoom/pan' },
      { tip: 'bullet', text: 'Buton "Deschide în Google Maps" — navigație directă' },
      { tip: 'bullet', text: 'Buton "Sună acum" — apel telefonic direct pe mobil' },
      { tip: 'bullet', text: 'Buton "Rezervă masă" — shortcut spre formularul de rezervare' },
      { tip: 'subtitlu', text: 'Mini-FAQ' },
      { tip: 'bullet', text: 'Este necesară rezervarea? — Recomandat pentru weekend și ore de vârf' },
      { tip: 'bullet', text: 'Există parcare? — Parcare publică pe strada adiacentă' },
      { tip: 'bullet', text: 'Când este mai aglomerat? — Sâmbătă și duminică 10:00–14:00' },
    ],
  },
  {
    titlu: 'Pagina Oferte Sezoniere (/sarbatori)',
    continut: [
      { tip: 'text', text: 'Pagina prezintă ofertele și produsele disponibile în perioada curentă, cu prețuri și CTA-uri specifice.' },
      { tip: 'bullet', text: 'Brunch Festiv de Weekend — 36 lei — buton "Rezervă loc"' },
      { tip: 'bullet', text: 'Coffee Tonic — 22 lei — buton "Vezi meniul"' },
      { tip: 'bullet', text: 'Latte de Lavandă — 20 lei — buton "Comandă acum"' },
      { tip: 'bullet', text: 'Pachet Cadou Cafea — 80 lei — buton "Contactează-ne"' },
    ],
  },
  {
    titlu: 'Pagini legale',
    continut: [
      { tip: 'text', text: 'Accesibile din footer-ul site-ului (jos, pe orice pagină):' },
      { tip: 'bullet', text: '/confidentialitate — Politică de confidențialitate GDPR: ce date colectăm, cum le folosim, drepturile tale' },
      { tip: 'bullet', text: '/cookies — Tipuri de cookies folosite: strict necesare, preferințe, analitice' },
      { tip: 'bullet', text: '/termeni — Termeni și condiții: rezervări, prețuri, utilizare site' },
    ],
  },
  {
    titlu: 'Newsletter (Footer)',
    continut: [
      { tip: 'text', text: 'În footer există un câmp de abonare la newsletter. Introdu adresa de email și apasă butonul pentru a te abona la ofertele și noutățile Vibe Caffè.' },
      { tip: 'text', text: 'Datele sunt stocate securizat în baza de date. Te poți dezabona oricând contactând cafeneaua.' },
    ],
  },
  {
    titlu: 'Întrebări frecvente',
    continut: [
      { tip: 'subtitlu', text: 'Site-ul funcționează fără JavaScript?' },
      { tip: 'text', text: 'Da — paginile principale (homepage, meniu, locație) sunt server-rendered și se încarcă corect chiar și cu JavaScript dezactivat.' },
      { tip: 'subtitlu', text: 'Cum văd prețurile în euro sau dolari?' },
      { tip: 'text', text: 'Pe pagina /meniu, apasă butonul EUR sau USD din bara de toggle valută. Cursul este actualizat automat de la BNR.' },
      { tip: 'subtitlu', text: 'Pot anula o rezervare?' },
      { tip: 'text', text: 'Contactează cafeneaua direct la +40 721 234 567 sau pe email pentru anulare. Nu există funcție de anulare online în prezent.' },
      { tip: 'subtitlu', text: 'Site-ul funcționează bine pe telefon?' },
      { tip: 'text', text: 'Da — site-ul este complet responsive. Pe mobil, meniul de produse afișează un card pe rând și toate funcțiile sunt accesibile.' },
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
    children: [new TextRun({ text: TITLU, bold: true, size: 44, font: 'DejaVu Sans', color: '0D9488' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
  }));
  children.push(new Paragraph({
    children: [new TextRun({ text: SUBTITLU, size: 22, font: 'DejaVu Sans', color: '6B7280' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
  }));
  children.push(new Paragraph({
    children: [new TextRun({ text: `Versiune: ${DATE} · https://vibe-website2.vercel.app`, size: 18, font: 'DejaVu Sans', color: '9CA3AF', italics: true })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 600 },
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
          spacing: { before: 180, after: 80 },
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

  // Footer
  children.push(new Paragraph({
    children: [new TextRun({ text: `Manual de Utilizare · Vibe Caffè · ${DATE}`, font: 'DejaVu Sans', size: 16, color: '9CA3AF', italics: true })],
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
  doc.font('Bold').fontSize(22).fillColor('#0D9488').text(TITLU, { align: 'center' });
  doc.moveDown(0.3);
  doc.font('Regular').fontSize(11).fillColor('#6B7280').text(SUBTITLU, { align: 'center' });
  doc.moveDown(0.3);
  doc.font('Italic').fontSize(9).fillColor('#9CA3AF').text(`Versiune: ${DATE} · https://vibe-website2.vercel.app`, { align: 'center' });
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
    .text(`Manual de Utilizare · Vibe Caffè · ${DATE}`, { align: 'center' });

  doc.end();
  await new Promise((res, rej) => { out.on('finish', res); out.on('error', rej); });
  console.log(`✅ PDF:  ${outPath}`);
}

const base = path.join(OUTPUT_DIR, 'manual-utilizator');
await genDocx(`${base}.docx`);
await genPdf(`${base}.pdf`);
console.log('\n🎉 Gata!');
