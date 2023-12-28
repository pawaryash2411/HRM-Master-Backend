const mongoose = require("mongoose");
const userSchema = mongoose.Schema({

    company_name: {
        type: String,
        required: true,
    },
    email:
    {
        type: String,
        required: true,
        unique: true,
    },
    phone_no:
    {
        type: String,
        required: true,
    },
    address:
    {
        type: String,
        required: true,
    },
    logo_img:
    {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
    })
module.exports = mongoose.model("Companydata", userSchema);
