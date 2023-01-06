var express = require("express");
var app = express();
var path = require("path");
var cors = require('cors');
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var config = require("./config/key");
// const mongoose = require("mongoose");
// mongoose
//   .connect(config.mongoURI, { useNewUrlParser: true })
//   .then(() => console.log("DB connected"))
//   .catch(err => console.error(err));
var mongoose = require("mongoose");
var connect = mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
})
    .then(function () { return console.log('MongoDB Connected...'); })
    .catch(function (err) { return console.log(err); });
app.use(cors());
//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/users', require('./routes/users'));
app.use('/api/product', require('./routes/product'));
//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));
// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder   
    // All the javascript and css files will be read and served from this folder
    app.use(express.static("client/build"));
    // index.html for all page routes    html or routing and naviagtion
    app.get("*", function (req, res) {
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
}
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Server Listening on " + port);
});
