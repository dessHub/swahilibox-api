/* global process, describe, it */
'use strict';

process.env.NODE_ENV = 'test';
var mongoose = require("mongoose");
var Event = require('../models/event');
var Ticket = require('../models/ticket');

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server');
chai.should();

chai.use(chaiHttp);

describe('Mobile APP API', function () {
    beforeEach(function (done) {
        //Before each test we empty the database
        Event.remove({}, function (err) {
            done();
        });
    });

    describe('/GET Active Events', function () {
        it('it should GET all Upcoming the events', function (done) {
            chai.request(server).get('/api/events').end(function (err, res) {
                if (err) return done(err);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
    });
    describe('/GET Past Events', function () {
        it('it should GET all the past events', function (done) {
            chai.request(server).get('/api/past_events').end(function (err, res) {
                if (err) return done(err);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
    });
    describe('/POST /api/rsvp an event', function () {
        it('it should post a ticket details', function (done) {

            var event = new Event({
                title: "EventTitle",
                eventId: "985459485",
                start: "2018/04/20 9:30am",
                end: "2018/04/20 4:30pm",
                venue: "Sb Hub",
                organiser: "nodecircle",
                description: "Event description",
                banner: "path/to/image"
            });
            event.save(function (err, event) {
                var ticket = {
                    title: event.title,
                    email: "test@test.com",
                    name: "testname",
                    eventId: "985459485",
                    start: event.start,
                    end: event.end,
                    venue: event.venue,
                    organiser: event.venue,
                    ticketNo: 87587,
                    banner: event.banner
                };
                chai.request(server).post('/api/rsvp').send(ticket).end(function (err, res) {
                    if (err) throw err;
                    console.log(ticket);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    end();
                });
            });
        });
    });
});