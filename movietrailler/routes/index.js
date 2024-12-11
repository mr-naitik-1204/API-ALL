const express = require('express');
const MC = require('../controller/Movie'); // Correct path to the movie controller
const AU = require('../middlewhere/Autho'); // Correct path to the authentication middleware
const router = express.Router();

// Routes for movie-related operations
router.post('/movies/createMovie', AU.tokensecure, MC.createMovie);
router.get('/movies/getMovies',  MC.getMovies);
router.delete('/movies/deleteMovie/:id', AU.tokensecure, MC.deleteMovie);
router.patch('/movies/updateMovie/:id', AU.tokensecure, MC.updateMovie);

module.exports = router;
