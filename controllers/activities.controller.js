const Activity = require('../models/Activities.model');

module.exports.list = function(req, res, next) {
  Activity.find()
    .then(activities => res.render("activities/activities-list", { activities }))
    .catch(error => next(error));
}

module.exports.getActivityDetail = (req, res, next) => {
    Activity.findById(req.params.id)
      .then((activity) => {
        if (activity) {
          res.render('activities/activities-detail', { activity });
        } else {
          next(createError(404, 'No hemos encontrado este smartphone'))
        }
      })
      .catch(err => next(err))
  }

  