/**
 * ABOUT SECTION - Cu scroll animations
 * MODERNIZAT: Intersection Observer + parallax optimizat
 */

'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';

export default function About() {
  const { elementRef, isVisible } = useScrollAnimation(0.2);
  const [hasImageError, setHasImageError] = useState(false);
  const imageFrameRef = useRef<HTMLDivElement>(null);

  // Parallax-ul ruleaza doar pe desktop si actualizeaza direct transform-ul.
  useEffect(() => {
    const frame = imageFrameRef.current;
    if (!frame) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let rafId = 0;
    let ticking = false;

    const applyParallax = () => {
      ticking = false;

      const element = elementRef.current;
      const isMobile = window.innerWidth < 768;

      if (!element || isMobile || prefersReducedMotion.matches) {
        frame.style.transform = 'translate3d(0, 0, 0)';
        return;
      }

      const rect = element.getBoundingClientRect();
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const clampedProgress = Math.min(Math.max(scrollProgress, 0), 1);
      const offset = clampedProgress * 36 - 18;

      frame.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };

    const requestParallax = () => {
      if (ticking) return;
      ticking = true;
      rafId = window.requestAnimationFrame(applyParallax);
    };

    applyParallax();
    window.addEventListener('scroll', requestParallax, { passive: true });
    window.addEventListener('resize', requestParallax);
    prefersReducedMotion.addEventListener('change', requestParallax);

    return () => {
      window.removeEventListener('scroll', requestParallax);
      window.removeEventListener('resize', requestParallax);
      prefersReducedMotion.removeEventListener('change', requestParallax);
      window.cancelAnimationFrame(rafId);
      frame.style.transform = 'translate3d(0, 0, 0)';
    };
  }, [elementRef]);

  return (
    <section className="bg-white/50 px-6 py-20" ref={elementRef}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div
            className={`order-2 transition-all duration-1000 md:order-1 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
            }`}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200 shadow-2xl transition-shadow duration-500 hover:shadow-3xl">
              {hasImageError ? (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-amber-100 to-orange-200">
                  <span className="text-7xl" aria-hidden="true">
                    ☕
                  </span>
                </div>
              ) : (
                <div
                  ref={imageFrameRef}
                  className="h-full w-full transition-transform duration-700 will-change-transform"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop"
                    alt="Interior cafenea modern si primitor"
                    width={800}
                    height={600}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={72}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    onError={() => setHasImageError(true)}
                  />
                </div>
              )}
            </div>
          </div>

          <div
            className={`order-1 transition-all duration-1000 delay-200 md:order-2 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
            }`}
          >
            <div className="mb-4 inline-block rounded-full bg-secondary/10 px-4 py-2 font-semibold text-secondary">
              Despre Noi
            </div>

            <h2 className="mb-6 text-4xl leading-tight font-bold text-foreground md:text-5xl">
              Pasiunea pentru cafea, <span className="text-primary">din 2020</span>
            </h2>

            <p className="mb-4 text-lg leading-relaxed text-gray-700">
              Am deschis Vibe Caffe cu o singura regula: nicio ceasca nu pleaca la masa daca nu
              am fi bucurosi s-o bem noi insine. De atunci, Andreea M. ne-a dat 5 stele de 3 ori,
              Mihai T. vine in fiecare dimineata de marti si Raluca D. si-a scris teza de doctorat
              la masa din coltul din dreapta.
            </p>

            <p className="mb-8 text-lg leading-relaxed text-gray-700">
              Colaboram direct cu plantatii din America de Sud si Africa, selectand doar cele mai
              bune boabe, prajite saptamanal in micul nostru atelier din Bucuresti.
            </p>

            <a
              href="/rezervari"
              className="inline-block rounded-full bg-primary px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-primary-dark hover:shadow-xl"
            >
              Programeaza o Vizita
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
