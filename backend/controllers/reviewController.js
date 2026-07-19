const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const { analyzeReview, analyzeOtaReviewsBulk } = require('../utils/geminiReview');

const submitReview = asyncHandler(async (req, res) => {
  const { review, rating } = req.body;

  if (!review || !review.trim()) {
    res.status(400);
    throw new Error('Review text is required');
  }
  if (!rating || rating < 1 || rating > 5) {
    res.status(400);
    throw new Error('Rating must be between 1 and 5');
  }

  const booking = await Booking.findById(req.params.bookingId);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }


  if (booking.guest.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('You can only review your own bookings');
  }


  if (booking.status !== 'completed') {
    res.status(400);
    throw new Error('You can only review completed stays');
  }

  if (booking.review && booking.review.trim().length > 0) {
    res.status(400);
    throw new Error('You have already submitted a review for this booking');
  }

  
  booking.review = review.trim();
  booking.rating = Number(rating);

 
  booking.review = review.trim();
  booking.rating = Number(rating);
  await booking.save();

  res.status(201).json({
    success: true,
    message: 'Review submitted successfully',
    data: {
      review: booking.review,
      rating: booking.rating,
    },
  });
});


const analyzeReviewForOwner = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.bookingId).populate('room');

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }
  
  if (!booking.review) {
    res.status(400);
    throw new Error('This booking does not have a review to analyze');
  }

  
  if (req.user.role === 'owner' && booking.room.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('You can only analyze reviews for rooms you own');
  }

  try {
    const analysis = await analyzeReview(booking.review);
    const aiAnalysis = {
      ...analysis,
      analyzedAt: new Date(),
    };
    booking.aiAnalysis = aiAnalysis;
    await booking.save();

    res.json({ success: true, data: booking.aiAnalysis });
  } catch (err) {
    res.status(500);
    throw new Error('Gemini analysis failed: ' + err.message);
  }
});


const replyToReview = asyncHandler(async (req, res) => {
  const { reply } = req.body;

  if (!reply || !reply.trim()) {
    res.status(400);
    throw new Error('Reply text is required');
  }

  const booking = await Booking.findById(req.params.bookingId).populate('room');

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  
  if (req.user.role === 'owner' && booking.room.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('You can only reply to reviews for rooms you own');
  }

  booking.ownerReply = reply.trim();
  await booking.save();

  res.json({ success: true, data: booking.ownerReply });
});


const getRoomReviews = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.roomId);

  if (!room) {
    res.status(404);
    throw new Error('Room not found');
  }

 
  if (req.user.role === 'owner' && room.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('You can only view reviews for rooms you own');
  }

  const bookings = await Booking.find({
    room: req.params.roomId,
    review: { $exists: true, $ne: '' },
  })
    .populate('guest', 'name email')
    .sort({ updatedAt: -1 });

  res.json({
    success: true,
    count: bookings.length,
    data: bookings.map((b) => ({
      bookingId: b._id,
      guestName: b.guest?.name || 'Guest',
      rating: b.rating,
      review: b.review,
      aiAnalysis: b.aiAnalysis,
      stayDate: b.checkInDate,
      reviewDate: b.updatedAt,
    })),
  });
});


const getOwnerAllReviews = asyncHandler(async (req, res) => {
  const myRooms = await Room.find({ owner: req.user._id }).select('_id name images');
  const myRoomIds = myRooms.map((r) => r._id);

  const bookings = await Booking.find({
    room: { $in: myRoomIds },
    review: { $exists: true, $ne: '' },
  })
    .populate('guest', 'name email')
    .populate('room', 'name images')
    .sort({ updatedAt: -1 });

  res.json({
    success: true,
    count: bookings.length,
    data: bookings.map((b) => ({
      bookingId: b._id,
      guestName: b.guest?.name || 'Guest',
      roomName: b.room?.name || 'Room',
      roomImage: b.room?.images?.[0] || '',
      rating: b.rating,
      review: b.review,
      aiAnalysis: b.aiAnalysis,
      ownerReply: b.ownerReply,
      stayDate: b.checkInDate,
      reviewDate: b.updatedAt,
    })),
  });
});

const analyzeOtaReviews = asyncHandler(async (req, res) => {
  const { rawText } = req.body;

  try {
    const analyzedReviews = await analyzeOtaReviewsBulk(rawText);
    res.json({
      success: true,
      count: analyzedReviews.length,
      data: analyzedReviews,
    });
  } catch (err) {
    res.status(502);
    throw new Error('Gemini analysis failed: ' + err.message);
  }
});

module.exports = {
  submitReview,
  analyzeReviewForOwner,
  replyToReview,
  getRoomReviews,
  getOwnerAllReviews,
  analyzeOtaReviews,
};