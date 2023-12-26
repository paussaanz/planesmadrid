const hbs = require('hbs');
const likesController = require('../controllers/likes.controller'); // Ajusta la ruta según tu estructura de archivos

hbs.registerHelper('planIsLikedByUser', likesController.planIsLikedByUser);