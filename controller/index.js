const express = require('express')
const router = express.Router();
const ejsMate = require("ejs-mate");
const app = express();

const path = require("path");

// const { TodoList } require ("../view/start.js")
// import { TodoList } from ("../view/start.js")

// app.set("views", join(__dirname, "views"));
// app.set("view engine", "ejs");

app.set("view engine", "ejs");
app.set("views", path.join("/Users/webskitters/Desktop/mvc_small_project", "views"));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// app.engine("ejs", ejsMate);


app.get('/', function (req, res) {
    res.send('Hello, i am starting new mvc project')
})

app.get('/app', function (req, res) {
    res.render("index")
})

// app.get('/demo', function (req, res) {
//     res.send("this is demo page")

//     // res.render("/views/index", {});
// })
 
 app.listen(5002, (req, res) => {
    console.log("server is running on port 5002");
  });

