export const metadata = {
  title: 'Politică de Confidențialitate | Vibe Caffè',
  description: 'Politica de confidențialitate Vibe Caffè — cum colectăm și folosim datele tale.',
};

export default function ConfidentialitatePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Politică de Confidențialitate</h1>
        <p className="text-gray-400 text-sm mb-8">Ultima actualizare: aprilie 2026</p>

        <section className="space-y-8 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">1. Cine suntem</h2>
            <p>Vibe Caffè SRL, cu sediul la Bld. Regina Elisabeta 30, Sector 5, București. Contact: <a href="mailto:contact@vibecaffe.ro" className="text-teal-600 hover:underline">contact@vibecaffe.ro</a>.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">2. Ce date colectăm</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Nume și prenume (pentru rezervări)</li>
              <li>Adresă de email (pentru newsletter și confirmări rezervare)</li>
              <li>Număr de telefon (opțional, pentru contact rezervare)</li>
              <li>Date de navigare anonime (cookies tehnice)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">3. Cum folosim datele</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Gestionarea rezervărilor de masă</li>
              <li>Trimiterea newsletterului (doar cu acordul tău explicit)</li>
              <li>Îmbunătățirea serviciilor și experienței pe site</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">4. Temeiul legal</h2>
            <p>Prelucrăm datele în baza consimțământului tău (newsletter) și a interesului legitim (rezervări). Ne conformăm Regulamentului GDPR (UE) 2016/679.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">5. Drepturile tale</h2>
            <p>Ai dreptul de acces, rectificare, ștergere, portabilitate și opoziție. Trimite o cerere la <a href="mailto:contact@vibecaffe.ro" className="text-teal-600 hover:underline">contact@vibecaffe.ro</a> și vom răspunde în 30 de zile.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">6. Retenție date</h2>
            <p>Datele de rezervare se păstrează 1 an. Abonamentele newsletter — până la dezabonare. Poți solicita ștergerea oricând.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">7. Contact</h2>
            <p>Pentru orice întrebare legată de datele tale: <a href="mailto:contact@vibecaffe.ro" className="text-teal-600 hover:underline">contact@vibecaffe.ro</a> sau +40 721 234 567.</p>
          </div>
        </section>

        <div className="mt-10 pt-6 border-t border-gray-100">
          <a href="/" className="text-teal-600 hover:underline font-semibold">← Înapoi la homepage</a>
        </div>
      </div>
    </main>
  );
}
