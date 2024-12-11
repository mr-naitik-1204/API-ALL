var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var carsRouter = require('./routes/car');
var usersRouter = require('./routes/users');
var rentalRoutes = require('./routes/rentel');
var paymentRoutes = require('./routes/peyment');
var mongoose = require('mongoose');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/car-rentel', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB', error));

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', carsRouter);
app.use('/users', usersRouter);
app.use('/', rentalRoutes);
app.use('/payments', paymentRoutes);

// 404 error handling
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
