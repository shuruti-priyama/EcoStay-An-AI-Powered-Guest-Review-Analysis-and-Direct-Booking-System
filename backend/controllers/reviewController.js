// controllers/reviewController.js
const { v4: uuidv4 } = require('uuid')
const { reviews, rooms } = require('../data/store')

// GET /api/reviews — all reviews (optional ?roomId=xxx filter)
const getReviews = (req, res) => {
  let result = [...reviews]
  if (req.query.roomId) {
    result = result.filter((r) => r.roomId === req.query.roomId)
  }
  if (req.query.sentiment) {
    result = result.filter((r) => r.sentiment === req.query.sentiment)
  }
  res.status(200).json({ success: true, count: result.length, data: result })
}

// GET /api/reviews/:id — single review
const getReviewById = (req, res) => {
  const review = reviews.find((r) => r.id === req.params.id)
  if (!review) {
    res.status(404)
    throw new Error(`Review with id ${req.params.id} not found`)
  }
  res.status(200).json({ success: true, data: review })
}

// POST /api/reviews — create a review
const createReview = (req, res) => {
  const { roomId, guestName, rating, comment } = req.body

  if (!roomId || !guestName || !rating || !comment) {
    res.status(400)
    throw new Error('Fields roomId, guestName, rating, and comment are required')
  }

  if (rating < 1 || rating > 5) {
    res.status(400)
    throw new Error('Rating must be between 1 and 5')
  }

  const room = rooms.find((r) => r.id === roomId)
  if (!room) {
    res.status(404)
    throw new Error(`Room with id ${roomId} not found`)
  }

  // Simple AI-like sentiment analysis based on keywords
  const positiveWords = ['great', 'amazing', 'wonderful', 'excellent', 'beautiful', 'loved', 'perfect', 'fantastic', 'peaceful']
  const negativeWords = ['bad', 'poor', 'terrible', 'worst', 'disappointing', 'dirty', 'noisy', 'unreliable', 'broken']
  const lowerComment = comment.toLowerCase()
  const posCount = positiveWords.filter((w) => lowerComment.includes(w)).length
  const negCount = negativeWords.filter((w) => lowerComment.includes(w)).length
  const sentiment = negCount > posCount ? 'negative' : posCount > 0 ? 'positive' : 'mixed'

  const newReview = {
    id: uuidv4(),
    roomId,
    roomTitle: room.title,
    guestName,
    rating: Number(rating),
    comment,
    sentiment,
    themes: [],
    suggestedResponse: `Thank you ${guestName} for your review of ${room.title}! We appreciate your feedback and hope to welcome you back soon.`,
    createdAt: new Date().toISOString(),
  }

  reviews.push(newReview)

  // Update room rating
  const roomReviews = reviews.filter((r) => r.roomId === roomId)
  room.rating = +(roomReviews.reduce((sum, r) => sum + r.rating, 0) / roomReviews.length).toFixed(1)
  room.reviewCount = roomReviews.length

  res.status(201).json({ success: true, data: newReview })
}

// DELETE /api/reviews/:id — delete a review
const deleteReview = (req, res) => {
  const index = reviews.findIndex((r) => r.id === req.params.id)
  if (index === -1) {
    res.status(404)
    throw new Error(`Review with id ${req.params.id} not found`)
  }
  const deleted = reviews.splice(index, 1)
  res.status(200).json({ success: true, message: 'Review deleted', data: deleted[0] })
}

// GET /api/reviews/stats — summary stats for owner dashboard
const getReviewStats = (req, res) => {
  const total = reviews.length
  const positive = reviews.filter((r) => r.sentiment === 'positive').length
  const negative = reviews.filter((r) => r.sentiment === 'negative').length
  const mixed = reviews.filter((r) => r.sentiment === 'mixed').length
  const avgRating = total > 0
    ? +(reviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1)
    : 0

  res.status(200).json({
    success: true,
    data: { total, positive, negative, mixed, avgRating },
  })
}

module.exports = { getReviews, getReviewById, createReview, deleteReview, getReviewStats }
