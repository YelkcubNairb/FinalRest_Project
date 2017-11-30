// echoMsg: echoMsg,
// find: find,
// findById: findById,
// save: save,
// findByIdUpdateFullyThenSave: findByIdUpdateFullyThenSave,
// findByIdUpdatePartiallyThenSave: findByIdUpdatePartiallyThenSave,
// findByIdThenRemove: findByIdThenRemove,
// findByIdInBodyThenRemove: findByIdInBodyThenRemove


describe("studentRestController", function(params) {
    var studentModel = require('../../../src/rest/model/studentModel');

    var studentModelSpied = {
        echoMsg: jasmine.createSpy(),
        find: jasmine.createSpy(),
        findById: jasmine.createSpy(),
        save: jasmine.createSpy(),
        findByIdUpdateFullyThenSave: jasmine.createSpy(),
        findByIdUpdatePartiallyThenSave: jasmine.createSpy(),
        findByIdThenRemove: jasmine.createSpy(),
        findByIdInBodyThenRemove: jasmine.createSpy()
    };

    var studentRestController = require('../../../src/rest/controller/studentRestController')(studentModelSpied);

    var request = { params: { id: 1 } };
    var response = {
        send: jasmine.createSpy(),
        status: jasmine.createSpy()
    };

    describe("GET /students/echo/:msg", function() {
        it('should call studentModel.echoMsg function', function() {

        });
    });

    describe("GET /students", function() {
        it('studentRestController.find should call studentModel.find function', function() {
            studentRestController.find(request, response);
            expect(studentModelSpied.find).toHaveBeenCalled();
        });
    });

});