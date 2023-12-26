const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Activity",
    default: null
  },
  event:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    default: null
  },
  restaurant:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    default: null
  },
  plan:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    default: null
  }
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;