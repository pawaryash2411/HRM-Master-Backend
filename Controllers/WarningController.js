const db = require("../Models/WarningModel");

const postData = async (req, res) => {
    try {
        const {
            company,
            warning_to,
            warning_type,
            subject,
            Warning_date,
            description
        } = req.body;
        const Warningdata = await db.create({
            company,
            warning_to,
            warning_type,
            subject,
            Warning_date,
            description
        });

        res.status(201).json({
            success: true,
            Warningdata,
            message: " Warning Created successfully"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getAllData = async (req, res) => {
    try {
        const WarningAllData = await db.find();
        res.status(200).json({ success: true, WarningAllData, message: "All Warning Data Fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSingleData = async (req, res) => {
    try {
        const { id } = req.params;

        const WarningData = await db.findById(id);

        res.status(200).json({ success: true, WarningData, message: "Warning Single Data Fetched successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


const updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            company,
            warning_to,
            warning_type,
            subject,
            Warning_date,
            description
        } = req.body;

        const updatedData = await db.findByIdAndUpdate(id, {
            company,
            warning_to,
            warning_type,
            subject,
            Warning_date,
            description
        }, { new: true });

        res.status(200).json({ success: true, message: "Warning Updated successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;

        await db.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Warning Removed successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    postData,
    getAllData,
    updateData,
    deleteData,
    getSingleData
};

