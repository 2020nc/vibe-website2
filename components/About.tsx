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

  useEffect(() => {
    const frame = imageFrameRef.current;
    const section = elementRef.current;
    if (!frame || !section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const activeRef = { current: false };
    const lastOffsetRef = { current: 0 };
    let rafId = 0;
    let ticking = false;

    const resetTransform = () => {
      if (lastOffsetRef.current === 0) return;
      lastOffsetRef.current = 0;
      frame.style.transform = 'translate3d(0, 0, 0)';
    };

    const applyParallax = () => {
      ticking = false;

      const isMobile = window.innerWidth < 768;
      if (!activeRef.current || isMobile || prefersReducedMotion.matches) {
        resetTransform();
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const clampedProgress = Math.min(Math.max(scrollProgress, 0), 1);
      const offset = Math.round((clampedProgress * 36 - 18) * 10) / 10;

      if (Math.abs(offset - lastOffsetRef.current) < 0.5) {
        return;
      }

      lastOffsetRef.current = offset;
      frame.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };

    const requestParallax = () => {
      if (ticking) return;
      ticking = true;
      rafId = window.requestAnimationFrame(applyParallax);
    };

    const syncParallaxState = () => {
      if (prefersReducedMotion.matches || window.innerWidth < 768 || !activeRef.current) {
        resetTransform();
        return;
      }

      requestParallax();
    };

    const viewportObserver = new IntersectionObserver(
      ([entry]) => {
        activeRef.current = entry.isIntersecting;

        if (!entry.isIntersecting) {
          if (rafId) {
            window.cancelAnimationFrame(rafId);
            rafId = 0;
          }
          ticking = false;
          resetTransform();
          return;
        }

        syncParallaxState();
      },
      { threshold: 0.15, rootMargin: '10% 0px 10% 0px' }
    );

    viewportObserver.observe(section);
    window.addEventListener('scroll', requestParallax, { passive: true });
    window.addEventListener('resize', syncParallaxState);
    prefersReducedMotion.addEventListener('change', syncParallaxState);

    syncParallaxState();

    return () => {
      viewportObserver.disconnect();
      window.removeEventListener('scroll', requestParallax);
      window.removeEventListener('resize', syncParallaxState);
      prefersReducedMotion.removeEventListener('change', syncParallaxState);

      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }

      resetTransform();
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
                <div ref={imageFrameRef} className="h-full w-full will-change-transform">
                  <Image
                    src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop"
                    alt="Interior cafenea modern și primitor"
                    width={800}
                    height={600}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={65}
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
              Despre noi
            </div>

            <h2 className="mb-6 text-4xl leading-tight font-bold text-foreground md:text-5xl">
              Pasiunea pentru cafea, <span className="text-primary">din 2020</span>
            </h2>

            <p className="mb-4 text-lg leading-relaxed text-gray-700">
              Am deschis Vibe Caffe cu o singură regulă: nicio ceașcă nu pleacă la masă dacă nu am
              fi bucuroși s-o bem noi înșine. De atunci, Andreea M. ne-a dat 5 stele de 3 ori,
              Mihai T. vine în fiecare dimineață de marți, iar Raluca D. și-a scris teza de
              doctorat la masa din colțul din dreapta.
            </p>

            <p className="mb-8 text-lg leading-relaxed text-gray-700">
              Colaborăm direct cu plantații din America de Sud și Africa, selectând doar cele mai
              bune boabe, prăjite săptămânal în micul nostru atelier din București.
            </p>

            <a
              href="/rezervari"
              className="inline-block rounded-full bg-primary px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-primary-dark hover:shadow-xl"
            >
              Programează o vizită
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
