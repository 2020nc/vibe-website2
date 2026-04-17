'use client';

import { useEffect, useRef } from 'react';

/**
 * ScrollAnimations — Client Component
 *
 * Modificarea 8: Intersection Observer care adaugă clasa "visible"
 * pe toate elementele cu clasa "animate-on-scroll" când intră în viewport.
 *
 * Modificarea 9: Contor animat pentru rating (4.9) și recenzii (340)
 * din secțiunea ReviewBar / hero. Se animează o singură dată (flag useRef).
 */
export default function ScrollAnimations() {
  // Refs pentru elementele cu contor
  const ratingRef  = useRef<HTMLElement | null>(null);
  const reviewsRef = useRef<HTMLElement | null>(null);
  const animatedRef = useRef(false); // flag anti re-animare

  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.animate-on-scroll'));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (elements.length === 0) {
      return;
    }

    const revealAll = () => {
      elements.forEach((element) => element.classList.add('visible'));
    };

    root.classList.add('scroll-animations-ready');

    if (prefersReducedMotion.matches) {
      revealAll();
      return () => {
        root.classList.remove('scroll-animations-ready');
      };
    }

    // --- Modificarea 8: scroll animations ---
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    // --- Modificarea 9: contor animat ---
    function animateCounter(
      element: HTMLElement,
      targetValue: number,
      duration: number,
      decimals: number
    ) {
      let start: number | null = null;

      function step(timestamp: number) {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        element.textContent = (progress * targetValue).toFixed(decimals);
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }

      requestAnimationFrame(step);
    }

    // Găsim elementele cu rating și recenzii prin data attributes
    ratingRef.current  = document.querySelector('[data-rating]') as HTMLElement | null;
    reviewsRef.current = document.querySelector('[data-reviews]') as HTMLElement | null;

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            if (ratingRef.current) {
              animateCounter(ratingRef.current, 4.9, 1500, 1);
            }
            if (reviewsRef.current) {
              animateCounter(reviewsRef.current, 340, 1500, 0);
              // Adăugăm "+" înapoi după animație
              setTimeout(() => {
                if (reviewsRef.current) {
                  reviewsRef.current.textContent = '340+';
                }
              }, 1520);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ratingRef.current) {
      counterObserver.observe(ratingRef.current);
    }

    return () => {
      root.classList.remove('scroll-animations-ready');
      observer.disconnect();
      counterObserver.disconnect();
    };
  }, []);

  return null; // Component invizibil — doar logică
}
