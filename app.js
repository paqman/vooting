const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/vooting.db');
const userSessionMiddleware = require('./middleware/userSessionMiddleware');

const index = require('./routes/index');
const poll = require('./routes/poll')(db);
const vote = require('./routes/vote')(db);

db.on('trace', (query) => console.log(query));

global.CURRENT_POLL = process.argv[2];
console.log(`using ${process.argv[2]} poll`);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(userSessionMiddleware.handleUserSession);

app.use(express.static(path.join(__dirname, 'public')));


// app.use('/', index);
app.use('/api/poll', poll);
app.use('/api/vote', vote);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
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
