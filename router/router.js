const router = require("express").Router();
const actividadesController = require("../controllers/actividades.controller");
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middlewares");
const eventosController = require("../controllers/eventos.controller")
const restaurantesController = require("../controllers/restaurantes.controller")
const passport = require('passport');


const Actividades = require('../models/Actividades.model');
const Eventos = require('../models/Eventos.model');
const Restaurantes = require('../models/Restaurantes.model');

const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
]

router.get("/", (req, res, next) => {
  Promise.all([
      Actividades.find().limit(5),
      Eventos.find().limit(5),
      Restaurantes.find().limit(5)
  ])
      .then(([actividades, eventos, restaurantes]) => {
          const mixedItems = shuffle([...actividades, ...eventos, ...restaurantes]);
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
  router.get("/eventos", eventosController.home);
  router.get("/eventos/:id", eventosController.detail)

  //Rutas a restaurantes
  router.get("/restaurantes", restaurantesController.home);
  router.get("/restaurantes/:id", restaurantesController.detail)

  router.get("/actividades", actividadesController.list);

  router.get("/actividades/:id", actividadesController.getActividadDetail);
  
  
  router.get("/login", authMiddleware.isNotAuthenticated, authController.login);
  router.post("/login", authMiddleware.isNotAuthenticated, authController.doLogin);
  router.get("/register", authMiddleware.isNotAuthenticated, authController.register);
  router.post("/register", authMiddleware.isNotAuthenticated, authController.doRegister);
  router.get("/logout", authMiddleware.isAuthenticated, authController.logout);
  router.get("/activate/:token", authController.activate);

  router.get("/profile", authMiddleware.isAuthenticated, usersController.profile);

  
  module.exports = router;