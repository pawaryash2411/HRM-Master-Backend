const mongoose = require("mongoose");

const ProjectReportSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    branch_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "branch",
    },

    clock: [
      {
        clockInDetails: {
          browserName: String,
          platform: String,
          time: String,
          isMobile: Boolean,
        },
        clockouttime: {
          type: String,
          required: true,
        },
        totaltime: {
          type: String,
          required: true,
        },
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("ProjectReport", ProjectReportSchema);
