const mongoose = require('mongoose');
const Evento = require('../models/Eventos.model');

module.exports.home = (req, res, next) => {
    Evento.find()
    .then(eventos => res.render('eventos/home', { eventos }))
    .catch(error => next(error));
  };

module.exports.detail = (req, res, next) => {
  const { id } = req.params;
  console.log(id)
  Evento.findById(id)
  .then((evento) => {
    console.log(evento)
    res.render("eventos/detail", { evento });
  })
  .catch((err) => next(err));
}
