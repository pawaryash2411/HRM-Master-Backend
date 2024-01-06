const mongoose = require("mongoose");

const travelSchema = mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
        },
        employee: {   
            type: String,
            required: true,
        },
        arrangement_type: {
            type: String,
            required: true,
        },
        purpose_of_visit: {
            type: String,
            required: true,
        },
        place_of_visit: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        startdate: {
            type: String,
            required: true,
        },
        enddate: {
            type: String,
            required: true,
        },
        expected_budget: {
            type: String,
            required: true,
        },
        actual_budget: {
            type: String,
            required: true,
        },
        status:{
            type: Boolean,
            default: false
        }
        // status: {
        //     type: String,
        //     enum: ['approval pending', 'rejected'], 
        //     default: 'approval pending', 
        //     required: true,
        // },
    },
    { timestamps: true }
);
module.exports = mongoose.model("travel", travelSchema);
