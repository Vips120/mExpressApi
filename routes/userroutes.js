let express = require("express");
let Joi = require("@hapi/joi");
let router = express.Router();
let User = require("../modeldb/usermodel");

//INSERT 

router.post("/createnewuser", async (req, res) => {
    let user = await User.findOne({ "UserLogin.EmailId": req.body.UserLogin.EmailId });
    if (user) { return res.status(403).send({ message: "already exsist user" }) };
    let { error } = UserValidationError(req.body);
    if (error) { return res.send(error.details[0].message) };
    let { FirstName, LastName, Address, UserLogin } = req.body;
    let newUser = new User({
        FirstName,
        LastName,
        Address,
        UserLogin
    });
    let data = await newUser.save();
    res.send({ message: "Thank you for the registration", d: data });
});


//Fetch data
router.get("/fetchuserdata", async (req, res) => {
    let user = await User.find();
    res.send({ u: user }); 
});

// fetch data by id
router.get("/fetchuserdata/:id", async (req, res) => {
    let user = await User.findById(req.params.id);
    if (!user) { return res.status(404).send({ message: "Invalid user id" }) };
    res.send({ data: user });
}); 

// update user record

router.put("/updatedata/:id", async (req, res) => {
    let user = await User.findById(req.params.id);
    if (!user) { return res.status(404).send({ message: "Invalid user id" }) };
    let { error } = UserValidationError(req.body);
    if (error) { return res.send(error.details[0].message) };
    // let { FirstName, LastName, Address, UserLogin } = user;
    // let { FirstName, LastName, Address, UserLogin} = req.body;
    user.FirstName = req.body.FirstName;
    user.LastName = req.body.LastName;
    user.Address = req.body.Address;
    user.UserLogin.EmailId = req.body.UserLogin.EmailId;
    user.UserLogin.Password = req.body.UserLogin.Password;

    let data = await user.save();
    res.send({ d: data });
});


// remove user record

router.delete("/removedata/:id", async (req, res) => {
    let user  = await User.findByIdAndRemove(req.params.id);
     if (!user) { return res.status(404).send({ message: "Invalid user id" }) };
    res.send({ message: "Thank you ! come back again " });
});






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

module.exports = router;