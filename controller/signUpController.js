const express = require('express');
const randomstring = require('randomstring');
const bcrypt = require('bcrypt');
const SignUpModel = require("../model/signUp.js");
const app = express.Router();
const bodyParser = require('body-parser');

app.use(express.json());

//  // parse application/json
app.use(bodyParser.json());



module.exports = { 
    signUp_get: async (req , res) => {
        // const response = await SignUpModel.find({}, 'userName mobileNo password');
        res.render("signUp" )    //, {chatData : response}
    },


    signUp_post : async (req, res) => {
        console.log("signUp_post method started");

        let newSignUpUser = new SignUpModel({
            userName: req.body.userName,
            mobileNo: req.body.mobileNo,
            password: req.body.password,
            
        });
        const request = req.body;
        console.log("request is" , request);
        
        try {
                const savedSignUpUser = await newSignUpUser.save();
                console.log("savedSignUpUser is", savedSignUpUser);
                res.send({ status: 200, msg: 'post: /add-user  works', chatObj: savedSignUpUser });
                res.redirect("/login");
            } catch (err) 
                 {
                    console.log("error");
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


































// add_user: async (req, res) => {
//     console.log("request is ", req);
//     let newChatUser = new ChatModel({
//         userName: req.body.userName,
//         mobileNo: req.body.mobileNo,
//         text: req.body.text,
//         timestamp: req.body.timestamp,
//         // age: req.body.age
//     });

//     try {
//         const savedChatUser = await newChatUser.save();
//         res.send({ status: 200, msg: 'post: /add-user  works', chatObj: savedChatUser });
//     } catch (err) {
//         res.status(500).send(err);
//     }
// }, 