// get all the packages we need
const express  = require('express'),
      app      = express(),
      dotenv = require('dotenv'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      flash    = require('connect-flash'),
      morgan       = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser   = require('body-parser'),
      session      = require('express-session'),
      path    = require('path');

const connectToDb = require('./config/database');

//dotenv.load();

const port     = process.env.PORT || 8080;

// configuration ===============================================================
mongoose.connect(connectToDb.url);

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(session({ secret: 'thisisasecret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
const auth = require('./routes/auth'); // load our routes and pass in our app and fully configured passport
const front = require('./routes/index');
const admin = require('./routes/admin');
const api  = require('./routes/api');
app.use('/', front);
app.use('/auth', auth);
app.use('/api', api);
app.use('/admin', admin);
// launch ======================================================================
app.listen(port);
console.log('It is live on port ' + port);

