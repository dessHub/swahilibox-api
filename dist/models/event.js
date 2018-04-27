'use strict';

var mongoose = require('mongoose');

// define the schema for our event model
var eventSchema = mongoose.Schema({
      title: String,
      organiser: String,
      venue: String,
      start: String,
      end: String,
      banner: String,
      description: String,
      status: String

}, {
      timestamps: true
});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Event', eventSchema);