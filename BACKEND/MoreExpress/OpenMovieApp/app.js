// General search: http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb 

// Search with Movie ID: http://www.omdbapi.com/?i=tt3896198&apikey=thewdb 

var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("search");
});


app.get("/results", function(req, res){
    // req.query.search - search is the 'name' of the form on search.ejs
    var query = req.query.search;
    // input the query to the API
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb"
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            // parse the body from string to JSON in order to access data inside it
            var parsedData = JSON.parse(body)
            res.render("results", {parsedData: parsedData});
        }
    }); 
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The OpenMovieApp is listening.");
}); 