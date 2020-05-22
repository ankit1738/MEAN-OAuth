const express = require("express"),
    router = express.Router(),
    auth = require("../middlewares/auth"),
    User = require("../models/user");

router.get("/profile", auth, (req, res) => {
    User.findOne({_id:req.userId},{email:1, fName:1, lName:1}, (err, user) => {
        if(err)
            return res.status(401).send("User not found");
        return res.status(200).send(user);
    });
});

module.exports = router;