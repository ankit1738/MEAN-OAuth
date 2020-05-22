const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

userSchema.pre('save', function(next){
    var currentUser = this;
    if(currentUser.isModified('password')){
        bcrypt.hash(currentUser.password, 8, (err, hash) => {
            if(err) return err;
            currentUser.password = hash;
            next();
        })
    }
});

module.exports = mongoose.model("user", userSchema);