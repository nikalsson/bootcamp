var express = require("express"),
app     = express(),
mongoose = require("mongoose"),
bodyParser = require("body-parser"),
expressSanitizer = require("express-sanitizer");

mongoose.connect("mongodb://localhost/todo_app");
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());

var todoSchema = new mongoose.Schema({
  text: String,
});

var Todo = mongoose.model("Todo", todoSchema);

// function to be used in the .get("/todos", ..) route
// this allows us to escape any special characters with a backslash
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// This will allow us to make AJAX requests to our API (server) from our client
// Does not work in c9, cannot have both the server & client running at the same time!
app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "http://localhost:8000");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
 next();
});

app.get("/todos", function(req, res){
    if(req.query.keyword) { // if there is a query string called keyword
        const regex = new RegExp(escapeRegex(req.query.keyword), 'gi'); // set the constant (variable) regex equal to a new regular expression created from the keyword that we pulled from the query string
        // query the database for Todos with text property that match the regular expression version of the search keyword
        Todo.find({ text: regex }, function(err, todos){
            if(err){
                res.redirect("/");
                console.log(err);
            } else {
                // send back the found todos as JSON
                res.json(todos);
            }
        });    
    } else {
        // if there is no query string keyword, show all todos
        Todo.find({}, function(err, todos){
            if(err){
                console.log(err);
            } else {
                if (req.xhr) { // if the request was made in XMLHttpRequest
                    res.json(todos); // send the response as JSON
                } else {
                    res.render("index", {todos: todos}); 
                }    
            }
        });
    }
});

app.post("/todos", function(req, res){
 req.body.todo.text = req.sanitize(req.body.todo.text);
 var formData = req.body.todo;
 Todo.create(formData, function(err, newTodo){
    if(err){
        res.redirect("/");
        console.log(err);
    } else {
        res.json(newTodo); // send the response as JSON
    }
  });
});

app.get("/todos/:id/edit", function(req, res){
 Todo.findById(req.params.id, function(err, todo){
   if(err){
     console.log(err);
     res.redirect("/");
   } else {
        res.json(todo); // send the response as JSON
   }
 });
});

app.put("/todos/:id", function(req, res){
 Todo.findByIdAndUpdate(req.params.id, req.body.todo, {new: true}, function(err, todo){ // {new: true} tells the query that the todo will be the updated item, not the original
   if(err){
        console.log(err);
   } else {
        res.json(todo); // send the response as JSON
   }
 });
});

app.delete("/todos/:id", function(req, res){
 Todo.findByIdAndRemove(req.params.id, function(err, todo){
   if(err){
        console.log(err);
   } else {
        res.json(todo); // send the response as JSON
   }
 }); 
});

// Uncomment the three lines of code below and comment out or remove lines 84 - 86 if using cloud9
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started!");
});
