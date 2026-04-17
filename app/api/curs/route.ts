import { NextResponse } from 'next/server';

/**
 * API Route: /api/curs
 *
 * GET — returnează cursul EUR și USD față de RON
 * Sursa: BNR XML feed (https://www.bnr.ro/nbrfxrates.xml)
 * Cache: 1 oră (3600 secunde) — cursul BNR se actualizează o dată pe zi
 */

interface CursValutar {
  EUR: number;
  USD: number;
  updatedAt: string;
}

// Cache simplu în memorie (valabil cât timp rulează serverul)
let cache: { data: CursValutar; fetchedAt: number } | null = null;
const CACHE_TTL = 3600 * 1000; // 1 oră în milisecunde

function parseCurs(xml: string, currency: string): number | null {
  const regex = new RegExp(`<Rate currency="${currency}"[^>]*>([\\d.]+)<\\/Rate>`);
  const match = xml.match(regex);
  return match ? parseFloat(match[1]) : null;
}

export async function GET() {
  // Returnează din cache dacă e valid
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL) {
    return NextResponse.json({ data: cache.data });
  }

  try {
    const res = await fetch('https://www.bnr.ro/nbrfxrates.xml', {
      headers: { 'Accept': 'application/xml' },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`BNR responded with ${res.status}`);
    }

    const xml = await res.text();

    const eur = parseCurs(xml, 'EUR');
    const usd = parseCurs(xml, 'USD');

    if (!eur || !usd) {
      throw new Error('Cursurile EUR/USD nu au putut fi extrase din XML-ul BNR.');
    }

    const data: CursValutar = {
      EUR: eur,
      USD: usd,
      updatedAt: new Date().toISOString(),
    };

    cache = { data, fetchedAt: Date.now() };

    return NextResponse.json({ data });
  } catch {
    // Dacă avem cache expirat, îl returnăm ca fallback
    if (cache) {
      return NextResponse.json({ data: cache.data, stale: true });
    }
    return NextResponse.json(
      { error: 'Nu s-a putut obține cursul BNR. Încearcă din nou.' },
      { status: 503 }
    );
  }
}
