/**
 * PAGINA LOCAȚIE - Galerie foto și informații despre cafenea
 *
 * Pentru cursanți:
 * - Aceasta este o pagină separată (route: /locatie)
 * - Grid responsive pentru galerie foto
 * - Efecte hover pe imagini
 * - Google Maps embed
 */

import Link from 'next/link';

export const metadata = {
  title: 'Locație & Program — Vibe Caffè București',
  description:
    'Găsește-ne la Bld. Regina Elisabeta 30, Sector 5. ' +
    'Program Lu-Vi 08:00-22:00, Weekend 09:00-23:00.',
  openGraph: {
    title: 'Locație & Program | Vibe Caffè',
    description: 'Bld. Regina Elisabeta 30, Sector 5, București. Program zilnic 08:00–23:00.',
  },
};

export default function LocatiePage() {
  /**
   * 🖼️ GALERIE IMAGINI
   * Array cu imagini ale cafenelei
   */
  const galleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&auto=format&fit=crop',
      title: 'Interior elegant',
      description: 'Spațiu modern și primitor',
    },
    {
      url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&auto=format&fit=crop',
      title: 'Zona de lucru',
      description: 'Perfect pentru laptop și WiFi gratuit',
    },
    {
      url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop',
      title: 'Bar espresso',
      description: 'Echipamente profesionale',
    },
    {
      url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop',
      title: 'Colț relaxare',
      description: 'Fotolii confortabile',
    },
    {
      url: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&auto=format&fit=crop',
      title: 'Terasă exterioară',
      description: 'Perfect pentru zilele însorite',
    },
    {
      url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&auto=format&fit=crop',
      title: 'Ambianță călduroasă',
      description: 'Luminozitate naturală',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1920&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
            Vizitează <span className="text-secondary">Vibe Caffè</span>
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.6)' }}>
            Un loc special unde cafeaua întâlnește confortul
          </p>

          {/* Buton înapoi */}
          <Link
            href="/"
            className="inline-block mt-6 px-6 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold rounded-full transition-all duration-300 border border-white/30"
          >
            ← Înapoi la Homepage
          </Link>
        </div>
      </section>

      {/* INFORMAȚII LOCAȚIE */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Informații Contact */}
            <div className="glass rounded-3xl p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                Cum ajungi la noi
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Adresă</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Bld. Regina Elisabeta, Nr. 30<br />
                    Sector 5, București
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Program</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Luni - Vineri: 07:00 - 22:00<br />
                    Sâmbătă - Duminică: 08:00 - 23:00
                  </p>
                  <p className="text-secondary font-semibold mt-2">
                    Happy Hour: 16:00 - 18:00 (reducere 20%)
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Contact</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Telefon: <a href="tel:+40721234567" className="text-primary hover:underline">+40 721 234 567</a><br />
                    Email: <a href="mailto:hello@vibecoffee.ro" className="text-primary hover:underline">hello@vibecoffee.ro</a>
                  </p>
                </div>

                {/* CTA-uri grupate */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <a
                    href="https://maps.google.com/?q=Bld.+Regina+Elisabeta+30+Bucuresti"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-2xl text-center transition-all duration-300 hover:scale-[1.02] shadow-sm"
                  >
                    <span className="block text-sm font-bold">Google Maps</span>
                    <span className="block text-xs text-white/80 mt-1">Traseu rapid până la cafenea</span>
                  </a>
                  <a
                    href="tel:+40721234567"
                    className="w-full px-4 py-4 bg-gray-900 hover:bg-gray-700 text-white font-semibold rounded-2xl text-center transition-all duration-300 hover:scale-[1.02] shadow-sm"
                  >
                    <span className="block text-sm font-bold">Sună acum</span>
                    <span className="block text-xs text-white/70 mt-1">Confirmi rapid o masă sau o întrebare</span>
                  </a>
                  <Link
                    href="/rezervari"
                    className="w-full px-4 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-2xl text-center transition-all duration-300 hover:scale-[1.02] shadow-sm"
                  >
                    <span className="block text-sm font-bold">Rezervă masă</span>
                    <span className="block text-xs text-white/80 mt-1">Ideal pentru weekend și grupuri</span>
                  </Link>
                </div>

                {/* Mini-FAQ */}
                <div className="space-y-4 pt-2">
                  <div>
                    <p className="font-semibold text-gray-900">Este necesară rezervarea?</p>
                    <p className="text-gray-600 text-sm">Recomandat pentru weekend și sărbători. În timpul săptămânii găsești loc și fără rezervare.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Există parcare în zonă?</p>
                    <p className="text-gray-600 text-sm">Parcare disponibilă pe stradă și în parcarea Unirii la 5 minute pe jos.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Care sunt intervalele aglomerate?</p>
                    <p className="text-gray-600 text-sm">Sâmbătă și duminică 10:00–13:00 (weekend). Vineri seara 18:00–21:00.</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Facilități</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">WiFi gratuit</span>
                    <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">Prize la fiecare masă</span>
                    <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">Acces facil</span>
                    <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">Parcare în apropiere</span>
                    <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">Pet-friendly</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="glass rounded-3xl p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                Hartă
              </h2>
              <div className="w-full rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.844!2d26.0921!3d44.4321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff4770adb5b3%3A0xa0f5c3e6e!2sBulevardul+Regina+Elisabeta+30!5e0!3m2!1sro!2sro!4v1"
                  width="100%"
                  height="420"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Locația Vibe Caffe pe hartă"
                />
              </div>
              <div className="mt-4">
                <a
                  href="https://maps.google.com/?q=Bulevardul+Regina+Elisabeta+30+Bucuresti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-full text-center transition-all duration-300 hover:scale-105 block"
                >
                  Deschide în Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* GALERIE FOTO */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-foreground text-center mb-4">
              Galerie <span className="text-primary">Foto</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Descoperă atmosfera unică a cafenelei noastre
            </p>

            {/* Grid Galerie */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-80"
                >
                  {/* Imagine */}
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay cu text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {image.title}
                    </h3>
                    <p className="text-gray-200">
                      {image.description}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* CTA FINAL */}
          <div className="glass rounded-3xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Te așteptăm cu drag!
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Vino să descoperi cafeaua perfectă într-un ambient relaxant
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+40721234567"
                className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Sună pentru rezervare
              </a>
              <Link
                href="/#menu"
                className="px-8 py-4 bg-secondary hover:bg-secondary-dark text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Vezi meniul
              </Link>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CafeOrCoffeeShop',
            name: 'Vibe Caffè',
            url: 'https://vibe-website-rho.vercel.app',
            telephone: '+40721234567',
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
            hasMap: 'https://maps.google.com/?q=Bulevardul+Regina+Elisabeta+30+Bucuresti',
          }),
        }}
      />
    </div>
  );
}
