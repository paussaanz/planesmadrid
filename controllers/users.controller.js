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
    .populate("plans")
    .populate('savedPlans')  
      .then(user => {
        res.render('users/form', { user });
      })
      .catch(err => next(err));
  };
  
  // Controlador para actualizar la información del perfil
  module.exports.doEditProfile = (req, res, next) => {
    const userId = req.session.currentUser._id;
    const { username, email } = req.body;
  
    let profilePictureUrl;
  
    // Verificar si se cargó un archivo y subirlo a Cloudinary
    if (req.file) {
      cloudinary.uploader.upload(req.file.path)
        .then(result => {
          // Guardar la URL de la imagen de perfil
          profilePictureUrl = result.secure_url;
  
          // Eliminar la imagen anterior si existe en Cloudinary
          if (req.session.currentUser.profilePicturePublicId) {
            return cloudinary.uploader.destroy(req.session.currentUser.profilePicturePublicId);
          }
        })
        .then(() => {
          // Actualizar la información del usuario en la base de datos con la nueva URL de la imagen
          return User.findByIdAndUpdate(
            userId,
            { username, email, profilePicture: profilePictureUrl },
            { new: true }
          )
          .populate('plans')
          .populate('savedPlans');
        })
        .then(updatedUser => {
          req.session.currentUser = updatedUser; // Actualizar el usuario en la sesión
          res.render('users/profile', { currentUser: updatedUser });
        })
        .catch(err => next(err));
    } else {
      // No se cargó ninguna imagen, actualizar solo el nombre de usuario y el correo electrónico
      User.findByIdAndUpdate(userId, { username, email }, { new: true })
        .populate('plans')
        .populate('savedPlans')
        .then(updatedUser => {
          req.session.currentUser = updatedUser; // Actualizar el usuario en la sesión
          res.render('users/profile', { currentUser: updatedUser });
        })
        .catch(err => next(err));
    }
  };
