const express = require('express');
const session = require('express-session')
const app = express.Router();
const randomstring = require('randomstring');
const bcrypt = require('bcrypt');
const mobileRegex = /^[0-9]{10}$/;
const http = require('http');
const socketIo = require('socket.io');
const SignUpModel = require("../model/signUp.js");
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
        if (password.length < 6) {
            res.send("password need min 6 character")
            return;
        }

        if (!mobileRegex.test(mobileNo)) {
            res.send("Invalid Mobile Number");
            return;
        }

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

        if (password.length < 6) {
            res.send("password need min 6 character")
            return;
        }

        if (!mobileRegex.test(mobileNo)) {
            res.send("Invalid Mobile Number");
            return;
        }
        
        try {
    
                const signUser = await SignUpModel.findOne({mobileNo})
                
                if(!signUser) {
                    res.render("login", {error: "invalid mobileNumber or password"} )
                }

                if(signUser.password !==password) {
                    res.render("login", {error: "invalid mobileNumber or password"} )
                }
                // req.session.userId = signUser._id
                // // res.redirect("/after")

                req.session.userId = signUser._id;
                res.redirect("/chat")
    
            }        catch (error)
                {
                    console.log("you need to checkup your mobileNumber and password correctly");
                }
    },

    createChat_get : async (req , res) => {

        try {
            const loggedInUser = await SignUpModel.findOne({ _id: req.session.userId });
            
            if (!loggedInUser) {
                res.redirect("/login");
                return;
            }
    
            res.render("userChat", { userName: loggedInUser.userName, mobileNo: loggedInUser.mobileNo });
        } catch (error) {
            console.error("Error retrieving user information:", error);
            res.redirect("/login"); 
        }
           
    },

    // createChat_post :  async (req ,res)=>{
        
    //     let senderId=req.body.senderId ;
    //     let receiverId=req.body.receiverId;
    //     let message=req.body.message;
      
    //     var today = new Date();
    //     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
     
    //     // Create a new Chat object from the received data
    //     const newMessage = new MessageModel(
    //       {     senderId : senderId ,
    //            receiverId : receiverId ,
    //            message   : message ,
    //            timestamp : `${time}`,
    //        }
    //     );
        
    //     try {
    //           // Save the new Chat into the database
    //           const result = await newMessage.save();
            
    //           // Send back the created Chat as response 
    //           res.json(result);
    //     }catch(err){
    //         console.log('Error Creating New Message');
    //         res.status(400).send(err);
    //     }
    // },
   
        // // here search query is only mobile number included
        
    searchUser : async (req, res) => {

        console.log("search user started");

            try {
                const { searchQuery } = req.body; 

                console.log("searchQuery is",searchQuery);
                
                const foundUser = await SignUpModel.findOne({
                    $or: [
                        { userName: searchQuery },
                        { mobileNo: searchQuery }
                    ]
                });

                console.log("foundUser is  ",foundUser);
                
                if (!foundUser) {
                    res.status(404).json({ message: "User not found" });
                    return;
                }
                
               
                if (foundUser) {
                    res.status(200).json({
                        userName: foundUser.userName,
                        mobileNo: foundUser.mobileNo,
                        // Add other necessary user information
                    });
                } else {
              
                    res.status(400).json({ message: "User sign-in process not completed" });
                }
                
            } catch (error) {
                console.error("Error searching for user:", error);
                res.status(500).json({ message: "don`t give me error" });
                // res.status(500).json({ message: "Internal server error" });
            }
    },

   //     // here search query is username and  password both
    // searchUser: async (req, res) => {

    //     console.log("search user started");

    //     try {
    //         const { searchQuery } = req.body; 
            
    //         console.log("searchQuery is",searchQuery);

    //         const isMobileNumber = !isNaN(searchQuery); 
    //         console.log("isMobileNumber is ", isMobileNumber);
    
    //         let foundUser;
    //         if (isMobileNumber) {
    
    //             foundUser = await SignUpModel.findOne({ mobileNo: searchQuery });

    //         } else {
                
    //             foundUser = await SignUpModel.findOne({ userName: searchQuery });
    //         }
            
    //         if (!foundUser) {
                
    //             res.status(404).json({ message: "User not found" });
    //             return;
    //         }
            
    //         if (foundUser) {
    //             res.status(200).json({
    //                 userName: foundUser.userName,
    //                 mobileNo: foundUser.mobileNo, 
    //             });

    //         } else {
    //             res.status(400).json({ message: "User sign-in process not completed" });
    //         }
    //     } catch (error) {
    //         console.error("Error searching for user:", error);
    //         res.status(500).json({ message: "Internal server error" });
    //     }
    // },

    getMessages : async (req,res)=> {
        let chatId = req.params.chatId;
        if (!ObjectID.isValid(chatId))
            return res.status(404).send("No such chat exists!");
        else {
            // Retrieve and return the chat messages for this chat id from the DB   
            Messages.find({"chatId": chatId},'timestamp senderId receiverId message')
                .sort([['timestamp', 'ascending ']])
                .exec((err,messages) => {
                    if(!err) {
                        res.status(200).json(messages);
                    }else{
                        console.error(err);
                        res.status(500  ).send("Server error");
                        }
                });
        }
    },

    after_get : async (req, res) => {
        res.render("after")
    },

    forget_get : async (req, res) => {
        res.render("forgetPass")
    },

    forget_post : async (req,res) => {
        console.log("forgot password is starting");
        const { mobileNo , newPassword} = req.body;

        if (newPassword.length < 6) {
            // return res.render("login", { error: "Password must be at least 8 characters long" });
            res.send("password need min 6 character")
            return;
        }

        if (!mobileRegex.test(mobileNo)) {
            res.send("Invalid Mobile Number");
            return;
        }

        try {
            const forgetUser = await SignUpModel.findOne({mobileNo});

            if(!forgetUser){
                res.render("forgetpass")
                // alert( "This user does not exist! Please enter correct details.")              
            };
            
            forgetUser.password=newPassword;
            await forgetUser.save();
            res.redirect("login" )
            
        }  catch(err){
            console.log(err);
        }
        
        // res.redirect("/login");
    },

    home_get : async (req, res) => {
        res.render("home")
    },
    
}

































