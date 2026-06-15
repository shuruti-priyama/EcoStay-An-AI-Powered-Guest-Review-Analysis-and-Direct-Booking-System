import { useState } from 'react'
import { Calendar, Users, Search, ChevronDown, ChevronUp, Minus, Plus } from 'lucide-react'

export default function SearchBar() {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [travelers, setTravelers] = useState({ adults: 2, children: 0, rooms: 1 })
  const [showTravelers, setShowTravelers] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  const updateCount = (key, delta, min = 0) => {
    setTravelers((prev) => ({
      ...prev,
      [key]: Math.max(min, prev[key] + delta),
    }))
  }

  const travelerSummary = `${travelers.adults} adult${travelers.adults !== 1 ? 's' : ''} · ${travelers.children} child${travelers.children !== 1 ? 'ren' : ''} · ${travelers.rooms} room${travelers.rooms !== 1 ? 's' : ''}`

  const handleSearch = () => {
    console.log('Search availability', { checkIn, checkOut, travelers })
  }

  return (
    <div className="bg-forest-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="bg-white rounded-xl shadow-md p-2 flex flex-col sm:flex-row gap-2 sm:items-stretch">
          {/* Check-in */}
          <div className="flex-1">
            <label className="block text-xs font-semibold text-forest-900 px-3 pt-1">
              Check-in
            </label>
            <div className="flex items-center gap-2 px-3 pb-1.5">
              <Calendar size={16} className="text-forest-500 shrink-0" />
              <input
                type="date"
                value={checkIn}
                min={today}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full text-sm text-forest-900 outline-none bg-transparent [color-scheme:light]"
              />
            </div>
          </div>

          <div className="hidden sm:block w-px bg-forest-100 my-1" />

          {/* Check-out */}
          <div className="flex-1">
            <label className="block text-xs font-semibold text-forest-900 px-3 pt-1">
              Check-out
            </label>
            <div className="flex items-center gap-2 px-3 pb-1.5">
              <Calendar size={16} className="text-forest-500 shrink-0" />
              <input
                type="date"
                value={checkOut}
                min={checkIn || today}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full text-sm text-forest-900 outline-none bg-transparent [color-scheme:light]"
              />
            </div>
          </div>

          <div className="hidden sm:block w-px bg-forest-100 my-1" />

          {/* Travelers */}
          <div className="flex-1 relative">
            <label className="block text-xs font-semibold text-forest-900 px-3 pt-1">
              Travellers
            </label>
            <button
              type="button"
              onClick={() => setShowTravelers((s) => !s)}
              className="w-full flex items-center gap-2 px-3 pb-1.5 text-left"
            >
              <Users size={16} className="text-forest-500 shrink-0" />
              <span className="text-sm text-forest-900 flex-1 truncate">
                {travelerSummary}
              </span>
              {showTravelers ? (
                <ChevronUp size={16} className="text-forest-400" />
              ) : (
                <ChevronDown size={16} className="text-forest-400" />
              )}
            </button>

            {showTravelers && (
              <div className="absolute z-10 top-full mt-2 left-0 right-0 sm:right-auto sm:w-72 bg-white border border-forest-100 rounded-xl shadow-lg p-4 space-y-4">
                {[
                  { key: 'adults', label: 'Adults', min: 1 },
                  { key: 'children', label: 'Children', min: 0 },
                  { key: 'rooms', label: 'Rooms', min: 1 },
                ].map(({ key, label, min }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-forest-900 font-medium">{label}</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateCount(key, -1, min)}
                        className="w-7 h-7 rounded-full border border-forest-200 flex items-center justify-center text-forest-700 hover:bg-forest-50 disabled:opacity-40"
                        disabled={travelers[key] <= min}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm text-forest-900 w-4 text-center">
                        {travelers[key]}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCount(key, 1)}
                        className="w-7 h-7 rounded-full border border-forest-200 flex items-center justify-center text-forest-700 hover:bg-forest-50"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setShowTravelers(false)}
                  className="w-full bg-forest-700 text-white text-sm font-semibold py-2 rounded-lg hover:bg-forest-800 transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </div>

          {/* Search button */}
          <button
            type="button"
            onClick={handleSearch}
            className="bg-forest-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-forest-800 transition-colors flex items-center justify-center gap-2 sm:self-stretch"
          >
            <Search size={18} />
            Search
          </button>
        </div>
      </div>
    </div>
  )
}
