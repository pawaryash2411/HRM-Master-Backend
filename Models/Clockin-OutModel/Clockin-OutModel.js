const mongoose = require("mongoose");

const leaveSchema = mongoose.Schema({

    userid: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    }
}, 

{   timestamps: true}
);
module.exports = mongoose.model("register", leaveSchema);
