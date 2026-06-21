import { useContext } from 'react'
import { ToastContext } from './toast-context'

/**
 * useToast()
 * @returns {{ showToast: (message: string, options?: { type?: 'success'|'error'|'info', duration?: number }) => void, dismissToast: (id: number) => void }}
 */
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}