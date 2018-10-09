// Load following modules to NodeJS / body-parser needed to extract data from form to add campgrounds / mongoose needed for MongoDB database
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    seedDB          = require("./seeds"),
    User            = require("./models/user"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    expressSession   = require("express-session");
    
app.use(bodyParser.urlencoded({extended: true}));

// Connect mongoose module to MongoDB database
mongoose.connect("mongodb://localhost:27017/yelp_camp_v4", { useNewUrlParser: true});

// Set view engine to ejs, no need to write the file names later
app.set("view engine", "ejs");

// Use files from public folder
app.use(express.static(__dirname + "/public"));

seedDB();

// PASSPORT CONFIG
app.use(expressSession({
    secret: "This secret phrase can be anything.",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
// User.authenticate & serializeUser comes from passport-local-mongoose 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Set up a landing page
app.get("/", function(req, res){
    res.render("landing");
});

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    // route to campgrounds page, get all the campgrounds from the DB. If error, print it, otherwise send them to campground.ejs
    Campground.find({}, function(err, allCampgrounds){
        if (err){
            console.log(err);
        } else {
            // render index.ejs - pass 'campgrounds' to it
            res.render("campgrounds/index", {campgrounds: allCampgrounds});  
        }
    });
    
});

// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

// CREATE - add new campgrounds from the form to the campgrounds page
app.post("/campgrounds", function(req, res){
    // Get the inputs named 'name' and 'image' from the form
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    // Create an object of the inputs and push them to the array, redirect to the /campgrounds route
    var newCampground = {name: name, image: image, description: desc,};
    // Create a new campground and save to the DB
    Campground.create(newCampground, function(err, newlyCreated){
        if (err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// SHOW - display one of the campgrounds in detail
app.get("/campgrounds/:id", function(req, res){
    // finds a campground with the provided ID, also populate with associated comments
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err){
            console.log(err);
        } else {
            // Render the show template with the found campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


// ==================
// COMMENTS ROUTE
// ==================

app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }    
     });
});


app.post("/campgrounds/:id/comments", function(req, res){
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


// AUTH ROUTES

// show the register form
app.get('/register', function(req, res){
    res.render('register');
});

// handle registering logic
app.post('/register', function(req, res){
    let newUser = new User({username: req.body.username});
    // User.register method is from passport-local-mongoose package
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            return res.render('register');
        } else {
            // passport.authenticate will log the user in
            passport.authenticate('local')(req, res, function(){
                console.log(user);
                res.redirect('/campgrounds');
            });
        }
    });
});

// Starts a UNIX socket and listens for connections on the specified host and port.  
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started.");
});