const Plan = require('../models/Plans.model');
const User = require('../models/User.model')

module.exports.profile = (req, res, next) => {
  console.log('entro')
  User.findById(req.session.currentUser._id)
  .populate('plans')
  .then(user => {
    res.render("users/profile", { user });
   })
  }