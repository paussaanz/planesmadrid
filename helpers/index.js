module.exports.planIsLiked = function (options) {
    const { userId, likes } = options.hash;

    if (userId && likes && likes.some(like => like.user == userId)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  }

  module.exports.planIsSaved = function (options) {
    const { userId, saves } = options.hash;

    console.log("******** ", userId, saves)
    if (userId && saves && saves.some(save => save.user == userId)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  }

  
  module.exports.userCreator = function(options) {
    const { planUser, currentUserId } = options.hash;
    if (planUser.toString() === currentUserId.toString()) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  }

