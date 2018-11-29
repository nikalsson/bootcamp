var express = require('express');
var router  = express.Router();
var passport = require('passport');
var User    = require('../models/user');
var Campground = require('../models/campground');
var async = require('async');
var nodemailer = require('nodemailer');
var crypto = require('crypto');

// instead of using app. use router. to export the routes to app.js
// Root route
router.get("/", function(req, res){
    res.render("landing");
});

// show the register form route
router.get('/register', function(req, res){
    res.render('register', {page: 'register'});
});

// handle registering logic
router.post('/register', function(req, res){
    let newUser = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        avatar: req.body.avatar,
    });
    // User.register method is from passport-local-mongoose package
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            return res.render('register', {error: err.message});
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
    res.render('login', {message: req.flash('loginError'), page: 'login'});
});

// handle the login POST
// router.post(route, middleware, callback function)
router.post('/login', passport.authenticate('local', {
        successRedirect: '/campgrounds',
        failureRedirect: '/login',
        failureFlash: true,
    }),
);

// logout route, logout() comes from passport module
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'Successfully logged out!');
    res.redirect('/campgrounds');
});

// forgot password
router.get('/forgot', function(req, res){
    res.render('forgot');
});

router.post('/forgot', function(req, res, next){
    async.waterfall([
        function(done){
            crypto.randomBytes(20, function(err, buf){
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        
        // Find an user with the matching email and create token
        function(token, done){
            User.findOne({ email: req.body.email }, function(err, user) {
                if (err) {
                    req.flash('error', err.message);
                    res.redirect('back');
                } else if (!user) {
                    req.flash('error', 'No account with that email address exists.');
                }
                
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // password reset token expires in 1 hour
                
                user.save(function(err){
                    done(err, token, user);
                });
            });
        },
        
        function(token, user, done){
           let smtpTransport = nodemailer.createTransport({
                 service: 'Gmail', // no need to set host or port etc.
                 auth: {
                     user: 'webdevpracticeyelp@gmail.com',
                     pass: process.env.smtpPassword
                 }
            });
            var mailOptions = {
            to: user.email,
            from: 'webdevpracticeyelp@gmail.com',
            subject: 'Node.js Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'http://' + req.headers.host + '/reset/' + token + '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
            console.log('mail sent');
            req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
            done(err, 'done');
          }); 
        }
        ], function(err){
            if (err){
                console.log(err);
                return next(err);
            } 
            res.redirect('/forgot');
        });
});



// Set new password after creating token
router.get('/reset/:token', function(req, res){
    User.findOne( {resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now() } }, function(err, user){
        if (err) {
            req.flash('error', err.message);
            res.redirect('back');
        } else if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/forgot');
        }
        res.render('reset', {token: req.params.token});
    });
});

router.post('/reset/:token', function(req, res){
    async.waterfall([
        function(done){
            User.findOne( {resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                if (err) {
                    console.log(err);
                    req.flash('error', err.message);
                    res.redirect('back');
                } else if (!user) {
                    req.flash('error', 'Password reset token is invalid or has expired.');
                    return res.redirect('back');
                }
                if(req.body.password === req.body.confirm) {
                    user.setPassword(req.body.password, function(err) {
                        if (err){            
                            req.flash('error', err.message);
                            res.redirect('/campgrounds');
                        }
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;
                        
                        user.save(function(err) {
                            if (err){            
                                req.flash('error', err.message);
                                res.redirect('/campgrounds');
                            }
                            req.logIn(user, function(err) {
                                done(err, user);
                            });
                        });
                    });
                } else {
                    req.flash('error', 'The passwords do not match!');
                    return res.redirect('back');
                }
            });
        },
        function(user, done){
           let smtpTransport = nodemailer.createTransport({
             service: 'Gmail', // no need to set host or port etc.
             auth: {
                 user: 'webdevpracticeyelp@gmail.com',
                 pass: process.env.smtpPassword
                } 
            });
            let mailOptions = {
                to: user.email,
                from: 'learntocodeinfo@mail.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                if (err){            
                    req.flash('error', err.message);
                    res.redirect('/campgrounds');
                }
                req.flash('success', 'Your password has been successfully changed!');
                return res.redirect('/campgrounds');
            });
        }   
    ]);
});



// User profile
router.get('/users/:id', function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if (err){            
            req.flash('error', err.message);
            res.redirect('back');
        } else {
            // Find the campgrounds where author id matches the userid and pass it to show page
            Campground.find().where('author.id').equals(foundUser._id).exec(function(err, campgrounds){
                if (err){            
                    req.flash('error', err.message);
                    res.redirect('back');
                } else {    
                    // show profile page and pass foundUser to it
                    res.render('users/show', {user: foundUser, campgrounds: campgrounds});
                }
            });
        }
    });
});
            
module.exports = router;