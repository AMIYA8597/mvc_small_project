const express = require('express');
const randomstring = require('randomstring');
const bcrypt = require('bcrypt');
const ChatModel = require("../model/chat.js");
const router = express.Router();
const bodyParser = require('body-parser');

router.use(express.json());

//  // parse application/json
router.use(bodyParser.json());



module.exports = {
    get_users: async (req, res, next) => {
        console.log("this is get request of all chat application page");
        try {
            // Fetch required fields from the MongoDB server
            const response = await ChatModel.find({}, 'userName mobileNo text timestamp');
            // console.log("response is ", response);
            // Render the EJS template with the fetched data
            res.render("chatPage", { chatData: response } );
        } catch (err) {
            res.status(500).send(err);
        }
    },

    add_user: async (req, res) => {
        console.log("request is ", req.body);
        let newChatUser = new ChatModel({
            userName: req.body.userName,
            mobileNo: req.body.mobileNo,
            password: req.body.password,
            // text: req.body.text,
            timestamp: req.body.timestamp,
            // age: req.body.age
        });

        try {
            const savedChatUser = await new newChatUser.save();
            res.send({ status: 200, msg: 'post: /add-user  works', chatObj: savedChatUser });
        } catch (err) {
            res.status(500).send(err);
        }
    }, 
    
    signUp_get: async (req , res) => {

        // const response = await ChatModel.find({}, 'userName mobileNo password');
        res.render("signUp" )    //, {chatData : response}
    },


    signUp_post : async (req, res) => {
        console.log("signUp_post method started");

        let newChatUser = new ChatModel({
            userName: req.body.userName,
            mobileNo: req.body.mobileNo,
            password: req.body.password,
            // text: req.body.text,
            // timestamp: req.body.timestamp,
            // age: req.body.age
        });
        const reqt = req.body;
        console.log("reqt is" , reqt);
        try {

        

            // console.log("userName" , userName);
            // console.log("mobileNo" , mobileNo);
            // console.log("password" , password);
            // const chat = new ChatModel({ userName , mobileNo , password});
            // console.log("chat is ", chat);
            // const ChatUserSave =  await chat.save();
            // console.log("ChatUserSave", ChatUserSave);
            // res.send({status: 200, message:'post: /register work' , chatObject:ChatUserSave })

            res.redirect("/login");
            
        } catch (error) {
            console.log("facing error");
        }
    },

    login_get : async (req, res) => {
        res.render("login")
    },

    login_post : async (req, res) => {
        const { mobileNo , password} = req.body;
        res.redirect("/")
    },



}












// module.exports = {

//     get_users: async (req, res, next) => {

//         console.log("this is get request of all chat application page");
//         try {
//             const response = await ChatModel.find();
//             console.log("response is ",response);
//             // res.render("/views/chat")
//             res.send({ status: 200, resultFound: response.length, chat: response });
//         } catch (err) {
//             res.status(500).send(err);
//         }
//     },

// }





// get_user_by_name: async (req, res, next) => {

//     console.log("this is get request of all chat user name page ");
//     // let chatUsername = await ChatModel.mobileNo;
//     // console.log("chat user name is", chatUsername);
//     const NameQuery = req.query.userName;
//     console.log("NameQuery is", NameQuery);
//     try {
//         const response = await StudentModel.find({ name: NameQuery });
//         // console.log("get student by their name response", response);
//         res.send({ status: 200, resultFound: response.length, chat: response });
//     } catch (err) {
//         res.status(500).send(err);
//     }
// },












// const bcrypt = require('bcrypt');
// const User = require('../models/User');

// exports.getSignup = (req, res) => {
//   res.render('signup');
// };

// exports.postSignup = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({
//       username,
//       password: hashedPassword,
//     });
//     await user.save();
//     res.redirect('/signin');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal Server Error');
//   }
// };

// exports.getSignin = (req, res) => {
//   res.render('signin');
// };

// exports.postSignin = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (user && (await bcrypt.compare(password, user.password))) {
//       req.session.userId = user._id;
//       return res.send('Logged in successfully!');
//     }
//     res.send('Invalid username or password!');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal Server Error');
//   }
// };














// function generateOTP() {
//     return randomstring.generate({
//         length: 6,
//         charset: 'numeric'
//     });
// }

// // Send OTP to the provided mobile number
// exports.sendOTP = async (req, res, next) => {
//     try {
//         const { mobileNumber } = req.query;
//         const otp = generateOTP(); // Generate a 6-digit OTP
//         const newOTP = new Otps({ mobileNumber, otp });
//         await newOTP.save();

//         // Send OTP via SMS
//         await sendSMS({
//             to: mobileNumber,
//             message: `Your Mobile Number OTP is: ${otp}`,
//         });

//         res.status(200).json({ success: true, message: 'OTP sent successfully' });
//     } catch (error) {
//         console.error('Error sending OTP:', error);
//         res.status(500).json({ success: false, error: 'Internal server error' });
//     }
// };

// // Verify OTP provided by the user
// exports.verifyOTP = async (req, res, next) => {
//     try {
//         const { mobileNumber, otp } = req.query;
//         const existingOTP = await Otps.findOneAndDelete({ mobileNumber, otp });

//         if (existingOTP) {
//             // OTP is valid
//             res.status(200).json({ success: true, message: 'OTP verification successful' });
//         } else {
//             // OTP is invalid
//             res.status(400).json({ success: false, error: 'Invalid OTP' });
//         }
//     } catch (error) {
//         console.error('Error verifying OTP:', error);
//         res.status(500).json({ success: false, error: 'Internal server error' });
//     }
// };
