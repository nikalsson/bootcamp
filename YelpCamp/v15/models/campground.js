var mongoose = require("mongoose");

// Set up Schema for mongoose. Schema maps to a MongoDB collection and defines the shape of the documents within that collection.
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    imageId: String,
    description: String,
    lat: Number,
    lng: Number,
    // createdAt: {type: Date, default: Date.now},
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
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
            
        }
    ],
    rating: {
        type: Number,
        default: 0,
    }
},
{
    // if timestamps are set to true, mongoose assigns createdAt and updatedAt fields to your schema, the type assigned is Date.
    timestamps: true
}
);

// Compiling the Schema in to a model and exporting so it can be used
module.exports = mongoose.model("Campground", campgroundSchema);