const Activity = require('../models/Activities.model');

module.exports.list = function(req, res, next) {
  // Obtén las categorías seleccionadas por el usuario
  const selectedCategories = req.body.category || [];

  // Construye la consulta para incluir solo las actividades de las categorías seleccionadas
  let query = {};
  if (selectedCategories.length > 0) {
    query = { category: { $in: selectedCategories } };
  }

  // Obtén todas las categorías disponibles
  const allCategories = ['Museos', 'Tours', 'Naturaleza', 'Música', 'Lugares de Interés', 'Talleres', 'Espectáculos', 'Deporte'];

  // Procesa las categorías para incluir la propiedad isChecked
  const processedCategories = allCategories.map(category => ({
    name: category,
    isChecked: selectedCategories.includes(category),
  }));

  // Ejecuta la consulta
  Activity.find(query)
    .then(activities => {
      // Renderiza la vista con las actividades filtradas y las categorías procesadas
      res.render("activities/activities-list", { activities, categories: processedCategories });
    })
    .catch(error => {
      // Maneja cualquier error que pueda ocurrir
      next(error);
    });
};

module.exports.getActivityDetail = (req, res, next) => {
    Activity.findById(req.params.id)
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      }
    })
      .then((activity) => {
          res.render('activities/activities-detail', { activity });
      })
      .catch(err => next(err))
}