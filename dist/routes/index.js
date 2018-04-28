'use strict';

var express = require('express');
var app = express.Router();
var controller = require('../controllers/front/index');

app.get('/', function (req, res) {
    controller.index(req, res);
});

app.get('/team', function (req, res) {
    controller.team(req, res);
});

app.get('/startups', function (req, res) {
    controller.startups(req, res);
});

app.get('/events', function (req, res) {
    controller.events(req, res);
});

app.get('/services', function (req, res) {
    controller.services(req, res);
});

app.get('/rsvp:id', function (req, res) {
    controller.getrsvp(req, res);
});

app.post('/rsvp', function (req, res) {
    controller.rsvp(req, res);
});

app.get('/ticket:id/:email', function (req, res) {
    controller.getticket(req, res);
});

module.exports = app;