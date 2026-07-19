import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, BedDouble, ClipboardList, Star, Globe } from 'lucide-react';

const tabClass = ({ isActive }) =>
  `flex items-center gap-2 rounded-xl px-4 py-2.5 font-body text-sm font-medium transition-colors ${
    isActive ? 'bg-forest-700 text-sand-50' : 'text-forest-800 dark:text-sand-50 hover:bg-forest-50 dark:hover:bg-forest-900'
  }`;

const OwnerLayout = () => {
  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <h1 className="font-display text-3xl font-semibold text-forest-800 dark:text-sand-50">Owner Dashboard</h1>
      <p className="mt-1 font-body text-sm text-ink/60 dark:text-sand-100/60">
        Manage your properties and bookings at EcoStay.
      </p>

      <div className="mt-6 flex flex-wrap gap-2 border-b border-forest-100 dark:border-forest-700 pb-4">
        <NavLink to="/owner" end className={tabClass}>
          <LayoutDashboard size={16} /> Overview
        </NavLink>
        <NavLink to="/owner/rooms" className={tabClass}>
          <BedDouble size={16} /> My Properties
        </NavLink>
        <NavLink to="/owner/bookings" className={tabClass}>
          <ClipboardList size={16} /> Bookings
        </NavLink>
        <NavLink to="/owner/reviews" className={tabClass}>
          <Star size={16} /> Reviews
        </NavLink>
        <NavLink to="/owner/ota-reviews" className={tabClass}>
          <Globe size={16} /> OTA Reviews
        </NavLink>
      </div>

      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default OwnerLayout;