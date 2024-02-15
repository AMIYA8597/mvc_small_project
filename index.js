const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const Todo = require("./model/todo.js");
const Student = require("./model/student.js")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


main().then ( () =>{
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/student');
  await mongoose.connect('mongodb+srv://student:studentDB@cluster0.hcwcnib.mongodb.net/?retryWrites=true&w=majority');
}
// //   await mongoose.connect('mongodb+srv://student:studentDB@cluster0.owqydlw.mongodb.net/?retryWrites=true&w=majority');



const indexRoutes = require('./routes/index');
app.use("/students", indexRoutes)

let studentDb = new Student({
    name: "Pijush",
    email: "pijush@gmail.com",
    rollNo: 11,
    class : "Twelve",
    age: 18,
})

studentDb.save().then( (res) =>{
    console.log(res);
})




app.listen(5003, () => {
    console.log("server is running on port 5003");
});






















// app.get("/", (req, res) => {
//     res.send("welcome to nodejs project list")
// })

// const indexRoutes = require('./routes/index');
//         app.use("/", indexRoutes)

// app.get('/', function (req, res) {
//     // res.send('Hello, I am starting a new MVC project');
//     res.render("start")
// });

// app.get('/app', function (req, res) {
//     res.render("index");
// });













// const express = require('express')
// const router = express.Router();
// const ejsMate = require("ejs-mate");
// const app = express();

// const path = require("path");

// // const { TodoList } require ("../view/start.js")
// // import { TodoList } from ("../view/start.js")

// app.set("view engine", "ejs");
// app.set("views", join(__dirname, "views"));

// // app.set("view engine", "ejs");
// // app.set("views", path.join("/Users/webskitters/Desktop/mvc_small_project", "views"));

// // app.engine('html', require('ejs').renderFile);
// // app.set('view engine', 'html');

// // app.engine("ejs", ejsMate);


// app.get('/', function (req, res) {
//     res.send('Hello, i am starting new mvc project')
// })

// app.get('/app', function (req, res) {
//     res.render("/views/index")
// })

// // app.get('/demo', function (req, res) {
// //     res.send("this is demo page")

// //     // res.render("/views/index", {});
// // })
 
//  app.listen(5003, (req, res) => {
//     console.log("server is running on port 5002");
//   });




















// async function main() {
// //   await mongoose.connect('mongodb://127.0.0.1:27017/todo');
//   await mongoose.connect('mongodb+srv://amiya0011:lkx5MA0KhxWUlKu2@cluster0.hcwcnib.mongodb.net/?retryWrites=true&w=majority');

// }





// let todos = new Todo( {
//     type: "complete your work"
// })
// todos.save().then( (res) =>{
//     console.log(res);
// })

// const indexRoutes = require('./routes/index');
// app.use("/", indexRoutes)

// let studentDb = new Student({
//     name:{
//         type :String,
//     } 
        
//     email : {
//         type : String,
//     }
//     rollNo : {
//         type : Number,
//     }

//     class :{
//         type : String,
//     } 
        
//     age: {
//         type :Number
//     }
// })

// studentDb.save().then( (res) =>{
//     console.log(res);
// })













