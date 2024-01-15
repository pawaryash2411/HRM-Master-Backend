const mongoose = require("mongoose");

const PayrollBonusSheetSchema = mongoose.Schema(
  {
    bonusid: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "payroll-bonus",
      },
    ],
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("payroll-Bonussheet", PayrollBonusSheetSchema);
