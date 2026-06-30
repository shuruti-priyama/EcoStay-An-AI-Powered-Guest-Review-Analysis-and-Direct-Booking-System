import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

/**
 * Modal
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible.
 * @param {() => void} props.onClose - Called when the modal should close (Escape, backdrop click, or close button).
 * @param {string} [props.title] - Title shown in the modal header.
 * @param {React.ReactNode} props.children - Modal body content.
 */
export default function Modal({ isOpen, onClose, title, children }) {
  const dialogRef = useRef(null)
  const previouslyFocused = useRef(null)

  // Escape key closes the modal
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose?.()
        return
      }

      // Basic focus trap: keep Tab navigation within the dialog
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Move focus into the modal on open, restore it on close
  useEffect(() => {
    if (isOpen) {
      previouslyFocused.current = document.activeElement
      dialogRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      previouslyFocused.current?.focus?.()
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-forest-950/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        tabIndex={-1}
        className="relative w-full max-w-md bg-white dark:bg-forest-800 rounded-xl shadow-xl p-6 outline-none"
      >
        <div className="flex items-start justify-between mb-4">
          {title && (
            <h2 id="modal-title" className="text-lg font-semibold text-forest-900 dark:text-forest-50">
              {title}
            </h2>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="ml-auto text-forest-400 hover:text-forest-700 dark:text-forest-300 dark:hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="text-sm text-forest-800/80 dark:text-forest-100/80">{children}</div>
      </div>
    </div>,
    document.body
  )
}
