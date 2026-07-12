import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Leaf, User, LogOut, LayoutDashboard, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`theme-toggle ${className}`}
    >
      <span className="theme-toggle-thumb">
        {isDark ? <Moon size={13} /> : <Sun size={13} />}
      </span>
    </button>
  );
};

const navLinkClass = ({ isActive }) =>
  `font-body text-sm font-medium transition-colors ${
    isActive ? 'text-clay-500' : 'text-forest-800 dark:text-sand-50 hover:text-clay-500'
  }`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, isAdmin, isOwner, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-forest-100 dark:border-forest-700 bg-sand-50/95 dark:bg-forest-950/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-700 text-sand-50">
            <Leaf size={18} />
          </span>
          <span className="font-display text-xl font-semibold leading-none text-forest-800 dark:text-sand-50">
            EcoStay
            <span className="block font-body text-[10px] font-normal uppercase tracking-[0.18em] text-clay-500">
              Trishul Eco-Homestays
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
          <NavLink to="/rooms" className={navLinkClass}>Rooms</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>

          {isAuthenticated && !isAdmin && !isOwner && (
            <NavLink to="/my-bookings" className={navLinkClass}>My Bookings</NavLink>
          )}
          {isAdmin && (
            <NavLink to="/admin" className={navLinkClass}>Dashboard</NavLink>
          )}
          {isOwner && (
            <NavLink to="/owner" className={navLinkClass}>Owner Dashboard</NavLink>
          )}

          <ThemeToggle />

          {!isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to="/login" className="btn-outline !px-5 !py-2 text-sm">Log in</Link>
              <Link to="/register" className="btn-accent !px-5 !py-2 text-sm">Register</Link>
            </div>
          ) : (
            <div className="flex items-center gap-3 pl-2">
              <span className="flex items-center gap-2 text-sm font-medium text-forest-800 dark:text-sand-50">
                <User size={16} /> {user.name.split(' ')[0]}
              </span>
              <button onClick={handleLogout} className="flex items-center gap-1 text-sm font-medium text-forest-700 dark:text-sand-200 hover:text-clay-500">
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X size={26} className="text-forest-800 dark:text-sand-50" /> : <Menu size={26} className="text-forest-800 dark:text-sand-50" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-forest-100 dark:border-forest-700 bg-sand-50 dark:bg-forest-950 px-5 pb-6 pt-2 md:hidden">
          <div className="flex flex-col gap-4 pt-3">
            <NavLink to="/" end className={navLinkClass} onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/rooms" className={navLinkClass} onClick={() => setOpen(false)}>Rooms</NavLink>
            <NavLink to="/about" className={navLinkClass} onClick={() => setOpen(false)}>About</NavLink>

            {isAuthenticated && !isAdmin && !isOwner && (
              <NavLink to="/my-bookings" className={navLinkClass} onClick={() => setOpen(false)}>My Bookings</NavLink>
            )}
            {isAdmin && (
              <NavLink to="/admin" className={navLinkClass} onClick={() => setOpen(false)}>
                <span className="flex items-center gap-1"><LayoutDashboard size={16}/> Dashboard</span>
              </NavLink>
            )}
            {isOwner && (
              <NavLink to="/owner" className={navLinkClass} onClick={() => setOpen(false)}>
                <span className="flex items-center gap-1"><LayoutDashboard size={16}/> Owner Dashboard</span>
              </NavLink>
            )}

            {!isAuthenticated ? (
              <div className="flex gap-3 pt-2">
                <Link to="/login" className="btn-outline flex-1 !py-2 text-sm" onClick={() => setOpen(false)}>Log in</Link>
                <Link to="/register" className="btn-accent flex-1 !py-2 text-sm" onClick={() => setOpen(false)}>Register</Link>
              </div>
            ) : (
              <button onClick={handleLogout} className="flex items-center gap-1 pt-2 text-sm font-medium text-forest-700 dark:text-sand-200">
                <LogOut size={16} /> Logout ({user.name.split(' ')[0]})
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
