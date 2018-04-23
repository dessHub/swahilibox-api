const Event   = require('../../models/event');
const User    = require('../../models/user');
const Ticket  = require('../../models/ticket');

let controller = {};

controller.getEvents = (req, res) => {
    Event.find({}, (err, events) => {
        if(err) throw err;

        res.json(events);
    })
}

controller.addEvent = (req, res) => {
    event       =  new Event();
  
    event.title =  req.body.title;
    event.venue =  req.body.venue;;
    event.description  =  req.body.description;
    event.start  =  req.body.start;;
    event.end  =  req.body.end;
    event.banner = req.body.banner
    event.status = "Active";
    event.organiser = req.body.organiser;
    event.save((err, event) => {
        if(err){
            res.json(err);
        } else {
        res.json({
            success: true,
            event: event
        });
      }
    });
}

controller.getEvents = (req, res) => {
    let eventid = req.params.id;
    Event.findById(eventid, (err, event) => {
        if(err){
            res.json(err);
        }else{
            res.json(event);
         }
    })
}

module.exports = controller;