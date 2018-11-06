var express = require('express');
// {mergeParams: true} merges the parameters from other routes to be used
var router  = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');
// Loading the middleware index.js - the index.js is loaded automatically from the folder
var middleware = require('../middleware/');

// The routes are nested in the app.js ==> app.use('/campgrounds/:id/comments',commentRoutes); that's why the routes are short

// Comments new
router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            req.flash('error', err.message);
        } else {
            res.render("comments/new", {campground: campground});
        }    
     });
});

// Comments create
router.post("/", middleware.isLoggedIn, function(req, res){
    // Find a campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            req.flash('error', err.message);
            res.redirect("/campgrounds");
        } else {
            // Create a new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash('error', err.message);
                    res.redirect("/campgrounds/" + campground._id);
                } else {
                    // Add username and ID to the comment - isLoggedIn middleware ensures that user is logged in. That's why req.user works.
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // Save the comment
                    comment.save();
                    // Connect the comment to the campground, save and redirect to show page
                    campground.comments.push(comment);
                    campground.save();
                    req.flash('success', 'Comment created!');
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// Edit route
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err) {
            req.flash('error', err.message);
            res.redirect('back');
        } else {
        res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
        }
    });
});

// UPDATE route - submit the edit
router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res){
    // I don't understand why {_id: is required to make this work!
    Comment.findOneAndUpdate({_id: req.params.comment_id}, req.body.comment, function(err, updatedComment){
        if (err) {
            req.flash('error', err.message);
            res.redirect('/campgrounds');
        } else {
            req.flash('success', 'Comment edited!');
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// DESTROY route - delete the comment
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res){
    Comment.findOneAndDelete({_id: req.params.comment_id}, function(err){
        if (err) {
            req.flash('error', err.message);
            res.redirect('back');
        } else {
            req.flash('success', 'Comment deleted!');
            res.redirect('/campgrounds/' + req.params.id);
        }
    });    
});

module.exports = router;