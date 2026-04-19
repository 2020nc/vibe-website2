'use client';

import { useState } from 'react';
import Link from 'next/link';
import FooterStarter from '@/components/FooterStarter';

interface FormData {
  nume: string;
  email: string;
  telefon: string;
  data: string;
  ora: string;
  persoane: number;
  mesaj: string;
}

const initialForm: FormData = {
  nume: '',
  email: '',
  telefon: '',
  data: '',
  ora: '',
  persoane: 2,
  mesaj: '',
};

const RESERVATION_STATS = { rating: '4.9', count: '340+' };

// TODO: înlocuiește cu query Supabase real — COUNT rezervări pentru același slot
function getMeseLibere(data: string, ora: string): number {
  if (!data || !ora) return 8;
  let hash = 0;
  const s = data + ora;
  for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) & 0xffffffff;
  return Math.abs(hash % 9); // 0–8
}

const ORE_SAPT = [
  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00',
];
const ORE_WE = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
];

function getOre(data: string) {
  if (!data) return ORE_SAPT;
  const zi = new Date(data).getDay();
  return zi === 0 || zi === 6 ? ORE_WE : ORE_SAPT;
}

function formatData(data: string) {
  if (!data) return '';
  return new Date(data).toLocaleDateString('ro-RO', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function RezervariPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [ocazie, setOcazie] = useState<string | null>(null);
  const [preferinte, setPreferinte] = useState<Set<string>>(new Set());
  const [altcevaText, setAltcevaText] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);

  const OCAZII_PRINCIPALE = ['Aniversare', 'Întâlnire', 'Altceva'];
  const TIPURI_VIZITA = ['Lucru', 'Mic dejun târziu'];

  function buildMesaj(nextOcazie: string | null, nextPreferinte: Set<string>, nextAltcevaText: string) {
    const parts: string[] = [];
    if (nextOcazie === 'Altceva') {
      parts.push(nextAltcevaText.trim() || 'Altceva');
    } else if (nextOcazie) {
      parts.push(nextOcazie);
    }
    if (nextPreferinte.size > 0) {
      parts.push(...TIPURI_VIZITA.filter((preferinta) => nextPreferinte.has(preferinta)));
    }
    return parts.join(', ');
  }

  function getSummaryOcazieLabel() {
    if (ocazie !== 'Altceva') return ocazie || '';
    const trimmed = altcevaText.trim();
    if (!trimmed) return 'Altă ocazie';
    return trimmed.length > 48 ? `${trimmed.slice(0, 45).trimEnd()}…` : trimmed;
  }

  const summaryOcazie = getSummaryOcazieLabel();
  const summaryPreferinte = TIPURI_VIZITA.filter((preferinta) => preferinte.has(preferinta)).join(', ');
  const isSubmitDisabled = loading || !form.data || !form.ora;

  function selectOcazie(nextOcazie: string) {
    const resolvedOcazie = ocazie === nextOcazie ? null : nextOcazie;
    setOcazie(resolvedOcazie);
    setForm((prev) => ({
      ...prev,
      mesaj: buildMesaj(resolvedOcazie, preferinte, altcevaText),
    }));
  }

  function togglePreferinta(preferinta: string) {
    setPreferinte((prev) => {
      const next = new Set(prev);
      if (next.has(preferinta)) {
        next.delete(preferinta);
      } else {
        next.add(preferinta);
      }
      setForm((f) => ({
        ...f,
        mesaj: buildMesaj(ocazie, next, altcevaText),
      }));
      return next;
    });
  }

  function handleAltcevaText(val: string) {
    setAltcevaText(val);
    setForm((f) => ({
      ...f,
      mesaj: buildMesaj(ocazie, preferinte, val),
    }));
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'persoane' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.ora) {
      setError('Te rugăm să alegi o oră.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/rezervari', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, marketingConsent }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || 'Nu am putut trimite rezervarea.');
      }

      setSuccess(true);
      setForm(initialForm);
      setOcazie(null);
      setPreferinte(new Set());
      setAltcevaText('');
      setMarketingConsent(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'A apărut o eroare neașteptată.';
      setError(`Eroare: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 shadow-sm backdrop-blur-md dark:bg-gray-900/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <Link href="/" className="text-xl font-bold text-teal-700">Vibe Caffè</Link>
          <Link href="/" className="text-sm text-gray-700 transition-colors hover:text-teal-700 dark:text-gray-300">
            ← Înapoi acasă
          </Link>
        </div>
      </nav>

      <main className="min-h-screen bg-gray-50 px-4 pt-14 pb-4 dark:bg-gray-900">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-2 flex items-center justify-between border-b border-gray-200 py-1.5 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="text-sm font-bold text-gray-900 dark:text-gray-100">Rezervă o masă</div>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] text-amber-900 dark:bg-amber-900/20 dark:text-amber-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#FBBF24" stroke="none" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                {RESERVATION_STATS.rating} · {RESERVATION_STATS.count} luna aceasta
              </span>
            </div>
            <p className="text-[11px] text-gray-600 dark:text-gray-300">L–V 07:00–22:00 · S–D 08:00–23:00</p>
          </div>

          {success && (
            <div className="rounded-2xl border border-teal-200 bg-teal-50 p-8 text-center">
              <div className="mb-4 text-5xl">☕</div>
              <h2 className="mb-2 text-2xl font-bold text-teal-700">Rezervare trimisă!</h2>
              <p className="mb-1 text-teal-700">Te vom contacta în cel mult 2 ore pentru confirmare.</p>
              <p className="mb-6 text-sm text-teal-700">
                Dacă nu primești răspuns, sună la <a href="tel:+40721234567" className="font-semibold underline">+40 721 234 567</a>.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  onClick={() => setSuccess(false)}
                  className="rounded-full bg-teal-500 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-teal-600"
                >
                  Rezervare nouă
                </button>
                <Link
                  href="/"
                  className="rounded-full border border-teal-300 bg-white px-6 py-2.5 font-semibold text-teal-700 transition-colors hover:bg-teal-50"
                >
                  Înapoi la pagina principală
                </Link>
              </div>
            </div>
          )}

          {!success && (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 items-start gap-3 lg:grid-cols-[2fr_3fr] lg:items-stretch">
              <div className="flex flex-col gap-1.5 rounded-2xl border border-gray-100 bg-white p-3 shadow-md dark:border-gray-700 dark:bg-gray-800 lg:h-full">
                <div className="mb-2 border-b border-gray-100 pb-2 dark:border-gray-700 lg:border-0 lg:pb-0">
                  <p className="mb-2 text-sm font-bold text-teal-800 dark:text-teal-300">Când</p>
                  {(() => {
                    const azi = new Date().toISOString().split('T')[0];
                    const maine = new Date(Date.now() + 86400000).toISOString().split('T')[0];
                    const isAltaZi = form.data && form.data !== azi && form.data !== maine;
                    const shortcuts: { label: string; value: string | null }[] = [
                      { label: 'Azi', value: azi },
                      { label: 'Mâine', value: maine },
                      { label: 'Altă zi', value: null },
                    ];

                    return (
                      <div className="grid grid-cols-3 gap-1.5">
                        {shortcuts.map(({ label, value }) => {
                          const isActive = value !== null ? form.data === value : !!isAltaZi;
                          const displayDate = value !== null
                            ? new Date(`${value}T00:00:00`).toLocaleDateString('ro-RO', { day: '2-digit', month: 'short' })
                            : isAltaZi
                              ? new Date(`${form.data}T00:00:00`).toLocaleDateString('ro-RO', { day: '2-digit', month: 'short' })
                              : null;

                          return (
                            <button
                              key={label}
                              type="button"
                              onClick={() => {
                                if (value !== null) {
                                  setForm((prev) => ({ ...prev, data: value }));
                                } else {
                                  const el = document.getElementById('rez-data') as HTMLInputElement | null;
                                  el?.focus();
                                  el?.showPicker?.();
                                }
                              }}
                              className={`cursor-pointer rounded-lg border px-1 py-1.5 text-center transition ${
                                isActive
                                  ? 'border-teal-600 bg-teal-600 text-white'
                                  : 'border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                              }`}
                            >
                              <span className="block text-[10px] font-semibold">{label}</span>
                              {displayDate && (
                                <span className={`mt-0.5 block text-[11px] ${isActive ? 'text-teal-100' : 'text-gray-600 dark:text-gray-300'}`}>
                                  {displayDate}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })()}

                  <p id="rez-data-help" className="mt-3 text-xs leading-relaxed text-gray-700 dark:text-gray-300">
                    Alege rapid o zi din butoanele de mai sus sau selectează direct data din calendar.
                  </p>
                  <label htmlFor="rez-data" className="sr-only">
                    Data rezervării
                  </label>
                  <input
                    id="rez-data"
                    type="date"
                    name="data"
                    value={form.data}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-describedby="rez-data-help"
                    min={new Date().toISOString().split('T')[0]}
                    className="mt-2 w-full min-h-[44px] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-teal-400 dark:focus:ring-teal-900/40"
                  />
                </div>

                <div className="mb-2 border-b border-gray-100 pb-2 dark:border-gray-700 lg:border-0 lg:pb-0">
                  <div className="mb-2 flex items-center justify-between">
                    <p id="ora-label" className="text-sm font-bold text-teal-800 dark:text-teal-300">Ora</p>
                    {form.ora && (() => {
                      const libere = getMeseLibere(form.data, form.ora);
                      if (libere === 0) return null;
                      const isLow = libere <= 2;
                      return (
                        <span className={`text-[11px] font-semibold ${isLow ? 'text-amber-700 dark:text-amber-400' : 'text-teal-700 dark:text-teal-400'}`}>
                          {isLow ? (libere === 1 ? 'Doar 1 masă liberă' : `Doar ${libere} mese libere`) : (libere === 1 ? '1 masă liberă' : `${libere} mese libere`)}
                        </span>
                      );
                    })()}
                  </div>
                  <div className="grid grid-cols-4 gap-1" role="group" aria-labelledby="ora-label">
                    {getOre(form.data).map((h) => {
                      const libere = getMeseLibere(form.data, h);
                      const ocupat = libere === 0;
                      return (
                        <button
                          key={h}
                          type="button"
                          onClick={() => !ocupat && setForm((prev) => ({ ...prev, ora: h }))}
                          aria-pressed={form.ora === h}
                          aria-label={ocupat ? `Ora ${h} — ocupat` : `Ora ${h}`}
                          disabled={ocupat}
                          className={`rounded-lg border py-2.5 text-[11px] font-semibold transition-all duration-150 md:py-1 ${
                            ocupat
                              ? 'cursor-not-allowed border-gray-100 bg-transparent text-gray-300 line-through dark:border-gray-700 dark:text-gray-600'
                              : form.ora === h
                                ? 'border-teal-500 bg-teal-500 text-white shadow-sm'
                                : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-teal-500 hover:text-teal-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {h}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-0.5">
                  <p id="persoane-label" className="mb-2 text-sm font-bold text-teal-800 dark:text-teal-300">Persoane</p>
                  <div role="group" aria-labelledby="persoane-label" className="flex flex-col gap-1">
                    <div className="grid grid-cols-5 gap-1 lg:grid-cols-10">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <button
                          key={n}
                          type="button"
                          aria-pressed={form.persoane === n}
                          onClick={() => setForm((prev) => ({ ...prev, persoane: n }))}
                          className={`rounded border py-2.5 text-center text-[11px] transition md:py-1 ${
                            form.persoane === n
                              ? 'border-teal-600 bg-teal-600 font-medium text-white'
                              : 'border-gray-200 text-gray-700 hover:border-teal-500 dark:border-gray-600 dark:text-gray-300'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {[{ val: 15, label: 'Grup 11–15' }, { val: 20, label: 'Grup 16–20' }].map(({ val, label }) => (
                        <button
                          key={val}
                          type="button"
                          aria-pressed={form.persoane === val}
                          onClick={() => setForm((prev) => ({ ...prev, persoane: val }))}
                          className={`rounded border py-2.5 text-center text-[10px] transition md:py-1 ${
                            form.persoane === val
                              ? 'border-teal-600 bg-teal-600 font-medium text-white'
                              : 'border-gray-200 text-gray-700 hover:border-teal-500 dark:border-gray-600 dark:text-gray-300'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 rounded-2xl border border-gray-100 bg-white p-3 shadow-md dark:border-gray-700 dark:bg-gray-800 lg:h-full">
                <div className="mb-1.5">
                  <p className="mb-2 text-sm font-bold text-teal-800 dark:text-teal-300">Cine</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="mb-1.5">
                      <label htmlFor="rez-nume" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Nume complet *</label>
                      <input
                        id="rez-nume"
                        type="text"
                        name="nume"
                        value={form.nume}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        placeholder="Ion Popescu"
                        className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-[12px] transition focus:outline-none focus:ring-2 focus:ring-teal-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                      />
                    </div>
                    <div className="mb-1.5">
                      <label htmlFor="rez-telefon" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Telefon *</label>
                      <input
                        id="rez-telefon"
                        type="tel"
                        name="telefon"
                        value={form.telefon}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        placeholder="07xx xxx xxx"
                        className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-[12px] transition focus:outline-none focus:ring-2 focus:ring-teal-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                      />
                    </div>
                    <div className="col-span-full mb-1">
                      <label htmlFor="rez-email" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                      <input
                        id="rez-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="ion@email.com"
                        className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-[12px] transition focus:outline-none focus:ring-2 focus:ring-teal-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                      />
                      <div className="mt-0.5 flex items-start gap-1.5 rounded-lg bg-teal-50/85 px-2 py-1 dark:bg-teal-900/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                        <span className="text-[10px] leading-snug text-teal-800 dark:text-teal-400">Primești ofertele sezoniere și 10% la prima rezervare</span>
                      </div>
                      <div className="mt-0.5 min-h-[34px]">
                        <label className={`flex items-start gap-2 ${form.email.length > 0 ? 'cursor-pointer opacity-100' : 'pointer-events-none opacity-0'}`}>
                          <input
                            type="checkbox"
                            checked={marketingConsent}
                            onChange={(e) => setMarketingConsent(e.target.checked)}
                            className="mt-0.5 accent-teal-600"
                            tabIndex={form.email.length > 0 ? 0 : -1}
                            aria-hidden={form.email.length > 0 ? undefined : true}
                          />
                          <span className="text-[10px] leading-snug text-gray-700 dark:text-gray-400">
                            Da, vreau să primesc ofertele sezoniere prin email. Mă pot dezabona oricând.
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="flex-shrink-0 text-sm font-bold text-teal-800 dark:text-teal-300">
                      Ocazie
                    </span>
                    <div className="min-w-0 flex flex-wrap gap-1">
                      {OCAZII_PRINCIPALE.map((o) => (
                        <button
                          key={o}
                          type="button"
                          aria-pressed={ocazie === o}
                          onClick={() => selectOcazie(o)}
                          className={`rounded-full border px-2 py-0.5 text-[10px] transition ${
                            ocazie === o
                              ? 'border-teal-600 bg-teal-600 text-white shadow-sm dark:border-teal-500 dark:bg-teal-500'
                              : 'border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700'
                          }`}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                  {ocazie === 'Altceva' && (
                    <textarea
                      value={altcevaText}
                      onChange={(e) => handleAltcevaText(e.target.value)}
                      rows={1}
                      maxLength={120}
                      placeholder="Descrie pe scurt ocazia"
                      className="max-h-24 min-h-[44px] w-full resize-none rounded-lg border border-gray-200 px-3 py-1.5 text-sm transition-[min-height,box-shadow] focus:min-h-[68px] focus:outline-none focus:ring-2 focus:ring-teal-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                    />
                  )}
                </div>

                <div className="mb-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="flex-shrink-0 text-sm font-bold text-teal-800 dark:text-teal-300">
                      Preferințe
                    </span>
                    <div className="min-w-0 flex flex-wrap gap-1">
                      {TIPURI_VIZITA.map((preferinta) => (
                        <button
                          key={preferinta}
                          type="button"
                          aria-pressed={preferinte.has(preferinta)}
                          onClick={() => togglePreferinta(preferinta)}
                          className={`rounded-full border px-2 py-0.5 text-[10px] transition ${
                            preferinte.has(preferinta)
                              ? 'border-teal-600 bg-teal-600 text-white shadow-sm dark:border-teal-500 dark:bg-teal-500'
                              : 'border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700'
                          }`}
                        >
                          {preferinta}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-0.5 lg:pb-6">
                  {form.data && form.ora && (
                    <div className="flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-teal-400 bg-teal-50 px-2.5 py-1.5 dark:bg-teal-900/20">
                      <span className="text-[13px] text-teal-700">☕</span>
                      <span className="text-[11px] font-semibold capitalize text-teal-700 dark:text-teal-300">{formatData(form.data)}</span>
                      <span className="text-xs text-teal-600 dark:text-teal-400">·</span>
                      <span className="text-[11px] font-bold text-teal-700 dark:text-teal-300">{form.ora}</span>
                      <span className="text-xs text-teal-600 dark:text-teal-400">·</span>
                      <span className="text-[11px] text-teal-700 dark:text-teal-300">{form.persoane} pers.</span>
                      {summaryOcazie && (
                        <>
                          <span className="text-xs text-teal-600 dark:text-teal-400">·</span>
                          <span
                            className="max-w-full break-words text-[11px] font-medium text-teal-700 dark:text-teal-300 sm:max-w-[220px] sm:truncate"
                            title={ocazie === 'Altceva' ? (altcevaText.trim() || 'Altă ocazie') : summaryOcazie}
                          >
                            {summaryOcazie}
                          </span>
                        </>
                      )}
                      {summaryPreferinte && (
                        <>
                          <span className="text-xs text-teal-600 dark:text-teal-400">·</span>
                          <span className="max-w-full break-words text-[11px] font-medium text-teal-700 dark:text-teal-300">
                            {summaryPreferinte}
                          </span>
                        </>
                      )}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded bg-teal-700 py-2.5 text-[13px] font-bold text-white transition-all duration-200 hover:scale-[1.01] hover:bg-teal-800 disabled:bg-gray-200 disabled:text-gray-400"
                  >
                    {loading ? (
                      <>
                        <svg className="h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
                        </svg>
                        Se confirmă…
                      </>
                    ) : 'Confirmă masa →'}
                  </button>

                  {isSubmitDisabled && !loading && (
                    <p className="mt-2 text-center text-xs leading-tight text-gray-600 dark:text-gray-300">
                      Completează informațiile necesare pentru a continua
                    </p>
                  )}

                  <div className="mt-0.5 flex justify-between text-[10px] text-gray-600 dark:text-gray-300">
                    <span>Max. 20 pers.</span>
                    <span>Confirmare în 2h</span>
                    <span>Anulare gratuită</span>
                  </div>

                  <p className="mt-0.5 text-center text-[10px] leading-tight text-gray-600 dark:text-gray-400">
                    Continuând, accepți <a href="/confidentialitate" className="underline hover:text-gray-600">termenii</a>
                  </p>

                  {error && <p id="rez-error" role="alert" className="text-center text-xs text-red-500">{error}</p>}
                </div>
              </div>
            </form>
          )}
        </div>
      </main>

      <FooterStarter />
    </>
  );
}
