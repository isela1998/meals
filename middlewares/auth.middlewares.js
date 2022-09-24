const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { User } = require('../models/user.model');

dotenv.config({ path: './config.env' });

const protectSession = async (req, res, next) => {
  // Get user token
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Extract token
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if there is a token
  if (!token) {
    return res.status(403).json({
      status: 'error',
      message: 'Invalid token',
    });
  }

  // Verify the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Verify the token's owner
  const user = await User.findOne({
    where: { id: decoded.id, status: 'active' },
  });

  if (!user) {
    return res.status(403).json({
      status: 'error',
      message: 'The session owner is inactive',
    });
  }

  // Grant access
  req.sessionUser = user;
  next();
};

// Check the session user for updated/deleted
const protectAccount = (req, res, next) => {
  const { sessionUser, user } = req;

  // Verify user
  if (sessionUser.id !== user.id) {
    return res.status(403).json({
      status: 'error',
      message: 'Invalid request. You are not the owner of this account.',
    });
  }

  // Grant access
  next();
};

// Check for access to admin users
const protectAdmin = (req, res, next) => {
  const { sessionUser } = req;

  if (sessionUser.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'You do not have the right access level.',
    });
  }

  next();
};

// Verify owner to update/delete reviews
const protectReviewsOwners = (req, res, next) => {
  const { sessionUser, review } = req;

  if (sessionUser.id !== review.userId) {
    return res.status(403).json({
      status: 'error',
      message: 'Invalid request. This post does not belong to you.',
    });
  }

  next();
};

// Verify owner to update/delete orderd
const protectOrdersOwners = (req, res, next) => {
  const { sessionUser, order } = req;

  if (sessionUser.id !== order.userId) {
    return res.status(403).json({
      status: 'error',
      message: 'Invalid request. This post does not belong to you.',
    });
  }

  next();
};

module.exports = {
  protectSession,
  protectAccount,
  protectAdmin,
  protectReviewsOwners,
  protectOrdersOwners,
};
