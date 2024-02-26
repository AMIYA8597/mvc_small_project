const express = require('express');
const StudentModel = require("../model/student.js");
const router = express.Router();
// const bodyParser = require('body-parser');

router.use(express.json());

// parse application/json
// router.use(bodyParser.json());

module.exports = {

    get_student: async (req, res, next) => {

        console.log("this is get request of all student page");
        try {
            const response = await StudentModel.find();
            console.log("response is ",response);

            res.send({ status: 200, resultFound: response.length, student: response });
        } catch (err) {
            res.status(500).send(err);
        }
    },

    get_student_by_name: async (req, res, next) => {

        console.log("this is get request of all student name  page ");
        const NameQuery = req.query.name;
        console.log("NameQuery is", NameQuery);
        try {
            const response = await StudentModel.find({ name: NameQuery });
            // console.log("get student by their name response", response);
            res.send({ status: 200, resultFound: response.length, student: response });
        } catch (err) {
            res.status(500).send(err);
        }
    },
    

    add_student: async (req, res) => {
        console.log("request is ", req);
        let newStudent = new StudentModel({
            name: req.body.name,
            email: req.body.email,
            rollNo: req.body.rollNo,
            class: req.body.class,
            age: req.body.age
        });

        try {
            const savedStudent = await newStudent.save();
            res.send({ status: 200, msg: 'post: /add-student  works', studentObj: savedStudent });
        } catch (err) {
            res.status(500).send(err);
        }
    },

    
    // add_student: async (req, res) => {
    //     try {
    //         if (!req.body || !req.body.name || !req.body.email || !req.body.rollNo || !req.body.class || !req.body.age) {
    //             throw new Error("Invalid request body");
    //         }
    //         const newStudent = new StudentModel({
    //             name: req.body.name,
    //             email: req.body.email,
    //             rollNo: req.body.rollNo,
    //             class: req.body.class,
    //             age: req.body.age
    //         });

    //         const savedStudent = await newStudent.save();
    //         res.send({ status: 200, msg: 'post: /add-student  works', studentObj: savedStudent });
    //     } 
        
    //     catch (err) {
    //         res.status(400).send(err.message || err);
    //     }
    // },


    update_student_by_id: async (req, res, next) => {
        const studentId = req.query._id;
        try {
            await StudentModel.findByIdAndUpdate(studentId, { $set: req.body });
            const updatedStudent = await StudentModel.findById(studentId);
            res.send(updatedStudent);
        } catch (err) {
            res.status(500).send(err);
        }
    },



    delete_student: async (req, res, next) => {
        const studentId = req.query._id;
        try {
            const deletedStudent = await StudentModel.findByIdAndDelete(studentId);
            console.log("record with " + studentId + " has been deleted");
            res.send({ status: 200, student: deletedStudent });
        } catch (err) {
            res.status(500).send(err);
        }
    }
};

























// const express = require('express');
// const StudentModel = require("../model/student.js");
// const router = express.Router();

// // Middleware to parse JSON bodies
// router.use(express.json());

//  module.exports =  {
//     add_student : async(req, res)=> {
//     //     let newStudent = new StudentModel({
//     //         firstName: req.body.fisrtName,
//     //         lastName: req.body.lastName,
//     //         age: req.body.age,  
//     //         dob: req.body.dob,
//     //         department: req.body.department
//     //     });

//         let newStudent = new StudentModel({
//             name: req.body.name,
//             email: req.body.email,
//             rollNo: req.body.rollNo,  
//             class: req.body.class,
//             age: req.body.age
//         });

//         await newStudent.save(function(err, newStudent){
//             if(err)
//                   res.send(err);
//             else
//           res.send({status:200, msg:'post: /add-student  works', studentObj:  newStudent});
//         });
//     },
  
//   get_student : async (req, res,next)=> {
//         StudentModel.find(function(err,response){
//             if(err)
//                    res.send(err);
//             else
//                   res.send({status:200, resultFound: response.length,
//                           student: response });
//         });
//     },
 


