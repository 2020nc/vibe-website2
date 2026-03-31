/**
 * Generează recapitularea sesiunii 1 din Modul 4 — Vibe Caffè
 * Fișiere: docs/recap-modul4-sesiune1.docx + .pdf
 *
 * Subiecte acoperite:
 *  - Componenta About adăugată pe homepage
 *  - Google Maps real pe pagina /locatie
 *  - Footer cu Newsletter (Supabase) + Social Media
 *  - Opțiuni personalizare meniu (add-on-uri)
 */

const fs   = require('fs');
const path = require('path');

const { createPdf } = require('C:/Users/Admin/.claude/pdf-utils/createPdf');

const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  Table, TableRow, TableCell, WidthType, AlignmentType,
  BorderStyle,
} = require('docx');

const OUT_DIR = path.join(__dirname, '..', 'docs');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const TITLU    = 'Vibe Caffè — Modul 4, Sesiunea 1';
const SUBTITLU = 'About, Locație, Newsletter, Personalizare Meniu';
const DATA     = '31 martie 2026';

// ─── CONȚINUT ─────────────────────────────────────────────────────────────────

const sectiuni = [
  {
    titlu: '1. Ce am construit în această sesiune',
    continut: [
      'Această sesiune a adăugat patru funcționalități noi proiectului Vibe Caffè, completând experiența vizitatorului pe site: o secțiune de prezentare a cafenelei (About), o hartă interactivă pe pagina de locație, un footer complet cu newsletter și rețele sociale, și posibilitatea de a personaliza orice comandă din meniu cu opțiuni suplimentare.',
    ],
  },
  {
    titlu: '2. Secțiunea About — Povestea cafenelei',
    continut: [
      'Componenta About.tsx exista deja în proiect, dar nu era folosită nicăieri. Am integrat-o în app/page.tsx, plasând-o între meniu și footer — locul logic unde vizitatorul care a parcurs meniul descoperă povestea din spatele cafenelei.',
      'Componenta folosește două tehnici avansate de animație: Intersection Observer (useScrollAnimation hook) pentru a declanșa animațiile abia când elementul devine vizibil în viewport, și un efect parallax pe imagine, calculat cu requestAnimationFrame pentru performanță maximă. Textul și lista cu caracteristici ale cafenelei apar cu animații staggered — fiecare element apare cu un mic decalaj față de cel anterior, creând un efect de cascadă.',
      'Lecție cheie: un component React existent nu apare automat pe pagină — trebuie importat și plasat explicit în ierarhia JSX.',
    ],
  },
  {
    titlu: '3. Google Maps real pe pagina /locatie',
    continut: [
      'Pagina /locatie/page.tsx exista deja cu un placeholder SVG în locul hărții. Am înlocuit placeholder-ul cu un iframe Google Maps real, care afișează Bulevardul Regina Elisabeta nr. 30, Sector 5, București.',
      'Tehnica folosită: Google Maps Embed API fără cheie API. Prin URL-ul de forma maps.google.com/maps?q=adresa&output=embed, Google permite afișarea hărților gratuit pe orice site, fără a fi nevoie de o cheie API. Atributul loading="lazy" face ca harta să se încarce abia când utilizatorul derulează până la ea, economisind lățime de bandă.',
      'Am actualizat și adresa afișată în text din adresa fictivă Strada Cafenelelor la adresa reală Bld. Regina Elisabeta, Nr. 30, Sector 5, București.',
    ],
  },
  {
    titlu: '4. Footer complet — Newsletter și Social Media',
    continut: [
      'FooterStarter.tsx era un footer minimal de 18 linii, cu doar un text de copyright. L-am transformat într-un footer profesional cu trei coloane, wave separator SVG, iconuri sociale și formular de newsletter conectat la Supabase.',
      'Structura noului footer: Coloana 1 — Brand (logo, descriere, iconuri Instagram/Facebook/TikTok). Coloana 2 — Navigare (linkuri interne) și Contact (adresă, telefon). Coloana 3 — Newsletter (formular cu feedback vizual).',
      'Formularul de newsletter are patru stări distincte: idle (starea inițială), loading (se afișează "Se trimite..." și butonul devine inactiv), success (mesaj de confirmare, câmpul se golește), duplicate (avertisment că email-ul există deja) și error (mesaj generic de eroare). Aceste stări sunt gestionate cu useState și un apel fetch la API-ul intern.',
      'Pe server, ruta /api/newsletter/route.ts inserează email-ul în Supabase și tratează eroarea PostgreSQL cu codul 23505, care înseamnă "unique constraint violation" — adică email-ul există deja. Returnează HTTP 409 (Conflict) în acest caz, pe care clientul îl interpretează și afișează mesajul potrivit.',
    ],
  },
  {
    titlu: '5. Personalizare meniu — Add-on-uri',
    continut: [
      'Am adăugat posibilitatea de a personaliza orice produs din meniu cu opțiuni suplimentare: lapte de ovăz (+3 RON), lapte de soia (+3 RON), lapte de migdale (+3 RON), shot espresso extra (+4 RON), sirop vanilie (+2 RON), sirop caramel (+2 RON) și sirop alune (+2 RON).',
      'Fiecare card de produs are acum un buton "Personalizează comanda" care expandează un panel cu checkbox-uri. Totalul estimat se calculează în timp real pe măsură ce utilizatorul bifează opțiunile. Un text mic ("Spune barista-ului opțiunile la comandă") clarifică că aceasta este o informație pentru vizitator, nu un sistem de comandă online.',
      'Implementare tehnică: ADD_ONS este un array constant hardcodat — nu necesită bază de date deoarece aceste opțiuni sunt aceleași pentru toate produsele. Starea selected este un Record<string, Set<string>>, adică un dicționar unde cheia este ID-ul produsului și valoarea este mulțimea add-on-urilor selectate pentru acel produs. Astfel fiecare card își păstrează selecția independentă.',
    ],
  },
  {
    titlu: '6. Tabel Supabase necesar — Acțiune manuală',
    continut: [
      'Newsletter-ul necesită un tabel nou în Supabase. Rulează această comandă SQL în Supabase Dashboard → SQL Editor:',
      'CREATE TABLE newsletter_subscribers (\n  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,\n  email text NOT NULL UNIQUE,\n  created_at timestamptz DEFAULT now()\n);',
      'Coloanele: id (identificator unic generat automat), email (adresa de email, unică — nu permite duplicatele), created_at (data abonării, setată automat la ora curentă).',
    ],
  },
  {
    titlu: '7. Fișiere modificate și create',
    continut: [
      'app/page.tsx — adăugat import About + <About /> între MenuStarter și FooterStarter',
      'app/locatie/page.tsx — înlocuit placeholder SVG cu <iframe> Google Maps real; actualizată adresa',
      'components/FooterStarter.tsx — rescris complet: footer 3 coloane cu newsletter + social media',
      'app/api/newsletter/route.ts — nou: POST /api/newsletter cu validare email și tratare duplicate',
      'components/MenuStarter.tsx — adăugat ADD_ONS constant + panel expandabil cu checkbox-uri per card',
    ],
  },
  {
    titlu: '8. Concepte cheie din această sesiune',
    continut: [
      'useState cu tipuri complexe: Set<string> pentru colecții fără duplicate, Record<K,V> pentru dicționare. Aceste tipuri sunt ideale pentru gestionarea selecțiilor multiple și independente.',
      'HTTP status codes semantice: 201 Created (resursă creată cu succes), 400 Bad Request (date invalide), 409 Conflict (resursa există deja), 500 Internal Server Error (eroare de server).',
      'Google Maps Embed fără cheie API: soluție gratuită și simplă pentru afișarea hărților pe site-uri publice.',
      'UX pentru formulare: feedback vizual imediat (stări loading/success/error) reduce anxietatea utilizatorului și previne dubla submisie.',
      'Intersection Observer: animațiile ar trebui declanșate doar când elementul devine vizibil, nu la încărcarea paginii. Aceasta economisește resurse și îmbunătățește experiența de scroll.',
    ],
  },
];

