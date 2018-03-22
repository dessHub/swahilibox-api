"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = {};

controller.index = function (req, res) {
  _user2.default.find({}, function (err, users) {
    if (err) throw err;

    console.log(users);
    res.send(users);
  });
};

controller.addUser = function (req, res) {
  console.log("her");
  var user = (0, _user2.default)({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  });

  user.save(function (err, user) {
    if (err) throw err;

    console.log(user);
    res.send(user);
  });
};

exports.default = controller;