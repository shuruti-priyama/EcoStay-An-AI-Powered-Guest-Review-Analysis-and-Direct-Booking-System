import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Users, Leaf, CalendarDays, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({ checkInDate: '', checkOutDate: '', guests: 1, specialRequests: '', contactPhone: '' });

  useEffect(() => {
    const fetchRoom = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/rooms/${id}`);
        setRoom(res.data.data);
        setForm((f) => ({ ...f, guests: Math.min(f.guests, res.data.data.maxGuests) }));
      } catch (err) {
        setError(err.response?.data?.message || 'Room not found');
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  const nights = useMemo(() => {
    if (!form.checkInDate || !form.checkOutDate) return 0;
    const diff = (new Date(form.checkOutDate) - new Date(form.checkInDate)) / MS_PER_DAY;
    return diff > 0 ? diff : 0;
  }, [form.checkInDate, form.checkOutDate]);

  const totalPrice = nights * (room?.pricePerNight || 0);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please log in to request a booking');
      navigate('/login', { state: { from: { pathname: `/rooms/${id}` } } });
      return;
    }

    if (nights <= 0) {
      toast.error('Please select a valid check-in and check-out date');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/bookings', {
        roomId: room._id,
        checkInDate: form.checkInDate,
        checkOutDate: form.checkOutDate,
        guests: Number(form.guests),
        specialRequests: form.specialRequests,
        contactPhone: form.contactPhone,
      });
      toast.success('Booking request sent! Track its status under My Bookings.');
      navigate('/my-bookings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not create booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader fullScreen label="Loading room details..." />;

  if (error || !room) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <p className="font-body text-ink/70 dark:text-sand-100/70">{error || 'Room not found.'}</p>
        <Link to="/rooms" className="btn-primary mt-6 inline-flex">Back to rooms</Link>
      </div>
    );
  }

  const images = room.images?.length ? room.images : ['https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=1200'];

  return (
    <div className="bg-sand-50 dark:bg-forest-950 py-10">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Link to="/rooms" className="mb-6 inline-flex items-center gap-1 font-body text-sm font-medium text-forest-700 dark:text-sand-200 hover:text-clay-500">
          <ArrowLeft size={16} /> Back to all rooms
        </Link>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Gallery + details */}
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-2xl shadow-card">
              <img src={images[activeImage]} alt={room.name} className="h-[360px] w-full object-cover sm:h-[440px]" />
            </div>
            {images.length > 1 && (
              <div className="mt-3 flex gap-3">
                {images.map((img, i) => (
                  <button key={img} onClick={() => setActiveImage(i)} className={`h-16 w-24 overflow-hidden rounded-lg border-2 ${activeImage === i ? 'border-clay-500' : 'border-transparent'}`}>
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <span className="mt-6 inline-block rounded-full bg-forest-50 dark:bg-forest-900 px-3 py-1 text-xs font-semibold text-forest-700 dark:text-sand-200">{room.type}</span>
            <h1 className="mt-3 font-display text-3xl font-semibold text-forest-800 dark:text-sand-50">{room.name}</h1>
            <p className="mt-1 flex items-center gap-1 font-body text-sm text-ink/60 dark:text-sand-100/60">
              <Users size={15} /> Up to {room.maxGuests} guests
            </p>
            <p className="mt-4 font-body text-sm leading-relaxed text-ink/70 dark:text-sand-100/70">{room.description}</p>

            <h3 className="mt-8 font-display text-lg font-semibold text-forest-800 dark:text-sand-50">Amenities</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {room.amenities?.map((a) => (
                <span key={a} className="flex items-center gap-1 rounded-full bg-forest-50 dark:bg-forest-900 px-3 py-1.5 text-xs font-medium text-forest-700 dark:text-sand-200">
                  <Leaf size={12} /> {a}
                </span>
              ))}
            </div>
          </div>

          {/* Booking form */}
          <div className="lg:col-span-2">
            <div className="card sticky top-24 p-6">
              <p className="font-display text-2xl font-semibold text-forest-800 dark:text-sand-50">
                ₹{room.pricePerNight.toLocaleString('en-IN')} <span className="font-body text-sm font-normal text-ink/50 dark:text-sand-100/50">/ night</span>
              </p>

              {isAdmin ? (
                <p className="mt-4 rounded-xl bg-forest-50 dark:bg-forest-900 p-3 font-body text-sm text-forest-700 dark:text-sand-200">
                  Admin accounts can't create bookings. Log in as a guest to book this room.
                </p>
              ) : (
                <form onSubmit={handleBooking} className="mt-5 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block font-body text-xs font-semibold uppercase text-ink/60 dark:text-sand-100/60">Check-in</label>
                      <div className="relative">
                        <CalendarDays size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 dark:text-sand-100/40" />
                        <input type="date" name="checkInDate" min={today} required value={form.checkInDate} onChange={handleChange} className="input-field pl-9 text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block font-body text-xs font-semibold uppercase text-ink/60 dark:text-sand-100/60">Check-out</label>
                      <div className="relative">
                        <CalendarDays size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 dark:text-sand-100/40" />
                        <input type="date" name="checkOutDate" min={form.checkInDate || today} required value={form.checkOutDate} onChange={handleChange} className="input-field pl-9 text-sm" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block font-body text-xs font-semibold uppercase text-ink/60 dark:text-sand-100/60">Guests</label>
                    <select name="guests" value={form.guests} onChange={handleChange} className="input-field text-sm">
                      {Array.from({ length: room.maxGuests }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block font-body text-xs font-semibold uppercase text-ink/60 dark:text-sand-100/60">Contact phone</label>
                    <input name="contactPhone" value={form.contactPhone} onChange={handleChange} placeholder="For check-in coordination" className="input-field text-sm" />
                  </div>

                  <div>
                    <label className="mb-1 block font-body text-xs font-semibold uppercase text-ink/60 dark:text-sand-100/60">Special requests (optional)</label>
                    <textarea name="specialRequests" value={form.specialRequests} onChange={handleChange} rows={3} placeholder="Dietary needs, early check-in, etc." className="input-field text-sm" />
                  </div>

                  {nights > 0 && (
                    <div className="rounded-xl bg-forest-50 dark:bg-forest-900 p-4 font-body text-sm text-forest-800 dark:text-sand-50">
                      <div className="flex justify-between"><span>₹{room.pricePerNight.toLocaleString('en-IN')} × {nights} night{nights > 1 ? 's' : ''}</span><span>₹{totalPrice.toLocaleString('en-IN')}</span></div>
                      <div className="mt-2 flex justify-between border-t border-forest-200 dark:border-forest-700 pt-2 font-semibold"><span>Total</span><span>₹{totalPrice.toLocaleString('en-IN')}</span></div>
                    </div>
                  )}

                  <button type="submit" disabled={submitting} className="btn-accent w-full">
                    {submitting ? 'Sending request...' : isAuthenticated ? 'Request to Book' : 'Log in to Book'}
                  </button>
                  <p className="text-center font-body text-xs text-ink/50 dark:text-sand-100/50">
                    This sends a booking request. Our team confirms availability before it's approved.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
