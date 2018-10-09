var express = require("express");
var app = express();

// Going to the root page, on the page see "Hi there!"
app.get("/", function(req, res){
    res.send("Hi there!");
});

app.get("/bye", function(req, res){
    res.send("Goodbye!");
});

app.get("/dog", function(req, res){
    res.send("WOOF!");
});

// With : the route matches /routeparameters/: whatever one phrase follows it - not if /routeparameters/whatever/thisisnotincluded
app.get("/routeparameters/:whatever", function(req, res){
    // Change the name on res.send to the path user input
    var subPage = req.params.whatever;
    res.send("Welcome to the " + subPage.toUpperCase() + " subpage!");
});

// Only /routeparameters/ and /comments/ have to stay letter for letter
app.get ("/routeparameters/:subpage/comments/:id/:title", function(req, res){
   res.send("Welcome to a /comments/ page!") ;
});

// Any other page than ones defined above - NEED TO BE BELOW OTHERS
app.get("*", function(req, res){
    res.send("This page does not exist yet!");
});

// Tell express to listen for requests (start server) --- CLOUD 9 SPECIFIC process.env.PORT + IP
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started, press CTRL+C to quit.")
});
