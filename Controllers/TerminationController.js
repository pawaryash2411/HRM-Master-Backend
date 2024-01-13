const db = require("../Models/TerminationModel");

const postData = async (req, res) => {
    try {
        const {
            company,
            termination_to,
            termination_type,
            termination_date,
            notice_date,
            description
        } = req.body;
        const Terminationdata = await db.create({
            company,
            termination_to,
            termination_type,
            termination_date,
            notice_date,
            description
        });

        res.status(201).json({
            success: true,
            Terminationdata,
            message: " Termination Created successfully"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getAllData = async (req, res) => {
    try {
        const TerminationAllData = await db.find();
        res.status(200).json({ success: true, TerminationAllData, message: "All Termination Data Fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSingleData = async (req, res) => {
    try {
        const { id } = req.params;

        const TerminationData = await db.findById(id);

        res.status(200).json({ success: true, TerminationData, message: "Termination Single Data Fetched successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


const updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            company,
            department,
            employee,
            notice_date,
            description
        } = req.body;

        const updatedData = await db.findByIdAndUpdate(id, {
            company,
            department,
            employee,
            notice_date,
            description
        }, { new: true });

        res.status(200).json({ success: true, updatedData, message: "Termination Updated successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;

        await db.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Termination Removed successfully" });
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

