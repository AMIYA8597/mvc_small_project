const express = require('express');
const router = express.Router();
const Chat = require("../model/chat.js");
const ChatController = require("../controller/chatController.js");
const SignUpController = require("../controller/signUpController.js");
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false})) //Post Body Parser

router.get( '/', (req,res) => {
  // res.send("welcome to Chat Application page")
  res.render("index")
})

// router.get("/get_all_users", ChatController.get_users)

// router.post('/add-user', ChatController.add_user);

router.get("/register", SignUpController.signUp_get)

router.post("/register", SignUpController.signUp_post)

router.get("/login", SignUpController.login_get)

router.post("/login", SignUpController.login_post)


// router.get( '/getUserByName', ChatController.get_user_by_name );

module.exports = router;