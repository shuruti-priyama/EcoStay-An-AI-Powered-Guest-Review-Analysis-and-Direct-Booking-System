import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Leaf, ArrowUpRight } from 'lucide-react';

const RoomCard = ({ room }) => {
  const placeholderImg = 'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=800';
  const isAvailable = room.isAvailable !== false;

  return (
    <div className="card group flex flex-col overflow-hidden transition-transform hover:-translate-y-1">
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={room.images?.[0] || placeholderImg}
          alt={room.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-forest-800/90 px-3 py-1 text-xs font-semibold text-sand-50">
          {room.type}
        </span>
        {!isAvailable && (
          <span className="absolute right-3 top-3 rounded-full bg-red-600/90 px-3 py-1 text-xs font-semibold text-white">
            Fully booked
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-forest-800 dark:text-sand-50">{room.name}</h3>
          <span className="whitespace-nowrap font-display text-lg font-semibold text-clay-500">
            ₹{room.pricePerNight?.toLocaleString('en-IN')}
            <span className="text-xs font-body font-normal text-ink/50 dark:text-sand-100/50">/night</span>
          </span>
        </div>

        <p className="line-clamp-2 font-body text-sm text-ink/65 dark:text-sand-100/65">{room.description}</p>

        <div className="flex flex-wrap gap-2">
          {room.amenities?.slice(0, 3).map((a) => (
            <span key={a} className="flex items-center gap-1 rounded-full bg-forest-50 dark:bg-forest-900 px-2.5 py-1 text-[11px] font-medium text-forest-700 dark:text-sand-200">
              <Leaf size={10} /> {a}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="flex items-center gap-1 text-sm text-ink/60 dark:text-sand-100/60">
            <Users size={15} /> Up to {room.maxGuests} guests
          </span>
          <Link
            to={`/rooms/${room.slug || room._id}`}
            className="flex items-center gap-1 text-sm font-semibold text-forest-700 dark:text-sand-200 hover:text-clay-500"
          >
            View details <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
