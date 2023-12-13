const mongoose = require('mongoose');
const Restaurante = require('../models/Restaurantes.model');

module.exports.home = (req, res, next) => {
    Restaurante.find()
    .then(restaurantes => res.render('restaurantes/home', { restaurantes }))
    .catch(error => next(error));
  };

module.exports.detail = (req, res, next) => {
  const { id } = req.params;
  console.log(id)
  Restaurante.findById(id)
  .then((restaurante) => {
    console.log(restaurante)
    res.render("restaurantes/detail", { restaurante });
  })
  .catch((err) => next(err));
}
