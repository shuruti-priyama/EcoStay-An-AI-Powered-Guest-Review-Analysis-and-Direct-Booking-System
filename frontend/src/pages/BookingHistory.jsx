import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Users, X } from 'lucide-react';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import StatusBadge from '../components/StatusBadge';
import api from '../api/axios';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get('/bookings/my');
      setBookings(res.data.data);
    } catch (err) {
      toast.error('Failed to load your bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    setCancellingId(id);
    try {
      await api.put(`/bookings/${id}/cancel`);
      toast.success('Booking cancelled');
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not cancel booking');
    } finally {
      setCancellingId(null);
    }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
      <h1 className="font-display text-3xl font-semibold text-forest-800 dark:text-sand-50">My Bookings</h1>
      <p className="mt-1 font-body text-sm text-ink/60 dark:text-sand-100/60">Track the status of every stay you've requested.</p>

      <div className="mt-8">
        {loading ? (
          <Loader label="Loading your bookings..." />
        ) : bookings.length === 0 ? (
          <div className="card p-10 text-center">
            <p className="font-body text-ink/60 dark:text-sand-100/60">You haven't requested any bookings yet.</p>
            <Link to="/rooms" className="btn-primary mt-5 inline-flex">Browse Rooms</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div key={b._id} className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                <img
                  src={b.room?.images?.[0] || 'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=400'}
                  alt={b.room?.name}
                  className="h-28 w-full rounded-xl object-cover sm:w-40"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-forest-800 dark:text-sand-50">{b.room?.name || 'Room removed'}</h3>
                    <StatusBadge status={b.status} />
                  </div>
                  <div className="mt-2 flex flex-wrap gap-4 font-body text-sm text-ink/65 dark:text-sand-100/65">
                    <span className="flex items-center gap-1"><CalendarDays size={14} /> {formatDate(b.checkInDate)} → {formatDate(b.checkOutDate)}</span>
                    <span className="flex items-center gap-1"><Users size={14} /> {b.guests} guest{b.guests > 1 ? 's' : ''}</span>
                    <span className="font-semibold text-forest-700 dark:text-sand-200">₹{b.totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  {b.adminNote && (
                    <p className="mt-2 rounded-lg bg-forest-50 dark:bg-forest-900 p-2 font-body text-xs text-forest-700 dark:text-sand-200">Note from host: {b.adminNote}</p>
                  )}
                </div>
                {['pending', 'approved'].includes(b.status) && (
                  <button
                    onClick={() => handleCancel(b._id)}
                    disabled={cancellingId === b._id}
                    className="flex items-center gap-1 self-start rounded-full border border-red-300 dark:border-red-500/40 px-4 py-2 font-body text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 sm:self-center"
                  >
                    <X size={14} /> {cancellingId === b._id ? 'Cancelling...' : 'Cancel'}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;
