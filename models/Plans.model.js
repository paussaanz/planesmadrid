const mongoose = require("mongoose");
const PlanSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Deporte', 'Cultura', 'Gastronomía', 'Relax', 'Espectáculos', 'Otros'],
        default: "Other",
    },
    description: {
        type: String,
        required: true
    },
    user: {
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
            validator: function (value) {
                const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;
                return imageRegex.test(value);
            },
            message: 'La URL de la imagen proporcionada no es válida'
        }
    },
    savedByUsers: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    likesCount: { type: Number, default: 0 }

},
{
    virtual: true,
    toObject: true,
  }
  );

PlanSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "plan",
    justOne: false,
});
PlanSchema.virtual('likes', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'plan',
    justOne: false,
  })




const Plan = mongoose.model("Plan", PlanSchema);
module.exports = Plan;