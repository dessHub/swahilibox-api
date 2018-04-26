'use strict';

var express = require('express');
var app = express.Router();

var controller = require('../controllers/api/index');

app.get('/events', function (req, res) {
    controller.getEvents(req, res);
});

app.get('/past_events', function (req, res) {
    controller.getPast(req, res);
});

app.post('/rsvp', function (req, res) {
    controller.rsvp(req, res);
});

module.exports = app;