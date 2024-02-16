const mongoose = require('mongoose');
const Todo = require("./model/todo.js")
const Student = require("./model/student.js")

main().then ( () =>{
    console.log("connection successful");
}).catch(err => console.log(err));

// async function main() {
//   // await mongoose.connect('mongodb://127.0.0.1:27017/todo');
//   await mongoose.connect('mongodb+srv://amiya0011:lkx5MA0KhxWUlKu2@cluster0.hcwcnib.mongodb.net/?retryWrites=true&w=majority');


//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }


// let allTodos = [
//   {
//     type: "go outside"
//   },
//     {
//     type: "sleep peacefully"
//   },
//     {
//     type: "drink water"
//   },
//     {
//     type: "take bath"
//   },
//     {
//     type: "feel comfortable"
//   },
//     {
//     type: "do work"
//   },
// ]

// Todo.insertMany(allTodos)


// todos.save().then( (res) =>{
//   console.log(res);
// })









async function main() {
    // await mongoose.connect('mongodb://127.0.0.1:27017/student');
    await mongoose.connect('mongodb+srv://student:studentDB@cluster0.hcwcnib.mongodb.net/?retryWrites=true&w=majority');
  }

let allStudents = [
  {
    name: "Pranay",
    email: "Pranay@gmail.com",
    rollNo: 12,
    class : "Twelve",
    age: 18,
    department: "Science"
},
  {
    name: "Roma",
    email: "Roma@gmail.com",
    rollNo: 9,
    class : "Twelve",
    age: 18,
    department: "Science"
},
  {
    name: "Rakesh",
    email: "Rakesh@gmail.com",
    rollNo: 7,
    class : "Twelve",
    age: 18,
    department: "Science",
},
  {
    name: "Pratik",
    email: "Pratik@gmail.com",
    rollNo: 4,
    class : "Twelve",
    age: 18,
    department: "Science",
},
  {
    name: "Samir",
    email: "samir@gmail.com",
    rollNo: 2,
    class : "Twelve",
    age: 18,
    department: "Science"
},
  
]

Student.insertMany(allStudents)
