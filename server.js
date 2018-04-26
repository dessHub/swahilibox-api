
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectToDb from './config/connect';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import passport from 'passport';
import flash    from 'connect-flash';
import cookieParser from 'cookie-parser';
import session      from 'express-session';
import path    from 'path';

const app = express();

connectToDb();

app.use(cors());
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
const auth = require('./routes/authfile'); // load our routes and pass in our app and fully configured passport
const front = require('./routes/index');
const admin = require('./routes/admin');
const api  = require('./routes/api');
app.use('/', front);
app.use('/auth', auth);
app.use('/api', api);
app.use('/admin', admin);

app.listen(process.env.PORT || 3000, () => {
    console.log('starter listening on port 3000');
});
