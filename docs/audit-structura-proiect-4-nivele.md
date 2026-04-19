# Audit Profesionist - Structura Proiectului pe 4 Niveluri

Data auditului: 2026-04-19  
Proiect: `vibe-website`  
Stack principal: Next.js 16, React 19, TypeScript, Tailwind CSS 4, Supabase

## 1. Rezumat executiv

Acest repository este o aplicație web Next.js construită pe App Router, orientată pe prezentare comercială, rezervări, meniu, oferte sezoniere și un mic panou de administrare. Structura este coerentă pentru un proiect educațional sau semi-producție, cu separare bună între:

- `app/` pentru rute și API routes;
- `components/` pentru UI reutilizabil;
- `lib/` pentru date, hooks și integrarea Supabase;
- `supabase/` pentru migrații;
- `docs/`, `reports/`, `scripts/` pentru documentație și automatizări.

Puncte bune:

- separare clară între frontend, API și infrastructură de date;
- App Router folosit corect pentru pagini publice și zone administrative;
- existența unui folder dedicat pentru migrații Supabase;
- existența mai multor scripturi de generare documentație și rapoarte;
- existența documentației operaționale și educaționale.

Riscuri și observații:

- repository-ul conține multe artefacte de documentație și recapitulare, ceea ce crește zgomotul operațional;
- există o combinație de componente active și componente `Starter`, ceea ce poate produce ambiguitate pentru mentenanță;
- folderul rădăcină conține multe fișiere auxiliare `.docx`, `.pdf`, `.md`, ceea ce reduce lizibilitatea structurii de produs;
- există dependențe și utilitare care indică un proiect hibrid: site de prezentare + chat + export documente + admin.

## 2. Identitate tehnică

- Framework: Next.js `^16.2.1`
- UI: React `19.2.1`
- Limbaj: TypeScript `^5`
- Styling: Tailwind CSS `^4`
- Backend extern: Supabase
- AI / chat: Anthropic SDK și OpenAI SDK
- Alte capabilități: export PDF/DOCX/XLSX, confetti, smooth scroll

Scripturi principale:

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

## 3. Structura proiectului pe 4 niveluri

Nota: structura de mai jos este prezentată până la maximum 4 niveluri de foldere și exclude din auditul structural detaliat zonele generate sau terțe precum `.next/`, `node_modules/` și `.vercel/`.

```text
Proiect_01/
├─ app/
│  ├─ admin/
│  │  └─ login/
│  ├─ api/
│  │  ├─ admin/
│  │  │  ├─ change-password/
│  │  │  ├─ login/
│  │  │  └─ me/
│  │  ├─ chat/
│  │  ├─ curs/
│  │  ├─ holiday/
│  │  ├─ menu/
│  │  │  └─ bulk/
│  │  ├─ menu-settings/
│  │  ├─ newsletter/
│  │  ├─ promo/
│  │  └─ rezervari/
│  ├─ confidentialitate/
│  ├─ cookies/
│  ├─ locatie/
│  ├─ meniu/
│  ├─ rezervari/
│  ├─ sarbatori/
│  └─ termeni/
├─ checkpoints/
├─ components/
├─ docs/
│  └─ sesiuni/
├─ lib/
│  └─ hooks/
├─ public/
├─ reports/
├─ scripts/
└─ supabase/
   ├─ .temp/
   └─ migrations/
```

## 4. Rolul folderelor principale

### `app/`

Este centrul aplicației și urmează modelul App Router. Conține:

- layout-uri globale și layout-uri locale;
- paginile publice ale site-ului;
- paginile administrative;
- API routes server-side.

Subzone importante:

- `app/page.tsx` - homepage;
- `app/rezervari/` - fluxul de rezervări;
- `app/locatie/` - prezentare locație și hartă;
- `app/meniu/` - pagina meniului;
- `app/sarbatori/` - oferte sezoniere;
- `app/api/` - capabilitățile server-side.

### `components/`

Conține biblioteca de componente UI. Aici se află:

- componente active de layout și navigație;
- componente pentru homepage și pagini tematice;
- componente de optimizare progresivă precum `Deferred*`;
- variante `Starter`, probabil păstrate în scop educațional sau de iterație.

Observație: coexistă componente mature și componente demonstrative:

- active: `Navigation`, `ChatWidget`, `FooterStarter`, `LazyMapEmbed`, `DeferredChatWidget`;
- educaționale / alternative: `HeroStarter`, `FeaturesStarter`, `MenuStarter`, `HolidayMenu`.

### `lib/`

Conține logica reutilizabilă non-UI:

- `supabase.ts` - integrare client Supabase;
- `menuData.ts` - date de meniu;
- `knowledge-base.ts` - bază de cunoștințe pentru chat;
- `hooks/` - hooks custom pentru scroll, speech recognition și speech synthesis.

