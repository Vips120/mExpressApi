let express = require("express");
let router = express.Router();
let bcrypt = require("bcrypt");
let User = require("../modeldb/usermodel");


router.post("/forgotpassword/:token", async (req, res) => {
    let user = await User.userModel.findOne({
        "resetpasswordtoken": req.params.token,
        "resetpasswordexpires": {
            $gt: Date.now()
        }
    });
    if (!user) { return res.status(403).send({ message: "invalid token or token got expires" }) };
    let oldpassword = await bcrypt.compare(req.body.UserLogin.Password, user.UserLogin.Password);
    if (oldpassword) { return res.status(404).send({ message: "old password, please try to create new password" }) };
    user.UserLogin.Password = req.body.UserLogin.Password;
    user.resetpasswordexpires = undefined;
    user.resetpasswordtoken = undefined;
    let salt = await bcrypt.genSalt(10);
    user.UserLogin.Password = await bcrypt.hash(user.UserLogin.Password, salt);
    await user.save();
    res.send({ message: "Password updated" });

});

module.exports = router;