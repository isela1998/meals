// Models
const { Restaurant } = require('../models/restaurant.models');
const { Meal } = require('../models/meal.model');

// Create new meal
const createMeal = async (req, res) => {
  try {
    const { name, price } = req.body;
    const { id } = req.params;

    const newMeal = await Meal.create({
      name,
      price,
      restaurantId: id,
    });

    // Get success response
    return res.status(201).json({
      status: 'success',
      data: { newMeal },
    });
  } catch (e) {
    console.log(e);
  }
};

// Get all active meals
const getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.findAll({
      where: { status: 'active' },
      attributes: ['id', 'name', 'price'],
      include: {
        model: Restaurant,
        attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
      },
    });

    return res.status(200).json({
      status: 'sucess',
      data: { meals },
    });
  } catch (e) {
    console.log(e);
  }
};

// Get one active meal by id
const getMeal = async (req, res) => {
  try {
    const { id } = req.params;

    const meal = await Meal.findOne({
      where: { id: id, status: 'active' },
      attributes: ['name', 'price'],
      include: {
        model: Restaurant,
        attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
      },
    });

    if (!meal) {
      return res.status(404).json({
        status: 'error',
        message: 'Meal not exist',
      });
    }

    return res.status(200).json({
      status: 'sucess',
      data: { meal },
    });
  } catch (e) {
    console.log(e);
  }
};

// Update meal info
const updateMeal = async (req, res) => {
  try {
    const { name, price } = req.body;
    const { meal } = req;

    // Update using a model's instance
    await meal.update({ name, price });

    return res.status(200).json({
      status: 'success',
      data: { meal },
    });
  } catch (e) {
    console.log(e);
  }
};

// Delete meal
const deleteMeal = async (req, res) => {
  try {
    const { meal } = req;

    // Soft delete
    await meal.update({ status: 'deleted' });
    return res.status(204).json({ status: 'success' });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { createMeal, getAllMeals, getMeal, updateMeal, deleteMeal };
