const express = require('express');
const app     = express();
const router  = express.Router();
const Event   = require('../models/event');
const User    = require('../models/user');
const Ticket  = require('../models/ticket');
  
app.get('/events', (req, res, err) =>{
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
});

module.exports = app;
