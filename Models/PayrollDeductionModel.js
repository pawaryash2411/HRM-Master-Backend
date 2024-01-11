const mongoose = require("mongoose");

const PayrollDeductionSchema = mongoose.Schema(
    {
        adminid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "admin",
        },
        deduction: {
            type: String,
        },
        deduction_name: {
            type: String,
        },
        deduction_type: {
            type: String,
        },
        percentage_of_basic: {
            type: String,
        },
        limit_per_month: {
            type: String,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("payroll-deduction", PayrollDeductionSchema);
