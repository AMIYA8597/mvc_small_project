const express = require('express');
const router = express.Router();
const Todo = require("../model/todo.js");
const StudentModel = require("../model/student.js")
const StudentController = require("../controller/studentController.js");
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get( '/', (req,res) => {
  res.send("welcome to student page")
})

router.get( '/get-all-students', StudentController.get_student );

router.get( '/getStudentByName', StudentController.get_student_by_name );

router.post('/add-student', StudentController.add_student);

router.put('/update-student', StudentController.update_student_by_id);

router.delete('/delete_student', StudentController.delete_student);

module.exports = router;













// let todoItems = [
  //   { id: 1, task: 'Buy milk' },
  //   // Add more todo items as needed
  // ];
  
  // // Display all todo items
  // router.get('/', (req, res) => {
    //     // console.log("request",req)
    //     res.render('index', { todoItems });
    // });
    
    
    



    
    
    // let studentItems = [
      //   { id: 1, 
      //     name: "Pijush",
      //     email: "pijush@gmail.com",
      //     rollNo: 11,
      //     class : "Twelve",
      //     age: 18,
      //    },
      
      // ];
      
      
      // router.get('/', (req, res) => {
        //     res.render('index', { studentItems });
        // });



        
        
        // module.exports = router;
        
        
        
        
        
        
        
        
        
        
           
        
        
        
        
        
        
        
        
        
        // // Display form to add a new todo item
        // router.get('/new', (req, res) => {
        //     res.render('new');
        // });
        
        // router.get('/newtodo', async (req, res) => {
        //     // res.render('new')
        //     let todos = await Todo.find();
        //     console.log("here is the todolist",todos);
        //     res.send("todos working")
        // });










// // default  route as given in app.js /students or / as below
// router.get( '/', (req, res)=> {
//   res.send('Welcome Students')
// });

// router.post('/add-student', StudentController.add_student);
 
// router.get( '/get-all-students', StudentController.get_student );

// router.get( '/getStudentByFirstName', StudentController.get_student_by_first_name );

// router.put('/update-student', StudentController.update_student_by_id);

// router.delete('/delete_student', StudentController.delete_student);

// module.exports = router;

















// const express = require('express');
// const router = express.Router();

// // Sample data (replace this with your actual data storage)
// let todoItems = [
//   { id: 1, task: 'Buy groceries' },
//   // Add more todo items as needed
// ];

// // Display all todo items
// router.get('/', (req, res) => {
//   res.render('index', { todoItems });
// });

// // Display form to add a new todo item
// router.get('/new', (req, res) => {
//   res.render('new');
// });

// // Create a new todo item
// router.post('/new', (req, res) => {
//   const { task } = req.body;
//   const newItem = { id: todoItems.length + 1, task };
//   todoItems.push(newItem);
//   res.redirect('/');
// });

// // Display form to edit a todo item
// router.get('/edit/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const item = todoItems.find(item => item.id === id);
//   res.render('edit', { item });
// });

// // Update a todo item
// router.post('/edit/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const { task } = req.body;
//   const itemIndex = todoItems.findIndex(item => item.id === id);
//   todoItems[itemIndex] = { id, task };
//   res.redirect('/');
// });

// // Delete a todo item
// router.post('/delete/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   todoItems = todoItems.filter(item => item.id !== id);
//   res.redirect('/');
// });

// module.exports = router;