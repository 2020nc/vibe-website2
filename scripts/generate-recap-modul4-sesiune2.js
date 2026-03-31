/**
 * Generează recapitularea sesiunii 2 din Modul 4 — Vibe Caffè
 * Fișiere: docs/recap-modul4-sesiune2.docx + .pdf
 *
 * Subiecte acoperite:
 *  - Audit și fix responsive (admin, bulk bar, tabs)
 *  - Toggle 3/4/5 coloane meniu cu localStorage
 *  - Banner promoțional configurat din Admin
 *  - Prețuri în EUR/USD via API BNR cu cache
 */

const fs   = require('fs');
const path = require('path');

const { createPdf } = require('C:/Users/Admin/.claude/pdf-utils/createPdf');

const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, BorderStyle,
} = require('docx');

const OUT_DIR = path.join(__dirname, '..', 'docs');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const TITLU    = 'Vibe Caffè — Modul 4, Sesiunea 2';
const SUBTITLU = 'Responsive, Toggle Coloane, Banner Promoțional, Valută';
const DATA     = '31 martie 2026';

// ─── CONȚINUT ─────────────────────────────────────────────────────────────────

const sectiuni = [
  {
    titlu: '1. Ce am construit în această sesiune',
    continut: [
      'Această sesiune a adăugat patru funcționalități distincte proiectului Vibe Caffè. Prima a fost un audit complet de responsive design, urmat de un toggle pentru numărul de coloane din meniu, un banner promoțional configurat din panoul admin și posibilitatea de a vizualiza prețurile în EUR sau USD la cursul zilei de la BNR.',
    ],
  },
  {
    titlu: '2. Audit și fix responsive design',
    continut: [
      'Am auditat toate componentele noi adăugate în sesiunea anterioară pentru comportament corect pe ecrane mici (telefon, tabletă). Codul existent folosea deja patternuri responsive corecte: grid-cols-1 md:grid-cols-3, flex-col md:flex-row. Am identificat și remediat trei locuri specifice.',
      'Admin — tabs: div-ul cu tab-urile "Rezervări / Meniu / Sărbători" folosea flex gap-2 fără flex-wrap. Pe telefon, tab-ul "🎉 Sărbători" ieșea în afara ecranului. Fix: adăugat flex-wrap.',
      'Admin — bara bulk: Bara cu acțiunile de selecție în masă (Confirmă/Respinge/Șterge) avea butoanele într-un div fără flex-wrap. Pe ecrane înguste, butoanele se suprapuneau. Fix: adăugat flex-wrap pe ambele containere.',
      'Admin — butoane export: Butoanele Export Excel/PDF din header-ul Rezervărilor au primit flex-wrap pentru a se rupe pe linie nouă pe ecrane mici.',
    ],
  },
  {
    titlu: '3. Toggle 3/4/5 coloane meniu',
    continut: [
      'Vizitatorii pot acum alege câte coloane să afișeze produsele din meniu: 3 (implicit), 4 sau 5. Preferința se salvează în localStorage și este restaurată la fiecare vizită.',
      'Implementare: constanta COL_CLASSES mapează fiecare opțiune la clase Tailwind corespunzătoare. Pe desktop 4 coloane = lg:grid-cols-4 cu md:grid-cols-2. Pe desktop 5 coloane = lg:grid-cols-5 cu md:grid-cols-3. Pe mobil rămâne întotdeauna 1 coloană.',
      'UI-ul de toggle apare doar pe ecrane md+ (hidden md:flex) alături de toggle-ul de valută, formând un singur rând de controale deasupra grilei de produse.',
      'Lecție cheie: localStorage este sincron și disponibil imediat la mount în useEffect. Nu are nevoie de async/await. Valoarea salvată trebuie validată (saved === "4" || saved === "5") pentru a evita injectarea de valori arbitrare.',
    ],
  },
  {
    titlu: '4. Banner promoțional configurat din Admin',
    continut: [
      'Am adăugat un sistem de banner promoțional care afișează o ofertă specială deasupra grilei de meniu (de ex: "Comandă de peste 50 RON și primești 10% reducere!"). Bannerul poate fi activat/dezactivat și configurat direct din panoul Admin.',
      'Tabel Supabase necesar (rulează în SQL Editor):',
      'CREATE TABLE promo_config (\n  id int PRIMARY KEY DEFAULT 1,\n  enabled boolean DEFAULT false,\n  min_order numeric DEFAULT 50,\n  discount_type text DEFAULT \'percent\',\n  discount_amount numeric DEFAULT 10,\n  message text DEFAULT \'\'\n);\nINSERT INTO promo_config (id) VALUES (1);',
      'API: GET /api/promo returnează configurația. PATCH /api/promo actualizează. Dacă tabelul nu există, request-ul eșuează silențios (catch) și bannerul nu apare.',
      'Admin UI: În tab-ul "Sărbători" am adăugat o nouă secțiune "Banner promoțional meniu" cu: toggle activ/inactiv (switch animat), câmp comandă minimă (RON), tip reducere (procent/valoare), valoare reducere, mesaj personalizat opțional și un preview live.',
      'Mesaj automat: dacă câmpul "mesaj personalizat" este gol, bannerul generează automat textul din valorile configurate (min_order, discount_type, discount_amount).',
    ],
  },
  {
    titlu: '5. Prețuri în EUR/USD via API BNR',
    continut: [
      'Vizitatorii pot acum vizualiza prețurile din meniu convertite în EUR sau USD la cursul oficial BNR din ziua respectivă. Toggle-ul RON/EUR/USD apare deasupra grilei de produse, lângă toggle-ul de coloane.',
      'API /api/curs: Apelează feed-ul XML public al BNR (https://www.bnr.ro/nbrfxrates.xml) fără autentificare. Parsează cursurile EUR și USD cu expresii regulate. Implementează cache în memorie cu TTL de 1 oră — BNR actualizează cursul o singură dată pe zi, deci 3600 de apeluri pe oră la BNR ar fi inutil și ar putea fi blocat.',
      'Fallback: dacă BNR nu răspunde dar avem un cache expirat, returnăm datele vechi cu câmpul stale: true. Dacă nu există niciun cache, returnăm HTTP 503.',
      'Conversie în component: funcția toDisplayPrice(ron) convertește orice preț RON în valuta selectată. Toate prețurile afișate (prețul de bază, prețul cu reducere, add-on-uri, totalul estimat) trec prin această funcție.',
      'Cursul afișat: sub butoanele de toggle apare textul "1€=X.XX RON · 1$=Y.YY RON" pentru transparență completă față de vizitator.',
    ],
  },
  {
    titlu: '6. Fișiere modificate și create',
    continut: [
      'app/admin/page.tsx — adăugat: flex-wrap pe tabs și bulk bar; state promoCfg/savingPromo/promoMsg; fetchHoliday include /api/promo; savePromoConfig(); panoul UI pentru banner promoțional',
      'components/MenuStarter.tsx — adăugat: tipuri Currency, CursValutar, PromoConfig; state currency/curs/promo; fetch /api/promo și /api/curs la mount; toDisplayPrice(); toggle UI valută+coloane; prețuri convertite în card și add-on panel',
      'app/api/promo/route.ts — NOU: GET + PATCH pentru promo_config',
      'app/api/curs/route.ts — NOU: GET cu fetch BNR XML, parsare EUR/USD, cache TTL 1h',
    ],
  },
  {
    titlu: '7. Concepte cheie din această sesiune',
    continut: [
      'localStorage: storage sincron în browser, persistent între sesiuni. Util pentru preferințe UI (nu date sensibile). Se citește în useEffect pentru a evita hidration mismatch în Next.js.',
      'Cache în memorie (server-side): o variabilă let cache la nivelul modulului persistă între request-uri în același process Node.js. TTL = Time To Live, verificat cu Date.now(). Soluție simplă pentru API-uri externe cu date lent-schimbătoare.',
      'XML parsing fără bibliotecă: expresii regulate sunt suficiente pentru extragerea valorilor din XML structurat și previzibil. Soluție mai ușoară decât importul unui parser XML.',
      'Stale data pattern: dacă sursa externă eșuează, returnăm datele vechi (stale) în loc de eroare. Experiența vizitatorului este mai bună cu un curs de ieri decât cu un mesaj de eroare.',
      'Toggle UI cu preview live: bannerul promoțional din admin afișează un preview în timp real al mesajului care va apărea pe site, înainte de salvare. Acest pattern reduce erorile de configurare.',
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
      if (para.startsWith('CREATE TABLE') || para.startsWith('  ') || para.startsWith('INSERT')) {
        for (const line of para.split('\n')) {
          children.push(makeCode(line));
        }
      } else {
        children.push(makeBody(para));
      }
    }
  }

  const doc = new Document({ sections: [{ children }] });
  const buf = await Packer.toBuffer(doc);
  const outPath = path.join(OUT_DIR, 'recap-modul4-sesiune2.docx');
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
      if (para.startsWith('CREATE TABLE') || para.startsWith('  ') || para.startsWith('INSERT')) {
        lines.push({ type: 'code', text: para });
      } else {
        lines.push({ type: 'body', text: para });
      }
    }
    lines.push({ type: 'spacer' });
  }

  const outPath = path.join(OUT_DIR, 'recap-modul4-sesiune2.pdf');
  createPdf(lines, outPath);
  console.log('PDF salvat:', outPath);
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

(async () => {
  await genDocx();
  genPdf();
  console.log('\nDocumentație generată cu succes în /docs/');
})();
