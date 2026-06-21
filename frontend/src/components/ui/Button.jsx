/**
 * Button
 *
 * @param {Object} props
 * @param {'primary'|'secondary'|'outline'} [props.variant='primary'] - Visual style of the button.
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Size of the button (padding + font size).
 * @param {boolean} [props.disabled=false] - Disables the button and applies disabled styling.
 * @param {() => void} [props.onClick] - Click handler.
 * @param {'button'|'submit'|'reset'} [props.type='button'] - Native button type.
 * @param {React.ReactNode} props.children - Button label/content.
 * @param {string} [props.className] - Additional classes to merge in.
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  children,
  className = '',
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-forest-900 disabled:cursor-not-allowed disabled:opacity-50'

  const variants = {
    primary:
      'bg-forest-700 text-white hover:bg-forest-800 dark:bg-forest-600 dark:hover:bg-forest-500',
    secondary:
      'bg-forest-50 text-forest-900 hover:bg-forest-100 dark:bg-forest-800 dark:text-forest-50 dark:hover:bg-forest-700',
    outline:
      'border border-forest-200 text-forest-800 hover:bg-forest-50 dark:border-forest-600 dark:text-forest-100 dark:hover:bg-forest-800',
  }

  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2.5',
    lg: 'text-base px-6 py-3',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}