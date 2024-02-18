const mongoose = require('mongoose');

let chatSchema = new mongoose.Schema ( {

        name: String,
        email: String,
        rollNo: Number,
        class : String,
        age:Number,
        // dob: String,
        department: String

});

const ChatModel = mongoose.model("Student", chatSchema)

module.exports = ChatModel





















