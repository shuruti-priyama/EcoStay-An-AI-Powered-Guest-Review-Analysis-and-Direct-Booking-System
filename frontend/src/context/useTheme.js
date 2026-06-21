import { useContext } from 'react'
import { ThemeContext } from './theme-context'

/** Hook to access { theme, setTheme, toggleTheme } from any component. */
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}