const mongoose = require("mongoose");

const leaveSchema = mongoose.Schema({

    leave_type: {
        type: String,
        required: true,
    },
    subject: {
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
    details: {
        type: String,
        required: true,
    },
    last_modified_date:{
        type: String,
    },
    total_days:{
        type: String,
    }
},

{   timestamps: true}
);
module.exports = mongoose.model("leave", leaveSchema);
