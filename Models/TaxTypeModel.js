const mongoose = require("mongoose");

const TaxtypeSchema = mongoose.Schema(
    {
        first: {
            type: String,
            required: true,
        },
        second: {
            type: String,
            required: true,
        },
        third: {
            type: String,
            required: true,
        },
        four: {
            type: String,
            required: true,
        },
        fifth: {
            type: String,
            required: true,
        },
        six: {
            type: String,
            required: true,
        },
        taxName: {
            type: String,
            required: true,
        },
        taxRate: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        taxType: {
            type: String,
            required: true,
        },
        totalIncome: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ['male', 'female'],
            required: true,
        },
        taxableAmount:{
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("taxtype", TaxtypeSchema);
