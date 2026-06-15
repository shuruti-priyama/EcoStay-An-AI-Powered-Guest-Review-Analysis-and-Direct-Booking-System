export default function Hero({
  eyebrow,
  title,
  highlight,
  description,
  primaryAction,
  secondaryAction,
  rating,
}) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <div>
        {eyebrow && (
          <p className="text-forest-600 font-semibold text-xs tracking-widest uppercase mb-3">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900 leading-tight mb-4">
          {title} {highlight && <span className="text-forest-500">{highlight}</span>}
        </h1>
        {description && (
          <p className="text-forest-800/70 text-base sm:text-lg leading-relaxed mb-6 max-w-xl">
            {description}
          </p>
        )}

        {(primaryAction || secondaryAction) && (
          <div className="flex flex-wrap gap-3">
            {primaryAction && (
              <button className="bg-forest-700 text-white font-semibold px-5 py-3 rounded-lg hover:bg-forest-800 transition-colors">
                {primaryAction}
              </button>
            )}
            {secondaryAction && (
              <button className="bg-white border border-forest-200 text-forest-800 font-semibold px-5 py-3 rounded-lg hover:bg-forest-50 transition-colors">
                {secondaryAction}
              </button>
            )}
          </div>
        )}
      </div>

      <div className="relative">
        <div className="bg-forest-100 rounded-2xl aspect-[4/3] flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-24 sm:w-32 text-forest-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M10 80 L40 30 L55 55 L70 25 L95 80 Z" strokeLinejoin="round" />
          </svg>
        </div>

        {rating && (
          <div className="absolute -bottom-4 left-4 sm:-left-6 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3">
            <span className="text-forest-500 text-lg">★</span>
            <div>
              <p className="font-semibold text-forest-900 text-sm">{rating.score}</p>
              <p className="text-forest-800/60 text-xs">{rating.label}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
