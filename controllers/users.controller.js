const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { User } = require('../models/user.model');
const { Order } = require('../models/order.model');
const { Restaurant } = require('../models/restaurant.models');
const { Meal } = require('../models/meal.model');

dotenv.config({ path: './config.env' });

// Create a new account
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Encrypt password
    const salt = await bcrypt.genSalt(12);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPass,
      role,
    });

    // Remove password from response
    newUser.password = undefined;

    // Get success response
    return res.status(201).json({
      status: 'success',
      data: { newUser },
    });
  } catch (e) {
    return res.status(400).json({
      status: 'error',
      message: e.parent.detail,
    });
  }
};

// Log in with email and password
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate if exist a user email active
    const user = await User.findOne({
      where: { email, status: 'active' },
    });

    // Validate credentials if user exist
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        status: 'error',
        message: 'Wrong credentials',
      });
    }

    // Remove password from response
    user.password = undefined;

    // Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '15d',
    });

    return res.status(200).json({
      status: 'success',
      data: { user, token },
    });
  } catch (e) {
    console.log(e);
  }
};

// Update name/email user
const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { user } = req;

    // Update using a model's instance
    await user.update({ name, email });

    user.password = undefined;

    return res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (e) {
    console.log(e);
  }
};

// Delete user account
const deleteUser = async (req, res) => {
  try {
    const { user } = req;

    // Soft delete
    await user.update({ status: 'deleted' });
    return res.status(204).json({ status: 'success' });
  } catch (e) {
    console.log(e);
  }
};

// Get all orders for user in session
const getAllUserOrder = async (req, res) => {
  try {
    const { sessionUser } = req;

    // Filtering by user id
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

// Get one user order
const getUserOrder = async (req, res) => {
  try {
    const { sessionUser } = req;
    const { id } = req.params;

    const order = await Order.findOne({
      where: { id: id, userId: sessionUser.id },
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

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not exist',
      });
    }

    return res.status(200).json({
      status: 'sucess',
      data: { order },
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  signup,
  login,
  updateUser,
  getAllUserOrder,
  getUserOrder,
  deleteUser,
};
