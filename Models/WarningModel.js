const mongoose = require("mongoose");

const warningSchema = mongoose.Schema(
  {
    adminid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    company: {
      type: String,
      required: true,
    },
    warning_to: {
      type: String,
      required: true,
    },
    warning_type: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    Warning_date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("warning", warningSchema);
