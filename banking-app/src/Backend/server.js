var express = require("express");
var app = express();
//this ensures i don't have to write full address and can use relative paths for URL
var path = require("path");
//parses response
var bodyParser = require("body-parser");
//api to communicate with DB
var mongoose = require("mongoose");
//mongoDB link to connect
//3kCeKdq4iZWqlg00 this is for mongoatlas may migrate
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
//use mongoose API to connect to backend need to send err msg here
try {
  mongoose.connect(mongoDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
} catch {
  res.send("Err");
}
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
  number: { type: String, required: true },
  dob: { type: String, required: true },
  balance: { type: Number, default: 0, required: true },
  iban: { type: String },
  bic: { type: String }
});
//change this later
var transactionSchema = new Schema({
  location: { type: String, default: "Unknown" },
  cost: { type: Number, default: 0 },
  name: { type: String },
  date: { type: Date },
  email: { type: String }
});
transactionSchema.methods.findName = function(username) {
  //define logic to find statement by name in here
  return this.model("Transactions").find({ email: this.email }, username);
};
transactionSchema.methods.findNameAndDelete = function(username) {
  //define logic to find statement by name in here
  return this.model("Transactions").remove({ email: this.email }, username);
};
var loanSchema = new Schema({
  email: { type: String },
  amount: { type: Number },
  date: { type: String },
  owedTo: { type: String },
  status: { type: String },
  lastUpdate: {type: String}

});
loanSchema.methods.findName = function(username) {
  //define logic to find statement by name in here
  return this.model("Loans").find({ email: this.email }, username);
};
loanSchema.methods.findNameAndDelete = function(username) {
  //define logic to find statement by name in here
  return this.model("Loans").remove({ email: this.email }, username);
};
var supportSchema = new Schema({
  email: { type: String },
  bug: { type: String },
  date: { type: Date },
  status: { type: String }
});
//models for mongoose
var Users = mongoose.model("Users", userSchema);
var Transactions = mongoose.model("Transactions", transactionSchema);
var Loans = mongoose.model("Loans", loanSchema);
var Support = mongoose.model("Support", supportSchema);
var transaction = new Transactions();
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
app.get("/api/transactions", function(req, res) {
  Transactions.find(function(err, data) {
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
//template was taken from earlier project and refactored https://github.com/Ultan-Kearns/eCommerceApp/blob/master/BackEnd/Server.js
app.get("/api/users/:id/:password/:random", function(req, res) {
  Users.findById(req.params.id, function(err, data) {
    if (err) {
      //send back error 500 to show the server had internal error
      res.status(500, "INTERNAL SERVER ERROR " + err);
      return;
    } else if (data != null) {
      //compare user username and password to the username and password in DB
      if (req.params.id == data._id && data.password == req.params.password) {
        //twillio code - taken template from their site
        const accountSid = "AC8cc82f77f451d6f26aeb1481e9c554cf";
        const authToken = "d593089eb8edbcf9eb2ca0242800db11";
        const client = require("twilio")(accountSid, authToken);
        client.messages
          .create({
            body: "Your code is: " + req.params.random,
            from: "+12055089804",
            to: data.number
          })
          .then(message => console.log(message.sid))
          .catch(error => {
            console.log(error);
          });
        res.json(data);
        res.status(200, "User logged in!");
      } else {
        res.json("null");
        res.status(404, "User not found!");
      }
    } else if (data == null) {
      res.json("null");
      res.status(404, "User not found");
    }
  });
});
//template taken from earlier project - https://github.com/Ultan-Kearns/eCommerceApp/blob/master/BackEnd/Server.js
//Improved upon in this project
app.get("/api/emailuser/:id/:password", function(req, res, next) {
  Users.findById(req.params.id, function(err, data) {
    if (data == null)
      res.status(404, "User does not exist on this server", err);
    else if (data._id == req.params.id) {
      res.json(data);
      console.log(data);
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
        text:
          "Here is your password for Independent Banking: " +
          req.params.password
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
app.get("/api/users/:id/", function(req, res) {
  Users.findById(req.params.id, function(err, data) {
    if (err) {
      //send back error 500 to show the server had internel error
      res.status(500, "INTERNAL SERVER ERROR " + err);
    } else if (data != null) {
      res.json(data);
    } else {
      res.json("null");
      res.status(404, "user not found");
    }
  });
});
app.delete("/api/users/:id/", function(req, res) {
  Users.findByIdAndRemove(req.params.id, function(err, data) {
    if (err) {
      //send back error 500 to show the server had internel error
      res.status(500, "INTERNAL SERVER ERROR " + err);
    } else if (data != null) {
      res.status(202, "Deleted Account");
    }
  });
});
app.delete("/api/loans/:email/:id", function(req, res) {
  Loans.findByIdAndRemove(req.params.id, function(err, data) {
    if (err) {
      //send back error 500 to show the server had internel error
      res.status(500, "INTERNAL SERVER ERROR " + err);
    } else if (data != null) {
      res.status(202, "Paid loan");
    }
  });
});
app.post("/api/loans/:email/:id/amount", function(req, res) {
  Loans.findByIdAndUpdate(req.params.id, { amount: req.body.amount }, function(
    err,
    data
  ) {
    if (err) {
      //send back error 500 to show the server had internel error
      res.status(500, "INTERNAL SERVER ERROR " + err);
    } else if (data != null) {
      res.status(201, "Updated loan amount");
      res.json(data);
    }
  });
});
app.post("/api/loans/:email/:id/date", function(req, res) {
  Loans.findByIdAndUpdate(req.params.id, { lastUpdate: req.body.lastUpdate }, function(
    err,
    data
  ) {
    if (err) {
      //send back error 500 to show the server had internel error
      res.status(500, "INTERNAL SERVER ERROR " + err);
    } else if (data != null) {
      res.status(201, "Updated loan date");
      res.json(data);
    }
  });
});
app.post("/api/users", function(req, res) {
  //check if user with same username exists use findById and change id to username
  var balance;
  if (req.body.balance == "") {
    balance = 0;
  } else {
    balance = req.body.balance;
  }
  Users.create({
    _id: req.body._id,
    password: req.body.password,
    name: req.body.name,
    number: req.body.number,
    dob: req.body.dob,
    balance: balance,
    iban: "IE",
    bic: ""
  });
  res.status(201, "Resource created");
});
app.put("/api/users/:id", function(req, res) {
  /*
  Decided to keep this as it may be useful if db is refactored
   Users.findByIdAndUpdate(req.params.id,{name:req.body.name,password:req.body.password,number:req.body.number},function(err,data){
    if (err) {
      //send back error 500 to show the server had internel error
      res.status(500, "INTERNAL SERVER ERROR " + err);
    } else if (data != null) {
      res.status(200,"Updated Account")
    }
  })
  */
});
app.post("/api/users/:id/rand", function(req, res) {
  Users.findByIdAndUpdate(
    req.params.id,
    { password: req.body.password },
    function(err, data) {
      if (err) {
        //send back error 500 to show the server had internel error
        res.status(500, "INTERNAL SERVER ERROR " + err);
      } else if (data != null) {
        res.status(201, "Updated Password  ");
      }
    }
  );
});
app.post("/api/users/:id/balance", function(req, res) {
  Users.findByIdAndUpdate(
    req.params.id,
    { balance: req.body.balance },
    function(err, data) {
      if (err) {
        //send back error 500 to show the server had internel error
        res.status(500, "INTERNAL SERVER ERROR " + err);
      } else if (data != null) {
        res.status(201, "Updated balance");
        res.json(data);
      }
    }
  );
});
app.post("/api/loans", function(req, res) {
  Loans.create({
    email: req.body.email,
    amount: req.body.amount,
    date: req.body.date,
    status: req.body.status,
    owedTo: req.body.owedTo,
    lastUpdate: req.body.lastUpdate
  });
  res.status(201, "Resource created");
});
app.post("/api/transactions", function(req, res) {
  Transactions.create({
    email: req.body.email,
    cost: req.body.cost,
    location: req.body.location,
    name: req.body.name,
    date: req.body.date
  });
  res.status(201, "Resource created");
});
transaction.findName(function(name) {
  console.log(name);
});

app.get("/api/transactions/:email", function(req, res) {
  //custom method to find name on transactions
  transaction = new Transactions({ email: req.params.email });
  transaction.findName(function(err, data) {
    res.json(data);
  });
  res.status(200, "found");
});
app.delete("/api/transactions/:email", function(req, res) {
  Transactions.remove({ email: req.params.email }, function(err, data) {
    res.json(data);
  });
});
app.delete("/api/loans/:email", function(req, res) {
  Loans.remove({ email: req.params.email }, function(err, data) {
    res.json(data);
    res.status(202, "deleted loan");
  });
});
app.post("/api/transactions/:email/:newemail", function(req, res) {
  Transactions.updateMany(
    { email: req.params.email },
    { $set: { email: req.params.newemail } },
    function(err, doc) {
      res.json(doc);
    }
  );
  res.status(201);
});

app.post("/api/loans/:email/:newemail", function(req, res) {
  Loans.updateMany(
    { email: req.params.email },
    { $set: { email: req.params.newemail } },
    function(err, doc) {
      res.json(doc + " " + req.params.newemail);
    }
  );
  res.status(201);
});
app.get("/api/loans/:email", function(req, res) {
  //custom method to find name on transactions
  loan = new Loans({ email: req.params.email });
  loan.findName(function(err, data) {
    res.json(data);
  });
  res.status(200);
});
app.get("/api/loans/:id/", function(req, res) {
  Loans.findById(req.params.id, function(err, data) {
    if (err) {
      //send back error 500 to show the server had internel error
      res.status(500, "INTERNAL SERVER ERROR " + err);
    } else if (data != null) {
      res.json("hi");
      res.status(200, "loan found");
    } else {
      res.json("null");
      res.status(404, "loan not found");
    }
  });
});
app.get("/api/support/", function(req, res) {
  Support.find(function(err, data) {
    res.json(data);
  });
  res.status(200);
});
app.post("/api/support", function(req, res) {
  Support.create({
    email: req.body.email,
    bug: req.body.bug,
    date: req.body.date,
    status: req.body.status
  });
  res.status(201, "Resource created");
});

app.get("/api/users/:number/:random", function(req, res) {
  //twillio code - taken template from their site
  const accountSid = "AC8cc82f77f451d6f26aeb1481e9c554cf";
  const authToken = "d593089eb8edbcf9eb2ca0242800db11";
  const client = require("twilio")(accountSid, authToken);
  client.messages
    .create({
      body: "Your password is: " + req.params.random,
      from: "+12055089804",
      to: req.params.number
    })
    .then(message => console.log(message.sid))
    .catch(error => {
      console.log(error);
    });
    console.log("Sent passwords to number: " + req.params.number);

  res.json(req.params.number);
  res.status(200, "text sent!");
});
//have server listening at port  8080 and have it take keycert to secure server
//uses Secure Socket Layer
https.createServer(security, app).listen(8080);