// exports.createChat_get = async (req, res) => {
//     try {
//         // Retrieve the logged-in user's information
//         const loggedInUser = await SignUpModel.findOne({ _id: req.session.userId });
        
//         if (!loggedInUser) {
//             // If user not found, redirect to login page
//             res.redirect("/login");
//             return;
//         }

//         // Render the create chat page with user information
//         res.render("userChat", { userName: loggedInUser.userName, mobileNo: loggedInUser.mobileNo });
//     } catch (error) {
//         console.error("Error retrieving user information:", error);
//         res.redirect("/login"); // Redirect to login page in case of any error
//     }
// };

// exports.createChat_post = async (req, res) => {
//     let senderId = req.body.senderId;
//     let receiverId = req.body.receiverId;
//     let message = req.body.message;
  
//     var today = new Date();
//     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
 
//     // Create a new Chat object from the received data
//     const newMessage = new MessageModel({
//         senderId: senderId,
//         receiverId: receiverId,
//         message: message,
//         timestamp: `${time}`,
//     });
    
//     try {
//         // Save the new Chat into the database
//         const result = await newMessage.save();
      
//         // Send back the created Chat as response 
//         res.json(result);
//     } catch (err) {
//         console.log('Error Creating New Message');
//         res.status(400).send(err);
//     }
// };

// exports.getMessages = async (req, res) => {
//     let chatId = req.params.chatId;
//     if (!ObjectID.isValid(chatId))
//         return res.status(404).send("No such chat exists!");
//     else {
//         // Retrieve and return the chat messages for this chat id from the DB   
//         Messages.find({ "chatId": chatId }, 'timestamp senderId receiverId message')
//             .sort([['timestamp', 'ascending ']])
//             .exec((err, messages) => {
//                 if (!err) {
//                     res.status(200).json(messages);
//                 } else {
//                     console.error(err);
//                     res.status(500).send("Server error");
//                 }
//             });
//     }
// };

