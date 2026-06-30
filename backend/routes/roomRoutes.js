// routes/roomRoutes.js
const express = require('express')
const router = express.Router()
const {
  getRooms,
  searchRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/roomController')

router.get('/search', searchRooms)          // GET /api/rooms/search?q=...
router.get('/', getRooms)                   // GET /api/rooms
router.get('/:id', getRoomById)             // GET /api/rooms/:id
router.post('/', createRoom)                // POST /api/rooms
router.put('/:id', updateRoom)              // PUT /api/rooms/:id
router.delete('/:id', deleteRoom)           // DELETE /api/rooms/:id

module.exports = router
