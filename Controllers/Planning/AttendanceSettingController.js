const db = require("../../Models/Planning/AttendanceSettingModel");

const getAllAttendanceSetting = async (req, res) => {
    try {
        const data = await db.find();

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json({ mainData: data[0], message: "Fetched Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addAttendanceSetting = async (req, res) => {
    const { geolocation, overtimePay, nighttimePay } = req.body;

    try {
        if (!req.body) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const data = new db({ geolocation, overtimePay, nighttimePay });
        const newData = await data.save();
        res.status(200).json({ success: true, newData, message: "Added successfully" })
    } catch (error) {
        res.status(500).json({ message: "Failed to add company", error: error.message });
    }
};

const updateAttendanceSetting = async (req, res) => {
    try {

        const { geolocation, overtimePay, nighttimePay } = req.body;
        const updatedData = await db.findByIdAndUpdate(
            { _id: req.params.id }, {
            $set: {
                geolocation, overtimePay, nighttimePay
            },
        });
        res.status(200).json({ success: true, message: "Updated successfully", updatedData });
    } catch (error) {
        res.status(500).json({ message: "Failed to update company", error: error.message });
    }
};

module.exports = {
    addAttendanceSetting,
    getAllAttendanceSetting,
    updateAttendanceSetting,
};
