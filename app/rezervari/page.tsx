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

const ORE_SAPT = ['07:00','08:00','09:00','10:00','11:00','12:00','13:00',
                  '14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00'];
const ORE_WE   = ['08:00','09:00','10:00','11:00','12:00','13:00',
                  '14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'];

function getOre(data: string) {
  if (!data) return ORE_SAPT;
  const zi = new Date(data).getDay();
  return (zi === 0 || zi === 6) ? ORE_WE : ORE_SAPT;
}

function formatData(data: string) {
  if (!data) return '';
  return new Date(data).toLocaleDateString('ro-RO', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
}

export default function RezervariPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [ocazii, setOcazii] = useState<Set<string>>(new Set());
  const [altcevaText, setAltcevaText] = useState('');

  const OCAZII = ['Aniversare', 'Întâlnire', 'Focus', 'Brunch', 'Altceva'];

  function toggleOcazie(o: string) {
    setOcazii(prev => {
      const next = new Set(prev);
      if (next.has(o)) { next.delete(o); } else { next.add(o); }
      // sincronizează form.mesaj
      const parts = [...next].filter(x => x !== 'Altceva');
      if (next.has('Altceva') && altcevaText) parts.push(altcevaText);
      setForm(f => ({ ...f, mesaj: parts.join(', ') }));
      return next;
    });
  }

  function handleAltcevaText(val: string) {
    setAltcevaText(val);
    setForm(f => {
      const parts = [...ocazii].filter(x => x !== 'Altceva');
      if (val) parts.push(val);
      return { ...f, mesaj: parts.join(', ') };
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'persoane' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.ora) { setError('Te rugăm să alegi o oră.'); return; }
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/rezervari', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || 'Nu am putut trimite rezervarea.');
      }

      setSuccess(true);
      setForm(initialForm);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'A apărut o eroare neașteptată.';
      setError(`Eroare: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-teal-500">Vibe Caffè</Link>
          <Link href="/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-teal-500 transition-colors">← Înapoi acasă</Link>
        </div>
      </nav>

      <main className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col pt-14 pb-2 px-4 overflow-hidden">
        <div className="max-w-6xl w-full mx-auto flex flex-col flex-1 min-h-0">

          {/* Titlu compact */}
          <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 mb-3">
            <div className="flex items-center gap-3">
              <div className="text-sm font-bold text-gray-900 dark:text-gray-100">Rezervă o masă</div>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1 text-xs text-amber-900 dark:text-amber-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#FBBF24" stroke="none" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                {RESERVATION_STATS.rating} · {RESERVATION_STATS.count} luna aceasta
              </span>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500">L–V 07:00–22:00 · S–D 08:00–23:00</p>
          </div>

          {/* Success */}
          {success && (
            <div className="p-8 bg-teal-50 border border-teal-200 rounded-2xl text-center">
              <div className="text-5xl mb-4">☕</div>
              <h2 className="text-2xl font-bold text-teal-700 mb-2">Rezervare trimisă!</h2>
              <p className="text-teal-600 mb-1">Te vom contacta în cel mult 2 ore pentru confirmare.</p>
              <p className="text-sm text-teal-500 mb-6">
                Dacă nu primești răspuns, sună la <a href="tel:+40721234567" className="underline font-semibold">+40 721 234 567</a>.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-full transition-colors font-semibold"
                >
                  Rezervare nouă
                </button>
                <Link href="/" className="px-6 py-2.5 bg-white border border-teal-300 text-teal-600 hover:bg-teal-50 rounded-full transition-colors font-semibold">
                  Înapoi la pagina principală
                </Link>
              </div>
            </div>
          )}

          {/* Layout 2 coloane */}
          {!success && (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-3 items-start flex-1 min-h-0">

              {/* ── COLOANA STÂNGA ── */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-4 flex flex-col gap-3">

                {/* Data */}
                <div>
                  {/* Quick date shortcuts */}
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
                      <div className="grid grid-cols-3 gap-2">
                        {shortcuts.map(({ label, value }) => {
                          const isActive = value !== null
                            ? form.data === value
                            : !!isAltaZi;
                          const displayDate = value !== null
                            ? new Date(value + 'T00:00:00').toLocaleDateString('ro-RO', { day: '2-digit', month: 'short' })
                            : isAltaZi
                              ? new Date(form.data + 'T00:00:00').toLocaleDateString('ro-RO', { day: '2-digit', month: 'short' })
                              : null;
                          return (
                            <button
                              key={label}
                              type="button"
                              onClick={() => {
                                if (value !== null) {
                                  setForm(prev => ({ ...prev, data: value }));
                                } else {
                                  const el = document.getElementById('rez-data') as HTMLInputElement | null;
                                  el?.showPicker?.();
                                }
                              }}
                              className={`rounded-lg border p-2 text-center text-xs transition cursor-pointer ${
                                isActive
                                  ? 'bg-teal-600 border-teal-600 text-white'
                                  : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                              }`}
                            >
                              <span className="block font-semibold">{label}</span>
                              {displayDate && (
                                <span className={`block text-[11px] mt-0.5 ${isActive ? 'text-teal-100' : 'text-gray-400 dark:text-gray-500'}`}>
                                  {displayDate}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })()}
                  {/* Input nativ ascuns — sursa de adevar pentru state si showPicker() */}
                  <input
                    id="rez-data"
                    type="date"
                    name="data"
                    value={form.data}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    min={new Date().toISOString().split('T')[0]}
                    className="sr-only"
                  />
                </div>

                {/* Ore */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p id="ora-label" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Ora</p>
                    {form.ora && (() => {
                      const libere = getMeseLibere(form.data, form.ora);
                      if (libere === 0) return null;
                      const isLow = libere <= 2;
                      return (
                        <span className={`text-[11px] font-semibold ${isLow ? 'text-amber-700 dark:text-amber-400' : 'text-teal-700 dark:text-teal-400'}`}>
                          {isLow ? `Doar ${libere} mese libere la ${form.ora}` : `${libere} mese libere la ${form.ora}`}
                        </span>
                      );
                    })()}
                  </div>
                  <div className="grid grid-cols-4 gap-1.5" role="group" aria-labelledby="ora-label">
                    {getOre(form.data).map(h => {
                      const libere = getMeseLibere(form.data, h);
                      const ocupat = libere === 0;
                      return (
                        <button
                          key={h}
                          type="button"
                          onClick={() => !ocupat && setForm(prev => ({ ...prev, ora: h }))}
                          aria-pressed={form.ora === h}
                          aria-label={ocupat ? `Ora ${h} — ocupat` : `Ora ${h}`}
                          disabled={ocupat}
                          className={`py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 ${
                            ocupat
                              ? 'line-through text-gray-300 dark:text-gray-600 border-gray-100 dark:border-gray-700 cursor-not-allowed bg-transparent'
                              : form.ora === h
                                ? 'bg-teal-500 border-teal-500 text-white shadow-sm'
                                : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-teal-400 hover:text-teal-600'
                          }`}
                        >
                          {h}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Ticket sumar */}
                {form.data && form.ora && (
                  <div className="flex items-center gap-2 rounded-lg border border-teal-400 bg-teal-50 dark:bg-teal-900/20 px-3 py-2">
                    <span className="text-teal-500 text-sm">☕</span>
                    <span className="text-teal-700 dark:text-teal-300 font-semibold text-sm capitalize">{formatData(form.data)}</span>
                    <span className="text-teal-400 text-xs">·</span>
                    <span className="text-teal-700 dark:text-teal-300 font-bold text-sm">{form.ora}</span>
                  </div>
                )}
              </div>

              {/* ── COLOANA DREAPTA ── */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-4 flex flex-col gap-3">

                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Date de contact</div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="rez-nume" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nume complet *</label>
                    <input id="rez-nume" type="text" name="nume" value={form.nume} onChange={handleChange} required aria-required="true" placeholder="Ion Popescu"
                      className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-sm" />
                  </div>
                  <div>
                    <label htmlFor="rez-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input id="rez-email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="ion@email.com"
                      className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-sm" />
                  </div>
                  <div>
                    <label htmlFor="rez-telefon" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Telefon *</label>
                    <input id="rez-telefon" type="tel" name="telefon" value={form.telefon} onChange={handleChange} required aria-required="true" placeholder="07xx xxx xxx"
                      className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-sm" />
                  </div>
                  <div>
                    <p id="persoane-label" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Număr persoane *</p>
                    <div role="group" aria-labelledby="persoane-label" className="flex flex-col gap-1">
                      <div className="grid grid-cols-5 gap-1">
                        {[1,2,3,4,5].map(n => (
                          <button key={n} type="button" aria-pressed={form.persoane === n}
                            onClick={() => setForm(prev => ({ ...prev, persoane: n }))}
                            className={`py-2 rounded-md border text-sm text-center transition ${form.persoane === n ? 'bg-teal-600 border-teal-600 text-white font-medium' : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-teal-500'}`}>
                            {n}
                          </button>
                        ))}
                      </div>
                      <div className="grid grid-cols-5 gap-1">
                        {[6,7,8,9,10].map(n => (
                          <button key={n} type="button" aria-pressed={form.persoane === n}
                            onClick={() => setForm(prev => ({ ...prev, persoane: n }))}
                            className={`py-2 rounded-md border text-sm text-center transition ${form.persoane === n ? 'bg-teal-600 border-teal-600 text-white font-medium' : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-teal-500'}`}>
                            {n}
                          </button>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {[{ val: 15, label: 'Grup 11–15' }, { val: 20, label: 'Grup 16–20' }].map(({ val, label }) => (
                          <button key={val} type="button" aria-pressed={form.persoane === val}
                            onClick={() => setForm(prev => ({ ...prev, persoane: val }))}
                            className={`py-2 rounded-md border text-xs text-center transition ${form.persoane === val ? 'bg-teal-600 border-teal-600 text-white font-medium' : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-teal-500'}`}>
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ocazie? <span className="text-gray-400 font-normal">(opțional)</span></p>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {OCAZII.map(o => (
                      <button
                        key={o}
                        type="button"
                        aria-pressed={ocazii.has(o)}
                        onClick={() => toggleOcazie(o)}
                        className={`rounded-full px-3 py-1 text-xs border transition ${ocazii.has(o) ? 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-900/40 dark:text-teal-300 dark:border-teal-700' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                  {ocazii.has('Altceva') && (
                    <textarea
                      value={altcevaText}
                      onChange={e => handleAltcevaText(e.target.value)}
                      rows={2}
                      placeholder="Spune-ne mai multe…"
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition resize-none text-sm max-h-24"
                    />
                  )}
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <button type="submit" disabled={loading || !form.data || !form.ora}
                    className="flex-1 py-2.5 bg-teal-700 hover:bg-teal-800 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold text-sm rounded-xl transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Se confirmă…
                      </>
                    ) : 'Confirmă masa →'}
                  </button>
                </div>

                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-2">
                  <span>Max. 20 pers.</span>
                  <span>Confirmăm în 2h</span>
                  <span>Anulare gratuită</span>
                </div>

                {error && <p id="rez-error" role="alert" className="text-red-500 text-xs text-center">{error}</p>}

                <p className="text-xs text-gray-400 dark:text-gray-500 text-center whitespace-nowrap overflow-hidden text-ellipsis">
                  Prin trimiterea acestui formular ești de acord cu{' '}
                  <a href="/confidentialitate" className="underline hover:text-gray-600">Politica de confidențialitate</a>.
                </p>

              </div>

            </form>
          )}

        </div>
      </main>

      <FooterStarter />
    </>
  );
}
