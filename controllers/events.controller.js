const mongoose = require('mongoose');
const Event = require('../models/Events.model');

module.exports.home = (req, res, next) => {
    Event.find()
    .then(events => res.render('events/home', { events }))
    .catch(error => next(error));
  };

module.exports.detail = (req, res, next) => {
  Event.findById(req.params.id)
  .populate({
    path: 'comments',
    populate: {
      path: 'user',
    }
  })
  .then((event) => {
    console.log(event)
    res.render("events/detail", { event });
  })
  .catch((err) => next(err));
}
