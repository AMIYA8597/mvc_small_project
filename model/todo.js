const mongoose = require('mongoose');

let todoSchema = new mongoose.Schema( {
    toDo: {
        type: String
        // required: true,
    },
});

module.exports = mongoose.model("toDo", todoSchema)