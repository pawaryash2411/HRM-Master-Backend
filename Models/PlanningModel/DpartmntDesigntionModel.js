const mongoose = require("mongoose");

const department = mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  designation:[]
},
  {
    timestamps: true,
  })
module.exports = mongoose.model("departments", department);
