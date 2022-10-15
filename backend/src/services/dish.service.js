const httpStatus = require('http-status');
const { Dish } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a dish
 * @param {Object} dishBody
 * @returns {Promise<Dish>}
 */
const createDish = async (dishBody) => {
//   if (await User.isEmailTaken(userBody.email)) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
//   }
  return Dish.create(dishBody);
};

/**
 * Query for dishes
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryDishes = async (filter, options) => {
  const dishes = await Dish.paginate(filter, options);
  return dishes;
};

/**
 * Get dish by id
 * @param {ObjectId} id
 * @returns {Promise<Dish>}
 */
 const getDishById = async (id) => {
  return Dish.findById(id);
};

/**
 * Delete dish by id
 * @param {ObjectId} dishId
 * @returns {Promise<Dish>}
 */
 const deleteDishById = async (dishId) => {
  const dish = await getDishById(dishId);
  if (!dish) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dish not found');
  }
  await dish.remove();
  return dish;
};


module.exports = {
  createDish,
  queryDishes,
  deleteDishById,
  getDishById
};
