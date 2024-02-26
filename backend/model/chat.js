const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

let chatSchema = new mongoose.Schema ( {

        userName :{
                type:String,
                required: true
        },
                
        mobileNo:{
                type :Number,
                required: true,
                unique: true
        },

        password: {
                type :String,
                required:true,
                
        },

        // confirmPassword: {
        //         type :String,
        //         required:true
        // },

        timestamp: { 
                type: Date, 
                default: Date.now 
        },
});


const ChatModel = mongoose.model("Chat", chatSchema)

module.exports = ChatModel







































// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');

// let chatSchema = new mongoose.Schema ( {

//         userName :{
//                 type:String,
//                 required: true
//         },
                
//         mobileNo:{
//                 type :Number,
//                 required: true
//         },

//         text: {
//                 type :String,
//                 required:true
//         },

//         timestamp: { 
//                 type: Date, 
//                 default: Date.now 
//         },
// });


// const ChatModel = mongoose.model("Chat", chatSchema)

// module.exports = ChatModel



















