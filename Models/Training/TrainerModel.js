const mongoose = require("mongoose");

const TrainerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:
    {
        type: String,
        required: true,
        unique: true,
    },
    phone:
    {
        type: Number,
        required: true,
    },
    company:
    {
        type: String,
        required: true,
    },
    expertise:
    {
        type: String,
        required: true,
    },
    address:
    {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model("Trainer", TrainerSchema);
