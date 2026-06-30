export default function Hero({ eyebrow, title, highlight, description, primaryAction, secondaryAction, rating }) {
  return (
    <section className="relative min-h-[600px] sm:min-h-[680px] flex items-center overflow-hidden">
      <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&auto=format&fit=crop&q=80"
        alt="Himalayan mountains" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-eco-950/90 via-eco-950/70 to-eco-950/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-eco-950/60 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="max-w-2xl animate-fade-in-up">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 bg-eco-500/20 border border-eco-500/30 rounded-full px-4 py-1.5 mb-5">
              <span className="w-2 h-2 bg-eco-400 rounded-full animate-pulse" />
              <span className="text-eco-300 font-semibold text-xs tracking-widest uppercase">{eyebrow}</span>
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
            {title}{' '}
            {highlight && <span className="gradient-text">{highlight}</span>}
          </h1>
          {description && (
            <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-8 max-w-xl animate-fade-in-up animate-delay-100">
              {description}
            </p>
          )}
          {rating && (
            <div className="flex items-center gap-3 mb-8 animate-fade-in-up animate-delay-200">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-lg">★</span>
                ))}
              </div>
              <span className="text-white/80 text-sm font-medium">{rating.score} · {rating.label}</span>
            </div>
          )}
          {(primaryAction || secondaryAction) && (
            <div className="flex flex-wrap gap-3 animate-fade-in-up animate-delay-300">
              {primaryAction && (
                <button className="bg-gradient-to-r from-eco-500 to-eco-600 text-white font-bold px-7 py-3.5 rounded-2xl hover:from-eco-400 hover:to-eco-500 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-eco-500/40 btn-ripple">
                  {primaryAction}
                </button>
              )}
              {secondaryAction && (
                <button className="glass text-white font-semibold px-7 py-3.5 rounded-2xl hover:bg-white/20 transition-all duration-200 hover:scale-105">
                  {secondaryAction}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-slate-50 dark:from-slate-900 to-transparent" />
    </section>
  )
}
