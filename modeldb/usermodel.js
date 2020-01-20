let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    FirstName: { type: String, min: 4, max: 100, trim: true, required: true },
    LastName: { type: String, min: 4, max: 100, trim: true, required: true },
    Address: { type: String, required: true },
    UserLogin: {
        EmailId: { type: String, required: true, unique: true },
        Password: { type: String, required: true, min: 4, max: 150 }
    }
});

let userModel = mongoose.model("users", userSchema);

module.exports = userModel;