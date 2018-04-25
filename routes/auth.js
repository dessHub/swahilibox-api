const express = require('express'),
      app = express.Router(),
      passport = require('passport')

module.exports = () => {

    // =====================================
    // HOME PAGE  ========
    // =====================================

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', (req, res) => {

        // render the page and pass in any flash data if it exists
        res.json({ message: req.flash('loginMessage') });
    });

    app.get('/front/login', (req, res) => {

        res.render('front/login', { message: req.flash('loginMessage') });
    })

     // process the web login form
    app.post('/front/login', passport.authenticate('web-login', {
        successRedirect : '/admin', // redirect to the secure profile section
        failureRedirect : '/front/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

        // process the mobile login form
    app.post('/login', passport.authenticate('mobile-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/faillogin', // redirect back to the signup page if there is an error
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
    // show the signup form
    app.get('/signup', (req, res) => {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('mobile-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the web signup form
    app.post('/front/signup', passport.authenticate('web-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/front/signup', // redirect back to the signup page if there is an error
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
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
