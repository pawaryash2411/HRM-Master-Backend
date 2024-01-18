const mongoose = require("mongoose");

const rotaSchema = mongoose.Schema(
  {
    employeename: String,
    employeeid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    rota: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("rotacollection1", rotaSchema);