//     get_student_by_first_name : async (req, res, next) => {
//         const NameQuery = req.query.name;
//         StudentModel.find( { name: NameQuery}, function(err, response){
//             if(err)
//                   res.send(err);
//             else
//                   res.send({status:200, resultFound: response.length,
//                                                           student: response });
//         });
//     },
//     update_student_by_id :  (req, res, next)=> {
//        const studentId = req.query._id;
//        StudentModel.findByIdAndUpdate(studentId,{$set: req.body}, 
//        function(err,response)
//         {
//             if(err)
//                 res.send(err);
//             else
//                     StudentModel.findById(studentId, function(err,response)
//                   {
//                         res.send( response);
//                });
//         });
//     },
//    delete_student: (req, res, next) => {
//         const studentid = req.query._id;
//         StudentModel.findByIdAndDelete( studentid, function(err,response){
//             if(err)
//                     res.send(err);
//             else
//                   console.log("record with  "+ studentid + "  has been deleted");
//                   res.send({status:200,  student: response });
//         });
//     }
//  }



















// Sure, let's break down the provided code:

// 1. **Express and Router Initialization**:
//    - `const express = require('express');`: Imports the Express.js framework.
//    - `const router = express.Router();`: Creates an instance of an Express router, which is used to define route handlers.

// 2. **Middleware Configuration**:
//    - `router.use(express.json());`: Configures the router to use the built-in Express middleware `express.json()` 
// to parse JSON bodies of incoming requests.

//  This middleware automatically parses JSON data sent in the request body and makes it available in `req.body`.

// 3. **Exported Object**:
//    - `module.exports = { ... }`: Exports an object containing various route handlers.

// 4. **add_student Route Handler**:
//    - `add_student: async (req, res) => { ... }`: Defines an asynchronous route handler for adding a new student.
//    - Inside the handler:
//      - It checks if the required properties (`name`, `email`, `rollNo`, `class`, `age`) are present in the request body. 
//          If any of them are missing, it throws an error.
//      - Creates a new instance of `StudentModel` with data from the request body.
//      - Attempts to save the new student to the database using `await newStudent.save()`.
//      - If successful, it sends a response with status 200 and includes the saved student object in the response body. 
// If an error occurs during saving, it sends a 400 status code along with the error message.

// 5. **get_student Route Handler**:
//    - `get_student: async (req, res, next) => { ... }`: Defines an asynchronous route handler for fetching all students.
//    - Inside the handler:
//      - It queries the database to find all student records using `await StudentModel.find()`.
//      - Sends a response with status 200 and includes the array of student records in the response body. 
// If an error occurs during the database operation, it sends a 500 status code along with the error message.

// 6. **get_student_by_first_name Route Handler**:
//    - `get_student_by_first_name: async (req, res, next) => { ... }`: 
// Defines an asynchronous route handler for fetching students by their first name.
//    - Inside the handler:
//      - Extracts the value of the `name` query parameter from the request URL.
//      - Queries the database to find student records with a matching `name` using `await StudentModel.find()`.
//      - Sends a response with status 200 and includes the array of matching student records in the response body. 
// If an error occurs during the database operation, it sends a 500 status code along with the error message.

// 7. **update_student_by_id Route Handler**:
//    - `update_student_by_id: async (req, res, next) => { ... }`: Defines an asynchronous route handler 
// for updating a student record by ID.
//    - Inside the handler:
//      - Extracts the value of the `_id` query parameter from the request URL.
//      - Updates the corresponding student record in the database using `await StudentModel.findByIdAndUpdate()`.
//      - Retrieves the updated student record using `await StudentModel.findById()`.
//      - Sends a response with the updated student object. If an error occurs during the database operation, 
// it sends a 500 status code along with the error message.

// 8. **delete_student Route Handler**:
//    - `delete_student: async (req, res, next) => { ... }`: Defines an asynchronous route handler 
// for deleting a student record by ID.
//    - Inside the handler:
//      - Extracts the value of the `_id` query parameter from the request URL.
//      - Deletes the corresponding student record from the database using `await StudentModel.findByIdAndDelete()`.
//      - Sends a response with status 200 and includes the deleted student object in the response body. 
// If an error occurs during the database operation,
//  it sends a 500 status code along with the error message.

// Overall, these route handlers provide CRUD (Create, Read, Update, Delete) 
// operations for managing student records in a database using the Mongoose ORM library in a Node.js Express application.







