const mongoose = require("mongoose");

const department = mongoose.Schema(
  {
    department: {
      type: String,
      required: true,
    },
    designations: [],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("departments", department);
