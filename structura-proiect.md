# Structura Proiect — Vibe Caffè Website

> Generat: 17 aprilie 2026  
> URL producție: https://vibe-website2.vercel.app

---

## 1. Arborele de foldere (până la 3 nivele)

```
Proiect_01/
├── app/
│   ├── admin/
│   │   ├── login/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── api/
│   │   ├── admin/
│   │   │   ├── change-password/route.ts
│   │   │   ├── login/route.ts
│   │   │   └── me/route.ts
│   │   ├── chat/route.ts
│   │   ├── curs/route.ts
│   │   ├── holiday/route.ts
│   │   ├── menu/
│   │   │   ├── bulk/route.ts
│   │   │   └── route.ts
│   │   ├── menu-settings/route.ts
│   │   ├── newsletter/route.ts
│   │   ├── promo/route.ts
│   │   └── rezervari/route.ts
│   ├── confidentialitate/page.tsx
│   ├── cookies/page.tsx
│   ├── locatie/page.tsx
│   ├── meniu/page.tsx
│   ├── not-found.tsx
│   ├── rezervari/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── sarbatori/page.tsx
│   ├── sitemap.ts
│   ├── termeni/page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── About.tsx
│   ├── ChatWidget.tsx
│   ├── CoffeeLoader.tsx
│   ├── DayAtVibe.tsx
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
├── docs/                        ← documentație și rapoarte PDF/DOCX
├── lib/
│   ├── hooks/
│   │   ├── useSpeechRecognition.ts
│   │   ├── useSpeechSynthesis.ts
│   │   └── useScrollAnimation.ts
│   ├── knowledge-base.ts
│   ├── menuData.ts
│   └── supabase.ts
├── public/
│   ├── hero-coffee.mp4
│   ├── 2853793-uhd_3840_2160_24fps.mp4
│   ├── og-image.jpg
│   ├── robots.txt
│   ├── DejaVuSans.ttf
│   ├── DejaVuSans-Bold.ttf
│   ├── arial.ttf
│   ├── arialbd.ttf
│   └── (svg-uri Next.js)
├── scripts/                     ← scripturi generare documente
├── supabase/
│   ├── .temp/
│   └── migrations/
│       ├── 20260329_create_rezervari.sql
│       ├── 20260330_seed_rezervari.sql
│       ├── 20260401_enable_rls_all_tables.sql
│       ├── 20260409_add_rls_policies.sql
│       └── 20260416_fix_rezervari_status_constraint.sql
├── .claude/
│   ├── settings.json
│   └── settings.local.json
├── .env.local                   ← variabile de mediu (nu în git)
├── .gitignore
├── CLAUDE.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── proxy.ts
├── tsconfig.json
└── tsconfig.tsbuildinfo
```

---

## 2. Conținutul `package.json`

```json
{
  "name": "vibe-website",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --webpack",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.89.0",
    "@supabase/supabase-js": "^2.100.1",
    "canvas-confetti": "^1.9.4",
    "docx": "^9.6.1",
    "jspdf": "^4.2.1",
    "jspdf-autotable": "^5.0.7",
    "lenis": "^1.3.16",
    "next": "^16.2.1",
    "openai": "^6.15.0",
    "pdfkit": "^0.18.0",
    "react": "19.2.1",
    "react-dom": "19.2.1",
    "xlsx": "^0.18.5"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/canvas-confetti": "^1.9.0",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "baseline-browser-mapping": "^2.10.10",
    "eslint": "^9",
    "eslint-config-next": "16.0.10",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

---

## 3. Conținutul `tailwind.config.js`

**FIȘIERUL NU EXISTĂ.**

Proiectul folosește **Tailwind CSS v4** — configurarea culorilor custom se face direct în `app/globals.css` prin directiva `@theme inline {}`. Nu există `tailwind.config.js` / `.ts` / `.mjs`.

---

## 4. Conținutul `next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

---

## 5. Conținutul `app/globals.css`

