const mongoose = require("mongoose");

const StaffRoleSchema = mongoose.Schema(
    {
        adminid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "admin",
        },
        roleName: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("staffRole", StaffRoleSchema);
