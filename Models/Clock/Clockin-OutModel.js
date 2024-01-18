const mongoose = require("mongoose");

const leaveSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    adminid: {
      type: mongoose.Schema.Types.ObjectId ,
      ref: "admin",
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
module.exports = mongoose.model("register", leaveSchema);
