const router = require("express").Router();
const actividadesController = require("../controllers/actividades.controller");
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

router.get("/", (req, res, next) => {
    res.render("home");
  });

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