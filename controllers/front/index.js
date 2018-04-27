const Event   = require('../../models/event');
const User    = require('../../models/user');
const Ticket  = require('../../models/ticket');
const nodemailer = require('nodemailer');
const path           = require('path'),
  templatesDir   = path.join(__dirname, 'views')

const emailTemplates = require('email-templates');
let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'desshub95@gmail.com',
      pass: 'm@st3rm1nd.'
    }
  });

let controller = {};

controller.index = (req, res) => {
    res.render('front/index');
}

controller.team = (req, res) => {
    res.render('front/team');
}

controller.services = (req, res) => {
    res.render('front/services');
}

controller.startups = (req, res) => {
    res.render('front/startups');
}

controller.events = (req, res) => {
    Event.find({}, (err, events) => {
        if(err) throw err;

        res.render('front/events', {events: events});  
    })
}

controller.getrsvp = (req, res) => {
    Event.findById(req.params.id, (err, event) => {
        if(err) throw err;
        
        res.render('front/rsvp', { message: req.flash('message'),event: event});  
    })
}

controller.rsvp = (req, res) => {
    let event_id = req.body.event_id;
    let email = req.body.email;
    let name = req.body.name;
    let random1 = Math.floor(Math.random() * 1000) + 1;
    let random2 = Math.floor(Math.random() * 1000) + 1;
    let randomno = random1.toString() + random2.toString();
    
    //let red = "/rsvp" + event_id;
    Ticket.find({"eventId":event_id, "email":email}, (err, ticket) => {
        if(err) throw err;
         let red = '/ticket' + event_id + '/' + email;
        if(ticket.length != 0){
            req.flash("message", "Email already has a ticket")
                        
            res.redirect(red);
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
               ticket.banner = event.banner;
               ticket.organiser = event.organiser;
               ticket.ticketNo = randomno;
       
               ticket.save((err, ticket) => {
                   if(err) throw err;
                   req.flash("message", "Successfully Booked A ticket. Check your email")
                   res.redirect(red);
               }) 
           })
        }
    })
}

controller.getticket = (req, res) => {
    let email = req.params.email;
    let event_id = req.params.id;

    Ticket.findOne({"eventId":event_id, "email":email}, (err, ticket) => {
       if(err) throw err;
       Event.findById(event_id, (err, event) => {
        if(err) throw err;

        /*emailTemplates(templatesDir, function(err, template) {

            if (err) {
              console.log(err);
            } else {
          
            var locals = ticket;
          
              // Send a single email
              template('emails/ticket', locals, function(err, html, text) {
                if (err) {
                  console.log(err);
                } else {
                  transport.sendMail({
                    from: 'Swahilibox <no-reply@swahilibox.com>',
                    to: locals.email,
                    subject: 'TICKET BOOKING',
                    html: html,
                    text: text
                  }, function(err, responseStatus) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log(responseStatus.message);
                    }
                  });
                }
              });
            }
          }); */

        res.render('front/ticket', {ticket: ticket, event:event});
    })
       
    });

}

/*nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: 'bar@example.com, baz@example.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});*/

module.exports = controller;