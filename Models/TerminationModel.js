const mongoose = require("mongoose");

const TerminationSchema = mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
        },
        termination_to: {
            type: String,
            required: true,
        },
        termination_type: {
            type: String,
            required: true,
        },
        termination_date: {
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
module.exports = mongoose.model("termination", TerminationSchema);
