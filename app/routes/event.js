const express = require('express');
const app     = express();
const router  = express.Router();
const faker   = require('faker');
const Event   = require('../models/event');
const User    = require('../models/user');

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.post('/create-events', (req, res) => {
    
      event       =  new Event();
  
      event.title =  req.body.title;
      event.venue =  req.body.venue;;
      event.description  =  req.body.description;
      event.start  =  req.body.start;;
      event.end  =  req.body.end;
      event.status = "Active";
      event.organiser = "Nodecircle";
      event.save();
    
  });
  
  app.get('/events', function(req, res, err){
    Event.find({}, function(error, events){
      if(error) res.send(error);
      res.json(events);
    });
  });

module.exports = app;
