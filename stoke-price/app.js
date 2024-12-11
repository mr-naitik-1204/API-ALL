var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { default: mongoose } = require('mongoose');

mongoose.connect('mongodb://localhost:27017/stockprice')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error))


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var stockRouter = require('./routes/stock')
var stockpriceRouter = require('./routes/stockprice')
var marketRouter = require('./routes/markettrend')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);//companies
app.use('/users', usersRouter);
app.use('/stocks', stockRouter)//stocks
app.use('/', stockpriceRouter)// stockPrices
app.use('/', marketRouter) //  marketTrends
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
