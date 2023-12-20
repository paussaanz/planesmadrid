const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurants.model');

module.exports.home = (req, res, next) => {
    Restaurant.find()
    .then(restaurants => res.render('restaurants/home', { restaurants }))
    .catch(error => next(error));
  };

module.exports.detail = (req, res, next) => {
  const { id } = req.params;
  console.log(id)
  Restaurant.findById(id)
  .then((restaurant) => {
    console.log(restaurant)
    res.render("restaurants/detail", { restaurant });
  })
  .catch((err) => next(err));
}
