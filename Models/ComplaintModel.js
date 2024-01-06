const mongoose = require("mongoose");

const ComplaintSchema = mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
        },
        complaintForm: {
            type: String,
            required: true,
        },
        complaintAgainst: {
            type: String,
            required: true,
        },
        complaintTitle: {
            type: String,
            required: true,
        },
        complaintDate: {
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
module.exports = mongoose.model("complaint", ComplaintSchema);
