const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg, // first error, easy to show in a toast
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

const registerRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 60 })
    .withMessage('Name must be under 60 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/\d/)
    .withMessage('Password must contain at least one number'),

  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 7, max: 15 })
    .withMessage('Phone number looks invalid')
    .matches(/^[0-9+\-\s()]*$/)
    .withMessage('Phone number contains invalid characters'),


  body('role')
    .optional()
    .isIn(['guest', 'owner'])
    .withMessage('Role must be either guest or owner'),
];

const loginRules = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('password').notEmpty().withMessage('Password is required'),
];

module.exports = { validate, registerRules, loginRules };