import MenuStarter from '@/components/MenuStarter';

export const metadata = {
  title: 'Meniu & Prețuri',
  description:
    'Meniu complet cu prețuri: cafea de specialitate, brunch, deserturi și ' +
    'produse sezoniere. Vibe Caffè, Bld. Regina Elisabeta 30, București.',
  openGraph: {
    title: 'Meniu & Prețuri | Vibe Caffè',
    description: 'Cafea de specialitate, brunch și deserturi. Prețuri actualizate, filtre pe categorii.',
  },
};

export default function MeniuPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Meniu Vibe Caffè</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Cafea de specialitate, brunch și deserturi în centrul Bucureștiului
        </p>
      </div>

      {/* Meniu interactiv cu poze */}
      <MenuStarter />

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
