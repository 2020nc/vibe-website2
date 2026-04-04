'use client';

import { useState, useEffect, useRef } from 'react';
import CoffeeLoader from '@/components/CoffeeLoader';

/**
 * Personalizari disponibile pentru orice produs
 * Preturile sunt exprimate in RON si se adauga la pretul de baza
 */
const ADD_ONS = [
  { id: 'lapte_ovaz',    name: 'Lapte de ovăz',    price: 3 },
  { id: 'lapte_soia',    name: 'Lapte de soia',     price: 3 },
  { id: 'lapte_migdale', name: 'Lapte de migdale',  price: 3 },
  { id: 'shot_extra',    name: 'Shot espresso extra', price: 4 },
  { id: 'sirop_vanilie', name: 'Sirop vanilie',     price: 2 },
  { id: 'sirop_caramel', name: 'Sirop caramel',     price: 2 },
  { id: 'sirop_alune',   name: 'Sirop alune',       price: 2 },
];

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
  tag?: string | null;
}

const TAG_STYLES: Record<string, string> = {
  'Bestseller': 'bg-amber-100 text-amber-800',
  'Sezonier':   'bg-green-100 text-green-800',
  'Signature':  'bg-teal-100 text-teal-800',
  'Staff Pick': 'bg-orange-100 text-orange-700',
};

function calcFinalPrice(item: MenuItem): number {
  if (!item.discount_type || !item.discount_amount) return item.price;
  if (item.discount_type === 'percent') {
    return Math.round((item.price - (item.price * item.discount_amount) / 100) * 100) / 100;
  }
  return Math.round((item.price - item.discount_amount) * 100) / 100;
}

function discountLabel(item: MenuItem, currency: 'RON' | 'EUR' | 'USD', curs: { EUR: number; USD: number } | null): string | null {
  if (!item.discount_type || !item.discount_amount) return null;
  if (item.discount_type === 'percent') return `-${item.discount_amount}%`;
  if (currency === 'EUR' && curs) return `-${(item.discount_amount / curs.EUR).toFixed(2)} €`;
  if (currency === 'USD' && curs) return `-${(item.discount_amount / curs.USD).toFixed(2)} $`;
  return `-${item.discount_amount} RON`;
}

type Currency = 'RON' | 'EUR' | 'USD';

interface CursValutar {
  EUR: number;
  USD: number;
  updatedAt: string;
}

interface PromoConfig {
  enabled: boolean;
  min_order: number;
  discount_type: 'percent' | 'value';
  discount_amount: number;
  message: string;
}

function LazyProductImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Dacă imaginea e deja în cache și s-a încărcat înainte de a atașa onLoad
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className="relative w-full h-full bg-gray-100">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <CoffeeLoader size={40} />
        </div>
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          img.style.display = 'none';
          const parent = img.parentElement;
          if (parent && !parent.querySelector('.img-fallback')) {
            const fb = document.createElement('div');
            fb.className = 'img-fallback absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100';
            fb.innerHTML = '<span style="font-size:3rem">☕</span><span style="font-size:0.75rem;color:#9ca3af;margin-top:0.5rem">Fără imagine</span>';
            parent.appendChild(fb);
          }
        }}
        className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}

type ColCount = 3 | 4 | 5;

const COL_CLASSES: Record<ColCount, string> = {
  3: 'grid-cols-1 md:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5',
};

