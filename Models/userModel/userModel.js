const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    supervisor_name: {
        type: String,
        required: true,
    },
    mobile_no:
    {
        type: String,
        required: true,
    },
    name:
    {
        type: String,
        required: true,
    },
    present_address:
    {
        type: String,
        required: true,
    },
    user_id :
    {
        type: String,
        required: true,
    },
    role:
    {
        type: String,
        required: true,
    },
    permanent_address:
    {
        type: String,
        required: true,
    },
    display_frontmonitor:
    {
        type: Boolean,
        required: true,
    },
    attendense_calculation:
    {
        type: Boolean,
        required: true,
    },
    department:
    {
        type: String,
        required: true, 
    },
    designation:
    {
        type: String,
        required: true,
    },
    weekday_shift:
    {
        type: String,
        required: true,
    },
    both_shift:
    {
        type: String,
        required: true,
    },
    picture:
    {
        type: String,
        required: true,
    },
    joindate:
    {
        type: String,
        required: true,
    },
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
    location:
    {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
    })
module.exports = mongoose.model("user", userSchema);
