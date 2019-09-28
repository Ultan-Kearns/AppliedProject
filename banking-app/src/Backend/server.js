var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var mongoDB =
  "mongodb://ultan:ultanultan1@ds135107.mlab.com:35107/appliedproject";
var Schema = mongoose.Schema;
var router = express.Router();
const fs = require("fs");
//add https support
const https = require("https");
const keysDir = "./";
//issue with key certs
const keyCert = {
  //read files for ssl connection
  key  : fs.readFileSync(keysDir + "localhost.key"),
  cert  : fs.readFileSync(keysDir + "localhost.cert"),

};
app.use(function(req, res, next) {
  //to allow cross origin requests
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
//Here we are configuring express to use body-parser as middle-ware.
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
//left in cross origin for firefox


var userSchema = new Schema({
  username: { type: String, default: "guest" },
  password: { type: String }
});
//change this later
var statementSchema = new Schema({
  location: { type: String, default: "Unknown" },
  cost: { type: String, default: 0 }
});
app.get("/", function(req, res) {
  res.status(200).send("Server works");
});
app.get("/api/users", function(req, res) {
  bankUserModel.find(function(err, data) {
    res.json(data);
  });
});
//models for mongoose
var bankUserModel = mongoose.model("users", userSchema);
var statementModel = mongoose.model("statements", statementSchema);

app.get("/api/users/:id/:password", function(req, res) {
  bankUserModel.findById({username:req.params.username}, function(err, data) {
    console.log("inside" + req.params.username);
    if (err) {
      res.status(500, "Error " + err);
    } else if (data != null) {
      //compare user params to params in DB
      if (this.username == data.username && data.password == req.params.password) {
        console.log("equals");
        res.json(data);
      } else {
        console.log("error" + req.params.username);
        res.json("error");
        res.status(404, "User not found");
      }
    }
  });
});
app.get("/api/statements", function(req, res) {
  statementModel.find(function(err, data) {
    res.json(data);
  });
});
//have server listening at port  8080
https.createServer(keyCert,app).listen(8080);
