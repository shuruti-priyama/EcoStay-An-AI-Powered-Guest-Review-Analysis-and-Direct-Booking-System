import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import RoomCard from '../components/RoomCard';
import CheckAvailabilityBar from '../components/CheckAvailabilityBar';
import Loader from '../components/Loader';
import api from '../api/axios';

const ROOM_TYPES = ['All Types', 'Cottage', 'Treehouse', 'Mud House', 'Bamboo Villa', 'Riverside Cabin', 'Farmstay Room'];

const Rooms = () => {
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');

  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const guests = searchParams.get('guests');

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      setError('');
      try {
        const params = {};
        if (checkIn) params.checkIn = checkIn;
        if (checkOut) params.checkOut = checkOut;
        if (guests) params.guests = guests;

        const res = await api.get('/rooms', { params });
        setRooms(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load rooms. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [checkIn, checkOut, guests]);

  const filteredRooms = typeFilter === 'All Types' ? rooms : rooms.filter((r) => r.type === typeFilter);

  return (
    <div className="bg-sand-50 dark:bg-forest-950">
      <section className="bg-forest-800 px-5 pb-16 pt-14 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-3xl font-semibold text-sand-50 sm:text-4xl">Find your stay</h1>
          <p className="mt-2 font-body text-sm text-sand-100/75">
            {checkIn && checkOut
              ? `Showing availability for ${checkIn} to ${checkOut}`
              : 'Browse every room, or search by date to see live availability.'}
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-5xl">
          <CheckAvailabilityBar />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 pr-2 font-body text-sm font-medium text-ink/60 dark:text-sand-100/60">
            <SlidersHorizontal size={15} /> Filter:
          </span>
          {ROOM_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`rounded-full px-4 py-1.5 font-body text-sm font-medium transition-colors ${
                typeFilter === t ? 'bg-forest-700 text-sand-50' : 'bg-forest-50 dark:bg-forest-900 text-forest-700 dark:text-sand-200 hover:bg-forest-100 dark:hover:bg-forest-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <Loader label="Finding available rooms..." />
        ) : error ? (
          <p className="rounded-xl bg-red-50 dark:bg-red-500/10 p-4 text-center font-body text-sm text-red-600 dark:text-red-400">{error}</p>
        ) : filteredRooms.length === 0 ? (
          <p className="rounded-xl bg-forest-50 dark:bg-forest-900 p-8 text-center font-body text-ink/60 dark:text-sand-100/60">
            No rooms match your search. Try different dates or guest count.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Rooms;
