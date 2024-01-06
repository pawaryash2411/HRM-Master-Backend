const MachineSetupModel = require("../Models/MachineSetupModel");

const postData = async (req, res) => {
    try {
        const {
            machine_no,
            machine_type,
            serial_no,
            port_no,
            machine_name,
            branch_name,
            timezone,
            access_control
        } = req.body;
        const machineSetupData = await MachineSetupModel.create({
            machine_no,
            machine_type,
            serial_no,
            port_no,
            machine_name,
            branch_name,
            timezone,
            access_control
        });

        res.status(201).json({
            success: true,
            machineSetupData,
            message: "Machine Setup Created successfully"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getAllData = async (req, res) => {
    try {
        const machineSetupData = await MachineSetupModel.find();
        res.status(200).json({ success: true, machineSetupData, message: "Machine Setup Fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            machine_no,
            machine_type,
            serial_no,
            port_no,
            machine_name,
            branch_name,
            timezone,
            access_control
        } = req.body;

        const updatedData = await MachineSetupModel.findByIdAndUpdate(id, {
            machine_no,
            machine_type,
            serial_no,
            port_no,
            machine_name,
            branch_name,
            timezone,
            access_control
        }, { new: true });

        res.status(200).json({ success: true, updatedData, message: "Machine Setup Updated successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedData = await MachineSetupModel.findByIdAndDelete(id);

        res.status(200).json({ success: true, deletedData, message: "Machine Setup Deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


module.exports = {
    postData, getAllData, updateData, deleteData
};

