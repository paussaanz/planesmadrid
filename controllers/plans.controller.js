const mongoose = require('mongoose');
const Plan = require('../models/Plans.model');
const User = require('../models/User.model');
const Like = require('../models/Likes.model');
const createError = require('http-errors');


//Aquí te dejo también la parte del list con e lpopulate de los likes
module.exports.list = function(req, res, next) {
  Plan.find()
  .populate('likes')
  .then((plans) => 
  { res.render("plans/list", { plans })
  console.log(plans)
  })
  .catch(err => next(err))
}

module.exports.getPlanCreateForm = (req, res, next) => {
  const categoryEnumValues = Plan.schema.path('category').enumValues;
  res.render('plans/form', {categoryEnumValues});
}

module.exports.doPlanCreate = (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path;
  }
  Plan.create({ ...req.body, user: req.session.currentUser._id })
    .then(plan => {
      res.redirect(`/plans/${plan._id}`);
    })
    .catch(err => next(err))
}



module.exports.getPlanDetail = (req, res, next) => {
  Plan.findById(req.params.id)
  .populate({
    path: 'comments',
    populate: {
      path: 'user',
    }
  })
  .populate("likes")
  .then(plan => {
      const userId = req.session.currentUser._id;
      res.render('plans/detail', {plan});
     
    })
    .catch(err => next(err))
}

module.exports.getPlanEditForm = (req, res, next) => {
  const id = req.params.id;
  const categoryEnumValues = Plan.schema.path('category').enumValues;

  Plan.findById(id)
    .then((plan) => {
      if (plan) {
        res.render("plans/form", { plan, categoryEnumValues, isEdit: true });
      } else {
        next(createError(404, 'No hemos encontrado este plan'));
      }
    })
    .catch((err) => next(err));
};

module.exports.doPlanEdit = (req, res, next) => {
  const id = req.params.id;

  Plan.findByIdAndUpdate(id, req.body, { new: true })
    .then((plan) => {
      if (plan) {
        res.redirect(`/plans/${plan._id}`);
      } else {
        next(createError(404, 'No hemos encontrado este plan'));
      }
    })
    .catch((err) => next(err));
};

module.exports.deletePlan = (req, res, next) => {
  Plan.findByIdAndDelete(req.params.id)
    .then(plan => {
      if (plan) {
        res.redirect('/plans');
      } else {
        next(createError(404, 'No hemos encontrado este plan'))
      }
    })
    .catch(err => next(err))
}

//Este controlador se ocupa de listar los planes guardados por un usuario en su perfil
module.exports.saveAndListPlans = function (req, res, next) {
  const planId = req.params.id;
  const userId = req.session.currentUser._id;

  Plan.findByIdAndUpdate(planId, { $addToSet: { savedByUsers: userId } })
    .then(() => {
      console.log(req.session.currentUser)
      return User.findById(userId).populate('savedPlans');
    })
    .then(user => {
      res.redirect(`/plans/${planId}`);
    })
    .catch(err => next(err))
};

//Este controlador se ocupa de eliminar el plan guardado
module.exports.unsavePlan = function (req, res, next) {
  const planId = req.params.id;
  const userId = req.session.currentUser._id;

  Plan.findByIdAndUpdate(planId, { $pull: { savedByUsers: userId } })
    .then(() => {
      return User.findById(userId).populate('savedPlans');
    })
    .then(user => {
      res.redirect(`/plans/${planId}`);
    })
    .catch(err => next(err))
};

