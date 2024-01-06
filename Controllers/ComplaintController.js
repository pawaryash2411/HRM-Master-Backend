const db = require("../Models/ComplaintModel");

const postData = async (req, res) => {
    try {
        const {
            company,
            complaintForm,
            complaintAgainst,
            complaintTitle,
            complaintDate,
            description
        } = req.body;
        const ComplaintData = await db.create({
            company,
            complaintForm,
            complaintAgainst,
            complaintTitle,
            complaintDate,
            description
        });

        res.status(201).json({
            success: true,
            ComplaintData,
            message: "Complaint Created successfully"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getAllData = async (req, res) => {
    try {
        const ComplaintAllData = await db.find();
        res.status(200).json({ success: true, ComplaintAllData, message: "All Complaint Data Fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSingleData = async (req, res) => {
    try {
        const { id } = req.params;

        const ComplaintData = await db.findById(id);

        res.status(200).json({ success: true, ComplaintData, message: "Complaint Single Data Fetched successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


const updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            company,
            complaintForm,
            complaintAgainst,
            complaintTitle,
            complaintDate,
            description
        } = req.body;

        const updatedData = await db.findByIdAndUpdate(id, {
            company,
            complaintForm,
            complaintAgainst,
            complaintTitle,
            complaintDate,
            description
        }, { new: true });

        res.status(200).json({ success: true, updatedData, message: "Complaint Updated successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedData = await db.findByIdAndDelete(id);

        res.status(200).json({ success: true, deletedData, message: "Complaint Removed successfully" });
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

