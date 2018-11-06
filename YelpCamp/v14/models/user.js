var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username:       {type: String, unique: true, required: [true, 'A username is required!']},
    password:       String,
    firstname:      String,
    lastname:       String,
    email:          {type: String, unique: true, required: [true, 'An email address is required!']},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    avatar:         String,
    isAdmin:        {type: Boolean, default: false},
});

// Load passportLocalMongoose package to userSchema to use it's methods
userSchema.plugin(passportLocalMongoose);

// Export the model so it can be used in the app
module.exports = mongoose.model("User", userSchema);