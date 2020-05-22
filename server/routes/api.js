const express = require("express"),
    router = express.Router(),
    User = require("../models/user"),
    bcrypt = require("bcrypt");

router.get("/login", (req, res) => {
    res.json({Message:"Login Route"});
});

router.post("/login", (req, res) => {
    let userData = req.body;
    User.findOne({email:userData.email}, (err, existingUser) => {
        if(err)
            return res.status(500).send(err);
        if(existingUser == null)
            return res.status(401).send("User Not Found")
        
        bcrypt.compare(userData.password, existingUser.password, function(err, result) {
            if(err)
                return res.status(500).send(err);

            if(result){
                const token = existingUser.generateAuthToken();
                return res.header({"x-access-Token" : token}).status(200).send("User logged in");
            }else{
                return res.status(401).send("Wrong password");
            }
        });
            
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
            return res.status(500).send(err);
        if(existingUser != null){
            return res.status(400).send("Email already exists");
        }
        user.save((err, newUser) => {
            if(err){
                console.log(err);
                return res.status(500).send(err);
            }
            console.log(newUser)
            return res.status(200).send("User registered sucessfully. Please login again");
        });
    });
    
});


module.exports = router;