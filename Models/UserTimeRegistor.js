const mongoose = require("mongoose");

const UserTimeRegistorSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    adminid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    verified: {
      type: Boolean,
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

module.exports = mongoose.model("usertimeregistor", UserTimeRegistorSchema);
