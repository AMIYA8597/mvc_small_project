const express = require('express');
const session = require('express-session');
const app = express.Router();
const http = require('http');
const socketIo = require('socket.io');
const Chat = require("../model/chat.js");
const ChatController = require("../controller/chatController.js");
const SignUpController = require("../controller/signUpController.js");
const userChatController = require("../controller/userChatController.js");
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})) //Post Body Parser

app.use(session({
  secret: 'your-secret-key', // Change this to a random string
  resave: false,
  saveUninitialized: true
}));

app.get( '/', (req,res) => {
  res.render("index")
})

app.get("/register", SignUpController.signUp_get)

app.post("/register", SignUpController.signUp_post)

app.get("/login", SignUpController.login_get)

app.post("/login", SignUpController.login_post)

app.get("/after", SignUpController.after_get)

app.get("/forgetpass", SignUpController.forget_get)

app.post("/forgetpass", SignUpController.forget_post)

app.get("/home", SignUpController.home_get)

app.post("/search", SignUpController.searchUser)

app.get("/chat", SignUpController.createChat_get)

// app.post("/chat", SignUpController.createChat_post)

app.get('/messages/:chatId', SignUpController.getMessages);

// app.get("/chat", userChatController.createChat_get)
// app.post("/chat", userChatController.createChat_post)
//---------------------------Chatting Server------------------------------
//Chatting page
module.exports = app;
















// // GET route to render the create chat page
// router.get('/create-chat', createChat_get);

// // POST route to handle sending messages
// router.post('/create-chat', createChat_post);

// // GET route to retrieve messages for a specific chat
// router.get('/messages/:chatId', getMessages);

// // POST route to search for users
// router.post('/search-user', searchUser);


















// // 채팅방 만들기
// app.get('/createRoom/:roomName', isLoggedIn, userChatController.makeRoom);

// // 로그인한 유저의 메세지 보내기
// app.post('/sendMessage/:receiverId/:content', isLoggedIn, userChatController.sendMsg);

// // 다른사용자에게 친구요청하기
// app.post('/addFriendRequest/:userId/:friendId', isLoggedIn, friendController.addFriendReq);
