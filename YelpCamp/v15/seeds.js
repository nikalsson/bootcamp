var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");

var seeds = [
        { 
          author : { "id" : "5be170c4cc30e614bb1b4d56", "username" : "Sirkka" },
          name: 'Test camp',
          price: '100',
          image: 'https://res.cloudinary.com/duvxdwcmt/image/upload/v1541765669/hjfsguppyk9prjgjqrzv.jpg',
          imageId: 'wf399cwhvdpwkcheu1vl',
          description: 'Aliquam in metus malesuada, viverra arcu at, bibendum leo. Nulla in efficitur mi. Vestibulum vel lacus a ante lacinia gravida ut eget purus. Nulla sollicitudin sem elit, non pharetra lorem dictum sed. Duis sollicitudin accumsan odio eu pharetra. Ut sit amet tellus a libero accumsan tincidunt. Fusce sed vestibulum urna. Etiam in ex sit amet odio hendrerit tempor.',
          lat: 53.34156417008356,
          lng: 26.281083811475128,
          createdAt : ("2018-11-09T09:03:20.781Z"),
        },
        
        { 
          author : { "id" : "5be170c4cc30e614bb1b4d56", "username" : "Sirkka" },
          name: 'Mega camp',
          price: '1200',
          image: 'https://res.cloudinary.com/duvxdwcmt/image/upload/v1541765830/s1nnhxfe9agvafvmnfoi.jpg',
          imageId: 'wf399cwhvdpwkcheu1vl',
          description: 'Aliquam in metus malesuada, viverra arcu at, bibendum leo. Nulla in efficitur mi. Vestibulum vel lacus a ante lacinia gravida ut eget purus. Nulla sollicitudin sem elit, non pharetra lorem dictum sed. Duis sollicitudin accumsan odio eu pharetra. Ut sit amet tellus a libero accumsan tincidunt. Fusce sed vestibulum urna. Etiam in ex sit amet odio hendrerit tempor.',
          lat: -67.34156417008356,
          lng: 10.281083811475128,
          createdAt : ("2018-11-09T09:03:20.781Z"),
        },
        
        { 
          author : { "id" : "5be170c4cc30e614bb1b4d56", "username" : "Sirkka" },
          name: 'Ultimate camp',
          price: '250',
          image: 'https://res.cloudinary.com/duvxdwcmt/image/upload/v1541766035/jqmicwmotm9ivcx8hufa.jpg',
          imageId: 'wf399cwhvdpwkcheu1vl',
          description: 'Aliquam in metus malesuada, viverra arcu at, bibendum leo. Nulla in efficitur mi. Vestibulum vel lacus a ante lacinia gravida ut eget purus. Nulla sollicitudin sem elit, non pharetra lorem dictum sed. Duis sollicitudin accumsan odio eu pharetra. Ut sit amet tellus a libero accumsan tincidunt. Fusce sed vestibulum urna. Etiam in ex sit amet odio hendrerit tempor.',
          lat: -67.34156417008356,
          lng: 10.281083811475128,
          createdAt : ("2018-11-09T09:03:20.781Z"),
        },
    ];
    
// seedDB removes all campgrounds and comments from database and creates new ones, good for testing

async function seedDB(){
    try {
        await Campground.remove({});
        await Comment.remove({});

        for (const seed of seeds) { // loops through all, can be used instead of forEach
        var campground = await Campground.create(seed);
        var comment = await Comment.create(
            {
              text : "This is an example comment left by an user.", 
              createdAt : ("2018-11-09T11:56:29.900Z"),
              author : 
                {
                id : ("5be170c4cc30e614bb1b4d56"),
                username : "Sirkka" 
                }
            }
        );
        campground.comments.push(comment);
        campground.save();
        }
    } catch(err) {
        console.log(err);
    }
}    

module.exports = seedDB;