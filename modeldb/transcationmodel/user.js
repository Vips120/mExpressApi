let mongoose = require("mongoose");
let Joi = require("@hapi/joi");
let userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    emailid: { type: String, required: true }
});

let userModel = mongoose.model("userstocks", userSchema);

function UserValidationError(error) {
    let Schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        emailid: Joi.string().required()
    });
    return Schema.validate(error);

};

module.exports = { userModel, UserValidationError, userSchema };