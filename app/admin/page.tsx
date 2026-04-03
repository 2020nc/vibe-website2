'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useCallback } from 'react';
import { getSupabase } from '@/lib/supabase';
import * as XLSX from 'xlsx';

/* ─── TYPES ───────────────────────────────────────────────── */
type Status = 'în așteptare' | 'confirmat' | 'respins';

interface Rezervare {
  id: string;
  nume: string;
  email: string;
  telefon: string;
  data: string;
  ora: string;
  persoane: number;
  mesaj: string;
  status: Status;
  created_at: string;
}

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image_url: string | null;
  discount_type: 'percent' | 'value' | null;
  discount_amount: number | null;
  available: boolean;
  sort_order: number;
}

interface HolidayConfig {
  discount_type: 'percent' | 'value';
  discount_amount: number;
  label: string;
}

/* ─── EXPORT ──────────────────────────────────────────────── */
function exportExcel(items: MenuItem[]) {
  const rows = items.map((item) => ({
    'Nume':        item.name,
    'Categorie':   item.category,
    'Preț (RON)':  item.price,
    'Tip reducere': item.discount_type ?? '—',
    'Valoare reducere': item.discount_amount ?? '—',
    'Preț final (RON)': calcFinalPrice(item),
    'Disponibil':  item.available ? 'Da' : 'Nu',
    'Descriere':   item.description ?? '',
  }));
  const ws = XLSX.utils.json_to_sheet(rows);
  // Column widths
  ws['!cols'] = [20,14,12,14,18,16,12,40].map((w) => ({ wch: w }));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Meniu');
  XLSX.writeFile(wb, `meniu-vibe-caffe-${new Date().toISOString().slice(0,10)}.xlsx`);
}

async function exportPDF(items: MenuItem[]) {
  const { default: jsPDF } = await import('jspdf');
  const { default: autoTable } = await import('jspdf-autotable');

  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });

  // Load Arial with Romanian diacritics support
  const loadFont = async (url: string): Promise<string> => {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    const bytes = new Uint8Array(buf);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  };

  const [dejaVuB64, dejaVuBdB64] = await Promise.all([
    loadFont('/DejaVuSans.ttf'),
    loadFont('/DejaVuSans-Bold.ttf'),
  ]);

  doc.addFileToVFS('DejaVuSans.ttf', dejaVuB64);
  doc.addFont('DejaVuSans.ttf', 'DejaVu', 'normal');
  doc.addFileToVFS('DejaVuSans-Bold.ttf', dejaVuBdB64);
  doc.addFont('DejaVuSans-Bold.ttf', 'DejaVu', 'bold');
  doc.setFont('DejaVu');

  // Title
  doc.setFontSize(18);
  doc.setTextColor(40);
  doc.text('Meniu Vibe Caffe', 40, 40);
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(`Generat: ${new Date().toLocaleDateString('ro-RO')}`, 40, 58);

  autoTable(doc, {
    startY: 72,
    head: [['Produs', 'Categorie', 'Pret (RON)', 'Reducere', 'Pret final (RON)', 'Disponibil', 'Descriere']],
    body: items.map((item) => [
      item.name,
      item.category,
      item.price.toString(),
      item.discount_type
        ? (item.discount_type === 'percent' ? `-${item.discount_amount}%` : `-${item.discount_amount} RON`)
        : '-',
      calcFinalPrice(item).toString(),
      item.available ? 'Da' : 'Nu',
      item.description ?? '',
    ]),
    styles: { fontSize: 9, cellPadding: 5, font: 'DejaVu' },
    headStyles: { fillColor: [217, 119, 6], textColor: 255, fontStyle: 'bold', font: 'DejaVu' },
    alternateRowStyles: { fillColor: [254, 252, 232] },
    columnStyles: {
      0: { cellWidth: 110 },
      1: { cellWidth: 80 },
      2: { cellWidth: 70, halign: 'right' },
      3: { cellWidth: 75, halign: 'center' },
      4: { cellWidth: 80, halign: 'right' },
      5: { cellWidth: 65, halign: 'center' },
      6: { cellWidth: 'auto' },
    },
  });

  doc.save(`meniu-vibe-caffe-${new Date().toISOString().slice(0,10)}.pdf`);
}

function calcHolidayPrice(price: number, cfg: HolidayConfig): number {
  if (cfg.discount_type === 'percent')
    return Math.round((price - (price * cfg.discount_amount) / 100) * 100) / 100;
  return Math.round((price - cfg.discount_amount) * 100) / 100;
}

function exportHolidayExcel(items: MenuItem[], cfg: HolidayConfig) {
  const badge = cfg.discount_type === 'percent' ? `-${cfg.discount_amount}%` : `-${cfg.discount_amount} RON`;
  const rows = items.map((item) => ({
    'Nume':              item.name,
    'Categorie':         item.category,
    'Pret normal (RON)': item.price,
    'Reducere':          badge,
    'Pret sarbatoare (RON)': calcHolidayPrice(item.price, cfg),
    'Disponibil':        item.available ? 'Da' : 'Nu',
    'Descriere':         item.description ?? '',
  }));
  const ws = XLSX.utils.json_to_sheet(rows);
  ws['!cols'] = [22, 14, 16, 12, 20, 12, 40].map((w) => ({ wch: w }));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sarbatori');
  XLSX.writeFile(wb, `sarbatori-vibe-caffe-${new Date().toISOString().slice(0,10)}.xlsx`);
}

async function exportHolidayPDF(items: MenuItem[], cfg: HolidayConfig) {
  const { default: jsPDF } = await import('jspdf');
  const { default: autoTable } = await import('jspdf-autotable');

  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });

  const loadFont = async (url: string): Promise<string> => {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    const bytes = new Uint8Array(buf);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  };

  const [b64, bdB64] = await Promise.all([
    loadFont('/DejaVuSans.ttf'),
    loadFont('/DejaVuSans-Bold.ttf'),
  ]);
  doc.addFileToVFS('DejaVuSans.ttf', b64);
  doc.addFont('DejaVuSans.ttf', 'DejaVu', 'normal');
  doc.addFileToVFS('DejaVuSans-Bold.ttf', bdB64);
  doc.addFont('DejaVuSans-Bold.ttf', 'DejaVu', 'bold');
  doc.setFont('DejaVu');

  const badge = cfg.discount_type === 'percent' ? `-${cfg.discount_amount}%` : `-${cfg.discount_amount} RON`;

  doc.setFontSize(18);
  doc.setTextColor(40);
  doc.text(`Meniu Sarbatoare — ${cfg.label}`, 40, 40);
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(`Reducere: ${badge}   |   Generat: ${new Date().toLocaleDateString('ro-RO')}`, 40, 58);

  autoTable(doc, {
    startY: 72,
    head: [['Produs', 'Categorie', 'Pret normal', 'Reducere', 'Pret sarbatoare', 'Disponibil', 'Descriere']],
    body: items.map((item) => [
      item.name,
      item.category,
      `${item.price} RON`,
      badge,
      `${calcHolidayPrice(item.price, cfg)} RON`,
      item.available ? 'Da' : 'Nu',
      item.description ?? '',
    ]),
    styles: { fontSize: 9, cellPadding: 5, font: 'DejaVu' },
    headStyles: { fillColor: [225, 29, 72], textColor: 255, fontStyle: 'bold', font: 'DejaVu' },
    alternateRowStyles: { fillColor: [255, 241, 242] },
    columnStyles: {
      0: { cellWidth: 110 },
      1: { cellWidth: 80 },
      2: { cellWidth: 75, halign: 'right' },
      3: { cellWidth: 70, halign: 'center' },
      4: { cellWidth: 85, halign: 'right' },
      5: { cellWidth: 65, halign: 'center' },
      6: { cellWidth: 'auto' },
    },
  });

  doc.save(`sarbatori-vibe-caffe-${new Date().toISOString().slice(0,10)}.pdf`);
}

