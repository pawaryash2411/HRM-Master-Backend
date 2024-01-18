const mongoose = require("mongoose");

const PayrollMonthlySchema = mongoose.Schema(
  {
    adminid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    pay_grade_name: {
      type: String,
    },
    gross_salary: {
      type: Number,
    },
    basic_salary: {
      type: Number,
    },
    percentange_of_basic: {
      type: String,
    },
    allowance: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "payroll-allowance",
      },
    ],
    deduction: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "payroll-deduction",
      },
    ],
    overtime_rate: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("payrollmonthly", PayrollMonthlySchema);
