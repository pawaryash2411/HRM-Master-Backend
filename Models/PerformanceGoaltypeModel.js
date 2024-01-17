const mongoose = require("mongoose");

const PerformanceGoaltypeSchema = mongoose.Schema(
  {
    adminid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    goal_type: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "performance_goaltype",
  PerformanceGoaltypeSchema
);
