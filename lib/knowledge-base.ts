/**
 * 📚 KNOWLEDGE BASE - Baza de cunoștințe Vibe Caffè
 *
 * Toate informațiile pe care bot-ul le cunoaște despre:
 * - Produse și meniu
 * - Informații despre cafea
 * - Locație și program
 * - Politici și facilități
 */

export const VIBE_COFFEE_KNOWLEDGE = {
  // 🏢 INFORMAȚII BUSINESS
  business: {
    name: "Vibe Caffè",
    tagline: "Cafeaua ta preferată, perfect preparată",
    description: "Cafenea de specialitate în inima Bucureștiului",
    founded: "2020",
    mission: "Experiență autentică a cafelei de specialitate într-un ambient modern și prietenos",
  },

  // 📍 LOCAȚIE & CONTACT
  location: {
    address: "Str. Cafenelei 123, București, Sector 1",
    phone: "0721 234 567",
    email: "hello@vibecoffee.ro",
    website: "https://vibe-website-rho.vercel.app",
    reservations: "https://vibe-website-rho.vercel.app/rezervari",
    googleMaps: "https://maps.google.com/...",
  },

  // ⏰ PROGRAM
  schedule: {
    weekdays: "Luni - Vineri: 08:00 - 22:00",
    weekend: "Sâmbătă - Duminică: 08:00 - 22:00",
    holidays: "Deschis și în weekend și sărbători",
    lastCall: "21:30",
    reservationsAdvance: "Minimum 2 ore în avans",
  },

  // 🏪 FACILITĂȚI
  facilities: {
    wifi: {
      available: true,
      password: "vibecoffee2024",
      description: "WiFi gratuit, high-speed",
    },
    seating: {
      indoor: "40 locuri",
      outdoor: "20 locuri terasă (sezon cald)",
      quietWork: "10 locuri zona work",
    },
    amenities: [
      "Prize la fiecare masă",
      "Pet-friendly (câini mici)",
      "Parcare laterală disponibilă",
      "Metrou Universitate - 5 min",
      "Spațiu quiet work",
      "Terasă exterioară (vară)",
    ],
    payment: ["Cash", "Card contactless", "Apple Pay", "Google Pay"],
    delivery: ["Glovo", "Bolt Food", "Tazz", "Ridicare (5% discount)"],
  },

  // ☕ MENIU COMPLET (30 produse)
  menu: {
    "Espresso Classics": [
      {
        name: "Espresso",
        price: 12,
        description: "Shot dublu de espresso intens, aromat",
        ingredients: "18g cafea, 36ml extract",
        vegan: true,
        caffeine: "High",
        bestFor: "Wake up, after meals",
      },
      {
        name: "Cappuccino",
        price: 15,
        description: "Espresso cu spumă de lapte cremoasă",
        ingredients: "Espresso + lapte spumat",
        vegan: false,
        veganOption: "Disponibil cu lapte vegetal (+2 lei)",
        caffeine: "Medium",
        bestFor: "Dimineața, mic dejun",
      },
      {
        name: "Latte",
        price: 16,
        description: "Espresso cu lapte, echilibrat și cremos",
        ingredients: "Espresso + lapte + spumă fină",
        vegan: false,
        veganOption: true,
        caffeine: "Medium",
        bestFor: "Oricând, versatil",
      },
      {
        name: "Americano",
        price: 13,
        description: "Espresso diluat cu apă fierbinte",
        ingredients: "Espresso + apă caldă",
        vegan: true,
        caffeine: "High",
        bestFor: "Long drink, cafea clasică",
      },
      {
        name: "Flat White",
        price: 17,
        description: "Espresso cu microfoam, Australian style",
        ingredients: "Ristretto + microfoam lapte",
        vegan: false,
        veganOption: true,
        caffeine: "High",
        bestFor: "Connoisseurs, textură silky",
      },
      {
        name: "Macchiato",
        price: 13,
        description: "Espresso 'marcat' cu spumă de lapte",
        ingredients: "Espresso + pic de spumă",
        vegan: false,
        veganOption: true,
        caffeine: "High",
        bestFor: "Strong cu o notă de lapte",
      },
    ],
    "Specialty Coffee": [
      {
        name: "Affogato",
        price: 20,
        description: "Înghețată vanilie înecată în espresso",
        ingredients: "Înghețată + espresso shot",
        vegan: false,
        caffeine: "Medium",
        bestFor: "Desert, afternon treat",
      },
      {
        name: "Mocha",
        price: 18,
        description: "Latte cu ciocolată belgiană",
        ingredients: "Espresso + lapte + ciocolată",
        vegan: false,
        veganOption: true,
        caffeine: "Medium",
        bestFor: "Sweet tooth, indulgence",
      },
      {
        name: "Caramel Latte",
        price: 18,
        description: "Latte cu sirop caramel premium",
        ingredients: "Espresso + lapte + caramel",
        vegan: false,
        veganOption: true,
        caffeine: "Medium",
        bestFor: "Dulce, creamy",
      },
      {
        name: "Vanilla Latte",
        price: 18,
        description: "Latte aromat cu vanilie Madagascar",
        ingredients: "Espresso + lapte + vanilie",
        vegan: false,
        veganOption: true,
        caffeine: "Medium",
        bestFor: "Aromat, smooth",
      },
    ],
    "Vegan Options": [
      {
        name: "Almond Milk Latte",
        price: 18,
        description: "Latte cu lapte de migdale",
        ingredients: "Espresso + lapte migdale",
        vegan: true,
        caffeine: "Medium",
        bestFor: "Plant-based, ușor dulce",
      },
      {
        name: "Oat Milk Cappuccino",
        price: 17,
        description: "Cappuccino cu lapte de ovăz",
        ingredients: "Espresso + lapte ovăz spumat",
        vegan: true,
        caffeine: "Medium",
        bestFor: "Vegan, spumă excelentă",
      },
      {
        name: "Coconut Milk Mocha",
        price: 19,
        description: "Mocha cu lapte de cocos",
        ingredients: "Espresso + lapte cocos + ciocolată",
        vegan: true,
        caffeine: "Medium",
        bestFor: "Tropical, exotic",
      },
      {
        name: "Soy Latte",
        price: 17,
        description: "Latte cu lapte de soia",
        ingredients: "Espresso + lapte soia",
        vegan: true,
        caffeine: "Medium",
        bestFor: "Classic vegan option",
      },
    ],
    "Cold Brew & Iced": [
      {
        name: "Cold Brew",
        price: 16,
        description: "Cafea cold brew 18h extracție, aromă dulce",
        ingredients: "250ml cold brew + gheață",
        vegan: true,
        caffeine: "Very High",
        bestFor: "Smooth, low acidity, vară",
      },
      {
        name: "Iced Latte",
        price: 17,
        description: "Latte răcoros perfect pentru vară",
        ingredients: "Espresso + lapte rece + gheață",
        vegan: false,
        veganOption: true,
        caffeine: "Medium",
        bestFor: "Refreshing, creamy",
      },
      {
        name: "Nitro Cold Brew",
        price: 19,
        description: "Cold brew infuzat cu nitrogen, textură cremă",
        ingredients: "Cold brew + azot",
        vegan: true,
        caffeine: "Very High",
        bestFor: "Unique texture, premium",
      },
      {
        name: "Iced Americano",
        price: 14,
        description: "Americano servit cu gheață",
        ingredients: "Espresso + apă rece + gheață",
        vegan: true,
        caffeine: "High",
        bestFor: "Simple, strong, refreshing",
      },
    ],
    "Alternative": [
      {
        name: "Matcha Latte",
        price: 18,
        description: "Ceai matcha japonez cu lapte spumat",
        ingredients: "Matcha premium + lapte",
        vegan: false,
        veganOption: true,
        caffeine: "Medium (din matcha)",
        bestFor: "Fără cafea, antioxidanți",
      },
      {
        name: "Chai Latte",
        price: 17,
        description: "Ceai chai cu lapte și mirodenii",
        ingredients: "Chai + lapte + scorțișoară",
        vegan: false,
        veganOption: true,
        caffeine: "Low (din ceai)",
        bestFor: "Warm, spicy, comfort",
      },
    ],
    "Patiserie Artizanală": [
      {
        name: "Croissant",
        price: 12,
        description: "Croissant frantuzesc cu beurre",
        vegan: false,
        bestPairing: "Cappuccino, Latte",
      },
      {
        name: "Pain au Chocolat",
        price: 14,
        description: "Croissant cu ciocolată belgiană",
        vegan: false,
        bestPairing: "Americano, Espresso",
      },
      {
        name: "Brownie",
        price: 15,
        description: "Brownie cu cacao 70%, fudgy",
        vegan: false,
        veganOption: true,
        bestPairing: "Latte, Mocha",
      },
      {
        name: "Cheesecake",
        price: 18,
        description: "Cheesecake New York style",
        vegan: false,
        bestPairing: "Espresso, Americano",
      },
      {
        name: "Tiramisu",
        price: 20,
        description: "Tiramisu clasic cu mascarpone",
        vegan: false,
        bestPairing: "Espresso (traditionele)",
      },
    ],
  },

  // 📖 CUNOȘTINȚE DESPRE CAFEA
  coffeeKnowledge: {
    beanTypes: {
      arabica: "70% producție, aromă complexă, aciditate plăcută, folosim 100% Arabica",
      robusta: "30% producție, cafeine dublă, mai amar, crema mai bună",
    },
    origins: {
      current: "Columbia, Ethiopia, Brazil - rotație sezonieră",
      roast: "Boabe prăjite săptămânal in-house, Medium-Dark roast",
    },
    brewMethods: {
      espresso: "25-30s extracție, presiune 9 bar, temperatură 93°C",
      coldBrew: "18-24h extracție la rece, 67% mai puțin acid",
      pourOver: "Manual, controlat, evidențiază arome",
    },
    milkOptions: {
      whole: "Cel mai creamos, traditional",
      oat: "Cel mai aproape de lapte, spumă excelentă",
      almond: "Ușor dulce, ușor de digerat",
      soy: "Proteine, clasic vegan",
      coconut: "Note tropicale, exotic",
    },
    funFacts: [
      "Cafeaua e fruct (cherry) înainte de a fi bob",
      "Finlanda consumă cel mai mult - 12kg/persoană/an",
      "Espresso înseamnă 'exprimat' în italiană (rapid)",
      "Cold brew are cu 67% mai puțină aciditate",
      "Latte art a început în anii '80 în Seattle",
    ],
  },

  // 🎯 RECOMANDĂRI CONTEXTE
  recommendations: {
    morning: ["Cappuccino", "Croissant", "Latte", "Flat White"],
    afternoon: ["Flat White", "Brownie", "Mocha", "Iced Latte"],
    evening: ["Matcha Latte", "Chai Latte", "Decaf options"],
    study: ["Americano", "Cold Brew", "Latte"],
    sweet: ["Mocha", "Caramel Latte", "Affogato", "Brownie"],
    strong: ["Espresso", "Flat White", "Nitro Cold Brew"],
    mild: ["Latte", "Cappuccino", "Chai Latte"],
    vegan: ["Oat Milk Cappuccino", "Almond Milk Latte", "Cold Brew"],
    summer: ["Cold Brew", "Iced Latte", "Nitro Cold Brew"],
    winter: ["Cappuccino", "Mocha", "Chai Latte"],
  },

  // 📋 POLITICI
  policies: {
    reservations: "Minimum 2 ore în avans, max 8 persoane/rezervare",
    cancellation: "Anulare gratuită cu 1 oră înainte",
    pets: "Pet-friendly pentru câini mici, aducem apă",
    wifi: "Free WiFi, password la bar",
    noise: "Zona quiet work disponibilă",
    allergies: "Anunțați pentru alergii - adaptăm rețetele",
  },
};

// 🤖 PERSONALITATE BOT
export const BOT_PERSONALITY = {
  name: "Vibe",
  role: "Barista virtuală",
  tone: "Prietenos, entuziast, helpful",
  style: "Informal dar respectuos, emoji usage, răspunsuri scurte",
  traits: [
    "Pasionată de cafea",
    "Nu e snob coffee",
    "Empatică și înțelegătoare",
    "Proactivă cu sugestii",
    "Ușor jucăușă",
  ],
  doNot: [
    "Wall of text (max 3-4 propoziții)",
    "Jargon tehnic excesiv",
    "Prea insistent cu vânzarea",
    "Răspunsuri robotice",
  ],
};
