'use strict';

var express = require('express');
var app = express.Router();
var controller = require('../controllers/admin/index');

var aws = require('aws-sdk');
/*
 * Configure the AWS region of the target bucket.
 * Remember to change this to the relevant region.
 */
aws.config.region = 'eu-west-1';

/*
 * Load the S3 information from the environment variables.
 */
var S3_BUCKET = process.env.S3_BUCKET;

app.get('/', isLoggedIn, isAdmin, function (req, res) {
    controller.index(req, res);
});

app.get('/members', isLoggedIn, isAdmin, function (req, res) {
    controller.members(req, res);
});

app.get('/events', isLoggedIn, isAdmin, function (req, res) {
    controller.getEvents(req, res);
});

app.get('/create', isLoggedIn, isAdmin, function (req, res) {
    controller.getCreate(req, res);
});

app.get('/sign-s3', function (req, res) {
    var s3 = new aws.S3();
    var fileName = req.query['file-name'];
    var fileType = req.query['file-type'];
    var s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, function (err, data) {
        if (err) {
            console.log(err);
            return res.end();
        }
        var returnData = {
            signedRequest: data,
            url: 'https://' + S3_BUCKET + '.s3.amazonaws.com/' + fileName
        };
        res.write(JSON.stringify(returnData));
        res.end();
    });
});

app.post('/create', isLoggedIn, isAdmin, function (req, res) {
    controller.addEvent(req, res);
});

app.get('/event:id', isLoggedIn, isAdmin, function (req, res) {
    controller.getEvent(req, res);
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) return next();

    // if they aren't redirect them to the home page
    res.redirect('/auth/front/login');
}

function isAdmin(req, res, next) {
    var user = req.user;
    if (user.local.role == "Admin") {
        return next();
    }

    res.redirect('/');
}

module.exports = app;