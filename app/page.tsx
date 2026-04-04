import HeroStarter from '@/components/HeroStarter';
import FeaturesStarter from '@/components/FeaturesStarter';
import About from '@/components/About';
import FooterStarter from '@/components/FooterStarter';
import Preloader from '@/components/Preloader';
import ReviewBar from '@/components/ReviewBar';
import ScrollAnimations from '@/components/ScrollAnimations';

export const metadata = {
  title: 'Vibe Caffè — Cafea de Specialitate în București',
  description:
    'Cafea bună. Oameni buni. Un loc al tău în centrul Bucureștiului. ' +
    'Rezervă masă online. Bld. Regina Elisabeta 30, Sector 5.',
  openGraph: {
    title: 'Vibe Caffè — Cafea de Specialitate în București',
    description:
      'Cafea bună. Oameni buni. Un loc al tău în centrul Bucureștiului.',
    url: 'https://vibe-website2.vercel.app',
    siteName: 'Vibe Caffè',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Interiorul Vibe Caffè' }],
    locale: 'ro_RO',
    type: 'website',
  },
};

// Primele 6 produse pentru preview SSR
const previewItems = [
  { name: 'Flat White', price: 17, alt: 'Flat White servit în ceașcă albă pe farfurioară de lemn, 17 lei', image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&auto=format&fit=crop' },
  { name: 'Cappuccino', price: 16, alt: 'Cappuccino cu spumă de lapte cremoasă, 16 lei', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop' },
  { name: 'Cold Brew Tonic', price: 22, alt: 'Cold Brew Tonic cu portocală și gheață, 22 lei', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop' },
  { name: 'Cheesecake', price: 22, alt: 'Felie de Cheesecake New York cu sos de fructe, 22 lei', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop' },
  { name: 'Croissant cu Unt', price: 14, alt: 'Croissant cu unt proaspăt, crocant, 14 lei', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop' },
  { name: 'Brownie', price: 18, alt: 'Brownie cu ciocolată neagră și nuci, 18 lei', image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&auto=format&fit=crop' },
];

// Produse sezoniere pentru preview SSR
const seasonalPreview = [
  { name: 'Latte de Lavandă', price: 20, alt: 'Latte de Lavandă cu sirop artizanal, 20 lei', desc: 'Espresso, lapte microspumat și sirop de lavandă. Disponibil: aprilie–iunie.', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop' },
  { name: 'Cold Brew Tonic', price: 22, alt: 'Cold Brew Tonic cu portocală și gheață, 22 lei', desc: 'Cold brew, apă tonică și portocală proaspătă. Disponibil: tot sezonul.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop' },
  { name: 'Brunch Festiv de Weekend', price: 36, alt: 'Brunch Festiv de Weekend cu Eggs Benedict, granola și cafea de specialitate, 36 lei', desc: 'Eggs Benedict, granola, fresh și cafea de specialitate. Disponibil: sâmbătă și duminică.', image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&auto=format&fit=crop' },
];

export default function Home() {
  return (
    <>
      <Preloader />

      {/* Hero SSR */}
      <section className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center text-center px-6">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)]">
            Cafea bună. Oameni buni. Un loc al tău.
          </h1>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Meniu clar, rezervări rapide și locație ușor de găsit în centrul Bucureștiului.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/meniu" className="px-8 py-4 bg-espresso-800 hover:bg-espresso-900 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105">
              Vezi meniul
            </a>
            <a href="/rezervari" className="px-8 py-4 bg-oliv-600 hover:bg-oliv-800 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105">
              Rezervă masă
            </a>
          </div>
        </div>
      </section>

      <ScrollAnimations />

      <ReviewBar />

      {/* Beneficii SSR */}
      <section id="de-ce-vibe" className="py-20 px-6 bg-white animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 font-[family-name:var(--font-playfair)]">De ce Vibe?</h2>
          <p className="text-lg text-gray-500 text-center mb-12">Diferențiatori concreți, nu afirmații vagi.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Cafea de specialitate',
                desc: 'Boabe selectate din origini single-origin, preparate după rețete calibrate pentru consistență în fiecare ceașcă.',
                icon: '☕',
              },
              {
                title: 'Spațiu work-friendly',
                desc: 'Wi-Fi stabil, prize la fiecare masă și o atmosferă care face munca mai plăcută. Potrivit pentru întâlniri și sesiuni de lucru.',
                icon: '💻',
              },
              {
                title: 'Weekend & deserturi',
                desc: 'Meniu special disponibil în fiecare weekend, cu ingrediente proaspete și deserturi de patiserie artizanală.',
                icon: '🥐',
              },
              {
                title: 'Locație centrală',
                desc: 'Bld. Regina Elisabeta 30, Sector 5 — ușor de găsit, aproape de centrul Bucureștiului, cu acces facil din mai multe zone.',
                icon: '📍',
              },
            ].map((card) => (
              <div key={card.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Meniu SSR */}
      <section className="py-20 px-6 bg-gray-50 animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 font-[family-name:var(--font-playfair)]">Din meniul nostru</h2>
          <p className="text-lg text-gray-500 text-center mb-12">Cafea bună. Oameni buni. Un loc al tău.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {previewItems.map((item) => (
              <div key={item.name} className="bg-white rounded-2xl shadow-sm overflow-hidden group">
                <div className="h-40 overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="font-semibold text-gray-900">{item.name}</span>
                  <span className="text-teal-600 font-bold">{item.price} lei</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href="/meniu" className="px-8 py-4 bg-espresso-800 hover:bg-espresso-900 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 inline-block">
              Vezi meniul complet
            </a>
          </div>
        </div>
      </section>

      {/* Oferte sezoniere SSR */}
      <section className="py-20 px-6 bg-white animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 font-[family-name:var(--font-playfair)]">Oferte sezoniere</h2>
          <p className="text-lg text-gray-500 text-center mb-12">Produse disponibile în această perioadă.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {seasonalPreview.map((item) => (
              <div key={item.name} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-teal-100 group">
                <div className="h-48 overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    <span className="text-teal-600 font-bold whitespace-nowrap ml-2">{item.price} lei</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href="/sarbatori" className="px-8 py-4 bg-oliv-600 hover:bg-oliv-800 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 inline-block">
              Vezi toate ofertele sezoniere
            </a>
          </div>
        </div>
      </section>

      {/* CTA secundar rezervare */}
      <section className="bg-espresso-800 dark:bg-espresso-900 py-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-3 font-[family-name:var(--font-playfair)]">
          Ți-a plăcut ce ai văzut?
        </h2>
        <p className="text-crem-100 mb-8 text-base max-w-md mx-auto">
          Rezervă o masă acum și garantăm locul tău.
        </p>
        <a
          href="/rezervari"
          className="inline-block bg-oliv-600 hover:bg-oliv-800 text-white font-bold px-8 py-4 rounded-full text-lg transition-colors duration-200"
        >
          Rezervă masă
        </a>
      </section>

      {/* Locație rapidă SSR */}
      <section className="py-20 px-6 bg-gray-900 text-white animate-on-scroll">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 font-[family-name:var(--font-playfair)]">Unde ne găsești</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div>
              <div className="text-3xl mb-3">📍</div>
              <p className="font-semibold text-lg">Adresă</p>
              <p className="text-gray-200">Bld. Regina Elisabeta 30, Sector 5, București</p>
            </div>
            <div>
              <div className="text-3xl mb-3">🕐</div>
              <p className="font-semibold text-lg">Program</p>
              <p className="text-gray-200">Luni–Vineri 08:00–22:00</p>
              <p className="text-gray-200">Sâmbătă–Duminică 09:00–23:00</p>
            </div>
            <div>
              <div className="text-3xl mb-3">📞</div>
              <p className="font-semibold text-lg">Telefon</p>
              <a href="tel:+40721234567" className="text-teal-400 hover:text-teal-300">+40 721 234 567</a>
            </div>
          </div>
          <a
            href="https://maps.google.com/?q=Bld.+Regina+Elisabeta+30+Bucuresti"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-espresso-800 hover:bg-espresso-900 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 inline-block"
          >
            Deschide în Google Maps
          </a>
        </div>
      </section>

      <div className="animate-on-scroll">
        <About />
      </div>
      <FooterStarter />

      {/* JSON-LD LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CafeOrCoffeeShop',
            name: 'Vibe Caffè',
            url: 'https://vibe-website2.vercel.app',
            telephone: '+40721234567',
            email: 'contact@vibecaffe.ro',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Bulevardul Regina Elisabeta 30',
              addressLocality: 'București',
              postalCode: '050016',
              addressCountry: 'RO',
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '08:00',
                closes: '22:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Saturday', 'Sunday'],
                opens: '09:00',
                closes: '23:00',
              },
            ],
            servesCuisine: ['Coffee', 'Brunch', 'Desserts'],
            priceRange: '$$',
            menu: 'https://vibe-website2.vercel.app/meniu',
          }),
        }}
      />
    </>
  );
}
