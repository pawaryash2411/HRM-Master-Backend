const mongoose = require("mongoose");

const PerformanceGoaltrackingSchema = mongoose.Schema(
  {
    adminid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    company: {
      type: String,
    },
    goal_type: {
      type: String,
    },
    target_achievement: {
      type: String,
    },
    start_date: {
      type: String,
    },
    end_date: {
      type: String,
    },
    progress: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "performance_goaltracking",
  PerformanceGoaltrackingSchema
);
