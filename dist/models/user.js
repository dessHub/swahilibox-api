'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

// create a schema
// grab the things we need
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// the schema is useless so far
// we need to create a model using it
var User = _mongoose2.default.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;