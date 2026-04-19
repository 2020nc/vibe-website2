/**
 * HERO STARTER - Versiunea simplă pentru cursanți
 *
 * Aceasta este versiunea minimalistă de la care plecăm în curs.
 * Fără animații, fără video, fără JavaScript complex.
 * Doar HTML + Tailwind CSS = fundația de bază.
 */

export default function HeroStarter({ showHoliday = false }: { showHoliday?: boolean }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero-coffee 2.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
        {/* Titlu principal */}
        <h1
          className="hero-anim mb-6 text-6xl font-bold leading-tight md:text-8xl lg:text-9xl"
          style={{ textShadow: '0 4px 24px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.5)', animationDelay: '3.4s' }}
        >
          Cafeaua care te trezește
        </h1>

        {/* Subtitlu */}
        <p
          className="hero-anim mb-8 text-6xl font-bold italic text-white/80 md:text-7xl lg:text-8xl"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)', animationDelay: '3.7s' }}
        >
          Vino pentru aromă, rămâi pentru atmosferă
        </p>

        {/* Butoane CTA */}
        <div className="hero-anim flex flex-col justify-center gap-6 sm:flex-row" style={{ animationDelay: '4.0s' }}>
          <a
            href="#menu"
            className="rounded-full bg-amber-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-amber-500 hover:shadow-2xl"
          >
            Vezi meniul
          </a>
          {showHoliday && (
            <a
              href="#sarbatori"
              className="rounded-full bg-rose-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-rose-400 hover:shadow-2xl"
            >
              Meniu sărbătoare
            </a>
          )}
          <a
            href="#contact"
            className="rounded-full border-2 border-white bg-transparent px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-2xl"
          >
            Vizitează-ne
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        style={{ opacity: 0, animation: 'fadeInUp 0.7s ease-out 4.3s forwards' }}
      >
        <a
          href="#features"
          className="block animate-bounce text-white/75 transition-colors duration-300 hover:text-amber-500"
          aria-label="Scroll în jos"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </a>
      </div>
    </section>
  );
}
