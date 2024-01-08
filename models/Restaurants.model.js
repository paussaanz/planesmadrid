const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Mediterránea", "Mejicana", "Italiana", "Japonesa", "Vegetariana"],
    default: "Other",
  },
  address: {
    street: String,
  },
  price: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
    imageUrl: {
      type: String,
      validate: {
          validator: function(value) {
              const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;
              return imageRegex.test(value);
          },
          message: 'La URL de la imagen proporcionada no es válida'
      }
  },
  description: {
    type: String,
},
url: {
  type: String,
  validate: {
      validator: function(value) {
          const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
          return urlRegex.test(value);
      },
      message: 'La URL proporcionada no es válida'
  }
},
  latitud: {
    type: Number,
  },
  longitud: {
    type: Number,
  }
});

RestaurantSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "restaurant",
  justOne: false,
});
const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;
