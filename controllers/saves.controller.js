const mongoose = require('mongoose');
const Save = require('../models/Saves.model');
const createError = require('http-errors');

  module.exports.doSaveCreate = (req, res, next) => {
    const { planId } = req.params;
    const userId = req.session.currentUser._id;

    // Buscar si ya existe un like para el usuario y el plan específicos
    Save.findOne({ user: userId, plan: planId })
      .then(save => {
        if (!save) {
          // Si no hay un like existente, crear uno nuevo
          return Save.create({ user: userId, plan: planId })
            .then(save => {
              console.log('Save created', save);
              res.redirect(`/plans/${planId}`);
            });
        } else {
          // Si ya existe un like, borrarlo
          return Save.findByIdAndDelete(save._id)
            .then(save => {
              console.log('Save deleted', save);
              res.redirect(`/plans/${planId}`);
            });
        }
      })
      .catch(err => next(err));
  };