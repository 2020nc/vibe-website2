export const metadata = {
  title: 'Termeni și Condiții | Vibe Caffè',
  description: 'Termeni și condiții de utilizare Vibe Caffè — regulile pentru rezervări și folosirea site-ului.',
};

export default function TermeniPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Termeni și Condiții</h1>
        <p className="text-gray-400 text-sm mb-8">Ultima actualizare: aprilie 2026</p>

        <section className="space-y-8 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">1. Acceptarea termenilor</h2>
            <p>Prin utilizarea site-ului vibe-website2.vercel.app sau efectuarea unei rezervări, ești de acord cu acești termeni. Dacă nu ești de acord, te rugăm să nu folosești serviciile noastre.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">2. Rezervări</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Rezervările se fac online sau telefonic cu cel puțin 2 ore înainte</li>
              <li>Anularea se poate face cu minimum 1 oră înainte, fără penalități</li>
              <li>Masa rezervată se păstrează maxim 15 minute de la ora rezervată</li>
              <li>Pentru grupuri de peste 8 persoane, contactați-ne direct la +40 721 234 567</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">3. Program și prețuri</h2>
            <p>Prețurile afișate pe site sunt în lei (RON) și includ TVA. Ne rezervăm dreptul de a modifica prețurile fără notificare prealabilă. Programul poate varia în zilele de sărbătoare.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">4. Utilizarea site-ului</h2>
            <p>Site-ul este oferit exclusiv în scop informativ și pentru efectuarea rezervărilor. Este interzisă reproducerea conținutului fără acordul scris al Vibe Caffè SRL.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">5. Limitarea răspunderii</h2>
            <p>Vibe Caffè nu este responsabil pentru indisponibilitatea temporară a site-ului sau pentru erori tehnice independente de voința noastră.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">6. Legea aplicabilă</h2>
            <p>Acești termeni sunt guvernați de legislația română. Orice litigiu va fi soluționat de instanțele competente din București.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">7. Contact</h2>
            <p>Vibe Caffè SRL — Bld. Regina Elisabeta 30, Sector 5, București<br />
            Email: <a href="mailto:contact@vibecaffe.ro" className="text-teal-600 hover:underline">contact@vibecaffe.ro</a> | Tel: +40 721 234 567</p>
          </div>
        </section>

        <div className="mt-10 pt-6 border-t border-gray-100">
          <a href="/" className="text-teal-600 hover:underline font-semibold">← Înapoi la homepage</a>
        </div>
      </div>
    </main>
  );
}
