var Comment = require('../models/comment.js');
var Campground = require('../models/campground.js');

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

// checking if user is the owner of the campground
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

module.exports = middlewareObject;