/* ─── EXPORT REZERVĂRI ────────────────────────────────────── */
const ZILE_RO = ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'];

function buildAnaliza(rezervari: Rezervare[]) {
  // Distribuție pe zi a săptămânii
  const perZi: Record<string, number> = {};
  ZILE_RO.forEach((z) => { perZi[z] = 0; });

  // Distribuție pe oră
  const perOra: Record<string, number> = {};

  rezervari.forEach((r) => {
    const zi = ZILE_RO[new Date(r.data).getDay()];
    perZi[zi] = (perZi[zi] ?? 0) + 1;
    const ora = r.ora?.slice(0, 5) ?? 'N/A';
    perOra[ora] = (perOra[ora] ?? 0) + 1;
  });

  const ziRows = ZILE_RO.map((z) => ({ 'Zi': z, 'Nr. rezervări': perZi[z] }));
  const oraRows = Object.entries(perOra)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([ora, nr]) => ({ 'Ora': ora, 'Nr. rezervări': nr }));

  return { ziRows, oraRows };
}

function exportRezervariExcel(rezervari: Rezervare[]) {
  const wb = XLSX.utils.book_new();

  // Foaia 1 — Date brute
  const brute = rezervari.map((r) => ({
    'Nume':      r.nume,
    'Email':     r.email,
    'Telefon':   r.telefon,
    'Data':      r.data,
    'Ora':       r.ora,
    'Persoane':  r.persoane,
    'Status':    r.status,
    'Mesaj':     r.mesaj ?? '',
    'Creat la':  new Date(r.created_at).toLocaleString('ro-RO'),
  }));
  const ws1 = XLSX.utils.json_to_sheet(brute);
  ws1['!cols'] = [20, 28, 14, 12, 8, 10, 14, 40, 20].map((w) => ({ wch: w }));
  XLSX.utils.book_append_sheet(wb, ws1, 'Rezervari');

  // Foaia 2 — Analiză
  const { ziRows, oraRows } = buildAnaliza(rezervari);
  const ws2 = XLSX.utils.book_new();

  // Titlu
  const wsA = XLSX.utils.aoa_to_sheet([
    ['ANALIZA REZERVARI — Vibe Caffe'],
    [`Generat: ${new Date().toLocaleDateString('ro-RO')}   |   Total: ${rezervari.length} rezervari`],
    [],
    ['Distribuție pe zi a săptămânii'],
  ]);
  XLSX.utils.sheet_add_json(wsA, ziRows, { origin: 'A5' });

  const offsetOra = 5 + ziRows.length + 2;
  XLSX.utils.sheet_add_aoa(wsA, [['Distribuție pe oră']], { origin: `A${offsetOra}` });
  XLSX.utils.sheet_add_json(wsA, oraRows, { origin: `A${offsetOra + 1}` });

  wsA['!cols'] = [{ wch: 20 }, { wch: 16 }];
  XLSX.utils.book_append_sheet(wb, wsA, 'Analiza');

  XLSX.writeFile(wb, `rezervari-vibe-caffe-${new Date().toISOString().slice(0, 10)}.xlsx`);
}

async function exportRezervariPDF(rezervari: Rezervare[]) {
  const { default: jsPDF } = await import('jspdf');
  const { default: autoTable } = await import('jspdf-autotable');

  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });

  const loadFont = async (url: string): Promise<string> => {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    const bytes = new Uint8Array(buf);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  };

  const [b64, bdB64] = await Promise.all([
    loadFont('/DejaVuSans.ttf'),
    loadFont('/DejaVuSans-Bold.ttf'),
  ]);
  doc.addFileToVFS('DejaVuSans.ttf', b64);
  doc.addFont('DejaVuSans.ttf', 'DejaVu', 'normal');
  doc.addFileToVFS('DejaVuSans-Bold.ttf', bdB64);
  doc.addFont('DejaVuSans-Bold.ttf', 'DejaVu', 'bold');
  doc.setFont('DejaVu');

  const teal: [number, number, number] = [20, 184, 166];
  const date = new Date().toLocaleDateString('ro-RO');

  // ── Pagina 1: Lista rezervări ──
  doc.setFontSize(18); doc.setTextColor(40);
  doc.text('Rezervari Vibe Caffe', 40, 40);
  doc.setFontSize(10); doc.setTextColor(120);
  doc.text(`Generat: ${date}   |   Total: ${rezervari.length} rezervari`, 40, 58);

  autoTable(doc, {
    startY: 72,
    head: [['Nume', 'Data', 'Ora', 'Persoane', 'Status', 'Telefon', 'Email', 'Mesaj']],
    body: rezervari.map((r) => [
      r.nume,
      r.data,
      r.ora?.slice(0, 5) ?? '',
      r.persoane.toString(),
      r.status,
      r.telefon,
      r.email,
      r.mesaj ?? '',
    ]),
    styles: { fontSize: 8, cellPadding: 4, font: 'DejaVu' },
    headStyles: { fillColor: teal, textColor: 255, fontStyle: 'bold', font: 'DejaVu' },
    alternateRowStyles: { fillColor: [240, 253, 250] },
    columnStyles: {
      0: { cellWidth: 90 },
      1: { cellWidth: 65 },
      2: { cellWidth: 40, halign: 'center' },
      3: { cellWidth: 55, halign: 'center' },
      4: { cellWidth: 75, halign: 'center' },
      5: { cellWidth: 80 },
      6: { cellWidth: 110 },
      7: { cellWidth: 'auto' },
    },
  });

  // ── Pagina 2: Analiză ──
  doc.addPage();
  doc.setFontSize(18); doc.setTextColor(40);
  doc.text('Analiza Rezervari', 40, 40);
  doc.setFontSize(10); doc.setTextColor(120);
  doc.text(`Generat: ${date}`, 40, 58);

  const { ziRows, oraRows } = buildAnaliza(rezervari);

  doc.setFontSize(13); doc.setTextColor(40); doc.setFont('DejaVu', 'bold');
  doc.text('Distributie pe zi a saptamanii', 40, 85);
  doc.setFont('DejaVu', 'normal');

  autoTable(doc, {
    startY: 95,
    head: [['Zi', 'Nr. rezervari']],
    body: ziRows.map((r) => [r['Zi'], r['Nr. rezervări'].toString()]),
    styles: { fontSize: 10, cellPadding: 5, font: 'DejaVu' },
    headStyles: { fillColor: teal, textColor: 255, fontStyle: 'bold', font: 'DejaVu' },
    alternateRowStyles: { fillColor: [240, 253, 250] },
    columnStyles: { 0: { cellWidth: 150 }, 1: { cellWidth: 100, halign: 'center' } },
    tableWidth: 280,
  });

  const y2 = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 30;
  doc.setFontSize(13); doc.setTextColor(40); doc.setFont('DejaVu', 'bold');
  doc.text('Distributie pe ora', 40, y2);
  doc.setFont('DejaVu', 'normal');

  autoTable(doc, {
    startY: y2 + 10,
    head: [['Ora', 'Nr. rezervari']],
    body: oraRows.map((r) => [r['Ora'], r['Nr. rezervări'].toString()]),
    styles: { fontSize: 10, cellPadding: 5, font: 'DejaVu' },
    headStyles: { fillColor: teal, textColor: 255, fontStyle: 'bold', font: 'DejaVu' },
    alternateRowStyles: { fillColor: [240, 253, 250] },
    columnStyles: { 0: { cellWidth: 100, halign: 'center' }, 1: { cellWidth: 100, halign: 'center' } },
    tableWidth: 230,
  });

  doc.save(`rezervari-vibe-caffe-${new Date().toISOString().slice(0, 10)}.pdf`);
}

