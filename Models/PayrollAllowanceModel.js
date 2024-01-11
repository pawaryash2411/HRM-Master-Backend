const mongoose = require("mongoose");

const PayrollAllowanceSchema = mongoose.Schema(
  {
    adminid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    allowance_name: {
      type: String,
    },
    allowance_type: {
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
module.exports = mongoose.model("payroll-allowance", PayrollAllowanceSchema);
