import React, { useEffect, useState } from 'react';
import { Check, X as XIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';
import StatusBadge from '../../components/StatusBadge';
import api from '../../api/axios';

const FILTERS = ['all', 'pending', 'approved', 'rejected', 'cancelled', 'completed'];

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [actingId, setActingId] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const res = await api.get('/bookings', { params });
      setBookings(res.data.data);
    } catch (err) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, [filter]);

  const handleStatusChange = async (id, status) => {
    setActingId(id);
    try {
      await api.put(`/bookings/${id}/status`, { status });
      toast.success(`Booking ${status}`);
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not update booking');
    } finally {
      setActingId(null);
    }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 font-body text-sm font-medium capitalize transition-colors ${
              filter === f ? 'bg-forest-700 text-sand-50' : 'bg-forest-50 dark:bg-forest-900 text-forest-700 dark:text-sand-200 hover:bg-forest-100 dark:hover:bg-forest-800'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {loading ? (
          <Loader label="Loading bookings..." />
        ) : bookings.length === 0 ? (
          <p className="rounded-xl bg-forest-50 dark:bg-forest-900 p-8 text-center font-body text-ink/60 dark:text-sand-100/60">No bookings match this filter.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div key={b._id} className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-base font-semibold text-forest-800 dark:text-sand-50">{b.room?.name || 'Room removed'}</h3>
                    <StatusBadge status={b.status} />
                  </div>
                  <p className="mt-1 font-body text-sm text-ink/60 dark:text-sand-100/60">
                    Guest: {b.guest?.name} ({b.guest?.email}) {b.contactPhone && `• ${b.contactPhone}`}
                  </p>
                  <p className="mt-1 font-body text-sm text-ink/60 dark:text-sand-100/60">
                    {formatDate(b.checkInDate)} → {formatDate(b.checkOutDate)} • {b.guests} guest{b.guests > 1 ? 's' : ''} • ₹{b.totalPrice.toLocaleString('en-IN')}
                  </p>
                  {b.specialRequests && <p className="mt-1 font-body text-xs italic text-ink/50 dark:text-sand-100/50">"{b.specialRequests}"</p>}
                </div>

                {b.status === 'pending' && (
                  <div className="flex gap-2 self-start sm:self-center">
                    <button
                      disabled={actingId === b._id}
                      onClick={() => handleStatusChange(b._id, 'approved')}
                      className="flex items-center gap-1 rounded-full bg-forest-700 px-4 py-2 font-body text-sm font-medium text-sand-50 hover:bg-forest-600"
                    >
                      <Check size={14} /> Approve
                    </button>
                    <button
                      disabled={actingId === b._id}
                      onClick={() => handleStatusChange(b._id, 'rejected')}
                      className="flex items-center gap-1 rounded-full border border-red-300 dark:border-red-500/40 px-4 py-2 font-body text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                      <XIcon size={14} /> Reject
                    </button>
                  </div>
                )}

                {b.status === 'approved' && (
                  <button
                    disabled={actingId === b._id}
                    onClick={() => handleStatusChange(b._id, 'completed')}
                    className="self-start rounded-full border border-forest-300 dark:border-forest-700 px-4 py-2 font-body text-sm font-medium text-forest-700 dark:text-sand-200 hover:bg-forest-50 dark:hover:bg-forest-900 sm:self-center"
                  >
                    Mark completed
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

export default ManageBookings;
