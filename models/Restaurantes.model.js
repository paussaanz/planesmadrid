const mongoose = require('mongoose');

const RestauranteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  cuisine: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipcode: String,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: 
    {
      user: String,
      text: String,
      rating: {
        type: Number,
        min: 0,
        max: 5,
      },
    },
});

const Restaurante = mongoose.model('Restaurante', RestauranteSchema);

module.exports = Restaurante;
