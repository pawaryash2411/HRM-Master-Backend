const mongoose = require("mongoose");

const projectClock = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    projectid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
    },
    time: {
      type: String,
      required: true,
    },
    browserName: {
      type: String,
    },
    platform: {
      type: String,
    },
    isMobile: {
      type: Boolean,
    },
  },

  { timestamps: true }
);
module.exports = mongoose.model("ProjectClock", projectClock);
