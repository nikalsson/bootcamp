var express = require('express');
var router  = express.Router();
var Campground = require('../models/campground');

// INDEX - show all campgrounds
router.get("/", function(req, res){
    // route to campgrounds page, get all the campgrounds from the DB. If error, print it, otherwise send them to campground.ejs
    Campground.find({}, function(err, allCampgrounds){
        if (err){
            console.log(err);
        } else {
            // render index.ejs - pass 'campgrounds' to it
            res.render("campgrounds/index", {campgrounds: allCampgrounds});  
        }
    });
    
});

// NEW - show form to create new campground
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

// CREATE - add new campground from the form to the campgrounds page
router.post("/", function(req, res){
    // Get the inputs named 'name' and 'image' from the form
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    // Create an object of the inputs and push them to the array, redirect to the /campgrounds route
    var newCampground = {name: name, image: image, description: desc,};
    // Create a new campground and save to the DB
    Campground.create(newCampground, function(err, newlyCreated){
        if (err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// SHOW - display one of the campgrounds in detail
router.get("/:id", function(req, res){
    // finds a campground with the provided ID, also populate with associated comments
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err){
            console.log(err);
        } else {
            // Render the show template with the found campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

module.exports = router;