var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");
    

var campData = [
        {
            name: "Test camp 1",
            image: "https://images.unsplash.com/photo-1534880606858-29b0e8a24e8d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=890e75a342e46be601584be1318ba5db&auto=format&fit=crop&w=500&q=60",
            description: "First seedDB test",
        },
        {
            name: "Test camp 2",
            image: "https://images.unsplash.com/photo-1533632359083-0185df1be85d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=51f7a26d1f207240dafd6cd80bf4c4a0&auto=format&fit=crop&w=500&q=60",
            description: "First seedDB test",
        },
        {
            name: "Test camp 3",
            image: "https://images.unsplash.com/photo-1528433556524-74e7e3bfa599?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a4479c0b22e5c8a8ed5577c39f63b27b&auto=format&fit=crop&w=500&q=60",
            description: "First seedDB test",
        },
    ];
    
function seedDB(){
    // Remove all campgrounds
    Campground.deleteMany({}, function(err){
        if (err){
            console.log (err);
        } else {
            console.log("Removed campgrounds!");
            
            // Add a few campgrounds
            campData.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                  if (err){
                      console.log(err);
                  } else {
                        console.log("Created a campground!");
                          
                        // Create a comment
                        Comment.create(
                            {
                              text: "test comment 1",
                              author: "dummy author",
                            }, function(err, comment){
                                if (err){
                                    console.log(err);
                                } else {
                                     campground.comments.push(comment);
                                     campground.save();
                                     console.log("Created a new comment!");
                                }
                            });
                  }
                });
            });
        }
    });
}    

module.exports = seedDB;