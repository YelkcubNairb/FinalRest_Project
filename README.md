# ex9_nodeJS_REST_mongoose_jasmine
Example showing nodeJS express app that serves REST requests connected to a mongodb collection. It also shows "jasmine" unit testing.

## What is mongoose
mongoose is a ODM (Object Data Mapper) node module that provides higher level API to connect, configure, access(read/write) to mongodb

## What is body-parser
Body-parser is a express middleware node module, that is used to serialize the body of http requests. It can be used to parse certain requests (json, ...)

## What is jasmine
Jasmine is a node module similar to mocha (includes features of mocha + simon + ..) that allows one to write unit tests and test them

## What is CORS
Cors is a express middleware node module that allows one to provision CORS (Cross Origin Resource Sharing) in an express app. One can open the whole app for all domains or white listed few. Or one can configure cors for specific routes in app.



# setup from scratch
+ create project's package.json
```
npm init --yes
```
+ install express, body-parser, mongoose, cors as dependency
```
npm install express body-parser mongoose cors --save
```
+ install jasmine-node as dev dependency
```
npm install jasmine-node --save-dev
```
+ make sure nodemon is installed globally
```
npm install -g nodemon
```
+ project directories
```
mkdir -p /c/fdu/csci3444/projects/ex9_nodeJS_REST_mongoose_jasmine
cd /c/fdu/csci3444/projects/ex9_nodeJS_REST_mongoose_jasmine
mkdir -p src/rest/controller
mkdir -p src/rest/model
mkdir -p src/rest/route

mkdir -p test/rest/controller
```
+ 1st create mongoose model, studentModel, under model dir
+ 2nd create rest controller, studentRestController, under controller dir
+ 3rd create rest router, studentRestRouter, under route dir
+ 4th create the main JS of rest service app, main_restServer, directly under src dir
+ 5th create test suite (Spec), studentRestControllerSpec, under test/rest/controller dir

## setup from clone
+ clone this project, install dependencies, start mongodb in a separate gitbash, start app in a separate gitbash
```
cd /c/fdu/csci3444/projects
git clone https://github.com/fdu-csci3444/ex9_nodeJS_REST_monoose_jasmine.git
cd ex9_nodeJS_REST_mongoose_jasmine
npm install -g nodemon
npm install
mongod
npm run start
```

## to run app
+ 0th, make sure you the default data directory is there for mongodb to use
```
ls -lrtd /c/data/db
mkdir -p /c/data/db
```
+ 1st mongodb should be started, then you can start the app. To start mongodb at git bash command line
```
mongod
```
+ 2nd, once you are sure mongodb is running, start the app
```
cd /c/fdu/csci3444/projects/ex9_nodeJS_REST_mongoose_jasmine
npm install
npm run start
```

## mongodb
+ make sure you have mongodb installed on your machine (we had done that 1st or 2nd class). To check that you can check version and help of it
```
mongod --version
mongod -h
```
+ If you do not have mongodb installed, install it following documentation from mongodb to do a default install
+ make sure you the default data directory is there for mongodb to use
```
ls -lrtd /c/data/db
mkdir -p /c/data/db
```
+ mongodb install also installs mongodb DOS client, mongo. You can check its version and help of it
```
mongo --version
mongo -h
```
+ check things from mongodb DOS client, mongo (as example using the DB and collection created/used by the app)
```
mongo
show dbs
use StudentsDb
show collections
db.students.find()
```

## postman - a REST client that you can use to test REST services of this app. You can use curl to test as well
+ install postman 
chrome://apps/

Body, raw, JSON
```
{
	"studentId": 0,
	"name": "ilker",
	"lastname": "kiris",
	"grade": "freshman",
	"age": 18,
	"isFullTime": false
}
```

## to test REST end points of this app via curl or postman
### to test the REST service is up via echo service GET implemented via echoMsg of studentRestController.js
+ This is a service that does not talk to mongodb or do any CRUD (Create Read Update Delete) operations, just echo back msg input from params
+ It returns "echo REST GET returned input msg:" + req.params.msg
+ url of service
```
http://localhost:8016/students/echo/:msg     GET
http://localhost:8016/students/echo/hohoho   GET
```
+ to access it via curl at git bash command line
```
curl -i http://localhost:8016/students/echo/hohoho
```

