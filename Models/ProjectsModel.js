const mongoose = require("mongoose");

const ProjectsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    cost: {
      type: String,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    employeeId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: "branch" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("projects", ProjectsSchema);
