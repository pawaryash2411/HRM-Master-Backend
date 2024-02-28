const mongoose = require("mongoose");

const rotaSchema = mongoose.Schema(
  {
    employeename: String,
    employeeid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    rota: [
      {
        date: String,
        shift: { type: mongoose.Schema.Types.ObjectId, ref: "shift-category" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shift", rotaSchema);
