const mongoose = require("mongoose");

const categoriesAllowed = ["deportes", "música", "exposiciones temporales", "otro"];

const EventoSchema = mongoose.Schema({
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
});

const Evento = mongoose.model("Evento", EventoSchema);
module.exports = Evento;
