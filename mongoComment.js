    //connect with mongodb with vs code command    

     =>   mongosh $MDB_CONNECTION_STRING



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


db.createCollection("Student")


db.dropDatabase()    // for deleteing the db

























use Student
db.createCollection('std')
db.std.insertMany([{SNO:1,SNAME:"Asmi",DEGREE:"BCA",SEM:6,CGPA:9},
                       {SNO:2,SNAME:"Awani",DEGREE:"MCA",SEM:7,CGPA:8},
                       {SNO:3,SNAME:"Archi",DEGREE:"BTECH",SEM:2,CGPA:7.2},
                       {SNO:4,SNAME:"Riya",DEGREE:"BCA",SEM:3,CGPA:9},
                       {SNO:5,SNAME:"Srasti",DEGREE:"MTECH",SEM:4,CGPA:4},
                       {SNO:6,SNAME:"Anushka",DEGREE:"MCA",SEM:7,CGPA:9},
                       {SNO:7,SNAME:"Rashi",DEGREE:"BA",SEM:8,CGPA:9.5},
                       {SNO:8,SNAME:"Muskan",DEGREE:"BSC",SEM:4,CGPA:8.7},
                       {SNO:9,SNAME:"Priya",DEGREE:"BCA",SEM:3,CGPA:6.9},
                       {SNO:10,SNAME:"Khushi",DEGREE:"BCA",SEM:2,CGPA:7.8}]
                       )
//Q1.Display all the students
db.std.find()

//Q2.Display all the students in BCA
db.std.find({"DEGREE":"BCA"})

//Q3.Display all students in ascending order
db.std.find().sort({SNAME:1})

//Q4.Display first 5 students
db.std.find().limit(5)

//Q5. Display Students 5 6 7
db.std.find({SRN:{$in:[5,6,7]}})

//Q6.list the degree of student Rohan
db.std.find({SNAME:"Rohan"},{DEGREE:1,_id:0})

//Q7.Display students details of 5,6,7 in descending order of percentage
db.std.find({SRN:{$in:[5,6,7]}}).sort({"CGPA":-1})
//Q8. Display the number of students in BCA
db.std.find({DEGREE:"BCA"}).count()

//Q9. Display all the degrees without _id
db.std.find({},{DEGREE:1,_id:0})

//Q10. Display all the distinct degrees
db.std.distinct("DEGREE")

//Q11. Display all the BCA students with CGPA greater than 6, but less than 7.5
db.std.find(DEGREE:"BCA",{CGPA:{$gt:6, $lt:7.5}})