const mongoose = require("mongoose");

const AdminRoleSchema = mongoose.Schema(
    {
        superadminid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "admin",
        },
        adminRoleName: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("adminRole", AdminRoleSchema);
