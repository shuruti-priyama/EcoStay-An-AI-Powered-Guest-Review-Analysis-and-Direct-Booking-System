const express = require('express');
const {
  createBooking,
  getMyBookings,
  cancelBooking,
  getAllBookings,
  updateBookingStatus,
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, authorize('guest'), createBooking);
router.get('/my', protect, authorize('guest'), getMyBookings);
router.put('/:id/cancel', protect, authorize('guest'), cancelBooking);

router.get('/', protect, authorize('admin'), getAllBookings);
router.put('/:id/status', protect, authorize('admin'), updateBookingStatus);

module.exports = router;
