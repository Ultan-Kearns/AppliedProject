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
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const fs = require("fs");
//add https support
const https = require("https");
const keysDirectory = "./";
const cors = require("cors");
app.use(cors({ credentials: true, origin: true }));
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
  _id: { type: String },
  password: { type: String, required: true },
  name: { type: String, required: true },
  number: { type: Number, required: true },
  dob: { type: Date, required: true },
  balance: { type: Number, default: 0 }
});
//change this later
var statementSchema = new Schema({
  location: { type: String, default: "Unknown" },
  cost: { type: Number, default: 0 },
  name: { type: String },
  date: { type: Date },
  email: { type: String }
});
statementSchema.methods.findName = function(username) {
  //define logic to find statement by name in here
  return this.model("Statements").find({ email: this.email }, username);
};
var loanSchema = new Schema({
  email: { type: String },
  amount:{type:Number},
  date:{type:String}
})
loanSchema.methods.findName = function(username) {
  //define logic to find statement by name in here
  return this.model("Loans").find({ email: this.email }, username);
};
//models for mongoose
var Users = mongoose.model("Users", userSchema);
var Statements = mongoose.model("Statements", statementSchema);
var Loans = mongoose.model("Loans",loanSchema);
var statement = new Statements();
var loan = new Loans();
//Here I will use get requests to retrieve resources
app.get("/", function(req, res) {
  res.status(200).send("Server is up and running!");
});
app.get("/api/users", function(req, res) {
  Users.find(function(err, data) {
    res.json(data);
    res.status(200, "request completed");
  });
});
app.get("/api/statements", function(req, res) {
  Statements.find(function(err, data) {
    res.json(data);
    res.status(200, "request completed");
  });
});
app.get("/api/loans", function(req, res) {
  Loans.find(function(err, data) {
    res.json(data);
    res.status(200, "request completed");
  });
});
//template was taken from earlier project
app.get("/api/users/:id/:password", function(req, res) {
  Users.findById(req.params.id, function(err, data) {
    if (err) {
      //send back error 500 to show the server had internel error
      res.status(500, "INTERNAL SERVER ERROR " + err);
    } else if (data != null) {
      //compare user username and password to the username and password in DB
      if (req.params.id == data._id && data.password == req.params.password) {
        res.json(data);
        res.status(200, "User logged in!");
      } else {
        res.json("404");
        res.status(404, "User not found!");
      }
    }
  });
});
//template taken from earlier project - https://github.com/Ultan-Kearns/eCommerceApp/blob/master/BackEnd/Server.js
//Improved upon in this project
app.get("/api/emailuser/:id/", function(req, res, next) {
  Users.findById(req.params.id, function(err, data) {
    if (data == null)
      res.status(404, "User does not exist on this server", err);
    else if (data._id == req.params.id) {
      res.json(data);
      res.status(200, "User logged in!");
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
          ciphers: "SSLv3"
        }
      });
      var mailOptions = {
        //Setting up which account to use for seending emails
        from: "reactproject19@gmail.com",
        to: data._id,
        subject: "Forgot Independent Banking password",
        text: "Here is your password for Independent Banking: " + data.password
      };
      //Send email or log errors if user doesn't exist
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Sent Email to address: " + req.params.id);
        }
      });
    } else {
      console.log("EMAIL COULD NOT BE SENT");
      res.json("error email not sent");
    }
  });
});
app.get("/api/getuser/:id/", function(req, res) {
  Users.findById(req.params.id, function(err, data) {
    if (err) {
      //send back error 500 to show the server had internel error
      res.status(500, "INTERNAL SERVER ERROR " + err);
    } else if (data != null) {
      res.json(data);
    }
  });
});
//create users and others here
app.post("/api/users", function(req, res) {
  //check if user with same username exists use findById and change id to username

  Users.create({
    _id: req.body._id,
    password: req.body.password,
    name: req.body.name,
    number: req.body.number,
    dob: req.body.dob
  });
  res.status(201, "Resource created");
});
app.post("/api/loans", function(req, res) {
  Loans.create({
    email:req.body.email,
    amount: req.body.amount,
    date: req.body.date
  });
  res.status(201, "Resource created");
});
statement.findName(function(name) {
  console.log(name);
});

app.get("/api/statements/:email", function(req, res) {
  //custom method to find name on statements
  statement = new Statements({ email: req.params.email });
  statement.findName(function(err, data) {
    res.json(data);
  });
});
app.get("/api/loans/:email", function(req, res) {
  //custom method to find name on statements
  loan = new Loans({ email: req.params.email });
  loan.findName(function(err, data) {
    res.json(data);
  });
});
//have server listening at port  8080 and have it take keycert to secure server
//uses Secure Socket Layer
https.createServer(security, app).listen(8080);
