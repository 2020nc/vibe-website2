import dynamic from 'next/dynamic';
import Image from 'next/image';
import DeferredScrollAnimations from '@/components/DeferredScrollAnimations';
import ReviewBar from '@/components/ReviewBar';

const About = dynamic(() => import('@/components/About'));
const DayAtVibe = dynamic(() => import('@/components/DayAtVibe'));
const FooterStarter = dynamic(() => import('@/components/FooterStarter'));
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

const previewItems = [
  {
    name: 'Flat White',
    price: 17,
    alt: 'Flat White servit în ceașcă albă pe farfurioară de lemn, 17 lei',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop',
  },
  {
    name: 'Cappuccino',
    price: 16,
    alt: 'Cappuccino cu spumă de lapte cremoasă, 16 lei',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop',
  },
  {
    name: 'Cold Brew Tonic',
    price: 22,
    alt: 'Cold Brew Tonic cu portocală și gheață, 22 lei',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop',
  },
  {
    name: 'Cheesecake',
    price: 22,
    alt: 'Felie de Cheesecake New York cu sos de fructe, 22 lei',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop',
  },
  {
    name: 'Croissant cu Unt',
    price: 14,
    alt: 'Croissant cu unt proaspăt, crocant, 14 lei',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop',
  },
  {
    name: 'Brownie',
    price: 18,
    alt: 'Brownie cu ciocolată neagră și nuci, 18 lei',
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop',
  },
];

const seasonalPreview = [
  {
    name: 'Latte de Lavandă',
    price: 20,
    alt: 'Latte de Lavandă cu sirop artizanal, 20 lei',
    desc: 'Espresso, lapte microspumat și sirop de lavandă. Disponibil: aprilie–iunie.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop',
  },
  {
    name: 'Cold Brew Tonic',
    price: 22,
    alt: 'Cold Brew Tonic cu portocală și gheață, 22 lei',
    desc: 'Cold brew, apă tonică și portocală proaspătă. Disponibil: tot sezonul.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop',
  },
  {
    name: 'Brunch Festiv de Weekend',
    price: 36,
    alt: 'Brunch Festiv de Weekend cu Eggs Benedict, granola și cafea de specialitate, 36 lei',
    desc: 'Eggs Benedict, granola, fresh și cafea de specialitate. Disponibil: sâmbătă și duminică.',
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop',
  },
];

const benefits = [
  {
    title: 'Cafea de specialitate',
    desc: 'Boabe selectate din origini single-origin, preparate după rețete calibrate pentru consistență în fiecare ceașcă.',
    icon: '☕',
  },
  {
    title: 'Spațiu de lucru',
    desc: 'Wi-Fi stabil, prize la fiecare masă și o atmosferă care face munca mai plăcută. Potrivit pentru întâlniri și sesiuni de lucru.',
    icon: '💻',
  },
  {
    title: 'Deserturi de weekend',
    desc: 'Meniu special disponibil în fiecare weekend, cu ingrediente proaspete și deserturi de patiserie artizanală.',
    icon: '🍰',
  },
  {
    title: 'Locație centrală',
    desc: 'Bld. Regina Elisabeta 30, Sector 5 — ușor de găsit, aproape de centrul Bucureștiului, cu acces facil din mai multe zone.',
    icon: '📍',
  },
];

