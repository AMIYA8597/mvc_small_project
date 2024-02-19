const mongoose = require('mongoose');

let chatSchema = new mongoose.Schema ( {

        userName :{
                type:String,
                required: true
        },
                
        mobileNo:{
                type :Number,
                required: true
        },

        text: String,
        timestamp: { 
                type: Date, 
                default: Date.now 
        },
});

const ChatModel = mongoose.model("Chat", chatSchema)

module.exports = ChatModel





















