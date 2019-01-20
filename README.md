# Coen Collection User API/Database

### About

This is the user database to store users and favorited selections for the [Coen Collection](https://coen-collection.herokuapp.com/) app.

### See it Live

[Coen Collecton Backend](https://coen-collection-backend.herokuapp.com/) on Heroku.

### Tech Stack

* Express.js
* Knex.js
* PostgreSQL
* Heroku

## API Endpoints

 * ##### Sign In - `/api/users`
  To sign in you will need to pass in email and password to the body.
  
* ##### Create Account - `/api/users/new`
  Creating an account must have all input fields filled in (name, email, password)
  You must send all three into the body. Passwords are case sensitive.

* ##### Add Favorite - `/api/users/favorites/new`
  To save a favorite you must send into the body: movie_id, user_id and title, poster_path, release_date, vote_average, overview.

* ##### Receive All Favorites - `/api/users/:user_id/favorites`
  To get a users favorite movies you need to send in the user ID through the params. 

* ##### Delete a Favorite - `/api/users/:user_id/favorites/:movie_id`
  To delete a users favorite you must send in the users id and id of the movie.

## Setup

Clone the repo

Run ```npm install``` from the root directory

Run ```npm start``` and visit localhost:3000 in your browser


### Original Assignment

[Movie Tracker](https://github.com/turingschool-examples/movie-tracker) from the [Turing School of Software & Design](https://turing.io/)

### Contributors

* Tobin Nelson: [Github Profile](https://github.com/Tobin-jn)
