'use strict';

var Event = require('../../models/event');
var User = require('../../models/user');
var Ticket = require('../../models/ticket');

var controller = {};

controller.index = function (req, res) {

    Event.count({ "status": "Active" }, function (err, active) {
        if (err) throw err;

        Event.count({ "status": "Archived" }, function (err, past) {
            if (err) throw err;

            Event.find({ "status": "Active" }, function (err, events) {
                if (err) throw err;

                User.count({}, function (err, users) {
                    if (err) throw err;

                    res.render('admin/index', { past: past, active: active, users: users, events: events });
                });
            });
        });
    });
};

controller.members = function (req, res) {
    User.find({}, function (err, users) {
        if (err) throw err;

        res.render('admin/members', { users: users });
    });
};

controller.getEvents = function (req, res) {
    console.log(Date());
    var currentDate = Date();
    Event.find({}, function (err, events) {
        if (err) throw err;

        res.render('admin/events', { events: events, currentDate: currentDate });
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
    event.start = req.body.start;
    event.end = req.body.end;
    event.banner = req.body.avatar;
    event.status = "Notactive";
    event.organiser = req.body.organiser;

    event.save(function (err, event) {
        if (err) {
            res.json(err);
        } else {
            var red = "/admin/event" + event._id;
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
            Ticket.find({ "eventId": eventid }, function (err, tickets) {
                if (err) throw err;
                console.log(tickets);
                res.render('admin/event', { event: event, tickets: tickets });
            });
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
        event.save(function (err) {
            if (err) throw err;
            var red_to = "/admin/event" + id;
            res.redirect(red_to);
        });
    });
};

controller.publish = function (req, res) {
    var id = req.params.id;
    Event.findById(id, function (err, event) {
        if (err) throw err;
        event.status = "Active";
        event.save(function (err) {
            if (err) throw err;
            var red_to = "/admin/event" + id;
            res.redirect(red_to);
        });
    });
};

controller.cancel = function (req, res) {
    var id = req.params.id;
    Event.findById(id, function (err, event) {
        if (err) throw err;
        event.status = "Cancelled";
        event.save(function (err) {
            if (err) throw err;
            var red_to = "/admin/event" + id;
            res.redirect(red_to);
        });
    });
};

controller.archives = function (req, res) {
    var id = req.params.id;
    console.log(id);
    Event.findById(id, function (err, event) {
        if (err) throw err;
        console.log(event);
        event.update({ "status": "Archived" }, function (err) {
            if (err) throw err;
            var red_to = "/admin/event" + id;
            res.redirect(red_to);
        });
    });
};

controller.remove = function (req, res) {
    var id = req.params.id;
    console.log(id);
    Event.remove({ _id: id }, function (err) {

        res.redirect('/admin/events');
    });
};

controller.changerole = function (req, res) {
    var role = req.params.role;
    var email = req.params.email;
    console.log(email);
    User.getUserByUsername(email, function (err, user) {
        if (err) return err;
        console.log(user);
        if (user) {

            user.update({ "local.role": role }, function (err, user) {
                if (err) return err;
                res.redirect('/');
            });
        } else {
            res.send("user does not exist");
        }
    });
};

controller.userremove = function (req, res) {
    var id = req.params.id;
    console.log(id);
    User.remove({ _id: id }, function (err) {

        res.redirect('/admin/members');
    });
};

module.exports = controller;