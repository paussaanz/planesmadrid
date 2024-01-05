const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurants.model');

module.exports.home = function(req, res, next) {
  // Obtén las categorías seleccionadas por el usuario
  const selectedCategories = req.body.category || [];

  // Construye la consulta para incluir solo las actividades de las categorías seleccionadas
  let query = {};
  if (selectedCategories.length > 0) {
    query = { category: { $in: selectedCategories } };
  }

  // Obtén todas las categorías disponibles
  const allCategories = ['Mejicana', 'Italiana', 'Japonesa', 'Mediterránea', 'Vegetariana'];

  // Procesa las categorías para incluir la propiedad isChecked
  const processedCategories = allCategories.map(category => ({
    name: category,
    isChecked: selectedCategories.includes(category),
  }));

  // Ejecuta la consulta
  Restaurant.find(query)
    .then(restaurants => {
      // Renderiza la vista con las actividades filtradas y las categorías procesadas
      res.render("restaurants/home", { restaurants, categories: processedCategories });
    })
    .catch(error => {
      // Maneja cualquier error que pueda ocurrir
      next(error);
    });
};

module.exports.detail = (req, res, next) => {
  Restaurant.findById(req.params.id)
  .populate({
    path: 'comments',
    populate: {
      path: 'user',
    }
  })
  .then((restaurant) => {
    res.render("restaurants/detail", { restaurant });
  })
  .catch((err) => next(err));
}