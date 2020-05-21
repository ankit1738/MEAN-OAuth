const express = require("express"),
    app = express();
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
    config = require("./config/config"),
    api = require("./routes/api"),
    userRoute = require("./routes/user");
    
// Configuring Mongoose
mongoose.connect(config.mongoURI, { useNewUrlParser: true,  useUnifiedTopology: true }, err => {
    if(err)
        console.error(err);
    else
        console.log("Connected to MongoDB");
});
mongoose.Promise = global.Promise;

//Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', api);
app.use("/user", userRoute)

app.listen(config.port, (err) => {
    if(err)
        console.log(err);
    console.log("Server listening at port: " + config.port);
})

