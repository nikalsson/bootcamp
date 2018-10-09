var mongoose = require("mongoose");

// USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        }
    ],
});

// Exporting the model so it can be used in any app
module.exports = mongoose.model("User", userSchema);