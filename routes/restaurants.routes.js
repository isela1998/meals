const express = require('express');

// Controllers
const {
  createRestaurant,
  getRestaurant,
  getAllRestaurants,
  updateRestaurant,
  createReview,
  updateReview,
  deleteRestaurant,
  deleteReview,
} = require('../controllers/restaurants.controller');

// Middlewares
const {
  validateRestaurant,
  validateReview,
} = require('../middlewares/find.middlewares');

const {
  createRestaurantValidators,
  editRestaurantValidators,
  newReviewValidators,
} = require('../middlewares/validators.middlewares');

const {
  protectSession,
  protectAdmin,
  protectReviewsOwners,
} = require('../middlewares/auth.middlewares');

const restaurantRoute = express.Router();

// Public endpoints
restaurantRoute.get('/', getAllRestaurants);
restaurantRoute.get('/:id', getRestaurant);

// Protect endpoints
restaurantRoute.use(protectSession);

restaurantRoute.post('/', createRestaurantValidators, createRestaurant);

restaurantRoute.post(
  '/reviews/:restaurantId',
  newReviewValidators,
  createReview
);

restaurantRoute.patch(
  '/:id',
  validateRestaurant,
  protectAdmin,
  editRestaurantValidators,
  updateRestaurant
);

restaurantRoute.patch(
  '/reviews/:id',
  validateReview,
  protectReviewsOwners,
  newReviewValidators,
  updateReview
);

restaurantRoute.delete(
  '/:id',
  validateRestaurant,
  protectAdmin,
  deleteRestaurant
);

restaurantRoute.delete(
  '/reviews/:id',
  validateReview,
  protectReviewsOwners,
  deleteReview
);

module.exports = { restaurantRoute };
