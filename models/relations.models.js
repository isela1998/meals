// Models
const { Restaurant } = require('./restaurant.models');
const { User } = require('./user.model');
const { Meal } = require('./meal.model');
const { Order } = require('./order.model');
const { Review } = require('./review.model');

const relations = () => {
  Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' });
  Meal.belongsTo(Restaurant);

  Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
  Review.belongsTo(Restaurant);

  User.hasMany(Review, { foreignKey: 'userId' });
  Review.belongsTo(User);

  Meal.hasOne(Order, { foreignKey: 'mealId' });
  Order.belongsTo(Meal);

  User.hasMany(Order, { foreignKey: 'userId' });
  Order.belongsTo(User);
};

module.exports = { relations };
