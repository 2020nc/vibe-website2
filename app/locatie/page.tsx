/**
 * PAGINA LOCAȚIE - Galerie foto și informații despre cafenea
 *
 * Pentru cursanți:
 * - Aceasta este o pagină separată (route: /locatie)
 * - Grid responsive pentru galerie foto
 * - Efecte hover pe imagini
 * - Google Maps încărcat la cerere
 */

import Image from 'next/image';
import Link from 'next/link';
import LazyMapEmbed from '@/components/LazyMapEmbed';

export const metadata = {
  title: 'Locație & Program - Vibe Caffe București',
  description:
    'Găsește-ne la Bld. Regina Elisabeta 30, Sector 5. Program Lu-Vi 08:00-22:00, Weekend 09:00-23:00.',
  openGraph: {
    title: 'Locație & Program | Vibe Caffe',
    description: 'Bld. Regina Elisabeta 30, Sector 5, București. Program zilnic 08:00-23:00.',
  },
};

const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=900&auto=format&fit=crop&q=70',
    title: 'Interior elegant',
    description: 'Spațiu modern și primitor',
  },
  {
    url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=900&auto=format&fit=crop&q=70',
    title: 'Zonă de lucru',
    description: 'Perfect pentru laptop și Wi-Fi gratuit',
  },
  {
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&auto=format&fit=crop&q=70',
    title: 'Bar espresso',
    description: 'Echipamente profesionale',
  },
  {
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900&auto=format&fit=crop&q=70',
    title: 'Colț de relaxare',
    description: 'Fotolii confortabile',
  },
  {
    url: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=900&auto=format&fit=crop&q=70',
    title: 'Terasă exterioară',
    description: 'Perfectă pentru zilele însorite',
  },
  {
    url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900&auto=format&fit=crop&q=70',
    title: 'Ambianță călduroasă',
    description: 'Luminozitate naturală',
  },
];

