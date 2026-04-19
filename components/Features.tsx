/**
 * FEATURES SECTION - Bento Grid Layout
 * Layout cu un card mare, două carduri mici, animații la scroll și parallax discret.
 */

'use client';

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { useEffect, useState } from 'react';

export default function Features() {
  const { elementRef, isVisible } = useScrollAnimation(0.15);
  const [parallaxOffsets, setParallaxOffsets] = useState([0, 0, 0]);

  // Efect parallax diferit pentru fiecare card.
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const element = elementRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrolled;
        const baseOffset = scrolled - elementTop;

        setParallaxOffsets([
          baseOffset * 0.2, // Card mare - mai lent
          baseOffset * 0.15, // Card mic 1 - și mai lent
          baseOffset * 0.25, // Card mic 2 - puțin mai rapid
        ]);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [elementRef]);

  const features = [
    {
      title: 'Cafea de Specialitate',
      description:
        'Boabe proaspăt prăjite din plantații selectate, pentru aroma perfectă în fiecare ceașcă',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop',
      color: '#F5E6D3',
    },
    {
      title: 'Patiserie Artizanală',
      description:
        'Deserturi și produse de patiserie pregătite zilnic cu ingrediente premium',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop',
      color: '#FFF8E7',
    },
    {
      title: 'Ambient Relaxant',
      description:
        'Spațiu modern și primitor, perfect pentru lucru, studiu sau întâlniri',
      image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&auto=format&fit=crop',
      color: '#D4A574',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 px-6 py-24" ref={elementRef}>
      <div className="mx-auto max-w-7xl">
        {/* Titlu secțiune */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-bold text-gray-900 dark:text-gray-900 md:text-6xl">
            De ce <span className="text-primary">Vibe Caffè</span>?
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-600">
            Experiență unică, ingrediente premium, atmosferă perfectă
          </p>
        </div>

        {/* Bento grid - card mare stânga + 2 mici dreapta */}
        <div className="grid h-auto grid-cols-1 gap-6 md:h-[600px] md:grid-cols-2">
          {/* Card mare - stânga */}
          <div
            className={`features-card group overflow-hidden rounded-3xl shadow-lg transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ backgroundColor: features[0].color }}
          >
            <div className="relative h-64 overflow-hidden md:h-1/2">
              <img
                src={features[0].image}
                alt={features[0].title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{
                  transform: `translateY(${parallaxOffsets[0]}px) scale(1.1)`,
                  transition: 'transform 0.1s ease-out',
                }}
              />
            </div>

            <div className="flex h-64 flex-col justify-center p-8 md:h-1/2 md:p-10">
              <h3 className="mb-4 text-4xl font-bold text-gray-900">
                {features[0].title}
              </h3>
              <p className="text-lg leading-relaxed text-gray-700">
                {features[0].description}
              </p>
            </div>
          </div>

          {/* Container dreapta - 2 carduri stivuite */}
          <div className="flex flex-col gap-6">
            {/* Card mic 1 - sus dreapta */}
            <div
              className={`features-card group flex-1 overflow-hidden rounded-3xl shadow-lg transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{
                backgroundColor: features[1].color,
                transitionDelay: isVisible ? '200ms' : '0ms',
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={features[1].image}
                  alt={features[1].title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{
                    transform: `translateY(${parallaxOffsets[1]}px) scale(1.1)`,
                    transition: 'transform 0.1s ease-out',
                  }}
                />
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-2xl font-bold text-gray-900">
                  {features[1].title}
                </h3>
                <p className="leading-relaxed text-gray-700">
                  {features[1].description}
                </p>
              </div>
            </div>

            {/* Card mic 2 - jos dreapta */}
            <div
              className={`features-card group flex-1 overflow-hidden rounded-3xl shadow-lg transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{
                backgroundColor: features[2].color,
                transitionDelay: isVisible ? '400ms' : '0ms',
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={features[2].image}
                  alt={features[2].title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{
                    transform: `translateY(${parallaxOffsets[2]}px) scale(1.1)`,
                    transition: 'transform 0.1s ease-out',
                  }}
                />
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-2xl font-bold text-gray-900">
                  {features[2].title}
                </h3>
                <p className="leading-relaxed text-gray-700">
                  {features[2].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
