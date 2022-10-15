const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { dishService } = require('../services');

const createDish = catchAsync(async (req, res) => {
  const dish = await dishService.createDish(req.body);
  res.status(httpStatus.CREATED).send(dish);
});

const getDishes = catchAsync(async (req, res) => {
  const filter =  pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await dishService.queryDishes(filter, options);
  res.send(result);
});

// const getUser = catchAsync(async (req, res) => {
//   const user = await userService.getUserById(req.params.userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }
//   res.send(user);
// });

const updateDish = catchAsync(async (req, res) => {
  const dish = await dishService.updateDishById(req.params.dishId, req.body);
  res.send(dish);
});

const deleteDish = catchAsync(async (req, res) => {
  await dishService.deleteDishById(req.params.dishId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createDish,
  getDishes,
  // getUser,
  updateDish,
  deleteDish,
};
