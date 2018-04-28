'use strict';

var Event = require('../../models/event');
var User = require('../../models/user');
var Ticket = require('../../models/ticket');
var nodemailer = require('nodemailer');
var ejs = require('ejs');
var path = require('path');
var templatesDir = path.join(__dirname, '../../views/emails/');
var Email = require('email-templates');

var transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

var controller = {};

controller.getEvents = function (req, res) {
    Event.find({ "status": "Active" }, function (error, events) {
        if (error) {
            res.json({
                status: "Error",
                message: error
            });
        } else {
            res.json(events);
        }
    });
};

controller.getPast = function (req, res) {
    Event.find({ "status": "Archived" }, function (error, events) {
        if (error) {
            res.json({
                status: "Error",
                message: error
            });
        } else {
            res.json(events);
        }
    });
};

controller.rsvp = function (req, res) {
    var event_id = req.body.event_id;
    var email = req.body.email;
    var name = req.body.name;
    var random1 = Math.floor(Math.random() * 1000) + 1;
    var random2 = Math.floor(Math.random() * 1000) + 1;
    var randomno = random1.toString() + random2.toString();
    console.log(event_id);

    Ticket.find({ "eventId": event_id, "email": email }, function (err, ticket) {
        if (err) throw err;
        var red = '/api/ticket' + event_id + '/' + email;
        if (ticket.length != 0) {
            res.json({
                status: "Already",
                message: "Email already has a ticket",
                ticket: ticket.randomno
            });
        } else {
            Event.findById(event_id, function (err, event) {
                if (err) throw err;
                var ticket = new Ticket();
                ticket.email = email;
                ticket.name = name;
                ticket.eventId = event_id;
                ticket.title = event.title;
                ticket.start = event.start;
                ticket.end = event.end;
                ticket.venue = event.venue;
                ticket.organiser = event.organiser;
                ticket.ticketNo = randomno;
                ticket.banner = event.banner;

                ticket.save(function (err, ticket) {
                    if (err) throw err;

                    res.redirect(red);
                });
            });
        }
    });
};

controller.getticket = function (req, res) {
    var useremail = req.params.email;
    var event_id = req.params.id;

    Ticket.findOne({ "eventId": event_id, "email": useremail }, function (err, ticket) {
        if (err) throw err;
        Event.findById(event_id, function (err, event) {
            if (err) throw err;

            nodemailer.createTestAccount(function (err, account) {

                var html = ejs.renderFile(templatesDir + "tickets/html.ejs", { ticket: ticket, event: event });
                var promise1 = Promise.resolve(html);
                var htmlvalue = "";
                promise1.then(function (value) {

                    htmlvalue = ejs.render(value);
                    console.log(htmlvalue);
                    // setup email data with unicode symbols
                    var mailOptions = {
                        from: '"Swahilibox 👻" <nonreply@swahilibox.com>', // sender address
                        to: ticket.email, // list of receivers
                        subject: 'Ticket Booking', // Subject line]
                        html: htmlvalue
                    };

                    // send mail with defined transport object
                    transport.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log('Message not sent');
                            console.log(error);
                            return false;
                        } else {
                            console.log('Message sent: ' + info.response);
                            console.log(info);
                            return true;
                        };
                    });
                });
            });

            res.json({
                status: "Success",
                ticket: ticket.ticketNo
            });
        });
    });
};

module.exports = controller;