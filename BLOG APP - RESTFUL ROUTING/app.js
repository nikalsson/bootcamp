// Load modules to NodeJS
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");

// APP CONFIG
    // Set view engine to ejs, no need to write the file extensions later
app.set("view engine", "ejs");
    // Code to serve images, CSS files, and JavaScript files in a directory named 'public'
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));
    // Configure Method-Override to look for string "_method"
app.use(methodOverride("_method"));
    // Connect mongoose module to MongoDB database
mongoose.connect("mongodb://localhost:27017/blog_app_restful", { useNewUrlParser: true});
    // Configure Express Sanitizer to prevent users from running scripts - MUST BE AFTER BODY PARSER
app.use(expressSanitizer());    



// MONGOOSE SCHEMA CONFIG
// Set up Schema for mongoose. Schema maps to a MongoDB collection and defines the shape of the documents within that collection.
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    // Automatically set the creation date of a new blog post
    created: {type: Date, default: Date.now},
});

// Compiling the Schema in to a model
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "TEST BLOG",
//     image: "https://images.unsplash.com/photo-1536009090804-cd6aca2fe136?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ab3dfbfc2fb5473fc2b149004bc65276&auto=format&fit=crop&w=634&q=80",
//     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
// });

// RESTFUL ROUTES

app.get("/", function(req, res){
    res.redirect("/blogs");
})

// INDEX - show all blog posts
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, allBlogPosts){
        if (err){
            console.log(err);
        } else {
            res.render("index", {allBlogPosts: allBlogPosts});
        }
    });
});

// NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res){
    // Sanitize new blog post to prevent running <script>
    req.body.blog.body = req.sanitize(req.body.blog.body);
    // Create a new blog post from the data in the form
    Blog.create(req.body.blog, function(err, newBlog){
        if (err){
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    // Find the blogpost from DB with the ID
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err){
            console.log(err);
        } else {
            // Render the SHOW template with the specific blog post
            res.render("show", {blog: foundBlog});
        }
    });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    // Find the blogpost from DB with the ID
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err){
            console.log(err);
        } else {
            // Render the EDIT template with the specific blog post
            res.render("edit", {blog: foundBlog});
        }
    });    
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    // Find and update the blog with a single method, arguments are ID to find by - the new data - callback function
    Blog.findOneAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            console.log(err);
        } else {
            // Redirect to updated blog entry SHOW page
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
   Blog.findOneAndDelete(req.params.id, function(err){
       if (err){
           console.log(err);
       } else {
           res.redirect("/blogs/");
       }
   });
});


// Starts a UNIX socket and listens for connections on the specified host and port.  
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The blog server has started.");
})