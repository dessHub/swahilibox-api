
const mongoose = require('mongoose');

// define the schema for our ticket model
let ticketSchema = mongoose.Schema({ 
    eventId  : String,
    email    : String,
    name     : String,
    ticketNo : String

})

module.exports = mongoose.model('Ticket', ticketSchema);