'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
  // console.log('Working');
  _user2.default.find({}, function (err, users) {
    if (err) throw err;

    // object of all the users
    console.log(users);
  });
});

exports.default = router;