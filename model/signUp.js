const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

let signUpSchema = new mongoose.Schema ( {

        userName :{     
                type:String,
                required: true,
                trim: true,
        },
                
        mobileNo:{
                type :  Number,
                required: true,
                unique: true,
                trim: true
        },

        password: {
                type :String,
                required:true,
                
        },

});

const SignUpModel = mongoose.model("SignUp", signUpSchema)

module.exports = SignUpModel