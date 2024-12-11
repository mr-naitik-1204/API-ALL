const mongoose = require('mongoose');
const Movie = require('../modal/movie');


exports.createMovie = async (req, res) => {
    const { title, description, releaseYear, trailerUrl, genre } = req.body;

  const  userid = req.user.userid._id;
  console.log(userid);
  
    try {
        const newMovie = new Movie({ title, description, releaseYear, trailerUrl, genre,userid });
        await newMovie.save();
        res.status(201).json(newMovie);  // Respond with the newly created movie
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Server error',
            error: error.message
        });
    }
};

exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find().populate('userid'); // Get all movies from the database
        res.status(200).json(movies);  // Respond with the list of movies
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Server error',
            error: error.message
        });
    }
};

exports.deleteMovie = async (req, res) => {
    const movieId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid movie ID format'
        });
    }

    try {
        const movie = await Movie.findByIdAndDelete(movieId);
        if (!movie) {
            return res.status(404).json({
                status: 'fail',
                message: 'Movie not found'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Movie deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Server error',
            error: error.message
        });
    }
};

exports.updateMovie = async (req, res) => {
    const movieId = req.params.id;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid movie ID format'
        });
    }

    try {
        const movie = await Movie.findByIdAndUpdate(movieId, updateData, { new: true });
        if (!movie) {
            return res.status(404).json({
                status: 'fail',
                message: 'Movie not found'
            });
        }
        res.status(200).json(movie);  // Respond with the updated movie
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Server error',
            error: error.message
        });
    }
};
