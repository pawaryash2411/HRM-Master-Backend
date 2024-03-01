const db = require("../../Models/LeaveManagement/LeaveAssignModel");
const userModel = require("../../Models/User/userModel");
const adminModel = require("../../Models/Admin/AdminModel");

const getAllData = async (req, res) => {
    try {
        allData = await db.find().populate("employees");
        res.status(200).json({
            success: true,
            allData,
            message: "All Leave Assigned Data Fetched successfully",
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getSingleData = async (req, res) => {
    try {
        const { id } = req.params;
        const allData = await db.findOne({ id });
        res.status(200).json({
            success: true,
            allData,
            message: "Single Leave Assigned Data Fetched successfully",
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


const postData = async (req, res) => {
    try {
        const { employees, startDate, endDate } = req.body;
        const employeeData = JSON.parse(employees)
        const { id: adminId } = req.user;

        const mainAdmin = adminModel.findOne({ adminId });

        const createdData = await db.create({
            employees: employeeData,
            startDate,
            endDate,
            branch_id: mainAdmin.branch_id?._id
        });

        res.status(201).json({
            success: true,
            createdData,
            message: "Leave Assigned successfully",
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const { employees, startDate, endDate } = req.body;

        const { id: adminId } = req.user;
        const mainAdmin = adminModel.findOne({ adminId });

        const updatedData = await db.findByIdAndUpdate(
            id, {
            employees,
            startDate,
            endDate,
            branch_id: mainAdmin.branch_id?._id
        },
            { new: true }
        );

        res.status(200).json({
            success: true,
            updatedData,
            message: "Leave Assigned Updated successfully",
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedData = await db.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            deletedData,
            message: "Leave Assigned Deleted successfully",
        });
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
