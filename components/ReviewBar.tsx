const reviews = [
  {
    text: "Cea mai buna cafea de specialitate pe care am gasit-o in centrul Bucurestiului.",
    author: "- Andreea M., martie 2026",
  },
  {
    text: "Brunch-ul de weekend e o revelatie. Ouale Benedict si cold brew-ul sunt combinatia perfecta.",
    author: "- Mihai T., februarie 2026",
  },
  {
    text: "Atmosfera potrivita pentru lucru. WiFi stabil, prize la fiecare masa si cafea excelenta.",
    author: "- Raluca D., martie 2026",
  },
];

export default function ReviewBar() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p
            className="text-4xl font-bold"
            style={{ color: "var(--primary, #14B8A6)" }}
          >
            <span aria-hidden="true">★</span> <span data-rating>4.9</span> / 5
          </p>
          <p className="text-sm text-slate-500 mt-1">
            bazat pe <span data-reviews>340+</span> recenzii Google
          </p>
        </div>

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
