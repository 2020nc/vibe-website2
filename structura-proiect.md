# Structura Proiect — Vibe Caffè Website

> Actualizat: 17 aprilie 2026  
> URL producție: https://vibe-website2.vercel.app  
> Adâncime: 4 nivele

---

## Arbore de foldere

```
Proiect_01/
│
├── app/                              ← Next.js App Router
│   ├── admin/
│   │   ├── login/
│   │   │   ├── layout.tsx            ← Layout pagină login admin
│   │   │   └── page.tsx              ← Formular autentificare admin
│   │   └── page.tsx                  ← Dashboard admin (meniu, rezervări, export)
│   │
│   ├── api/                          ← API Routes (server-side)
│   │   ├── admin/
│   │   │   ├── change-password/
│   │   │   │   └── route.ts          ← Schimbare parolă admin
│   │   │   ├── login/
│   │   │   │   └── route.ts          ← Autentificare admin JWT
│   │   │   └── me/
│   │   │       └── route.ts          ← Verificare sesiune curentă
│   │   ├── chat/
│   │   │   └── route.ts              ← Barista Bot (Anthropic Claude API)
│   │   ├── curs/
│   │   │   └── route.ts              ← Export date curs
│   │   ├── holiday/
│   │   │   └── route.ts              ← Meniu sărbători (CRUD)
│   │   ├── menu/
│   │   │   ├── bulk/
│   │   │   │   └── route.ts          ← Import bulk produse (xlsx)
│   │   │   └── route.ts              ← CRUD produse meniu
│   │   ├── menu-settings/
│   │   │   └── route.ts              ← Setări afișare meniu
│   │   ├── newsletter/
│   │   │   └── route.ts              ← Înscriere newsletter
│   │   ├── promo/
│   │   │   └── route.ts              ← Promoții active
│   │   └── rezervari/
│   │       └── route.ts              ← Creare rezervare + email confirmare
│   │
│   ├── confidentialitate/
│   │   └── page.tsx                  ← Politica de confidențialitate GDPR
│   ├── cookies/
│   │   └── page.tsx                  ← Politica cookies
│   ├── locatie/
│   │   ├── layout.tsx                ← Metadata pagină locație
│   │   └── page.tsx                  ← Hartă Google Maps + program + contact
│   ├── meniu/
│   │   ├── layout.tsx                ← Metadata pagină meniu
│   │   └── page.tsx                  ← Meniu SSR cu fallback static
│   ├── not-found.tsx                 ← Pagina 404 custom
│   ├── rezervari/
│   │   ├── layout.tsx                ← Metadata pagină rezervări
│   │   └── page.tsx                  ← Formular rezervare 2 coloane
│   ├── sarbatori/
│   │   └── page.tsx                  ← Meniu special sărbători/sezon
│   ├── termeni/
│   │   └── page.tsx                  ← Termeni și condiții
│   ├── favicon.ico
│   ├── globals.css                   ← Stiluri globale + CSS variables + dark mode
│   ├── layout.tsx                    ← Root layout: fonturi, Navigation, ChatWidget
│   ├── page.tsx                      ← Homepage cu toate secțiunile SSR
│   └── sitemap.ts                    ← Sitemap XML dinamic
│
├── components/                       ← Componente React reutilizabile
│   ├── About.tsx                     ← Secțiune „Povestea noastră" cu parallax
│   ├── ChatWidget.tsx                ← Barista Bot (chat AI cu voce)
│   ├── CoffeeLoader.tsx              ← Spinner animat ceașcă cafea
│   ├── DayAtVibe.tsx                 ← Secțiune „O zi la Vibe" (timeline)
│   ├── DeferredChatWidget.tsx        ← Dynamic import ChatWidget (lazy load)
│   ├── FABContact.tsx                ← Buton flotant contact (tel/WhatsApp)
│   ├── Features.tsx                  ← Bento grid features (versiunea originală)
│   ├── FeaturesStarter.tsx           ← Bento grid features (versiunea SSR)
│   ├── Footer.tsx                    ← Footer cu wave SVG (versiunea originală)
│   ├── FooterStarter.tsx             ← Footer optimizat SSR
│   ├── Hero.tsx                      ← Hero cu video background (versiunea originală)
│   ├── HeroStarter.tsx               ← Hero SSR fără video
│   ├── HolidayMenu.tsx               ← Meniu sărbători cu animații preț
│   ├── Menu.tsx                      ← Meniu complet (versiunea originală)
│   ├── MenuStarter.tsx               ← Meniu interactiv SSR cu filtre și grid
│   ├── Navigation.tsx                ← Navbar sticky cu dark mode + mobile
│   ├── Preloader.tsx                 ← Loading animation ceașcă SVG animat
│   ├── ReviewBar.tsx                 ← Bandă recenzii Google (ticker)
│   ├── ScrollAnimations.tsx          ← Intersection Observer pentru animate-on-scroll
│   ├── SmoothScroll.tsx              ← Lenis smooth scroll wrapper
│   └── ThemeToggle.tsx               ← Buton toggle dark/light mode
│
├── docs/                             ← Documentație, rapoarte, prezentări
│   ├── sesiuni/                      ← Recapitulări per sesiune de lucru
│   │   ├── sesiune-2026-03-23.docx
│   │   ├── sesiune-2026-03-24-1.docx
│   │   ├── sesiune-2026-03-24-2.docx
│   │   ├── sesiune-2026-03-25.docx
│   │   ├── sesiune-2026-03-29-*.docx ← 4 sesiuni
│   │   ├── sesiune-2026-03-31-*.docx ← 4 sesiuni
│   │   ├── sesiune-2026-04-01.docx
│   │   ├── sesiune-2026-04-03.docx
│   │   ├── sesiune-2026-04-04.docx
│   │   ├── sesiune-5-bloc-e.docx
│   │   └── documentatie-vibe-caffe.docx
│   ├── manual-administrator.docx/pdf
│   ├── manual-utilizator.docx/pdf
│   ├── documentatie-tehnica-v2.docx/pdf
│   ├── meniu-vibe-caffe-2026-03-30.xlsx/pdf
│   ├── structura-proiect.docx/pdf
│   ├── supabase-setup.sql            ← Script SQL inițial Supabase
│   └── (alte rapoarte și prezentări .docx/.pdf)
│
├── lib/                              ← Utilități și date
│   ├── hooks/
│   │   ├── useScrollAnimation.ts     ← Intersection Observer hook custom
│   │   ├── useSpeechRecognition.ts   ← Web Speech API — recunoaștere voce
│   │   └── useSpeechSynthesis.ts     ← Web Speech API — sinteză vocală
│   ├── knowledge-base.ts             ← Date statice pentru Barista Bot
│   ├── menuData.ts                   ← Date fallback meniu (backup Supabase)
│   └── supabase.ts                   ← Client Supabase singleton
│
├── public/                           ← Fișiere statice servite direct
│   ├── hero-coffee.mp4               ← Video Hero section
│   ├── 2853793-uhd_3840_2160_24fps.mp4 ← Video alternativ
│   ├── og-image.jpg                  ← Open Graph image (1200×630)
│   ├── robots.txt                    ← Instrucțiuni crawlere
│   ├── DejaVuSans.ttf                ← Font pentru generare PDF
│   ├── DejaVuSans-Bold.ttf
│   ├── arial.ttf
│   ├── arialbd.ttf
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── reports/                          ← Rapoarte auto-generate recente
│   ├── recapitulare-optimizare-vibe-2026-04-17.md
│   ├── recapitulare-optimizare-vibe-2026-04-17.docx
│   └── recapitulare-optimizare-vibe-2026-04-17.pdf
│
├── scripts/                          ← Scripturi Node.js generare documente
│   ├── export-chat.mjs
│   ├── gen-documentatie.mjs
│   ├── gen-documentatie-profesor.mjs
│   ├── gen-manual-admin.mjs
│   ├── gen-manual-utilizator.mjs
│   ├── gen-raport-final-vibe-coding-codex-2026-04-16.mjs
│   ├── gen-raport-oficial-vibe-coding-codex-2026-04-16.mjs
│   ├── gen-recapitulare-optimizare-vibe-2026-04-17.mjs
│   ├── gen-rezumat-profesionist-2026-04-17.mjs
│   ├── gen-structura.js
│   ├── generate-docs.js
│   └── (alte scripturi gen-*.mjs/.js)
│
├── supabase/                         ← Configurare și migrări Supabase
│   ├── .temp/                        ← Fișiere temporare CLI Supabase
│   └── migrations/
│       ├── 20260329_create_rezervari.sql
│       ├── 20260330_seed_rezervari.sql
│       ├── 20260401_enable_rls_all_tables.sql
│       ├── 20260409_add_rls_policies.sql
│       └── 20260416_fix_rezervari_status_constraint.sql
│
├── checkpoints/
│   └── README.md                     ← Note checkpoints de siguranță
│
├── .claude/                          ← Configurare Claude Code CLI
│   ├── settings.json
│   └── settings.local.json
│
├── .vercel/                          ← Configurare proiect Vercel
│   ├── project.json
│   └── README.txt
│
├── audit-context-codex.md            ← Audit Codex sesiunea 1
├── audit-context-codex-V2.md         ← Audit Codex sesiunea 2
├── audit-context-codex-V3.md         ← Audit Codex sesiunea 3
├── structura-proiect.md              ← Acest fișier
├── CLAUDE.md                         ← Convenții proiect pentru Claude Code
├── .env.local                        ← Variabile de mediu (nu în git)
├── .gitignore
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── proxy.ts
└── tsconfig.json
```

