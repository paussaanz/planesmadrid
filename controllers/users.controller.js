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