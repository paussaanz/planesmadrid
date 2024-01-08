module.exports.planIsLiked = function (options) {
    const { userId, likes } = options.hash;
    console.log(userId, likes)

    if (userId && likes && likes.some(like => like.user == userId)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  }