const mongoose = require("mongoose");

const PayrollSchema = mongoose.Schema(
  {
    adminid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    allowance: {
      type: String,
    },
    allowance_name: {
      type: String,
    },
    allowance_type: {
      type: String,
    },
    percentange_of_basic: {
      type: String,
    },
    limit_per_month: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("payroll", PayrollSchema);
