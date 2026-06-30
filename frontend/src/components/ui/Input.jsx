/**
 * Input
 * @param {string} [props.label]
 * @param {string} [props.placeholder]
 * @param {string} [props.type='text']
 * @param {string} props.value
 * @param {Function} props.onChange
 * @param {string} [props.error]
 * @param {React.ReactNode} [props.icon]
 * @param {string} [props.id]
 * @param {string} [props.className]
 */
export default function Input({ label, placeholder, type = 'text', value, onChange, error, icon, id, className = '', ...rest }) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>}
        <input id={inputId} type={type} value={value} onChange={onChange} placeholder={placeholder}
          aria-invalid={Boolean(error)} aria-describedby={error ? `${inputId}-error` : undefined}
          className={`w-full ${icon ? 'pl-9' : 'pl-3.5'} pr-3.5 py-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border-2 text-slate-900 dark:text-white placeholder-slate-400 outline-none transition-all duration-200
            ${error ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-slate-200 dark:border-slate-600 focus:border-eco-400 focus:ring-2 focus:ring-eco-100 dark:focus:ring-eco-900'} ${className}`}
          {...rest} />
      </div>
      {error && <p id={`${inputId}-error`} className="mt-1.5 text-xs text-red-500 flex items-center gap-1">⚠ {error}</p>}
    </div>
  )
}
