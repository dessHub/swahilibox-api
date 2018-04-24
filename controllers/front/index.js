const Event   = require('../../models/event');
const User    = require('../../models/user');
const Ticket  = require('../../models/ticket');

let controller = {};

controller.index = (req, res) => {
    res.render('front/index');
}

controller.team = (req, res) => {
    res.render('front/team');
}

controller.services = (req, res) => {
    res.render('front/services');
}

controller.startups = (req, res) => {
    res.render('front/startups');
}

controller.events = (req, res) => {
    Event.find({}, (err, events) => {
        if(err) throw err;

        res.render('front/events', {events: events});  
    })
}

module.exports = controller;