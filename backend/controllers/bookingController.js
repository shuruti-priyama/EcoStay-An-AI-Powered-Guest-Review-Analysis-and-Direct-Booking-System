// controllers/bookingController.js
const { v4: uuidv4 } = require('uuid')
const { bookings, rooms } = require('../data/store')

// GET /api/bookings — list all bookings (owner use)
const getBookings = (req, res) => {
  let result = [...bookings]

  if (req.query.status) {
    result = result.filter((b) => b.status === req.query.status)
  }
  if (req.query.guestEmail) {
    result = result.filter((b) => b.guestEmail === req.query.guestEmail)
  }

  res.status(200).json({ success: true, count: result.length, data: result })
}

// GET /api/bookings/:id — single booking
const getBookingById = (req, res) => {
  const booking = bookings.find((b) => b.id === req.params.id)
  if (!booking) {
    res.status(404)
    throw new Error(`Booking with id ${req.params.id} not found`)
  }
  res.status(200).json({ success: true, data: booking })
}

// POST /api/bookings — create a booking
const createBooking = (req, res) => {
  const { guestName, guestEmail, roomId, checkIn, checkOut, guests } = req.body

  if (!guestName || !guestEmail || !roomId || !checkIn || !checkOut) {
    res.status(400)
    throw new Error('Fields guestName, guestEmail, roomId, checkIn, and checkOut are required')
  }

  const room = rooms.find((r) => r.id === roomId)
  if (!room) {
    res.status(404)
    throw new Error(`Room with id ${roomId} not found`)
  }

  if (room.status === 'booked') {
    res.status(400)
    throw new Error('Room is not available for the selected dates')
  }

  const nights =
    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)

  if (nights <= 0) {
    res.status(400)
    throw new Error('Check-out date must be after check-in date')
  }

  const newBooking = {
    id: uuidv4(),
    guestName,
    guestEmail,
    roomId,
    roomTitle: room.title,
    checkIn,
    checkOut,
    guests: Number(guests) || 1,
    totalAmount: room.price * nights,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }

  bookings.push(newBooking)
  room.status = 'booked'

  res.status(201).json({ success: true, data: newBooking })
}

// PUT /api/bookings/:id — update booking status
const updateBooking = (req, res) => {
  const index = bookings.findIndex((b) => b.id === req.params.id)
  if (index === -1) {
    res.status(404)
    throw new Error(`Booking with id ${req.params.id} not found`)
  }

  bookings[index] = { ...bookings[index], ...req.body, id: bookings[index].id }
  res.status(200).json({ success: true, data: bookings[index] })
}

// DELETE /api/bookings/:id — cancel booking
const deleteBooking = (req, res) => {
  const index = bookings.findIndex((b) => b.id === req.params.id)
  if (index === -1) {
    res.status(404)
    throw new Error(`Booking with id ${req.params.id} not found`)
  }

  const deleted = bookings.splice(index, 1)[0]

  // Free up the room
  const room = rooms.find((r) => r.id === deleted.roomId)
  if (room) room.status = 'available'

  res.status(200).json({ success: true, message: 'Booking cancelled', data: deleted })
}

module.exports = { getBookings, getBookingById, createBooking, updateBooking, deleteBooking }
