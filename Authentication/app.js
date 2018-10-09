var express             = require('express'),
app                     = express(),
bodyParser              = require('body-parser'),
mongoose                = require('mongoose'),
passport                = require('passport'),
passportLocal           = require('passport-local'),
passportLocalMongoose   = require('passport-local-mongoose'),
User                    = require('./models/user');    


app.set("view engine", "ejs");
// Body parser is needed when extracting data from form
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/authentication", { useNewUrlParser: true});

// Load and require express-session, not defined above like other packages
app.use(require('express-session')({
    secret: 'An example secret sentence, can be anything.',
    resave: false,
    saveUninitialized: false,
}));

// For using passport in the app
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));

// Serialize reads the session, gets encoded data and unencodes, (de)serializeUser comes with passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ROUTES

app.get('/', function(req, res){
    res.render('home');
});

app.get('/secret', isLoggedIn, function(req, res){
    res.render('secret');    
});

//=================
// AUTH ROUTES
//=================

// show the register form
app.get('/register', function(req, res){
   res.render('register'); 
});

// handling user sign up
app.post('/register', function(req, res){
    // the password is not saved to user, it comes after
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if (err) {
            console.log(err);
            return res.render('/');
        } else {
            // passport.authenticate will log the user in
            passport.authenticate('local')(req, res, function(){
                console.log(user);
                res.redirect('/secret');
            });
        }
    });
});


// show the login form
app.get('/login', function(req, res){
    res.render('login');
});

// handling the log in, if success go to secret page, otherwise back to login
app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
}), 
function(req, res){
});

// logout route, req.logout() comes from passport
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});


// middleware function for checking if user is logged in, request, response, next 
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        console.log('Was not logged in');
        res.redirect('/');
    }
}


// Starts a UNIX socket and listens for connections on the specified host and port.  
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The auth server has started.");
});  