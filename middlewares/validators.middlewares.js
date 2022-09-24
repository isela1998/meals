const { body, validationResult } = require('express-validator');

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    const message = errorMessages.join('. ');

    return res.status(400).json({
      status: 'error',
      message,
    });
  }

  next();
};

const createUserValidators = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name cannot be empty'),
  body('role')
    .isString()
    .withMessage('Role must be a string')
    .notEmpty()
    .withMessage('Role cannot be empty'),
  body('email').isEmail().withMessage('Must provide a valid email'),
  body('password')
    .isString()
    .withMessage('Password must be a string')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  checkValidations,
];

const createRestaurantValidators = [
  body('name')
    .isString()
    .withMessage('Restaurant name must be a string')
    .notEmpty()
    .withMessage('Restaurant name cannot be empty'),
  body('address')
    .isString()
    .withMessage('Address must be a string')
    .notEmpty()
    .withMessage('Address cannot be empty'),
  body('rating').isInt().withMessage('Must provide a valid rating'),
  checkValidations,
];

const editUserValidators = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name cannot be empty'),
  body('email').isEmail().withMessage('Must provide a valid email'),
  checkValidations,
];

const editRestaurantValidators = [
  body('name')
    .isString()
    .withMessage('Restaurant name must be a string')
    .notEmpty()
    .withMessage('Restaurant name cannot be empty'),
  body('address')
    .isString()
    .withMessage('Address must be a string')
    .notEmpty()
    .withMessage('Address cannot be empty'),
  checkValidations,
];

const newReviewValidators = [
  body('comment')
    .isString()
    .withMessage('Comment must be a string')
    .notEmpty()
    .withMessage('Comment cannot be empty'),
  body('rating').isInt().withMessage('Must provide a valid rating'),
  checkValidations,
];

const newMealValidators = [
  body('name')
    .isString()
    .withMessage('Meal name must be a string')
    .notEmpty()
    .withMessage('Meal name cannot be empty'),
  body('price').isDecimal().withMessage('Must provide a valid price'),
  checkValidations,
];

const newOrderValidators = [
  body('mealId').isInt().withMessage('Must provide a valid meal id'),
  body('quantity').isInt().withMessage('Must provide a valid quantity'),
  checkValidations,
];

module.exports = {
  createUserValidators,
  createRestaurantValidators,
  editUserValidators,
  editRestaurantValidators,
  newReviewValidators,
  newMealValidators,
  newOrderValidators,
};