// exports.searchUser = async (req, res) => {
//     try {
//         const { searchQuery } = req.body; // Assuming the search query is sent in the request body
        
//         // Search for the user by username or mobile number
//         const foundUser = await SignUpModel.findOne({
//             $or: [
//                 { userName: searchQuery },
//                 { mobileNo: searchQuery }
//             ]
//         });
        
//         if (!foundUser) {
//             // If user not found, return a message indicating so
//             res.status(404).json({ message: "User not found" });
//             return;
//         }
        
//         // Check if user's sign-in process is completed
//         if (foundUser.signInCompleted) {
//             // If sign-in process completed, return user information
//             res.status(200).json({
//                 userName: foundUser.userName,
//                 mobileNo: foundUser.mobileNo,
//                 // Add other necessary user information
//             });
//         } else {
//             // If sign-in process not completed, return a message indicating so
//             res.status(400).json({ message: "User sign-in process not completed" });
//         }
//     } catch (error) {
//         console.error("Error searching for user:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };













    // searchUser: async (req, res) => {
        
    //     console.log("search user started");
    //     try {
    //         const { searchQuery } = req.body; // Assuming the search query is sent in the request body
    //         console.log("searchQuery is ", searchQuery);
            
    //         // Search for the user by username or mobile number
            
    //         const foundUser = await SignUpModel.findOne({
    //             $or: [
    //                 { userName: searchQuery },
    //                 { mobileNo: searchQuery }
    //             ]
    //         });
    //         console.log("foundUser is  ", foundUser);
            
            
    //         if (!foundUser) {
    //             // If user not found, return a message indicating so
    //             res.status(404).json({ message: "User not found" });
    //             return;
    //         }
            
    //         // Check if user's sign-in process is completed
    //         if (foundUser.signInCompleted) {
    //             // If sign-in process completed, return user information
    //             res.status(200).json({
    //                 userName: foundUser.userName,
    //                 mobileNo: foundUser.mobileNo,
    //             });
    //         } else {
    //             // If sign-in process not completed, return a message indicating so
    //             res.status(400).json({ message: "User sign-in process not completed" });
    //         }
    //     } catch (error) {
    //         console.error("Error searching for user:", error);
    //         res.status(500).json({ message: "Internal server error" });
    //     }
    // },
    
    // searchUser: async (req, res) => {
    //     try {
    //         const { searchQuery } = req.body;
    
    //         // Check if searchQuery is a number (mobile number) or a string (username)
    //         const isMobileNumber = !isNaN(searchQuery); // Check if it's a number
    
    //         let foundUser;
    //         if (isMobileNumber) {
    //             foundUser = await SignUpModel.findOne({ mobileNo: searchQuery });
    //         } else {
    //             foundUser = await SignUpModel.findOne({ userName: searchQuery });
    //         }
    
    //         if (!foundUser) {
    //             res.status(404).json({ message: "User not found" });
    //             return;
    //         }
    
    //         if (foundUser.signInCompleted) {
    //             res.status(200).json({
    //                 userName: foundUser.userName,
    //                 mobileNo: foundUser.mobileNo,
    //                 // Add other necessary user information
    //             });
    //         } else {
    //             res.status(400).json({ message: "User sign-in process not completed" });
    //         }
    //     } catch (error) {
    //         console.error("Error searching for user:", error);
    //         res.status(500).json({ message: "Internal server error" });
    //     }
    // },









// createChat_get = async (req, res) => {
//     try {
//         // Retrieve the logged-in user's information
//         const loggedInUser = await SignUpModel.findOne({ _id: req.session.userId });
        
//         if (!loggedInUser) {
//             // If user not found, redirect to login page
//             res.redirect("/login");
//             return;
//         }

//         // Render the create chat page with user information
//         res.render("userChat", { userName: loggedInUser.userName, mobileNo: loggedInUser.mobileNo });
//     } catch (error) {
//         console.error("Error retrieving user information:", error);
//         res.redirect("/login"); // Redirect to login page in case of any error
//     }
// };

// exports.createChat_post = async (req, res) => {
//     let senderId = req.body.senderId;
//     let receiverId = req.body.receiverId;
//     let message = req.body.message;
  
