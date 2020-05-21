const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const userSchema = Schema({
    fName: {
        type: String,
        required: [true, "Name is required"],

    },
    lName: {
        type: String
    },
    email: {
        type: String,
        required:[true, "Email is required"]
    },
    password: String,
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, config.secret, {expiresIn:120})
    return token;
}

module.exports = mongoose.model("user", userSchema);