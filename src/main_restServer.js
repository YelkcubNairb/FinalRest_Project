var express = require('express');
var mongoose = require('mongoose'); // mongoose is ODM (Object Data Mapper) nodeJS module for mongodb
var bodyParser = require('body-parser'); // bodyParser used to serialize incoming request body to objects

var studentRestRouter = require('./rest/route/studentRestRouter');

var studentMongodbCollection = mongoose.connect("mongodb://localhost/StudentsDb");

var app = express();
app.use('/students', studentRestRouter);
app.use(bodyParser.urlencoded({ extended: false })); // NOTE ilker to parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // NOTE ilker to parse application/json

app.listen(8016, function() {
    console.log("REST server running on port 8016");
});