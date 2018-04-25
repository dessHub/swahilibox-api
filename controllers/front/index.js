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

controller.rsvp = (req, res) => {
    let event_id = req.body.event_id;
    let email = req.body.email;
    let name = req.body.name;

    Event.findById(event_id, (err, event) => {
         if(err) throw err;
        let ticket = new Ticket();
        ticket.email = email;
        ticket.name  = name;
        ticket.eventId = event_id;
        ticket.title = event.title;
        ticket.start = event.start;
        ticket.end  = event.end;
        ticket.venue = event.venue;
        ticket.organiser = event.organiser;
        ticket.ticketNo = 8989;

        ticket.save((err, ticket) => {
            if(err) throw err;

            res.json({
                status: "Success",
                ticket: ticket
            })
        }) 
    })
}

module.exports = controller;