const mongoose = require("mongoose");

const department = mongoose.Schema(
  {
    department: {
      type: String,
      required: true,
    },
    designations: [],
    childDepartment: [],
    independent: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("departments", department);
