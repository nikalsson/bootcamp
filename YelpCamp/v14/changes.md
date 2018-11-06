# Style the campgrounds page
- Improve header and title
- Make campgrounds display in a grid
 
# Style the Navbar and the Form
- Add a navbar to all templates
- Style the new campgrounds form
 
# Add Mongoose
- Install and configure Mongoose
- Setup campgrounds model
- Use campgrounds model inside of our routes!

# Show Page
- Review RESTful routes
- Add description to the campground model
- Show db.collection.drop()
- Add a show/route template

# v5 
* Add a seeds.js file
* Run the seeds file every time the server starts
* Add the Comment model!
* Make our errors go away!
* Display comments on campground show page

# v6 added user authentication, login, register and navbar changes
- installed passport and express-session

# v7 refactor the routes
- into separate files
- 
# v8 Users + Comments
- associate user's name to comments
- save author's name to comment automatically

# v9 campgrounds + users
- associate user and id to campground
- user must be logged in to create campground
- author's name is displayed on the campground page
- 
# v10 Editing campgrounds
- Add method-override
- Add edit route for campgrounds
- Add link to edit page
- Add update route
- Fix $set problem

# v11 Adding flash messages in the app
- Style the landing page
- Add prices to campgrounds

# v12
- style login & register pages
- change container to stretch from header to footer, change navbar to collapse
- fix register flash bug

# v13
- add Mapbox, missing address reverse search from marker coordinates
- add moment.js to add creation time to campgrounds and comments
- add admin, isAdmin has to be toggled to user from mongo - can delete and edit all
- hide access tokens
- push to heroku

# v14
- add user profile page, access from navbar or campground show page. Route still in index.js!
- add password reset function using nodemailer and gmail



TO DO
- change user model pwd to required!