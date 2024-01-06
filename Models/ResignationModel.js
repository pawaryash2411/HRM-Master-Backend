const mongoose = require("mongoose");

const resignationSchema = mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        employee: {
            type: String,
            required: true,
        },
        notice_date: {
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
module.exports = mongoose.model("resignation", resignationSchema);
