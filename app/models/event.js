
var mongoose = require('mongoose');

// define the schema for our event model
var eventSchema = mongoose.Schema({
      title        : String,
      organiser    : String,
      venue        : String,
      start        : Date,
      end          : Date,
      banner       : String,
      description  : String,
      status       : String

});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Event', eventSchema);
