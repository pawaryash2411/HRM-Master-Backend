const mongoose = require("mongoose");
const { Schema } = mongoose;

const BranchSchema = mongoose.Schema(
  {
    branch_name: {
      type: String,
    },
    location: {
      type: String,
    },
    admin_id: {
      type: Schema.Types.ObjectId,
      ref: "admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("branch", BranchSchema);
