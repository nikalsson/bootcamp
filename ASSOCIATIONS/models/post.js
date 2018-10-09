var mongoose = require("mongoose");

// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String,
});

// Exporting the model so it can be used in any app
module.exports = mongoose.model("Post", postSchema);