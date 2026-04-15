/**
 * 📚 KNOWLEDGE BASE - Baza de cunoștințe Vibe Caffè
 * Modul 6, Lecția 1 - Date pentru system prompt ChatWidget (Barista Bot)
 */

// ─── 1. PRODUSE ──────────────────────────────────────────────────────────────

export const menuItems = [
  // ☕ ESPRESSO
  { name: 'Espresso',           price: 12, category: 'Espresso',    ingredients: '18g cafea, 36ml extract',                         vegan: true  },
  { name: 'Espresso Lungo',     price: 13, category: 'Espresso',    ingredients: '18g cafea, 60ml extract',                         vegan: true  },
  { name: 'Americano',          price: 14, category: 'Espresso',    ingredients: 'Espresso dublu + 120ml apă',                      vegan: true  },
  { name: 'Cappuccino',         price: 16, category: 'Espresso',    ingredients: 'Espresso + 150ml lapte integral',                 vegan: false },
  { name: 'Flat White',         price: 17, category: 'Espresso',    ingredients: 'Espresso dublu + 180ml lapte microfoam',          vegan: false },
  { name: 'Latte',              price: 17, category: 'Espresso',    ingredients: 'Espresso + 240ml lapte + spumă',                  vegan: false },

  // 🌟 SPECIALTY
  { name: 'Caramel Macchiato',  price: 19, category: 'Specialty',   ingredients: 'Espresso + lapte + sirop caramel + sos caramel', vegan: false },
  { name: 'Mocha',              price: 19, category: 'Specialty',   ingredients: 'Espresso + ciocolată + lapte + frișcă',           vegan: false },
  { name: 'Vanilla Latte',      price: 18, category: 'Specialty',   ingredients: 'Espresso + sirop vanilie + lapte',                vegan: false },
  { name: 'Affogato',           price: 21, category: 'Pastry',      ingredients: 'Espresso shot + bilă înghețată vanilie',          vegan: false },

  // 🌱 VEGAN
  { name: 'Oat Milk Latte',     price: 18, category: 'Vegan',       ingredients: 'Espresso + 240ml lapte ovăz',                    vegan: true  },
  { name: 'Almond Cappuccino',  price: 17, category: 'Vegan',       ingredients: 'Espresso + lapte migdale spumat',                vegan: true  },
  { name: 'Coconut Mocha',      price: 20, category: 'Vegan',       ingredients: 'Espresso + lapte cocos + ciocolată neagră 70%',  vegan: true  },
  { name: 'Soy Flat White',     price: 18, category: 'Vegan',       ingredients: 'Espresso dublu + lapte soia microfoam',          vegan: true  },

  // ❄️ COLD
  { name: 'Cold Brew',          price: 16, category: 'Cold',        ingredients: '250ml cold brew + gheață',                       vegan: true  },
  { name: 'Iced Latte',         price: 17, category: 'Cold',        ingredients: 'Espresso + lapte rece + gheață',                 vegan: false },
  { name: 'Nitro Cold Brew',    price: 19, category: 'Cold',        ingredients: 'Cold brew + azot',                               vegan: true  },
  { name: 'Iced Caramel Macchiato', price: 20, category: 'Cold',   ingredients: 'Espresso + lapte rece + gheață + caramel',       vegan: false },

  // 🫖 ALTERNATIVE
  { name: 'Matcha Latte',       price: 18, category: 'Alternative', ingredients: '3g matcha + 240ml lapte',                       vegan: false },
  { name: 'Chai Latte',         price: 17, category: 'Alternative', ingredients: 'Chai concentrate + lapte spumat',               vegan: false },

  // 🥐 PASTRY
  { name: 'Croissant Clasic',         price: 8,  category: 'Pastry', ingredients: 'Făină, unt 82%, ou, drojdie',                  vegan: false },
  { name: 'Croissant cu Ciocolată',   price: 10, category: 'Pastry', ingredients: 'Croissant + ciocolată 70% cacao',              vegan: false },
  { name: 'Croissant cu Migdale',     price: 12, category: 'Pastry', ingredients: 'Croissant + cremă migdale + fulgi migdale',    vegan: false },
  { name: 'Cheesecake New York',      price: 16, category: 'Pastry', ingredients: 'Brânză Philadelphia + biscuiți + fructe',      vegan: false },
  { name: 'Brownie cu Nuci',          price: 13, category: 'Pastry', ingredients: 'Ciocolată neagră + nuci + unt + ou',           vegan: false },
  { name: 'Eclair cu Vanilie',        price: 14, category: 'Pastry', ingredients: 'Aluat choux + cremă patisieră vanilie',        vegan: false },
  { name: 'Tiramisu Clasic',          price: 15, category: 'Pastry', ingredients: 'Mascarpone + savoiardi + espresso + cacao',    vegan: false },
  { name: 'Tartaletă cu Lămâie',      price: 13, category: 'Pastry', ingredients: 'Aluat fraged + lemon curd + bezea',           vegan: false },
  { name: 'Macaron Asortate',         price: 18, category: 'Pastry', ingredients: 'Migdale + zahăr + umpluturi diverse',          vegan: false },
  { name: 'Cinnamon Roll',            price: 11, category: 'Pastry', ingredients: 'Aluat dospit + scorțișoară + glazură',         vegan: false },
];

// ─── 2. CATEGORII ─────────────────────────────────────────────────────────────

export const categories = [
  { key: 'Espresso',     label: '☕ Espresso' },
  { key: 'Specialty',   label: '🌟 Specialty' },
  { key: 'Vegan',       label: '🌱 Vegan' },
  { key: 'Cold',        label: '❄️ Cold Brew & Iced' },
  { key: 'Alternative', label: '🫖 Alternative' },
  { key: 'Pastry',      label: '🥐 Patiserie' },
];