//     var today = new Date();
//     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
 
//     // Create a new Chat object from the received data
//     const newMessage = new MessageModel({
//         senderId: senderId,
//         receiverId: receiverId,
//         message: message,
//         timestamp: `${time}`,
//     });
    
//     try {
//         // Save the new Chat into the database
//         const result = await newMessage.save();
      
//         // Send back the created Chat as response 
//         res.json(result);
//     } catch (err) {
//         console.log('Error Creating New Message');
//         res.status(400).send(err);
//     }
// };

// exports.getMessages = async (req, res) => {
//     let chatId = req.params.chatId;
//     if (!ObjectID.isValid(chatId))
//         return res.status(404).send("No such chat exists!");
//     else {
//         // Retrieve and return the chat messages for this chat id from the DB   
//         Messages.find({ "chatId": chatId }, 'timestamp senderId receiverId message')
//             .sort([['timestamp', 'ascending ']])
//             .exec((err, messages) => {
//                 if (!err) {
//                     res.status(200).json(messages);
//                 } else {
//                     console.error(err);
//                     res.status(500).send("Server error");
//                 }
//             });
//     }
// };

// exports.searchUser = async (req, res) => {
//     try {
//         const { searchQuery } = req.body; // Assuming the search query is sent in the request body
        
//         // Search for the user by username or mobile number
//         const foundUser = await SignUpModel.findOne({
//             $or: [
//                 { userName: searchQuery },
//                 { mobileNo: searchQuery }
//             ]
//         });
        
//         if (!foundUser) {
//             // If user not found, return a message indicating so
//             res.status(404).json({ message: "User not found" });
//             return;
//         }
        
//         // Check if user's sign-in process is completed
//         if (foundUser.signInCompleted) {
//             // If sign-in process completed, return user information
//             res.status(200).json({
//                 userName: foundUser.userName,
//                 mobileNo: foundUser.mobileNo,
//                 // Add other necessary user information
//             });
//         } else {
//             // If sign-in process not completed, return a message indicating so
//             res.status(400).json({ message: "User sign-in process not completed" });
//         }
//     } catch (error) {
//         console.error("Error searching for user:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

















// exports.createChat_get = async (req, res) => {
//     try {
//         // Retrieve the logged-in user's information
//         const loggedInUser = await SignUpModel.findOne({ _id: req.session.userId });
        
//         if (!loggedInUser) {
//             // If user not found, redirect to login page
//             res.redirect("/login");
//             return;
//         }

//         // Render the create chat page with user information
//         res.render("userChat", { userName: loggedInUser.userName, mobileNo: loggedInUser.mobileNo });
//     } catch (error) {
//         console.error("Error retrieving user information:", error);
//         res.redirect("/login"); // Redirect to login page in case of any error
//     }
// };

// exports.searchUser = async (req, res) => {
//     try {
//         const { searchQuery } = req.body;

//         // Search for the user by username or mobile number
//         const foundUser = await SignUpModel.findOne({
//             $or: [
//                 { userName: searchQuery },
//                 { mobileNo: searchQuery }
//             ]
//         });

//         if (!foundUser) {
//             // If user not found, return a message indicating so
//             res.status(404).json({ message: "User not found" });
//             return;
//         }

//         // Check if user's sign-in process is completed
//         if (foundUser.signInCompleted) {
//             // If sign-in process completed, return user information
//             res.status(200).json({
//                 userName: foundUser.userName,
//                 mobileNo: foundUser.mobileNo,
//                 // Add other necessary user information
//             });
//         } else {
//             // If sign-in process not completed, return a message indicating so
//             res.status(400).json({ message: "User sign-in process not completed" });
//         }
//     } catch (error) {
//         console.error("Error searching for user:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };












//     createChat_post : async (req ,res)=>{ 
        
