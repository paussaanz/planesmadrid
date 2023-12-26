const mongoose = require('mongoose');
const Like = require('../models/Likes.model');
const Plan = require('../models/Plans.model');
const createError = require('http-errors');

module.exports.planIsLikedByUser = function (options) {
  const { userId, likes } = options.hash;

  if (userId && likes && likes.some(like => like.user == userId)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};

module.exports.doLikeCreate = (req, res, next) => {
  const { planId } = req.params;
  const userId = req.session.currentUser._id;

  // Buscar si ya existe un like para el usuario y el plan específicos
  Like.findOne({ user: userId, plan: planId })
    .then((like) => {
      if (!like) {
        // Si no hay un like existente, crear uno nuevo
        return Like.create({ user: userId, plan: planId })
          .then(() => {
            console.log('Like created');
            // Obtener la información actualizada del plan
            return Plan.findById(planId).populate('likes');
          })
          .then((plan) => {
            // Renderizar la vista del plan con la información actualizada
            res.render('plans/detail', { plan, isPlanLiked: true });
          });
      } else {
        // Si ya existe un like, borrarlo
        return Like.findByIdAndDelete(like._id)
          .then(() => {
            console.log('Like deleted');
            // Obtener la información actualizada del plan
            return Plan.findById(planId).populate('likes');
          })
          .then((plan) => {
            // Renderizar la vista del plan con la información actualizada
            res.render('plans/detail', { plan, isPlanLiked: false });
          });
      }
    })
    .catch(err => next(err));
};