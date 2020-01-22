let mongoose = require("mongoose");
let Joi = require("@hapi/joi");
let movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    actor: { type: String, required: true },
    price: { type: Number, required: true },
    stocks: { type: Number, required: true }
});

let movieModel = mongoose.model("moviestocks", movieSchema);

function MovieValidation(error) {
    let Schema = Joi.object({
        name: Joi.string().required(),
        actor: Joi.string().required(),
        price: Joi.number().required(),
        stocks: Joi.number().required()
    });
    return Schema.validate(error);
};

module.exports = { MovieValidation, movieModel, movieSchema };