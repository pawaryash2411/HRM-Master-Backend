const mongoose = require("mongoose");
const { Schema } = mongoose;

const leaveSchema = mongoose.Schema(
  {
    leave_type: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    start_date: {
      type: String,
      required: true,
    },
    end_date: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    last_modified_date: {
      type: String,
    },
    total_days: {
      type: Number,
    },
    status: {
      type: String,
      default: "pending",
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("leave", leaveSchema);
