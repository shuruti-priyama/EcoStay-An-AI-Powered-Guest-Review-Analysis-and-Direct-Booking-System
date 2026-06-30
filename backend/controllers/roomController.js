// controllers/roomController.js
const { v4: uuidv4 } = require('uuid')
const { rooms } = require('../data/store')

// GET /api/rooms — list all rooms (optional ?status=available&type=Suite filter)
const getRooms = (req, res) => {
  let result = [...rooms]

  if (req.query.status) {
    result = result.filter((r) => r.status === req.query.status)
  }
  if (req.query.type) {
    result = result.filter((r) => r.type.toLowerCase() === req.query.type.toLowerCase())
  }
  if (req.query.capacity) {
    result = result.filter((r) => r.capacity >= Number(req.query.capacity))
  }

  res.status(200).json({ success: true, count: result.length, data: result })
}

// GET /api/rooms/search?q=bamboo — search rooms by title or description
const searchRooms = (req, res) => {
  const q = (req.query.q || '').toLowerCase()
  if (!q) {
    return res.status(400).json({ success: false, message: 'Query parameter q is required' })
  }
  const result = rooms.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q)
  )
  res.status(200).json({ success: true, count: result.length, data: result })
}

// GET /api/rooms/:id — get single room
const getRoomById = (req, res) => {
  const room = rooms.find((r) => r.id === req.params.id)
  if (!room) {
    res.status(404)
    throw new Error(`Room with id ${req.params.id} not found`)
  }
  res.status(200).json({ success: true, data: room })
}

// POST /api/rooms — create a room
const createRoom = (req, res) => {
  const { title, description, type, price, capacity, beds, bedType, amenities } = req.body

  if (!title || !price || !capacity) {
    res.status(400)
    throw new Error('Fields title, price, and capacity are required')
  }

  const newRoom = {
    id: uuidv4(),
    title,
    description: description || '',
    type: type || 'Room',
    price: Number(price),
    capacity: Number(capacity),
    beds: Number(beds) || 1,
    bedType: bedType || 'King bed',
    status: 'available',
    amenities: amenities || [],
    images: [],
    rating: 0,
    reviewCount: 0,
  }

  rooms.push(newRoom)
  res.status(201).json({ success: true, data: newRoom })
}

// PUT /api/rooms/:id — update a room
const updateRoom = (req, res) => {
  const index = rooms.findIndex((r) => r.id === req.params.id)
  if (index === -1) {
    res.status(404)
    throw new Error(`Room with id ${req.params.id} not found`)
  }

  rooms[index] = { ...rooms[index], ...req.body, id: rooms[index].id }
  res.status(200).json({ success: true, data: rooms[index] })
}

// DELETE /api/rooms/:id — delete a room
const deleteRoom = (req, res) => {
  const index = rooms.findIndex((r) => r.id === req.params.id)
  if (index === -1) {
    res.status(404)
    throw new Error(`Room with id ${req.params.id} not found`)
  }

  const deleted = rooms.splice(index, 1)
  res.status(200).json({ success: true, message: 'Room deleted', data: deleted[0] })
}

module.exports = { getRooms, searchRooms, getRoomById, createRoom, updateRoom, deleteRoom }
