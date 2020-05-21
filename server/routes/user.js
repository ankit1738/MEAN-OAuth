const express = require("express"),
    router = express.Router(),
    auth = require("../middlewares/auth"),
    User = require("../models/user");

router.get("/profile", auth, (req, res) => {
    User.findOne({_id:req.userId}, (err, user) => {
        if(err)
            return res.send("User not found");
        return res.send(user);
    });
});

module.exports = router;