const db = require("../../Models/LeaveManagement/LeaveAssignModel");
const userModel = require("../../Models/User/userModel");

const getAllData = async (req, res) => {
    try {
        allData = await db.find();
        res.status(200).json({
            success: true,
            allData,
            message: "All Leave Assigned Data Fetched successfully",
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const postData = async (req, res) => {
    try {
        const { adminId, employees, startDate, endDate } = req.body;
        const employeeData = JSON.parse(employees)

        const allUsers = await userModel.find();
        console.log(allUsers);

        const userData = allUsers.filter((user) =>
            employeeData.includes(user?._id.toString()));

        const createdData = await db.create({
            adminId, employees: userData, startDate, endDate
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
        const { adminId, employees, startDate, endDate } = req.body;
        const allUsers = await userModel.find();
        const userData = allUsers.filter(user => employees.includes(user._id.toString()));
        const updatedData = await db.findByIdAndUpdate(
            id, { adminId, employees: userData, startDate, endDate },
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
};