export default function MenuStarter({ initialItems }: { initialItems?: MenuItem[] }) {
  const [items, setItems]         = useState<MenuItem[]>(initialItems ?? []);
  const [loading, setLoading]     = useState(!initialItems);
  const [activeTab, setActiveTab] = useState(initialItems?.[0]?.category ?? '');
  const [visible, setVisible]     = useState(true);
  const [cols, setCols]           = useState<ColCount>(3);
  const [promo, setPromo]         = useState<PromoConfig | null>(null);
  const [currency, setCurrency]   = useState<Currency>('RON');
  const [curs, setCurs]           = useState<CursValutar | null>(null);
  // ID-ul cardului deschis + add-on-urile selectate
  const [openCard, setOpenCard]   = useState<string | null>(null);
  const [selected, setSelected]   = useState<Record<string, Set<string>>>({});

  // Setări afișare din admin
  const [showCurrencyToggle, setShowCurrencyToggle] = useState(false);
  const [showColumnToggle, setShowColumnToggle]     = useState(false);

  // Citește preferința din localStorage la mount
  useEffect(() => {
    const saved = localStorage.getItem('menu_cols');
    if (saved === '4' || saved === '5') setCols(Number(saved) as ColCount);
  }, []);

  function changeCols(n: ColCount) {
    setCols(n);
    localStorage.setItem('menu_cols', String(n));
  }

  function toggleAddOn(itemId: string, addOnId: string) {
    setSelected((prev) => {
      const current = new Set(prev[itemId] ?? []);
      current.has(addOnId) ? current.delete(addOnId) : current.add(addOnId);
      return { ...prev, [itemId]: current };
    });
  }

  function addOnTotal(itemId: string): number {
    const ids = selected[itemId] ?? new Set<string>();
    return ADD_ONS.filter((a) => ids.has(a.id)).reduce((sum, a) => sum + a.price, 0);
  }

  useEffect(() => {
    // Fetch setări afișare din admin
    fetch('/api/menu-settings').then((r) => r.json()).then(({ data }) => {
      if (data) {
        setShowCurrencyToggle(data.show_currency_toggle);
        setShowColumnToggle(data.show_column_toggle);
      }
    }).catch(() => {});

    // Dacă avem date server-side, setăm tab-ul activ și fetchuim doar promo/curs
    if (initialItems && initialItems.length > 0) {
      setActiveTab(initialItems[0].category);
      Promise.all([
        fetch('/api/promo').then((r) => r.json()).catch(() => ({ data: null })),
        fetch('/api/curs').then((r) => r.json()).catch(() => ({ data: null })),
      ]).then(([promoRes, cursRes]) => {
        if (promoRes.data) setPromo(promoRes.data as PromoConfig);
        setCurs(cursRes.data ?? { EUR: 4.97, USD: 4.56, updatedAt: '' });
      });
      return;
    }

    Promise.all([
      fetch('/api/menu').then((r) => r.json()),
      fetch('/api/promo').then((r) => r.json()).catch(() => ({ data: null })),
      fetch('/api/curs').then((r) => r.json()).catch(() => ({ data: null })),
    ]).then(([menuRes, promoRes, cursRes]) => {
      const available = (menuRes.data as MenuItem[]).filter((i) => i.available);
      setItems(available);
      if (available.length > 0) setActiveTab(available[0].category);
      if (promoRes.data) setPromo(promoRes.data as PromoConfig);
      // Dacă BNR nu răspunde, folosim rate de fallback
      setCurs(cursRes.data ?? { EUR: 4.97, USD: 4.56, updatedAt: '' });
    }).finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toDisplayPrice(ron: number): string {
    if (currency === 'EUR' && curs) return (ron / curs.EUR).toFixed(2) + ' €';
    if (currency === 'USD' && curs) return (ron / curs.USD).toFixed(2) + ' $';
    return ron + ' RON';
  }

  // Categorii unice în ordinea în care apar
  const categories = [...new Set(items.map((i) => i.category))];
  const tabItems   = items.filter((i) => i.category === activeTab);

  const handleTabChange = (cat: string) => {
    if (cat === activeTab) return;
    setVisible(false);
    setTimeout(() => {
      setActiveTab(cat);
      setVisible(true);
    }, 200);
  };

  return (
    <section id="menu" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Loading — spinner discret fără text, doar când nu există date server-side */}
        {loading && (
          <div className="text-center py-20 text-gray-400">
            <div className="inline-block w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" />
          </div>
        )}

        {!loading && promo?.enabled && (
          <div className="mb-8 flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4">
            <span className="text-2xl">🎁</span>
            <p className="text-amber-800 font-medium text-sm md:text-base">
              {promo.message
                ? promo.message
                : `Comandă de peste ${promo.min_order} RON și primești ${
                    promo.discount_type === 'percent'
                      ? `${promo.discount_amount}% reducere`
                      : `${promo.discount_amount} RON reducere`
                  }! Menționează la comandă.`}
            </p>
          </div>
        )}

        {!loading && (
          <>
            {/* Tab-uri categorii + toggle coloane */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleTabChange(cat)}
                  className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                    activeTab === cat
                      ? 'bg-amber-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Toggle coloane + valută — controlate din admin */}
            {(showCurrencyToggle || showColumnToggle) && (
              <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
                {/* Valută */}
                {showCurrencyToggle ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-medium">Preț în:</span>
                    {(['RON', 'EUR', 'USD'] as Currency[]).map((c) => (
                      <button
                        key={c}
                        onClick={() => setCurrency(c)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          currency === c
                            ? 'bg-amber-600 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-500 hover:bg-amber-100 hover:text-amber-700'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                    {curs && (
                      <span className="text-xs text-gray-400 ml-1">
                        1€={curs.EUR.toFixed(2)} RON · 1$={curs.USD.toFixed(2)} RON
                        {!curs.updatedAt && <span className="text-amber-400"> (estimativ)</span>}
                      </span>
                    )}
                  </div>
                ) : <div />}

                {/* Coloane — vizibil doar pe desktop */}
                {showColumnToggle && (
                  <div className="hidden md:flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-medium mr-1">Coloane:</span>
                    {([3, 4, 5] as ColCount[]).map((n) => (
                      <button
                        key={n}
                        onClick={() => changeCols(n)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                          cols === n
                            ? 'bg-amber-600 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-500 hover:bg-amber-100 hover:text-amber-700'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Grid produse */}
            <div
              className={`grid ${COL_CLASSES[cols]} gap-6 transition-opacity duration-200`}
              style={{ opacity: visible ? 1 : 0 }}
            >
              {tabItems.map((item) => {
                const finalPrice  = calcFinalPrice(item);
                const badge       = discountLabel(item, currency, curs);
                const hasDiscount = badge !== null;
                const isOpen      = openCard === item.id;
                const extra       = addOnTotal(item.id);
                const total       = finalPrice + extra;

                return (
                  <div
                    key={item.id}
                    className="group cursor-pointer bg-gray-50 rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                  >
                    {/* Imagine cu CoffeeLoader placeholder */}
                    <div className="relative overflow-hidden rounded-xl mx-3 mt-3" style={{ aspectRatio: '4/3' }}>
                      {hasDiscount && (
                        <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                          {badge}
                        </div>
                      )}
                      {item.tag && TAG_STYLES[item.tag] && (
                        <div className={`absolute top-2 right-2 z-10 text-xs font-bold px-2 py-1 rounded-full shadow ${TAG_STYLES[item.tag]}`}>
                          {item.tag}
                        </div>
                      )}
                      <LazyProductImage src={item.image_url ?? ''} alt={item.name} />
                    </div>

                    {/* Text + buton personalizare */}
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                        <div className="text-right">
                          {hasDiscount && (
                            <span className="block text-xs text-gray-400 line-through">
                              {toDisplayPrice(item.price)}
                            </span>
                          )}
                          <span className={`font-bold ${hasDiscount ? 'text-red-500' : 'text-amber-600'}`}>
                            {toDisplayPrice(finalPrice)}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed mb-3">{item.description}</p>

                      {/* Buton toggle personalizare */}
                      <button
                        onClick={() => setOpenCard(isOpen ? null : item.id)}
                        className="text-xs font-semibold text-amber-600 hover:text-amber-800 flex items-center gap-1 transition-colors"
                      >
                        <span>{isOpen ? '▲' : '▼'}</span>
                        Personalizează comanda
                      </button>

                      <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-3 w-full py-2 text-sm font-medium bg-amber-800 text-white rounded-lg">
                        Adaugă la comandă
                      </button>
                    </div>

                    {/* Panel add-on-uri (expandabil) */}
                    {isOpen && (
                      <div className="px-5 pb-5 border-t border-gray-200 pt-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                          Adaugă la comandă
                        </p>
                        <div className="space-y-2">
                          {ADD_ONS.map((addon) => {
                            const checked = (selected[item.id] ?? new Set()).has(addon.id);
                            return (
                              <label
                                key={addon.id}
                                className="flex items-center justify-between cursor-pointer group/addon"
                              >
                                <span className="flex items-center gap-2 text-sm text-gray-700">
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggleAddOn(item.id, addon.id)}
                                    className="w-4 h-4 accent-amber-600 rounded"
                                  />
                                  {addon.name}
                                </span>
                                <span className="text-xs font-semibold text-amber-600">
                                  +{toDisplayPrice(addon.price)}
                                </span>
                              </label>
                            );
                          })}
                        </div>

                        {/* Total calculat */}
                        <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                          <span className="text-sm font-semibold text-gray-700">Total estimat:</span>
                          <span className="text-base font-bold text-amber-700">
                            {toDisplayPrice(total)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          * Menționează opțiunile dorite la comandă
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

      </div>
    </section>
  );
}
