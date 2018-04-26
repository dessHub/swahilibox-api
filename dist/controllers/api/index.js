'use strict';

var Event = require('../../models/event');
var User = require('../../models/user');
var Ticket = require('../../models/ticket');

var controller = {};

controller.getEvents = function (req, res) {
    Event.find({}, function (error, events) {
        if (error) {
            res.jsond({
                status: "Error",
                message: error
            });
        } else {
            res.json(events);
        }
    });
};

controller.getPast = function (req, res) {
    Event.find({ "status": "Archived" }, function (error, events) {
        if (error) {
            res.jsond({
                status: "Error",
                message: error
            });
        } else {
            res.json(events);
        }
    });
};

controller.rsvp = function (req, res) {
    var event_id = req.body.event_id;
    var email = req.body.email;
    var name = req.body.name;
    var randomno = Math.random().toString();

    Event.findById(event_id, function (err, event) {
        if (err) throw err;
        var ticket = new Ticket();
        ticket.email = email;
        ticket.name = name;
        ticket.eventId = event_id;
        ticket.title = event.title;
        ticket.start = event.start;
        ticket.end = event.end;
        ticket.venue = event.venue;
        ticket.organiser = event.organiser;
        ticket.ticketNo = randomno;

        ticket.save(function (err, ticket) {
            if (err) throw err;

            res.json({
                status: "Success",
                ticket: ticket
            });
        });
    });
};

module.exports = controller;