let express = require("express");
let router = express.Router();
let Joi = require("@hapi/joi");
let bcrypt = require("bcrypt");
let jwt = require('jsonwebtoken');
let User = require("../../modeldb/usermodel");
let config = require("config");
let auth = require("../../middleware/auth");
//loggedin user

router.get("/me", auth, async (req, res) => {
    let data = await User
        .userModel
        .findById(req.user._id)
        .select("-UserLogin.Password");
    res.send(data);
});

router.post("/auth", async (req, res) => {
    let { error } = ValidationError(req.body);
    if (error) { return res.send(error.details[0].message) };
    let user = await User.userModel.findOne({ "UserLogin.EmailId": req.body.UserLogin.EmailId });
    if (!user) { return res.status(403).send({ messsage: "Invalid email id" }) }

    let password = await bcrypt.compare(req.body.UserLogin.Password, user.UserLogin.Password);
    // let password = await User.findOne({ "UserLogin.Password": req.body.UserLogin.Password });
    if (!password) { return res.status(403).send({ messsage: "Invalid password" }) };
    //IEP -> INFORMATION EXPERT PRINCIPLE
    // let token = jwt.sign({ _id: user._id}, config.get("moniapi"));
    let token = user.Tokenperson();
    res.header("x-auth-token", token).send({token: token});
});

function ValidationError(error) {
    let schema = Joi.object({
        UserLogin: {
            EmailId: Joi.string().required(),
            Password: Joi.string().required()
          }
    });
    return schema.validate(error);
}

module.exports = router;

