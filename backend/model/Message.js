const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


let messageSchema = new mongoose.Schema ( {

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SignUpModel', 
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SignUpModel',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }

});

const MessageModel = mongoose.model("SignUp", messageSchema)

module.exports = MessageModel










//          {     senderId : senderId ,
    //            receiverId : receiverId ,
    //            message   : message ,
    //            timestamp : `${time}`,
    //      }