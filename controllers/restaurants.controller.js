// Models
const { Restaurant } = require('../models/restaurant.models');
const { Review } = require('../models/review.model');

// Get all active restaurants and their reviews
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll({
      where: { status: 'active' },
      attributes: ['id', 'name', 'address', 'rating'],
      include: {
        model: Review,
        attributes: ['id', 'userId', 'comment', 'rating'],
      },
    });

    return res.status(200).json({
      status: 'sucess',
      data: { restaurants },
    });
  } catch (e) {
    console.log(e);
  }
};

// Get a restaurant by id
const getRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findOne({
      where: { id: id },
      attributes: ['name', 'address', 'rating'],
      include: {
        model: Review,
        attributes: ['id', 'userId', 'comment', 'rating'],
      },
    });

    if (!restaurant) {
      return res.status(404).json({
        status: 'error',
        message: 'Restaurant not exist',
      });
    }

    return res.status(200).json({
      status: 'sucess',
      data: { restaurant },
    });
  } catch (e) {
    console.log(e);
  }
};

// Register a new restaurant
const createRestaurant = async (req, res) => {
  try {
    const { name, address, rating } = req.body;

    const newRestaurant = await Restaurant.create({
      name,
      address,
      rating,
    });

    // Get success response
    return res.status(201).json({
      status: 'success',
      data: { newRestaurant },
    });
  } catch (e) {
    console.log(e);
  }
};

// Update restaurant info
const updateRestaurant = async (req, res) => {
  try {
    const { name, address } = req.body;
    const { restaurant } = req;

    // Update using a model's instance
    await restaurant.update({ name, address });

    return res.status(200).json({
      status: 'success',
      data: { restaurant },
    });
  } catch (e) {
    console.log(e);
  }
};

// Delete a restaurant
const deleteRestaurant = async (req, res) => {
  try {
    const { restaurant } = req;

    // Soft delete
    await restaurant.update({ status: 'deleted' });
    return res.status(204).json({ status: 'success' });
  } catch (e) {
    console.log(e);
  }
};

// Generate new review for a restaurant
const createReview = async (req, res) => {
  try {
    const { sessionUser } = req;
    const { comment, rating } = req.body;
    const { restaurantId } = req.params;

    const newReview = await Review.create({
      userId: sessionUser.id,
      restaurantId,
      comment,
      rating,
    });

    // Get success response
    return res.status(201).json({
      status: 'success',
      data: { newReview },
    });
  } catch (e) {
    console.log(e);
  }
};

// Update review generated
const updateReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const { review } = req;

    // Update using a model's instance
    await review.update({ comment, rating });

    return res.status(200).json({
      status: 'success',
      data: { review },
    });
  } catch (e) {
    console.log(e);
  }
};

// Delete review generated
const deleteReview = async (req, res) => {
  try {
    const { review } = req;

    // Soft delete
    await review.update({ status: 'deleted' });
    return res.status(204).json({ status: 'success' });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurant,
  updateRestaurant,
  createReview,
  deleteRestaurant,
  updateReview,
  deleteReview,
};
