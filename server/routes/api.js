const express = require("express"),
    router = express.Router(),
    User = require("../models/user"),
    axios = require('axios').default;

router.get("/login", (req, res) => {
    res.json({Message:"Login Route"});
});

router.post("/login", (req, res) => {
    let userData = req.body;
    User.findOne({email:userData.email}, (err, existingUser) => {
        if(err)
            return res.status(500).send(err);
        if(existingUser == null)
            return res.send("User Not Found")
        console.log(existingUser);
        const token = existingUser.generateAuthToken();
        return res.header({"x-access-Token" : token}).send();
    })
});

router.post("/register", (req, res) => {
    let userData = req.body;
    let user = new User({
        fName: userData.fName,
        lName: userData.lName,
        email: userData.email,
        password: userData.password
    });

    User.findOne({email:user.email}, (err, existingUser) => {
        if(err)
            return res.send(err);
        if(existingUser != null){
            return res.send("Email already exists");
        }
        user.save((err, newUser) => {
            if(err)
                return res.status(500).send(err.message.split(":")[2]);
            return res.status(200).send("User registered sucessfully. Please login again");
        });
    });
    
});


module.exports = router;