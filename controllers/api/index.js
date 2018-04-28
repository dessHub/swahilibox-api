const Event   = require('../../models/event');
const User    = require('../../models/user');
const Ticket  = require('../../models/ticket');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path           = require('path');
const templatesDir   = path.join(__dirname, '../../views/emails/');
const Email = require('email-templates');

let transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

let controller = {};

controller.getEvents = (req, res) => {
    Event.find({"status":"Active"}, (error, events) => {
        if(error){
            res.json({
                status: "Error",
                message: error
            });
        }else{
        res.json(events);
        }
      });
}

controller.getPast = (req, res) => {
    Event.find({"status": "Archived"}, (error, events) => {
        if(error){
            res.json({
                status: "Error",
                message: error
            });
        }else{
        res.json(events);
        }
      });
}

controller.rsvp = (req, res) => {
    let event_id = req.body.event_id;
    let email = req.body.email;
    let name = req.body.name;
    let random1 = Math.floor(Math.random() * 1000) + 1;
    let random2 = Math.floor(Math.random() * 1000) + 1;
    let randomno = random1.toString() + random2.toString();
    console.log(event_id);

    Ticket.find({"eventId":event_id, "email":email}, (err, ticket) => {
        if(err) throw err;
        let red = '/api/ticket' + event_id + '/' + email;
        if(ticket.length != 0){
            res.json({
                status: "Already",
                message: "Email already has a ticket",
                ticket: ticket.randomno
            })
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
               ticket.organiser = event.organiser;
               ticket.ticketNo = randomno;
               ticket.banner = event.banner;
       
               ticket.save((err, ticket) => {
                   if(err) throw err;
       
                   res.redirect(red);
               }) 
           })
        }
    })

}

controller.getticket = (req, res) => {
    let useremail = req.params.email;
    let event_id = req.params.id;

    Ticket.findOne({"eventId":event_id, "email":useremail}, (err, ticket) => {
       if(err) throw err;
       Event.findById(event_id, (err, event) => {
        if(err) throw err;

        nodemailer.createTestAccount((err, account) => {
        

            let html = ejs.renderFile(templatesDir+ "tickets/html.ejs", {ticket:ticket,event:event});
             let promise1 = Promise.resolve(html);
             let htmlvalue = "";
             promise1.then(function(value) {
                
                htmlvalue = ejs.render(value);
                console.log(htmlvalue);
                // setup email data with unicode symbols
                let mailOptions = {
                    from: '"Swahilibox 👻" <nonreply@swahilibox.com>', // sender address
                    to: ticket.email, // list of receivers
                    subject: 'Ticket Booking', // Subject line]
                    html: htmlvalue
                };
            
                // send mail with defined transport object
                transport.sendMail(mailOptions, (error, info) => {
                    if(error) {
                        console.log('Message not sent');
                        console.log(error);
                        return false;
                      }
                      else{
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
        })
    })
       
    });

}


module.exports = controller;