const express = require("express"),
    router = express.Router(),
    User = require("../models/user");

router.get("/login", (req, res) => {
    res.json({Message:"Login Route"});
});

router.post("/login", (req, res) => {
    let userData = req.body;
    let user = new User({
        fName: userData.fName,
        lName: userData.lName,
        email: userData.email,
        password: userData.password
    })
    user.save((err, newUser) => {
        if(err)
            res.status(500).send(err.message.split(":")[2]);
        res.status(200).send("User Saved and logged in");
    });
});

module.exports = router;