//        let recieverMobileNo=req.body.recieverMobileNo;
//        let senderId=req.session.userId;
//        let message=req.body.message;
//        let newChat=new Chats ({senderId:senderId , recieverMobileNo:recieverMobileNo , message:message});
//        await newChat.save();
//        res.json(await Chats.find({"senderId":senderId,"recieverMobileNo":recieverMobileNo}).sort('-createdAt'));
//        res.json(await Chats.find({"senderId":senderId,"recieverMobileNo":recieverMobileNo}).sort('-createdAt'));
//        res.json(await Chats.findById(newChat._id));//send back the saved data as a json response
//    },



















// searchUser: async (req, res) => {
//     try {
//         const { searchQuery } = req.body; // Assuming the search query is sent in the request body

//         // Search for the user by username or mobile number
//         const foundUser = await SignUpModel.findOne({
//             $or: [
//                 { userName: searchQuery },
//                 { mobileNo: searchQuery }
//             ]
//         });

//         if (!foundUser) {
//             // If user not found, return a message indicating so
//             res.status(404).json({ message: "User not found" });
//             return;
//         }

//         // Check if user's sign-in process is completed
//         if (foundUser.signInCompleted) {
//             // If sign-in process completed, return user information
//             res.status(200).json({
//                 userName: foundUser.userName,
//                 mobileNo: foundUser.mobileNo,
//                 // Add other necessary user information
//             });
//         } else {
//             // If sign-in process not completed, return a message indicating so
//             res.status(400).json({ message: "User sign-in process not completed" });
//         }
//     } catch (error) {
//         console.error("Error searching for user:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }



















    // signUp_get: async (req, res) => {
    //     res.render("signUp");
    // },

    // signUp_post: async (req, res) => {
    //     console.log("signUp_post method started");
    //     const { userName, mobileNo, password } = req.body;
        
    //     if (password.length < 6) {
    //         res.send("Password needs to be at least 6 characters long");
    //         return;
    //     }

    //     if (!mobileRegex.test(mobileNo)) {
    //         res.send("Invalid Mobile Number");
    //         return;
    //     }

    //     try {
    //         const newSignUpUser = new SignUpModel({
    //             userName: userName,
    //             mobileNo: mobileNo,
    //             password: password
    //         });

    //         const savedSignUpUser = await newSignUpUser.save();
    //         console.log("savedSignUpUser is", savedSignUpUser);
    //         res.redirect("/login");
    //     } catch (err) {
    //         console.log("Error:", err);
    //         res.status(500).send("Error occurred while signing up");
    //     }
    // },

    // login_get: async (req, res) => {
    //     res.render("login");
    // },

    // login_post: async (req, res) => {
    //     const { mobileNo, password } = req.body;

    //     if (password.length < 6) {
    //         res.send("Password needs to be at least 6 characters long");
    //         return;
    //     }

    //     if (!mobileRegex.test(mobileNo)) {
    //         res.send("Invalid Mobile Number");
    //         return;
    //     }
        
    //     try {
    //         const signUser = await SignUpModel.findOne({ mobileNo });
            
    //         if (!signUser || signUser.password !== password) {
    //             res.render("login", { error: "Invalid mobile number or password" });
    //             return;
    //         }
            
    //         req.session.userId = signUser._id;
    //         res.redirect("/chat");
    //     } catch (error) {
    //         console.log("Error:", error);
    //         res.status(500).send("Error occurred while logging in");
    //     }
    // },

    // createChat_get: async (req, res) => {
    //     try {
    //         const loggedInUser = await SignUpModel.findById(req.session.userId);
            
    //         if (!loggedInUser) {
    //             res.redirect("/login");
    //             return;
    //         }
    
    //         res.render("userChat", { userName: loggedInUser.userName, mobileNo: loggedInUser.mobileNo });
    //     } catch (error) {
    //         console.error("Error retrieving user information:", error);
    //         res.redirect("/login");
    //     }
    // },




















            // res.render("userChat" ) 
        // const { userName , mobileNo} = req.body;

        // console.log("username and mobile number is",userName , mobileNo);

    
        // // console.log("createChat_get starting");

        // // // res.send( "createChat_get starting "  )

        // // res.render("userChat")

        // try {
        //     // const response = await SignUpModel.findOne({ mobileNo: 9876564578 });

        //     // const response = await SignUpModel.find({}, 'userName mobileNo ').sort({ createdAt: -1 }).limit(1);
        //     const response = await SignUpModel.findOne({}, 'userName mobileNo').sort({ createdAt: -1 });

        //      // Assuming createdAt field indicates the order of creation
        //     // console.log("response is ", response);
            
        //     res.render("userChat", { chatData: response } );

        // } catch (err) {
        //     res.status(500).send(err);
        // }







        // try {
        //     if (req.session.userId) {
        //         const user = await SignUpModel.findById(req.session.userId);
        //         if (user) {
        //             // Render the userChat view with user data
        //             res.render('userChat', { mobileNumber: user.mobileNo, username: user.userName });
        //         } else {
        //             res.send("User not found");
        //         }
        //     } else {
        //         res.redirect('/login');
        //     }
        // } 

        // catch (error) {
        //     console.log("Error retrieving user information:", error);
        //     res.status(500).send("Internal Server Error");
        // }


        // try {
        //     if (req.session.userId) {
        //         const user = await SignUpModel.findById(req.session.userId);
        //         if (user) {
        //             // Render the userChat view with user data
        //             res.render('userChat', { mobileNumber: user.mobileNo, username: user.username });
        //         } else {
        //             res.send("User not found");
        //         }
        //     } else {
        //         res.redirect('/login');
        //     }
        // }

        // catch (error) {
        //     console.log("Error retrieving user information:", error);
        //     res.status(500).send("Internal Server Error");
        // }


























