var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    rating: {
        type: Number, // Set the field type
        required: 'Please provide a rating (1-5 stars).', // a star rating is mandatory
        min: 1,
        max: 5,
        // Adding validation to check if the entry is an integer
        validate: {
            // validator accepts a function definition which it uses for validation
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value!'
        }
    },
    
    // review text
    text: {
        type: String,
    },
    
    // associated author id and username fields
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // refers to the model that is referred to with ObjectId above - User model
        },
        username: String,
    },
    
    // campground associated with the review
    campground: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campground'
    }
}, 

{
    // if timestamps are set to true, mongoose assigns createdAt and updatedAt fields to your schema, the type assigned is Date.
    timestamps: true,
});

module.exports = mongoose.model('Review', reviewSchema);