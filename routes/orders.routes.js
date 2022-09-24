const express = require('express');

// Controllers
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
} = require('../controllers/orders.controller');

// Middlewares
const { newOrderValidators } = require('../middlewares/validators.middlewares');

const {
  validateOrder,
  validateMealForOrder,
} = require('../middlewares/find.middlewares');

const {
  protectSession,
  protectOrdersOwners,
} = require('../middlewares/auth.middlewares');

const orderRoute = express.Router();

// Protect endpoints
orderRoute.use(protectSession);

orderRoute.get('/me', getAllOrders);

orderRoute.post('/', newOrderValidators, validateMealForOrder, createOrder);

orderRoute.patch('/:id', validateOrder, protectOrdersOwners, updateOrder);

orderRoute.delete('/:id', validateOrder, protectOrdersOwners, deleteOrder);

module.exports = { orderRoute };
