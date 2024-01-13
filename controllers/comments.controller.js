const Comment = require('../models/Comments.model');

module.exports.doCreateActivity = (req, res, next) => {
  console.log(req.body);

  const commentToCreate = req.body;
  commentToCreate.user = req.session.currentUser._id;
  commentToCreate.activity = req.params.id;

  Comment.create(req.body)
    .then(activity => {
      res.redirect(`/activities/${req.params.id}`);
    })
    .catch(next)
}
module.exports.doCreateEvent = (req, res, next) => {
    console.log(req.body);
  
    const commentToCreate = req.body;
    commentToCreate.user = req.session.currentUser._id;
    commentToCreate.event = req.params.id;
  
    Comment.create(req.body)
      .then(event => {
        res.redirect(`/events/${req.params.id}`);
      })
      .catch(next)
  }

module.exports.doCreateRestaurant = (req, res, next) => {
    const commentToCreate = req.body;
    commentToCreate.user = req.session.currentUser._id;
    commentToCreate.restaurant = req.params.id;
  
    Comment.create(commentToCreate)
    .then(restaurant => {
        res.redirect(`/restaurants/${req.params.id}`);
      })
      .catch(next)
  }

  module.exports.doCreatePlan = (req, res, next) => {
    console.log(req.body);
    const commentToCreate = req.body;
    commentToCreate.user = req.session.currentUser._id;
    commentToCreate.plan = req.params.id;
  
    Comment.create(commentToCreate)
      .then(plan => {
        res.redirect(`/plans/${req.params.id}`);
      })
      .catch(next)
  }

module.exports.delete = (req, res, next) => {
  const { id, type } = req.params;

  const getPathFromType = (type) => {
    if(type==="activity"){
      return activities
    }
    else{
      return type + "s"
    }
  }

  Comment.findByIdAndDelete(id)
  .then((deletedComment) => {
    res.redirect(`/${type}/${deletedComment[type]}`)
  })
  .catch(next);
}