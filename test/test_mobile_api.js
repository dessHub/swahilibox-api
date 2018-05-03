/* global process, describe, it */
'use strict';

process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
let Event = require('../models/event');
let Ticket = require('../models/ticket');

const chai = require('chai');
const chaiHttp = require('chai-http');

let server = require('../server');
chai.should();

chai.use(chaiHttp);

describe('Mobile APP API', () => {
    beforeEach((done) => { //Before each test we empty the database
        Event.remove({}, (err) => { 
           done();         
        });     
    });

  describe('/GET Active Events', () => {
      it('it should GET all Upcoming the events', (done) => {
            chai.request(server)
            .get('/api/events')
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  describe('/GET Past Events', () => {
      it('it should GET all the past events', (done) => {
            chai.request(server)
            .get('/api/past_events')
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  describe('/POST /api/rsvp an event', () => {
      it('it should post a ticket details', (done) => {

          let event = new Event({
            title: "EventTitle",
            eventId: "985459485",
            start: "2018/04/20 9:30am",
            end:  "2018/04/20 4:30pm",
            venue: "Sb Hub",
            organiser: "nodecircle",
            description: "Event description",
            banner: "path/to/image"
        });
        event.save((err, event) => {
            let ticket = {
                title: event.title,
                email: "test@test.com",
                name: "testname",
                eventId: "985459485",
                start: event.start,
                end:  event.end,
                venue: event.venue,
                organiser: event.venue,
                ticketNo: 87587,
                banner: event.banner
            };
          chai.request(server)
          .post('/api/rsvp')
          .send(ticket)
          .end((err, res) => {
              if(err) throw err;
              console.log(ticket);
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('array');
            end();
          })
        })  
      })
  })

});