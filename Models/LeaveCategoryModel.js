const mongoose = require("mongoose");
const { Schema } = mongoose;

const leaveCategorySchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        last_modified_date: {
            type: String,
        },
        total_days: {
            type: Number,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("leaveCategory", leaveCategorySchema);
