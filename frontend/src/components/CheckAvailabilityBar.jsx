import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Users, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const CheckAvailabilityBar = ({ className = '' }) => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const handleSearch = (e) => {
    e.preventDefault();

    if (checkIn && checkOut && checkOut <= checkIn) {
      toast.error('Check-out date must be after check-in date');
      return;
    }

    const params = new URLSearchParams();
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (guests) params.set('guests', guests);

    navigate(`/rooms?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`relative z-20 mx-auto flex w-full max-w-5xl flex-col gap-3 rounded-3xl border-2 border-clay-400 bg-forest-800/95 p-4 shadow-soft backdrop-blur sm:flex-row sm:items-center sm:gap-0 sm:divide-x sm:divide-clay-400/40 sm:rounded-full sm:p-2 ${className}`}
    >
      <label className="flex flex-1 items-center gap-3 rounded-full px-4 py-2 text-sand-50 sm:px-5">
        <CalendarDays size={18} className="shrink-0 text-clay-300" />
        <span className="flex w-full flex-col">
          <span className="text-[11px] uppercase tracking-wide text-sand-200/70">Check-in</span>
          <input
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full bg-transparent font-body text-sm font-medium text-sand-50 outline-none [color-scheme:dark]"
            required
          />
        </span>
      </label>

      <label className="flex flex-1 items-center gap-3 rounded-full px-4 py-2 text-sand-50 sm:px-5">
        <CalendarDays size={18} className="shrink-0 text-clay-300" />
        <span className="flex w-full flex-col">
          <span className="text-[11px] uppercase tracking-wide text-sand-200/70">Check-out</span>
          <input
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full bg-transparent font-body text-sm font-medium text-sand-50 outline-none [color-scheme:dark]"
            required
          />
        </span>
      </label>

      <label className="flex flex-1 items-center gap-3 rounded-full px-4 py-2 text-sand-50 sm:px-5">
        <Users size={18} className="shrink-0 text-clay-300" />
        <span className="flex w-full flex-col">
          <span className="text-[11px] uppercase tracking-wide text-sand-200/70">Guests</span>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full appearance-none bg-transparent font-body text-sm font-medium text-sand-50 outline-none [color-scheme:dark]"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n} className="text-ink dark:text-sand-100">
                {n} {n === 1 ? 'Guest' : 'Guests'}
              </option>
            ))}
          </select>
        </span>
      </label>

      <button type="submit" className="mt-1 flex items-center justify-center gap-2 rounded-full bg-clay-500 px-6 py-3 font-body font-semibold text-sand-50 transition-colors hover:bg-clay-600 sm:mt-0 sm:ml-2">
        <Search size={18} /> Search
      </button>
    </form>
  );
};

export default CheckAvailabilityBar;
