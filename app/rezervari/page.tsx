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
            <div className="text-sm font-bold text-gray-900 dark:text-gray-100">Rezervă o masă</div>
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
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Data rezervării</label>
                  <input
                    type="date"
                    name="data"
                    value={form.data}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-sm"
                  />
                </div>

                {/* Ore */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Ora</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {getOre(form.data).map(h => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, ora: h }))}
                        className={`py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 ${
                          form.ora === h
                            ? 'bg-teal-500 border-teal-500 text-white shadow-sm'
                            : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-teal-400 hover:text-teal-600'
                        }`}
                      >
                        {h}
                      </button>
                    ))}
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nume complet *</label>
                    <input type="text" name="nume" value={form.nume} onChange={handleChange} required placeholder="Ion Popescu"
                      className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="ion@email.com"
                      className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Telefon *</label>
                    <input type="tel" name="telefon" value={form.telefon} onChange={handleChange} required placeholder="07xx xxx xxx"
                      className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Număr persoane *</label>
                    <select name="persoane" value={form.persoane} onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition bg-white dark:bg-gray-700 text-sm">
                      {[1,2,3,4,5,6,7,8,9,10].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'persoană' : 'persoane'}</option>
                      ))}
                      <option value={15}>Grup 11–15</option>
                      <option value={20}>Grup 16–20</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cerințe speciale</label>
                  <textarea name="mesaj" value={form.mesaj} onChange={handleChange} rows={2}
                    placeholder="Ex: aniversare, loc la fereastră, alergii..."
                    className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition resize-none text-sm" />
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <button type="submit" disabled={loading || !form.data || !form.ora}
                    className="flex-1 py-2.5 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold text-sm rounded-xl transition-all duration-200 hover:scale-[1.01]">
                    {loading ? 'Se trimite...' : 'Rezervă acum ☕'}
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-700 pt-2 gap-2">
                  <span className="whitespace-nowrap">👥 Max. 20 pers.</span>
                  <span className="whitespace-nowrap">✅ Confirmare 2h</span>
                  <span className="whitespace-nowrap">❌ Anulare free</span>
                </div>

                {error && <p className="text-red-500 text-xs text-center">{error}</p>}

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
