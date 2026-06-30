import { Star } from 'lucide-react'

export default function Card({ badge, image, icon, title, description, meta, price, primaryAction, secondaryAction, disabled, rating, reviewCount }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:shadow-eco-500/10 hover:-translate-y-2 border border-slate-100 dark:border-slate-700">
      <div className="relative overflow-hidden aspect-[4/3]">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-eco-50 to-eco-100 dark:from-eco-950 dark:to-eco-900 flex items-center justify-center">
            {icon && <span className="text-5xl animate-float">{icon}</span>}
          </div>
        )}
        {badge && (
          <span className={`absolute top-3 right-3 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg ${
            badge === 'Booked'
              ? 'bg-red-500 text-white'
              : 'bg-gradient-to-r from-eco-500 to-eco-600 text-white'
          }`}>{badge}</span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-slate-900 dark:text-white mb-1 text-base group-hover:text-eco-600 dark:group-hover:text-eco-400 transition-colors duration-200">{title}</h3>
        {description && <p className="text-slate-500 dark:text-slate-400 text-sm mb-2 line-clamp-2">{description}</p>}
        {meta && <p className="text-slate-400 dark:text-slate-500 text-xs mb-2">{meta}</p>}

        {(rating !== undefined) && (
          <div className="flex items-center gap-1 mb-2">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{rating}</span>
            {reviewCount && <span className="text-xs text-slate-400">({reviewCount} reviews)</span>}
          </div>
        )}

        {price && (
          <div className="mt-auto mb-3">
            <span className="text-eco-600 dark:text-eco-400 font-bold text-lg">₹{typeof price === 'number' ? price.toLocaleString() : price}</span>
            <span className="text-slate-400 text-xs"> / night</span>
          </div>
        )}

        {(primaryAction || secondaryAction) && (
          <div className="flex gap-2">
            {secondaryAction && (
              <button className="flex-1 border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm font-semibold px-3 py-2.5 rounded-xl hover:border-eco-400 hover:text-eco-600 dark:hover:text-eco-400 transition-all duration-200">
                {secondaryAction}
              </button>
            )}
            {primaryAction && (
              <button disabled={disabled}
                className={`flex-1 text-sm font-bold px-3 py-2.5 rounded-xl transition-all duration-200 btn-ripple ${
                  disabled
                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-eco-500 to-eco-600 text-white hover:from-eco-400 hover:to-eco-500 hover:shadow-lg hover:shadow-eco-500/30'
                }`}>{primaryAction}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
