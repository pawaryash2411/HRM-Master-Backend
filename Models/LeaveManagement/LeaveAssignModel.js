const mongoose = require("mongoose");

const LeaveAssignSchema = mongoose.Schema(
    {
        adminId: {
            type: String,
        },
        employees: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        }],
        branch_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "branch",
        }],
        startDate: {
            type: String,
        },
        endDate: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("leave-alloted", LeaveAssignSchema);
