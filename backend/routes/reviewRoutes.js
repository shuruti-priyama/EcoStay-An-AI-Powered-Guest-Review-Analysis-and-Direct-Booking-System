const express = require('express');
const { submitReview, analyzeReviewForOwner, replyToReview, getRoomReviews, getOwnerAllReviews, analyzeOtaReviews } = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { aiAnalysisLimiter } = require('../middleware/rateLimiter');
const { validate, otaReviewsRules } = require('../validators/reviewValidators');

const router = express.Router();

router.post('/ota/analyze', protect, authorize('owner'), aiAnalysisLimiter, otaReviewsRules, validate, analyzeOtaReviews);

router.post('/:bookingId', protect, authorize('guest'), submitReview);

router.get('/room/:roomId', protect, authorize('owner', 'admin'), getRoomReviews);

router.get('/my-rooms', protect, authorize('owner', 'admin'), getOwnerAllReviews);

router.post('/:bookingId/analyze', protect, authorize('owner'), analyzeReviewForOwner);

router.post('/:bookingId/reply', protect, authorize('owner'), replyToReview);

module.exports = router;