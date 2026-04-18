import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import DeferredChatWidget from "@/components/DeferredChatWidget";
import FABContact from "@/components/FABContact";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  display: "swap",
  preload: false,
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  weight: ["700"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vibe-website2.vercel.app"),
  title: {
    default: "Vibe Caffè - Cafea de Specialitate în București",
    template: "%s | Vibe Caffe",
  },
  description:
    "Cafea single-origin, brunch de weekend și un spațiu potrivit pentru lucru în centrul Bucureștiului. Rezervă masă online.",
  keywords: [
    "cafea specialitate",
    "cafenea bucurești",
    "specialty coffee",
    "brunch bucuresti",
    "vibe caffe",
  ],
  authors: [{ name: "Vibe Caffe Team" }],
  openGraph: {
    title: "Vibe Caffe - Cafea de Specialitate",
    description: "Cafea single-origin și brunch în inima Bucureștiului.",
    url: "https://vibe-website2.vercel.app",
    siteName: "Vibe Caffe",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Interiorul Vibe Caffe",
      },
    ],
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
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeInitScript = `
    (function () {
      try {
        var saved = localStorage.getItem('theme');
        var dark = saved === 'dark';
        var root = document.documentElement;
        if (dark) {
          root.setAttribute('data-theme', 'dark');
          root.classList.add('dark');
        } else {
          root.removeAttribute('data-theme');
          root.classList.remove('dark');
        }
      } catch (e) {}
    })();
  `;

  return (
    <html lang="ro" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        suppressHydrationWarning
        className={`${plusJakarta.variable} ${inter.variable} ${playfair.variable} antialiased`}
      >
        <Navigation />
        {children}
        <DeferredChatWidget />
        <FABContact />
      </body>
    </html>
  );
}
