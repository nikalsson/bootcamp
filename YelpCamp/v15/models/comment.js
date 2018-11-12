var mongoose = require("mongoose");

// Set up Schema for mongoose. Schema maps to a MongoDB collection and defines the shape of the documents within that collection.
var commentSchema = new mongoose.Schema(
    {
        text: String,
        author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // refers to the model that is referred to with ObjectId above - User model
            },
            username: String,
        }
    },
    {
        // if timestamps are set to true, mongoose assigns createdAt and updatedAt fields to your schema, the type assigned is Date.
        timestamps: true
    }
);

// Compiling the Schema in to a model and exporting so it can be used
module.exports = mongoose.model("Comment", commentSchema);