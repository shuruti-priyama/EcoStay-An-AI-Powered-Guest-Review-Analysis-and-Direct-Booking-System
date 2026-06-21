import { Link, NavLink } from 'react-router-dom'
import { Leaf } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/rooms', label: 'Rooms' },
  ]

  return (
    <header className="bg-forest-800 dark:bg-forest-900 text-cream sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="bg-forest-600 rounded-md p-1.5 flex items-center justify-center">
            <Leaf size={16} />
          </span>
          <span className="text-base">EcoStay</span>
          <span className="hidden sm:inline text-forest-100/60 text-sm font-normal ml-1">
            Trishul Eco-Homestays
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md transition-colors ${
                  isActive
                    ? 'bg-forest-600 text-white'
                    : 'text-forest-100/80 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/login"
            className="bg-white text-forest-800 text-sm font-semibold px-4 py-2 rounded-md hover:bg-forest-50 transition-colors"
          >
            Log in
          </Link>
        </div>
      </nav>

      {/* Mobile nav links */}
      <div className="md:hidden flex justify-center gap-4 text-sm font-medium pb-3 border-t border-forest-700/50 pt-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `px-2 py-1 rounded-md ${
                isActive ? 'bg-forest-600 text-white' : 'text-forest-100/80'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </header>
  )
}