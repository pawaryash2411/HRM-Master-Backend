const mongoose = require("mongoose");

const RuleCategoryModal = mongoose.Schema(
  {
    adminId: String,
    categoryName: {
      type: String,
      required: true,
    },
    allowCheckInTime: {
      type: String,
      required: true,
    },
    allowCheckOutTime: {
      type: String,
      required: true,
    },
    overnight: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("rule-category", RuleCategoryModal);
