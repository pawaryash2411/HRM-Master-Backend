const mongoose = require("mongoose");

const PerformanceIndicatorSchema = mongoose.Schema(
  {
    adminid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    company: {
      type: String,
    },
    designation: {
      type: String,
    },
    department: {
      type: String,
    },
    added_by: {
      type: String,
    },
    created_by: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "performance_indicator",
  PerformanceIndicatorSchema
);
