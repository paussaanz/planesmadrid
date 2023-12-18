const mongoose = require('mongoose');
const Plan = require('../models/Planes.model');
const createError = require('http-errors');


module.exports.getPlanCreateForm = (req, res, next) => {
        res.render('planes/form');
  }

  module.exports.getPlanCreated = (req, res, next) => {
    Plan.findById(req.params.id)
.then(PlanDB => {
  if (PlanDB) {
    res.render('planes/detail' , { PlanDB });
  } else {
    next(createError(404, 'No hemos encontrado este plan'))
  }
})
.catch(err => next(err))
}

  
  module.exports.doPlanCreate = (req, res, next) => {
    Plan.create(req.body)
      .then(PlanDB => {
        res.redirect(`/planes/${PlanDB._id}`);
      })
      .catch(err => next(err))
  }
  
  module.exports.getPlanEditForm = (req, res, next) => {
    const id = req.params.id;
  
    Plan.findById(id)
      .then((plan) => {
        if (plan) {
          res.render("planes/edit", { plan });
        } else {
         
          next(createError(404, 'No hemos encontrado este Plan'));
        }
      })
      .catch((err) => next(err));
};

module.exports.doPlanEdit = (req, res, next) => {
  const id = req.params.id;

  Plan.findByIdAndUpdate(id, req.body, { new: true })
    .then((plan) => {
      if (plan) {
        res.redirect(`/planes/${plan._id}`);
      } else {
        next(createError(404, 'No hemos encontrado este Plan'));
      }
    })
    .catch((err) => next(err));
};
  module.exports.deletePlan = (req, res, next) => {
    Plan.findByIdAndDelete(req.params.id)
      .then(PlanDB => {
        if (PlanDB) {
          res.redirect('/planes');
        } else {
          next(createError(404, 'No hemos encontrado este plan'))
        }
      })
      .catch(err => next(err))
  }

module.exports.list = function(req, res, next) {
    Plan.find()
    .then((planes) => 
    { res.render("planes/list", { planes })
    console.log(planes)
    })
    .catch(err => next(err))
}