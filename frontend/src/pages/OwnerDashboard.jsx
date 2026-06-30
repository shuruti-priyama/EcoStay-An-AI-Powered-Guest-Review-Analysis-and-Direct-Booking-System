import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck,
  Star,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  ChevronRight,
  Leaf,
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
      <div className="w-14 h-14 rounded-2xl bg-eco-500/10 flex items-center justify-center mb-4">
        <Icon size={26} className="text-eco-400" />
      </div>
      <h3 className="text-base font-bold text-slate-700 dark:text-slate-200 mb-1">{title}</h3>
      <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs leading-relaxed">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-eco-500 bg-eco-500/10 px-3 py-1.5 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-eco-400 animate-pulse" />
        Awaiting MongoDB Integration
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Owner Dashboard page
───────────────────────────────────────────── */
export default function OwnerDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('ecostay-user')
    if (!stored) { navigate('/login'); return }
    const parsed = JSON.parse(stored)
    if (parsed.role !== 'owner') { navigate('/dashboard/guest'); return }
    setUser(parsed)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('ecostay-token')
    localStorage.removeItem('ecostay-user')
    navigate('/login')
  }

  const sidebarSections = [
    {
      heading: 'Management',
      items: [
        { icon: LayoutDashboard, label: 'Overview', active: true },
        { icon: BedDouble,       label: 'My Rooms' },
        { icon: CalendarCheck,   label: 'Bookings' },
      ],
    },
    {
      heading: 'Insights',
      items: [
        { icon: Star,          label: 'Guest Reviews' },
        { icon: BarChart3,     label: 'Analytics' },
        { icon: MessageSquare, label: 'AI Review Assistant' },
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
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-eco-500 to-eco-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-eco-500/30">
                  {user?.name?.[0] ?? 'O'}
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm leading-tight">{user?.name ?? '—'}</p>
                  <p className="text-xs text-eco-500 font-semibold">Homestay Owner</p>
                </div>
              </div>
              <div className="h-px bg-slate-100 dark:bg-slate-700 mb-3" />
              <div className="flex items-center gap-1.5">
                <Leaf size={12} className="text-eco-500" />
                <span className="text-xs text-slate-400">Trishul Eco-Homestays</span>
              </div>
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
            <p className="text-eco-500 font-bold text-xs uppercase tracking-widest mb-1">Owner Dashboard</p>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''} 👋
            </h1>
            <p className="text-slate-400 mt-1 text-sm">
              Your property management hub — data will appear once MongoDB is connected.
            </p>
          </div>

          {/* Status banner */}
          <div className="mb-8 animate-fade-in-up animate-delay-100">
            <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-2xl px-5 py-4">
              <span className="text-xl mt-0.5">🔌</span>
              <div>
                <p className="font-bold text-amber-700 dark:text-amber-300 text-sm">Database not connected yet</p>
                <p className="text-amber-600 dark:text-amber-400/80 text-xs mt-0.5 leading-relaxed">
                  All sections below are ready and waiting. Once the MongoDB integration is complete, your live bookings, room data, analytics, and review insights will appear here automatically.
                </p>
              </div>
            </div>
          </div>

          {/* Stat cards skeleton placeholders */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in-up animate-delay-200">
            {[
              { icon: BedDouble,     label: 'Total Rooms',    color: 'from-eco-400 to-eco-600' },
              { icon: CalendarCheck, label: 'Bookings',       color: 'from-sky-400 to-blue-500' },
              { icon: Star,          label: 'Avg. Rating',    color: 'from-amber-400 to-orange-500' },
              { icon: BarChart3,     label: 'Revenue',        color: 'from-purple-400 to-purple-600' },
            ].map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-3 shadow-lg`}>
                  <Icon size={18} />
                </div>
                <div className="h-6 w-16 rounded-lg skeleton mb-1" />
                <p className="text-xs text-slate-400 font-medium">{label}</p>
                <p className="text-[10px] text-eco-500 mt-1 font-semibold">— awaiting data</p>
              </div>
            ))}
          </div>

          {/* Content sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 animate-fade-in-up animate-delay-300">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6">
              <h2 className="font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                <CalendarCheck size={16} className="text-eco-500" /> Recent Bookings
              </h2>
              <EmptyCard
                icon={CalendarCheck}
                title="No bookings yet"
                description="Guest booking records will appear here once the database is connected."
              />
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6">
              <h2 className="font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                <BedDouble size={16} className="text-eco-500" /> My Rooms
              </h2>
              <EmptyCard
                icon={BedDouble}
                title="No rooms listed"
                description="Your property rooms will be managed and displayed here once the database is set up."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-up animate-delay-400">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6">
              <h2 className="font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                <Star size={16} className="text-eco-500" /> Guest Reviews
              </h2>
              <EmptyCard
                icon={Star}
                title="No reviews yet"
                description="Guest reviews and AI-powered sentiment insights will appear here once connected."
              />
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6">
              <h2 className="font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                <BarChart3 size={16} className="text-eco-500" /> Analytics Overview
              </h2>
              <EmptyCard
                icon={BarChart3}
                title="No analytics data"
                description="Occupancy rates, revenue charts, and trends will be shown here post-integration."
              />
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
