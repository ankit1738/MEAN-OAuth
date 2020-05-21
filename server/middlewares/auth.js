const jwt = require("jsonwebtoken"),
    config = require("../config/config");

module.exports = (req, res, next) => {
    const token = req.header("Authorization").split(" ")[1];
    if(!token) {
        return res.send("Acces denied! Please login first")
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) {
            return res.status(401).send({error:"Please login again"})
        }
        console.log(decoded);
        req.userId = decoded._id;
        next();
    });

}