const express = require('express');
const app = express.Router();
const randomstring = require('randomstring');
const bcrypt = require('bcrypt');
// const UserChatModel =require ("../model/UserChat.js");
const SignUpModel = require("../model/signUp.js");

const bodyParser = require('body-parser');

app.use(express.json());

//  // parse application/json
app.use(bodyParser.json());


module.exports = {

    createChat_get: async (req , res) => {
        // res.render("userChat" ) 

        console.log("createChat_get starting");
        
    },
    

    createChat_post : async (req, res ) => {
        console.log("createChat_post method started");
        // const newChat = new  UserChatModel({          
        const newChat = new  SignUpModel({          
            members: [req.body.senderId, req.body.receiverId],
        });

        try {
            const chatUser = await newChat.save();
                console.log("chatUser is", chatUser);
        } catch (error) {
            console.log("error");
        }
      
    },
 }


























//  app.get('/dashboard', async (req, res) => {
//     if (req.session.userId) {
//         const user = await User.findById(req.session.userId);
//         const allUsers = await User.find().select('username mobileNumber');
//         res.render('pages/dashboard', { user, allUsers });
//     } else {
//         res.redirect('/signin');
//     }
// });







//  try {
//     // Assuming you have user data stored in req.user after authentication
//     // const userId = req.user; // Get the user ID from the authenticated user

//     // const {userName, mobileNo} = req.params;
//     const userId = req.user._id;
//     console.log("userId is" , userId);
// //     if (!userName || !mobileNo){
// //         return res.status(401).send({error : "Please provide all details!"});
// //     }

// //     let existingUser = await SignUpModel.findOne({'userName': userName,'mobileNo': mobileNo}) ;
// //     if(!existingUser){
        
// //         var newUser = new SignUpModel ({
// //             'userName' : userName,
// //             'password' : randomstring.generate(),
// //             'mobileNo' : mobileNo
// //         });

// //         newUser.save((err)=>{
// //             if(err) throw err;
// //             else{
                
// //                 console.log(`New User created with username ${newUser.userName}`);
// //                 res.redirect('/chat?username='+encodeURIComponent(userName)+'&number='+ encodeURIComponent(mobileNo));
// //             }
// //         })
// //         res.send(newUser);
// //     }else{
// //         console.log('User already exists');
// //         res.send(existingUser);
// //     }  
// // } catch (e) {
// //     console.log(e);
// //     res.status(500).send();
// // } 
//     // console.log("user name is",userName);
//     // console.log("user mobileNo is",mobileNo);
    

// //     let usersData= await SignUpModel.find({});
// //     // console.log(usersData);
// //     var userList=[];
// //     for(let i of usersData){
// //         if(i.id != userId && !userList.includes(i)){
// //            userList.push(i);
// //         }
// //     };
// //    // console.log(userList);
// //     return res.status(200).send(userList);
// // } catch (err) {
// //     console.error(err.message);
// //     return res.status(500).send("Server error");
// // }
    
//     // Fetch the user data from the database based on the user ID
//     const user = await User.findById(userId).select('username mobileNumber');
// console.log();
//     if (!user) {
//         return res.status(404).send('User not found');
//     }

//     // Render the chatuser.ejs template and pass the user data
//     res.render('userChat', { user }); // Pass the user data to userChat.ejs
// } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
// }   







// _id : randomstring.generate(),
            // username : req.body.username ,
            // useremail : req.body.useremail ,
            // userpassword : await bcrypt.hashSync(req.body.userpassword,10),
            // chatmessage : []


  // newChat.save((err, doc) => {
        //     if (!err){
        //         console.log("chat saved to the database")
        //         return res.send(doc);
        //     }else{
        //         console.log("error in saving chat to the database", err);
        //     }
        // })