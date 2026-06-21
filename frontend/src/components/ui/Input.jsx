/**
 * Input
 *
 * @param {Object} props
 * @param {string} [props.label] - Label text shown above the input.
 * @param {string} [props.placeholder] - Placeholder text.
 * @param {string} [props.type='text'] - Native input type (text, email, password, date, ...).
 * @param {string} props.value - Controlled input value.
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} props.onChange - Change handler.
 * @param {string} [props.error] - Error message; when present, the input is styled as invalid.
 * @param {string} [props.id] - Input id (auto-generated from label if omitted).
 * @param {string} [props.className] - Additional classes to merge in.
 */
export default function Input({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  id,
  className = '',
  ...rest
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-forest-900 dark:text-forest-50 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`w-full border rounded-lg px-3 py-2 text-sm outline-none transition-colors
          bg-white dark:bg-forest-800 text-forest-900 dark:text-forest-50
          placeholder-forest-800/30 dark:placeholder-forest-50/30
          ${
            error
              ? 'border-rose-400 focus:ring-2 focus:ring-rose-300'
              : 'border-forest-200 dark:border-forest-600 focus:ring-2 focus:ring-forest-300 dark:focus:ring-forest-500'
          } ${className}`}
        {...rest}
      />
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-xs text-rose-500">
          {error}
        </p>
      )}
    </div>
  )
}