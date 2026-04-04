import FooterStarter from '@/components/FooterStarter';

export const metadata = {
  title: 'Oferte Sezoniere & Sărbători | Vibe Caffè București',
  description:
    'Brunch festiv, cafea sezonieră și pachete cadou. ' +
    'Disponibile la Vibe Caffè, Bld. Regina Elisabeta 30, București.',
};

const offers = [
  {
    title: 'Brunch Festiv de Weekend',
    description: 'Eggs Benedict, granola, fresh și cafea de specialitate',
    price: 'de la 36 lei',
    available: 'Disponibil: sâmbătă și duminică',
    ctaLabel: 'Rezervă loc',
    ctaHref: '/rezervari',
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&auto=format&fit=crop',
  },
  {
    title: 'Coffee Tonic cu Portocală',
    description: 'Cold brew, apă tonică și portocală proaspătă',
    price: '22 lei',
    available: 'Disponibil: tot sezonul',
    ctaLabel: 'Vezi meniul',
    ctaHref: '/meniu',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&auto=format&fit=crop',
  },
  {
    title: 'Latte de Lavandă',
    description: 'Espresso, lapte microspumat și sirop de lavandă',
    price: '20 lei',
    available: 'Disponibil: aprilie–iunie',
    ctaLabel: 'Comandă acum',
    ctaHref: '/rezervari',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&auto=format&fit=crop',
  },
  {
    title: 'Pachet Cadou Vibe',
    description: 'Cafea de specialitate + dulciuri + card cadou personalizat',
    price: 'de la 80 lei',
    available: 'Disponibil: la cerere',
    ctaLabel: 'Contactează-ne',
    ctaHref: 'tel:+40721234567',
    image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&auto=format&fit=crop',
  },
];

export default function SarbatoriPage() {
  return (
    <>
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Meniu de Sărbători & Oferte Sezoniere — Vibe Caffè
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Produse speciale disponibile în această perioadă
        </p>
      </div>

      {/* Carduri oferte */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.title}
              className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow group"
            >
              <div className="h-56 overflow-hidden bg-gray-100">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-8 flex flex-col flex-1 justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{offer.title}</h2>
                  <p className="text-gray-600 mb-2">{offer.description}</p>
                  <p className="text-teal-600 font-bold text-xl mb-1">{offer.price}</p>
                  <p className="text-gray-400 text-sm mb-6">{offer.available}</p>
                </div>
                <a
                  href={offer.ctaHref}
                  className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 inline-block text-center"
                >
                  {offer.ctaLabel}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Link înapoi */}
        <div className="text-center mt-12">
          <a
            href="/meniu"
            className="px-8 py-4 bg-gray-900 hover:bg-gray-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 inline-block"
          >
            Înapoi la meniu complet
          </a>
        </div>
      </div>
    </main>
    <FooterStarter />
    </>
  );
}
