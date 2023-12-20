const mongoose = require("mongoose");

const ActivitySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;
                return imageRegex.test(value);
            },
            message: 'La URL de la imagen proporcionada no es válida'
        }
    },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    category:  {
        type: String,
        enum: ["Museos", "Tours", "Naturaleza", "Música", "Lugares de interés", "Talleres", "Espectáculos", "Deporte"],
        default: "Other",
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
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
        required: true,
      },
      longitud: {
        type: Number,
        required: true
      }
});

const Activity = mongoose.model("Activity", ActivitySchema);
module.exports = Activity;