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
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
const fs = require("fs");
//add https support
const https = require("https");
const keysDir = "./";
//issue with key certs this adds security to backend to ensure user cannot Access
//unless given key and proper CERTIFICATE
const keyCert = {
  //read files for ssl connection
  key: fs.readFileSync(keysDir + "localhost.key"),
  cert: fs.readFileSync(keysDir + "localhost.cert"),
  clientCert: fs.readFileSync(keysDir + "client.csr")
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

//for login
app.get("/api/users/:uID/:userPass", function(req, res) {
  bankUserModel.findById({ user: req.params.user }, function(err,  data) {
    if (err) {
      //send back generic server fail code
      res.status(500, "INTERNAL SERVER ERROR " + err);
    } else if (data != null) {
      //compare user params to params in DB
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
    bankUserModel.findById(req.params.email, function(err, data) {
    if (data == null)
      res.status(404, "User does not exist on this server", err);
    else if (data.email == req.params.email) {
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
        //this sets up mail options
        from: "reactproject19@protonmail",
        to: mail,
        subject: "Forgot Independent Banking password",
        text: "Here is your password for Independent Banking: " + data.password
      };
      //Send email or log error if user doesn't exist
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
https.createServer(keyCert, app).listen(8080);
//have server listening at port  8080 unsecure
/*
var server = app.listen(8080, function() {
var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})
*/
