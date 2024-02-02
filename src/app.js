const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const routes = require('./routes');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const {sessionSecret, cookieSecret} = require('./config');
const {connectRedis, connectPostgres} = require('./utils/database');
const redisClient = connectRedis();
connectPostgres();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(cookieSecret));

app.use(session({
  secret: sessionSecret,
  saveUninitialized: false,
  resave: false,
  store: new RedisStore({
    client: redisClient
  })
}));

app.use(routes);

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
  });
});

module.exports = app;
