'use strict';

var Event = require('../../models/event');
var User = require('../../models/user');
var Ticket = require('../../models/ticket');

var controller = {};

controller.index = function (req, res) {
    res.render('front/index');
};

controller.team = function (req, res) {
    res.render('front/team');
};

controller.services = function (req, res) {
    res.render('front/services');
};

controller.startups = function (req, res) {
    res.render('front/startups');
};

controller.events = function (req, res) {
    Event.find({}, function (err, events) {
        if (err) throw err;

        res.render('front/events', { events: events });
    });
};

controller.rsvp = function (req, res) {
    var event_id = req.body.event_id;
    var email = req.body.email;
    var name = req.body.name;

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
        ticket.ticketNo = 8989;

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