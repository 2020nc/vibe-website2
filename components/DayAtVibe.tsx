'use client';

import { useState, useEffect, useRef } from 'react';

const cards = [
  {
    id: 'focus-start',
    time: '08:00',
    title: 'Focus Start',
    description: 'Dimineața mai bună începe cu o ceașcă clară și un loc al tău.',
    drink: '☕ Flat White sau Cappuccino — de la 16 lei',
    cta: 'Vezi meniul',
    ctaHref: '/meniu',
    dynamicSubtitle: 'Dimineața ta, locul tău.',
    activeHours: [8, 9, 10, 11],
  },
  {
    id: 'reset-pranz',
    time: '13:00',
    title: 'Reset de Prânz',
    description: 'Pauza care reîncarcă. Ieși din rutină, revii mai focusat.',
    drink: '☕ Cold Brew Tonic + Croissant — de la 36 lei',
    cta: 'Rezervă masa',
    ctaHref: '/rezervari',
    dynamicSubtitle: 'Pauza care chiar reîncarcă.',
    activeHours: [12, 13, 14, 15, 16],
  },
  {
    id: 'slow-evenings',
    time: '18:30',
    title: 'Slow Evenings',
    description: 'Seara nu trebuie grăbită. Un loc, o băutură, liniștea ta.',
    drink: '☕ Latte de Lavandă sau Brownie — de la 18 lei',
    cta: 'Rezervă masa',
    ctaHref: '/rezervari',
    dynamicSubtitle: 'Seara ta, în ritmul tău.',
    activeHours: [17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7],
  },
];

const STATIC_SUBTITLE = 'Alege momentul tău.';

function getActiveCardId(): string {
  const hour = new Date().getHours();
  for (const card of cards) {
    if (card.activeHours.includes(hour)) return card.id;
  }
  return 'slow-evenings';
}

export default function DayAtVibe() {
  const [activeCardId, setActiveCardId] = useState<string>('slow-evenings');
  const [subtitle, setSubtitle] = useState(STATIC_SUBTITLE);
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setActiveCardId(getActiveCardId());
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealed) {
          setRevealed(true);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed]);

  const handleCardEnter = (card: typeof cards[0]) => {
    setSubtitle(card.dynamicSubtitle);
  };

  const handleCardLeave = () => {
    setSubtitle(STATIC_SUBTITLE);
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 bg-crem-50"
      aria-label="Cum arată ziua ta la Vibe?"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-[400ms] ease-out ${
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-playfair)]">
            Cum arată ziua ta la Vibe?
          </h2>
          <p
            className="text-lg text-gray-500 transition-opacity duration-200"
            aria-live="polite"
          >
            {subtitle}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const isActive = card.id === activeCardId;
            return (
              <div
                key={card.id}
                role="article"
                tabIndex={0}
                onMouseEnter={() => handleCardEnter(card)}
                onMouseLeave={handleCardLeave}
                onFocus={() => handleCardEnter(card)}
                onBlur={handleCardLeave}
                onTouchStart={() => handleCardEnter(card)}
                onTouchEnd={handleCardLeave}
                className={`
                  rounded-2xl p-6 border cursor-default outline-none
                  transition-transform duration-200
                  hover:-translate-y-1 hover:shadow-md
                  focus-visible:ring-2 focus-visible:ring-espresso-800 focus-visible:ring-offset-2
                  ${revealed
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-5'
                  }
                  ${isActive
                    ? 'bg-white border-espresso-800 shadow-sm'
                    : 'bg-white border-gray-200'
                  }
                `}
                style={{
                  transitionDelay: revealed ? `${index * 80}ms` : '0ms',
                  transitionProperty: 'opacity, transform',
                  transitionDuration: '400ms',
                  transitionTimingFunction: 'ease-out',
                }}
              >
                {/* Time label */}
                <p
                  className={`text-sm font-semibold mb-1 ${
                    isActive ? 'text-espresso-800' : 'text-gray-400'
                  }`}
                >
                  {card.time}
                </p>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-playfair)]">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {card.description}
                </p>

                {/* Drink recommendation */}
                <p className="text-gray-700 text-sm mb-5">{card.drink}</p>

                {/* CTA */}
                <a
                  href={card.ctaHref}
                  className={`
                    inline-block text-sm font-semibold underline-offset-2 hover:underline
                    focus-visible:ring-2 focus-visible:ring-espresso-800 focus-visible:ring-offset-2 rounded
                    ${isActive ? 'text-espresso-800' : 'text-gray-500 hover:text-gray-800'}
                  `}
                >
                  → {card.cta}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
