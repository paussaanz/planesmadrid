require("dotenv").config();

const express = require("express");
const hbs = require("hbs");
const logger = require("morgan");
const passport = require("passport");

require("./config/db.config"); // es como si pusieramos todas las lineas del db.confgi aquí, pero somos mejores que eso.
require("./config/passport.config");
require("./config/hbs.config");

const app = express();


const { planIsLiked } = require("./helpers");
hbs.registerHelper("planIsLiked", planIsLiked);

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper('json', function(context) {
  return JSON.stringify(context);
});

const { sessionConfig } = require("./config/session.config");
app.use(sessionConfig);
app.use((req, res, next) => {
  res.locals.currentUser = req.session.currentUser;
  next();
});

const router = require("./router/router");

app.use("/", router);

// Middleware to handle errors.
app.use((err, req, res, next) => {
  console.error(err);

  if (err.status === 404) {
    res.render('error', { title: err.message })
  } else {
    res.render('error');
  }
})

//Home router
router.get("/", (req, res, next) => {
  res.render("home")
})


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App running at port ${port} 🚀🚀`));