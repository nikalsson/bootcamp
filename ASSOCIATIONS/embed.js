var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo", { useNewUrlParser: true});

// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String,
});

var Post = mongoose.model("Post", postSchema);

// USER - email, name --- THE USER IS DEFINED AFTER POST BECAUSE postSchema IS REQUIRED FOR THE POSTS ARRAY
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

// var newUser = new User({
//     email: "super.user@testmail.com",
//     name: "Super User",
// });

// newUser.posts.push({
//     title: "This is a new post of Super User",
//     content: "aohinaohinathoaitnh a;tohiat;oihna;oth a;dothinatlihunaliguajnegroliae",
// });

// newUser.save(function(err, user){
//     if (err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: "A test post",
//     content: "I hope this is successful.",
// });

// newPost.save(function(err, post){
//     if (err){
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

User.findOne({name: "Super User"}, function(err, user){
    if (err){
        console.log(err);
    } else {
        user.posts.push({
            title: "Yet another test post",
            content: "Yet another success?",
        });
        user.save(function(err, user){
            if (err) {
                console.log(err);
            } else {
                console.log(user);    
            }
        });
    }    
});        