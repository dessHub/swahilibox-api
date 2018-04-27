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

controller.getrsvp = function (req, res) {
    Event.findById(req.params.id, function (err, event) {
        if (err) throw err;

        res.render('front/rsvp', { message: req.flash('message'), event: event });
    });
};

controller.rsvp = function (req, res) {
    var event_id = req.body.event_id;
    var email = req.body.email;
    var name = req.body.name;
    var random1 = Math.floor(Math.random() * 1000) + 1;
    var random2 = Math.floor(Math.random() * 1000) + 1;
    var randomno = random1.toString() + random2.toString();

    //let red = "/rsvp" + event_id;
    Ticket.find({ "eventId": event_id, "email": email }, function (err, ticket) {
        if (err) throw err;
        var red = '/ticket' + event_id + '/' + email;
        if (ticket.length != 0) {
            req.flash("message", "Email already has a ticket");

            res.redirect(red);
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
                ticket.banner = event.banner;
                ticket.organiser = event.organiser;
                ticket.ticketNo = randomno;

                ticket.save(function (err, ticket) {
                    if (err) throw err;
                    req.flash("message", "Successfully Booked A ticket. Check your email");
                    res.redirect(red);
                });
            });
        }
    });
};

controller.getticket = function (req, res) {
    var email = req.params.email;
    var event_id = req.params.id;

    Ticket.findOne({ "eventId": event_id, "email": email }, function (err, ticket) {
        if (err) throw err;
        Event.findById(event_id, function (err, event) {
            if (err) throw err;

            res.render('front/ticket', { ticket: ticket, event: event });
        });
    });
};

module.exports = controller;