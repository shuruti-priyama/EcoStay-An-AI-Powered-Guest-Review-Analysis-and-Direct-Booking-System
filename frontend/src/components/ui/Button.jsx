/**
 * Button
 * @param {'primary'|'secondary'|'outline'|'ghost'|'danger'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {boolean} [props.disabled=false]
 * @param {boolean} [props.loading=false]
 * @param {React.ReactNode} [props.icon]
 * @param {() => void} [props.onClick]
 * @param {'button'|'submit'|'reset'} [props.type='button']
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 */
import { Loader2 } from 'lucide-react'
export default function Button({ variant = 'primary', size = 'md', disabled = false, loading = false, icon, onClick, type = 'button', children, className = '', ...rest }) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-eco-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 btn-ripple'
  const variants = {
    primary: 'bg-gradient-to-r from-eco-500 to-eco-600 text-white hover:from-eco-400 hover:to-eco-500 hover:shadow-lg hover:shadow-eco-500/30 hover:scale-[1.02]',
    secondary: 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600 hover:scale-[1.02]',
    outline: 'border-2 border-eco-500 text-eco-600 dark:text-eco-400 hover:bg-eco-50 dark:hover:bg-eco-950 hover:scale-[1.02]',
    ghost: 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700',
    danger: 'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30 hover:scale-[1.02]',
  }
  const sizes = { sm: 'text-xs px-3 py-1.5', md: 'text-sm px-4 py-2.5', lg: 'text-base px-6 py-3' }
  return (
    <button type={type} onClick={onClick} disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {loading ? <Loader2 size={16} className="animate-spin" /> : icon}
      {children}
    </button>
  )
}
