const db = require("../Models/PromotionModel");

const postData = async (req, res) => {
    try {
        const {
            company,
            employee,
            title,
            promotion_date,
            description
        } = req.body;
        const Promotiondata = await db.create({
            company,
            employee,
            title,
            promotion_date,
            description
        });

        res.status(201).json({
            success: true,
            Promotiondata,
            message: " Promotion Created successfully"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getAllData = async (req, res) => {
    try {
        const PromotionAllData = await db.find();
        res.status(200).json({ success: true, PromotionAllData, message: "All Promotion Data Fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSingleData = async (req, res) => {
    try {
        const { id } = req.params;

        const PromotionData = await db.findById(id);

        res.status(200).json({ success: true, PromotionData, message: "Promotion Single Data Fetched successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


const updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            company,
            employee,
            title,
            promotion_date,
            description
        } = req.body;

        const updatedData = await db.findByIdAndUpdate(id, {
            company,
            employee,
            title,
            promotion_date,
            description
        }, { new: true });

        res.status(200).json({ success: true, updatedData, message: "Promotion Updated successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;

        await db.findByIdAndDelete(id);

        res.status(200).json({ success: true, deleteData, message: "Promotion Removed successfully" });
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

