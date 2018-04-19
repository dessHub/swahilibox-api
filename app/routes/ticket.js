const express = require('express');
const app     = express();
const router  = express.Router();
//const Event   = require('.../app/models/event');
//const User    = require('../app/models/user');
//const Ticket  = require('../app/models/ticket');

app.use('/api', router);

router.get('/events', (req, res) => {
    res.json({
        events: "events"
    });
})

module.exports = app;
