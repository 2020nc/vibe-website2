# Structura Proiect — Vibe Caffè

> Next.js 15 · React 19 · TypeScript 5 · Tailwind CSS 4 · Supabase
> Ultima actualizare: 2026-04-19

---

## Arbore director (4 nivele)

```
Proiect_01/                                        ← Nivel 1 (rădăcină)
│
├── app/                                           ← Nivel 2
│   ├── admin/                                     ← Nivel 3
│   │   ├── login/                                 ← Nivel 4
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── page.tsx
│   │
│   ├── api/                                       ← Nivel 3
│   │   ├── admin/                                 ← Nivel 4
│   │   │   ├── change-password/route.ts
│   │   │   ├── login/route.ts
│   │   │   └── me/route.ts
│   │   ├── chat/route.ts
│   │   ├── curs/route.ts
│   │   ├── holiday/route.ts
│   │   ├── menu/                                  ← Nivel 4
│   │   │   ├── bulk/route.ts
│   │   │   └── route.ts
│   │   ├── menu-settings/route.ts
│   │   ├── newsletter/route.ts
│   │   ├── promo/route.ts
│   │   └── rezervari/route.ts
│   │
│   ├── confidentialitate/                         ← Nivel 3
│   │   └── page.tsx
│   ├── cookies/                                   ← Nivel 3
│   │   └── page.tsx
│   ├── locatie/                                   ← Nivel 3
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── meniu/                                     ← Nivel 3
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── rezervari/                                 ← Nivel 3
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── sarbatori/                                 ← Nivel 3
│   │   └── page.tsx
│   ├── termeni/                                   ← Nivel 3
│   │   └── page.tsx
│   │
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx                                 ← Root layout
│   ├── not-found.tsx
│   ├── page.tsx                                   ← Homepage
│   └── sitemap.ts
│
├── components/                                    ← Nivel 2
│   ├── About.tsx
│   ├── ChatWidget.tsx
│   ├── CoffeeLoader.tsx
│   ├── DayAtVibe.tsx
│   ├── DeferredChatWidget.tsx
│   ├── FABContact.tsx
│   ├── Features.tsx
│   ├── FeaturesStarter.tsx
│   ├── Footer.tsx
│   ├── FooterStarter.tsx
│   ├── Hero.tsx
│   ├── HeroStarter.tsx
│   ├── HolidayMenu.tsx
│   ├── Menu.tsx
│   ├── MenuStarter.tsx
│   ├── Navigation.tsx
│   ├── Preloader.tsx
│   ├── ReviewBar.tsx
│   ├── ScrollAnimations.tsx
│   ├── SmoothScroll.tsx
│   └── ThemeToggle.tsx
│
├── lib/                                           ← Nivel 2
│   ├── hooks/                                     ← Nivel 3
│   │   ├── useScrollAnimation.ts
│   │   ├── useSpeechRecognition.ts
│   │   └── useSpeechSynthesis.ts
│   ├── knowledge-base.ts
│   ├── menuData.ts
│   └── supabase.ts
│
├── public/                                        ← Nivel 2
│   ├── hero-coffee.mp4
│   ├── 2853793-uhd_3840_2160_24fps.mp4
│   ├── og-image.jpg
│   ├── robots.txt
│   ├── DejaVuSans.ttf
│   ├── DejaVuSans-Bold.ttf
│   ├── arial.ttf
│   ├── arialbd.ttf
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── scripts/                                       ← Nivel 2
│   ├── export-chat.mjs
│   ├── seed-rezervari.mjs
│   ├── gen-documentatie.mjs
│   ├── gen-documentatie-profesor.mjs
│   ├── gen-documentatie-tehnica-v2.mjs
│   ├── gen-manual-admin.mjs
│   ├── gen-manual-utilizator.mjs
│   ├── gen-raport-final-vibe-coding-codex-2026-04-16.mjs
│   ├── gen-raport-oficial-vibe-coding-codex-2026-04-16.mjs
│   ├── gen-raport-vibe-coding-2026-04-16.mjs
│   ├── gen-recapitulare-optimizare-vibe-2026-04-17.mjs
│   ├── gen-rezumat-academic-2026-04-15.mjs
│   ├── gen-rezumat-explicit-2026-04-15.mjs
│   ├── gen-rezumat-pro-v4-2026-04-16.mjs
│   ├── gen-rezumat-profesionist-2026-04-17.mjs
│   ├── gen-rezumat-profesoral-2026-04-15.mjs
│   ├── gen-rezumat-profesoral-2026-04-16.mjs
│   ├── gen-rezumat-proiect.mjs
│   ├── gen-rezumat-sesiune-04-04.mjs
│   ├── gen-rezumat-sesiune.mjs
│   ├── gen-structura.js
│   ├── generate-descriere-proiect.js
│   ├── generate-docs.js
│   ├── generate-plan-modul4.js
│   ├── generate-prezentare-modul3.js
│   ├── generate-raport-comparatie.js
│   ├── generate-recap-modul4-sesiune1.js
│   ├── generate-recap-modul4-sesiune2.js
│   ├── generate-recap-modul4-sesiune3.js
│   ├── recap-29-martie.mjs
│   ├── recap-lectia2-modulul3.mjs
│   ├── recap-m6-l1.mjs
│   ├── recap-m6-l2.mjs
│   └── sumar-sesiune-29-martie.mjs
│
├── supabase/                                      ← Nivel 2
│   ├── migrations/                                ← Nivel 3
│   │   ├── 20260329_create_rezervari.sql
│   │   ├── 20260330_seed_rezervari.sql
│   │   ├── 20260401_enable_rls_all_tables.sql
│   │   ├── 20260409_add_rls_policies.sql
│   │   └── 20260416_fix_rezervari_status_constraint.sql
│   └── .temp/                                     ← Nivel 3 (config CLI Supabase)
│       ├── cli-latest
│       ├── gotrue-version
│       ├── pooler-url
│       ├── postgres-version
│       ├── project-ref
│       ├── rest-version
│       ├── storage-migration
│       └── storage-version
│
├── docs/                                          ← Nivel 2 (documentație & sesiuni)
│   ├── sesiune-2026-04-19.docx / .pdf
│   ├── manual-administrator.docx / .pdf
│   ├── manual-utilizator.docx / .pdf
│   ├── documentatie-tehnica-v2.docx / .pdf
│   ├── documentatie-profesor.docx / .pdf
│   ├── meniu-vibe-caffe-2026-03-30.xlsx / .pdf
│   └── ... (arhivă sesiuni & rapoarte)
│
├── reports/                                       ← Nivel 2 (rapoarte tehnice)
│   ├── recapitulare-optimizare-vibe-2026-04-17.docx
│   ├── recapitulare-optimizare-vibe-2026-04-17.md
│   └── recapitulare-optimizare-vibe-2026-04-17.pdf
│
├── checkpoints/                                   ← Nivel 2
│   └── README.md
│
├── .claude/                                       ← Nivel 2 (config Claude Code)
│   ├── settings.json
│   └── settings.local.json
│
├── .vercel/                                       ← Nivel 2 (config deployment)
│   ├── project.json
│   └── README.txt
│
├── .env.local                                     ← Variabile de mediu (nu în git)
├── .gitignore
├── CLAUDE.md                                      ← Convenții proiect
├── AGENTS.md
├── README.md
├── README-CURS.md
├── DEPLOYMENT_GUIDE.md
├── MODERNIZATION_GUIDE.md
├── PROJECT_HISTORY.md
├── SESSION-LOG.md
├── next.config.ts
├── tsconfig.json
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── eslint.config.mjs
├── next-env.d.ts
└── proxy.ts
```