// ─── 3. INFORMAȚII CAFENEA ────────────────────────────────────────────────────

export const cafeInfo = {
  name: 'Vibe Caffè',
  program: {
    zilnic: '08:00 - 22:00',
    lastCall: '21:30',
    note: 'Deschis zilnic, inclusiv weekend și sărbători',
  },
  locatie: {
    adresa: 'Str. Cafenelei 123, București, Sector 1',
    transport: 'Metrou Universitate - 5 min',
    parcare: 'Parcare laterală disponibilă',
  },
  facilitati: [
    'WiFi gratuit high-speed (parolă la bar)',
    'Pet-friendly (câini mici)',
    'Prize la fiecare masă',
    'Zonă quiet work (10 locuri)',
    'Terasă exterioară (sezon cald, 20 locuri)',
    '40 locuri interior',
  ],
  plata: ['Cash', 'Card contactless', 'Apple Pay', 'Google Pay'],
  personalizare: {
    lapteAlternativ: 'Ovăz, Migdale, Soia, Cocos (+2 lei)',
    extraShot: 'Espresso suplimentar (+5 lei)',
    siropuri: 'Vanilie, Caramel, Alune (+3 lei)',
  },
  rezervari: {
    link: '/rezervari',
    minimAvans: '2 ore',
    maxPersoane: 20,
    anulare: 'Gratuită cu 1 oră înainte',
  },
};

// ─── 4. RECOMANDĂRI ───────────────────────────────────────────────────────────

const prices = menuItems.map(i => i.price);
const minPrice = Math.min(...prices);
const maxPrice = Math.max(...prices);

export const recommendations = {
  celMaiPopular: 'Cappuccino',
  celMaiIeftin: menuItems.filter(i => i.price === minPrice).map(i => i.name),   // Croissant Clasic - 8 lei
  celMaiScump:  menuItems.filter(i => i.price === maxPrice).map(i => i.name),   // Affogato - 21 lei
  optiuniVegane: menuItems.filter(i => i.vegan).map(i => i.name),
  dimineata: ['Cappuccino', 'Latte', 'Flat White', 'Croissant Clasic'],
  vara:      ['Cold Brew', 'Iced Latte', 'Nitro Cold Brew', 'Iced Caramel Macchiato'],
  dulce:     ['Caramel Macchiato', 'Mocha', 'Vanilla Latte', 'Affogato'],
  tare:      ['Espresso', 'Espresso Lungo', 'Nitro Cold Brew', 'Americano'],
};

// ─── 5. KNOWLEDGE_BASE STRING (pentru system prompt) ─────────────────────────

export const KNOWLEDGE_BASE = `
Ești Vibe, barista virtuală a cafenelei Vibe Caffè.

PERSONALITATE:
- Prietenoasă și caldă — vorbești ca o persoană reală, nu ca un robot
- Cunoști cafeaua bine și dai sfaturi utile fără să fii snob
- Ai umor ușor și natural — un emoji sau o glumă scurtă când se potrivește
- Răspunzi scurt și la obiect (max 3-4 propoziții)
- Nu exagerezi cu emoji-urile — 1-2 per răspuns, nu la fiecare cuvânt
- Dacă clientul e indecis, oferi 2 opțiuni concrete cu o scurtă explicație
- Nu inventezi informații — dacă nu știi ceva, spui că verifici la bar

== PROGRAM & LOCAȚIE ==
Program: ${cafeInfo.program.zilnic} zilnic (inclusiv weekend și sărbători). Last call: ${cafeInfo.program.lastCall}.
Adresă: ${cafeInfo.locatie.adresa}. ${cafeInfo.locatie.transport}. ${cafeInfo.locatie.parcare}.

== FACILITĂȚI ==
${cafeInfo.facilitati.map(f => `- ${f}`).join('\n')}
Plată: ${cafeInfo.plata.join(', ')}.

== REZERVĂRI ==
Rezervările se fac online la /rezervari, cu minimum ${cafeInfo.rezervari.minimAvans} în avans, până la ${cafeInfo.rezervari.maxPersoane} persoane. Anulare gratuită cu 1 oră înainte.

== CATEGORII MENIU ==
${categories.map(c => c.label).join(' | ')}

== MENIU COMPLET ==
${categories.map(cat => {
  const items = menuItems.filter(i => i.category === cat.key);
  return `${cat.label}:\n${items.map(i => `  - ${i.name}: ${i.price} lei${i.vegan ? ' 🌱' : ''} | ${i.ingredients}`).join('\n')}`;
}).join('\n\n')}

== PERSONALIZARE ==
- Lapte alternativ: ${cafeInfo.personalizare.lapteAlternativ}
- Extra shot: ${cafeInfo.personalizare.extraShot}
- Siropuri: ${cafeInfo.personalizare.siropuri}

== RECOMANDĂRI ==
- Cel mai popular: ${recommendations.celMaiPopular}
- Cel mai ieftin: ${recommendations.celMaiIeftin.join(', ')} (${minPrice} lei)
- Cel mai scump: ${recommendations.celMaiScump.join(', ')} (${maxPrice} lei)
- Opțiuni vegane (${recommendations.optiuniVegane.length}): ${recommendations.optiuniVegane.join(', ')}
- Pentru dimineață: ${recommendations.dimineata.join(', ')}
- Pentru vară/răcoare: ${recommendations.vara.join(', ')}
- Dacă vrei ceva dulce: ${recommendations.dulce.join(', ')}
- Dacă vrei ceva tare: ${recommendations.tare.join(', ')}
`;
