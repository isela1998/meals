// Models
const { User } = require('../models/user.model');
const { Restaurant } = require('../models/restaurant.models');
const { Meal } = require('../models/meal.model');
const { Order } = require('../models/order.model');
const { Review } = require('../models/review.model');

const validateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id, status: 'active' } });

    // If id doesn't found, send error message
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    req.user = user;
    next();
  } catch (e) {
    console.log(e);
  }
};

const validateRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findOne({
      where: { id, status: 'active' },
    });

    // If id doesn't found, send error message
    if (!restaurant) {
      return res.status(404).json({
        status: 'error',
        message: 'Restaurant not found',
      });
    }

    req.restaurant = restaurant;
    next();
  } catch (e) {
    console.log(e);
  }
};

const validateMeal = async (req, res, next) => {
  try {
    const { id } = req.params;

    const meal = await Meal.findOne({
      where: { id, status: 'active' },
    });

    // If id doesn't found, send error message
    if (!meal) {
      return res.status(404).json({
        status: 'error',
        message: 'Meal not found',
      });
    }

    req.meal = meal;
    next();
  } catch (e) {
    console.log(e);
  }
};

const validateMealForOrder = async (req, res, next) => {
  try {
    const { mealId } = req.body;

    const meal = await Meal.findOne({
      where: { id: mealId, status: 'active' },
    });

    // If id doesn't found, send error message
    if (!meal) {
      return res.status(404).json({
        status: 'error',
        message: 'Meal not found',
      });
    }

    req.meal = meal;
    next();
  } catch (e) {
    console.log(e);
  }
};

const validateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      where: { id, status: 'active' },
    });

    // If id doesn't found, send error message
    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order with active status not found',
      });
    }

    req.order = order;
    next();
  } catch (e) {
    console.log(e);
  }
};

const validateReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    const review = await Review.findOne({ where: { id } });

    // If id doesn't found, send error message
    if (!review) {
      return res.status(404).json({
        status: 'error',
        message: 'Review not found',
      });
    }

    req.review = review;
    next();
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  validateUser,
  validateRestaurant,
  validateMeal,
  validateMealForOrder,
  validateOrder,
  validateReview,
};
