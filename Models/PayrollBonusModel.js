
const mongoose = require("mongoose");

const PayrollBonusSchema = mongoose.Schema(
    {
        adminid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "admin",
        },
        festival_name: {
            type: String,
        },
        bonus_based_on: {
            type: String,
        },
        percentange_of_bonus: {
            type: String,
        },

    },
    { timestamps: true }
);
module.exports = mongoose.model("payroll-Bonus", PayrollBonusSchema);
