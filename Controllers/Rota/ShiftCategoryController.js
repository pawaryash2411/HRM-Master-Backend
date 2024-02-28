const ShiftCategoryModel = require("../../Models/Rota/ShiftCategoryModel");

const postData = async (req, res) => {

    try {
        const {
            adminId,
            categoryName,
            allowCheckInTime,
            allowCheckOutTime,
            checkInTime,
            checkOutTime,
            overnight
        } = req.body;
        const newData = await ShiftCategoryModel.create({
            adminId,
            categoryName,
            allowCheckInTime,
            allowCheckOutTime,
            checkInTime,
            checkOutTime,
            overnight
        });

        res.status(201).json({
            success: true,
            newData,
            message: "Shift Category Created successfully"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getAllData = async (req, res) => {
    try {
        const allData = await ShiftCategoryModel.find();
        res.status(200).json({
            success: true,
            allData,
            message: "All Shift Category Fetched successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            adminId,
            categoryName,
            allowCheckInTime,
            allowCheckOutTime,
            checkInTime,
            checkOutTime,
            overnight
        } = req.body;

        const updatedData = await ShiftCategoryModel.findByIdAndUpdate(id, {
            adminId,
            categoryName,
            allowCheckInTime,
            allowCheckOutTime,
            checkInTime,
            checkOutTime,
            overnight
        }, { new: true });

        res.status(200).json({
            success: true,
            updatedData,
            message: "Shift Category Updated successfully"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedData = await ShiftCategoryModel.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            deletedData,
            message: "Shift Category Removed successfully"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = { postData, getAllData, updateData, deleteData };