// ─── GENERARE DOCX ────────────────────────────────────────────────────────────

function makeTitle(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.TITLE,
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
  });
}

function makeHeading(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 120 },
    border: {
      bottom: { color: '14B8A6', style: BorderStyle.SINGLE, size: 4 },
    },
  });
}

function makeBody(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22, font: 'Calibri' })],
    spacing: { after: 160 },
  });
}

function makeCode(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 20, font: 'Courier New', color: '1F2937' })],
    spacing: { after: 100 },
    indent: { left: 720 },
  });
}

async function genDocx() {
  const children = [
    makeTitle(TITLU),
    new Paragraph({
      text: SUBTITLU,
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [new TextRun({ text: SUBTITLU, size: 26, color: '6B7280', font: 'Calibri' })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
      children: [new TextRun({ text: DATA, size: 22, color: '9CA3AF', font: 'Calibri' })],
    }),
  ];

  for (const sec of sectiuni) {
    children.push(makeHeading(sec.titlu));
    for (const para of sec.continut) {
      if (para.startsWith('CREATE TABLE') || para.startsWith('  ')) {
        for (const line of para.split('\n')) {
          children.push(makeCode(line));
        }
      } else {
        children.push(makeBody(para));
      }
    }
  }

  const doc = new Document({
    sections: [{ children }],
  });

  const buf = await Packer.toBuffer(doc);
  const outPath = path.join(OUT_DIR, 'recap-modul4-sesiune1.docx');
  fs.writeFileSync(outPath, buf);
  console.log('DOCX salvat:', outPath);
}

// ─── GENERARE PDF ─────────────────────────────────────────────────────────────

function genPdf() {
  const lines = [];
  lines.push({ type: 'title', text: TITLU });
  lines.push({ type: 'subtitle', text: SUBTITLU });
  lines.push({ type: 'subtitle', text: DATA });
  lines.push({ type: 'spacer' });

  for (const sec of sectiuni) {
    lines.push({ type: 'heading', text: sec.titlu });
    for (const para of sec.continut) {
      if (para.startsWith('CREATE TABLE') || para.startsWith('  ')) {
        lines.push({ type: 'code', text: para });
      } else {
        lines.push({ type: 'body', text: para });
      }
    }
    lines.push({ type: 'spacer' });
  }

  const outPath = path.join(OUT_DIR, 'recap-modul4-sesiune1.pdf');
  createPdf(lines, outPath);
  console.log('PDF salvat:', outPath);
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

(async () => {
  await genDocx();
  genPdf();
  console.log('\nDocumentație generată cu succes în /docs/');
})();
