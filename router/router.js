const router = require("express").Router();
const activitiesController = require("../controllers/activities.controller");
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middlewares");
const eventsController = require("../controllers/events.controller")
const restaurantsController = require("../controllers/restaurants.controller")
const plansController = require("../controllers/plans.controller")
const upload = require("../config/storage.config");
const passport = require('passport');


const Activities = require('../models/Activities.model');
const Events = require('../models/Events.model');
const Restaurants = require('../models/Restaurants.model');

const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
]

router.get("/", (req, res, next) => {
  Promise.all([
      Activities.find().limit(5),
      Events.find().limit(5),
      Restaurants.find().limit(5)
  ])
      .then(([activities, events, restaurants]) => {
          const mixedItems = shuffle([...activities, ...events, ...restaurants]);
          res.render('home', { mixedItems });

      })
      .catch ((err) => {
          console.error(err);
          res.status(500).send('Error interno del servidor');
        })

});
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
// Google auth
router.get('/auth/google', authMiddleware.isNotAuthenticated, passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }));
router.get('/auth/google/callback', authMiddleware.isNotAuthenticated, authController.doLoginGoogle)

// Rutas a eventos
  router.get("/events", eventsController.home);
  router.get("/events/:id", eventsController.detail)

  //Rutas a restaurantes
  router.get("/restaurants", restaurantsController.home);
  router.get("/restaurants/:id", restaurantsController.detail)

  //Rutas a activities
  router.get("/activities", activitiesController.list);
  router.get("/activities/:id", activitiesController.getActivityDetail);
  
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
  router.get('/plans/form', authMiddleware.isAuthenticated, plansController.getPlanCreateForm);
  router.post('/plans', authMiddleware.isAuthenticated, plansController.doPlanCreate);
  router.get('/plans/:id', plansController.getPlanCreated);
  ///////Editar
  router.get('/plans/:id/edit', authMiddleware.isAuthenticated, upload.single('image'), plansController.getPlanEditForm);
  router.post('/plans/:id', authMiddleware.isAuthenticated, upload.single('image'), plansController.doPlanEdit);
  ///////Eliminar
  router.post('/plans/:id/delete', authMiddleware.isAuthenticated, plansController.deletePlan);
  //////Lista de creados
  router.get("/plans", plansController.list);
  
  module.exports = router;