### to test POST implemented via save of studentRestController.js
+ url of REST service
NOTE _id (the primary key that mongodb by default creates an index to speed up finds on) and __v (meaning version) will be added to record by mongodb itself
http://localhost:8016/students             POST
+ to access it via curl at git bash command line
```
curl -X POST -H "Content-Type: application/json" -i -d '{"studentId": 0, "name":"ilker_0", "lastname":"kiris_0", "grade":"freshman ", "age":200, "isFullTime":false}' http://localhost:8016/students
curl -X POST -H "Content-Type: application/json" -d     '{"studentId": 1, "name":"ilker_1", "lastname":"kiris_1", "grade":"FreshMan",  "age":201, "isFullTime":false}' http://localhost:8016/students
curl -X POST -H "Content-Type: application/json" --data '{"studentId": 2, "name":"ilker_2", "lastname":"kiris_2", "grade":" freshman", "age":202, "isFullTime":true}'  http://localhost:8016/students
```
+ to access via postman 
In postman, select POST as method, click Body, click raw, select "JSON(application/json)" pulldown, enter below
```
{
     "studentId": 4,
     "name": "ilker_4 ",
     "lastname": "kiris_4",
     "grade": "FreshMan ",
     "age": 204,
     "isFullTime": false
}
```

### to test PUT implemented via findByIdUpdateFullyThenSave of studentRestController.js
+ url of REST service
http://localhost:8016/students/:id                       PUT
http://localhost:8016/students/5a23e035decd2b6770ab4890  PUT   (NOTE using _id value of a row from mongodb students collection)
+ to access it via curl at git bash command line
```
 curl -X PUT -H "Content-Type: application/json" -i -d '{"studentId": 0, "name":"ilker_0_update", "lastname":"kiris_0", "grade":"freshman ", "age":200, "isFullTime":false}' http://localhost:8016/students/5a23f72a1fb00a38f0a814a9
curl -X PUT -H "Content-Type: application/json" -i -d '{"studentId": 0, "name":"ilker_0_update_2", "lastname":"kiris_0", "grade":"freshman ", "age":200, "isFullTime":false, "updatedOn":"2017-12-03T12:39:06.446Z"}' http://localhost:8016/students/5a23f72a1fb00a38f0a814a9
curl -X PUT -H "Content-Type: application/json" -i -d '{"studentId": 0, "name":"ilker_0_update_2", "lastname":"kiris_0", "grade":"freshman ", "age":200, "isFullTime":false, "updatedOn":"'"$(date +%Y-%m-%dT%H:%M:%S)"'"}' http://localhost:8016/students/5a23f72a1fb00a38f0a814a9
```
+ to access via postman 
In postman, select PUT as method, click Body, click raw, select "JSON(application/json)" pulldown,
in url enter   http://localhost:8016/students/5a23e72b0a47f03f787cd618
in "Pre-request Script" tab of postman, enter
```
 postman.setGlobalVariable("myCurrentDate", new Date().toISOString());
```
in "Body" tab of postman, enter
```
{
	"studentId": 4,
    "name": "ilker_4_update",
    "lastname": "kiris_4",
    "grade": "FreshMan ",
    "age": 204,
    "isFullTime": false,
    "updatedOn": "{{myCurrentDate}}"
}
```

### to test GET implemented via find of studentRestController.js
+ You can find the rows of students from mongodb, via its client mongo, from output of
```
mongo
> show dbs
> use StudentsDb
> db.students.find()
```
+ url of REST service
http://localhost:8016/students           GET
http://localhost:8016/api/v1/students    GET
+ to access it via curl at git bash command line
```
curl  http://localhost:8016/students
curl -i http://localhost:8016/students
curl -i -X GET http://localhost:8016/students
curl -i http://localhost:8016/api/v1/students
```

### to test GET implemented via findById of studentRestController.js
+ You can find pick one of the row's _id value from mongodb, via its client mongo, from output of
```
mongo
> show dbs
> use StudentsDb
> db.students.find()
```
+ url of REST service
http://localhost:8016/students/:id                                GET
http://localhost:8016/students/5a1464bf3322b34128b20c8c           GET
http://localhost:8016/api/v1/students/:id                         GET
+ to access it via curl at git bash command line
```
curl  http://localhost:8016/students/5a1464bf3322b34128b20c8c
curl -i http://localhost:8016/students/5a1464bf3322b34128b20c8c
curl -i -X GET http://localhost:8016/students/5a1464bf3322b34128b20c8c
curl  http://localhost:8016/api/v1/students/5a1464bf3322b34128b20c8c
```