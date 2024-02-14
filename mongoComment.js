show database

use (db you want to use)

show collections;

db.collectionName.find()      //searching all collection
db.todos.find().forEach(printjson)

db.collectionName.deleteMany({})  // for deleting all schema
// db.todos.deleteMany({})

use db.Employee.insert command to add a document to the database:

Db refers to the currently connected database.
Employee is the newly created collection on the company database.




db.dropDatabase()    // for deleteing the db