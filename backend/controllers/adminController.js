const asyncHandler = require('express-async-handler');
const Room = require('../models/Room');
const Booking = require('../models/Booking');
const User = require('../models/User');

const getAnalytics = asyncHandler(async (req, res) => {
  const [totalRooms, activeRooms, totalGuests, bookingCounts, revenueAgg, recentBookings] = await Promise.all([
    Room.countDocuments(),
    Room.countDocuments({ isActive: true }),
    User.countDocuments({ role: 'guest' }),
    Booking.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Booking.aggregate([
      { $match: { status: { $in: ['approved', 'completed'] } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]),
    Booking.find().populate('room', 'name').populate('guest', 'name').sort({ createdAt: -1 }).limit(5),
  ]);

  const statusMap = { pending: 0, approved: 0, rejected: 0, cancelled: 0, completed: 0 };
  bookingCounts.forEach((item) => {
    statusMap[item._id] = item.count;
  });

  const totalBookings = Object.values(statusMap).reduce((a, b) => a + b, 0);
  const totalRevenue = revenueAgg[0]?.total || 0;

  res.json({
    success: true,
    data: {
      totalRooms,
      activeRooms,
      totalGuests,
      totalBookings,
      totalRevenue,
      bookingsByStatus: statusMap,
      recentBookings,
    },
  });
});

module.exports = { getAnalytics };