/* ─── HELPERS ─────────────────────────────────────────────── */
function calcFinalPrice(item: MenuItem): number {
  if (!item.discount_type || !item.discount_amount) return item.price;
  if (item.discount_type === 'percent')
    return Math.round((item.price - (item.price * item.discount_amount) / 100) * 100) / 100;
  return Math.round((item.price - item.discount_amount) * 100) / 100;
}

const STATUS_CONFIG: Record<Status, { label: string; bg: string; text: string }> = {
  'în așteptare': { label: 'În așteptare', bg: 'bg-yellow-100', text: 'text-yellow-700' },
  'confirmat':    { label: 'Confirmat',    bg: 'bg-teal-100',   text: 'text-teal-700'   },
  'respins':      { label: 'Respins',      bg: 'bg-red-100',    text: 'text-red-700'    },
};
const FILTRE = ['toate', 'în așteptare', 'confirmat', 'respins'] as const;

/* ─── WIZARD MODAL ────────────────────────────────────────── */
const EMPTY_ITEM: Omit<MenuItem, 'id' | 'sort_order'> = {
  name: '', category: '', price: 0, description: '',
  image_url: '', discount_type: null, discount_amount: null, available: true,
};

function WizardModal({
  initial,
  onSave,
  onClose,
}: {
  initial?: MenuItem;
  onSave: (data: Omit<MenuItem, 'id' | 'sort_order'>) => Promise<void>;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Omit<MenuItem, 'id' | 'sort_order'>>(
    initial
      ? { name: initial.name, category: initial.category, price: initial.price,
          description: initial.description, image_url: initial.image_url,
          discount_type: initial.discount_type, discount_amount: initial.discount_amount,
          available: initial.available }
      : { ...EMPTY_ITEM }
  );
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const set = (k: keyof typeof form, v: unknown) => setForm((p) => ({ ...p, [k]: v }));

  const handleSave = async () => {
    setSaving(true); setErr('');
    try { await onSave(form); }
    catch (e: unknown) { setErr(e instanceof Error ? e.message : 'Eroare'); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="flex justify-between items-center px-6 pt-6 pb-4 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-gray-900 text-lg">
              {initial ? 'Editează produs' : 'Produs nou'}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">Pasul {step} din 3</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>

        {/* Steps indicator */}
        <div className="flex px-6 pt-4 gap-2">
          {[1,2,3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1.5 rounded-full transition-colors ${
                s <= step ? 'bg-amber-500' : 'bg-gray-100'
              }`}
            />
          ))}
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Categorie *</label>
                <input
                  value={form.category}
                  onChange={(e) => set('category', e.target.value)}
                  placeholder="ex: Espresso, Specialty, Patiserie…"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nume produs *</label>
                <input
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  placeholder="ex: Cappuccino"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Preț (RON) *</label>
                <input
                  type="number"
                  min={0}
                  step={0.5}
                  value={form.price}
                  onChange={(e) => set('price', parseFloat(e.target.value) || 0)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Descriere</label>
                <textarea
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  rows={3}
                  placeholder="Scurtă descriere a produsului…"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Disponibil</label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => set('available', !form.available)}
                    className={`w-11 h-6 rounded-full transition-colors ${form.available ? 'bg-teal-500' : 'bg-gray-200'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow m-0.5 transition-transform ${form.available ? 'translate-x-5' : 'translate-x-0'}`} />
                  </div>
                  <span className="text-sm text-gray-600">{form.available ? 'Da' : 'Nu'}</span>
                </label>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">URL imagine</label>
                <div className="flex gap-2">
                  <input
                    value={form.image_url ?? ''}
                    onChange={(e) => set('image_url', e.target.value)}
                    placeholder="https://images.unsplash.com/…"
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <a
                    href={`https://unsplash.com/s/photos/${encodeURIComponent(form.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap"
                  >
                    Unsplash
                  </a>
                </div>
                {form.image_url && (
                  <div className="mt-3 rounded-xl overflow-hidden" style={{ aspectRatio: '4/3', maxHeight: 160 }}>
                    <img
                      src={form.image_url}
                      alt="preview"
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3'; }}
                    />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Tip reducere</label>
                  <select
                    value={form.discount_type ?? ''}
                    onChange={(e) => set('discount_type', e.target.value || null)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="">Fără</option>
                    <option value="percent">Procent (%)</option>
                    <option value="value">Valoare (RON)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Valoare reducere</label>
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    disabled={!form.discount_type}
                    value={form.discount_amount ?? ''}
                    onChange={(e) => set('discount_amount', parseFloat(e.target.value) || null)}
                    placeholder="0"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-40"
                  />
                </div>
              </div>
              {form.discount_type && form.discount_amount && (
                <p className="text-xs text-amber-600 font-semibold">
                  Preț final: {calcFinalPrice(form as MenuItem)} RON
                  {' '}(în loc de {form.price} RON)
                </p>
              )}
            </>
          )}

          {err && <p className="text-sm text-red-600">{err}</p>}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center px-6 pb-6 pt-2">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : onClose()}
            className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
          >
            {step > 1 ? '← Înapoi' : 'Anulează'}
          </button>
          {step < 3 ? (
            <button
              onClick={() => {
                if (step === 1 && (!form.name.trim() || !form.category.trim())) {
                  setErr('Categoria și numele sunt obligatorii.'); return;
                }
                if (step === 2 && form.price <= 0) {
                  setErr('Prețul trebuie să fie pozitiv.'); return;
                }
                setErr(''); setStep(step + 1);
              }}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-xl transition-all"
            >
              Continuă →
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-all"
            >
              {saving ? 'Se salvează…' : initial ? 'Salvează' : 'Adaugă produs'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── BULK DISCOUNT MODAL ─────────────────────────────────── */
function BulkDiscountModal({
  count,
  onApply,
  onClose,
}: {
  count: number;
  onApply: (discountType: string | null, discountAmount: number | null) => Promise<void>;
  onClose: () => void;
}) {
  const [type, setType] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [saving, setSaving] = useState(false);

  const handleApply = async () => {
    setSaving(true);
    await onApply(type || null, type && amount ? parseFloat(amount) : null);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <h2 className="font-bold text-gray-900 text-lg mb-1">Reducere în bloc</h2>
        <p className="text-sm text-gray-500 mb-5">{count} produse selectate</p>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Tip reducere</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="">Elimină reducerea</option>
              <option value="percent">Procent (%)</option>
              <option value="value">Valoare (RON)</option>
            </select>
          </div>
          {type && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Valoare</label>
              <input
                type="number" min={0} step={0.5}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          )}
        </div>
        <div className="flex justify-between mt-6">
          <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700">Anulează</button>
          <button
            onClick={handleApply}
            disabled={saving}
            className="px-5 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-sm font-semibold rounded-xl"
          >
            {saving ? '…' : 'Aplică'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ───────────────────────────────────────────── */
export default function AdminPage() {
  const [tab, setTab] = useState<'rezervari' | 'meniu' | 'sarbatori'>('rezervari');

  /* REZERVĂRI */
  const [rezervari, setRezervari] = useState<Rezervare[]>([]);
  const [loadingRez, setLoadingRez] = useState(true);
  const [filtru, setFiltru] = useState<typeof FILTRE[number]>('toate');
  const [cautare, setCautare] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [eroareRez, setEroareRez] = useState('');
  const [selectedRez, setSelectedRez] = useState<Set<string>>(new Set());
  const [bulkLoading, setBulkLoading] = useState(false);

  /* MENIU */
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loadingMenu, setLoadingMenu] = useState(false);
  const [catFilter, setCatFilter] = useState('toate');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [eroareMenu, setEroareMenu] = useState('');
  const [showWizard, setShowWizard] = useState(false);
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [showBulkDiscount, setShowBulkDiscount] = useState(false);

  /* SĂRBĂTORI */
  const [holidayCfg, setHolidayCfg] = useState<HolidayConfig>({ discount_type: 'value', discount_amount: 5, label: '1 Decembrie — Ziua Nationala' });
  const [holidayItems, setHolidayItems] = useState<MenuItem[]>([]);
  const [loadingHoliday, setLoadingHoliday] = useState(false);
  const [savingHoliday, setSavingHoliday] = useState(false);
  const [holidayMsg, setHolidayMsg] = useState('');
  const [holidayCatFilter, setHolidayCatFilter] = useState('toate');
  const [selectedH, setSelectedH] = useState<Set<string>>(new Set());
  const [showBulkH, setShowBulkH] = useState(false);

  /* PROMO BANNER */
  const [promoCfg, setPromoCfg] = useState<{
    enabled: boolean;
    min_order: number;
    discount_type: 'percent' | 'value';
    discount_amount: number;
    message: string;
  }>({ enabled: false, min_order: 50, discount_type: 'percent', discount_amount: 10, message: '' });
  const [savingPromo, setSavingPromo] = useState(false);
  const [promoMsg, setPromoMsg] = useState('');

  /* ── fetch rezervări ── */
  const fetchRezervari = useCallback(async () => {
    setLoadingRez(true);
    const { data, error } = await getSupabase()
      .from('rezervari')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setRezervari(data as Rezervare[]);
    setLoadingRez(false);
  }, []);

  /* ── fetch meniu ── */
  const fetchMenu = useCallback(async () => {
    setLoadingMenu(true);
    const res = await fetch('/api/menu');
    const { data } = await res.json();
    setItems(data as MenuItem[]);
    setLoadingMenu(false);
  }, []);

  /* ── fetch sărbători ── */
  const fetchHoliday = useCallback(async () => {
    setLoadingHoliday(true);
    const [menuRes, holidayRes, promoRes] = await Promise.all([
      fetch('/api/menu').then((r) => r.json()),
      fetch('/api/holiday').then((r) => r.json()),
      fetch('/api/promo').then((r) => r.json()).catch(() => ({ data: null })),
    ]);
    setHolidayItems((menuRes.data as MenuItem[]).filter((i) => i.available));
    if (holidayRes.data) setHolidayCfg(holidayRes.data as HolidayConfig);
    if (promoRes.data) setPromoCfg(promoRes.data);
    setLoadingHoliday(false);
  }, []);

  /* ── save promo config ── */
  const savePromoConfig = async () => {
    setSavingPromo(true); setPromoMsg('');
    const res = await fetch('/api/promo', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(promoCfg),
    });
    setPromoMsg(res.ok ? 'Salvat cu succes!' : 'Eroare la salvare.');
    setSavingPromo(false);
    setTimeout(() => setPromoMsg(''), 3000);
  };

  useEffect(() => { fetchRezervari(); }, [fetchRezervari]);
  useEffect(() => { if (tab === 'meniu') fetchMenu(); }, [tab, fetchMenu]);
  useEffect(() => { if (tab === 'sarbatori') fetchHoliday(); }, [tab, fetchHoliday]);

  /* ── rezervări actions ── */
  const updateStatus = async (id: string, status: Status) => {
    setActionLoading(id + status); setEroareRez('');
    const res = await fetch('/api/rezervari', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) { const { error } = await res.json(); setEroareRez(error ?? 'Eroare'); }
    else { await fetchRezervari(); }
    setActionLoading(null);
  };

  const stergeRezervare = async (id: string, nume: string) => {
    if (!window.confirm(`Ștergi rezervarea lui ${nume}?`)) return;
    setActionLoading(id + 'delete'); setEroareRez('');
    const res = await fetch('/api/rezervari', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) { const { error } = await res.json(); setEroareRez(error ?? 'Eroare'); }
    else { await fetchRezervari(); }
    setActionLoading(null);
  };

  /* ── bulk rezervări ── */
  const toggleSelectRez = (id: string) => {
    setSelectedRez((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const bulkUpdateStatus = async (status: Status) => {
    if (selectedRez.size === 0) return;
    setBulkLoading(true); setEroareRez('');
    const ids = Array.from(selectedRez);
    await Promise.all(
      ids.map((id) =>
        fetch('/api/rezervari', {
          method: 'PATCH', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, status }),
        })
      )
    );
    setSelectedRez(new Set());
    await fetchRezervari();
    setBulkLoading(false);
  };

  const bulkSterge = async () => {
    if (selectedRez.size === 0) return;
    if (!window.confirm(`Ștergi ${selectedRez.size} rezervări selectate?`)) return;
    setBulkLoading(true); setEroareRez('');
    const ids = Array.from(selectedRez);
    await Promise.all(
      ids.map((id) =>
        fetch('/api/rezervari', {
          method: 'DELETE', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        })
      )
    );
    setSelectedRez(new Set());
    await fetchRezervari();
    setBulkLoading(false);
  };

  /* ── meniu actions ── */
  const toggleAvailable = async (item: MenuItem) => {
    setEroareMenu('');
    const res = await fetch('/api/menu', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id, available: !item.available }),
    });
    if (!res.ok) { const { error } = await res.json(); setEroareMenu(error ?? 'Eroare'); }
    else { await fetchMenu(); }
  };

  const stergeItem = async (item: MenuItem) => {
    if (!window.confirm(`Ștergi produsul "${item.name}"?`)) return;
    const res = await fetch('/api/menu', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id }),
    });
    if (!res.ok) { const { error } = await res.json(); setEroareMenu(error ?? 'Eroare'); }
    else { setSelected((s) => { const n = new Set(s); n.delete(item.id); return n; }); await fetchMenu(); }
  };

  const saveItem = async (data: Omit<MenuItem, 'id' | 'sort_order'>) => {
    const method = editItem ? 'PATCH' : 'POST';
    const body = editItem ? { id: editItem.id, ...data } : data;
    const res = await fetch('/api/menu', {
      method, headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) { const { error } = await res.json(); throw new Error(error); }
    setShowWizard(false); setEditItem(null); await fetchMenu();
  };

  const applyBulkDiscount = async (discountType: string | null, discountAmount: number | null) => {
    const res = await fetch('/api/menu/bulk', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ids: Array.from(selected),
        update: { discount_type: discountType, discount_amount: discountAmount },
      }),
    });
    if (!res.ok) { const { error } = await res.json(); setEroareMenu(error ?? 'Eroare bulk'); }
    setShowBulkDiscount(false); setSelected(new Set()); await fetchMenu();
  };

  const toggleAvailableBulk = async () => {
    const res = await fetch('/api/menu/bulk', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: Array.from(selected), update: { available: false } }),
    });
    if (!res.ok) { const { error } = await res.json(); setEroareMenu(error ?? 'Eroare bulk'); }
    setSelected(new Set()); await fetchMenu();
  };

  /* ── salvare config sărbători ── */
  const saveHolidayConfig = async () => {
    setSavingHoliday(true); setHolidayMsg('');
    const res = await fetch('/api/holiday', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(holidayCfg),
    });
    if (res.ok) { setHolidayMsg('Salvat cu succes!'); setTimeout(() => setHolidayMsg(''), 3000); }
    else { const { error } = await res.json(); setHolidayMsg(error ?? 'Eroare la salvare.'); }
    setSavingHoliday(false);
  };

  /* ── derive ── */
  const rezervariFiltrate = rezervari.filter((r) => {
    return (filtru === 'toate' || r.status === filtru) &&
           r.nume.toLowerCase().includes(cautare.toLowerCase());
  });
  const numarPeStatus = (s: typeof FILTRE[number]) =>
    s === 'toate' ? rezervari.length : rezervari.filter((r) => r.status === s).length;

  const categories = ['toate', ...new Set(items.map((i) => i.category))];
  const filteredItems = catFilter === 'toate' ? items : items.filter((i) => i.category === catFilter);

  const allVisibleSelected = filteredItems.length > 0 && filteredItems.every((i) => selected.has(i.id));
  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      setSelected((s) => { const n = new Set(s); filteredItems.forEach((i) => n.delete(i.id)); return n; });
    } else {
      setSelected((s) => { const n = new Set(s); filteredItems.forEach((i) => n.add(i.id)); return n; });
    }
  };

  const allRezVisible = rezervariFiltrate.length > 0 && rezervariFiltrate.every((r) => selectedRez.has(r.id));
  const toggleSelectAllRez = () => {
    if (allRezVisible) {
      setSelectedRez((prev) => { const n = new Set(prev); rezervariFiltrate.forEach((r) => n.delete(r.id)); return n; });
    } else {
      setSelectedRez((prev) => { const n = new Set(prev); rezervariFiltrate.forEach((r) => n.add(r.id)); return n; });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-teal-500">Vibe Caffè</span>
            <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full">Admin</span>
          </div>
          <a href="/" className="text-gray-600 hover:text-teal-500 transition-colors text-sm">← Site public</a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-28 pb-16">
        {/* ── Tabs ── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(['rezervari', 'meniu', 'sarbatori'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${
                tab === t
                  ? t === 'sarbatori'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'bg-teal-500 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-teal-300 hover:text-teal-600'
              }`}
            >
              {t === 'rezervari' ? 'Rezervări' : t === 'meniu' ? 'Meniu' : '🎉 Sărbători'}
            </button>
          ))}
        </div>

        {/* ════════════════════ TAB REZERVĂRI ════════════════════ */}
        {tab === 'rezervari' && (
          <>
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Dashboard Rezervări</h1>
                <p className="text-gray-500 mt-1">{rezervari.length} rezervări în total</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => exportRezervariExcel(rezervari)}
                  disabled={rezervari.length === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  </svg>
                  Export Excel
                </button>
                <button
                  onClick={() => exportRezervariPDF(rezervari)}
                  disabled={rezervari.length === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  </svg>
                  Export PDF
                </button>
              </div>
            </div>

            {eroareRez && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">{eroareRez}</div>
            )}

            {/* Căutare + Filtre */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1 max-w-sm">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                <input
                  type="text" placeholder="Caută după nume…"
                  value={cautare} onChange={(e) => setCautare(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white text-sm"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {FILTRE.map((f) => (
                  <button key={f} onClick={() => setFiltru(f)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      filtru === f ? 'bg-teal-500 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:border-teal-300 hover:text-teal-600'
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                    <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${filtru === f ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {numarPeStatus(f)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {loadingRez && <div className="text-center py-20 text-gray-400">Se încarcă rezervările...</div>}
            {!loadingRez && rezervariFiltrate.length === 0 && (
              <div className="text-center py-20 text-gray-400"><div className="text-5xl mb-4">☕</div><p>Nicio rezervare găsită.</p></div>
            )}

            {/* Bara acțiuni bulk — apare doar când există selecție */}
            {selectedRez.size > 0 && (
              <div className="mb-4 flex flex-wrap items-center gap-3 p-4 bg-teal-50 border border-teal-200 rounded-2xl">
                <span className="text-sm font-semibold text-teal-700">
                  {selectedRez.size} selectate
                </span>
                <div className="flex flex-wrap gap-2 ml-auto">
                  <button
                    onClick={() => bulkUpdateStatus('confirmat')}
                    disabled={bulkLoading}
                    className="px-4 py-2 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white text-xs font-semibold rounded-xl transition-colors"
                  >
                    {bulkLoading ? '…' : 'Confirmă toate'}
                  </button>
                  <button
                    onClick={() => bulkUpdateStatus('respins')}
                    disabled={bulkLoading}
                    className="px-4 py-2 bg-orange-100 hover:bg-orange-200 disabled:opacity-50 text-orange-700 text-xs font-semibold rounded-xl transition-colors"
                  >
                    {bulkLoading ? '…' : 'Respinge toate'}
                  </button>
                  <button
                    onClick={bulkSterge}
                    disabled={bulkLoading}
                    className="px-4 py-2 bg-red-100 hover:bg-red-200 disabled:opacity-50 text-red-700 text-xs font-semibold rounded-xl transition-colors"
                  >
                    {bulkLoading ? '…' : 'Șterge toate'}
                  </button>
                  <button
                    onClick={() => setSelectedRez(new Set())}
                    className="px-3 py-2 text-gray-400 hover:text-gray-600 text-xs rounded-xl transition-colors"
                  >
                    Anulează
                  </button>
                </div>
              </div>
            )}

            {!loadingRez && rezervariFiltrate.length > 0 && (
              <div className="hidden md:block bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/80">
                      <th className="px-5 py-3 w-10">
                        <input
                          type="checkbox"
                          checked={allRezVisible}
                          onChange={toggleSelectAllRez}
                          className="w-4 h-4 accent-teal-500 rounded cursor-pointer"
                        />
                      </th>
                      {['Client','Contact','Data / Ora','Persoane','Status','Acțiuni'].map((h, i) => (
                        <th key={h} className={`px-5 py-3 text-gray-500 font-semibold ${i === 5 ? 'text-right' : 'text-left'}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {rezervariFiltrate.map((r) => {
                      const cfg = STATUS_CONFIG[r.status] ?? STATUS_CONFIG['în așteptare'];
                      const isChecked = selectedRez.has(r.id);
                      return (
                        <tr key={r.id} className={`transition-colors ${isChecked ? 'bg-teal-50/60' : 'hover:bg-teal-50/30'}`}>
                          <td className="px-5 py-4 w-10">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleSelectRez(r.id)}
                              className="w-4 h-4 accent-teal-500 rounded cursor-pointer"
                            />
                          </td>
                          <td className="px-5 py-4">
                            <p className="font-semibold text-gray-900">{r.nume}</p>
                            {r.mesaj && <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[180px]">{r.mesaj}</p>}
                          </td>
                          <td className="px-5 py-4 text-gray-600"><p>{r.email}</p><p className="text-gray-400">{r.telefon}</p></td>
                          <td className="px-5 py-4 text-gray-700"><p className="font-medium">{r.data}</p><p className="text-gray-400">{r.ora}</p></td>
                          <td className="px-5 py-4 text-gray-700">{r.persoane}</td>
                          <td className="px-5 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>{cfg.label}</span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex gap-2 justify-end">
                              {r.status !== 'confirmat' && (
                                <button onClick={() => updateStatus(r.id, 'confirmat')} disabled={!!actionLoading}
                                  className="px-3 py-1.5 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-all">
                                  {actionLoading === r.id + 'confirmat' ? '…' : 'Confirmă'}
                                </button>
                              )}
                              {r.status !== 'respins' && (
                                <button onClick={() => updateStatus(r.id, 'respins')} disabled={!!actionLoading}
                                  className="px-3 py-1.5 bg-orange-100 hover:bg-orange-200 disabled:opacity-50 text-orange-700 text-xs font-semibold rounded-lg transition-all">
                                  {actionLoading === r.id + 'respins' ? '…' : 'Respinge'}
                                </button>
                              )}
                              <button onClick={() => stergeRezervare(r.id, r.nume)} disabled={!!actionLoading}
                                className="px-3 py-1.5 bg-red-100 hover:bg-red-200 disabled:opacity-50 text-red-700 text-xs font-semibold rounded-lg transition-all">
                                {actionLoading === r.id + 'delete' ? '…' : 'Șterge'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* CARDURI mobil */}
            {!loadingRez && rezervariFiltrate.length > 0 && (
              <div className="md:hidden space-y-4">
                {rezervariFiltrate.map((r) => {
                  const cfg = STATUS_CONFIG[r.status] ?? STATUS_CONFIG['în așteptare'];
                  return (
                    <div key={r.id} className={`backdrop-blur-sm rounded-2xl shadow-sm border p-5 transition-colors ${selectedRez.has(r.id) ? 'bg-teal-50 border-teal-200' : 'bg-white/80 border-gray-100'}`}>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedRez.has(r.id)}
                            onChange={() => toggleSelectRez(r.id)}
                            className="w-4 h-4 accent-teal-500 rounded cursor-pointer"
                          />
                          <div>
                            <p className="font-bold text-gray-900">{r.nume}</p>
                            <p className="text-xs text-gray-400">{r.email}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>{cfg.label}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                        <div><span className="text-gray-400 text-xs block">Data</span>{r.data}</div>
                        <div><span className="text-gray-400 text-xs block">Ora</span>{r.ora}</div>
                        <div><span className="text-gray-400 text-xs block">Persoane</span>{r.persoane}</div>
                        <div><span className="text-gray-400 text-xs block">Telefon</span>{r.telefon}</div>
                      </div>
                      {r.mesaj && <p className="text-xs text-gray-400 italic mb-4">"{r.mesaj}"</p>}
                      <div className="flex gap-2 flex-wrap">
                        {r.status !== 'confirmat' && (
                          <button onClick={() => updateStatus(r.id, 'confirmat')} disabled={!!actionLoading}
                            className="flex-1 py-2 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white text-sm font-semibold rounded-xl">
                            Confirmă
                          </button>
                        )}
                        {r.status !== 'respins' && (
                          <button onClick={() => updateStatus(r.id, 'respins')} disabled={!!actionLoading}
                            className="flex-1 py-2 bg-orange-100 hover:bg-orange-200 disabled:opacity-50 text-orange-700 text-sm font-semibold rounded-xl">
                            Respinge
                          </button>
                        )}
                        <button onClick={() => stergeRezervare(r.id, r.nume)} disabled={!!actionLoading}
                          className="py-2 px-4 bg-red-100 hover:bg-red-200 disabled:opacity-50 text-red-700 text-sm font-semibold rounded-xl">
                          Șterge
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* ════════════════════ TAB MENIU ════════════════════ */}
        {tab === 'meniu' && (
          <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Meniu</h1>
                <p className="text-gray-500 mt-1">{items.length} produse în total</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => exportExcel(filteredItems)}
                  className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm rounded-xl transition-all shadow-sm"
                >
                  Excel
                </button>
                <button
                  onClick={() => exportPDF(filteredItems)}
                  className="px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold text-sm rounded-xl transition-all shadow-sm"
                >
                  PDF
                </button>
                <button
                  onClick={() => { setEditItem(null); setShowWizard(true); }}
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl transition-all shadow-sm"
                >
                  + Produs nou
                </button>
              </div>
            </div>

            {eroareMenu && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">{eroareMenu}</div>
            )}

            {/* Filtre categorii */}
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((cat) => (
                <button key={cat} onClick={() => { setCatFilter(cat); setSelected(new Set()); }}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                    catFilter === cat
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-300 hover:text-amber-700'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  {cat !== 'toate' && (
                    <span className="ml-1.5 text-xs opacity-70">
                      {items.filter((i) => i.category === cat).length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Bulk actions bar */}
            {selected.size > 0 && (
              <div className="flex items-center gap-3 mb-4 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-sm">
                <span className="font-semibold text-amber-800">{selected.size} selectate</span>
                <button onClick={() => setShowBulkDiscount(true)}
                  className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-all">
                  Setează reducere
                </button>
                <button onClick={toggleAvailableBulk}
                  className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-all">
                  Dezactivează
                </button>
                <button onClick={() => setSelected(new Set())}
                  className="ml-auto text-gray-400 hover:text-gray-600 text-xs">
                  Deselectează
                </button>
              </div>
            )}

            {loadingMenu && (
              <div className="text-center py-20 text-gray-400">
                <div className="inline-block w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mb-3" />
                <p>Se încarcă meniul…</p>
              </div>
            )}

            {!loadingMenu && filteredItems.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <div className="text-5xl mb-4">🍽</div>
                <p>Niciun produs găsit.</p>
              </div>
            )}

            {/* Tabel produse */}
            {!loadingMenu && filteredItems.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/80">
                      <th className="px-4 py-3 text-center">
                        <input type="checkbox" checked={allVisibleSelected} onChange={toggleSelectAll}
                          className="w-4 h-4 accent-amber-600 cursor-pointer" />
                      </th>
                      <th className="px-4 py-3 text-left text-gray-500 font-semibold">Imagine</th>
                      <th className="px-4 py-3 text-left text-gray-500 font-semibold">Produs</th>
                      <th className="px-4 py-3 text-left text-gray-500 font-semibold">Categorie</th>
                      <th className="px-4 py-3 text-left text-gray-500 font-semibold">Preț</th>
                      <th className="px-4 py-3 text-left text-gray-500 font-semibold">Reducere</th>
                      <th className="px-4 py-3 text-center text-gray-500 font-semibold">Disponibil</th>
                      <th className="px-4 py-3 text-right text-gray-500 font-semibold">Acțiuni</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredItems.map((item) => {
                      const finalPrice = calcFinalPrice(item);
                      const hasDiscount = !!item.discount_type && !!item.discount_amount;
                      const isSelected = selected.has(item.id);
                      return (
                        <tr key={item.id}
                          className={`transition-colors ${isSelected ? 'bg-amber-50/60' : 'hover:bg-gray-50/60'}`}
                        >
                          <td className="px-4 py-3 text-center">
                            <input type="checkbox" checked={isSelected}
                              onChange={() => setSelected((s) => {
                                const n = new Set(s);
                                isSelected ? n.delete(item.id) : n.add(item.id);
                                return n;
                              })}
                              className="w-4 h-4 accent-amber-600 cursor-pointer"
                            />
                          </td>
                          <td className="px-4 py-3">
                            {item.image_url ? (
                              <img src={item.image_url} alt={item.name}
                                className="w-12 h-12 object-cover rounded-lg"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                              />
                            ) : (
                              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 text-lg">☕</div>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <p className="font-semibold text-gray-900">{item.name}</p>
                            {item.description && <p className="text-xs text-gray-400 truncate max-w-[200px]">{item.description}</p>}
                          </td>
                          <td className="px-4 py-3 text-gray-600">{item.category}</td>
                          <td className="px-4 py-3">
                            {hasDiscount ? (
                              <>
                                <span className="text-gray-400 line-through text-xs block">{item.price} RON</span>
                                <span className="text-red-500 font-bold">{finalPrice} RON</span>
                              </>
                            ) : (
                              <span className="text-amber-600 font-bold">{item.price} RON</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {hasDiscount ? (
                              <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full">
                                {item.discount_type === 'percent' ? `-${item.discount_amount}%` : `-${item.discount_amount} RON`}
                              </span>
                            ) : (
                              <span className="text-gray-300 text-xs">—</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button onClick={() => toggleAvailable(item)}
                              className={`w-10 h-5 rounded-full transition-colors ${item.available ? 'bg-teal-500' : 'bg-gray-200'}`}
                            >
                              <div className={`w-4 h-4 bg-white rounded-full shadow mx-0.5 transition-transform ${item.available ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() => { setEditItem(item); setShowWizard(true); }}
                                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-all"
                              >
                                Editează
                              </button>
                              <button
                                onClick={() => stergeItem(item)}
                                className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-semibold rounded-lg transition-all"
                              >
                                Șterge
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
        {/* ════════════════════ TAB SĂRBĂTORI ════════════════════ */}
        {tab === 'sarbatori' && (() => {
          const hVisible = holidayCatFilter === 'toate'
            ? holidayItems
            : holidayItems.filter((i) => i.category === holidayCatFilter);
          const hAllSel = hVisible.length > 0 && hVisible.every((i) => selectedH.has(i.id));
          const toggleAllH = () => {
            if (hAllSel) setSelectedH((s) => { const n = new Set(s); hVisible.forEach((i) => n.delete(i.id)); return n; });
            else setSelectedH((s) => { const n = new Set(s); hVisible.forEach((i) => n.add(i.id)); return n; });
          };
          return (
            <>
              {/* ── Titlu + Produs nou ── */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Meniu Sărbători</h1>
                  <p className="text-gray-500 mt-1">Configurează reducerea globală și gestionează produsele</p>
                </div>
                <button
                  onClick={() => { setEditItem(null); setShowWizard(true); }}
                  className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm rounded-xl transition-all shadow-sm"
                >
                  + Produs nou
                </button>
              </div>

              {/* ── Editor configurație ── */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
                <h2 className="font-bold text-gray-800 text-base mb-4">Configurație reducere globală</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Etichetă sărbătoare</label>
                    <input
                      value={holidayCfg.label}
                      onChange={(e) => setHolidayCfg((c) => ({ ...c, label: e.target.value }))}
                      placeholder="ex: 1 Decembrie — Ziua Națională"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tip reducere</label>
                    <select
                      value={holidayCfg.discount_type}
                      onChange={(e) => setHolidayCfg((c) => ({ ...c, discount_type: e.target.value as 'percent' | 'value' }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                    >
                      <option value="value">Valoare fixă (RON)</option>
                      <option value="percent">Procent (%)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Valoare {holidayCfg.discount_type === 'percent' ? '(%)' : '(RON)'}
                    </label>
                    <input
                      type="number" min={0} step={0.5}
                      value={holidayCfg.discount_amount}
                      onChange={(e) => setHolidayCfg((c) => ({ ...c, discount_amount: parseFloat(e.target.value) || 0 }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={saveHolidayConfig}
                    disabled={savingHoliday}
                    className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-semibold text-sm rounded-xl transition-all"
                  >
                    {savingHoliday ? 'Se salvează…' : 'Salvează configurația'}
                  </button>
                  {holidayMsg && (
                    <span className={`text-sm font-semibold ${holidayMsg.includes('succes') ? 'text-teal-600' : 'text-red-600'}`}>
                      {holidayMsg}
                    </span>
                  )}
                </div>
              </div>

              {/* ── Banner promoțional ── */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-gray-800 text-base">Banner promoțional meniu</h2>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-sm text-gray-500">Activ</span>
                    <div
                      onClick={() => setPromoCfg((c) => ({ ...c, enabled: !c.enabled }))}
                      className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${promoCfg.enabled ? 'bg-amber-500' : 'bg-gray-300'}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${promoCfg.enabled ? 'translate-x-5' : ''}`} />
                    </div>
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Comandă minimă (RON)</label>
                    <input type="number" min={0} step={5}
                      value={promoCfg.min_order}
                      onChange={(e) => setPromoCfg((c) => ({ ...c, min_order: parseFloat(e.target.value) || 0 }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tip reducere</label>
                    <select
                      value={promoCfg.discount_type}
                      onChange={(e) => setPromoCfg((c) => ({ ...c, discount_type: e.target.value as 'percent' | 'value' }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      <option value="percent">Procent (%)</option>
                      <option value="value">Valoare fixă (RON)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Valoare {promoCfg.discount_type === 'percent' ? '(%)' : '(RON)'}
                    </label>
                    <input type="number" min={0} step={0.5}
                      value={promoCfg.discount_amount}
                      onChange={(e) => setPromoCfg((c) => ({ ...c, discount_amount: parseFloat(e.target.value) || 0 }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Mesaj personalizat (opțional)</label>
                    <input type="text"
                      value={promoCfg.message}
                      onChange={(e) => setPromoCfg((c) => ({ ...c, message: e.target.value }))}
                      placeholder="Lasă gol pentru mesaj automat"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>
                {promoCfg.enabled && (
                  <div className="mb-4 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800">
                    <span>👁 Preview:</span>
                    <span>{promoCfg.message || `Comandă de peste ${promoCfg.min_order} RON și primești ${promoCfg.discount_type === 'percent' ? `${promoCfg.discount_amount}% reducere` : `${promoCfg.discount_amount} RON reducere`}! Menționează la comandă.`}</span>
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <button
                    onClick={savePromoConfig}
                    disabled={savingPromo}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-semibold text-sm rounded-xl transition-all"
                  >
                    {savingPromo ? 'Se salvează…' : 'Salvează banner'}
                  </button>
                  {promoMsg && (
                    <span className={`text-sm font-semibold ${promoMsg.includes('succes') ? 'text-teal-600' : 'text-red-600'}`}>
                      {promoMsg}
                    </span>
                  )}
                </div>
              </div>

              {/* ── Header preview + Export ── */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <p className="text-sm text-gray-500">
                  Preview cu reducere globală{' '}
                  <span className="font-bold text-rose-500">
                    {holidayCfg.discount_type === 'percent' ? `-${holidayCfg.discount_amount}%` : `-${holidayCfg.discount_amount} RON`}
                  </span>
                </p>
                <div className="flex gap-2">
                  <button onClick={() => exportHolidayExcel(hVisible, holidayCfg)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm rounded-xl transition-all">
                    Excel
                  </button>
                  <button onClick={() => exportHolidayPDF(hVisible, holidayCfg)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold text-sm rounded-xl transition-all">
                    PDF
                  </button>
                </div>
              </div>

              {/* ── Filtre categorii ── */}
              <div className="flex flex-wrap gap-2 mb-4">
                {['toate', ...new Set(holidayItems.map((i) => i.category))].map((cat) => (
                  <button key={cat} onClick={() => { setHolidayCatFilter(cat); setSelectedH(new Set()); }}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                      holidayCatFilter === cat
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-rose-300 hover:text-rose-600'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              {/* ── Bulk actions bar ── */}
              {selectedH.size > 0 && (
                <div className="flex items-center gap-3 mb-4 px-4 py-3 bg-rose-50 border border-rose-200 rounded-xl text-sm">
                  <span className="font-semibold text-rose-800">{selectedH.size} selectate</span>
                  <button onClick={() => setShowBulkH(true)}
                    className="px-4 py-1.5 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg transition-all">
                    Setează reducere specifică
                  </button>
                  <button onClick={async () => {
                    await fetch('/api/menu/bulk', {
                      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ ids: Array.from(selectedH), update: { discount_type: null, discount_amount: null } }),
                    });
                    setSelectedH(new Set()); await fetchHoliday();
                  }}
                    className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-all">
                    Resetează reducere
                  </button>
                  <button onClick={() => setSelectedH(new Set())}
                    className="ml-auto text-gray-400 hover:text-gray-600 text-xs">
                    Deselectează
                  </button>
                </div>
              )}

              {loadingHoliday && (
                <div className="text-center py-16 text-gray-400">
                  <div className="inline-block w-8 h-8 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin mb-3" />
                  <p>Se încarcă…</p>
                </div>
              )}

              {/* ── Tabel ── */}
              {!loadingHoliday && hVisible.length > 0 && (
                <div className="bg-white/80 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 bg-rose-50">
                        <th className="px-4 py-3 text-center">
                          <input type="checkbox" checked={hAllSel} onChange={toggleAllH}
                            className="w-4 h-4 accent-rose-500 cursor-pointer" />
                        </th>
                        <th className="px-4 py-3 text-left text-gray-500 font-semibold">Imagine</th>
                        <th className="px-4 py-3 text-left text-gray-500 font-semibold">Produs</th>
                        <th className="px-4 py-3 text-left text-gray-500 font-semibold">Categorie</th>
                        <th className="px-4 py-3 text-right text-gray-500 font-semibold">Preț normal</th>
                        <th className="px-4 py-3 text-center text-gray-500 font-semibold">Reducere aplicată</th>
                        <th className="px-4 py-3 text-right text-rose-500 font-semibold">Preț sărbătoare</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {hVisible.map((item) => {
                        const isSel = selectedH.has(item.id);
                        // Dacă produsul are reducere specifică proprie → o folosim; altfel reducerea globală
                        const hasSpecific = !!item.discount_type && !!item.discount_amount;
                        const effectiveCfg: HolidayConfig = hasSpecific
                          ? { discount_type: item.discount_type!, discount_amount: item.discount_amount!, label: holidayCfg.label }
                          : holidayCfg;
                        const finalP = calcHolidayPrice(item.price, effectiveCfg);
                        const badgeText = effectiveCfg.discount_type === 'percent'
                          ? `-${effectiveCfg.discount_amount}%`
                          : `-${effectiveCfg.discount_amount} RON`;
                        return (
                          <tr key={item.id}
                            className={`transition-colors ${isSel ? 'bg-rose-50/60' : 'hover:bg-rose-50/30'}`}>
                            <td className="px-4 py-3 text-center">
                              <input type="checkbox" checked={isSel}
                                onChange={() => setSelectedH((s) => { const n = new Set(s); isSel ? n.delete(item.id) : n.add(item.id); return n; })}
                                className="w-4 h-4 accent-rose-500 cursor-pointer" />
                            </td>
                            <td className="px-4 py-3">
                              {item.image_url
                                ? <img src={item.image_url} alt={item.name} className="w-10 h-10 object-cover rounded-lg" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                : <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 text-lg">☕</div>
                              }
                            </td>
                            <td className="px-4 py-3 font-semibold text-gray-900">{item.name}</td>
                            <td className="px-4 py-3 text-gray-500">{item.category}</td>
                            <td className="px-4 py-3 text-right text-gray-400 line-through">{item.price} RON</td>
                            <td className="px-4 py-3 text-center">
                              <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                                hasSpecific
                                  ? 'bg-amber-100 text-amber-700 ring-1 ring-amber-400'
                                  : 'bg-rose-100 text-rose-600'
                              }`}>
                                {badgeText}
                              </span>
                              {hasSpecific && (
                                <span className="block text-[10px] text-amber-600 mt-0.5">specifică</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-rose-500">{finalP} RON</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          );
        })()}
      </main>

      {/* Modals */}
      {showWizard && (
        <WizardModal
          initial={editItem ?? undefined}
          onSave={saveItem}
          onClose={() => { setShowWizard(false); setEditItem(null); }}
        />
      )}
      {showBulkDiscount && (
        <BulkDiscountModal
          count={selected.size}
          onApply={applyBulkDiscount}
          onClose={() => setShowBulkDiscount(false)}
        />
      )}
      {showBulkH && (
        <BulkDiscountModal
          count={selectedH.size}
          onApply={async (discountType, discountAmount) => {
            await fetch('/api/menu/bulk', {
              method: 'PATCH', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ids: Array.from(selectedH), update: { discount_type: discountType, discount_amount: discountAmount } }),
            });
            setShowBulkH(false); setSelectedH(new Set()); await fetchHoliday();
          }}
          onClose={() => setShowBulkH(false)}
        />
      )}
    </div>
  );
}
