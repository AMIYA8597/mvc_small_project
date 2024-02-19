const express = require('express');
const router = express.Router();
const Chat = require("../model/chat.js");
const ChatController = require("../controller/chatController.js");
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get( '/', (req,res) => {
  res.send("welcome to Chat Application page")
})

router.get("/get_all_users", ChatController.get_users)

router.post('/add-user', ChatController.add_user);

router.get("/signUp", ChatController.get_users)

router.get("/login", ChatController.get_users)


// router.get( '/getUserByName', ChatController.get_user_by_name );

module.exports = router;