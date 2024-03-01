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

    branch_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "branch",
    },
    isShiftEmployee: Boolean,
    remarks: String,
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
        shiftDetail: {
          date: String,
          allowCheckInTime: String,
          allowCheckOutTime: String,
          overnight: Boolean,
        },
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("usertimeregistor", UserTimeRegistorSchema);
