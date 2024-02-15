const mongoose = require('mongoose');

let todoSchema = new mongoose.Schema( {
    toDo: {
        type: String
        // required: true,
    },
});

module.exports = mongoose.model("toDo", todoSchema)


// let studentSchema = new mongoose.Schema ( {
//     student : {
//         name: String,
//         email: String,
//         rollNo: int,
//         class : String
//     },
// });

// module.exports = mongoose.model("student", studentSchema)