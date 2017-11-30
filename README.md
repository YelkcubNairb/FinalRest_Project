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

## mongodb
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
