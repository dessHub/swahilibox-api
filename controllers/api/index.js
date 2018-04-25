const Event   = require('../../models/event');
const User    = require('../../models/user');
const Ticket  = require('../../models/ticket');

let controller = {};

controller.getEvents = (req, res) => {
    Event.find({}, (error, events) => {
        if(error){
            res.jsond({
                status: "Error",
                message: error
            });
        }else{
        res.json(events);
        }
      });
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