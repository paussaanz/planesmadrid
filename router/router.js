const router = require("express").Router();
const activitiesController = require("../controllers/activities.controller");
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middlewares");
const eventsController = require("../controllers/events.controller")
const restaurantsController = require("../controllers/restaurants.controller")
const plansController = require("../controllers/plans.controller")
const commentsController = require("../controllers/comments.controller")
const upload = require("../config/storage.config");
const passport = require('passport');


const Activities = require('../models/Activities.model');
const Events = require('../models/Events.model');
const Restaurants = require('../models/Restaurants.model');

const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
]

//Aquí se renderiza en la vista home un mix de los post del resto de páginas
router.get("/", (req, res, next) => {
  Promise.all([
    Activities.find().sort({ inclusionDate: -1 }).limit(5),
    Events.find().sort({ inclusionDate: -1 }).limit(5),
    Restaurants.find().sort({ inclusionDate: -1 }).limit(5)
  ])
    .then(([activities, events, restaurants]) => {
      const mixedItems = ([...activities, ...events, ...restaurants]);
      res.render('home', { mixedItems });

    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error interno del servidor');
    })

});


// Google auth
router.get('/auth/google', authMiddleware.isNotAuthenticated, passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }));
router.get('/auth/google/callback', authMiddleware.isNotAuthenticated, authController.doLoginGoogle)

// Rutas a eventos
router.post("/events", eventsController.home);
router.get("/events", eventsController.home);
router.get("/events/:id", eventsController.detail)

//Rutas a restaurantes
router.post("/restaurants", restaurantsController.home)
router.get("/restaurants", restaurantsController.home);
router.get("/restaurants/:id", restaurantsController.detail)

//Rutas a activities
router.post("/activities", activitiesController.list);
router.get("/activities", activitiesController.list);
router.get("/activities/:id", activitiesController.getActivityDetail);

//Rutas a usuarios
router.get("/login", authMiddleware.isNotAuthenticated, authController.login);
router.post("/login", authMiddleware.isNotAuthenticated, authController.doLogin);
router.get("/register", authMiddleware.isNotAuthenticated, authController.register);
router.post("/register", authMiddleware.isNotAuthenticated, authController.doRegister);
router.get("/logout", authMiddleware.isAuthenticated, authController.logout);
router.get("/activate/:token", authController.activate);

//Rutas a perfil y editar
router.get("/profile", authMiddleware.isAuthenticated, usersController.profile);
router.get("/users/:id/form", authMiddleware.isAuthenticated, usersController.editProfileForm)
router.post("/profile", usersController.doEditProfile);

//Rutas a Crea tu plan
///////Crear
router.get('/plans/form', authMiddleware.isAuthenticated, plansController.getPlanCreateForm);
router.post('/plans', authMiddleware.isAuthenticated, upload.single('image'), plansController.doPlanCreate);
router.get('/plans/:id', plansController.getPlanDetail);
///////Editar
router.get('/plans/:id/edit', authMiddleware.isAuthenticated, plansController.getPlanEditForm);
router.post('/plans/:id', authMiddleware.isAuthenticated, upload.single('image'), plansController.doPlanEdit);
///////Eliminar
router.post('/plans/:id/delete', authMiddleware.isAuthenticated, plansController.deletePlan);
//////Lista de creados
router.get("/plans", plansController.list);

// Comments
router.post("/comments/:id/activity", authMiddleware.isAuthenticated, commentsController.doCreateActivity);
router.post("/comments/:id/event", authMiddleware.isAuthenticated, commentsController.doCreateEvent);
router.post("/comments/:id/plan", authMiddleware.isAuthenticated, commentsController.doCreatePlan);
router.post("/comments/:id/restaurant", authMiddleware.isAuthenticated, commentsController.doCreateRestaurant);
//router.get("/comments/:id/delete", authMiddleware.isAuthenticated, commentsController.delete);

//Rutas a like
router.post('/plans/:id/like', authMiddleware.isAuthenticated, plansController.likedPlans);
router.post('/plans/:id/dislike', authMiddleware.isAuthenticated, plansController.dislikePlans);

// Save plans
router.post("/plans/:id/save", authMiddleware.isAuthenticated, plansController.saveAndListPlans)
router.post("/plans/:id/unsave", authMiddleware.isAuthenticated, plansController.unsavePlan)





module.exports = router;