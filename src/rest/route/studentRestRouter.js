var express = require('express');

var StudentModel = require('../model/studentModel');
var studentRestController = require('../controller/studentRestController')(StudentModel); // NOTE ilker injecting above imported StudentModel into rest controller via its constructor function

var studentRestRouter = express.Router();

studentRestRouter.route('') // "/students" - the root url is defined by user of this router, main_restServer as "/students"
    .get(studentRestController.find)
    .post(studentRestController.save)
    .delete(studentRestController.findByIdInBodyThenRemove);

studentRestRouter.route('/:id') // "students/:id"
    .get(studentRestController.findById)
    .put(studentRestController.findByIdUpdateFullyThenSave)
    .patch(studentRestController.findByIdUpdatePartiallyThenSave)
    .delete(studentRestController.findByIdThenRemove);

studentRestRouter.route('/echo/:msg') // "students/echo/:msg"
    .get(studentRestController.echoMsg)

module.exports = studentRestRouter;