// signUp_get: async (req, res) => {
//     res.render("signUp");
// },

// signUp_post: async (req, res) => {
//     console.log("signUp_post method started");
//     const { userName, mobileNo, password } = req.body;
    
//     if (password.length < 6) {
//         res.send("Password needs to be at least 6 characters long");
//         return;
//     }

//     if (!mobileRegex.test(mobileNo)) {
//         res.send("Invalid Mobile Number");
//         return;
//     }

//     try {
//         const newSignUpUser = new SignUpModel({
//             userName: userName,
//             mobileNo: mobileNo,
//             password: password
//         });

//         const savedSignUpUser = await newSignUpUser.save();
//         console.log("savedSignUpUser is", savedSignUpUser);
//         res.redirect("/login");
//     } catch (err) {
//         console.log("Error:", err);
//         res.status(500).send("Error occurred while signing up");
//     }
// },

// login_get: async (req, res) => {
//     res.render("login");
// },

// login_post: async (req, res) => {
//     const { mobileNo, password } = req.body;

//     if (password.length < 6) {
//         res.send("Password needs to be at least 6 characters long");
//         return;
//     }

//     if (!mobileRegex.test(mobileNo)) {
//         res.send("Invalid Mobile Number");
//         return;
//     }
    
//     try {
//         const signUser = await SignUpModel.findOne({ mobileNo });
        
//         if (!signUser || signUser.password !== password) {
//             res.render("login", { error: "Invalid mobile number or password" });
//             return;
//         }
        
//         req.session.userId = signUser._id;
//         res.redirect("/chat");
//     } catch (error) {
//         console.log("Error:", error);
//         res.status(500).send("Error occurred while logging in");
//     }
// },

// createChat_get: async (req, res) => {
//     try {
//         const loggedInUser = await SignUpModel.findById(req.session.userId);
        
//         if (!loggedInUser) {
//             res.redirect("/login");
//             return;
//         }

//         res.render("createChat", { userName: loggedInUser.userName, mobileNo: loggedInUser.mobileNo });
//     } catch (error) {
//         console.error("Error retrieving user information:", error);
//         res.redirect("/login");
//     }
// }



// try {
//     // Retrieve the logged-in user's information
//     const loggedInUser = await SignUpModel.findOne({ _id: req.session.userId });
    
//     if (!loggedInUser) {
//         // If user not found, redirect to login page
//         res.redirect("/login");
//         return;
//     }

//     // Render the create chat page with user information
//     res.render("createChat", { userName: loggedInUser.userName, mobileNo: loggedInUser.mobileNo });
// } catch (error) {
//     console.error("Error retrieving user information:", error);
//     res.redirect("/login"); // Redirect to login page in case of any error
// }





















