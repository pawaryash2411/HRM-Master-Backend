const mongoose = require("mongoose");

const designationSchema = mongoose.Schema(
    {
        designations: {
            type: String,
            required: true,
        },
        last_modified: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("designations", designationSchema);