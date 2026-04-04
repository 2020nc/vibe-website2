const reviews = [
  {
    text: 'Cea mai bună cafea de specialitate pe care am găsit-o în centrul Bucureștiului.',
    author: '— Andreea M., martie 2026',
  },
  {
    text: 'Brunch-ul de weekend e o revelație. Ouăle Benedict și cold brew-ul sunt combinația perfectă.',
    author: '— Mihai T., februarie 2026',
  },
  {
    text: 'Atmosferă work-friendly perfectă. WiFi stabil, prize la fiecare masă și cafea excelentă.',
    author: '— Raluca D., martie 2026',
  },
];

export default function ReviewBar() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Rating agregat */}
        <div className="text-center mb-10">
          <p className="text-4xl font-bold" style={{ color: 'var(--primary, #14B8A6)' }}>
            ⭐ <span data-rating>4.9</span> / 5
          </p>
          <p className="text-sm text-slate-500 mt-1">bazat pe <span data-reviews>340+</span> recenzii Google</p>
        </div>

        {/* Review snippets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm"
            >
              <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="text-xs font-bold text-teal-600 dark:text-teal-400 mt-3">
                {review.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
