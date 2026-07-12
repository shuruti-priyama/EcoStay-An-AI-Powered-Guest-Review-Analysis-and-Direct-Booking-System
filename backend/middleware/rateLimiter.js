const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true, 
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many attempts from this device. Please try again in 15 minutes.',
  },

  skipSuccessfulRequests: true,
});

module.exports = { authLimiter };