```css
@import "tailwindcss";

/* 🎉 HOLIDAY MENU — animație preț tăiat */
@keyframes strikethrough {
  from { width: 0%; }
  to   { width: 100%; }
}
@keyframes popIn {
  0%   { opacity: 0; transform: scale(0.5); }
  70%  { transform: scale(1.2); }
  100% { opacity: 1; transform: scale(1); }
}

.price-strike {
  position: relative;
  display: inline-block;
}
.price-strike::after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  height: 2px;
  width: 0%;
  background-color: #ef4444;
  animation: strikethrough 1.2s ease-out forwards;
  animation-delay: var(--strike-delay, 0.3s);
}

.price-new {
  opacity: 0;
  animation: popIn 0.4s ease-out forwards;
  animation-delay: var(--pop-delay, 0.9s);
}

/* Scroll smooth global */
html {
  scroll-behavior: smooth;
}

/* Offset 80px pentru navigation bar */
[id] {
  scroll-margin-top: 80px;
}

/* 🌙 DARK MODE - Class Strategy (not media query) */
@variant dark (&:where(.dark, .dark *));

:root {
  --primary: #14B8A6;
  --primary-dark: #0D9488;
  --secondary: #F97316;
  --secondary-dark: #EA580C;
  --background: #FAFAFA;
  --foreground: #1F2937;
  --glass-bg: rgba(255, 255, 255, 0.85);
  --glass-border: rgba(255, 255, 255, 0.3);
}

/* 🌙 DARK MODE */
[data-theme='dark'] {
  --background: #1A0D05;
  --foreground: #FDF0E0;
  --glass-bg: rgba(45, 26, 10, 0.88);
  --glass-border: rgba(249, 115, 22, 0.15);
}

[data-theme='dark'] body {
  background: linear-gradient(135deg, #1A0D05 0%, #0D0702 100%);
  color: var(--foreground);
}

[data-theme='dark'] .bg-white { background-color: #2D1A0A !important; }
[data-theme='dark'] .text-gray-900 { color: #FDF0E0 !important; }
[data-theme='dark'] .text-gray-700 { color: #F0D9B5 !important; }
[data-theme='dark'] .text-gray-600 { color: #C8A882 !important; }

@theme inline {
  --color-primary: var(--primary);
  --color-primary-dark: var(--primary-dark);
  --color-secondary: var(--secondary);
  --color-secondary-dark: var(--secondary-dark);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-heading: var(--font-heading);
  --font-body: var(--font-inter);

  /* 🎨 Paleta Espresso / Crem / Oliv */
  --color-espresso-50:  #FAF6F1;
  --color-espresso-100: #F0E6D3;
  --color-espresso-500: #6B3A2A;
  --color-espresso-800: #3B1F0A;
  --color-espresso-900: #1E0F05;

  --color-crem-50:  #FFFDF8;
  --color-crem-100: #F5EDD6;
  --color-crem-200: #EDD9A3;

  --color-oliv-400: #8A9E5A;
  --color-oliv-600: #6B7C4A;
  --color-oliv-800: #4A5733;
}

body {
  background: linear-gradient(135deg, #FAFAFA 0%, #E0F2FE 100%);
  color: var(--foreground);
  font-family: var(--font-inter), Arial, Helvetica, sans-serif;
  font-size: 18px;
  line-height: 1.6;
  min-height: 100vh;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading), -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

h1 { font-size: 64px; font-weight: 800; }
h2 { font-size: 48px; font-weight: 700; }
h3 { font-size: 32px; font-weight: 700; }
h4 { font-size: 24px; font-weight: 600; }
h5 { font-size: 20px; font-weight: 600; }
h6 { font-size: 18px; font-weight: 600; }

p {
  font-family: var(--font-inter), Arial, sans-serif;
  font-size: 18px;
  line-height: 1.6;
}

.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
}

.glass-hover { transition: all 0.3s ease; }
.glass-hover:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
}

[data-theme='dark'] .glass-hover:hover { background: rgba(55, 65, 81, 0.95) !important; }

button, .btn { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
button:hover, .btn:hover { transform: scale(1.05); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05); }
button:active, .btn:active { transform: scale(0.98); }

.link-underline { position: relative; text-decoration: none; }
.link-underline::after { content: ''; position: absolute; width: 0; height: 2px; bottom: -2px; left: 0; background-color: var(--primary); transition: width 0.3s ease-in-out; }
.link-underline:hover::after { width: 100%; }

.card-tilt { transition: transform 0.3s ease, box-shadow 0.3s ease; }
.card-tilt:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.15), 0 10px 10px -5px rgba(0,0,0,0.1); }

.social-icon { transition: transform 0.2s ease; display: inline-block; }
.social-icon:hover { transform: translateY(-5px); }

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
@keyframes slideInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }

@layer utilities {
  .hero-anim { opacity: 0; animation: fadeInUp 0.7s ease-out forwards; }
}

html.lenis { height: auto; }
html.lenis-smooth { scroll-behavior: auto; }

.gpu-accelerate { transform: translateZ(0); will-change: transform; backface-visibility: hidden; }

::selection { background-color: var(--primary); color: white; }
::-moz-selection { background-color: var(--primary); color: white; }

.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.scrollbar-hide::-webkit-scrollbar { display: none; }

[data-theme='dark'] .features-card { background-color: #374151 !important; }

.animate-on-scroll { opacity: 0; transform: translateY(28px); transition: opacity 0.65s ease, transform 0.65s ease; }
.animate-on-scroll.visible { opacity: 1; transform: translateY(0); }
```