---

## Legendă straturi

| Nivel | Rol |
|-------|-----|
| **1** | Rădăcina proiectului — config global, README, fișiere CI/CD |
| **2** | Directoare principale: `app/`, `components/`, `lib/`, `public/`, `scripts/`, `supabase/`, `docs/` |
| **3** | Sub-directoare funcționale: pagini (`rezervari/`, `admin/`), route groups (`api/admin/`), hooks, migrations |
| **4** | Fișiere finale: `page.tsx`, `route.ts`, `layout.tsx`, `.sql`, hooks individuale |

---

## Pagini publice

| Rută | Fișier | Descriere |
|------|--------|-----------|
| `/` | `app/page.tsx` | Homepage cu Hero, Menu, Features, About |
| `/rezervari` | `app/rezervari/page.tsx` | Formular rezervare masă |
| `/meniu` | `app/meniu/page.tsx` | Meniu complet cu categorii |
| `/locatie` | `app/locatie/page.tsx` | Hartă + program + facilități |
| `/sarbatori` | `app/sarbatori/page.tsx` | Oferte sezoniere & reduceri |
| `/confidentialitate` | `app/confidentialitate/page.tsx` | Politică GDPR |
| `/cookies` | `app/cookies/page.tsx` | Politică cookies |
| `/termeni` | `app/termeni/page.tsx` | Termeni și condiții |

