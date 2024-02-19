const express = require('express');
const router = express.Router();
// const Todo = require("../model/todo.js");
// const StudentModel = require("../model/student.js")
// const StudentController = require("../controller/studentController.js");
const Chat = require("../model/chat.js");
const ChatController = require("../controller/chatController.js");
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get( '/', (req,res) => {
  res.send("welcome to Chat Application page")
})

router.get("/get_all_users", ChatController.get_users)



module.exports = router;