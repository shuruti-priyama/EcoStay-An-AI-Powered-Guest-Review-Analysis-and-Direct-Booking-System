const express = require('express');
const { getRooms, getRoomById, createRoom, updateRoom, deleteRoom, getMyRooms, uploadRoomImageHandler } = require('../controllers/roomController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { uploadSingleRoomImage } = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', getRooms);

router.get('/mine', protect, authorize('owner', 'admin'), getMyRooms);

router.post(
  '/upload-image',
  protect,
  authorize('owner', 'admin'),
  uploadSingleRoomImage,
  uploadRoomImageHandler
);

router.get('/:id', getRoomById);

router.post('/', protect, authorize('owner', 'admin'), createRoom);
router.put('/:id', protect, authorize('owner', 'admin'), updateRoom);
router.delete('/:id', protect, authorize('owner', 'admin'), deleteRoom);

module.exports = router;