//   //  ,{success:"your password has been changed successfully!"}


//             }else{
//                let updateUser=await SignUpModel.updateOne({mobileNo},{$set:{password:newPassword}})  
//                if(updateUser){
//                   res.render('index',{success:"Your Password has been changed Successfully!"})
//                }
//            }                  
            
//         }catch(err) {console.log(err)}
        
//     }
// };






















// try {
//     // Assuming you are using session middleware to store user ID
//     const userId = req.session.userId;
//     if (!userId) {
//         res.redirect('/login'); // Redirect if user is not logged in
//         return;
//     }

//     const user = await SignUpModel.findById(userId);
//     if (!user) {
//         res.send("User not found");
//         return;
//     }

//     // Render userProfile.ejs view with user data
//     res.render('userProfile', { mobileNumber: user.mobileNo, username: user.userName });
// } catch (error) {
//     console.log("Error retrieving user information:", error);
//     res.status(500).send("Internal Server Error");
// }















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
//             return res.render("login", { error: "Invalid mobile number or password" } );
//         }

//         // Check if the provided password matches the stored password
//         if (user.password !== password) {
//             // Passwords do not match, redirect back to login page with an error message
//             return res.render("login", { error: "Invalid mobile number or password" } );
//         }

//         // Passwords match, authentication successful, redirect to homepage or dashboard
//         res.redirect("/");
//     } catch (error) {
//         // Handle any errors that occur during login process
//         console.error("Login error:", error);
//         res.status(500).send("Internal Server Error");
//     }
// }









// const mobileRegex = /^[0-9]{10}$/;

// signUp_post: async (req, res) => {
//     console.log("signUp_post method started");
//     const { userName, mobileNo, password } = req.body;

//   //  // Validate password length
//     if (password.length < 6) {
//         res.send("Password must be at least 6 characters long");
//         return;
//     }

//   //  // Validate mobile number using regex
//     if (!mobileRegex.test(mobileNo)) {
//         res.send("Invalid Mobile Number");
//         return;
//     }

//     let newSignUpUser = new SignUpModel({
//         userName: req.body.userName,
//         mobileNo: req.body.mobileNo,
//         password: req.body.password,
//     });

//     try {
//         const savedSignUpUser = await newSignUpUser.save();
//         console.log("savedSignUpUser is", savedSignUpUser);
//         res.redirect("/login");
//         console.log("Everything is working");
//     } catch (err) {
//         console.log("Error:", err);
//         res.status(500).send("Internal Server Error");
//     }
// },












// login_post: async (req, res) => {
//     const { mobileNo, password } = req.body;

//     try {
//         // Validate mobile number format using regular expression
//         const mobileRegex = /^[0-9]{10}$/;
//         if (!mobileRegex.test(mobileNo)) {
//             return res.render("login", { error: "Invalid mobile number format" });
//         }

//         // Validate password length
//         if (password.length < 8) {
//             return res.render("login", { error: "Password must be at least 8 characters long" });
//         }

//         // Find the user with the provided mobile number
//         const user = await SignUpModel.findOne({ mobileNo });

//         if (!user || user.password !== password) {
//             // User not found or password doesn't match, render login page with error
//             return res.render("login", { error: "Invalid mobile number or password" });
//         }

//         // Redirect to the appropriate page after successful login
//         res.redirect("/after");
//     } catch (error) {
//         console.error("Login error:", error);
//         res.status(500).send("Internal Server Error");
//     }
// }













// forgotPassword_post: async (req, res) => {
//     console.log("forgot password is working");

//     const { mobileNo, newPassword } = req.body;

//     try {
//         // Find the user with the provided mobile number
//         const user = await SignUpModel.findOne({ mobileNo });

//         if (!user) {
//             // User not found, redirect back to login page with an error message
//             return res.render("login", { error: "User not found" });
//         }

//         // Update the user's password with the new password
//         user.password = newPassword;
//         await user.save();

//         // Password reset successful, redirect to the login page
//         res.redirect("/login");
//     } catch (error) {
//         // Handle any errors that occur during password reset process
//         console.error("Forgot password error:", error);
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

























