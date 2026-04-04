/**
 * 📖 ABOUT SECTION - Cu scroll animations
 * MODERNIZAT: Intersection Observer + Parallax effect
 */

'use client';

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { useEffect, useState } from 'react';

export default function About() {
  const { elementRef, isVisible } = useScrollAnimation(0.2);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // Efect parallax pe imagine - compatibil cu Lenis smooth scroll
  useEffect(() => {
    let rafId: number;

    const handleParallax = () => {
      const element = elementRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const offset = scrollProgress * 100 - 50; // Parallax range: -50px to +50px
        setParallaxOffset(offset);
      }
      rafId = requestAnimationFrame(handleParallax);
    };

    rafId = requestAnimationFrame(handleParallax);
    return () => cancelAnimationFrame(rafId);
  }, [elementRef]);

  return (
    <section className="py-20 px-6 bg-white/50" ref={elementRef}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* IMAGINE - Slide in from left + Parallax */}
          <div
            className={`order-2 md:order-1 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
              <img
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&auto=format&fit=crop"
                alt="Interior cafenea modern și primitor"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                style={{
                  transform: `translateY(${parallaxOffset}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = 'none';
                  const parent = img.parentElement;
                  if (parent) {
                    parent.style.cssText += 'display:flex;align-items:center;justify-content:center;min-height:400px;background:linear-gradient(135deg,#fef3c7,#fed7aa)';
                    parent.innerHTML = '<span style="font-size:5rem">☕</span>';
                  }
                }}
              />
            </div>
          </div>

          {/* TEXT - Slide in from right */}
          <div
            className={`order-1 md:order-2 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="inline-block px-4 py-2 bg-secondary/10 text-secondary font-semibold rounded-full mb-4">
              Despre Noi
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Pasiunea pentru cafea,{' '}
              <span className="text-primary">din 2020</span>
            </h2>

            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Am deschis Vibe Caffè cu o singură regulă: nicio ceașcă nu pleacă
              la masă dacă nu am fi bucuroși s-o bem noi înșine. De atunci,
              Andreea M. ne-a dat 5 stele de 3 ori, Mihai T. vine în fiecare
              dimineață de marți și Raluca D. și-a scris teza de doctorat la
              masa din colțul din dreapta.
            </p>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Colaborăm direct cu plantații din America de Sud și Africa,
              selectând doar cele mai bune boabe, prăjite săptămânal în micul
              nostru atelier din București.
            </p>

            <a
              href="/rezervari"
              className="inline-block px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Programează o Vizită
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
