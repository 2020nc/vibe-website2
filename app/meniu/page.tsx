import { menuData } from '@/lib/menuData';

export const metadata = {
  title: 'Meniu & Prețuri | Vibe Caffè București',
  description:
    'Meniu complet cu prețuri: cafea de specialitate, brunch, deserturi și ' +
    'produse sezoniere. Vibe Caffè, Bld. Regina Elisabeta 30, București.',
};

const extendedMenu = {
  'Cafea & Băuturi': [
    { name: 'Espresso', price: 12 },
    { name: 'Americano', price: 14 },
    { name: 'Flat White', price: 17 },
    { name: 'Cappuccino', price: 16 },
    { name: 'Latte', price: 17 },
    { name: 'Cold Brew', price: 20 },
    { name: 'Coffee Tonic', price: 22, tag: 'seasonal' as const },
    { name: 'V60 Pour Over', price: 22 },
    { name: 'AeroPress', price: 20 },
    { name: 'Nitro Cold Brew', price: 24 },
  ],
  'Brunch': [
    { name: 'Avocado Toast', price: 32 },
    { name: 'Eggs Benedict', price: 36 },
    { name: 'Pancakes cu fructe', price: 28 },
    { name: 'Granola cu iaurt', price: 24 },
    { name: 'Brunch Board', price: 45, tag: 'bestseller' as const },
  ],
  'Deserturi & Patiserie': [
    { name: 'Tiramisu', price: 22 },
    { name: 'Cheesecake', price: 24 },
    { name: 'Croissant cu Unt', price: 14 },
    { name: 'Brownie', price: 18 },
    { name: 'Carrot Cake', price: 20 },
    { name: 'Banana Bread', price: 16 },
  ],
  'Sezonier': [
    { name: 'Latte de lavandă', price: 20, tag: 'seasonal' as const },
    { name: 'Brunch festiv', price: 36, tag: 'seasonal' as const },
    { name: 'Cold Brew Tonic cu Portocală', price: 22, tag: 'seasonal' as const },
  ],
};

const tagColors: Record<string, string> = {
  bestseller: 'bg-orange-100 text-orange-700',
  seasonal: 'bg-teal-100 text-teal-700',
};

const tagLabels: Record<string, string> = {
  bestseller: 'Bestseller',
  seasonal: 'Sezonier',
};

export default function MeniuPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Meniu Vibe Caffè</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Cafea de specialitate, brunch și deserturi în centrul Bucureștiului
        </p>
      </div>

      {/* Meniu pe categorii */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {Object.entries(extendedMenu).map(([category, items]) => (
          <section key={category}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-3 border-b-2 border-teal-500">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <div
                  key={item.name}
                  className="bg-white rounded-2xl p-5 shadow-sm flex justify-between items-center hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-gray-900">{item.name}</span>
                    {'tag' in item && item.tag && (
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full w-fit ${tagColors[item.tag]}`}>
                        {tagLabels[item.tag]}
                      </span>
                    )}
                  </div>
                  <span className="text-teal-600 font-bold text-lg whitespace-nowrap ml-4">
                    {item.price} lei
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center py-12 px-6 bg-white border-t border-gray-100">
        <p className="text-lg text-gray-600 mb-6">Vrei să rezervi o masă?</p>
        <a
          href="/rezervari"
          className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 inline-block"
        >
          Rezervă masă
        </a>
      </div>
    </main>
  );
}