### `docs/`

Folder de documentație extinsă:

- documentație tehnică;
- manuale;
- rapoarte;
- materiale de curs;
- subfolder `docs/sesiuni/` pentru istoric de sesiuni și recapitulări.

### `reports/`

Conține livrabile derivate, în special recapitulări și rapoarte exportate.

### `scripts/`

Conține multe scripturi `.mjs` și `.js` pentru:

- generare documentație;
- export și sumarizare;
- generare rapoarte;
- seed de date.

Este un folder util, dar foarte aglomerat. Ar beneficia de grupare pe categorii.

### `supabase/`

Conține stratul de evoluție a bazei de date:

- `migrations/` - migrații SQL;
- `.temp/` - artefacte locale.

Este un semn bun de maturitate structurală.

## 5. Audit arhitectural

### 5.1. Organizare frontend

Structura frontend este bună pentru un proiect Next.js de dimensiune mică spre medie.

Avantaje:

- rutele sunt intuitive și aliniate cu domeniul business;
- componentele sunt separate de rute;
- layout-ul global este clar centralizat;
- există optimizări lazy/deferred deja introduse.

Puncte de atenție:

- folderul `components/` combină componente de producție cu componente `Starter`;
- unele denumiri sunt foarte apropiate și pot crea confuzie:
  - `Footer` vs `FooterStarter`
  - `Hero` vs `HeroStarter`
  - `Features` vs `FeaturesStarter`
  - `Menu` vs `MenuStarter`
- ar fi util un subfolder de tip `components/starter/` sau `components/legacy/`.

### 5.2. Organizare backend/API

`app/api/` este bine aliniat pe capabilități:

- `admin/`
- `chat/`
- `menu/`
- `holiday/`
- `newsletter/`
- `promo/`
- `rezervari/`

Avantaje:

- separare funcțională bună;
- potrivit pentru Next.js route handlers;
- extensibil fără refactor major.

Puncte de atenție:

- unele domenii de business sunt apropiate și pot fi consolidate ulterior:
  - `holiday` și `promo`
  - `menu` și `menu-settings`
- dacă proiectul crește, merită un strat intermediar de servicii în `lib/services/`.

### 5.3. Date și integrare

Prezența `supabase/migrations/` plus `lib/supabase.ts` indică o bază corectă pentru controlul schimbărilor de schemă.

Este bine că:

- migrațiile sunt versionate;
- există fișiere dedicate pentru rezervări și politici RLS.

Recomandare:

- dacă proiectul crește, separă și validările de request în `lib/validators/`.

### 5.4. Documentație și artefacte

Repository-ul conține foarte multă documentație direct în rădăcină și în `docs/`.

Asta ajută la predare și audit, dar afectează lizibilitatea repo-ului pentru dezvoltare zilnică.

Recomandare:

- păstrează în rădăcină doar documentele operative;
- mută recapitulările și istoricul într-un subfolder clar, de exemplu:
  - `docs/history/`
  - `docs/teaching/`
  - `docs/reports/`

## 6. Zone de complexitate

Cele mai dense zone ale proiectului sunt:

- `app/api/` - logică server-side și integrare cu date;
- `components/` - amestec de UI activ, variante starter și componente lazy;
- `scripts/` - număr mare de scripturi punctuale;
- `docs/` - volum mare de documentație.

Aceste zone trebuie tratate ca puncte de risc pentru onboarding și mentenanță.

## 7. Recomandări profesionale

### Prioritate mare

- Separă componentele `Starter` de componentele active.
- Normalizează fișierele de documentație din rădăcină într-o structură mai curată.
- Creează un index de documentație principal în `docs/README.md`.

### Prioritate medie

- Grupează scripturile din `scripts/` în subfoldere:
  - `scripts/docs/`
  - `scripts/reports/`
  - `scripts/seed/`
  - `scripts/recaps/`
- Introdu un folder `lib/services/` pentru logică de business partajată între route handlers.

### Prioritate redusă

- Standardizează convențiile de naming între română și engleză.
- Adaugă un fișier de tip `ARCHITECTURE.md` pentru explicarea modulelor mari.

## 8. Verdict final

Structura proiectului este bună și funcțională pentru un proiect Next.js real, cu o bază solidă pentru prezentare comercială, rezervări și integrare Supabase.

Evaluare profesională:

- Claritate structurală: bună
- Scalabilitate: medie
- Mentenabilitate curentă: bună
- Risc de aglomerare documentară: ridicat
- Risc de confuzie între componente active și `Starter`: mediu

Verdict:

Repository-ul este bine organizat la nivel de produs, dar are nevoie de o etapă de igienizare structurală pentru a reduce zgomotul din rădăcină și pentru a separa mai clar codul activ de materialele auxiliare și educaționale.
