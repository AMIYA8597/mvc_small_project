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
        const {userName, mobileNo, password } = req.body
        console.log("userName is ", userName);
        console.log("mobileNo is ", mobileNo);
        console.log("password is ", password);

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
                // res.send({ status: 200, msg: 'post: /register  works', chatObj: savedSignUpUser });
                res.redirect("/login");
                console.log("everything Working");
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
        try {
    
            const signUser = await SignUpModel.findOne({mobileNo})
            
            if(!signUser) {
                res.render("login")
            }

            if(signUser.password !==password) {
                res.render("login")
            }

            res.redirect("/after")
    
        }   catch (error) {
                console.log("you need to checkup your mobileNumber and password correctly");
            }
    },

    after_get : async (req, res) => {
        res.render("after")
    },


}



















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







// login_post: async (req, res) => {
//     const { mobileNo, password } = req.body;

//     try {
//         // Find the user with the provided mobile number
//         const user = await SignUpModel.findOne({ mobileNo });

//         if (!user) {
//             // User not found, redirect back to login page with an error message
//             return res.render("login", { error: "Invalid mobile number or password" });
//         }

//         // Check if the provided password matches the stored password
//         if (user.password !== password) {
//             // Passwords do not match, redirect back to login page with an error message
//             return res.render("login", { error: "Invalid mobile number or password" });
//         }

//         // Passwords match, authentication successful, redirect to homepage or dashboard
//         res.redirect("/");
//     } catch (error) {
//         // Handle any errors that occur during login process
//         console.error("Login error:", error);
//         res.status(500).send("Internal Server Error");
//     }
// }






// login_get: async (req, res) => {
//     res.render("login");
// },

// login_post: async (req, res) => {
//     const { mobileNo, password } = req.body;

//     try {
//         // Find the user with the provided mobile number
//         const user = await SignUpModel.findOne({ mobileNo });

//         if (!user) {
//             // User not found, redirect back to login page with an error message
//             return res.render("login", { error: "Invalid mobile number or password" });
//         }

//         // Check if the provided password matches the hashed password in the database
//         const passwordMatch = await bcrypt.compare(password, user.password);

//         if (!passwordMatch) {
//             // Passwords do not match, redirect back to login page with an error message
//             return res.render("login", { error: "Invalid mobile number or password" });
//         }

//         // Passwords match, authentication successful, redirect to homepage or dashboard
//         res.redirect("/");
//     } catch (error) {
//         // Handle any errors that occur during login process
//         console.error("Login error:", error);
//         res.status(500).send("Internal Server Error");
//     }
// }








// login_post: async (req, res) => {
//     const { mobileNo, password } = req.body;

//     try {
//         // Find the user with the provided mobile number
//         const user = await SignUpModel.findOne({ mobileNo });

//         if (!user) {
//             // User not found, redirect back to login page with an error message
//             return res.render("login", { error: "Invalid mobile number or password" });
//         }

//         // Check if the provided password matches the stored password
//         if (user.password !== password) {
//             // Passwords do not match, redirect back to login page with an error message
//             return res.render("login", { error: "Invalid mobile number or password" });
//         }

//         // Passwords match, authentication successful, redirect to homepage or dashboard
//         res.redirect("/");
//     } catch (error) {
//         // Handle any errors that occur during login process
//         console.error("Login error:", error);
//         res.status(500).send("Internal Server Error");
//     }
// }



// how to write maximum length and minimum length in mongoose schema





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