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
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: String,
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
    description: {
        type: String,
        required: true
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
        required: true,
      },
      longitud: {
        type: Number,
        required: true
      }
});

EventSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "event",
    justOne: false,
  });

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
