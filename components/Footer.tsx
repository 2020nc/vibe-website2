/**
 * 🦶 FOOTER - Modern footer cu wave separator
 * MODERNIZAT: SVG wave separator + gradient background + social icons
 */

export default function Footer() {
  return (
    <footer className="relative">
      {/* 🌊 WAVE SEPARATOR SVG */}
      <div className="w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-24"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#3D2B1F"
          />
        </svg>
      </div>

      {/* 📦 FOOTER CONTENT - Gradient Background */}
      <div className="bg-gradient-to-b from-[#3D2B1F] to-[#1A1A1A] text-gray-300 py-16 px-6 relative">
        {/* Pattern decorativ cu boabe de cafea */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* GRID 3 COLOANE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* COLOANA 1: CONTACT */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
                <span className="text-primary">Vibe</span>{' '}
                <span className="text-secondary">Caffè</span>
              </h3>
              <p className="mb-6 leading-relaxed text-lg">
                Locul perfect pentru cafeaua ta zilnică și momente de relaxare
              </p>

              <div className="space-y-3">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Str. Cafenelelor nr. 42, București, România</span>
                </div>

                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-primary mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>+40 712 345 678</span>
                </div>

                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-primary mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>hello@vibecoffee.ro</span>
                </div>
              </div>
            </div>

            {/* COLOANA 2: PROGRAM */}
            <div>
              <h4 className="text-xl font-bold text-white mb-4">Program</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Luni - Vineri</span>
                  <span className="text-white font-semibold">07:00 - 22:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sâmbătă</span>
                  <span className="text-white font-semibold">08:00 - 23:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Duminică</span>
                  <span className="text-white font-semibold">09:00 - 20:00</span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-xl font-bold text-white mb-4">Link-uri Rapide</h4>
                <div className="space-y-2">
                  <a href="/meniu" className="block hover:text-primary transition-colors">
                    Meniu
                  </a>
                  <a href="/locatie" className="block hover:text-primary transition-colors">
                    Locație
                  </a>
                  <a href="/rezervari" className="block hover:text-primary transition-colors">
                    Rezervări
                  </a>
                </div>
              </div>
            </div>

            {/* COLOANA 3: SOCIAL MEDIA */}
            <div>
              <h4 className="text-xl font-bold text-white mb-4">Urmărește-ne</h4>
              <p className="mb-6">Alătură-te comunității noastre și fii la curent cu cele mai noi oferte!</p>

              <div className="flex gap-4 mb-8">
                <a
                  href="#"
                  className="social-icon w-12 h-12 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center text-white text-xl transition-all"
                  aria-label="Facebook"
                >
                  <span>f</span>
                </a>
                <a
                  href="#"
                  className="social-icon w-12 h-12 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center text-white text-xl transition-all"
                  aria-label="Instagram"
                >
                  <span>📷</span>
                </a>
                <a
                  href="#"
                  className="social-icon w-12 h-12 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center text-white text-xl transition-all"
                  aria-label="TikTok"
                >
                  <span>🎵</span>
                </a>
              </div>

              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                <h5 className="text-white font-bold mb-2">Newsletter</h5>
                <p className="text-sm mb-4">Primește oferte exclusive</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Email-ul tău"
                    className="flex-1 px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button className="px-6 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors">
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-sm">
              &copy; 2024 Vibe Caffè. Toate drepturile rezervate. | Creat cu ❤️ pentru iubitorii de cafea
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
