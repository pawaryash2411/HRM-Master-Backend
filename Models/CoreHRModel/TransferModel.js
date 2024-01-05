const mongoose = require("mongoose");

const TransferSchema = mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
        },
        employee: {
            type: String,
            required: true,
        },
        from_department: {
            type: String,
            required: true,
        },
        to_department: {
            type: String,
            required: true,
        },
        date: {
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
module.exports = mongoose.model("transfer", TransferSchema);
