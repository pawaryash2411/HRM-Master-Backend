const mongoose = require("mongoose");

const TaxtypeSchema = mongoose.Schema(
    {
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
    },
    { timestamps: true }
);
module.exports = mongoose.model("taxtype", TaxtypeSchema);
