const mongoose = require("mongoose");

const MachineSetupSchema = mongoose.Schema({
    machine_no: {
        type: String,
        required: true,
    },
    machine_type:
    {
        type: String,
        required: true,
        unique: true,
    },
    serial_no:
    {
        type: String,
        required: true,
    },
    port_no:
    {
        type: String,
        required: true,
    },
    machine_name:
    {
        type: String,
        required: true,
    },
    branch_name:
    {
        type: String,
        required: true,
    },
    timezone:
    {
        type: String,
        required: true,
    },
    access_control: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model("MachineSetup", MachineSetupSchema);
