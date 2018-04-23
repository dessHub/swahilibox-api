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

module.exports = controller;