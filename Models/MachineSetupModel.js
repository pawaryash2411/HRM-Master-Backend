const mongoose = require("mongoose");

const MachineSetupSchema = mongoose.Schema({
    port_no:
    {
        type: String,
        required: true,
    },
    ip_address: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model("MachineSetup", MachineSetupSchema);
