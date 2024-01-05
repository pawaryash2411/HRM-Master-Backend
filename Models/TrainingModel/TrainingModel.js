const mongoose = require("mongoose");

const TrainingSchema = mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
        },
        trainingType: {
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
        start_date: {
            type: String,
            required: true,
        },
        end_date: {
            type: String,
            required: true,
        },
        trainingCost: {
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
module.exports = mongoose.model("training", TrainingSchema);
