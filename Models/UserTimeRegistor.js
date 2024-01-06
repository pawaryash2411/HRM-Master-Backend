const mongoose = require("mongoose");

const UserTimeRegistorSchema = mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    clock: [
      {
        clockintime: {
          type: String,
          required: true,
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
