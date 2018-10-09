var express = require("express");
var app = express();

// Use files from the "public" folder 
app.use(express.static("public"));

// Tell the files to be rendered are going to be .ejs files, no need to write the type later
app.set("view engine", "ejs");

//  Serve a file to the request with res.render, the file has to be in 'views' folder
app.get("/", function(req, res){
    res.render("home");
});

app.get("/testingthing/:thing", function(req, res){
    var thing = req.params.thing;
    // Passing the 'var thing' to test.ejs in the curly braces
    res.render("test", {thingVar: thing});
});

app.get("/posts", function(req, res){
   var posts = [
       {title: "Post 1", author: "Writer"},
       {title: "Second post", author: "Writer"},
       {title: "Last post", author: "Ghost Writer"},
       ];
    res.render("posts", {posts: posts});
       
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server is listening.");
});