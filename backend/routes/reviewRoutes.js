// routes/reviewRoutes.js
const express = require('express')
const router = express.Router()
const { getReviews, getReviewById, createReview, deleteReview, getReviewStats } = require('../controllers/reviewController')

router.get('/stats', getReviewStats)
router.get('/', getReviews)
router.get('/:id', getReviewById)
router.post('/', createReview)
router.delete('/:id', deleteReview)

module.exports = router
