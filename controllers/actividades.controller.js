const Actividad = require('../models/Actividades.model');

module.exports.list = function(req, res, next) {
  Actividad.find()
    .then(actividades => res.render("actividades/actividades-list", { actividades }))
    .catch(error => next(error));
}

module.exports.getActividadDetail = (req, res, next) => {
    Actividad.findById(req.params.id)
      .then((actividad) => {
        if (actividad) {
          res.render('actividades/actividades-detail', { actividad });
        } else {
          next(createError(404, 'No hemos encontrado este smartphone'))
        }
      })
      .catch(err => next(err))
  }

  