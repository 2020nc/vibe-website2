import Link from 'next/link';
import { getSupabase } from '@/lib/supabase';
import MenuStarter from '@/components/MenuStarter';

export const revalidate = 3600;

export const metadata = {
  title: 'Meniu & Prețuri',
  description:
    'Meniu complet cu prețuri: cafea de specialitate, deserturi și ' +
    'produse sezoniere. Vibe Caffè, Bld. Regina Elisabeta 30, București.',
  openGraph: {
    title: 'Meniu & Prețuri | Vibe Caffè',
    description: 'Cafea bună. Oameni buni. Un loc al tău. Prețuri actualizate, filtre pe categorii.',
  },
};

const menuFallback = [
  { id: 'f1',  name: 'Espresso',         price: 12, category: 'Espresso',  description: 'Extracție dublă, boabe single-origin prăjite săptămânal. · Variante: ristretto / lungo · 60ml',                              image_url: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&auto=format&fit=crop', discount_type: null, discount_amount: null, available: true, sort_order: 1 },
  { id: 'f2',  name: 'Americano',         price: 14, category: 'Espresso',  description: 'Espresso diluat cu apă caldă',                                                                                                             image_url: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=600&auto=format&fit=crop', discount_type: null, discount_amount: null, available: true, sort_order: 2 },
  { id: 'f3',  name: 'Cappuccino',        price: 16, category: 'Espresso',  description: 'Espresso, lapte și spumă în proporții egale, clasic și consistent. · Variante: vacă / ovăz · 180ml',                                    image_url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop', discount_type: null, discount_amount: null, available: true, sort_order: 3 },
  { id: 'f4',  name: 'Flat White',        price: 17, category: 'Espresso',  description: 'Dublu espresso cu lapte microspumat fin, echilibrat și cremos. · Variante: vacă / ovăz / fără lactoză · 180ml',                         image_url: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&auto=format&fit=crop', discount_type: null, discount_amount: null, available: true, sort_order: 4, tag: 'Bestseller' },
  { id: 'f5',  name: 'Latte',             price: 17, category: 'Espresso',  description: 'Espresso cu lapte abundant',                                                                                                               image_url: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=600&auto=format&fit=crop', discount_type: null, discount_amount: null, available: true, sort_order: 5 },
  { id: 'f6',  name: 'V60 Pour Over',     price: 22, category: 'Specialty', description: 'Filtru manual, aromă curată și complexă',                                                                                                 image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop', discount_type: null, discount_amount: null, available: true, sort_order: 1 },
  { id: 'f7',  name: 'AeroPress',         price: 20, category: 'Specialty', description: 'Extracție sub presiune, corp plin',                                                                                                       image_url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop', discount_type: null, discount_amount: null, available: true, sort_order: 2 },
  { id: 'f8',  name: 'Cold Brew Classic', price: 18, category: 'Cold Brew', description: 'Infuzie la rece 18 ore, gust catifelat și fără aciditate. · Variante: clasic / lapte de ovăz · 300ml',                                           image_url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop', discount_type: null, discount_amount: null, available: true, sort_order: 1 },
  { id: 'f9',  name: 'Cold Brew Tonic',   price: 22, category: 'Cold Brew', description: 'Cold brew cu apă tonică și portocală proaspătă, răcoritor și ușor amărui. · Variante: clasic · 350ml',                                   image_url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop', discount_type: null, discount_amount: null, available: true, sort_order: 2, tag: 'Sezonier' },
  { id: 'f9b', name: 'Nitro Cold Brew',   price: 24, category: 'Cold Brew', description: 'Cold brew cu azot, textură cremoasă și spumoasă fără lapte. · Variante: doar clasic · 250ml',                                              image_url: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?w=600&auto=format&fit=crop', discount_type: null, discount_amount: null, available: true, sort_order: 3, tag: 'Signature' },
  { id: 'f9c', name: 'Iced Latte',        price: 19, category: 'Cold Brew', description: 'Espresso dublu cu lapte rece și gheață, echilibrat și răcoritor. · Variante: vacă / ovăz / migdale · 350ml',                               image_url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop', discount_type: null, discount_amount: null, available: true, sort_order: 4, tag: null },
  { id: 'f9d', name: 'Iced Matcha Latte', price: 21, category: 'Cold Brew', description: 'Matcha japonez ceremonial cu lapte de ovăz și gheață. · Variante: ovăz / vacă · 300ml',                                                    image_url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop', discount_type: null, discount_amount: null, available: true, sort_order: 5, tag: 'Staff Pick' },
  { id: 'f10', name: 'Croissant cu Unt',  price: 14, category: 'Patiserie', description: 'Foietaj franțuzesc, crocant și aromat',                                                                                                   image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop', discount_type: null, discount_amount: null, available: true, sort_order: 1 },
  { id: 'f11', name: 'Cheesecake',        price: 22, category: 'Patiserie', description: 'Cremă de brânză pe blat de biscuite',                                                                                                     image_url: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop', discount_type: null, discount_amount: null, available: true, sort_order: 2 },
  { id: 'f12', name: 'Brownie',           price: 18, category: 'Patiserie', description: 'Ciocolată neagră intensă, nucă pecane',                                                                                                   image_url: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&auto=format&fit=crop', discount_type: null, discount_amount: null, available: true, sort_order: 3 },
];

export default async function MeniuPage() {
  let initialItems = menuFallback;

  try {
    const supabase = getSupabase();
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID!;
    const { data } = await supabase
      .from('menu_items')
      .select('*')
      .eq('available', true)
      .eq('tenant_id', tenantId)
      .order('category')
      .order('sort_order')
      .order('name');

    if (data && data.length > 0) {
      initialItems = data;
    }
  } catch {
    // folosim fallback-ul
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Meniu Vibe Caffè</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Cafea bună. Oameni buni. Un loc al tău.
        </p>
      </div>

      {/* Meniu interactiv — conținut SSR-at cu date server-side */}
      <div id="produse">
        <MenuStarter initialItems={initialItems} />
      </div>

      {/* CTA */}
      <div className="text-center py-12 px-6 bg-white border-t border-gray-100">
        <p className="text-lg text-gray-600 mb-6">Vrei să rezervi o masă?</p>
        <Link
          href="/rezervari"
          className="px-8 py-4 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 inline-block"
        >
          Rezervă masă
        </Link>
      </div>
    </main>
  );
}
