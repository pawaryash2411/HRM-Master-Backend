const mongoose = require("mongoose");
const { Schema } = mongoose;

const BranchSchema = mongoose.Schema(
  {
    branch_name: {
      type: String,
    },
    location: {
      latitude: String,
      longitude: String,
    },
    address: String,
    admin_id: {
      type: Schema.Types.ObjectId,
      ref: "admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("branch", BranchSchema);
