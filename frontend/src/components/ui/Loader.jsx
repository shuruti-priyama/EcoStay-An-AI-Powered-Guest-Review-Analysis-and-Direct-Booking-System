/**
 * Loader
 *
 * @param {Object} props
 * @param {'spinner'|'skeleton'} [props.variant='spinner'] - Visual style.
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Size of the spinner (ignored for skeleton).
 * @param {number} [props.lines=3] - Number of skeleton lines (skeleton variant only).
 * @param {string} [props.label='Loading...'] - Accessible label for screen readers.
 * @param {string} [props.className] - Additional classes to merge in.
 */
export default function Loader({
  variant = 'spinner',
  size = 'md',
  lines = 3,
  label = 'Loading...',
  className = '',
}) {
  if (variant === 'skeleton') {
    return (
      <div role="status" aria-label={label} className={`w-full space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-4 rounded bg-forest-100 dark:bg-forest-700 animate-pulse"
            style={{ width: i === lines - 1 ? '60%' : '100%' }}
          />
        ))}
        <span className="sr-only">{label}</span>
      </div>
    )
  }

  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-[3px]',
    lg: 'w-12 h-12 border-4',
  }

  return (
    <div role="status" aria-label={label} className={`inline-flex items-center justify-center ${className}`}>
      <div
        className={`${sizes[size]} rounded-full border-forest-200 dark:border-forest-700 border-t-forest-600 dark:border-t-forest-300 animate-spin`}
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}