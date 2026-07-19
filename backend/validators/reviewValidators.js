const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

const otaReviewsRules = [
  body('rawText')
    .trim()
    .notEmpty()
    .withMessage('Please paste at least one review')
    .isLength({ min: 20 })
    .withMessage('That looks too short to be a real review - please paste the full text')
    .isLength({ max: 12000 })
    .withMessage("That's a lot of text at once - please paste under ~12,000 characters per batch"),
];

module.exports = { validate, otaReviewsRules };