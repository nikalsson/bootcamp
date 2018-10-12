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
    expressSession  = require("express-session");
    
// Require the route files
var commentRoutes       = require('./routes/comments'),
    campgroundRoutes    = require('./routes/campgrounds'),
    indexRoutes         = require('./routes/index');
    
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

// A middleware to pass in username information to every route, req.user comes from passport module
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    console.log(req.user);
    next();
});

// Use the routes required previously, add a prefix to be used in the routes of the file
app.use('/', indexRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);
app.use('/campgrounds', campgroundRoutes);
    


// Starts a UNIX socket and listens for connections on the specified host and port.  
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started.");
});