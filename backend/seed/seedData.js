require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Room = require('../models/Room');
const Booking = require('../models/Booking');

const MONGO_URI = process.env.MONGO_URI || process.env.DATABASE_URL;

if (!MONGO_URI) {
  console.error('No database connection string found. Set MONGO_URI (or DATABASE_URL) in backend/.env');
  process.exit(1);
}

const rooms = [
  {
    name: 'Riverside Bamboo Villa',
    description:
      'A breezy bamboo villa perched beside the river, built with reclaimed wood and local craft. Wake up to birdsong and the sound of flowing water.',
    type: 'Bamboo Villa',
    pricePerNight: 3200,
    maxGuests: 3,
    totalRooms: 2,
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
    ],
    amenities: ['Solar Power', 'Organic Breakfast', 'River View', 'Bonfire Access', 'Free Wi-Fi'],
  },
  {
    name: 'Canopy Treehouse',
    description:
      'Sleep among the treetops in this handcrafted treehouse with a private deck overlooking the eco-reserve forest canopy.',
    type: 'Treehouse',
    pricePerNight: 4500,
    maxGuests: 2,
    totalRooms: 1,
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200',
    ],
    amenities: ['Forest View', 'Rain Shower', 'Organic Breakfast', 'Guided Nature Walk'],
  },
  {
    name: 'Mud & Thatch Cottage',
    description:
      'A traditional mud-walled cottage with a thatched roof, built using centuries-old techniques for natural cooling and comfort.',
    type: 'Mud House',
    pricePerNight: 2200,
    maxGuests: 4,
    totalRooms: 3,
    images: [
      'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=1200',
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200',
    ],
    amenities: ['Farm-to-Table Meals', 'Courtyard', 'Bicycle Rental', 'Free Wi-Fi'],
  },
  {
    name: 'Meadow View Farmstay Room',
    description:
      'Cosy rooms attached to a working organic farm. Spend your mornings picking vegetables and evenings under open skies.',
    type: 'Farmstay Room',
    pricePerNight: 1800,
    maxGuests: 3,
    totalRooms: 4,
    images: [
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200',
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200',
    ],
    amenities: ['Farm Tour', 'Organic Meals', 'Bonfire Access', 'Pet Friendly'],
  },
];

const importData = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    await Booking.deleteMany();
    await Room.deleteMany();
    await User.deleteMany({ email: { $in: ['admin@ecostay.com', 'guest@ecostay.com', 'owner@ecostay.com'] } });

    const createdRooms = await Room.insertMany(rooms);

    await User.create({
      name: 'Trishul Admin',
      email: 'admin@ecostay.com',
      password: 'Admin@123',
      role: 'admin',
    });

    await User.create({
      name: 'Demo Guest',
      email: 'guest@ecostay.com',
      password: 'Guest@123',
      role: 'guest',
    });

    // Demo homestay owner, with one of the seeded rooms assigned to them so
    // the Owner dashboard has data to show right away.
    const owner = await User.create({
      name: 'Demo Homestay Owner',
      email: 'owner@ecostay.com',
      password: 'Owner@123',
      role: 'owner',
    });
    createdRooms[0].owner = owner._id;
    await createdRooms[0].save();

    console.log('Seed data imported successfully!');
    console.log('Admin login  -> admin@ecostay.com / Admin@123');
    console.log('Guest login  -> guest@ecostay.com / Guest@123');
    console.log('Owner login  -> owner@ecostay.com / Owner@123');
    process.exit();
  } catch (error) {
    console.error(`Seed error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Booking.deleteMany();
    await Room.deleteMany();
    await User.deleteMany({ email: { $in: ['admin@ecostay.com', 'guest@ecostay.com', 'owner@ecostay.com'] } });
    console.log('Data destroyed successfully!');
    process.exit();
  } catch (error) {
    console.error(`Destroy error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}