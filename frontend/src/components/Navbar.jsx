import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Leaf, Menu, X, LogOut } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const navLinks = [
    { to: '/',      label: 'Home' },
    { to: '/about', label: 'About' },
  ]

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    } else {
      localStorage.removeItem('ecostay-token')
      localStorage.removeItem('ecostay-user')
      navigate('/login')
    }
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-eco-950/95 backdrop-blur-md border-b border-eco-800/40">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="bg-gradient-to-br from-eco-500 to-eco-600 rounded-xl p-1.5 flex items-center justify-center shadow-lg shadow-eco-500/30 group-hover:shadow-eco-500/50 transition-shadow duration-300">
            <Leaf size={18} className="text-white" />
          </span>
          <div>
            <span className="text-white font-bold text-lg leading-none">EcoStay</span>
            <span className="hidden sm:block text-eco-400 text-[10px] font-medium leading-none">Trishul Eco-Homestays</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-eco-500/20 text-eco-400'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {user ? (
            /* Logged-in state */
            <div className="hidden sm:flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-eco-500 to-eco-600 flex items-center justify-center text-white text-xs font-black">
                  {user.name?.[0] ?? '?'}
                </div>
                <span className="text-slate-300 text-sm font-medium">{user.name?.split(' ')[0]}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold px-3 py-2 rounded-xl hover:bg-red-500/20 hover:text-red-300 transition-all duration-200"
              >
                <LogOut size={14} />
                Log out
              </button>
            </div>
          ) : (
            /* Guest state */
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-eco-500 to-eco-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:from-eco-400 hover:to-eco-500 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-eco-500/30 btn-ripple"
            >
              Log in
            </Link>
          )}

          <button
            className="md:hidden text-slate-300 hover:text-white p-1"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-eco-950/98 border-t border-eco-800/40 px-4 py-4 animate-fade-in">
          <div className="space-y-1 mb-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'bg-eco-500/20 text-eco-400' : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {user ? (
            <button
              onClick={handleLogout}
              className="block w-full text-center bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold px-4 py-3 rounded-xl hover:bg-red-500/20"
            >
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block w-full text-center bg-gradient-to-r from-eco-500 to-eco-600 text-white text-sm font-semibold px-4 py-3 rounded-xl"
            >
              Log in
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
