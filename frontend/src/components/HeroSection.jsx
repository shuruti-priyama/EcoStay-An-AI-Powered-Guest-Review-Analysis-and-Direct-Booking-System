import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import CheckAvailabilityBar from './CheckAvailabilityBar';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-forest-800">
      <img
        src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=1600"
        alt="Sunlit bamboo cottage nestled among green hills at Trishul Eco-Homestays"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-900/60 via-forest-800/70 to-forest-800" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-5 pb-24 pt-20 text-center sm:pb-28 sm:pt-28">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-clay-400/60 bg-forest-900/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-clay-200">
          <Sprout size={14} /> Trishul Eco-Homestays
        </span>

        <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-sand-50 sm:text-5xl md:text-6xl">
          WELCOME TO TRISHUL ECO-HOMESTAYS
        </h1>
        <p className="mt-5 max-w-xl font-body text-base text-sand-100/85 sm:text-lg">
          Experience the Beauty of Chopta, One Stay at a Time
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/rooms" className="btn-accent">Browse Rooms</Link>
          <Link to="/about" className="btn-outline !border-sand-100 !text-sand-50 hover:!bg-sand-50 hover:!text-forest-800">
            Our Story
          </Link>
        </div>
      </div>

      <div className="relative z-10 -mt-10 px-4 pb-10 sm:-mt-8 sm:px-8">
        <CheckAvailabilityBar />
      </div>
    </section>
  );
};

export default HeroSection;
