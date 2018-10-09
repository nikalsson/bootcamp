// Load express module to NodeJS
var express = require('express');
var app = express();
// Load body-parser module, needed to extract data from form to add campgrounds
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// Set view engine to ejs, no need to write the file names later
app.set("view engine", "ejs");

// Set up a landing page
app.get("/", function(req, res){
    res.render("landing");
});

// Temporary array of campgrounds
var campgrounds = [
        {name: "Salmon Creek", image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
        {name: "Granite Hill", image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
        {name: "Mountain Goat's Rest", image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg" },
    ];

app.get("/campgrounds", function(req, res){
    // route to campgrounds page, pass array campgrounds to campgrounds.ejs
    res.render("campgrounds", {campgrounds: campgrounds});    
});

// Page to input new campgrounds
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

// Post new campgrounds from the form to the campgrounds page
app.post("/campgrounds", function(req, res){
    // Get the inputs named 'name' and 'image' from the form
    var name = req.body.name;
    var image = req.body.image;
    // Create an object of the inputs and push them to the array, redirect to the /campgrounds route
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

// Starts a UNIX socket and listens for connections on the specified host and port.  
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started.");
}); 