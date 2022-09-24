const express = require('express');

// Controllers
const {
  signup,
  login,
  updateUser,
  getAllUserOrder,
  getUserOrder,
  deleteUser,
} = require('../controllers/users.controller');

// Middlewares
const { validateUser } = require('../middlewares/find.middlewares');

const {
  createUserValidators,
  editUserValidators,
} = require('../middlewares/validators.middlewares');

const {
  protectSession,
  protectAccount,
} = require('../middlewares/auth.middlewares');

const usersRouter = express.Router();

// Public endpoints
usersRouter.post('/signup/', createUserValidators, signup);
usersRouter.post('/login', login);

// Protect endpoints
usersRouter.use(protectSession);

usersRouter.get('/orders', getAllUserOrder);

usersRouter.get('/orders/:id', getUserOrder);

usersRouter.patch(
  '/:id',
  validateUser,
  protectAccount,
  editUserValidators,
  updateUser
);

usersRouter.delete('/:id', validateUser, protectAccount, deleteUser);

module.exports = { usersRouter };
