const express = require('express');
const app = express.Router();
const controller = require('../controllers/admin/index');

app.get('/events', (req, res) => {
    controller.getEvents(req, res);
})

app.post('/addevent', (req, res) => {
    controller.addEvent(req, res);
})

app.get('/event:id', (req, res) => {
    controller.getEvent(req, res);
})

module.exports = app;