---

## 6. Conținutul `app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ChatWidget from "@/components/ChatWidget";
import FABContact from "@/components/FABContact";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vibe-website2.vercel.app"),
  title: {
    default: "Vibe Caffe - Cafea de Specialitate in Bucuresti",
    template: "%s | Vibe Caffe",
  },
  description:
    "Cafea single-origin, brunch de weekend si un spatiu potrivit pentru lucru in centrul Bucurestiului. Rezerva masa ta online.",
  keywords: ["cafea specialitate", "cafenea bucuresti", "specialty coffee", "brunch bucuresti", "vibe caffe"],
  authors: [{ name: "Vibe Caffe Team" }],
  openGraph: {
    title: "Vibe Caffe - Cafea de Specialitate",
    description: "Cafea single-origin si brunch in inima Bucurestiului.",
    url: "https://vibe-website2.vercel.app",
    siteName: "Vibe Caffe",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Interiorul Vibe Caffe" }],
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Caffe - Cafea de Specialitate",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro">
      <body className={`${plusJakarta.variable} ${inter.variable} ${playfair.variable} antialiased`}>
        <Navigation />
        {children}
        <ChatWidget />
        <FABContact />
      </body>
    </html>
  );
}
```

---

## 7. Conținutul `app/page.tsx`

```tsx
import HeroStarter from '@/components/HeroStarter';
import FeaturesStarter from '@/components/FeaturesStarter';
import About from '@/components/About';
import FooterStarter from '@/components/FooterStarter';
import Preloader from '@/components/Preloader';
import ReviewBar from '@/components/ReviewBar';
import ScrollAnimations from '@/components/ScrollAnimations';
import DayAtVibe from '@/components/DayAtVibe';

export const metadata = {
  title: 'Vibe Caffè — Cafea de Specialitate în București',
  description:
    'Cafea bună. Oameni buni. Un loc al tău în centrul Bucureștiului. ' +
    'Rezervă masă online. Bld. Regina Elisabeta 30, Sector 5.',
  openGraph: {
    title: 'Vibe Caffè — Cafea de Specialitate în București',
    description: 'Cafea bună. Oameni buni. Un loc al tău în centrul Bucureștiului.',
    url: 'https://vibe-website2.vercel.app',
    siteName: 'Vibe Caffè',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Interiorul Vibe Caffè' }],
    locale: 'ro_RO',
    type: 'website',
  },
};

