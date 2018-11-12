var Comment = require('../models/comment.js');
var Campground = require('../models/campground.js');
var Review = require('../models/review');

// All the middleware goes into this object

var middlewareObject = {};

// checking if user is logged in, request, response, next 
middlewareObject.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('error', 'You need to be logged in to do that!');
        res.redirect('/login');
    }
};

// checking if user is the owner of the comment
middlewareObject.checkCommentOwnership = function (req, res, next){
    // Is user logged in req.isAuthenticated() will return true if user is logged in -- from passport
    if (req.isAuthenticated()) {
        // Find the comment from DB
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err){
                req.flash('error', err.message);
                res.redirect('back');
            } else {
                // Check if user owns the comment, matching id
                // Can't compare (foundComment.author.id === req.user._id) - 1st is mongoose object, 2nd is a string. Use mongoose method equals()
                if (foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                } else {
                    req.flash('error', 'You don\'t have the permission to do that!');
                    res.redirect('back');
                }
            }
        });
    } else {
        console.log('Unauthorized attempt!');
        res.redirect('back');
    }    
};

// checking if user is the owner of the campground
middlewareObject.checkCampgroundOwnership = function (req, res, next){
    // Is user logged in req.isAuthenticated() will return true if user is logged in -- from passport
    if (req.isAuthenticated()) {
        // Find the campground from DB
        Campground.findById(req.params.id, function(err, foundCampground){
            if (err){
                req.flash('error', err.message);
                res.redirect('back');
            } else {
                // Check if user owns the campground, matching id
                // Can't compare (foundCampground.author.id === req.user._id) - 1st is mongoose object, 2nd is a string. Use mongoose method equals()
                if (foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                } else {
                    req.flash('error', 'You don\'t have the permission to do that!');
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }    
};

middlewareObject.checkReviewOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Review.findById(req.params.review_id, function (err, foundReview) {
            if (err || !foundReview) {
                res.redirect('back');
            } else {
                // does the user own the comment?
                if (foundReview.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'You don\'t have the permission to do that!');
                    res.redirect('back');   
                }
            }
        });
    } else {
        req.flash('error', 'You need to be logged in to do that!');
        res.redirect('/login');
    }
};

middlewareObject.checkReviewExistence = function (req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id).populate('reviews').exec(function (err, foundCampground) {
            if (err || !foundCampground) {
                req.flash('error', 'Campground not found.');
                res.redirect('back');
            } else {
                // check if req.user._id exists in foundCampgrounds.reviews
                // some() array method which will return true if any element of the array matches the check 
                var foundUserReview = foundCampground.reviews.some(function (review) {
                    return review.author.id.equals(req.user._id);
                });
                if (foundUserReview) {
                    req.flash('error', 'You already wrote a review, please edit that.');
                    return res.redirect('/campgrounds/' + foundCampground._id);
                }
                // if an existing review was not found, go to next
                next();
            }
        });
    } else {
        req.flash('error', 'You need to be logged in to do that!');
        res.redirect('/login');
    }
};    

module.exports = middlewareObject;