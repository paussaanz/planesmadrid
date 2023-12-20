const mongoose = require("mongoose");

const categoriesAllowed = ["Deportes", "Música", "Exposiciones temporales", "Otro", "Arte", "Festivales"];

const EventSchema = mongoose.Schema({
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
    category: {
        type: String, 
        enum: categoriesAllowed,
        required: true
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

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
