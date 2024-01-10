const mongoose = require('mongoose');
const Like = require('../models/Likes.model');
const Plan = require('../models/Plans.model'); // Asegúrate de importar el modelo de Plan

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
            // Incrementar el contador de likes y asociar al usuario en Plan
            return Plan.findByIdAndUpdate(planId, { $addToSet: { likedByUsers: userId }, $inc: { likesCount: 1 } });
          })
          .then(() => {
            res.redirect(`/plans/${planId}`);
          })
          .catch((err) => {
            console.error('Error updating Plan after creating like:', err);
            res.status(500).send('Internal Server Error');
          });
      } else {
        // Si ya existe un like, borrarlo
        return Like.findByIdAndDelete(like._id)
          .then(() => {
            console.log('Like deleted');
            // Decrementar el contador de likes y desasociar al usuario en Plan
            return Plan.findByIdAndUpdate(planId, { $pull: { likedByUsers: userId }, $inc: { likesCount: -1 } });
          })
          .then((updatedPlan) => {
            if (!updatedPlan) {
              throw createError(404, 'Plan not found');
            }
            res.redirect(`/plans/${planId}`);
          })
          .catch((err) => {
            console.error('Error updating Plan after deleting like:', err);
            res.status(500).send('Internal Server Error');
          });
      }
    })
    .catch((err) => {
      console.error('Error finding Like:', err);
      next(err);
    });
};