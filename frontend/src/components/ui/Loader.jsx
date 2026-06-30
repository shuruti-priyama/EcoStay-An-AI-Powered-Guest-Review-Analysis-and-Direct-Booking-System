/**
 * Loader
 * @param {'spinner'|'skeleton'|'dots'} [props.variant='spinner']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {number} [props.lines=3]
 * @param {string} [props.label='Loading...']
 */
export default function Loader({ variant = 'spinner', size = 'md', lines = 3, label = 'Loading...', className = '' }) {
  if (variant === 'skeleton') {
    return (
      <div role="status" aria-label={label} className={`w-full space-y-3 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="skeleton h-4 rounded-xl" style={{ width: i === lines - 1 ? '60%' : '100%' }} />
        ))}
        <span className="sr-only">{label}</span>
      </div>
    )
  }
  if (variant === 'dots') {
    return (
      <div role="status" aria-label={label} className={`flex gap-1.5 items-center ${className}`}>
        {[0, 1, 2].map(i => (
          <div key={i} className="w-2 h-2 rounded-full bg-eco-500 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
        <span className="sr-only">{label}</span>
      </div>
    )
  }
  const sizes = { sm: 'w-4 h-4 border-2', md: 'w-8 h-8 border-[3px]', lg: 'w-12 h-12 border-4' }
  return (
    <div role="status" aria-label={label} className={`inline-flex items-center justify-center ${className}`}>
      <div className={`${sizes[size]} rounded-full border-eco-100 dark:border-eco-900 border-t-eco-500 animate-spin`} />
      <span className="sr-only">{label}</span>
    </div>
  )
}
