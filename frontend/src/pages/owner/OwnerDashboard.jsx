import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BedDouble, ClipboardList, IndianRupee } from 'lucide-react';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';
import StatusBadge from '../../components/StatusBadge';
import api from '../../api/axios';

const StatCard = ({ icon: Icon, label, value, accent }) => (
  <div className="card flex items-center gap-4 p-5">
    <span className={`flex h-12 w-12 items-center justify-center rounded-full ${accent}`}>
      <Icon size={22} />
    </span>
    <div>
      <p className="font-display text-2xl font-semibold text-forest-800 dark:text-sand-50">{value}</p>
      <p className="font-body text-sm text-ink/60 dark:text-sand-100/60">{label}</p>
    </div>
  </div>
);

const OwnerDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get('/admin/owner-analytics');
        setData(res.data.data);
      } catch (err) {
        toast.error('Failed to load your dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <Loader label="Crunching the numbers..." />;
  if (!data) return null;

  if (data.totalRooms === 0) {
    return (
      <div className="card p-10 text-center">
        <BedDouble size={32} className="mx-auto text-forest-700 dark:text-sand-200" />
        <h3 className="mt-3 font-display text-lg font-semibold text-forest-800 dark:text-sand-50">
          List your first property
        </h3>
        <p className="mt-1 font-body text-sm text-ink/60 dark:text-sand-100/60">
          You haven't added any rooms yet. Add one to start receiving bookings.
        </p>
        <Link to="/owner/rooms" className="btn-accent mt-5 inline-flex !px-6 !py-2 text-sm">
          Add a room
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard icon={BedDouble} label="Active rooms" value={data.activeRooms} accent="bg-forest-100 dark:bg-forest-800 text-forest-700 dark:text-sand-200" />
        <StatCard icon={ClipboardList} label="Total bookings" value={data.totalBookings} accent="bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300" />
        <StatCard icon={IndianRupee} label="Revenue (approved+)" value={`₹${data.totalRevenue.toLocaleString('en-IN')}`} accent="bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-1">
          <h3 className="font-display text-lg font-semibold text-forest-800 dark:text-sand-50">Bookings by status</h3>
          <div className="mt-4 space-y-3">
            {Object.entries(data.bookingsByStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <StatusBadge status={status} />
                <span className="font-body text-sm font-semibold text-ink/70 dark:text-sand-100/70">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-forest-800 dark:text-sand-50">Recent bookings</h3>
            <Link to="/owner/bookings" className="font-body text-sm font-semibold text-clay-500 hover:underline">View all</Link>
          </div>
          <div className="mt-4 divide-y divide-forest-50 dark:divide-forest-800">
            {data.recentBookings.length === 0 ? (
              <p className="py-6 text-center font-body text-sm text-ink/50 dark:text-sand-100/50">No bookings yet.</p>
            ) : (
              data.recentBookings.map((b) => (
                <div key={b._id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-body text-sm font-medium text-forest-800 dark:text-sand-50">{b.room?.name || 'Room removed'}</p>
                    <p className="font-body text-xs text-ink/50 dark:text-sand-100/50">{b.guest?.name || 'Guest removed'}</p>
                  </div>
                  <StatusBadge status={b.status} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
