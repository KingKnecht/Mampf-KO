const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');



const ingredientsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        amount: {
            type: Number,
        },
        unit: {
            type: String,
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
        incredients: {
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
 * @typedef Dish
 */
const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;