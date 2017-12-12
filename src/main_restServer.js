var express = require('express');
var mongoose = require('mongoose'); // mongoose is ODM (Object Data Mapper) nodeJS module for mongodb
var bodyParser = require('body-parser'); // bodyParser used to serialize incoming request body to objects. This puts incoming JSON, x-www-form-urlencoded, ... inputs to request.body

var studentRestRouter = require('./rest/route/studentRestRouter');

var studentMongodbCollection = mongoose.connect("mongodb://localhost/StudentsDb");

var app = express();
// app.use('/students', studentRestRouter); // NOTE ilker important - make sure body-parser is specified before router. Otherwise you get undefined request.body in router
app.use(bodyParser.urlencoded({ extended: true })); // NOTE ilker to parse application/x-www-form-urlencoded, coming from form POSTs
app.use(bodyParser.json()); // NOTE ilker to parse application/json coming from REST clients
app.use('/students', studentRestRouter);
app.use('/api/v1/students', studentRestRouter);


var portNumber = 8016;
app.listen(portNumber, function() {
    console.log("REST server running on port %s", portNumber);
});