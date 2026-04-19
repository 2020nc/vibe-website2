const reviews = [
  {
    text: 'Cea mai bună cafea de specialitate pe care am găsit-o în centrul Bucureștiului.',
    author: '- Andreea M., martie 2026',
  },
  {
    text: 'Brunch-ul de weekend e o revelație. Ouăle Benedict și cold brew-ul sunt combinația perfectă.',
    author: '- Mihai T., februarie 2026',
  },
  {
    text: 'Atmosferă potrivită pentru lucru. Wi-Fi stabil, prize la fiecare masă și cafea excelentă.',
    author: '- Raluca D., martie 2026',
  },
];

export default function ReviewBar() {
  return (
    <section className="bg-slate-50 px-6 py-12 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-4xl font-bold text-slate-900 dark:text-slate-100">
            <span aria-hidden="true" className="text-teal-700 dark:text-teal-400">
              ★
            </span>{' '}
            <span data-rating>4.9</span> / 5
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            bazat pe <span data-reviews>340+</span> recenzii Google
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.author}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <p className="text-sm leading-relaxed italic text-slate-700 dark:text-slate-300">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="mt-3 text-xs font-bold text-teal-800 dark:text-teal-400">
                {review.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
