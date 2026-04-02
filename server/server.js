const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');
const {movies} = require("./movie-model");

const app = express();

// Parse urlencoded bodies
app.use(bodyParser.json()); 

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

// Configure a 'get' endpoint for all movies..
app.get('/movies', function (req, res) {
  /* Task 1.2. Remove the line below and return the movies from
     the model as an array */
  const movieArray = Object.values(movies);
  if (movieArray.length < 1) {
    return res.sendStatus(404);
  }
  console.log(Array.isArray(movieArray));
  res.send(movieArray);
})

// Configure a 'get' endpoint for a specific movie
app.get('/movies/:imdbID', function (req, res) {
  /* Task 2.1. Remove the line below and add the 
    functionality here */
  const movie = movies[req.params.imdbID];
  if (movie == null) {
    return res.sendStatus(404);
  }
  res.send(movie);
})

/* Task 3.1 and 3.2.
   - Add a new PUT endpoint
   - Check whether the movie sent by the client already exists 
     and continue as described in the assignment */
app.put('/movies/:imdbID', function (req, res) {
  movies[req.params.imdbID] = req.body;
  res.sendStatus(200);
})

app.listen(3000)

console.log("Server now listening on http://localhost:3000/")

