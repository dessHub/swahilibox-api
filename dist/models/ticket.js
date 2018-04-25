'use strict';

var mongoose = require('mongoose');

// define the schema for our ticket model
var ticketSchema = mongoose.Schema({
    eventId: String,
    email: String,
    name: String,
    ticketNo: String,
    title: String,
    start: String,
    end: String,
    venue: String,
    organiser: String

}, {
    timestamps: true
});

module.exports = mongoose.model('Ticket', ticketSchema);