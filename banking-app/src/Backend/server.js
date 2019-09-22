var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongoDB = 'mongodb://ultan:ultanultan1@ds135107.mlab.com:35107/appliedproject';
var Schema = mongoose.Schema;
var router = express.Router();
mongoose.connect(mongoDB,{ useUnifiedTopology: true, useNewUrlParser: true });
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
  extended: false

}));
app.use(bodyParser.json());
//left in cross origin for firefox
app.use(function(req, res, next) {
  //to allow cross origin requests
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var userSchema = new Schema({
  username: { type: String, default: 'guest' },
  password:{type:String}
})
app.get('/', function(req, res) {
  res.status(200).send('Server works');
});
app.get('/api/users', function(req, res) {
  bankUserModel.find(function(err, data) {
    res.json(data);
  });
})
var bankUserModel = mongoose.model('users', userSchema);

//have server listening at port  8081
var server = app.listen(8080, function() {
var host = server.address().address
  var port = server.address().port
  console.log("Independent banking server listening: http://%s:%s", host, port)
});
