'use strict';

var Event = require('../../models/event');
var User = require('../../models/user');
var Ticket = require('../../models/ticket');

var controller = {};

controller.getEvents = function (req, res) {
    Event.find({ "status": "Active" }, function (error, events) {
        if (error) {
            res.json({
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
            res.json({
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
    var random1 = Math.floor(Math.random() * 1000) + 1;
    var random2 = Math.floor(Math.random() * 1000) + 1;
    var randomno = random1.toString() + random2.toString();
    console.log(event_id);

    Ticket.find({ "eventId": event_id, "email": email }, function (err, ticket) {
        if (err) throw err;
        if (ticket.length != 0) {
            res.json({
                status: "Already",
                message: "Email already has a ticket",
                ticket: ticket.randomno
            });
        } else {
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
                ticket.banner = event.banner;

                ticket.save(function (err, ticket) {
                    if (err) throw err;

                    res.json({
                        status: "Success",
                        ticket: randomno
                    });
                });
            });
        }
    });
};

module.exports = controller;