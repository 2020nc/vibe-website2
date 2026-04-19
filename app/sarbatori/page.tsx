import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import FooterStarter from '@/components/FooterStarter';

export const metadata = {
  title: 'Oferte Sezoniere & Sărbători | Vibe Caffe București',
  description:
    'Brunch festiv, cafea sezonieră și pachete cadou. ' +
    'Disponibile la Vibe Caffe, Bld. Regina Elisabeta 30, București.',
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
  if (cfg.discount_type === 'percent') {
    return Math.round((price - (price * cfg.discount_amount) / 100) * 100) / 100;
  }

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
      supabase
        .from('menu_items')
        .select('*')
        .eq('available', true)
        .eq('tenant_id', tenantId)
        .order('category')
        .order('sort_order'),
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
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1200&auto=format&fit=crop&q=70',
  },
  {
    title: 'Coffee Tonic cu Portocală',
    description: 'Cold brew, apă tonică și portocală proaspătă',
    price: '22 lei',
    available: 'Tot sezonul',
    ctaLabel: 'Vezi meniul',
    ctaHref: '/#menu',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=1200&auto=format&fit=crop&q=70',
  },
  {
    title: 'Latte de Lavandă',
    description: 'Espresso, lapte microspumat și sirop de lavandă',
    price: '20 lei',
    available: 'Aprilie - Iunie',
    ctaLabel: 'Comandă acum',
    ctaHref: '/rezervari',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1200&auto=format&fit=crop&q=70',
  },
  {
    title: 'Pachet Cadou Vibe',
    description: 'Cafea de specialitate + dulciuri + card cadou personalizat',
    price: 'de la 80 lei',
    available: 'La cerere',
    ctaLabel: 'Contactează-ne',
    ctaHref: 'tel:+40721234567',
    image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=1200&auto=format&fit=crop&q=70',
  },
];

export default async function SarbatoriPage() {
  const { items, cfg } = await getHolidayData();
  const hasHoliday = cfg !== null && items.length > 0;
  const staticOffersFiltered = hasHoliday
    ? staticOffers.filter((offer) => !items.some((item) => item.name.toLowerCase() === offer.title.toLowerCase()))
    : staticOffers;

  return (
    <>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-6 py-24 text-center text-white">
          {cfg && (
            <span className="mb-6 inline-block rounded-full bg-orange-600 px-4 py-1 text-sm font-bold uppercase tracking-widest text-white">
              {cfg.label}
            </span>
          )}
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            Oferte <span className="text-teal-300">Sezoniere</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-200">
            Produse speciale și reduceri disponibile în această perioadă la Vibe Caffe
          </p>
          {cfg && (
            <p className="mt-4 text-lg font-semibold text-teal-200">
              {getDiscountBadge(cfg)} la toate băuturile din meniu
            </p>
          )}
        </div>

        {hasHoliday && cfg && (
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
                Meniu cu prețuri de <span className="text-primary">sărbătoare</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Reducere aplicată automat:{' '}
                <strong className="text-orange-700 dark:text-orange-300">{getDiscountBadge(cfg)}</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => {
                const finalPrice = calcHolidayPrice(item.price, cfg);

                return (
                  <div key={item.id} className="glass glass-hover overflow-hidden rounded-2xl">
                    {item.image_url && (
                      <div className="h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          width={800}
                          height={384}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          quality={60}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="mb-2 flex items-start justify-between">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{item.name}</h3>
                        <div className="text-right">
                          <span className="block text-sm text-gray-600 line-through">
                            {item.price} lei
                          </span>
                          <span className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                            {finalPrice} lei
                          </span>
                        </div>
                      </div>
                      <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">{item.category}</p>
                      {item.description && (
                        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-200">
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

        <div className={`mx-auto max-w-7xl px-6 ${hasHoliday ? 'pb-16' : 'py-16'}`}>
          {hasHoliday && (
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
                Oferte <span className="text-orange-700 dark:text-orange-300">speciale</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Experiențe curate pentru această perioadă
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {staticOffersFiltered.map((offer) => (
              <div
                key={offer.title}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800"
              >
                <div className="h-56 overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    width={900}
                    height={448}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={60}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-8">
                  <div>
                    <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {offer.title}
                    </h2>
                    <p className="mb-2 text-gray-700 dark:text-gray-300">{offer.description}</p>
                    <p className="mb-1 text-xl font-bold text-teal-700 dark:text-teal-300">{offer.price}</p>
                    <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">{offer.available}</p>
                  </div>
                  <a
                    href={offer.ctaHref}
                    className="inline-block rounded-full bg-primary px-6 py-3 text-center font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-primary-dark"
                  >
                    {offer.ctaLabel}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/#menu"
              className="inline-block rounded-full bg-gray-900 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
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
