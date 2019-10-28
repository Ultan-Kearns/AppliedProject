var express = require("express");
var app = express();
//this ensures i don't have to write full address and can use relative paths for URL
var path = require("path");
//parses response
var bodyParser = require("body-parser");
//api to communicate with DB
var mongoose = require("mongoose");
//mongoDB link to connect
var mongoDB =
  "mongodb://ultan:ultanultan1@ds135107.mlab.com:35107/appliedproject";
var Schema = mongoose.Schema;
var router = express.Router();
app.use(bodyParser.json());
//need this for some browsers to allow cross origin request to allow app to communicate with server
app.use(function(req, res, next) {
  //to allow cross origin requests
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const fs = require("fs");
//add https support
const https = require("https");
const keysDirectory = "./";
const cors = require("cors");
app.use(cors(({credentials: true, origin: true})))
const security = {
  //read files for ssl connection - keys are generated with openssl
  //password for decryption - 123456789 Not very secure I know but can't remember harder passwords
  key: fs.readFileSync(keysDirectory + "ca.key"),
  cert: fs.readFileSync(keysDirectory + "cert.crt")
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
//Here I will use get requests to retrieve resources
app.get("/", function(req, res) {
  res.status(200).send("Server is up and running!");
});
app.get("/api/users", function(req, res) {
  bankUserModel.find(function(err, data) {
    res.json(data);
    res.status(200,"request completed");
  });
});
app.get("/api/statements", function(req, res) {
  statementModel.find(function(err, data) {
    res.json(data);
    res.status(200,"request completed");
  });
});
//models for mongoose
var bankUserModel = mongoose.model("users", userSchema);
var statementModel = mongoose.model("statements", statementSchema);

//user login function - modified from previous project
app.get("/api/users/:uID/:userPass", function(req, res) {
  bankUserModel.findById({ user: req.params.user }, function(err, data) {
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
        res.status(200,"User logged in!")
      } else {
        res.json("error");
        res.status(404, "User not found!");
      }
    }
  });
});
//template taken from earlier project
app.get("/api/users/:uId", function(req, res, next) {
  bankUserModel.find({username:req.params.username}, function(err, data) {
    if (data == null)
      res.status(404, "User does not exist on this server", err);
    else if (data.username == req.params.username) {
      var nodemailer = require("nodemailer");
      var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // hostname
    service: "gmail",
        auth: {
          //login to email set up for this project
          user: "reactproject19@gmail.com",
          pass: "GMITreact19"
        },

            tls: {
                ciphers:'SSLv3'
            }

      });
      var mailOptions = {
        //Setting up which account to use for seending emails
        from: "reactproject19@protonmail",
        to: "ultankearns@gmail.com",
        subject: "Forgot Independent Banking password",
        text: "Here is your password for Independent Banking: " + data.password
      };
      //Send email or log errors if user doesn't exist
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {

          console.log("Sent Email to address: " + data.username);
        }
      });
      res.status(200).send("Sent Email to address:" + data.email);
    } else {
      console.log("EMAIL COULD NOT BE SENT");
      res.json("error email not sent");
      res.status(
        404,
        "User does not exist on our server, sorry for inconveniencce"
      );
    }
  });
});
//create users and others here
app.post('/api/users', function(req, res) {
  //check if user with same username exists use findById and change id to username
  bankUserModel.create({
    username:req.body.username,
    password:req.body.password,
})
res.status(201,"Resource created")
});


//have server listening at port  8080 and have it take keycert to secure server
//uses Secure Socket Layer
https.createServer(security,app).listen(8080);
