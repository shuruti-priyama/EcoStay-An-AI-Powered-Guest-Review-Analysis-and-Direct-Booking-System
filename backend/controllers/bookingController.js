const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');
const Room = require('../models/Room');

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const getBookedCount = async (roomId, checkIn, checkOut, excludeBookingId = null) => {
  const filter = {
    room: roomId,
    status: { $in: ['pending', 'approved'] },
    checkInDate: { $lt: checkOut },
    checkOutDate: { $gt: checkIn },
  };
  if (excludeBookingId) filter._id = { $ne: excludeBookingId };
  return Booking.countDocuments(filter);
};


const createBooking = asyncHandler(async (req, res) => {
  const { roomId, checkInDate, checkOutDate, guests, specialRequests, contactPhone } = req.body;

  if (!roomId || !checkInDate || !checkOutDate || !guests) {
    res.status(400);
    throw new Error('Room, check-in date, check-out date and guest count are required');
  }

  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (checkIn < today) {
    res.status(400);
    throw new Error('Check-in date cannot be in the past');
  }

  if (checkOut <= checkIn) {
    res.status(400);
    throw new Error('Check-out date must be after check-in date');
  }

  const room = await Room.findById(roomId);
  if (!room || !room.isActive) {
    res.status(404);
    throw new Error('Room not found or unavailable');
  }

  if (guests > room.maxGuests) {
    res.status(400);
    throw new Error(`This room accommodates a maximum of ${room.maxGuests} guests`);
  }

  const bookedCount = await getBookedCount(roomId, checkIn, checkOut);
  if (bookedCount >= room.totalRooms) {
    res.status(409);
    throw new Error('This room is fully booked for the selected dates');
  }

  const totalNights = Math.round((checkOut - checkIn) / MS_PER_DAY);
  const totalPrice = totalNights * room.pricePerNight;

  const booking = await Booking.create({
    guest: req.user._id,
    room: roomId,
    checkInDate: checkIn,
    checkOutDate: checkOut,
    guests,
    totalNights,
    totalPrice,
    specialRequests,
    contactPhone,
  });

  const populatedBooking = await booking.populate('room', 'name images pricePerNight type');

  res.status(201).json({ success: true, data: populatedBooking });
});


const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ guest: req.user._id })
    .populate('room', 'name images pricePerNight type')
    .sort({ createdAt: -1 });

  res.json({ success: true, count: bookings.length, data: bookings });
});


const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  if (booking.guest.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('You can only cancel your own bookings');
  }

  if (!['pending', 'approved'].includes(booking.status)) {
    res.status(400);
    throw new Error(`Cannot cancel a booking that is already ${booking.status}`);
  }

  booking.status = 'cancelled';
  await booking.save();

  res.json({ success: true, data: booking });
});

const getAllBookings = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};

  const bookings = await Booking.find(filter)
    .populate('room', 'name images pricePerNight type')
    .populate('guest', 'name email phone')
    .sort({ createdAt: -1 });

  res.json({ success: true, count: bookings.length, data: bookings });
});

const getOwnerBookings = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const myRoomIds = await Room.find({ owner: req.user._id }).distinct('_id');

  const filter = { room: { $in: myRoomIds } };
  if (status) filter.status = status;

  const bookings = await Booking.find(filter)
    .populate('room', 'name images pricePerNight type')
    .populate('guest', 'name email phone')
    .sort({ createdAt: -1 });

  res.json({ success: true, count: bookings.length, data: bookings });
});


const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status, adminNote } = req.body;

  if (!['approved', 'rejected', 'completed'].includes(status)) {
    res.status(400);
    throw new Error('Status must be one of: approved, rejected, completed');
  }

  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  if (req.user.role === 'owner') {
    const room = await Room.findById(booking.room);
    if (!room || !room.owner || room.owner.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('You can only manage bookings for rooms you own');
    }
  }

  if (status === 'approved') {
    const bookedCount = await getBookedCount(booking.room, booking.checkInDate, booking.checkOutDate, booking._id);
    const room = await Room.findById(booking.room);
    if (bookedCount >= room.totalRooms) {
      res.status(409);
      throw new Error('Cannot approve: room is now fully booked for these dates');
    }
  }

  booking.status = status;
  if (adminNote !== undefined) booking.adminNote = adminNote;
  await booking.save();

  res.json({ success: true, data: booking });
});

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking,
  getAllBookings,
  getOwnerBookings,
  updateBookingStatus,
};
