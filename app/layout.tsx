import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

// 🎨 TIPOGRAFIE 100% SANS-SERIF - MODERN CLEAN
// Plus Jakarta Sans - Sans-serif modern pentru TOATE titlurile (H1-H6)
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Inter - Sans-serif curat pentru body text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

/**
 * 🔍 SEO METADATA
 * Pentru cursanți: Metadata = informații pentru Google și social media
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://vibe-website-rho.vercel.app"),
  title: {
    default: "Vibe Caffè - Cafea de Specialitate în București",
    template: "%s | Vibe Caffè",
  },
  description: "Descoperă aromele autentice ale cafelei de specialitate într-un ambient modern și prietenos. Boabe proaspăt prăjite, bariști experimentați, WiFi gratuit.",
  keywords: ["cafenea bucuresti", "cafea specialitate", "coffee shop", "vibe caffe"],
  authors: [{ name: "Vibe Caffè Team" }],
  openGraph: {
    title: "Vibe Caffè - Cafea de Specialitate în București",
    description: "Cafea bună. Oameni buni. Un loc al tău în centrul Bucureștiului. Bld. Regina Elisabeta 30.",
    type: "website",
    locale: "ro_RO",
    siteName: "Vibe Caffè",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
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
  return (
    <html lang="ro">
      <body
        className={`${plusJakarta.variable} ${inter.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
