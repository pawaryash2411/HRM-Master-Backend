const db = require("../Models/PayrollDeductionModel");

const postData = async (req, res) => {
    try {
        const { id: adminid } = req.user;
        const {
            deduction,
            deduction_name,
            deduction_type,
            percentage_of_basic,
            limit_per_month,
        } = req.body;

        const PayrollData = await db.create({
            adminid,
            deduction,
            deduction_name,
            deduction_type,
            percentage_of_basic,
            limit_per_month,
        });

        res.status(201).json({
            success: true,
            PayrollData,
            message: "Payroll Deduction Created successfully",
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getAllData = async (req, res) => {
    try {
        const PayrollAllData = await db.find();
        res.status(200).json({
            success: true,
            PayrollAllData,
            message: "All Payroll Deduction Data Fetched successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSingleData = async (req, res) => {
    try {
        const { id } = req.params;

        const PayrollData = await db.findById(id);

        res.status(200).json({
            success: true,
            PayrollData,
            message: "Payroll Deduction Single Data Fetched successfully",
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            deduction,
            deduction_name,
            deduction_type,
            percentage_of_basic,
            limit_per_month,
        } = req.body;

        const updatedData = await db.findByIdAndUpdate(
            id,
            {
                deduction,
                deduction_name,
                deduction_type,
                percentage_of_basic,
                limit_per_month,
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            updatedData,
            message: "Payroll Deduction Updated successfully",
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;

        await db.findByIdAndDelete(id);

        res
            .status(200)
            .json({ success: true, message: "Payroll Deduction Removed successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    postData,
    getAllData,
    updateData,
    deleteData,
    getSingleData,
};
