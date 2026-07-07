const asyncHandler = require('express-async-handler');
const Room = require('../models/Room');
const Booking = require('../models/Booking');

const getBookedCount = async (roomId, checkIn, checkOut) => {
  const overlapping = await Booking.countDocuments({
    room: roomId,
    status: { $in: ['pending', 'approved'] },
    checkInDate: { $lt: checkOut },
    checkOutDate: { $gt: checkIn },
  });
  return overlapping;
};

const getRooms = asyncHandler(async (req, res) => {
  const { checkIn, checkOut, guests } = req.query;

  const query = { isActive: true };
  if (guests) query.maxGuests = { $gte: Number(guests) };

  const rooms = await Room.find(query).sort({ createdAt: -1 });

  if (checkIn && checkOut) {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const roomsWithAvailability = await Promise.all(
      rooms.map(async (room) => {
        const bookedCount = await getBookedCount(room._id, checkInDate, checkOutDate);
        const availableUnits = Math.max(room.totalRooms - bookedCount, 0);
        return { ...room.toObject(), availableUnits, isAvailable: availableUnits > 0 };
      })
    );

    return res.json({ success: true, count: roomsWithAvailability.length, data: roomsWithAvailability });
  }

  const roomsWithAvailability = rooms.map((room) => ({
    ...room.toObject(),
    availableUnits: room.totalRooms,
    isAvailable: room.totalRooms > 0,
  }));

  res.json({ success: true, count: roomsWithAvailability.length, data: roomsWithAvailability });
});

const getRoomById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const room = id.match(/^[0-9a-fA-F]{24}$/)
    ? await Room.findById(id)
    : await Room.findOne({ slug: id });

  if (!room) {
    res.status(404);
    throw new Error('Room not found');
  }

  res.json({ success: true, data: room });
});

const createRoom = asyncHandler(async (req, res) => {
  const { name, description, type, pricePerNight, maxGuests, images, amenities, totalRooms } = req.body;

  if (!name || !description || !pricePerNight) {
    res.status(400);
    throw new Error('Name, description and price per night are required');
  }

  const room = await Room.create({
    name,
    description,
    type,
    pricePerNight,
    maxGuests,
    images,
    amenities,
    totalRooms,
  });

  res.status(201).json({ success: true, data: room });
});


const updateRoom = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    res.status(404);
    throw new Error('Room not found');
  }

  const updatable = ['name', 'description', 'type', 'pricePerNight', 'maxGuests', 'images', 'amenities', 'totalRooms', 'isActive'];
  updatable.forEach((field) => {
    if (req.body[field] !== undefined) room[field] = req.body[field];
  });

  const updatedRoom = await room.save();
  res.json({ success: true, data: updatedRoom });
});

const deleteRoom = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    res.status(404);
    throw new Error('Room not found');
  }

  const activeBookings = await Booking.countDocuments({
    room: room._id,
    status: { $in: ['pending', 'approved'] },
  });

  if (activeBookings > 0) {
    res.status(400);
    throw new Error('Cannot delete a room with active bookings. Deactivate it instead.');
  }

  await room.deleteOne();
  res.json({ success: true, message: 'Room deleted successfully' });
});

module.exports = { getRooms, getRoomById, createRoom, updateRoom, deleteRoom };
