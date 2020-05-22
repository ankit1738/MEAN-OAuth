const jwt = require("jsonwebtoken"),
    config = require("../config/config");

module.exports = (req, res, next) => {
    const token = req.header("Authorization").split(" ")[1];
    if(!token) {
        return res.status(401).send("Acces denied! Please login first")
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) {
            return res.status(401).send({error:"Please login again"})
        }
        req.userId = decoded._id;
        next();
    });

}