import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Droplets, Recycle, Users, Star } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import RoomCard from '../components/RoomCard';
import Loader from '../components/Loader';
import api from '../api/axios';

const values = [
  { icon: Sun, title: 'Solar Powered', text: 'Every room runs on rooftop solar, cutting our grid dependence to near zero.' },
  { icon: Droplets, title: 'Rainwater Harvesting', text: 'Rain-fed wells and greywater recycling keep our farms green year-round.' },
  { icon: Recycle, title: 'Zero Single-Use Plastic', text: 'From bathroom amenities to breakfast trays, everything is reusable or compostable.' },
  { icon: Users, title: 'Community First', text: 'Staffed by local families — your stay directly supports the valley\'s economy.' },
];

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get('/rooms');
        setRooms(res.data.data.slice(0, 3));
      } catch (err) {
        console.error('Failed to load featured rooms', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div>
      <HeroSection />

      {/* Values */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-clay-500">Why EcoStay</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-forest-800 dark:text-sand-50 sm:text-4xl">
            Hospitality that gives back to the land
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card flex flex-col gap-3 p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-50 dark:bg-forest-900 text-forest-700 dark:text-sand-200">
                <Icon size={20} />
              </span>
              <h3 className="font-display text-base font-semibold text-forest-800 dark:text-sand-50">{title}</h3>
              <p className="font-body text-sm text-ink/65 dark:text-sand-100/65">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured rooms */}
      <section className="bg-forest-50/60 dark:bg-forest-900/40 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-clay-500">Stay with us</span>
              <h2 className="mt-3 font-display text-3xl font-semibold text-forest-800 dark:text-sand-50 sm:text-4xl">Featured rooms</h2>
            </div>
            <Link to="/rooms" className="btn-outline">View all rooms</Link>
          </div>

          <div className="mt-10">
            {loading ? (
              <Loader label="Fetching rooms..." />
            ) : rooms.length === 0 ? (
              <p className="font-body text-ink/60 dark:text-sand-100/60">Rooms are being added — please check back soon.</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rooms.map((room) => (
                  <RoomCard key={room._id} room={room} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonial strip */}
      <section className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
        <div className="flex justify-center gap-1 text-clay-400">
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
        </div>
        <blockquote className="mt-5 font-display text-xl italic text-forest-800 dark:text-sand-50 sm:text-2xl">
          "We woke up to birdsong instead of traffic. The mud cottage stayed cool all afternoon —
          no AC needed. It's the kind of quiet you forget exists."
        </blockquote>
        <p className="mt-4 font-body text-sm text-ink/60 dark:text-sand-100/60">— Ananya R., stayed at the Canopy Treehouse</p>
      </section>

      {/* CTA */}
      <section className="bg-forest-800 py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-5 text-center sm:px-8">
          <h2 className="font-display text-2xl font-semibold text-sand-50 sm:text-3xl">
            Ready to trade notifications for birdsong?
          </h2>
          <Link to="/rooms" className="btn-accent">Check Availability</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
