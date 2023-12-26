const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurants.model');

module.exports.home = (req, res, next) => {
    Restaurant.find()
    .then(restaurants => res.render('restaurants/home', { restaurants }))
    .catch(error => next(error));
  };

module.exports.detail = (req, res, next) => {
  Restaurant.findById(req.params.id)
  .populate({
    path: 'comments',
    populate: {
      path: 'user',
    }
  })
  .then((restaurant) => {
    res.render("restaurants/detail", { restaurant });
  })
  .catch((err) => next(err));
}
