export const metadata = {
  title: 'Politică Cookies | Vibe Caffè',
  description: 'Politica de cookies Vibe Caffè — ce cookies folosim și cum le poți gestiona.',
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Politică Cookies</h1>
        <p className="text-gray-400 text-sm mb-8">Ultima actualizare: aprilie 2026</p>

        <section className="space-y-8 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Ce sunt cookies?</h2>
            <p>Cookies sunt fișiere text mici stocate pe dispozitivul tău când vizitezi un site. Ele ajută site-ul să funcționeze corect și să-și amintească preferințele tale.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Cookies pe care le folosim</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 mb-1">Cookies strict necesare</h3>
                <p className="text-sm">Esențiale pentru funcționarea site-ului (ex: sesiune admin, preferință temă). Nu pot fi dezactivate.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 mb-1">Cookies de preferințe</h3>
                <p className="text-sm">Rețin setările tale (ex: dark/light mode). Durata: 1 an.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 mb-1">Cookies analitice</h3>
                <p className="text-sm">Ne ajută să înțelegem cum este folosit site-ul (date anonime). Folosim Vercel Analytics.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Cum poți gestiona cookies</h2>
            <p>Poți șterge sau bloca cookies din setările browserului tău. Dezactivarea cookies tehnice poate afecta funcționarea site-ului.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Contact</h2>
            <p>Întrebări? <a href="mailto:contact@vibecaffe.ro" className="text-teal-600 hover:underline">contact@vibecaffe.ro</a></p>
          </div>
        </section>

        <div className="mt-10 pt-6 border-t border-gray-100">
          <a href="/" className="text-teal-600 hover:underline font-semibold">← Înapoi la homepage</a>
        </div>
      </div>
    </main>
  );
}
