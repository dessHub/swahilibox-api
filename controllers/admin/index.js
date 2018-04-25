const Event   = require('../../models/event');
const User    = require('../../models/user');
const Ticket  = require('../../models/ticket');

let controller = {};

controller.index = (req, res) => {
    res.render('admin/index');
}

controller.members = (req, res) => {
    res.render('admin/members');
}

controller.getEvents = (req, res) => {
    Event.find({}, (err, events) => {
        if(err) throw err;

        res.render('admin/events', {events: events});
    })
}

controller.getCreate = (req, res) => {
    res.render('admin/create');
}

controller.addEvent = (req, res) => {
    let event       =  new Event();
  
    event.title =  req.body.title;
    event.venue =  req.body.venue;;
    event.description  =  req.body.description;
    event.start  =  req.body.start;;
    event.end  =  req.body.end;
    event.banner = req.body.avatar
    event.status = "Active";
    event.organiser = req.body.organiser;
    console.log(event);
    event.save((err, event) => {
        if(err){
            res.json(err);
        } else {
        res.render('admin', {
            success: true,
            event: event
        });
      }
    });
}

controller.getEvent = (req, res) => {
    let eventid = req.params.id;
    Event.findById(eventid, (err, event) => {
        if(err){
            res.json(err);
        }else{
            res.render('admin/event', {event: event});
         }
    })
}

module.exports = controller;