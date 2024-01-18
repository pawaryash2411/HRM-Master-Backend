const mongoose = require("mongoose");

const PayrollHourlySchema = mongoose.Schema(
  {
    adminid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },

    hourly_rate: {
      type: Number,
    },

    pay_grade_name: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("payrollhourly", PayrollHourlySchema);
