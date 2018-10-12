var mongoose = require("mongoose");

// Set up Schema for mongoose. Schema maps to a MongoDB collection and defines the shape of the documents within that collection.
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        // Associate Comment from Comment.js model with the campground
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // refers to the model that is referred to with ObjectId above - User model
            },
            username: String,
    }        
});



// Compiling the Schema in to a model and exporting so it can be used
module.exports = mongoose.model("Campground", campgroundSchema);