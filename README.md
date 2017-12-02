# ex9_nodeJS_REST_mongoose_jasmine
Example showing nodeJS express app that serves REST requests connected to a mongodb collection. It also shows "jasmine" unit testing.

# setup from scratch
+ create project's package.json
```
npm init --yes
```
+ install express, body-parser, mongoose as dependency
```
npm install express body-parser mongoose --save
```
+ install jasmine-node as dev dependency
```
npm install jasmine-node --save-dev
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

## setup from clone
+ clone this project, install dependencies, start mongodb in a separate gitbash, start app in a separate gitbash
```
cd /c/fdu/csci3444/projects
git clone
cd ex9_nodeJS_REST_mongoose_jasmine
npm install
mongod
npm run start
```

## to run app
+ for app to start, mongodb should be started before, then start the app
```
mongod
```
```
cd /c/fdu/csci3444/projects/ex9_nodeJS_REST_mongoose_jasmine
npm install
npm run start
```

## mongodb
+ make sure you have mongodb installed on your machine. To check that you can check version and help of it
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
+ check things from mongodb DOS client, mongo
```
mongo
show dbs
use StudentsDb
show collections
db.students.find()
```

## postman
chrome://apps/


Body, raw, JSON
```
{
	"name": "ilker",
	"lastname": "kiris",
	"grade": "freshman",
	"age": 18,
	"isFullTime": false
}
```
