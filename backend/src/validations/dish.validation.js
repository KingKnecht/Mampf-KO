const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createDish = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().allow(''),
    persons : Joi.number().min(1),   
    ingredients : Joi.array().items(
       Joi.object({
        name : Joi.string().required(),
        amount : Joi.number().allow(''),
        unit : Joi.string().allow(''),
       })
    )
  }),
};

const getDishes = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDish = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createDish,
  getDishes,
//   getUser,
//   updateUser,
//   deleteUser,
};
