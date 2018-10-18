var express = require('express');
var router  = express.Router();
var passport = require('passport');
var User    = require('../models/user');

// instead of using app. use router. to export the routes to app.js

// Root route
router.get("/", function(req, res){
    res.render("landing");
});

// show the register form route
router.get('/register', function(req, res){
    res.render('register');
});

// handle registering logic
router.post('/register', function(req, res){
    let newUser = new User({username: req.body.username});
    // User.register method is from passport-local-mongoose package
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            req.flash('error', err.message);
            return res.render('register');
        } else {
            // passport.authenticate will log the user in
            passport.authenticate('local')(req, res, function(){
                req.flash('success', 'Welcome to YelpCamp, ' + newUser.username + '!');
                res.redirect('/campgrounds');
            });
        }
    });
});

// show the login form
router.get('/login', function(req, res){
    res.render('login', {message: req.flash('loginError')});
});

// handle the login POST
// router.post(route, middleware, callback function)
router.post('/login', passport.authenticate('local', {
        successRedirect: '/campgrounds',
        failureRedirect: '/login',
    })
);

// logout route, logout() comes from passport module
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'Successfully logged out!');
    res.redirect('/campgrounds');
});

module.exports = router;