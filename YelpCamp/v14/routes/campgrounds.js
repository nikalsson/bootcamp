var express = require('express');
var router  = express.Router();
var Campground = require('../models/campground');
// Loading the middleware index.js - the index.js is loaded automatically from the folder
var middleware = require('../middleware/');

// INDEX - show all campgrounds
router.get("/", function(req, res){
    // route to campgrounds page, get all the campgrounds from the DB. If error, print it, otherwise send them to campground.ejs
    Campground.find({}, function(err, allCampgrounds){
        if (err){            
            req.flash('error', err.message);
        } else {
            // render index.ejs - pass 'campgrounds' to it
            res.render("campgrounds/index", {campgrounds: allCampgrounds, page: 'campgrounds'});  
        }
    });
});

// NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// CREATE - add new campground from the form to the campgrounds page
router.post("/", middleware.isLoggedIn, function(req, res){
    // Get the inputs named 'name' and 'image' from the form. Author comes from req.user, works because user has to be signed in by isLoggedIn
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var lat = req.body.lat;
    var lng = req.body.lng;
    var author = {
        id: req.user._id,
        username: req.user.username,
    };
    // Create an object of the inputs and push them to the array, redirect to the /campgrounds route
    var newCampground = {name: name, price: price, image: image, description: desc, author: author, lat: lat, lng: lng};
    console.log(newCampground);
    // Create a new campground and save to the DB
    Campground.create(newCampground, function(err, newlyCreated){
        if (err){
            req.flash('error', err.message);
        } else {
            req.flash('success', 'Campground added!');
            res.redirect("/campgrounds");
        }
    });
});

// SHOW - display one of the campgrounds in detail
router.get("/:id", function(req, res){
    // finds a campground with the provided ID, also populate with associated comments
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err){
            req.flash('error', err.message);
        } else {
            // Render the show template with the found campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT - edit a specific campground
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            req.flash('error', err.message);
        } else {
            res.render('campgrounds/edit', {campground: foundCampground});    
        }
    });
});

// UPDATE route - submit the edit
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res){
    // Find and update the blog with a single method, arguments are ID to find by - the new data - callback function
    Campground.findOneAndUpdate(req.params.id, req.body.campgroundUpdateForm, function(err, updatedCampground){
        if (err){
            req.flash('error', err.message);
            res.redirect('back');
        } else {
            req.flash('success', 'Campground edited!');
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// DESTROY route - delete the campground
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res){
    Campground.findOneAndDelete(req.params.id, function(err){
        if (err) {
            req.flash('error', err.message);
            res.redirect('back');
        } else {
            req.flash('success', 'Campground deleted!');
            res.redirect('/campgrounds/');
        }
    });
});


module.exports = router;