---

## API Routes

| Endpoint | Metodă | Descriere |
|----------|--------|-----------|
| `/api/rezervari` | POST / PATCH / DELETE | CRUD rezervări |
| `/api/menu` | GET | Fetch menu items din Supabase |
| `/api/menu/bulk` | POST | Import bulk menu items |
| `/api/menu-settings` | GET / POST | Setări afișare meniu |
| `/api/holiday` | GET | Config reduceri sărbători |
| `/api/chat` | POST | Barista Bot (AI chat) |
| `/api/newsletter` | POST | Abonare newsletter |
| `/api/promo` | GET | Promoții active |
| `/api/curs` | GET | Date curs (intern) |
| `/api/admin/login` | POST | Autentificare admin |
| `/api/admin/me` | GET | Profil admin curent |
| `/api/admin/change-password` | POST | Schimbare parolă admin |

---

## Componente principale

| Componentă | Tip | Descriere |
|------------|-----|-----------|
| `Navigation.tsx` | Client | Navbar sticky cu dark mode toggle |
| `Hero.tsx` | Client | Hero cu video background |
| `HeroStarter.tsx` | Client | Variantă simplificată Hero |
| `Menu.tsx` | Client | Meniu complet cu tab-uri categorii |
| `MenuStarter.tsx` | Client | Variantă Starter Menu cu add-ons |
| `HolidayMenu.tsx` | Client | Meniu sărbători cu confetti + reduceri |
| `Features.tsx` | Client | Bento grid features |
| `FeaturesStarter.tsx` | Client | Variantă Starter Features |
| `About.tsx` | Server | Secțiune despre noi |
| `DayAtVibe.tsx` | Client | Timeline o zi la Vibe |
| `ChatWidget.tsx` | Client | Barista Bot (chat AI) |
| `DeferredChatWidget.tsx` | Client | Lazy load ChatWidget |
| `ReviewBar.tsx` | Client | Bar recenzii Google |
| `FABContact.tsx` | Client | Buton flotant contact |
| `CoffeeLoader.tsx` | Client | Animație loading cafea |
| `Preloader.tsx` | Client | Splash screen initial |
| `SmoothScroll.tsx` | Client | Wrapper Lenis smooth scroll |
| `ScrollAnimations.tsx` | Client | Intersection Observer animații |
| `ThemeToggle.tsx` | Client | Toggle dark/light mode |
| `Footer.tsx` | Server | Footer complet cu wave SVG |
| `FooterStarter.tsx` | Server | Footer minimal |

---

## Baza de date Supabase

| Tabel | Descriere |
|-------|-----------|
| `rezervari` | Rezervări mese — nume, telefon, email, dată, oră, persoane, status |
| `menu_items` | Produse meniu — nume, categorie, preț, descriere, imagine, disponibilitate |
| `holiday_config` | Configurare reduceri sărbători — tip, valoare, etichetă |
| `marketing_subscribers` | Abonați email cu consimțământ GDPR explicit |
| `admins` | Conturi administrator cu parolă hash |
