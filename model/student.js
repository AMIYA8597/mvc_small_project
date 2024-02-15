const mongoose = require('mongoose');

let studentSchema = new mongoose.Schema ( {
    student : {
        name: String,
        email: String,
        rollNo: Number,
        class : String,
        age:Number
    },
});



const StudentModel = mongoose.model("Student", studentSchema)

module.exports = StudentModel

















// let studentSchema = new mongoose.Schema ( {
   
//         name:{
//             type :String,
//         } 
            
//         email : {
//             type : String,
//         }
//         rollNo : {
//             type : Number,
//         }

//         class :{
//             type : String,
//         } 
            
//         age: {
//             type :Number
//         }
    
// });





