const mongoose = require("mongoose");

const leaveSchema = mongoose.Schema({

    title: {
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
},

{   timestamps: true}
);
module.exports = mongoose.model("holiday", leaveSchema);
