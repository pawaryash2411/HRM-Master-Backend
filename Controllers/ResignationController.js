const db = require("../Models/ResignationModel");

const postData = async (req, res) => {
    try {
        const {
            company,
            department,
            employee,
            notice_date,
            description
        } = req.body;
        const Resignationdata = await db.create({
            company,
            department,
            employee,
            notice_date,
            description
        });

        res.status(201).json({
            success: true,
            Resignationdata,
            message: " Resignation Created successfully"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getAllData = async (req, res) => {
    try {
        const ResignationAllData = await db.find();
        res.status(200).json({ success: true, ResignationAllData, message: "All Resignation Data Fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSingleData = async (req, res) => {
    try {
        const { id } = req.params;

        const ResignationData = await db.findById(id);

        res.status(200).json({ success: true, ResignationData, message: "Resignation Single Data Fetched successfully" });
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

        res.status(200).json({ success: true, updatedData, message: "Resignation Updated successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;

        await db.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Resignation Removed successfully" });
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

