'use strict';

var Event = require('../../models/event');
var User = require('../../models/user');
var Ticket = require('../../models/ticket');

var controller = {};

controller.index = function (req, res) {
    res.render('admin/index');
};

controller.members = function (req, res) {
    res.render('admin/members');
};

controller.getEvents = function (req, res) {
    Event.find({}, function (err, events) {
        if (err) throw err;

        res.render('admin/events', { events: events });
    });
};

controller.getCreate = function (req, res) {
    res.render('admin/create');
};

controller.addEvent = function (req, res) {

    var event = new Event();
    event.title = req.body.title;
    event.venue = req.body.venue;;
    event.description = req.body.description;
    event.start = req.body.start;;
    event.end = req.body.end;
    event.banner = req.body.avatar;
    event.status = "Active";
    event.organiser = req.body.organiser;
    console.log(event);
    event.save(function (err, event) {
        if (err) {
            res.json(err);
        } else {
            var red = "'/admin/event" + event._id + "'";
            res.redirect(red);
        }
    });
};

controller.getEvent = function (req, res) {
    var eventid = req.params.id;
    Event.findById(eventid, function (err, event) {
        if (err) {
            res.json(err);
        } else {
            res.render('admin/event', { event: event });
        }
    });
};

controller.getEdit = function (req, res) {
    var eventid = req.params.id;
    Event.findById(eventid, function (err, event) {
        if (err) {
            res.json(err);
        } else {
            res.render('admin/edit', { event: event });
        }
    });
};

controller.postEdit = function (req, res) {
    var id = req.body.event_id;
    Event.findById(id, function (err, event) {
        if (err) throw err;
        event.title = req.body.title;
        event.venue = req.body.venue;;
        event.description = req.body.description;
        event.start = req.body.start;;
        event.end = req.body.end;
        event.banner = req.body.avatar;
        event.status = event.status;
        event.organiser = req.body.organiser;
        console.log(event);
        event.save(function (err) {
            if (err) throw err;
            var red_to = "'/admin/event" + id + "'";
            console.log(red_to);
            res.redirect(red_to);
        });
    });
};

module.exports = controller;