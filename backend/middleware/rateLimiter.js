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

const aiAnalysisLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'AI analysis limit reached for this hour. Please try again later.',
  },
});

module.exports = { authLimiter, aiAnalysisLimiter };