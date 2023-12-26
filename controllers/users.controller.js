const Plan = require('../models/Plans.model');
const User = require('../models/User.model')

 module.exports.profile = (req, res, next) => {
    const userId = req.session.currentUser._id;
    User.findById(userId)
    .populate('plans') 
    .populate('savedPlans')   
    .then(user => {
      res.render("users/profile", { user });
    })
      .catch((err) => next(err));
  }

  module.exports.editProfileForm = (req, res, next) => {
    const userId = req.session.currentUser._id;
  
    User.findById(userId)
      .then(user => {
        res.render('users/form', { user });
      })
      .catch(err => next(err));
  };
  
  // Controlador para actualizar la información del perfil
  module.exports.doEditProfile = (req, res, next) => {
    const userId = req.session.currentUser._id;
    const { username, email } = req.body;
  
    // Actualizar la información del usuario en la base de datos
    User.findByIdAndUpdate(userId, { username, email }, { new: true })
      .then(updatedUser => {
        res.render('users/profile', updatedUser);
      })
      .catch(err => next(err));
  };
