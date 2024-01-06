const mongoose = require("mongoose");
const clientSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },
    lastName:
    {
        type: String,
        required: true,
    },
    company:
    {
        type: String,
        required: true,
    },
    userName:
    {
        type: String,
        required: true,
    },
    email:
    {
        type: String,
        required: true,
    },
    password:
    {
        type: String,
        required: true,
    },
    phone:
    {
        type: String,
        required: true,
    },
    addressLine1:
    {
        type: String,
        required: true,
    },
    addressLine2:
    {
        type: String,
        required: true,
    },
    city:
    {
        type: String,
        required: true,
    },
    stateProvince:
    {
        type: String,
        required: true,
    },
    zip:
    {
        type: String,
        required: true,
    },
    country:
    {
        type: String,
        required: true,
    },
    image:
    {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
    })
module.exports = mongoose.model("client", clientSchema);
