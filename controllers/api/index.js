const Event   = require('../../models/event');
const User    = require('../../models/user');
const Ticket  = require('../../models/ticket');

let controller = {};

controller.getEvents = (req, res) => {
    Event.find({"Status":"Active"}, (error, events) => {
        if(error){
            res.json({
                status: "Error",
                message: error
            });
        }else{
        res.json(events);
        }
      });
}

controller.getPast = (req, res) => {
    Event.find({"status": "Archived"}, (error, events) => {
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
    let random1 = Math.floor(Math.random() * 1000) + 1;
    let random2 = Math.floor(Math.random() * 1000) + 1;
    let randomno = random1.toString() + random2.toString();
    console.log(event_id);

    Ticket.find({"eventId":event_id, "email":email}, (err, ticket) => {
        if(err) throw err;
        if(ticket.length != 0){
            res.json({
                status: "Success",
                message: "Email already has a ticket",
                ticket: ticket
            })
        }else{
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
    })

}


module.exports = controller;