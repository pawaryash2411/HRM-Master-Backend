const mongoose = require("mongoose");

const PayrollBonusSheetSchema = mongoose.Schema(
  {
    bonusid: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "payroll-Bonus",
      },
    ],
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
    strictPopulate: false,
  }
);
module.exports = mongoose.model("payroll-Bonussheet", PayrollBonusSheetSchema);
