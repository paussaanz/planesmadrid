const Activity = require('../models/Activities.model');

module.exports.list = function(req, res, next) {
  Activity.find()
    .then(activities => res.render("activities/activities-list", { activities }))
    .catch(error => next(error));
}

module.exports.getActivityDetail = (req, res, next) => {
    Activity.findById(req.params.id)
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      }
    })
      .then((activity) => {
          res.render('activities/activities-detail', { activity });
      })
      .catch(err => next(err))
  }