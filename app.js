var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var clientRouter = require('./routes/v1/client');
var therapistRouter = require('./routes/v1/therapist');
var authRouter = require('./routes/v1/auth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/client', clientRouter);
app.use('/api/v1/therapist', therapistRouter);
app.use('/api/v1/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.error(err.stack);

  // render the error page
  res.status(err.status || 500).json({
    success: false,
    message: err.message
  })
});

module.exports = app;
