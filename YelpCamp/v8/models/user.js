var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    user:       String,
    password:   String,
});

// Load passportLocalMongoose package to userSchema to use it's methods
userSchema.plugin(passportLocalMongoose);

// Export the model so it can be used in the app
module.exports = mongoose.model("User", userSchema);