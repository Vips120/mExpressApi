let mongoose = require("mongoose");
let Joi = require("@hapi/joi");
let movie = require("../transcationmodel/movie");
let user = require("../transcationmodel/user");
let usermovieSchema = new mongoose.Schema({
    userId: { type: movie.movieSchema, required:true },
    movieId: { type: user.userSchema , required:true}
});

let usermoviemodel = mongoose.model("usermovies", usermovieSchema);

function UsermovieValidation(error) {
    let Schema = Joi.object({
        uId: Joi.string(),
        mId: Joi.string()
    });
    return Schema.validate(error);
};

module.exports = { usermoviemodel, UsermovieValidation };
