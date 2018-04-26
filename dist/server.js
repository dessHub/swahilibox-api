'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _connect = require('./config/connect');

var _connect2 = _interopRequireDefault(_connect);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _connectFlash = require('connect-flash');

var _connectFlash2 = _interopRequireDefault(_connectFlash);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

(0, _connect2.default)();

app.use((0, _cors2.default)());
// set up our express application
app.use((0, _morgan2.default)('dev')); // log every request to the console
app.use((0, _cookieParser2.default)()); // read cookies (needed for auth)
app.use((0, _bodyParser2.default)()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

// required for passport
app.use((0, _expressSession2.default)({ secret: 'thisisasecret' })); // session secret
app.use(_passport2.default.initialize());
app.use(_passport2.default.session()); // persistent login sessions
app.use((0, _connectFlash2.default)()); // use connect-flash for flash messages stored in session

// routes ======================================================================
var auth = require('./routes/authfile'); // load our routes and pass in our app and fully configured passport
var front = require('./routes/index');
var admin = require('./routes/admin');
var api = require('./routes/api');
app.use('/', front);
app.use('/auth', auth);
app.use('/api', api);
app.use('/admin', admin);

app.listen(process.env.PORT || 3000, function () {
    console.log('starter listening on port 3000');
});