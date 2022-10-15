const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const ingredientsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        amount: {
            type: Number,
            required: false
        },
        unit: {
            type: String,
            trim: true,
            required: false
        },
    }
)

const dishSchema = mongoose.Schema(
    {

        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: false,
            unique: false,
            trim: true,
            lowercase: false,

        },
        persons: {
            type: Number,
            default: 1
        },
        ingredients: {
            type: [ingredientsSchema]
        }
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
dishSchema.plugin(toJSON);
dishSchema.plugin(paginate);

/**
 * Check if dish name is taken
 * @param {string} name - The dish's name
 * @param {ObjectId} [excludeDishId] - The id of the dish to be excluded
 * @returns {Promise<boolean>}
 */
 dishSchema.statics.isDishNameTaken = async function (name, excludeDishId) {
    const dish = await this.findOne({ name, _id: { $ne: excludeDishId } });
    return !!dish;
  };
  


/**
 * @typedef Dish
 */
const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;