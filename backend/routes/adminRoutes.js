const express = require('express');
const { getAnalytics, getOwnerAnalytics } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/analytics', protect, authorize('admin'), getAnalytics);
router.get('/owner-analytics', protect, authorize('owner'), getOwnerAnalytics);

module.exports = router;
