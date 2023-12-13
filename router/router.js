const router = require("express").Router();
const eventosController = require("../controllers/eventos.controller")
const restaurantesController = require("../controllers/restaurantes.controller")


// Rutas a eventos
  router.get("/eventos", eventosController.home);
  router.get("/eventos/:id", eventosController.detail)

  //Rutas a restaurantes
  router.get("/restaurantes", restaurantesController.home);
  router.get("/restaurantes/:id", restaurantesController.detail)

  module.exports = router;