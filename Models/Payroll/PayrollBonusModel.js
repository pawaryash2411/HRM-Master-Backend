const mongoose = require("mongoose");

const PayrollBonusSchema = mongoose.Schema(
  {
    adminid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    month: {
      type: String,
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
  { timestamps: true, strictPopulate: false }
);
module.exports = mongoose.model("payroll-Bonus", PayrollBonusSchema);
