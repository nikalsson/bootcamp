var express = require("express");
var app = express();

// Root page
app.get("/", function(req, res){
    res.send("Welcome to my assignment!");
});

// speak animal pages
app.get("/speak/:animal/", function(req, res){
    // Make the incoming request lowercase
    var animal = req.params.animal.toLowerCase();
    var sounds = {
        pig : "OINK",
        cow : "MOO",
        dog : "WOOF WOOF"
    }
    var sound = sounds[animal]
    res.send("The " + animal +  " says '" + sound + "!'");
});

// Repeated response pages
app.get("/repeat/:response/:times", function(req, res){
    var response = req.params.response;
    var times = Number(req.params.times);
    var repeat = ""
    for (var i = 0; i < times; i++){
        repeat += response + " ";
    } 
    res.send(repeat);
});

// Any other page than ones defined above - NEED TO BE BELOW OTHERS
app.get("*", function(req, res){
    res.send("Sorry, page not found... What are you doing with your life?");
});


// Tell express to listen for requests (start server) --- CLOUD 9 SPECIFIC process.env.PORT + IP
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started, press CTRL+C to quit.")
});
