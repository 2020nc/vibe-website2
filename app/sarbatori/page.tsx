import { createClient } from '@supabase/supabase-js';
import FooterStarter from '@/components/FooterStarter';

export const metadata = {
  title: 'Oferte Sezoniere & Sărbători | Vibe Caffè București',
  description:
    'Brunch festiv, cafea sezonieră și pachete cadou. ' +
    'Disponibile la Vibe Caffè, Bld. Regina Elisabeta 30, București.',
};

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

function calcHolidayPrice(price: number, cfg: HolidayConfig): number {
  if (cfg.discount_type === 'percent')
    return Math.round((price - (price * cfg.discount_amount) / 100) * 100) / 100;
  return Math.round((price - cfg.discount_amount) * 100) / 100;
}

function getDiscountBadge(cfg: HolidayConfig): string {
  return cfg.discount_type === 'percent'
    ? `-${cfg.discount_amount}%`
    : `-${cfg.discount_amount} RON`;
}

async function getHolidayData(): Promise<{ items: MenuItem[]; cfg: HolidayConfig | null }> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID!;
    const [menuRes, holidayRes] = await Promise.all([
      supabase.from('menu_items').select('*').eq('available', true).eq('tenant_id', tenantId).order('category').order('sort_order'),
      supabase.from('holiday_config').select('*').eq('id', 1).single(),
    ]);

    return {
      items: (menuRes.data as MenuItem[]) ?? [],
      cfg: (holidayRes.data as HolidayConfig) ?? null,
    };
  } catch {
    return { items: [], cfg: null };
  }
}

const staticOffers = [
  {
    title: 'Brunch Festiv de Weekend',
    description: 'Eggs Benedict, granola, fresh și cafea de specialitate',
    price: 'de la 36 lei',
    available: 'Sâmbătă și duminică',
    ctaLabel: 'Rezervă loc',
    ctaHref: '/rezervari',
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&auto=format&fit=crop',
  },
  {
    title: 'Coffee Tonic cu Portocală',
    description: 'Cold brew, apă tonică și portocală proaspătă',
    price: '22 lei',
    available: 'Tot sezonul',
    ctaLabel: 'Vezi meniul',
    ctaHref: '/#menu',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&auto=format&fit=crop',
  },
  {
    title: 'Latte de Lavandă',
    description: 'Espresso, lapte microspumat și sirop de lavandă',
    price: '20 lei',
    available: 'Aprilie – Iunie',
    ctaLabel: 'Comandă acum',
    ctaHref: '/rezervari',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&auto=format&fit=crop',
  },
  {
    title: 'Pachet Cadou Vibe',
    description: 'Cafea de specialitate + dulciuri + card cadou personalizat',
    price: 'de la 80 lei',
    available: 'La cerere',
    ctaLabel: 'Contactează-ne',
    ctaHref: 'tel:+40721234567',
    image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&auto=format&fit=crop',
  },
];

export default async function SarbatoriPage() {
  const { items, cfg } = await getHolidayData();
  const hasHoliday = cfg !== null && items.length > 0;
  const staticOffersFiltered = hasHoliday
    ? staticOffers.filter(o => !items.some(i => i.name.toLowerCase() === o.title.toLowerCase()))
    : staticOffers;

  return (
    <>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">

        {/* HERO */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24 px-6 text-center">
          {cfg && (
            <span className="inline-block bg-secondary text-white text-sm font-bold px-4 py-1 rounded-full mb-6 uppercase tracking-widest">
              {cfg.label}
            </span>
          )}
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Oferte <span className="text-teal-300">Sezoniere</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Produse speciale și reduceri disponibile în această perioadă la Vibe Caffè
          </p>
          {cfg && (
            <p className="mt-4 text-teal-300 font-semibold text-lg">
              {getDiscountBadge(cfg)} la toate băuturile din meniu
            </p>
          )}
        </div>

        {/* MENIU CU PREȚURI DE SĂRBĂTOARE */}
        {hasHoliday && cfg && (
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Meniu cu prețuri de <span className="text-primary">sărbătoare</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Reducere aplicată automat: <strong className="text-secondary">{getDiscountBadge(cfg)}</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => {
                const finalPrice = calcHolidayPrice(item.price, cfg);
                return (
                  <div
                    key={item.id}
                    className="glass glass-hover rounded-2xl overflow-hidden"
                  >
                    {item.image_url && (
                      <div className="h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                          {item.name}
                        </h3>
                        <div className="text-right">
                          <span className="text-gray-400 line-through text-sm block">
                            {item.price} lei
                          </span>
                          <span className="text-2xl font-bold text-orange-700 dark:text-orange-400">
                            {finalPrice} lei
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        {item.category}
                      </p>
                      {item.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* OFERTE SEZONIERE CURATE */}
        <div className={`max-w-7xl mx-auto px-6 ${hasHoliday ? 'pb-16' : 'py-16'}`}>
          {hasHoliday && (
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Oferte <span className="text-secondary">speciale</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Experiențe curate pentru această perioadă
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {staticOffersFiltered.map((offer) => (
              <div
                key={offer.title}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow group"
              >
                <div className="h-56 overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                      {offer.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{offer.description}</p>
                    <p className="text-teal-700 dark:text-teal-400 font-bold text-xl mb-1">{offer.price}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{offer.available}</p>
                  </div>
                  <a
                    href={offer.ctaHref}
                    className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 inline-block text-center"
                  >
                    {offer.ctaLabel}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/#menu"
              className="px-8 py-4 bg-gray-900 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 inline-block"
            >
              Meniu complet
            </a>
          </div>
        </div>
      </main>

      <FooterStarter />
    </>
  );
}
