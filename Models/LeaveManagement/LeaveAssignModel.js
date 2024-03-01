const mongoose = require("mongoose");

const LeaveAssignSchema = mongoose.Schema(
    {
        adminId: {
            type: String,
            require: true
        },
        employees: [],
        startDate: {
            type: String,
        },
        endDate: {
            type: Number,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("leave-assign", LeaveAssignSchema);
