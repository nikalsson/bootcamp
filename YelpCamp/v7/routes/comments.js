var express = require('express');
// {mergeParams: true} merges the parameters from other routes to be used
var router  = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');

// Comments new
router.get("/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }    
     });
});

// Comments create
router.post("/", isLoggedIn, function(req, res){
    // Find a campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // Create a new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                    res.redirect("/campgrounds/" + campground._id);
                } else {
                    // Connect the comment to the campground, save and redirect to show page
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// middleware function for checking if user is logged in, request, response, next 
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        console.log('Was not logged in');
        res.redirect('/login');
    }
}

module.exports = router;