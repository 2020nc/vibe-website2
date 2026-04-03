/**
 * ⭐ FEATURES SECTION - Bento Grid Layout (Modern Asimetric)
 * MODERNIZAT: Layout inspirat Apple cu card mare + 2 mici + scroll animations + parallax
 */

'use client';

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { useEffect, useState } from 'react';

export default function Features() {
  const { elementRef, isVisible } = useScrollAnimation(0.15);
  const [parallaxOffsets, setParallaxOffsets] = useState([0, 0, 0]);

  // Efect parallax diferit pentru fiecare card
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const element = elementRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrolled;
        const baseOffset = scrolled - elementTop;

        // Offset-uri diferite pentru fiecare card (parallax multi-layer)
        setParallaxOffsets([
          baseOffset * 0.2,  // Card mare - mai lent
          baseOffset * 0.15, // Card mic 1 - și mai lent
          baseOffset * 0.25  // Card mic 2 - puțin mai rapid
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
      color: '#F5E6D3', // Bej cald
    },
    {
      title: 'Patiserie Artizanală',
      description:
        'Deserturi și produse de patiserie pregătite zilnic cu ingrediente premium',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop',
      color: '#FFF8E7', // Crem
    },
    {
      title: 'Ambient Relaxant',
      description:
        'Spațiu modern și primitor, perfect pentru lucru, studiu sau întâlniri',
      image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&auto=format&fit=crop',
      color: '#D4A574', // Maro deschis
    },
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50" ref={elementRef}>
      <div className="max-w-7xl mx-auto">
        {/* 📝 TITLU SECȚIUNE */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-900 mb-4">
            De ce <span className="text-primary">Vibe Caffè</span>?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-600 max-w-2xl mx-auto">
            Experiență unică, ingrediente premium, atmosferă perfectă
          </p>
        </div>

        {/* 🎨 BENTO GRID - Card mare stânga + 2 mici dreapta */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[600px]">
          {/* 🔲 CARD MARE - Stânga (prima poziție) */}
          <div
            className={`features-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 group ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ backgroundColor: features[0].color }}
          >
            <div className="relative h-64 md:h-1/2 overflow-hidden">
              <img
                src={features[0].image}
                alt={features[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{
                  transform: `translateY(${parallaxOffsets[0]}px) scale(1.1)`,
                  transition: 'transform 0.1s ease-out'
                }}
              />
            </div>

            <div className="p-8 md:p-10 h-64 md:h-1/2 flex flex-col justify-center">
              <h3 className="text-4xl font-bold text-gray-900 mb-4">
                {features[0].title}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {features[0].description}
              </p>
            </div>
          </div>

          {/* 📦 CONTAINER DREAPTA - 2 carduri stivuite */}
          <div className="flex flex-col gap-6">
            {/* 🔳 CARD MIC 1 - Sus dreapta */}
            <div
              className={`features-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 group flex-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                backgroundColor: features[1].color,
                transitionDelay: isVisible ? '200ms' : '0ms'
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={features[1].image}
                  alt={features[1].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{
                    transform: `translateY(${parallaxOffsets[1]}px) scale(1.1)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {features[1].title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {features[1].description}
                </p>
              </div>
            </div>

            {/* 🔳 CARD MIC 2 - Jos dreapta */}
            <div
              className={`features-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 group flex-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                backgroundColor: features[2].color,
                transitionDelay: isVisible ? '400ms' : '0ms'
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={features[2].image}
                  alt={features[2].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{
                    transform: `translateY(${parallaxOffsets[2]}px) scale(1.1)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {features[2].title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
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
