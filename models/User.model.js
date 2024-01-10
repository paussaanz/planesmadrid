const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const SALT_WORK_FACTOR = 10;
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [EMAIL_PATTERN, "Email is invalid"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [3, "Password must be 8 characters or longer"],
  },
  image: {
    type: String,
    validate: {
        validator: function (value) {
            const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;
            return imageRegex.test(value);
        },
        message: 'La URL de la imagen proporcionada no es válida'
    }
  },
  activationToken: {
    type: String,
    default: () => {
      return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      );
    },
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  
});

UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt
      .hash(this.password, SALT_WORK_FACTOR)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch((error) => next(error));
  } else {
    next();
  }
});

UserSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};

UserSchema.virtual('plans', {
  ref: 'Plan',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
})

UserSchema.virtual('savedPlans', {
  ref: 'Plan',
  localField: '_id',
  foreignField: 'savedByUsers',
  justOne: false,
});

UserSchema.virtual('likedPlans', {
  ref: 'Plan',
  localField: '_id',
  foreignField: 'savedByUsers',
  justOne: false,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;