import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/useTheme'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  return (
    <button type="button" onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`w-9 h-9 rounded-xl border border-eco-700/40 text-slate-300 hover:text-white hover:bg-eco-800 transition-all duration-200 hover:scale-105 flex items-center justify-center ${className}`}>
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
