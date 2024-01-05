const mongoose = require("mongoose");

const promotionSchema = mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
        },
        employee: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        promotion_date: {
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
module.exports = mongoose.model("promotion", promotionSchema);
