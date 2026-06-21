import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/useTheme'


export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border border-forest-600/40 text-forest-100 hover:bg-forest-700 dark:border-forest-500/40 dark:hover:bg-forest-700 transition-colors ${className}`}
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}