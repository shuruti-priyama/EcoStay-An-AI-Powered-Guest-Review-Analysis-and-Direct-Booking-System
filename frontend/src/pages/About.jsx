import React from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf,
  Sprout,
  Heart,
  Mountain,
  Compass,
  CalendarCheck,
  ClipboardList,
  History,
  UserCog,
  LayoutDashboard,
  RefreshCcw,
  CalendarClock,
  BookOpenCheck,
  Sparkles,
} from 'lucide-react';

const modules = [
  {
    key: 'guest',
    icon: Compass,
    title: 'Guest Portal',
    subtitle: 'For travellers',
    description: 'Everything a guest needs to plan and manage their stay, from browsing rooms to keeping track of past bookings.',
    accent: 'forest',
    cta: { label: 'Explore as a guest', to: '/rooms' },
    features: [
      { icon: Compass, text: 'Browse available rooms' },
      { icon: CalendarCheck, text: 'Check room availability' },
      { icon: ClipboardList, text: 'Submit booking requests' },
      { icon: History, text: 'View booking history' },
      { icon: UserCog, text: 'Manage profile' },
    ],
  },
  {
    key: 'owner',
    icon: LayoutDashboard,
    title: 'Owner Dashboard',
    subtitle: 'For the EcoStay team',
    description: 'A private control centre for the homestay owners to run day-to-day operations and keep an eye on guest sentiment.',
    accent: 'clay',
    cta: { label: 'Go to admin login', to: '/login' },
    features: [
      { icon: RefreshCcw, text: 'Manage rooms via API (add, delete, update rooms)' },
      { icon: CalendarClock, text: 'Update availability live' },
      { icon: BookOpenCheck, text: 'View all bookings' },
      { icon: Sparkles, text: 'Analyze reviews with AI' },
    ],
  },
];

const About = () => {
  return (
    <div>
      <section className="relative overflow-hidden bg-forest-800 py-24">
        <img
          src="https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1600"
          alt="Green valley surrounding Trishul Eco-Homestays"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-forest-900/50" />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-clay-400/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-clay-200">
            <Sprout size={14} /> Our Story
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold text-sand-50 sm:text-5xl">
            Built for Nature, Inspired by Chopta
          </h1>
          <p className="mt-4 font-body text-base text-sand-100/80 sm:text-lg">
            Experience the peaceful beauty of Trishul Eco-Homestays, nestled in the heart of Chopta. 
            Surrounded by Himalayan forests and breathtaking mountain views, we offer a comfortable stay where nature, 
            hospitality, and local culture come together.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <img
            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=900"
            alt="Local artisans building a mud cottage"
            className="h-80 w-full rounded-2xl object-cover shadow-card"
          />
          <div>
            <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-clay-500">Since 2015</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-forest-800 dark:text-sand-50">
              A peaceful retreat in the Himalayas
            </h2>
            <p className="mt-4 font-body text-sm leading-relaxed text-ink/70 dark:text-sand-100/70">
              Located in the scenic hills of Chopta, Uttarakhand, Trishul Eco-Homestays welcomes travelers seeking a relaxing escape amidst nature. 
              Whether you're visiting for trekking, bird watching, camping, or simply to unwind, our homestay offers comfortable accommodations 
              with warm local hospitality.

              Guests can enjoy breathtaking views of the Himalayan ranges, fresh mountain air, traditional home-cooked meals, and easy access to popular 
              destinations such as Tungnath Temple and Chandrashila Peak. Every stay is designed to help visitors experience the beauty, culture, and serenity of 
              Chopta while creating unforgettable memories.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-forest-50/60 dark:bg-forest-900/40 py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-clay-500">The platform</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-forest-800 dark:text-sand-50">
              Two portals, one homestay
            </h2>
            <p className="mt-3 font-body text-sm text-ink/70 dark:text-sand-100/70">
              EcoStay has two dedicated login experiences —
              one for guests planning a stay, and one for the owners running the property.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {modules.map((mod) => {
              const ModIcon = mod.icon;
              const isClay = mod.accent === 'clay';
              return (
                <div key={mod.key} className="card flex flex-col p-8">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      isClay ? 'bg-clay-500' : 'bg-forest-700 dark:bg-forest-600'
                    } text-sand-50`}
                  >
                    <ModIcon size={22} />
                  </span>
                  <span className="mt-5 font-body text-xs font-semibold uppercase tracking-[0.2em] text-clay-500">
                    {mod.subtitle}
                  </span>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-forest-800 dark:text-sand-50">
                    {mod.title}
                  </h3>
                  <p className="mt-2 font-body text-sm text-ink/65 dark:text-sand-100/65">
                    {mod.description}
                  </p>

                  <ul className="mt-6 flex-1 space-y-3">
                    {mod.features.map((f) => {
                      const FIcon = f.icon;
                      return (
                        <li key={f.text} className="flex items-start gap-3 font-body text-sm text-ink/75 dark:text-sand-100/75">
                          <span
                            className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                              isClay
                                ? 'bg-clay-100 text-clay-600 dark:bg-clay-500/20 dark:text-clay-300'
                                : 'bg-forest-100 dark:bg-forest-800 text-forest-700 dark:text-forest-300'
                            }`}
                          >
                            <FIcon size={13} />
                          </span>
                          {f.text}
                        </li>
                      );
                    })}
                  </ul>

                  <Link
                    to={mod.cta.to}
                    className={`mt-8 ${isClay ? 'btn-accent' : 'btn-primary'} w-full`}
                  >
                    {mod.cta.label}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="card p-6 text-center">
            <Leaf className="mx-auto text-forest-600 dark:text-forest-300" size={28} />
            <h3 className="mt-3 font-display font-semibold text-forest-800 dark:text-sand-50">Prime Location</h3>
            <p className="mt-2 font-body text-sm text-ink/65 dark:text-sand-100/65">Situated in beautiful Chopta, surrounded by Himalayan landscapes and pristine nature.</p>
          </div>
          <div className="card p-6 text-center">
            <Heart className="mx-auto text-clay-500" size={28} />
            <h3 className="mt-3 font-display font-semibold text-forest-800 dark:text-sand-50">Genuine Hospitality</h3>
            <p className="mt-2 font-body text-sm text-ink/65 dark:text-sand-100/65">Enjoy personalized service, comfortable accommodations, and authentic local cuisine.</p>
          </div>
          <div className="card p-6 text-center">
            <Mountain className="mx-auto text-forest-600 dark:text-forest-300" size={28} />
            <h3 className="mt-3 font-display font-semibold text-forest-800 dark:text-sand-50">Nature & Adventure</h3>
            <p className="mt-2 font-body text-sm text-ink/65 dark:text-sand-100/65">Perfect for trekking, camping, bird watching, photography, and peaceful mountain retreats.</p>
          </div>
        </div>

        <div className="mt-14 text-center">
          <Link to="/rooms" className="btn-primary">See where you'll stay</Link>
        </div>
      </section>
    </div>
  );
};

export default About;
