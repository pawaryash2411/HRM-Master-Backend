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
        type: String,
        required: true,
    },
    attendense_calculation:
    {
        type: String,
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

// ProductName:jkgjhg
// ProductType:uyfhfhc
// ProdcutPrice:633
// Quantity:363
// QuantityLimition:63
// StockAlert:3636
// ExpiryDate:6363
// SkuNumber:36363
// AddOption:36363
// Category:3636
// Unit:363
// Brand:3636
// Supplier:36363
// TaxType:635
// ProductTax:563563
// Description:563653
// Seo:536536
