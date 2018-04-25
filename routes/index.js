const express = require('express');
const app = express.Router();
const controller = require('../controllers/front/index');

app.get('/', (req, res) => {
    controller.index(req,res);
})

app.get('/team', (req, res) => {
    controller.team(req, res);
})

app.get('/startups', (req, res) => {
    controller.startups(req, res);
})

app.get('/events', (req, res) => {
    controller.events(req, res);
})

app.get('/services', (req, res) => {
    controller.services(req, res);
})

app.post('/rsvp', (req, res) => {
    controller.rsvp(req, res);
})


module.exports = app;