export default function Home() {
  return (
    <>
      <main>
        <section className="relative min-h-screen px-6 text-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/hero-coffee 2_1_3.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl items-center justify-center">
            <div>
              <h1 className="mb-6 text-5xl font-bold text-white md:text-7xl font-[family-name:var(--font-playfair)]">
                Cafea bună. Oameni buni. Un loc al tău.
              </h1>
              <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-200">
                Meniu clar, rezervări rapide și locație ușor de găsit în centrul Bucureștiului.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href="/meniu"
                  className="rounded-full bg-espresso-800 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-espresso-900"
                >
                  Vezi meniul
                </a>
                <a
                  href="/rezervari"
                  className="rounded-full bg-oliv-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-oliv-800"
                >
                  Rezervă masă
                </a>
              </div>
            </div>
          </div>

          <a
            href="#de-ce-vibe"
            className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/75 transition-colors duration-300 hover:text-teal-300"
            aria-label="Scroll în jos"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </a>
        </section>

        <DeferredScrollAnimations />
        <ReviewBar />
        <DayAtVibe />

        <section id="de-ce-vibe" className="animate-on-scroll bg-white px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-gray-900 md:text-5xl font-[family-name:var(--font-playfair)]">
              De ce Vibe?
            </h2>
            <p className="mb-12 text-center text-lg text-gray-600">
              Diferențiatori concreți, nu afirmații vagi.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-6 transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 text-4xl" aria-hidden="true">
                    {card.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">{card.title}</h3>
                  <p className="leading-relaxed text-gray-600">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="animate-on-scroll bg-gray-50 px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-gray-900 md:text-5xl font-[family-name:var(--font-playfair)]">
              Din meniul nostru
            </h2>
            <p className="mb-12 text-center text-lg text-gray-600">
              Cafea bună. Oameni buni. Un loc al tău.
            </p>
            <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-3">
              {previewItems.map((item) => (
                <div key={item.name} className="group overflow-hidden rounded-2xl bg-white shadow-sm">
                  <div className="h-40 overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={600}
                      height={320}
                      quality={60}
                      sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <span className="font-semibold text-gray-900">{item.name}</span>
                    <span className="font-bold text-teal-700">{item.price} lei</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <a
                href="/meniu"
                className="inline-block rounded-full bg-espresso-800 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-espresso-900"
              >
                Vezi meniul complet
              </a>
            </div>
          </div>
        </section>

        <section className="animate-on-scroll bg-white px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-gray-900 md:text-5xl font-[family-name:var(--font-playfair)]">
              Oferte sezoniere
            </h2>
            <p className="mb-12 text-center text-lg text-gray-600">
              Produse disponibile în această perioadă.
            </p>
            <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {seasonalPreview.map((item) => (
                <div
                  key={item.name}
                  className="group overflow-hidden rounded-2xl border border-teal-100 bg-white shadow-sm"
                >
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={600}
                      height={384}
                      quality={60}
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 28vw"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-start justify-between">
                      <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                      <span className="ml-2 whitespace-nowrap font-bold text-teal-700">
                        {item.price} lei
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <a
                href="/sarbatori"
                className="inline-block rounded-full bg-oliv-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-oliv-800"
              >
                Vezi toate ofertele sezoniere
              </a>
            </div>
          </div>
        </section>

        <section className="bg-espresso-800 px-6 py-16 text-center dark:bg-espresso-900">
          <h2 className="mb-3 text-2xl font-bold text-white font-[family-name:var(--font-playfair)]">
            Ți-a plăcut ce ai văzut?
          </h2>
          <p className="mx-auto mb-8 max-w-md text-base text-crem-100">
            Rezervă o masă acum și garantăm locul tău.
          </p>
          <a
            href="/rezervari"
            className="inline-block rounded-full bg-oliv-600 px-8 py-4 text-lg font-bold text-white transition-colors duration-200 hover:bg-oliv-800"
          >
            Rezervă masă
          </a>
        </section>

        <section className="animate-on-scroll bg-gray-900 px-6 py-20 text-white">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-8 text-4xl font-bold md:text-5xl font-[family-name:var(--font-playfair)]">
              Unde ne găsești
            </h2>
            <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div>
                <div className="mb-3 text-3xl" aria-hidden="true">
                  📍
                </div>
                <p className="text-lg font-semibold">Adresă</p>
                <p className="text-gray-200">Bld. Regina Elisabeta 30, Sector 5, București</p>
              </div>
              <div>
                <div className="mb-3 text-3xl" aria-hidden="true">
                  🕒
                </div>
                <p className="text-lg font-semibold">Program</p>
                <p className="text-gray-200">Luni–Vineri 08:00–22:00</p>
                <p className="text-gray-200">Sâmbătă–Duminică 09:00–23:00</p>
              </div>
              <div>
                <div className="mb-3 text-3xl" aria-hidden="true">
                  📞
                </div>
                <p className="text-lg font-semibold">Telefon</p>
                <a href="tel:+40721234567" className="text-teal-400 hover:text-teal-300">
                  +40 721 234 567
                </a>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=Bld.+Regina+Elisabeta+30+Bucuresti"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-espresso-800 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-espresso-900"
            >
              Deschide în Google Maps
            </a>
          </div>
        </section>

        <div className="animate-on-scroll">
          <About />
        </div>
        <FooterStarter />
      </main>

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
