

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
    res.render('front/events');
}

module.exports = controller;