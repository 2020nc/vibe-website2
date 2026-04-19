'use client';

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';

const cards = [
  {
    title: 'Cafea de Specialitate',
    description: 'Boabe selectate din cele mai bune regiuni ale lumii, prăjite local pentru a păstra aromele autentice. Fiecare ceașcă e o experiență în sine.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop',
    large: true,
  },
  {
    title: 'Patiserie Artizanală',
    description: 'Produse de patiserie făcute zilnic în bucătăria noastră, cu ingrediente naturale și rețete tradiționale.',
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&auto=format&fit=crop',
    large: false,
  },
  {
    title: 'Ambient Relaxant',
    description: 'Un spațiu gândit pentru confort — muzică selectată, lumină caldă și o atmosferă care te face să vrei să rămâi.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop',
    large: false,
  },
];

function FeatureCard({ card, delay }: { card: typeof cards[0]; delay: string }) {
  const { elementRef, isVisible } = useScrollAnimation(0.2);

  return (
    <div
      ref={elementRef}
      style={{ transitionDelay: delay }}
      className={`group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      } transition-all duration-700`}
    >
      {/* Imagine sus - 40% înălțime */}
      <div className="h-48 overflow-hidden md:h-56">
        <img
          src={card.image}
          alt={card.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      </div>

      {/* Text jos - 60% înălțime */}
      <div className="p-6">
        <h3 className={`mb-2 font-bold text-gray-900 ${card.large ? 'text-3xl' : 'text-2xl'}`}>
          {card.title}
        </h3>
        <p className="leading-relaxed text-gray-600">{card.description}</p>
      </div>
    </div>
  );
}

export default function FeaturesStarter() {
  return (
    <section id="features" className="bg-gray-50 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Titlu secțiune */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-5xl font-bold text-gray-900">
            De ce <span className="text-amber-600">Vibe Caffè</span>?
          </h2>
          <p className="text-lg text-gray-600">Experiență unică, ingrediente premium, atmosferă perfectă</p>
        </div>

        {/* Bento grid: 1 card mare stânga + 2 carduri mici dreapta */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Card mare stânga */}
          <FeatureCard card={cards[0]} delay="0s" />

          {/* Coloana dreapta cu 2 carduri mici */}
          <div className="flex flex-col gap-6">
            <FeatureCard card={cards[1]} delay="0.15s" />
            <FeatureCard card={cards[2]} delay="0.3s" />
          </div>
        </div>
      </div>
    </section>
  );
}
