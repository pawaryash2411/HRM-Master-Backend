const mongoose = require("mongoose");
const userSchema = mongoose.Schema({

    company: {
        type: String,
        required: true,
    },
    department:
    {
        type: String,
        required: true,
    },
    employee:
    {
        type: String,
        required: true,
    },
    awardType:
    {
        type: String,
        required: true,
    },
    gift:
    {
        type: String,
        required: true,
    },
    cash:
    {
        type: String,
        required: true,
    },
    awardInformation:
    {
        type: String,
        required: true,
    },
    awardDate:
    {
        type: String,
        required: true,
    },
    awardPhoto:
    {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
    })
module.exports = mongoose.model("award", userSchema);
