module.exports.planIsLiked = function (options) {
    const { userId, likes } = options.hash;
    console.log(userId, likes)

    if (userId && likes && likes.some(like => like.user == userId)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  }

  module.exports.planIsSaved = function (options) {
    const { userId, saves } = options.hash;
    console.log(userId, saves)

    if (userId && saves && saves.some(save => save.user == userId)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  }

