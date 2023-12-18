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
  latitud: {
    type: Number,
    required: true,
  },
  longitud: {
    type: Number,
    required: true
  }
});

const Restaurante = mongoose.model('Restaurante', RestauranteSchema);

module.exports = Restaurante;
