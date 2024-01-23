const mongoose = require("mongoose");

const TrainingTypeSchema = mongoose.Schema({
    training_name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model("TrainingType", TrainingTypeSchema);
