import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  LayoutDashboard,
  Search,
  CalendarCheck,
  Star,
  Heart,
  MessageSquare,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react'

/* ─────────────────────────────────────────────
   Sidebar item component
───────────────────────────────────────────── */
function SidebarItem({ icon: Icon, label, active = false }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group
        ${active
          ? 'bg-eco-500/15 text-eco-400 border border-eco-500/20'
          : 'text-slate-400 hover:text-white hover:bg-white/5'
        }`}
    >
      <Icon size={18} className={active ? 'text-eco-400' : 'text-slate-500 group-hover:text-slate-300'} />
      {label}
      {active && <ChevronRight size={14} className="ml-auto text-eco-400" />}
    </button>
  )
}

/* ─────────────────────────────────────────────
   Empty state placeholder card
───────────────────────────────────────────── */
function EmptyCard({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-center">
      <div className="w-14 h-14 rounded-2xl bg-sky-500/10 flex items-center justify-center mb-4">
        <Icon size={26} className="text-sky-400" />
      </div>
      <h3 className="text-base font-bold text-slate-700 dark:text-slate-200 mb-1">{title}</h3>
      <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs leading-relaxed">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-sky-500 bg-sky-500/10 px-3 py-1.5 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
        Awaiting MongoDB Integration
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Guest Dashboard page
───────────────────────────────────────────── */
export default function GuestDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('ecostay-user')
    if (!stored) { navigate('/login'); return }
    const parsed = JSON.parse(stored)
    if (parsed.role !== 'guest') { navigate('/dashboard/owner'); return }
    setUser(parsed)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('ecostay-token')
    localStorage.removeItem('ecostay-user')
    navigate('/login')
  }

  const sidebarSections = [
    {
      heading: 'My Stay',
      items: [
        { icon: LayoutDashboard, label: 'Overview',     active: true },
        { icon: CalendarCheck,   label: 'My Bookings' },
        { icon: Heart,           label: 'Saved Rooms' },
      ],
    },
    {
      heading: 'Activity',
      items: [
        { icon: Star,          label: 'My Reviews' },
        { icon: MessageSquare, label: 'Messages' },
        { icon: Search,        label: 'Explore Rooms' },
      ],
    },
    {
      heading: 'Account',
      items: [
        { icon: Settings, label: 'Settings' },
      ],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <Navbar user={user} onLogout={handleLogout} />

      <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 gap-6">

        {/* ── Sidebar ── */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0">
          <div className="sticky top-24 flex flex-col gap-6">
            {/* Profile card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-sky-500/30">
                  {user?.name?.[0] ?? 'G'}
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm leading-tight">{user?.name ?? '—'}</p>
                  <p className="text-xs text-sky-500 font-semibold">Guest</p>
                </div>
              </div>
              <div className="h-px bg-slate-100 dark:bg-slate-700 mb-3" />
              <p className="text-xs text-slate-400">{user?.email ?? '—'}</p>
            </div>

            {/* Nav sections */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-3 flex flex-col gap-4">
              {sidebarSections.map((section) => (
                <div key={section.heading}>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold px-4 mb-1.5">{section.heading}</p>
                  <div className="flex flex-col gap-0.5">
                    {section.items.map((item) => (
                      <SidebarItem key={item.label} {...item} />
                    ))}
                  </div>
                </div>
              ))}

              <div className="h-px bg-slate-100 dark:bg-slate-700" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-200"
              >
                <LogOut size={18} />
                Log Out
              </button>
            </div>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="flex-1 min-w-0">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <p className="text-sky-500 font-bold text-xs uppercase tracking-widest mb-1">Guest Dashboard</p>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              Welcome{user?.name ? `, ${user.name.split(' ')[0]}` : ''} 🌿
            </h1>
            <p className="text-slate-400 mt-1 text-sm">
              Your personal travel hub — data will appear once MongoDB is connected.
            </p>
          </div>

          {/* Status banner */}
          <div className="mb-8 animate-fade-in-up animate-delay-100">
            <div className="flex items-start gap-3 bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800/40 rounded-2xl px-5 py-4">
              <span className="text-xl mt-0.5">🔌</span>
              <div>
                <p className="font-bold text-sky-700 dark:text-sky-300 text-sm">Database not connected yet</p>
                <p className="text-sky-600 dark:text-sky-400/80 text-xs mt-0.5 leading-relaxed">
                  All sections below are ready and waiting. Once MongoDB is integrated, your bookings, saved rooms, reviews, and messages will show up here automatically.
                </p>
              </div>
            </div>
          </div>

          {/* Stat cards skeleton placeholders */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8 animate-fade-in-up animate-delay-200">
            {[
              { icon: CalendarCheck, label: 'My Bookings', color: 'from-sky-400 to-blue-500' },
              { icon: Star,          label: 'Reviews Given', color: 'from-amber-400 to-orange-500' },
              { icon: Heart,         label: 'Saved Rooms',   color: 'from-rose-400 to-pink-500' },
            ].map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-3 shadow-lg`}>
                  <Icon size={18} />
                </div>
                <div className="h-6 w-12 rounded-lg skeleton mb-1" />
                <p className="text-xs text-slate-400 font-medium">{label}</p>
                <p className="text-[10px] text-sky-500 mt-1 font-semibold">— awaiting data</p>
              </div>
            ))}
          </div>

          {/* Content sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 animate-fade-in-up animate-delay-300">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6">
              <h2 className="font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                <CalendarCheck size={16} className="text-sky-500" /> My Bookings
              </h2>
              <EmptyCard
                icon={CalendarCheck}
                title="No bookings yet"
                description="Your past and upcoming stay records will appear here once the database is connected."
              />
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6">
              <h2 className="font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                <Heart size={16} className="text-rose-400" /> Saved Rooms
              </h2>
              <EmptyCard
                icon={Heart}
                title="No saved rooms"
                description="Rooms you wishlist or save for later will be displayed here after integration."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-up animate-delay-400">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6">
              <h2 className="font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                <Star size={16} className="text-amber-400" /> My Reviews
              </h2>
              <EmptyCard
                icon={Star}
                title="No reviews written"
                description="Reviews you've submitted for your past stays will be listed here."
              />
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6">
              <h2 className="font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                <MessageSquare size={16} className="text-sky-400" /> Messages
              </h2>
              <EmptyCard
                icon={MessageSquare}
                title="No messages"
                description="Communication threads with homestay owners will be visible here post-integration."
              />
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
