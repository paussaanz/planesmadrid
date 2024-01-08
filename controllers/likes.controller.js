const mongoose = require('mongoose');
const Like = require('../models/Likes.model');
const createError = require('http-errors');

  module.exports.doLikeCreate = (req, res, next) => {
    const { planId } = req.params;
    const userId = req.session.currentUser._id;

    // Buscar si ya existe un like para el usuario y el plan específicos
    Like.findOne({ user: userId, plan: planId })
      .then(like => {
        if (!like) {
          // Si no hay un like existente, crear uno nuevo
          return Like.create({ user: userId, plan: planId })
            .then(like => {
              console.log('Like created', like);
              res.redirect(`/plans/${planId}`);
            });
        } else {
          // Si ya existe un like, borrarlo
          return Like.findByIdAndDelete(like._id)
            .then(like => {
              console.log('Like deleted', like);
              res.redirect(`/plans/${planId}`);
            });
        }
      })
      .catch(err => next(err));
  };