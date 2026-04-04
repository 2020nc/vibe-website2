'use client';

import { useState } from 'react';
import { getSupabase } from '@/lib/supabase';
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
  const zi = new Date(data).getDay(); // 0=dum, 6=sam
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
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'persoane' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.ora) { setError('Te rugăm să alegi o oră.'); return; }
    setLoading(true);
    setError('');

    const { error: supabaseError } = await getSupabase()
      .from('rezervari')
      .insert([{ ...form, status: 'în așteptare' }]);

    setLoading(false);

    if (supabaseError) {
      setError(`Eroare: ${supabaseError.message}`);
    } else {
      setSuccess(true);
      setForm(initialForm);
    }
  };

  return (
    <>
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-teal-500">Vibe Caffè</a>
          <a href="/" className="text-gray-600 hover:text-teal-500 transition-colors">← Înapoi acasă</a>
        </div>
      </nav>

      <main className="min-h-screen bg-gray-50 pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Titlu compact */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Rezervă o masă</h1>
            <p className="text-sm text-gray-500">L–V 07:00–22:00 · S–D 08:00–23:00</p>
          </div>


          {/* Stepper vizual */}
          {!success && (
            <div className="flex items-center justify-center mb-8 max-w-md mx-auto">
              {[
                { step: 1, label: 'Alege data & ora' },
                { step: 2, label: 'Detaliile tale' },
                { step: 3, label: 'Confirmare' },
              ].map(({ step, label }, i) => (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                        currentStep > step
                          ? 'bg-green-600 text-white'
                          : currentStep === step
                          ? 'bg-amber-800 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {currentStep > step ? '✓' : step}
                    </div>
                    <span className="text-xs text-center mt-1 text-gray-500 w-20">{label}</span>
                  </div>
                  {i < 2 && <div className="flex-1 h-px bg-gray-300 mx-2 mb-5" />}
                </div>
              ))}
            </div>
          )}

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
                <a href="/" className="px-6 py-2.5 bg-white border border-teal-300 text-teal-600 hover:bg-teal-50 rounded-full transition-colors font-semibold">
                  Înapoi la pagina principală
                </a>
              </div>
            </div>
          )}

          {/* Formular cu pași */}
          {!success && (
            <form onSubmit={handleSubmit}>

              {/* ── PAS 1: Dată + Oră ── */}
              {currentStep === 1 && (
                <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-lg p-8 space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">📅 Data *</label>
                    <input
                      type="date"
                      name="data"
                      value={form.data}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">🕐 Ora *</label>
                    <div className="grid grid-cols-8 gap-1">
                      {getOre(form.data).map(h => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => setForm(prev => ({ ...prev, ora: h }))}
                          className={`py-1.5 rounded-md font-medium text-xs transition-all duration-200 ${
                            form.ora === h
                              ? 'bg-teal-500 text-white ring-1 ring-teal-300 scale-105'
                              : 'bg-gray-100 text-gray-600 hover:bg-teal-50 hover:text-teal-600'
                          }`}
                        >
                          {h}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    disabled={!form.data || !form.ora}
                    onClick={() => setCurrentStep(2)}
                    className="w-full py-3 bg-amber-800 hover:bg-amber-900 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold rounded-xl transition-all duration-300"
                  >
                    Continuă →
                  </button>
                </div>
              )}

              {/* ── PAS 2: Detalii personale ── */}
              {currentStep === 2 && (
                <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-lg p-8 space-y-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-1">Detaliile tale</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Nume complet *</label>
                      <input type="text" name="nume" value={form.nume} onChange={handleChange} required placeholder="Ion Popescu"
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="ion@email.com"
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Telefon *</label>
                      <input type="tel" name="telefon" value={form.telefon} onChange={handleChange} required placeholder="07xx xxx xxx"
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Număr persoane *</label>
                      <select name="persoane" value={form.persoane} onChange={handleChange}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition bg-white">
                        {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} {n === 1 ? 'persoană' : 'persoane'}</option>)}
                        <option value={15}>Grup 11-15</option>
                        <option value={20}>Grup 16-20</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Mesaj / Cerințe speciale</label>
                    <textarea name="mesaj" value={form.mesaj} onChange={handleChange} rows={2}
                      placeholder="Ex: aniversare, loc la fereastră, alergii..."
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition resize-none" />
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setCurrentStep(1)}
                      className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all">
                      ← Înapoi
                    </button>
                    <button type="button"
                      disabled={!form.nume || !form.email || !form.telefon}
                      onClick={() => setCurrentStep(3)}
                      className="flex-1 py-3 bg-amber-800 hover:bg-amber-900 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold rounded-xl transition-all">
                      Continuă →
                    </button>
                  </div>
                </div>
              )}

              {/* ── PAS 3: Confirmare ── */}
              {currentStep === 3 && (
                <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-lg p-8 space-y-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Sumar rezervare</h2>
                  <div className="bg-gray-50 rounded-2xl p-5 space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">Data</span><span className="font-semibold capitalize">{formatData(form.data)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Ora</span><span className="font-semibold">{form.ora}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Persoane</span><span className="font-semibold">{form.persoane}</span></div>
                    <div className="border-t pt-3 flex justify-between"><span className="text-gray-500">Nume</span><span className="font-semibold">{form.nume}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Email</span><span className="font-semibold">{form.email}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Telefon</span><span className="font-semibold">{form.telefon}</span></div>
                    {form.mesaj && <div className="flex justify-between"><span className="text-gray-500">Mesaj</span><span className="font-semibold text-right max-w-[60%]">{form.mesaj}</span></div>}
                  </div>
                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setCurrentStep(2)}
                      className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all">
                      ← Înapoi
                    </button>
                    <button type="submit" disabled={loading}
                      className="flex-1 py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white font-bold rounded-xl transition-all">
                      {loading ? 'Se trimite...' : 'Confirmă ☕'}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 text-center">
                    <a href="/confidentialitate" className="underline hover:text-gray-600">Confidențialitate</a>
                  </p>
                </div>
              )}

            </form>
          )}

          {/* Info compactă jos */}
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span>👥 Până la 8 persoane per rezervare</span>
            <span>✅ Confirmare prin telefon sau email în 2 ore</span>
            <span>❌ Anulare gratuită cu cel puțin 2 ore înainte</span>
          </div>

        </div>
      </main>

      <FooterStarter />
    </>
  );
}
