'use client';

import { useState, useEffect, useCallback } from 'react';

type Currency = 'RON' | 'EUR';
type Columns = 1 | 2 | 3;

/**
 * ☕ MENU SECTION - Meniul cafenelei cu produse, prețuri, imagini
 * MODERNIZAT: Tab-uri interactive sticky cu auto-highlight la scroll
 */

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('Espresso');

  /* ── Setări afișare (din admin) ── */
  const [showCurrencyToggle, setShowCurrencyToggle] = useState(false);
  const [showColumnToggle, setShowColumnToggle] = useState(false);

  /* ── Valută ── */
  const [currency, setCurrency] = useState<Currency>('RON');
  const [eurRate, setEurRate] = useState<number | null>(null);

  /* ── Coloane ── */
  const [columns, setColumns] = useState<Columns>(3);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/menu-settings');
      const { data } = await res.json();
      if (data) {
        setShowCurrencyToggle(data.show_currency_toggle);
        setShowColumnToggle(data.show_column_toggle);
      }
    } catch { /* silently ignore */ }
  }, []);

  const fetchCurs = useCallback(async () => {
    try {
      const res = await fetch('/api/curs');
      const { data } = await res.json();
      if (data?.EUR) setEurRate(data.EUR);
    } catch { /* silently ignore */ }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    if (showCurrencyToggle) fetchCurs();
  }, [showCurrencyToggle, fetchCurs]);

  function formatPrice(priceRON: number): string {
    if (currency === 'EUR' && eurRate) {
      return `${(priceRON / eurRate).toFixed(2)} €`;
    }
    return `${priceRON} lei`;
  }

  const colClass: Record<Columns, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };
  /**
   * 📋 DATE MENIU - Array cu toate produsele
   * Fiecare obiect conține: nume, preț, descriere, ingrediente, imagine, categorie
   */
  const menuItems = [
    // ☕ ESPRESSO CLASSICS
    {
      name: 'Espresso',
      price: 12,
      category: 'Espresso',
      description: 'Shot dublu de espresso intens, aromat',
      ingredients: '18g cafea, 36ml extract',
      image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&auto=format&fit=crop',
      vegan: true,
    },
    {
      name: 'Espresso Lungo',
      price: 13,
      category: 'Espresso',
      description: 'Espresso alungit cu apă fierbinte',
      ingredients: '18g cafea, 60ml extract',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop',
      vegan: true,
    },
    {
      name: 'Americano',
      price: 14,
      category: 'Espresso',
      description: 'Espresso diluat cu apă caldă',
      ingredients: 'Espresso dublu + 120ml apă',
      image: 'https://images.unsplash.com/photo-1532004491497-ba35c367d634?w=600&auto=format&fit=crop',
      vegan: true,
    },
    {
      name: 'Cappuccino',
      price: 16,
      category: 'Espresso',
      description: 'Espresso cu lapte spumat cremos',
      ingredients: 'Espresso + 150ml lapte integral',
      image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop',
      vegan: false,
    },
    {
      name: 'Flat White',
      price: 17,
      category: 'Espresso',
      description: 'Microfoam mătăsos peste espresso dublu',
      ingredients: 'Espresso dublu + 180ml lapte microfoam',
      image: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=600&auto=format&fit=crop',
      vegan: false,
    },
    {
      name: 'Latte',
      price: 17,
      category: 'Espresso',
      description: 'Espresso cu lapte abundent și spumă delicată',
      ingredients: 'Espresso + 240ml lapte + spumă',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop',
      vegan: false,
    },

    // 🌟 SPECIALTY COFFEE
    {
      name: 'Caramel Macchiato',
      price: 19,
      category: 'Specialty',
      description: 'Latte cu sirop caramel și topping caramel',
      ingredients: 'Espresso + lapte + sirop caramel + sos caramel',
      image: 'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=600&auto=format&fit=crop',
      vegan: false,
    },
    {
      name: 'Mocha',
      price: 19,
      category: 'Specialty',
      description: 'Ciocolată belgiană topită cu espresso și lapte',
      ingredients: 'Espresso + ciocolată + lapte + frișcă',
      image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=600&auto=format&fit=crop',
      vegan: false,
    },
    {
      name: 'Vanilla Latte',
      price: 18,
      category: 'Specialty',
      description: 'Latte aromat cu vanilie Madagascar',
      ingredients: 'Espresso + sirop vanilie + lapte',
      image: 'https://images.unsplash.com/photo-1545665225-b23b99e4d45e?w=600&auto=format&fit=crop',
      vegan: false,
    },
    {
      name: 'Affogato',
      price: 21,
      category: 'Pastry',
      description: 'Înghețată vanilie afogată în espresso',
      ingredients: 'Espresso shot + bilă înghețată vanilie',
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&auto=format&fit=crop',
      vegan: false,
    },

    // 🥛 VEGAN OPTIONS
    {
      name: 'Oat Milk Latte',
      price: 18,
      category: 'Vegan',
      description: 'Latte cu lapte de ovăz Oatly Barista',
      ingredients: 'Espresso + 240ml lapte ovăz',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop',
      vegan: true,
    },
    {
      name: 'Almond Cappuccino',
      price: 17,
      category: 'Vegan',
      description: 'Cappuccino cu lapte de migdale',
      ingredients: 'Espresso + lapte migdale spumat',
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&auto=format&fit=crop',
      vegan: true,
    },
    {
      name: 'Coconut Mocha',
      price: 20,
      category: 'Vegan',
      description: 'Mocha vegan cu lapte de cocos și ciocolată neagră',
      ingredients: 'Espresso + lapte cocos + ciocolată neagră 70%',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop',
      vegan: true,
    },
    {
      name: 'Soy Flat White',
      price: 18,
      category: 'Vegan',
      description: 'Flat white cu lapte de soia',
      ingredients: 'Espresso dublu + lapte soia microfoam',
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&auto=format&fit=crop',
      vegan: true,
    },

    // ❄️ COLD BREW & ICED
    {
      name: 'Cold Brew',
      price: 16,
      category: 'Cold',
      description: 'Cafea cold brew 18h, aromă dulce naturală',
      ingredients: '250ml cold brew + gheață',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop',
      vegan: true,
    },
    {
      name: 'Iced Latte',
      price: 17,
      category: 'Cold',
      description: 'Latte răcoros perfect pentru vară',
      ingredients: 'Espresso + lapte rece + gheață',
      image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=600&auto=format&fit=crop',
      vegan: false,
    },
    {
      name: 'Nitro Cold Brew',
      price: 19,
      category: 'Cold',
      description: 'Cold brew infuzat cu nitrogen, textură cremă',
      ingredients: 'Cold brew + azot',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop',
      vegan: true,
    },
    {
      name: 'Iced Caramel Macchiato',
      price: 20,
      category: 'Cold',
      description: 'Macchiato răcoros cu caramel',
      ingredients: 'Espresso + lapte rece + gheață + caramel',
      image: 'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=600&auto=format&fit=crop',
      vegan: false,
    },

    // 🫖 ALTERNATIVE
    {
      name: 'Matcha Latte',
      price: 18,
      category: 'Alternative',
      description: 'Matcha ceremonial japonez cu lapte',
      ingredients: '3g matcha + 240ml lapte',
      image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&auto=format&fit=crop',
      vegan: false,
    },
    {
      name: 'Chai Latte',
      price: 17,
      category: 'Alternative',
      description: 'Amestec de condimente indiene cu lapte',
      ingredients: 'Chai concentrate + lapte spumat',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop',
      vegan: false,
    },

    // 🥐 PATISERIE
    {
      name: 'Croissant Clasic',
      price: 8,
      category: 'Pastry',
      description: 'Croissant frantuzesc cu unt, fraged și aromat',
      ingredients: 'Făină, unt 82% grăsime, ou, drojdie',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop',
      vegan: false,
    },
    {
      name: 'Croissant cu Ciocolată',
      price: 10,
      category: 'Pastry',
      description: 'Croissant cu ciocolată belgiană neagră',
      ingredients: 'Croissant + ciocolată 70% cacao',
      image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=600&auto=format&fit=crop',
      vegan: false,
    },
    {
      name: 'Croissant cu Migdale',
      price: 12,
      category: 'Pastry',
      description: 'Croissant umplut cu cremă de migdale și glazură',
      ingredients: 'Croissant + cremă migdale + fulgi migdale',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop',
      vegan: false,
    },
    {
      name: 'Cheesecake New York',
      price: 16,
      category: 'Pastry',
      description: 'Cheesecake cremos cu topping fructe de pădure',
      ingredients: 'Brânză Philadelphia + biscuiți + fructe',
      image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=600&auto=format&fit=crop',
      vegan: false,
    },
    {
      name: 'Brownie cu Nuci',
      price: 13,
      category: 'Pastry',
      description: 'Brownie ciocolătos cu nuci caramelizate',
      ingredients: 'Ciocolată neagră + nuci + unt + ou',
      image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=600&auto=format&fit=crop',
      vegan: false,
    },
    {
      name: 'Eclair cu Vanilie',
      price: 14,
      category: 'Pastry',
      description: 'Eclair frantuzesc cu cremă vanilie și glazură',
      ingredients: 'Aluat choux + cremă patisieră vanilie',
      image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=600&auto=format&fit=crop',
      vegan: false,
    },
    {
      name: 'Tiramisu Clasic',
      price: 15,
      category: 'Pastry',
      description: 'Tiramisu autentic cu mascarpone și espresso',
      ingredients: 'Mascarpone + savoiardi + espresso + cacao',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&auto=format&fit=crop&q=80',
      vegan: false,
    },
    {
      name: 'Tartaletă cu Lămâie',
      price: 13,
      category: 'Pastry',
      description: 'Tartaletă cu cremă acidulată de lămâie',
      ingredients: 'Aluat fraged + lemon curd + bezea',
      image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600&auto=format&fit=crop',
      vegan: false,
    },
    {
      name: 'Macaron Asortate',
      price: 18,
      category: 'Pastry',
      description: 'Set 6 macarons cu arome variate',
      ingredients: 'Migdale + zahăr + umpluturi diverse',
      image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&auto=format&fit=crop',
      vegan: false,
    },
    {
      name: 'Cinnamon Roll',
      price: 11,
      category: 'Pastry',
      description: 'Rulou cu scorțișoară și glazură cream cheese',
      ingredients: 'Aluat dospit + scorțișoară + glazură',
      image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=600&auto=format&fit=crop',
      vegan: false,
    },
  ];

  // Grupează produsele pe categorii
  const categories = ['Espresso', 'Specialty', 'Vegan', 'Cold', 'Alternative', 'Pastry'];

  const categoryLabels: Record<string, string> = {
    'Espresso': '☕ Espresso',
    'Specialty': '🌟 Specialty',
    'Vegan': '🌱 Vegan',
    'Cold': '❄️ Cold',
    'Alternative': '🫖 Alternative',
    'Pastry': '🥐 Patiserie'
  };

  // Scroll to category
  const scrollToCategory = (category: string) => {
    setActiveCategory(category);
    const element = document.getElementById(`category-${category}`);
    if (element) {
      const offset = 180; // Offset pentru sticky nav + tabs
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  // Auto-highlight tab la scroll
  useEffect(() => {
    let ticking = false;
    let rafId = 0;

    const checkActive = () => {
      ticking = false;
      for (const cat of categories) {
        const el = document.getElementById(`category-${cat}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveCategory(cat);
            break;
          }
        }
      }
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(checkActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="menu" className="py-20 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* HEADER MENIU */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meniul <span className="text-primary">nostru</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Cafea de specialitate, preparată cu grijă de bariștii noștri certificați
          </p>
        </div>

        {/* TOOLBAR VALUTĂ + COLOANE (controlat din admin) */}
        {(showCurrencyToggle || showColumnToggle) && (
          <div className="flex flex-wrap items-center justify-end gap-3 mb-8">
            {showCurrencyToggle && (
              <div className="flex rounded-full border border-gray-200 dark:border-gray-700 overflow-hidden">
                {(['RON', 'EUR'] as Currency[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-4 py-2 text-sm font-semibold transition-colors ${
                      currency === c
                        ? 'bg-primary text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
            {showColumnToggle && (
              <div className="flex rounded-full border border-gray-200 dark:border-gray-700 overflow-hidden">
                {([1, 2, 3] as Columns[]).map((n) => (
                  <button
                    key={n}
                    onClick={() => setColumns(n)}
                    className={`px-4 py-2 text-sm font-semibold transition-colors ${
                      columns === n
                        ? 'bg-primary text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {n} col
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 📌 TAB-URI STICKY CU INDICATOR PILL ANIMAT */}
        <div className="sticky top-20 z-40 mb-12 -mx-6 px-6 py-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => scrollToCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-primary text-white shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 hover:dark:bg-gray-600'
                  }`}
                >
                  {categoryLabels[category]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* LOOP PRIN CATEGORII */}
        {categories.map((category) => (
          <div key={category} id={`category-${category}`} className="mb-16 scroll-mt-48">
            {/* TITLU CATEGORIE */}
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 border-b-2 border-primary/20 dark:border-primary/30 pb-3">
              {category === 'Espresso' && 'Espresso Classics'}
              {category === 'Specialty' && 'Specialty Coffee'}
              {category === 'Vegan' && 'Opțiuni Vegane'}
              {category === 'Cold' && 'Cold Brew & Iced'}
              {category === 'Alternative' && 'Băuturi Alternative'}
              {category === 'Pastry' && 'Patiserie Artizanală'}
            </h3>

            {/* GRID PRODUSE */}
            <div className={`grid ${colClass[columns]} gap-6`}>
              {menuItems
                .filter((item) => item.category === category)
                .map((item, index) => (
                  <div
                    key={index}
                    className="glass glass-hover rounded-2xl overflow-hidden"
                  >
                    {/* IMAGINE PRODUS */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        onError={(e) => {
                          // Fallback dacă imaginea nu se încarcă
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent && !parent.querySelector('.fallback-icon')) {
                            const fallback = document.createElement('div');
                            fallback.className = 'fallback-icon absolute inset-0 flex items-center justify-center text-6xl';
                            fallback.textContent = 'Coffee';
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                      {/* BADGE VEGAN */}
                      {item.vegan && (
                        <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Vegan
                        </div>
                      )}
                    </div>

                    {/* CONTENT CARD */}
                    <div className="p-6">
                      {/* NUME + PREȚ */}
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                          {item.name}
                        </h4>
                        <span className="text-2xl font-bold text-secondary">
                          {formatPrice(item.price)}
                        </span>
                      </div>

                      {/* DESCRIERE */}
                      <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm leading-relaxed">
                        {item.description}
                      </p>

                      {/* INGREDIENTE */}
                      <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <span className="font-semibold">Ingrediente:</span>{' '}
                        {item.ingredients}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}

        {/* INFO FOOTER MENIU */}
        <div className="mt-16 text-center">
          <div className="inline-block glass rounded-2xl p-8">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <span className="font-semibold">Personalizează-ți băutura:</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div>
                <p className="font-semibold text-primary mb-1">Lapte alternativ</p>
                <p>Ovăz, Migdale, Soia, Cocos (+2 lei)</p>
              </div>
              <div>
                <p className="font-semibold text-primary mb-1">Extra shot</p>
                <p>Espresso suplimentar (+5 lei)</p>
              </div>
              <div>
                <p className="font-semibold text-primary mb-1">Siropuri</p>
                <p>Vanilie, Caramel, Alune (+3 lei)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
