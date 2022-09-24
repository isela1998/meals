const express = require('express');

// Controllers
const {
  createMeal,
  getAllMeals,
  getMeal,
  updateMeal,
  deleteMeal,
} = require('../controllers/meals.controller');

// Middlewares
const { validateMeal } = require('../middlewares/find.middlewares');
const { newMealValidators } = require('../middlewares/validators.middlewares');

const {
  protectSession,
  protectAdmin,
} = require('../middlewares/auth.middlewares');

const mealRoute = express.Router();

// Public endpoints
mealRoute.get('/', getAllMeals);
mealRoute.get('/:id', getMeal);

// Protect endpoints
mealRoute.use(protectSession);

mealRoute.post('/:id', newMealValidators, createMeal);

mealRoute.patch(
  '/:id',
  validateMeal,
  protectAdmin,
  newMealValidators,
  updateMeal
);

mealRoute.delete('/:id', validateMeal, protectAdmin, deleteMeal);

module.exports = { mealRoute };
