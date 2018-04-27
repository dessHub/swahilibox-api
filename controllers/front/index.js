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

controller.getrsvp = (req, res) => {
    Event.findById(req.params.id, (err, event) => {
        if(err) throw err;
        
        res.render('front/rsvp', { message: req.flash('message'),event: event});  
    })
}

controller.rsvp = (req, res) => {
    let event_id = req.body.event_id;
    let email = req.body.email;
    let name = req.body.name;
    let random1 = Math.floor(Math.random() * 1000) + 1;
    let random2 = Math.floor(Math.random() * 1000) + 1;
    let randomno = random1.toString() + random2.toString();
    
    //let red = "/rsvp" + event_id;
    Ticket.find({"eventId":event_id, "email":email}, (err, ticket) => {
        if(err) throw err;
         let red = '/ticket' + event_id + '/' + email;
        if(ticket.length != 0){
            req.flash("message", "Email already has a ticket")
                        
            res.redirect(red);
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
               ticket.banner = event.banner;
               ticket.organiser = event.organiser;
               ticket.ticketNo = randomno;
       
               ticket.save((err, ticket) => {
                   if(err) throw err;
                   req.flash("message", "Successfully Booked A ticket. Check your email")
                   res.redirect(red);
               }) 
           })
        }
    })
}

controller.getticket = (req, res) => {
    let email = req.params.email;
    let event_id = req.params.id;

    Ticket.findOne({"eventId":event_id, "email":email}, (err, ticket) => {
       if(err) throw err;
       Event.findById(event_id, (err, event) => {
        if(err) throw err;

        res.render('front/ticket', {ticket: ticket, event:event});
    })
       
    });

}

module.exports = controller;