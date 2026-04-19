'use client';

/**
 * HOLIDAY MENU - Meniu special de sărbători naționale
 *
 * Produsele vin din Supabase (/api/menu).
 * Reducerea și eticheta vin din /api/holiday (holiday_config).
 * Apare doar în zilele de sărbătoare sau când ?preview=true în URL.
 */

import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';

const ADD_ONS = [
  { id: 'lapte_ovaz', name: 'Lapte de ovăz', price: 3 },
  { id: 'lapte_soia', name: 'Lapte de soia', price: 3 },
  { id: 'lapte_migdale', name: 'Lapte de migdale', price: 3 },
  { id: 'shot_extra', name: 'Shot espresso extra', price: 4 },
  { id: 'sirop_vanilie', name: 'Sirop vanilie', price: 2 },
  { id: 'sirop_caramel', name: 'Sirop caramel', price: 2 },
  { id: 'sirop_alune', name: 'Sirop alune', price: 2 },
];

/* Types */
interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image_url: string | null;
  available: boolean;
}

interface HolidayConfig {
  discount_type: 'percent' | 'value';
  discount_amount: number;
  label: string;
}

/* Helpers */
// Sărbătorile naționale — format MM-DD
const HOLIDAYS: { date: string; label: string }[] = [
  { date: '03-01', label: '1 Martie — Mărțișor' },
  { date: '03-08', label: '8 Martie — Ziua Femeii' },
  { date: '04-23', label: 'Ziua Sfântului Gheorghe' },
  { date: '05-01', label: '1 Mai — Ziua Muncii' },
  { date: '06-01', label: '1 Iunie — Ziua Copilului' },
  { date: '12-01', label: '1 Decembrie — Ziua Națională' },
  { date: '12-25', label: 'Crăciun' },
];

export function getTodayHoliday(): string | null {
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return HOLIDAYS.find((holiday) => holiday.date === `${mm}-${dd}`)?.label ?? null;
}

function calcDiscounted(price: number, config: HolidayConfig): number {
  if (config.discount_type === 'percent') {
    return Math.round((price - (price * config.discount_amount) / 100) * 100) / 100;
  }
  return Math.round((price - config.discount_amount) * 100) / 100;
}

function discountBadge(config: HolidayConfig): string {
  return config.discount_type === 'percent'
    ? `-${config.discount_amount}%`
    : `-${config.discount_amount} RON`;
}

