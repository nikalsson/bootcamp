var express = require("express");
var app = express();

// Define and use body-parser to extract data from the form on friends page
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// Tell the files to be rendered are going to be .ejs files, no need to write the type later
app.set("view engine", "ejs");

var friends = ['Keijo', 'Kyösti', 'Seppo', 'Sinikka', 'Hilma'];

app.get("/friends", function(req, res){
    res.render("friends", {friendsData: friends});
});

app.post("/addfriend", function(req, res){
    var newFriend = req.body.inputData;
    friends.push(newFriend);
    res.redirect("/friends");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server is listening.");
});