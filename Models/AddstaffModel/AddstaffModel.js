const mongoose = require("mongoose");

const data = mongoose.Schema({

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
module.exports = mongoose.model("staff", data);


// supervisor_name:rehan
// mobile_no:123654
// name:rehan
// present_address:indore
// user_id:8520258
// role:user
// permanent_address:indore
// display_frontmonitor:false
// attendense_calculation:true
// department:developer
// designation:developer
// weekday_shift:night
// both_shift:day
// email:xyz@gmail.com
// password:123654
// location:indore
// joindate:14