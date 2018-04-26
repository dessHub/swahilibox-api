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
    let email = req.body.user_email;
    let name = req.body.user_name;
    let randomno = Math.random().toString();

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
        ticket.ticketNo = randomno;

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