const mongoose = require("mongoose");
//  enum: ["Museos", "Tours", "Naturaleza", "Música", "Lugares de interés", "Talleres", "Espectáculos"],
const PlanSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    category:  {
        type: String,
      
        default: "Other",
    },
    description: {
        type: String,
        required: true
    },
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    like:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Like'
    },
    image: {
        type: String,
        validate: {
            validator: function(value) {
                const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;
                return imageRegex.test(value);
            },
            message: 'La URL de la imagen proporcionada no es válida'
        }
}

});
PlanSchema.virtual('likes', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'like',
    justOne: false,
  })


const Plan = mongoose.model("Plan", PlanSchema);
module.exports = Plan;