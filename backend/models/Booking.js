const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    checkInDate: {
      type: Date,
      required: [true, 'Check-in date is required'],
    },
    checkOutDate: {
      type: Date,
      required: [true, 'Check-out date is required'],
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
    },
    totalNights: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'cancelled', 'completed'],
      default: 'pending',
    },
    specialRequests: {
      type: String,
      default: '',
      maxlength: 500,
    },
    adminNote: {
      type: String,
      default: '',
      maxlength: 500,
    },
    contactPhone: {
      type: String,
      default: '',
    },
    // Guest review (submitted after checkout)
    review: {
      type: String,
      default: '',
      maxlength: 2000,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },
    // AI analysis result from Gemini
    aiAnalysis: {
      sentiment: { type: String, default: '' },
      summary: { type: String, default: '' },
      themes: { type: [String], default: [] },
      positives: { type: [String], default: [] },
      negatives: { type: [String], default: [] },
      suggestedResponse: { type: String, default: '' },
      analyzedAt: { type: Date, default: null },
    },
    // Owner's reply to the guest's review
    ownerReply: {
      type: String,
      default: '',
      maxlength: 2000,
    },
  },
  { timestamps: true }
);

bookingSchema.index({ room: 1, checkInDate: 1, checkOutDate: 1 });

module.exports = mongoose.model('Booking', bookingSchema);