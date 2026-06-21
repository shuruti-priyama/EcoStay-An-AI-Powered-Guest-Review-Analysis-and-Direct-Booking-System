import { useCallback, useState } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle2, XCircle, Info, X } from 'lucide-react'
import { ToastContext } from './toast-context'

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
}

const STYLES = {
  success: 'border-forest-300 dark:border-forest-600 text-forest-800 dark:text-forest-50',
  error: 'border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-200',
  info: 'border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-200',
}

/**
 * ToastProvider
 * Wrap your app (or a section of it) with this to enable the `useToast()` hook.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((t) => t.id !== id))
  }, [])

  /**
   * showToast(message, { type = 'info', duration = 3000 })
   * type: 'success' | 'error' | 'info'
   */
  const showToast = useCallback(
    (message, { type = 'info', duration = 3000 } = {}) => {
      const id = Date.now() + Math.random()
      setToasts((current) => [...current, { id, message, type }])
      if (duration > 0) {
        setTimeout(() => dismissToast(id), duration)
      }
      return id
    },
    [dismissToast]
  )

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      {createPortal(
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm">
          {toasts.map((t) => {
            const Icon = ICONS[t.type] || Info
            return (
              <div
                key={t.id}
                role="status"
                className={`flex items-start gap-2 bg-white dark:bg-forest-800 border rounded-lg shadow-lg px-4 py-3 text-sm animate-[toast-in_0.2s_ease-out] ${STYLES[t.type] || STYLES.info}`}
              >
                <Icon size={18} className="shrink-0 mt-0.5" />
                <p className="flex-1">{t.message}</p>
                <button
                  type="button"
                  onClick={() => dismissToast(t.id)}
                  aria-label="Dismiss"
                  className="shrink-0 text-forest-400 hover:text-forest-700 dark:hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>
            )
          })}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}