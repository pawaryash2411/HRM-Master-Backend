const mongoose = require("mongoose");

const PerformanceAppraisalSchema = mongoose.Schema(
  {
    adminid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    company: {
      type: String,
    },
    empolyee: {
      type: String,
    },
    department: {
      type: String,
    },
    designation: {
      type: String,
    },
    appraisal_date: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("performance_appraisal", PerformanceAppraisalSchema);
