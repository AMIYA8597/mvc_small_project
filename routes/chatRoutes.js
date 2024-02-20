const express = require('express');
const app = express.Router();
const Chat = require("../model/chat.js");
const ChatController = require("../controller/chatController.js");
const SignUpController = require("../controller/signUpController.js");
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})) //Post Body Parser

app.get( '/', (req,res) => {
  // res.send("welcome to Chat Application page")
  res.render("index")
})

// app.get("/get_all_users", ChatController.get_users)

// app.post('/add-user', ChatController.add_user);

app.get("/register", SignUpController.signUp_get)

app.post("/register", SignUpController.signUp_post)

app.get("/login", SignUpController.login_get)

app.post("/login", SignUpController.login_post)


// app.get( '/getUserByName', ChatController.get_user_by_name );

module.exports = app;