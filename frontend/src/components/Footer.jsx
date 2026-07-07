import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-forest-900 text-sand-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-clay-500">
              <Leaf size={18} />
            </span>
            <span className="font-display text-xl font-semibold">EcoStay</span>
          </div>
          <p className="mt-4 max-w-xs font-body text-sm text-sand-100/70">
            Trishul Eco-Homestays offers sustainable, community-rooted stays inside a living
            reserve — built from earth, bamboo and reclaimed wood.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="#" aria-label="Instagram" className="rounded-full bg-forest-800 p-2 hover:bg-clay-500"><Instagram size={16} /></a>
            <a href="#" aria-label="Facebook" className="rounded-full bg-forest-800 p-2 hover:bg-clay-500"><Facebook size={16} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-clay-300">Explore</h4>
          <ul className="mt-4 space-y-2 font-body text-sm text-sand-100/75">
            <li><Link to="/" className="hover:text-clay-300">Home</Link></li>
            <li><Link to="/rooms" className="hover:text-clay-300">Rooms</Link></li>
            <li><Link to="/about" className="hover:text-clay-300">About Us</Link></li>
            <li><Link to="/login" className="hover:text-clay-300">Guest Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-clay-300">Policies</h4>
          <ul className="mt-4 space-y-2 font-body text-sm text-sand-100/75">
            <li>Free cancellation up to 48 hours</li>
            <li>Check-in from 1:00 PM</li>
            <li>Check-out by 11:00 AM</li>
            <li>No single-use plastics on site</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-clay-300">Get in touch</h4>
          <ul className="mt-4 space-y-3 font-body text-sm text-sand-100/75">
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /> Trishul Valley, Uttarakhand, India</li>
            <li className="flex items-center gap-2"><Phone size={16} /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><Mail size={16} /> stay@trishulecohomestays.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-forest-800 py-5 text-center font-body text-xs text-sand-100/50">
        © {new Date().getFullYear()} Trishul Eco-Homestays. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
