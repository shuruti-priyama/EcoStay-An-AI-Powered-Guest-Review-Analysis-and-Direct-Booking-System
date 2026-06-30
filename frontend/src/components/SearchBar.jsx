import { useState } from 'react'
import { Calendar, Users, Search, ChevronDown, Minus, Plus } from 'lucide-react'

export default function SearchBar() {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [travelers, setTravelers] = useState({ adults: 2, children: 0, rooms: 1 })
  const [showTravelers, setShowTravelers] = useState(false)
  const today = new Date().toISOString().split('T')[0]
  const update = (key, d, min = 0) => setTravelers(p => ({ ...p, [key]: Math.max(min, p[key] + d) }))
  const summary = `${travelers.adults} adults · ${travelers.children} children · ${travelers.rooms} room${travelers.rooms !== 1 ? 's' : ''}`

  return (
    <div className="bg-eco-950/90 backdrop-blur-md border-b border-eco-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-eco-950/20 p-2 flex flex-col sm:flex-row gap-2 items-stretch border border-slate-100 dark:border-slate-700">
          {/* Check-in */}
          <div className="flex-1 flex items-center gap-2.5 px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer">
            <Calendar size={16} className="text-eco-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Check-in</label>
              <input type="date" value={checkIn} min={today} onChange={e => setCheckIn(e.target.value)}
                className="w-full text-sm font-medium text-slate-800 dark:text-white outline-none bg-transparent [color-scheme:light] dark:[color-scheme:dark]" />
            </div>
          </div>

          <div className="hidden sm:block w-px bg-slate-100 dark:bg-slate-700 my-1" />

          {/* Check-out */}
          <div className="flex-1 flex items-center gap-2.5 px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer">
            <Calendar size={16} className="text-eco-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Check-out</label>
              <input type="date" value={checkOut} min={checkIn || today} onChange={e => setCheckOut(e.target.value)}
                className="w-full text-sm font-medium text-slate-800 dark:text-white outline-none bg-transparent [color-scheme:light] dark:[color-scheme:dark]" />
            </div>
          </div>

          <div className="hidden sm:block w-px bg-slate-100 dark:bg-slate-700 my-1" />

          {/* Travelers */}
          <div className="flex-1 relative">
            <button type="button" onClick={() => setShowTravelers(s => !s)}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left">
              <Users size={16} className="text-eco-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Travellers</p>
                <p className="text-sm font-medium text-slate-800 dark:text-white truncate">{summary}</p>
              </div>
              <ChevronDown size={14} className={`text-slate-400 transition-transform ${showTravelers ? 'rotate-180' : ''}`} />
            </button>
            {showTravelers && (
              <div className="absolute z-20 top-full mt-2 left-0 right-0 sm:w-72 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-2xl p-4 space-y-4">
                {[{ key: 'adults', label: 'Adults', sub: 'Ages 13+', min: 1 }, { key: 'children', label: 'Children', sub: 'Ages 2–12', min: 0 }, { key: 'rooms', label: 'Rooms', sub: '', min: 1 }].map(({ key, label, sub, min }) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-white">{label}</p>
                      {sub && <p className="text-xs text-slate-400">{sub}</p>}
                    </div>
                    <div className="flex items-center gap-3">
                      <button type="button" onClick={() => update(key, -1, min)} disabled={travelers[key] <= min}
                        className="w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:border-eco-400 disabled:opacity-30 transition-colors">
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-bold text-slate-800 dark:text-white w-5 text-center">{travelers[key]}</span>
                      <button type="button" onClick={() => update(key, 1)}
                        className="w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:border-eco-400 transition-colors">
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={() => setShowTravelers(false)}
                  className="w-full bg-gradient-to-r from-eco-500 to-eco-600 text-white font-bold py-2.5 rounded-xl hover:from-eco-400 hover:to-eco-500 transition-all">
                  Done
                </button>
              </div>
            )}
          </div>

          {/* Search btn */}
          <button type="button"
            className="bg-gradient-to-r from-eco-500 to-eco-600 text-white font-bold px-6 py-3 rounded-xl hover:from-eco-400 hover:to-eco-500 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-eco-500/30 flex items-center justify-center gap-2 btn-ripple">
            <Search size={18} /> Search
          </button>
        </div>
      </div>
    </div>
  )
}
