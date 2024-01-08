const mongoose = require('mongoose');
const Event = require('../models/Events.model');

  module.exports.home = (req, res, next) => {
    // Obtén las categorías seleccionadas por el usuario
    const selectedCategories = req.body.category || [];
  
    // Construye la consulta para incluir solo las actividades de las categorías seleccionadas
    let query = {};
    if (selectedCategories.length > 0) {
      query = { category: { $in: selectedCategories } };
    }
  
    // Obtén todas las categorías disponibles
    const allCategories = ["Deportes", "Música", "Exposiciones temporales", "Arte", "Festivales", "Otro"];
  
    // Procesa las categorías para incluir la propiedad isChecked
    const processedCategories = allCategories.map(category => ({
      name: category,
      isChecked: selectedCategories.includes(category),
    }));
  
    // Ejecuta la consulta
    Event.find(query)
      .then(events => {
        // Renderiza la vista con las actividades filtradas y las categorías procesadas
        res.render("events/home", { events, categories: processedCategories });
      })
      .catch(error => {
        // Maneja cualquier error que pueda ocurrir
        next(error);
      });
  };
module.exports.detail = (req, res, next) => {
  Event.findById(req.params.id)
  .populate({
    path: 'comments',
    populate: {
      path: 'user',
    }
  })
  .then((event) => {
    console.log(event)
    res.render("events/detail", { event });
  })
  .catch((err) => next(err));
}
