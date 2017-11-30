var mongoose = require('mongoose'); // this is ODM (Object Data Modeller) used to model and access mongodb
var Schema = mongoose.Schema;

var studentModel = new Schema({
    name: String,
    lastname: String,
    grade: String,
    age: Number,
    isFullTime: { type: Boolean, default: true }
});

module.exports = mongoose.model("Student", studentModel);