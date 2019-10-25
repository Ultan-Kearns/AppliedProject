var express = require("express");
var app = express();
var path = require("path");
//parses response
var bodyParser = require("body-parser");
//api to communicate with DB
var mongoose = require("mongoose");
//mongoDB link
var mongoDB =  "mongodb://ultan:ultanultan1@ds135107.mlab.com:35107/appliedproject";
var Schema = mongoose.Schema;
var router = express.Router();
var cors = require('cors')
app.use(cors()) // Use this after the variable declaration
//need this for some browsers
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
const fs = require("fs");
//add https support
const https = require("https");
const keysDirectory = "./";
const security = {
  //read files for ssl connection - keys are generated with openssl
  key: fs.readFileSync(keysDirectory + "decryptedkey.pem"),
  cert: fs.readFileSync(keysDirectory + "cert.pem"),
 };
//use mongoose API to connect to backend
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
//body parser for middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
//change later
var userSchema = new Schema({
  username: { type: String },
  password: { type: String }
});
//change this later
var statementSchema = new Schema({
  location: { type: String, default: "Unknown" },
  cost: { type: String, default: 0 }
});
app.get("/", function(req, res) {
  res.status(200).send("Server is up");
});
//get app users then send response
app.get("/api/users", function(req, res) {
  bankUserModel.find(function(err, data) {
    res.json(data);
  });
});
//models for mongoose
var bankUserModel = mongoose.model("users", userSchema);
var statementModel = mongoose.model("statements", statementSchema);

//user login function
app.get("/api/users/:uID/:userPass", function(req, res) {
  bankUserModel.findById({ user: req.params.user }, function(err,  data) {
    if (err) {
      //send back error 500 to show the server had internel error
      res.status(500, "INTERNAL SERVER ERROR " + err);
    } else if (data != null) {
      //compare user username and password to the username and password in DB
      if (
        this.user == req.params.username &&
        data.password == req.params.password
      ) {
        res.json(data);
      } else {
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
app.get("/api/users/:uId", function(req, res, next) {
    bankUserModel.findById(req.params.username, function(err, data) {
    if (data == null)
      res.status(404, "User does not exist on this server", err);
    else if (data.username == req.params.username) {
      var nodemailer = require("nodemailer");
      var transporter = nodemailer.createTransport({
        service: "protonmail",
        auth: {
          //login
          user: "reactproject19@protonmail.com",
          pass: "GMITreact19"
        }
      });
      var mailOptions = {
        //Setting up which account to use for seending emails
        from: "reactproject19@protonmail",
        to: mail,
        subject: "Forgot Independent Banking password",
        text: "Here is your password for Independent Banking: " + data.password
      };
      //Send email or log errors if user doesn't exist
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Sent Email to address: " + data.email);
        }
      });
      res.status(200).send("Sent Email to address:" + data.email);
    } else {
      console.log("EMAIL COULD NOT BE SENT");
      res.json("error email not sent");
      res.status(404, "User does not exist on our server, sorry for inconveniencce");
    }
  });
});

//have server listening at port  8080 and have it take keycert to secure server
//uses Secure Socket Layer
https.createServer(security, app).listen(8080);
