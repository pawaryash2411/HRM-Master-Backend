const mongoose = require("mongoose");

const attendanceRuleModel = mongoose.Schema(
  {
    employeename: String,
    employeeid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    rules: [
      {
        date: String,
        ruleCategory: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "rule-category",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("attendance-rules", attendanceRuleModel);
