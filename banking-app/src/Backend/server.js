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
//issue with key certs this adds security to backend to ensure user cannot Access
//unless given key and proper CERTIFICATE
const keyCert = {
  //read files for ssl connection
  key  : fs.readFileSync(keysDir + "localhost.key"),
  cert  : fs.readFileSync(keysDir + "localhost.cert"),
  clientCert: fs.readFileSync(keysDir + "client.csr"),
};
app.use(function(req, res, next) {
  //to allow cross origin requests
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
app.get('/api/users/:id', function(req, res,next) {
  console.log("Retrieving user ID")
  userModel.findById(req.params.id,
    function(err, data) {
      if(data == null)
        res.status(404,"User does not exist on this server",err);
else if(data.email == req.params.id){
var nodemailer = require('nodemailer');
var mail = data.email;
console.log(mail);
var transporter = nodemailer.createTransport({
  service: 'protonmail',
  auth: {
    //login
    user: 'reactproject19@protonmail.com',
    pass: 'GMITreact19'
  }
});
var mailOptions = {
  //this sets up mail options
  from: 'reactproject19@protonmail',
  to: mail,
  subject: 'Forgot Independent Banking password',
  text: 'Here is your password for Independent Banking: ' + data.password
};
//Send email or log error if user doesn't exist
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Sent Email: ' + data.email);
  }
});
res.status(200).send("Sent Email" +  data.email);
}
else {
              console.log("error email not sent")
            res.json("error email not sent")
            res.status(404,"User does not exist on our server")
          }
  })
});

//have server listening at port  8080 and have it take keycert to secure server
https.createServer(keyCert,app).listen(8080);
