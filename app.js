var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var test = require('./routes/test');
var blog = require('./routes/blog');
var tag = require('./routes/tag');
var cat = require('./routes/cat');
var mail = require('./routes/mail');
var live = require('./routes/live');
//set DEBUG=myapp & npm start
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 加密..
app.use(session({secret:"test"}));

app.use('/', index);
app.use('/users', users);
app.use('/blog', blog);
app.use('/test', test);
app.use('/tag',tag);
app.use('/cat',cat);
app.use('/mail',mail);
app.use('/live',live);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
