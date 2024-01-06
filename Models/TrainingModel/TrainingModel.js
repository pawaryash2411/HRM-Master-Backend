const mongoose = require("mongoose");

const TrainingSchema = mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
        },
        training_type: {
            type: String,
            required: true,
        },
        trainer: {
            type: String,
            required: true,
        },
        employee: {
            type: String,
            required: true,
        },
        startdate: {
            type: String,
            required: true,
        },
        enddate: {
            type: String,
            required: true,
        },
        training_cost: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("traininglist", TrainingSchema);
