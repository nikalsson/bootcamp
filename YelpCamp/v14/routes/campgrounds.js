var express = require('express');
var router  = express.Router();
var Campground = require('../models/campground');
// Loading the middleware index.js - the index.js is loaded automatically from the folder
var middleware = require('../middleware/');
var multer = require('multer');

// multer is a middleware for uploading files - use in uploading files to cloudinary
var storage = multer.diskStorage({
    filename: function(req, file, callback) {
        // renaming the file as current date + original file name
        callback(null, Date.now() + file.originalname);
    }
});

var imageFilter = function(req, file, cb) { 
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

// upload will be used in the POST route
var upload = multer({ storage: storage, fileFilter: imageFilter});

// cloudinary will be used in uploading the pictures to cloudinary
var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'duvxdwcmt',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// INDEX - show all campgrounds, search if req.query.search exists
router.get("/", function(req, res){
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Campground.find({ name: regex}, function(err, searchResults){
            if (err){            
                req.flash('error', err.message);
            } else {
                if (searchResults.length === 0) {
                    req.flash('error', 'No search matches, displaying all campgrounds.');
                    return res.redirect('back');
                }    
                // render index.ejs - display with search results
                res.render("campgrounds/index", {campgrounds: searchResults, page: 'campgrounds'}); 
            }    
        });
    } else {
    // Get all campgrounds from the DB
        Campground.find({}, function(err, allCampgrounds){
            if (err){            
                req.flash('error', err.message);
            } else {
                // render index.ejs - pass 'campgrounds' to it
                res.render("campgrounds/index", {campgrounds: allCampgrounds, page: 'campgrounds'});  
            }
        });
    }    
});

// NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// CREATE - add new campground from the form to the campgrounds page
router.post("/", middleware.isLoggedIn, upload.single('image'), function(req, res){
    cloudinary.v2.uploader.upload(req.file.path, function(err, result){
        if (err){
            req.flash('error', err.message);
            return res.redirect('back');
        }
        // Get the inputs from the form. Author comes from req.user, works because user has to be signed in by isLoggedIn
        var name = req.body.name;
        var price = req.body.price;
        // add cloudinary url for the image to the campground object under image property
        var image = result.secure_url;
        // add image's public_id to campground object
        var imageId = result.public_id;
        var desc = req.body.description;
        var lat = req.body.lat;
        var lng = req.body.lng;
        var author = {
            id: req.user._id,
            username: req.user.username,
        };
        // Create an object of the inputs and push them to the array, redirect to the /campgrounds route
        var newCampground = {name: name, price: price, image: image, imageId: imageId, description: desc, author: author, lat: lat, lng: lng};
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
    Campground.findById(req.params.id,  function(err, foundCampground){
        if (err) {
            req.flash('error', err.message);
        } else {
            res.render('campgrounds/edit', {campground: foundCampground});    
        }
    });
});

// PUT BACK THE MIDDLEWARE TO ROUTES middleware.checkCampgroundOwnership

// UPDATE route - submit the edit
router.put('/:id', middleware.checkCampgroundOwnership, upload.single('image'), function(req, res){
    // First find the campground, then if image is changed, wait for old to be deleted and then upload new one
    // That's why in here is used async function - try - catch and await
    Campground.findById(req.params.id, async function(err, campground){
        if (err){
            req.flash('error', err.message);
            return res.redirect('back');
        } else {
            if (req.file) {
                try {
                    await cloudinary.v2.uploader.destroy(campground.imageId); // wait till completed before next task
                    let result = await cloudinary.v2.uploader.upload(req.file.path);
                    campground.imageId = result.public_id;
                    campground.image = result.secure_url;
                } catch(err) {
                    req.flash('error', err.message);
                    return res.redirect('back');
                }
            }

            //WET CODE, HOW TO REFACTOR? - either take only changed values or push all to campground from req.body.campgroundUpdateForm
            //take only some values of edit form
            { 
                campground.name = req.body.campgroundUpdateForm.name, 
                campground.price = req.body.campgroundUpdateForm.price,
                campground.description = req.body.campgroundUpdateForm.description,
                campground.lat = req.body.campgroundUpdateForm.lat,
                campground.lng = req.body.campgroundUpdateForm.lng;
            }
            campground.save();
            req.flash('success', 'Campground edited!');
            res.redirect('/campgrounds/' + req.params.id);
        }
    });    
});

    
// DESTROY route - delete the campground
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, async function(err, campground){
        if (err) {
            req.flash('error', err.message);
            res.redirect('back');
        }
        try {
            await cloudinary.v2.uploader.destroy(campground.imageId);
            campground.remove();   
            req.flash('success', 'Campground deleted!');
            res.redirect('/campgrounds');
        } catch(err) {
            if(err) {
                req.flash("error", err.message);
                return res.redirect("back");
            }
 
        }
    });
});

// Protect the fuzzy search from DDOS
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;