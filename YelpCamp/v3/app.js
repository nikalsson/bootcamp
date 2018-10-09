// Load following modules to NodeJS / body-parser needed to extract data from form to add campgrounds / mongoose needed for MongoDB database
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground.js"),
    seedDB      = require("./seeds");


app.use(bodyParser.urlencoded({extended: true}));

// Connect mongoose module to MongoDB database
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true});

// Set view engine to ejs, no need to write the file names later
app.set("view engine", "ejs");

seedDB();

// Set up a landing page
app.get("/", function(req, res){
    res.render("landing");
});

// Campground.create({
//      name: "Granite Hill", 
//      image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
//      description: "Lorem ipsum dolor sit amet, nec no essent propriae neglegentur, aeque graecis epicurei no mel. Mel autem altera fuisset ut, ad magna labitur fierent vel. Quas evertitur has te. Ei sit purto nominati, suscipiantur necessitatibus eu mea. Suavitate qualisque est ne, ei est vide tantas graeci.",
//  }, function(err, campground){
//         if (err) {
//             console.log("THERE WAS AN ERROR CREATING THE CAMPGROUND");
//             console.log(err);
//         } else {    
//             console.log("Newly created campground:")
//             console.log(campground);
//     }
// });

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    // route to campgrounds page, get all the campgrounds from the DB. If error, print it, otherwise send them to campground.ejs
    Campground.find({}, function(err, allCampgrounds){
        if (err){
            console.log(err);
        } else {
            // render index.ejs - pass 'campgrounds' to it
            res.render("index", {campgrounds: allCampgrounds});  
        }
    });
    
});

// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new");
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
            res.render("show", {campground: foundCampground});
        }
    });
});

// Starts a UNIX socket and listens for connections on the specified host and port.  
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started.");
});