const mongoose = require("mongoose");

const attendanceSettingSchema = mongoose.Schema({
    geolocation: {
        type: String,
        required: true,
        default: 1
    },
    overtimePay: {
        type: String,
        required: true,
        default: 1.5
    },
    nighttimePay: {
        type: String,
        required: true,
        default: 1.5
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("attendance-setting", attendanceSettingSchema);
