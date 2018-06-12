const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes
const index = require('./routes/index');
const users = require('./routes/users');
const questions = require('./routes/questions');
const answers = require('./routes/answers');
const quizzes = require('./routes/quizzes');
const userQuizzes = require('./routes/userQuizzes');

const app = express();
// Connect to appropriate DB based on env
// TODO: Update to read from env variable
mongoose.connect(process.env.DB_URL)
  .then(
    function() { // Connect success
      console.log('Connection successful')
    },
    function(err) { // Connection error
      console.error.bind(console, 'Connection error: ' + err);
    }
  );

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

// var corsOptions = {
//   origin: process.env.FRONTEND_URL,
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['X-Requested-With', 'X-HTTP-Method-Override', 'Content-Type', 'Accept'],
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/questions', questions);
app.use('/answers', answers);
app.use('/quizzes', quizzes);
app.use('/user-quizzes', userQuizzes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
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