/* Card */
function HolidayCard({
  item,
  index,
  tabKey,
  config,
}: {
  item: MenuItem;
  index: number;
  tabKey: string;
  config: HolidayConfig;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggleAddOn(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const extra = ADD_ONS.filter((addon) => selected.has(addon.id)).reduce((sum, addon) => sum + addon.price, 0);

  useEffect(() => {
    setInView(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [tabKey]);

  const finalPrice = calcDiscounted(item.price, config);

  return (
    <div
      ref={cardRef}
      className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-500 hover:scale-[1.02] hover:shadow-xl"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transitionDelay: `${index * 80}ms`,
      }}
    >
      {/* Imagine */}
      <div className="relative mx-3 mt-3 overflow-hidden rounded-xl" style={{ aspectRatio: '4/3' }}>
        {/* Badge ofertă */}
        <div className="absolute left-2 top-2 z-10 flex items-center gap-1.5 rounded-full bg-rose-500 px-2.5 py-1 text-xs font-bold text-white shadow-lg">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full scale-150 rounded-full bg-green-300 opacity-0 transition-opacity duration-150 group-hover:opacity-100 animate-ping" />
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-0 delay-75 transition-opacity duration-150 group-hover:opacity-75 animate-ping" />
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 transition-opacity duration-150 group-hover:opacity-0 animate-ping" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400 shadow-lg shadow-green-400/50" />
          </span>
          OFERTĂ
        </div>

        {/* Badge reducere */}
        <div className="absolute right-2 top-2 z-10 rounded-full bg-amber-500 px-2 py-1 text-xs font-bold text-white shadow">
          {discountBadge(config)}
        </div>

        <img
          src={item.image_url ?? ''}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.style.display = 'none';
            const parent = img.parentElement;
            if (parent && !parent.querySelector('.img-fallback')) {
              const fallback = document.createElement('div');
              fallback.className = 'img-fallback absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100';
              fallback.innerHTML = '<span style="font-size:3rem">☕</span><span style="font-size:0.75rem;color:#9ca3af;margin-top:0.5rem">Fără imagine</span>';
              parent.appendChild(fallback);
            }
          }}
        />
      </div>

      {/* Text + prețuri */}
      <div className="p-5">
        <h3 className="mb-1 text-lg font-bold text-gray-900">{item.name}</h3>
        <p className="mb-3 text-sm leading-relaxed text-gray-500">{item.description}</p>

        <div className="mb-3 flex items-center gap-3">
          <span
            className={inView ? 'price-strike text-base font-semibold text-gray-500' : 'text-base font-semibold text-gray-500'}
            style={{ '--strike-delay': `${index * 80 + 300}ms` } as React.CSSProperties}
          >
            {item.price} RON
          </span>
          <span
            className={inView ? 'price-new text-xl font-bold text-green-600' : 'invisible text-xl font-bold text-green-600'}
            style={{ '--pop-delay': `${index * 80 + 1500}ms` } as React.CSSProperties}
          >
            {finalPrice} RON
          </span>
        </div>

        {/* Buton toggle personalizare */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 text-xs font-semibold text-rose-700 transition-colors hover:text-rose-900"
        >
          <span>{isOpen ? '▲' : '▼'}</span>
          Personalizează comanda
        </button>
      </div>

      {/* Panel add-on-uri */}
      {isOpen && (
        <div className="border-t border-gray-100 px-5 pb-5 pt-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Adaugă la comandă
          </p>
          <div className="space-y-2">
            {ADD_ONS.map((addon) => (
              <label key={addon.id} className="flex cursor-pointer items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={selected.has(addon.id)}
                    onChange={() => toggleAddOn(addon.id)}
                    className="h-4 w-4 rounded accent-rose-500"
                  />
                  {addon.name}
                </span>
                <span className="text-xs font-semibold text-rose-700">+{addon.price} RON</span>
              </label>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
            <span className="text-sm font-semibold text-gray-700">Total estimat:</span>
            <span className="text-base font-bold text-rose-600">
              {(finalPrice + extra).toFixed(2)} RON
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-400">
            * Menționează opțiunile dorite la comandă
          </p>
        </div>
      )}
    </div>
  );
}

/* Main */
export default function HolidayMenu({ holidayLabel }: { holidayLabel: string }) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [config, setConfig] = useState<HolidayConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('');
  const [visible, setVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/menu').then((response) => response.json()),
      fetch('/api/holiday').then((response) => response.json()),
    ])
      .then(([menuRes, holidayRes]) => {
        const available = (menuRes.data as MenuItem[]).filter((item) => item.available);
        setItems(available);
        if (available.length > 0) setActiveTab(available[0].category);
        setConfig(holidayRes.data as HolidayConfig);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const startConfetti = () => {
      if (intervalId) return;
      intervalId = setInterval(() => {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.5 },
          colors: ['#f43f5e', '#fb923c', '#facc15', '#4ade80', '#60a5fa'],
          gravity: 0.8,
          drift: 0.5,
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.5 },
          colors: ['#f43f5e', '#fb923c', '#facc15', '#4ade80', '#60a5fa'],
          gravity: 0.8,
          drift: -0.5,
        });
      }, 800);
    };

    const stopConfetti = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startConfetti();
        } else {
          stopConfetti();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      stopConfetti();
    };
  }, []);

  const categories = [...new Set(items.map((item) => item.category))];
  const tabItems = items.filter((item) => item.category === activeTab);

  const handleTabChange = (category: string) => {
    if (category === activeTab) return;
    setVisible(false);
    setTimeout(() => {
      setActiveTab(category);
      setVisible(true);
    }, 200);
  };

  const displayLabel = config?.label ?? holidayLabel;
  const discountText = config
    ? (config.discount_type === 'percent'
        ? `-${config.discount_amount}% la toate produsele`
        : `-${config.discount_amount} RON la toate produsele`)
    : '';

  return (
    <section ref={sectionRef} id="sarbatori" className="bg-gradient-to-b from-rose-50 to-amber-50 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Titlu */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-block rounded-full bg-rose-100 px-4 py-1.5 text-sm font-semibold text-rose-700">
            Ofertă specială
          </div>
          <h2 className="mb-4 text-5xl font-bold text-gray-900">
            Meniu <span className="text-rose-500">{displayLabel}</span>
          </h2>
          {discountText && (
            <p className="text-lg text-gray-600">
              Sărbătorești cu noi? Îți oferim{' '}
              <span className="font-bold text-rose-500">{discountText}</span>!
            </p>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center text-gray-400">
            <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-rose-200 border-t-rose-500" />
            <p>Se încarcă ofertele...</p>
          </div>
        )}

        {!loading && config && (
          <>
            {/* Tab-uri categorii */}
            <div className="mb-12 flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleTabChange(category)}
                  className={`rounded-full px-6 py-2.5 font-semibold transition-all duration-300 ${
                    activeTab === category
                      ? 'scale-105 bg-rose-500 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-rose-100 hover:text-rose-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Grid produse */}
            <div
              className="grid grid-cols-1 gap-6 transition-opacity duration-200 md:grid-cols-3"
              style={{ opacity: visible ? 1 : 0 }}
            >
              {tabItems.map((item, index) => (
                <HolidayCard
                  key={item.id}
                  item={item}
                  index={index}
                  tabKey={activeTab}
                  config={config}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