const previewItems = [
  { name: 'Flat White', price: 17, alt: 'Flat White servit în ceașcă albă pe farfurioară de lemn, 17 lei', image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&auto=format&fit=crop' },
  { name: 'Cappuccino', price: 16, alt: 'Cappuccino cu spumă de lapte cremoasă, 16 lei', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop' },
  { name: 'Cold Brew Tonic', price: 22, alt: 'Cold Brew Tonic cu portocală și gheață, 22 lei', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop' },
  { name: 'Cheesecake', price: 22, alt: 'Felie de Cheesecake New York cu sos de fructe, 22 lei', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop' },
  { name: 'Croissant cu Unt', price: 14, alt: 'Croissant cu unt proaspăt, crocant, 14 lei', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop' },
  { name: 'Brownie', price: 18, alt: 'Brownie cu ciocolată neagră și nuci, 18 lei', image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&auto=format&fit=crop' },
];

const seasonalPreview = [
  { name: 'Latte de Lavandă', price: 20, alt: 'Latte de Lavandă cu sirop artizanal, 20 lei', desc: 'Espresso, lapte microspumat și sirop de lavandă. Disponibil: aprilie–iunie.', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop' },
  { name: 'Cold Brew Tonic', price: 22, alt: 'Cold Brew Tonic cu portocală și gheață, 22 lei', desc: 'Cold brew, apă tonică și portocală proaspătă. Disponibil: tot sezonul.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop' },
  { name: 'Brunch Festiv de Weekend', price: 36, alt: 'Brunch Festiv de Weekend cu Eggs Benedict, granola și cafea de specialitate, 36 lei', desc: 'Eggs Benedict, granola, fresh și cafea de specialitate. Disponibil: sâmbătă și duminică.', image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&auto=format&fit=crop' },
];

export default function Home() {
  return (
    <>
      <Preloader />

      {/* Hero SSR */}
      <section className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center text-center px-6">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)]">
            Cafea bună. Oameni buni. Un loc al tău.
          </h1>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Meniu clar, rezervări rapide și locație ușor de găsit în centrul Bucureștiului.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/meniu" className="px-8 py-4 bg-espresso-800 hover:bg-espresso-900 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105">
              Vezi meniul
            </a>
            <a href="/rezervari" className="px-8 py-4 bg-oliv-600 hover:bg-oliv-800 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105">
              Rezervă masă
            </a>
          </div>
        </div>
      </section>

      <ScrollAnimations />
      <ReviewBar />
      <DayAtVibe />

      {/* Beneficii SSR */}
      <section id="de-ce-vibe" className="py-20 px-6 bg-white animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 font-[family-name:var(--font-playfair)]">De ce Vibe?</h2>
          <p className="text-lg text-gray-500 text-center mb-12">Diferențiatori concreți, nu afirmații vagi.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Cafea de specialitate', desc: 'Boabe selectate din origini single-origin, preparate după rețete calibrate pentru consistență în fiecare ceașcă.', icon: '☕' },
              { title: 'Spațiu de lucru', desc: 'Wi-Fi stabil, prize la fiecare masă și o atmosferă care face munca mai plăcută. Potrivit pentru întâlniri și sesiuni de lucru.', icon: '💻' },
              { title: 'Deserturi de weekend', desc: 'Meniu special disponibil în fiecare weekend, cu ingrediente proaspete și deserturi de patiserie artizanală.', icon: '🥐' },
              { title: 'Locație centrală', desc: 'Bld. Regina Elisabeta 30, Sector 5 — ușor de găsit, aproape de centrul Bucureștiului, cu acces facil din mai multe zone.', icon: '📍' },
            ].map((card) => (
              <div key={card.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Meniu SSR */}
      <section className="py-20 px-6 bg-gray-50 animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 font-[family-name:var(--font-playfair)]">Din meniul nostru</h2>
          <p className="text-lg text-gray-500 text-center mb-12">Cafea bună. Oameni buni. Un loc al tău.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {previewItems.map((item) => (
              <div key={item.name} className="bg-white rounded-2xl shadow-sm overflow-hidden group">
                <div className="h-40 overflow-hidden bg-gray-100">
                  <img src={item.image} alt={item.alt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="font-semibold text-gray-900">{item.name}</span>
                  <span className="text-teal-600 font-bold">{item.price} lei</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href="/meniu" className="px-8 py-4 bg-espresso-800 hover:bg-espresso-900 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 inline-block">
              Vezi meniul complet
            </a>
          </div>
        </div>
      </section>

      {/* Oferte sezoniere SSR */}
      <section className="py-20 px-6 bg-white animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 font-[family-name:var(--font-playfair)]">Oferte sezoniere</h2>
          <p className="text-lg text-gray-500 text-center mb-12">Produse disponibile în această perioadă.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {seasonalPreview.map((item) => (
              <div key={item.name} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-teal-100 group">
                <div className="h-48 overflow-hidden bg-gray-100">
                  <img src={item.image} alt={item.alt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    <span className="text-teal-600 font-bold whitespace-nowrap ml-2">{item.price} lei</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href="/sarbatori" className="px-8 py-4 bg-oliv-600 hover:bg-oliv-800 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 inline-block">
              Vezi toate ofertele sezoniere
            </a>
          </div>
        </div>
      </section>

      {/* CTA secundar rezervare */}
      <section className="bg-espresso-800 dark:bg-espresso-900 py-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-3 font-[family-name:var(--font-playfair)]">Ți-a plăcut ce ai văzut?</h2>
        <p className="text-crem-100 mb-8 text-base max-w-md mx-auto">Rezervă o masă acum și garantăm locul tău.</p>
        <a href="/rezervari" className="inline-block bg-oliv-600 hover:bg-oliv-800 text-white font-bold px-8 py-4 rounded-full text-lg transition-colors duration-200">
          Rezervă masă
        </a>
      </section>

      {/* Locație rapidă SSR */}
      <section className="py-20 px-6 bg-gray-900 text-white animate-on-scroll">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 font-[family-name:var(--font-playfair)]">Unde ne găsești</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div>
              <div className="text-3xl mb-3">📍</div>
              <p className="font-semibold text-lg">Adresă</p>
              <p className="text-gray-200">Bld. Regina Elisabeta 30, Sector 5, București</p>
            </div>
            <div>
              <div className="text-3xl mb-3">🕐</div>
              <p className="font-semibold text-lg">Program</p>
              <p className="text-gray-200">Luni–Vineri 08:00–22:00</p>
              <p className="text-gray-200">Sâmbătă–Duminică 09:00–23:00</p>
            </div>
            <div>
              <div className="text-3xl mb-3">📞</div>
              <p className="font-semibold text-lg">Telefon</p>
              <a href="tel:+40721234567" className="text-teal-400 hover:text-teal-300">+40 721 234 567</a>
            </div>
          </div>
          <a href="https://maps.google.com/?q=Bld.+Regina+Elisabeta+30+Bucuresti" target="_blank" rel="noopener noreferrer"
            className="px-8 py-4 bg-espresso-800 hover:bg-espresso-900 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 inline-block">
            Deschide în Google Maps
          </a>
        </div>
      </section>

      <div className="animate-on-scroll"><About /></div>
      <FooterStarter />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CafeOrCoffeeShop',
        name: 'Vibe Caffè',
        url: 'https://vibe-website2.vercel.app',
        telephone: '+40721234567',
        email: 'contact@vibecaffe.ro',
        address: { '@type': 'PostalAddress', streetAddress: 'Bulevardul Regina Elisabeta 30', addressLocality: 'București', postalCode: '050016', addressCountry: 'RO' },
        openingHoursSpecification: [
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '22:00' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday','Sunday'], opens: '09:00', closes: '23:00' },
        ],
        servesCuisine: ['Coffee', 'Brunch', 'Desserts'],
        priceRange: '$$',
        menu: 'https://vibe-website2.vercel.app/meniu',
      })}} />
    </>
  );
}
```

---

## 8. Componente Preloader

### `components/Preloader.tsx`

Conține: `.preloader-overlay`, animații `steamRise` și `preloaderFadeOut`.

```tsx
'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 3200);
    return () => clearTimeout(timer);
  }, []);

  if (hidden) return null;

  return (
    <div className="preloader-overlay">
      <div className="preloader-cup">
        <svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="cupClip">
              <path d="M18 40 Q16 95 20 105 Q30 118 60 118 Q90 118 100 105 Q104 95 102 40 Z" />
            </clipPath>
          </defs>
          <rect x="10" y="0" width="110" height="120" fill="#92400e" clipPath="url(#cupClip)" className="coffee-fill" />
          <path d="M18 40 Q16 95 20 105 Q30 118 60 118 Q90 118 100 105 Q104 95 102 40 Z" stroke="white" strokeWidth="3.5" fill="none" />
          <ellipse cx="60" cy="40" rx="42" ry="8" stroke="white" strokeWidth="3.5" fill="none" />
          <path d="M102 55 Q125 55 125 75 Q125 95 102 90" stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <ellipse cx="60" cy="122" rx="52" ry="7" stroke="white" strokeWidth="3" fill="none" />
          <path d="M45 28 Q42 18 45 10 Q48 2 45 -5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" className="steam steam-1" />
          <path d="M60 26 Q57 16 60 8 Q63 0 60 -7" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" className="steam steam-2" />
          <path d="M75 28 Q72 18 75 10 Q78 2 75 -5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" className="steam steam-3" />
        </svg>
      </div>

      <style>{`
        .preloader-overlay {
          position: fixed; inset: 0; background: #1a0a00;
          display: flex; align-items: center; justify-content: center;
          z-index: 9999;
          animation: preloaderFadeOut 0.6s ease-out 2.8s forwards;
        }
        .preloader-cup { display: flex; flex-direction: column; align-items: center; gap: 24px; }
        .coffee-fill { transform-origin: bottom; transform: scaleY(0); animation: fillCup 2.2s cubic-bezier(0.4,0,0.2,1) 0.3s forwards; }
        @keyframes fillCup { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        .steam { opacity: 0; stroke-dasharray: 30; stroke-dashoffset: 30; }
        .steam-1 { animation: steamRise 1s ease-out 2s infinite; }
        .steam-2 { animation: steamRise 1s ease-out 2.3s infinite; }
        .steam-3 { animation: steamRise 1s ease-out 2.6s infinite; }
        @keyframes steamRise {
          0%   { opacity: 0; stroke-dashoffset: 30; }
          30%  { opacity: 1; }
          100% { opacity: 0; stroke-dashoffset: 0; }
        }
        @keyframes preloaderFadeOut {
          from { opacity: 1; pointer-events: all; }
          to   { opacity: 0; pointer-events: none; }
        }
      `}</style>
    </div>
  );
}
```
