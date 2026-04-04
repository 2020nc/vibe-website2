import Link from 'next/link';
import FooterStarter from '@/components/FooterStarter';

export default function NotFound() {
  return (
    <>
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-8xl font-bold text-teal-500 mb-4">404</p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Hm, această pagină a dispărut mai repede decât un espresso dimineața.
          </h1>
          <p className="text-lg text-gray-500 mb-10">
            Între timp, hai la o cafea.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105"
            >
              Înapoi la pagina principală
            </Link>
            <Link
              href="/meniu"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105"
            >
              Vezi meniul
            </Link>
          </div>
        </div>
      </main>
      <FooterStarter />
    </>
  );
}
