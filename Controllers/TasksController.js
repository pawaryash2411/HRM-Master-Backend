const db = require("../Models/TasksModel");

const postData = async (req, res) => {
    try {
        const {
            title,
            company,
            startDate,
            endDate,
            project,
            estimatedHour,
            projectUsers
        } = req.body;
        const Tasksdata = await db.create({
            title,
            company,
            startDate,
            endDate,
            project,
            estimatedHour,
            projectUsers
        });

        res.status(201).json({
            success: true,
            Tasksdata,
            message: " Tasks Created successfully"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getAllData = async (req, res) => {
    try {
        const TasksAllData = await db.find();
        res.status(200).json({ success: true, TasksAllData, message: "All Tasks Data Fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSingleData = async (req, res) => {
    try {
        const { id } = req.params;

        const TasksData = await db.findById(id);

        res.status(200).json({ success: true, TasksData, message: "Tasks Single Data Fetched successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


const updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            company,
            startDate,
            endDate,
            project,
            estimatedHour,
            projectUsers
        } = req.body;

        const updatedData = await db.findByIdAndUpdate(id, {
            title,
            company,
            startDate,
            endDate,
            project,
            estimatedHour,
            projectUsers
        }, { new: true });

        res.status(200).json({ success: true, message: "Tasks Updated successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;

        await db.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Tasks Removed successfully" });
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

