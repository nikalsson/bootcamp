var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo_references", { useNewUrlParser: true});

var Post = require("./models/post.js");
var User = require("./models/user.js");


// CREATE A NEW POST THAT IS LINKED TO THE USER
Post.create({
        title: "A test post VERSION 4 - NOW WITH MODULES",
        content: "Another test post"
    }, function(err, post){
        if (err) {
            console.log(err);
        } else {
        User.findOne({email: "test.user@mail.com"}, function (err, foundUser){
            if (err) {
                console.log(err);
            } else {
                foundUser.posts.push(post);
                foundUser.save(function(err, data){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(data);
                    }
                });
            }
        });
    }    
});


// User.create({
//     email: "test.user@mail.com",
//     name: "Test User",
// });


// FIND USER & FIND ALL POSTS BY THE USER
User.findOne({email: "test.user@mail.com"}).populate("posts").exec(function(err, user){
    if (err) {
        console.log(err);
    } else {
        console.log(user);
    }
});