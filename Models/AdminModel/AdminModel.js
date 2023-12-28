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
    pending_leave: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'leave'
        }
    ],
    notifications: [
        { type: String }
    ],
},
    {
        timestamps: true,
    })
module.exports = mongoose.model("admin", userSchema);
