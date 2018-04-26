const express = require('express'),
      app = express.Router(),
      passport = require('passport'),
      User    = require('../models/user');

    // =====================================
    // HOME PAGE  ========
    // =====================================

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', (req, res) => {
            console.log('receiving')
        // render the page and pass in any flash data if it exists
        res.json({ message: req.flash('loginMessage') });
    });

    app.get('/front/login', (req, res) => {
        console.log('here');
        res.render('front/login', { message: req.flash('loginMessage') });
    })

     // process the web login form
    app.post('/front/login', passport.authenticate('local-login', {
        successRedirect : '/admin', // redirect to the secure profile section
        failureRedirect : '/auth/front/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

        // process the mobile login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : 'auth/profile', // redirect to the secure profile section
        failureRedirect : 'auth/faillogin', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/faillogin', (req, res) => {
        res.json({
                status: "fail",
                message: req.flash('loginMessage')
               
            })
    })
    
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the mobile signup form
    app.get('/signup', (req, res) => {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // show the web signup form
    app.get('/front/signup', (req, res) => {

        // render the page and pass in any flash data if it exists
        res.render('front/signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the mobile signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the web signup form
    app.post('/front/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/auth/front/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, (req, res) => {
        res.json({
            status: "Success",
            message: req.flash('loginMessage')
             // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

        //Admin can change roles for users via this route
    app.get('/role/:email/:role', (req, res) => {
        var role = req.params.role;
        var email = req.params.email;
          console.log(email);
        User.getUserByUsername(email, (err, user) => {
            if(err) return err;
            console.log(user);
              if(user){
                if(role == 'Admin'){
                  user.update({"local.role":role}, (err, user) => {
                    if(err) return(err)
                      res.redirect('/');
                  });
                }
              }else{
                res.send("user does not exist");
            }
        });
      
     })


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


module.exports = app;