export default function Card({
  badge,
  icon,
  title,
  description,
  meta,
  price,
  primaryAction,
  secondaryAction,
  disabled,
}) {
  return (
    <div className="bg-white dark:bg-forest-800 border border-forest-100 dark:border-forest-700 rounded-xl overflow-hidden flex flex-col">
      <div className="relative bg-forest-50 dark:bg-forest-900 aspect-[5/3] flex items-center justify-center">
        {icon && <span className="text-4xl text-forest-300 dark:text-forest-500">{icon}</span>}
        {badge && (
          <span
            className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
              badge === 'Booked'
                ? 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-200'
                : 'bg-forest-600 text-white'
            }`}
          >
            {badge}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-forest-900 dark:text-forest-50 mb-1">{title}</h3>
        {description && (
          <p className="text-forest-800/60 dark:text-forest-100/60 text-sm mb-2">{description}</p>
        )}
        {meta && (
          <p className="text-forest-800/60 dark:text-forest-100/60 text-xs mb-1">{meta}</p>
        )}
        {price && (
          <p className="text-forest-900 dark:text-forest-50 font-semibold mb-4">{price}</p>
        )}

        {(primaryAction || secondaryAction) && (
          <div className="mt-auto flex gap-2 pt-2">
            {secondaryAction && (
              <button className="flex-1 border border-forest-200 dark:border-forest-600 text-forest-800 dark:text-forest-100 text-sm font-medium px-3 py-2 rounded-lg hover:bg-forest-50 dark:hover:bg-forest-700 transition-colors">
                {secondaryAction}
              </button>
            )}
            {primaryAction && (
              <button
                disabled={disabled}
                className={`flex-1 text-sm font-semibold px-3 py-2 rounded-lg transition-colors ${
                  disabled
                    ? 'bg-forest-50 dark:bg-forest-700 text-forest-800/40 dark:text-forest-100/40 cursor-not-allowed'
                    : 'bg-forest-700 text-white hover:bg-forest-800 dark:bg-forest-600 dark:hover:bg-forest-500'
                }`}
              >
                {primaryAction}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}