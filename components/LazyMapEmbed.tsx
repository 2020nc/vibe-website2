'use client';

import { useState } from 'react';

interface LazyMapEmbedProps {
  mapTitle: string;
  mapsHref: string;
  embedSrc: string;
}

export default function LazyMapEmbed({
  mapTitle,
  mapsHref,
  embedSrc,
}: LazyMapEmbedProps) {
  const [showMap, setShowMap] = useState(false);

  if (showMap) {
    return (
      <iframe
        src={embedSrc}
        width="100%"
        height="420"
        style={{ border: 0, borderRadius: '12px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={mapTitle}
      />
    );
  }

  return (
    <div className="relative h-[420px] overflow-hidden rounded-2xl bg-gradient-to-br from-teal-50 via-white to-orange-50 p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(15,118,110,0.12),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(249,115,22,0.14),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.98),rgba(240,253,250,0.92))]" />
      <div className="relative flex h-full flex-col justify-between rounded-[20px] border border-teal-100/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
            Hartă interactivă
          </p>
          <h3 className="mt-3 text-2xl font-bold text-gray-900">
            Încărcăm Google Maps doar la cerere
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-600">
            Vezi traseul rapid către cafenea fără să încărcăm embed-ul complet din primul paint.
          </p>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setShowMap(true)}
            className="w-full rounded-full bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-teal-800"
          >
            Afișează harta interactivă
          </button>
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-full border border-teal-200 bg-white px-5 py-3 text-center text-sm font-semibold text-teal-800 transition-colors duration-200 hover:bg-teal-50"
          >
            Deschide direct în Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
