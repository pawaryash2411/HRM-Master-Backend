const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email:
    {
        type: String,
        required: false,
    },
    password:
    {
        type: String,
        required: false,
    },
    pending_leave:
    {
        type: String,
        required: false,
    },
    notifications: [
        { type: String }
    ],
},
    {
        timestamps: true,
    })
module.exports = mongoose.model("admin", userSchema);
