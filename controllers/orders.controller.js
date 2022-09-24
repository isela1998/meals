// Models
const { Order } = require('../models/order.model');
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.models');

// Get all order for user in session
const getAllOrders = async (req, res) => {
  try {
    const { sessionUser } = req;

    const orders = await Order.findAll({
      where: { userId: sessionUser.id },
      attributes: ['id', 'totalPrice', 'quantity', 'status'],
      include: {
        model: Meal,
        attributes: ['id', 'name', 'price'],
        include: {
          model: Restaurant,
          attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
        },
      },
    });

    return res.status(200).json({
      status: 'sucess',
      data: { orders },
    });
  } catch (e) {
    console.log(e);
  }
};

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { mealId, quantity } = req.body;
    const { sessionUser, meal } = req;

    const totalPrice = quantity * meal.price;

    const newOrder = await Order.create({
      mealId,
      quantity,
      userId: sessionUser.id,
      totalPrice,
    });

    // Get success response
    return res.status(201).json({
      status: 'success',
      data: { newOrder },
    });
  } catch (e) {
    console.log(e);
  }
};

// Update order when was completed
const updateOrder = async (req, res) => {
  try {
    const { order } = req;

    // Update using a model's instance
    await order.update({ status: 'completed' });

    return res.status(200).json({
      status: 'success',
      data: { order },
    });
  } catch (e) {
    console.log(e);
  }
};

// Delete order cancelled by user
const deleteOrder = async (req, res) => {
  try {
    const { order } = req;

    // Soft delete
    await order.update({ status: 'deleted' });
    return res.status(204).json({ status: 'success' });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { createOrder, updateOrder, deleteOrder, getAllOrders };
