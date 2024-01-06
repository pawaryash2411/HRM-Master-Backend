const db = require("../Models/TransferModel");

const postData = async (req, res) => {
    try {
        const {
            company,
            employee,
            from_department,
            to_department,
            date,
            description
        } = req.body;
        const Transferdata = await db.create({
            company,
            employee,
            from_department,
            to_department,
            date,
            description
        });

        res.status(201).json({
            success: true,
            Transferdata,
            message: " Transfer Created successfully"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getAllData = async (req, res) => {
    try {
        const TransferAllData = await db.find();
        res.status(200).json({ success: true, TransferAllData, message: "All Transfer Data Fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSingleData = async (req, res) => {
    try {
        const { id } = req.params;

        const TransferData = await db.findById(id);

        res.status(200).json({ success: true, TransferData, message: "Transfer Single Data Fetched successfully" });
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
            from_department,
            to_department,
            date,
            description
        } = req.body;

        const updatedData = await db.findByIdAndUpdate(id, {
            company,
            employee,
            from_department,
            to_department,
            date,
            description
        }, { new: true });

        res.status(200).json({ success: true, message: "Transfer Updated successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;

        await db.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Transfer Removed successfully" });
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

