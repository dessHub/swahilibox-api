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
      event.banner = req.body.banner
      event.status = "Active";
      event.organiser = "Nodecircle";
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
    
  });
  
  app.get('/events', (req, res, err) => {
    Event.find({}, (error, events) => {
      if(error) res.send(error);
      res.json(events);
    });
  });

  app.get('/event:id', (req, res) => {
      let eventid = req.params.id;
      Event.findById(eventid, (err, event) => {
          if(err){
              res.json(err);
          }else{
              res.json(event);
           }
      }) 
  })

module.exports = app;
