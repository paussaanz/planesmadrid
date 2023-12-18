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
    location: {
        type: String,
        required: true
    },
    category:  {
        type: String,
        enum: ["Museos", "Tours", "Naturaleza", "Música", "Lugares de interés", "Talleres", "Espectáculos"],
        default: "Other",
    },
    description: {
        type: String,
        required: true
    },
});

const Plan = mongoose.model("Plan", PlanSchema);
module.exports = Plan;