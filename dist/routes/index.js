'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _user3 = require('../controllers/user');

var _user4 = _interopRequireDefault(_user3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


router.get('/', function (req, res) {
    _user4.default.index(req, res);
});

router.post('/adduser', function (req, res) {
    _user4.default.addUser(req, res);
});

exports.default = router;