var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cat_app", { useNewUrlParser: true});

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String,
});

var Cat = mongoose.model("Cat", catSchema);

// // Adding a new cat to the database

// var george = new Cat ({
//     name: "Sirkka",
//     age: 3,
//     temperament: "Evil",
// });

// george.save(function(error, cat){
//     if(error){
//         console.log("SOMETHING WENT WRONG!");
//     } else {
//         console.log("CAT IS SAVED TO THE DATABASE");
//         console.log(cat)
//     }
// });

Cat.create({
    name: "Kissa",
    age: 6,
    temperament: "Neutral",
}, function(error, newCat){
    if(error){
        console.log(error);
    } else {
        console.log(newCat);
    }
});



// Retrieving all cats from the database and console.log each one

Cat.find({}, function(error, cats){
    if(error) {
        console.log("THERE WAS AN ERROR!");
        console.log(error);
    } else {
        console.log("ALL THE CATS IN THE DATABASE:");
        console.log(cats);
    }
});