---

## Stack tehnic

| Tehnologie | Versiune | Rol |
|---|---|---|
| Next.js | 16 | Framework (App Router) |
| React | 19 | UI Library |
| TypeScript | 5 | Limbaj (strict mode) |
| Tailwind CSS | 4 | Stilizare (fără config file) |
| Supabase | 2.x | Baza de date + Auth |
| Lenis | 1.x | Smooth scroll |
| Anthropic Claude | SDK | Barista Bot AI |
| Vercel | — | Hosting + deploy |

---

## Pagini publice

| URL | Fișier | Descriere |
|---|---|---|
| `/` | `app/page.tsx` | Homepage cu toate secțiunile |
| `/meniu` | `app/meniu/page.tsx` | Meniu complet cu filtre |
| `/rezervari` | `app/rezervari/page.tsx` | Formular rezervare online |
| `/locatie` | `app/locatie/page.tsx` | Hartă + program + contact |
| `/sarbatori` | `app/sarbatori/page.tsx` | Oferte speciale sezon |
| `/confidentialitate` | `app/confidentialitate/page.tsx` | GDPR |
| `/cookies` | `app/cookies/page.tsx` | Politica cookies |
| `/termeni` | `app/termeni/page.tsx` | Termeni și condiții |
| `/admin` | `app/admin/page.tsx` | Dashboard admin (protejat) |

---

## API Routes

| Endpoint | Metodă | Descriere |
|---|---|---|
| `/api/rezervari` | POST | Salvare rezervare în Supabase |
| `/api/menu` | GET/POST/PUT/DELETE | CRUD produse meniu |
| `/api/menu/bulk` | POST | Import bulk xlsx |
| `/api/chat` | POST | Barista Bot (Claude AI) |
| `/api/admin/login` | POST | Autentificare admin |
| `/api/admin/me` | GET | Verificare sesiune |
| `/api/admin/change-password` | POST | Schimbare parolă |
| `/api/holiday` | GET/POST/PUT/DELETE | Meniu sărbători |
| `/api/newsletter` | POST | Înscriere newsletter |
| `/api/promo` | GET | Promoții active |
