const db = require("../Models/DesignationModel");

const postData = async (req, res) => {

    try {
        const {
            designations
        } = req.body;

        const lastModified = new Date();

        const designationData = await db.create({
            designations,
            last_modified: lastModified
        });

        res.status(201).json({
            success: true,
            designationData,
            message: "Designation Created successfully"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getAllData = async (req, res) => {
    try {
        const PromotionAllData = await db.find();
        res.status(200).json({ success: true, PromotionAllData, message: "All Designation Data Fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSingleData = async (req, res) => {
    try {
        const { id } = req.params;

        const PromotionData = await db.findById(id);

        res.status(200).json({ success: true, PromotionData, message: "Designation Single Data Fetched successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


const updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            designations
        } = req.body;
        const lastModified = new Date();

        const updatedData = await db.findByIdAndUpdate(id, {
            designations,
            last_modified: lastModified
        }, { new: true });

        res.status(200).json({ success: true, updatedData, message: "Designation Updated Successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;

        await db.findByIdAndDelete(id);

        res.status(200).json({ success: true, deleteData, message: "Designation Removed successfully" });
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

