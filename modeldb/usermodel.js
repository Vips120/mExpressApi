let mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
let config = require("config");
let Joi = require("@hapi/joi");
let userSchema = new mongoose.Schema({
    FirstName: { type: String, min: 4, max: 100, trim: true, required: true },
    LastName: { type: String, min: 4, max: 100, trim: true, required: true },
    Address: { type: String, required: true },
    UserLogin: {
        EmailId: { type: String, required: true, unique: true },
        Password: { type: String, required: true, min: 4, max: 150 }
    }
});

userSchema.methods.Tokenperson = function () {
    let token = jwt.sign({ _id: this._id}, config.get("moniapi"));  
    return token;
};


let userModel = mongoose.model("users", userSchema);
function UserValidationError(error) {
    let Schema = Joi.object({
        FirstName: Joi.string().min(4).max(100).required(),
        LastName: Joi.string().min(4).max(100).required(),
        Address: Joi.string().required(),
        UserLogin: {
            EmailId: Joi.string().required().email(),
            Password: Joi.any().required()
        }
    });
    return Schema.validate(error);
};


module.exports = { userModel, UserValidationError };