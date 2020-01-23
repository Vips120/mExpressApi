let Joi = require("@hapi/joi");
let mongoose = require("mongoose");
let GenreSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

let movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    actor: { type: String, required: true },
    price: { type: Number, required: true },
    genre: { type: GenreSchema ,required:true}
});
let taskSchema = new mongoose.Schema({
    tags: [String],
    name:{type: String},
    author: { type: String },
    isPublished:{type: Boolean}
});

let genreModel = mongoose.model("gernes", GenreSchema);
let movieModel = mongoose.model("movies", movieSchema);
let taskModel = mongoose.model("tasks", taskSchema, "tasks");

function GenreValidation(error) {
    let Schema = Joi.object({
        name: Joi.string().required()
    });
    return Schema.validate(error);
};

function movieValidation(error) {
    let Schema = Joi.object({
        name: Joi.string().required(),
        actor: Joi.string().required(),
        price: Joi.number().required(),
        genreId: Joi.string().required()
    });
    return Schema.validate(error);
};

module.exports = { genreModel, movieModel, GenreValidation, movieValidation,taskModel };

