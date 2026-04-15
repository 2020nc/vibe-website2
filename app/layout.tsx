import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ChatWidget from "@/components/ChatWidgetV2";

// 🎨 TIPOGRAFIE 100% SANS-SERIF - MODERN CLEAN
// Plus Jakarta Sans - Sans-serif modern pentru TOATE titlurile (H1-H6)
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
  metadataBase: new URL("https://vibe-website2.vercel.app"),
  title: {
    default: "Vibe Caffè — Cafea de Specialitate în București",
    template: "%s | Vibe Caffè",
  },
  description: "Cafea single-origin, brunch de weekend și un spațiu work-friendly în centrul Bucureștiului. Rezervă masa ta online.",
  keywords: ["cafea specialitate", "cafenea bucuresti", "specialty coffee", "brunch bucuresti", "vibe caffe"],
  authors: [{ name: "Vibe Caffè Team" }],
  openGraph: {
    title: "Vibe Caffè — Cafea de Specialitate",
    description: "Cafea single-origin și brunch în inima Bucureștiului.",
    url: "https://vibe-website2.vercel.app",
    siteName: "Vibe Caffè",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Interiorul Vibe Caffè",
      },
    ],
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Caffè — Cafea de Specialitate",
    images: ["/og-image.jpg"],
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
        className={`${plusJakarta.variable} ${inter.variable} ${playfair.variable} antialiased`}
      >
        <Navigation />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