export default function LocatiePage() {
  return (
    <div className="min-h-screen">
      <main>
        <section className="relative flex h-[34vh] min-h-[260px] items-center justify-center overflow-hidden md:h-[42vh] md:min-h-[320px]">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1600&auto=format&fit=crop&q=70"
              alt="Interior Vibe Caffe luminat natural"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="relative z-10 px-6 text-center">
            <h1
              className="mb-3 text-4xl font-bold text-white md:text-5xl"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
            >
              Vizitează <span className="text-secondary">Vibe Caffe</span>
            </h1>
            <p
              className="mx-auto max-w-2xl text-lg text-white md:text-xl"
              style={{ textShadow: '0 2px 6px rgba(0,0,0,0.6)' }}
            >
              Un loc special unde cafeaua întâlnește confortul
            </p>

            <Link
              href="/"
              className="mt-5 inline-block rounded-full border border-white/30 bg-white/20 px-5 py-3 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30"
            >
              Înapoi la homepage
            </Link>
          </div>
        </section>

        <section id="harta" className="bg-white px-6 py-12 dark:bg-gray-900 md:py-14">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div className="glass rounded-3xl p-8">
                <h2 className="mb-6 flex items-center gap-3 text-3xl font-bold text-foreground">
                  Cum ajungi la noi
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-primary">Adresă</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Bld. Regina Elisabeta, Nr. 30
                      <br />
                      Sector 5, București
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-primary">Program</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Luni - Vineri: 07:00 - 22:00
                      <br />
                      Sâmbătă - Duminică: 08:00 - 23:00
                    </p>
                    <p className="mt-2 font-bold text-orange-700 dark:text-orange-400">
                      Happy Hour: 16:00 - 18:00 (reducere 20%)
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-primary">Contact</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Telefon:{' '}
                      <a href="tel:+40721234567" className="text-primary hover:underline">
                        +40 721 234 567
                      </a>
                      <br />
                      Email:{' '}
                      <a href="mailto:hello@vibecoffee.ro" className="text-primary hover:underline">
                        hello@vibecoffee.ro
                      </a>
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
                    <a
                      href="https://maps.google.com/?q=Bld.+Regina+Elisabeta+30+Bucuresti"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full rounded-2xl bg-teal-700 px-4 py-4 text-center font-semibold text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-teal-800"
                    >
                      <span className="block text-sm font-bold">Google Maps</span>
                      <span className="mt-1 block text-xs text-teal-50">
                        Traseu rapid până la cafenea
                      </span>
                    </a>
                    <a
                      href="tel:+40721234567"
                      className="w-full rounded-2xl bg-gray-900 px-4 py-4 text-center font-semibold text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-gray-700"
                    >
                      <span className="block text-sm font-bold">Sună acum</span>
                      <span className="mt-1 block text-xs text-white/80">
                        Confirmi rapid o masă sau o întrebare
                      </span>
                    </a>
                    <Link
                      href="/rezervari"
                      className="w-full rounded-2xl bg-orange-700 px-4 py-4 text-center font-semibold text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-orange-800"
                    >
                      <span className="block text-sm font-bold">Rezervă masă</span>
                      <span className="mt-1 block text-xs text-white">
                        Ideal pentru weekend și grupuri
                      </span>
                    </Link>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div>
                      <p className="font-semibold text-gray-900">Este necesară rezervarea?</p>
                      <p className="text-sm text-gray-600">
                        Recomandat pentru weekend și sărbători. În timpul săptămânii găsești loc și
                        fără rezervare.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Există parcare în zonă?</p>
                      <p className="text-sm text-gray-600">
                        Parcare disponibilă pe stradă și în parcarea Unirii la 5 minute pe jos.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Care sunt intervalele aglomerate?</p>
                      <p className="text-sm text-gray-600">
                        Sâmbătă și duminică 10:00-13:00. Vineri seara 18:00-21:00.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-primary">Facilități</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-teal-100 px-4 py-2 text-sm text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                        Wi-Fi gratuit
                      </span>
                      <span className="rounded-full bg-teal-100 px-4 py-2 text-sm text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                        Prize la fiecare masă
                      </span>
                      <span className="rounded-full bg-teal-100 px-4 py-2 text-sm text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                        Acces facil
                      </span>
                      <span className="rounded-full bg-teal-100 px-4 py-2 text-sm text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                        Parcare în apropiere
                      </span>
                      <span className="rounded-full bg-teal-100 px-4 py-2 text-sm text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                        Pet-friendly
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-3xl p-8">
                <h2 className="mb-6 flex items-center gap-3 text-3xl font-bold text-foreground">
                  Harta
                </h2>
                <div className="w-full overflow-hidden rounded-2xl">
                  <LazyMapEmbed
                    mapTitle="Locația Vibe Caffe pe hartă"
                    mapsHref="https://maps.google.com/?q=Bulevardul+Regina+Elisabeta+30+Bucuresti"
                    embedSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.844!2d26.0921!3d44.4321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff4770adb5b3%3A0xa0f5c3e6e!2sBulevardul+Regina+Elisabeta+30!5e0!3m2!1sro!2sro!4v1"
                  />
                </div>
                <div className="mt-4">
                  <a
                    href="https://maps.google.com/?q=Bulevardul+Regina+Elisabeta+30+Bucuresti"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-full bg-teal-700 py-3 text-center font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-teal-800"
                  >
                    Deschide în Google Maps
                  </a>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="mb-4 text-center text-4xl font-bold text-foreground">
                Galerie <span className="text-primary">Foto</span>
              </h2>
              <p className="mx-auto mb-12 max-w-2xl text-center text-xl text-gray-600 dark:text-gray-400">
                Descoperă atmosfera unică a cafenelei noastre
              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {galleryImages.map((image) => (
                  <div
                    key={image.title}
                    className="group relative h-80 overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl"
                  >
                    <Image
                      src={image.url}
                      alt={image.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={60}
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <h3 className="mb-2 text-2xl font-bold text-white">{image.title}</h3>
                      <p className="text-gray-200">{image.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-3xl p-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Te așteptăm cu drag!
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 dark:text-gray-400">
                Vino să descoperi cafeaua perfectă într-un ambient relaxant
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href="tel:+40721234567"
                  className="rounded-full bg-primary px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-primary-dark hover:shadow-xl"
                >
                  Sună pentru rezervare
                </a>
                <Link
                  href="/#menu"
                  className="rounded-full bg-orange-700 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-800 hover:shadow-xl"
                >
                  Vezi meniul
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CafeOrCoffeeShop',
            name: 'Vibe Caffe',
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
