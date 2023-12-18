const router = require("express").Router();
const actividadesController = require("../controllers/actividades.controller");
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middlewares");
const eventosController = require("../controllers/eventos.controller")
const restaurantesController = require("../controllers/restaurantes.controller")
const planesController = require("../controllers/planes.controller")


// Rutas a eventos
  router.get("/eventos", eventosController.home);
  router.get("/eventos/:id", eventosController.detail)

  //Rutas a restaurantes
  router.get("/restaurantes", restaurantesController.home);
  router.get("/restaurantes/:id", restaurantesController.detail)

  //Rutas a actividades
  router.get("/actividades", actividadesController.list);
  router.get("/actividades/:id", actividadesController.getActividadDetail);
  
  //Rutas a usuarios
  router.get("/login", authMiddleware.isNotAuthenticated, authController.login);
  router.post("/login", authMiddleware.isNotAuthenticated, authController.doLogin);
  router.get("/register", authMiddleware.isNotAuthenticated, authController.register);
  router.post("/register", authMiddleware.isNotAuthenticated, authController.doRegister);
  router.get("/logout", authMiddleware.isAuthenticated, authController.logout);
  router.get("/activate/:token", authController.activate);
  router.get("/profile", authMiddleware.isAuthenticated, usersController.profile);

  //Rutas a Crea tu plan
  ///////Crear
  router.get('/planes/form', authMiddleware.isAuthenticated, planesController.getPlanCreateForm);
  router.post('/planes', authMiddleware.isNotAuthenticated, planesController.doPlanCreate);
  router.get('/planes/:id', planesController.getPlanCreated);
  ///////Editar
  router.get('/planes/:id/edit', authMiddleware.isAuthenticated, planesController.getPlanEditForm);
  router.post('/planes/:id', authMiddleware.isAuthenticated, planesController.doPlanEdit);
  ///////Eliminar
  router.post('/planes/:id/delete', authMiddleware.isAuthenticated, planesController.deletePlan);
  //////Lista de creados
  router.get("/planes", planesController.list);
  
  module.exports = router;