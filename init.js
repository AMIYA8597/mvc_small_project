const mongoose = require('mongoose');
const Todo = require("./model/todo.js")

main().then ( () =>{
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
  // await mongoose.connect('mongodb://127.0.0.1:27017/todo');
  await mongoose.connect('mongodb+srv://amiya0011:lkx5MA0KhxWUlKu2@cluster0.hcwcnib.mongodb.net/?retryWrites=true&w=majority');


  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


let allTodos = [
  {
    type: "go outside"
  },
    {
    type: "sleep peacefully"
  },
    {
    type: "drink water"
  },
    {
    type: "take bath"
  },
    {
    type: "feel comfortable"
  },
]

Todo.insertMany(allTodos)


// todos.save().then( (res) =>{
//   console.log(res);
// })

