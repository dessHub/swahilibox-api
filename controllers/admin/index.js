const Event   = require('../../models/event');
const User    = require('../../models/user');
const Ticket  = require('../../models/ticket');

let controller = {};

controller.index = (req, res) => {

    Event.count({"status":"Active"}, (err, active) => {
        if(err) throw err;

        Event.count({"status":"Archived"}, (err, past) => {
            if(err) throw err;
    
            User.count({}, (err, users) => {
                if(err) throw err;

                res.render('admin/index', {past: past,active:active,users:users}); 
            })
        })  
    })
    
}

controller.members = (req, res) => {
    User.find({}, (err, users) => {
        if(err) throw err;

        res.render('admin/members', {users:users});
    })    
}

controller.getEvents = (req, res) => {
    console.log(Date());
    let currentDate = Date();
    Event.find({}, (err, events) => {
        if(err) throw err;

        res.render('admin/events', {events: events,currentDate:currentDate});
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
    event.start  =  req.body.start;
    event.end  =  req.body.end;
    event.banner = req.body.avatar
    event.status = "Notactive";
    event.organiser = req.body.organiser;

    event.save((err, event) => {
        if(err){
            res.json(err);
        } else {
            let red = "/admin/event" + event._id ;
        res.redirect(red)
      }
    });
}

controller.getEvent = (req, res) => {
    let eventid = req.params.id;
    Event.findById(eventid, (err, event) => {
        if(err){
            res.json(err);
        }else{
            Ticket.find({"eventId":eventid}, (err, tickets) => {
                if(err) throw err;
                console.log(tickets);
                res.render('admin/event', {event: event, tickets:tickets});
            })
            
         }
    })
}

controller.getEdit = (req, res) => {
    let eventid = req.params.id;
    Event.findById(eventid, (err, event) => {
        if(err){
            res.json(err);
        }else{
            res.render('admin/edit', {event: event});
         }
    })
}

controller.postEdit = (req, res) => {
    let id = req.body.event_id;
    Event.findById(id, (err, event)=>{
        if(err) throw err;
        event.title =  req.body.title;
        event.venue =  req.body.venue;;
        event.description  =  req.body.description;
        event.start  =  req.body.start;;
        event.end  =  req.body.end;
        event.banner = req.body.avatar
        event.status = event.status;
        event.organiser = req.body.organiser;
        event.save((err) => {
        if(err) throw err;
        let red_to = "/admin/event" + id ;
        res.redirect(red_to);     
         })
     })
}

controller.publish = (req, res) => {
    let id = req.params.id;
    Event.findById(id, (err, event) => {
        if(err) throw err;
        event.status = "Active";
        event.save((err) => {
            if(err) throw err;
            let red_to = "/admin/event" + id ;
            res.redirect(red_to);
        })
    })
}

controller.cancel = (req, res) => {
    let id = req.params.id;
    Event.findById(id, (err, event) => {
        if(err) throw err;
        event.status = "Cancelled";
        event.save((err) => {
            if(err) throw err;
            let red_to = "/admin/event" + id ;
            res.redirect(red_to);
        })
    })
}

controller.archives = (req, res) => {
    let id = req.params.id;
    console.log(id);
    Event.findById(id, (err, event) => {
        if(err) throw err;
        console.log(event);
        event.update({"status":"Archived"}, (err) => {
            if(err) throw err;
            let red_to = "/admin/event" + id ;
            res.redirect(red_to);
        })
    })
}

controller.remove = (req, res) => {
    let id = req.params.id;
    console.log(id);
    Event.remove({_id: id}, (err) => {
        
        res.redirect('/admin/events');
    })
}

controller.changerole = (req, res) => {
    var role = req.params.role;
    var email = req.params.email;
      console.log(email);
    User.getUserByUsername(email, (err, user) => {
        if(err) return err;
        console.log(user);
          if(user){
            
              user.update({"local.role":role}, (err, user) => {
                if(err) return(err)
                  res.redirect('/');
              });
             
          }else{
            res.send("user does not exist");
        }
    });
}

controller.userremove = (req, res) => {
    let id = req.params.id;
    console.log(id);
    User.remove({_id: id}, (err) => {
        
        res.redirect('/admin/members');
    })
}


module.exports = controller;

