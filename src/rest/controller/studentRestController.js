var StudentRestController = function(StudentModel) {
    /**
     * Fulfills GET on an  echo service to check REST service is UP
     * It returns "echo REST GET returned input msg:" + req.params.msg
     * http://localhost:8016/students/echo/:msg      GET
     * http://localhost:8016/students/echo/hohoho   GET
     * @param {*} req 
     * @param {*} res 
     */
    var echoMsg = function(req, res) {
        res.status(200);
        res.send("echo REST GET returned input msg:" + req.params.msg);
    };

    /**
     * Fulfills GET REST requests. Returns collection of all students in mondodb using the StudentModel of mongoose that was injected via constructor function
     * http://localhost:8016/students            GET
     * http://localhost:8016/api/v1/students     GET
     * http://localhost:8016/api/v2/students     GET
     *  
     * @param {*} req Request
     * @param {*} res Response
     */
    var find = function(req, res) {
        StudentModel.find(function(error, students) {
            if (error) {
                res.status(500);
                res.send("Internal server error");
            } else {
                res.status(200);
                res.send(students);
            }
        });
    };

    /**
     * Fulfills GET for and id in url REST requests.
     * It returns the student instance whose _id value is specified in url and passed as req.params.id
     * http://localhost:8016/students/:id                                GET
     * http://localhost:8016/students/5a1464bf3322b34128b20c8c           GET
     * @param {*} req 
     * @param {*} res 
     */
    var findById = function(req, res) {
        StudentModel.findById(req.params.id, function(error, student) {
            if (error) {
                res.status(404); // 404 means not found
                res.send("Not found Student for id: %s", req.params.id);
            } else {
                res.status(200);
                res.send(student);
            }
        });
    };

    /**
     * Fulfills POST REST requests. Directly saves student object that was passed in req.body.
     * NOTE _id and _version will be added to record by mongodb itself
     * http://localhost:8016/students             POST
     * @param {*} req 
     * @param {*} res 
     */
    var save = function(req, res) {
        var student = new StudentModel(req.body);
        console.log("--> LOOK req.body: %s", req.body);
        console.log("--> LOOK student: %s", student);
        student.save(function(error) {
            if (error) {
                res.status(500);
                res.send("Save failed");
            } else {
                res.status(201); // 201 means created
                res.send(student);
            }
        });
    };

    // name: String,
    // lastname: String,
    // grade: String,
    // age: Number,
    // isFullTime: { type: Boolean, default: true }

    /**
     * Fulfills PUT REST requests. This is NOT partial update, but full update of student record in mongodb for id in the url 
     * 1) Find the student from mongodb by id provided in the url
     * 2) Set student fetched from mongodb to have values of all the attributes expected to be in the body of request
     * 3) Save the replaced student back to mongodb
     * http://localhost:8016/students             PUT
     * @param {*} req 
     * @param {*} res 
     */
    var findByIdUpdateFullyThenSave = function(req, res) {
        StudentModel.findById(req.params.id, function(error, student) {
            if (error) {
                res.status(404); // 404 means not found
                res.send("Not found Student for id: %s", req.params.id);
            } else {
                student.name = req.body.name;
                student.lastname = req.body.lastname;
                student.grade = req.body.grade;
                student.age = req.body.age;
                student.isFullTime = req.body.isFullTime;

                student.save(function(error) {
                    if (error) {
                        res.status(500);
                        res.send("Save failed");
                    } else {
                        res.status(201); // 201 means created
                        res.send(student);
                    }
                });
            }
        });
    };

    /**
     * Fulfills PATCH REST requests. NOTE this is allows partial update of student record. 
     * 1) Find the student from mongodb by id provided in the url
     * 2) Loop over the attribute names in the body of request and set their values in the student that was fetched from mongodb
     * 3) Save the updated student back to mongodb
     * http://localhost:8016/students             PATCH
     * @param {*} req 
     * @param {*} res 
     */
    var findByIdUpdatePartiallyThenSave = function(req, res) {
        StudentModel.findById(req.params.id, function(error, student) {
            if (error) {
                res.status(404); // 404 means not found
                res.send("Not found Student for id: %s", req.params.id);
            } else {
                // if incoming PUT request's body has accidentally _id, remove it from req.body
                if (req.body._id) {
                    delete req.body._id;
                }
                // loop over the attributes in req.body and set them in student object
                for (var attrName in req.body) {
                    student[attrName] = req.body[attrName];
                }

                student.save(function(error) {
                    if (error) {
                        res.status(500);
                        res.send("Save failed");
                    } else {
                        res.status(201); // 201 means created - in this case means updated
                        res.send(student);
                    }
                })
            }
        });
    };

    /**
     * Fulfills DELETE REST requests.
     * Removes(Deletes) the student row whose _id value is specied in the url and passed in req.
     * NOTE _id and _version will be added to record by mongodb itself
     * http://localhost:8016/students/:id             DELETE
     * @param {*} req 
     * @param {*} res 
     */
    var findByIdThenRemove = function(req, res) {
        StudentModel.findById(req.params.id, function(error, student) {
            if (error) {
                res.status(404); // 404 means not found
                res.send("Not found Student for id: %s", req.params.id);
            } else {
                student.remove(function(error) {
                    if (error) {
                        res.status(500);
                        res.send("Remove failed");
                    } else {
                        res.status(204); // 204 means deleted
                        res.send(student);
                    }
                })
            }
        });
    };

    /**
     * Fulfills DELETE REST requests.
     * Removes(Deletes) the student row whose _id value is specied in the body and passed in req.body._id
     * http://localhost:8016/students             DELETE
     * @param {*} req 
     * @param {*} res 
     */
    var findByIdInBodyThenRemove = function(req, res) {
        StudentModel.findById(req.body._id, function(error, student) {
            if (error) {
                res.status(404); // 404 means not found
                res.send("Not found Student for id: %s", req.body._id);
            } else {
                student.remove(function(error) {
                    if (error) {
                        res.status(500);
                        res.send("Remove failed");
                    } else {
                        res.status(204); // 204 means deleted
                        res.send(student);
                    }
                })
            }
        });
    };

    // expose public functions via returned object below from this module
    return {
        echoMsg: echoMsg,
        find: find,
        findById: findById,
        save: save,
        findByIdUpdateFullyThenSave: findByIdUpdateFullyThenSave,
        findByIdUpdatePartiallyThenSave: findByIdUpdatePartiallyThenSave,
        findByIdThenRemove: findByIdThenRemove,
        findByIdInBodyThenRemove: findByIdInBodyThenRemove
    }
};

module.exports = StudentRestController;