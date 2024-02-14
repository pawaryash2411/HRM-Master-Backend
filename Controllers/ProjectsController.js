const db = require("../Models/ProjectsModel");

const postData = async (req, res) => {
    try {
        const {
            title,
            cost,
            startDate,
            endDate,
            priority,
            assignedEmployees,
            summary,
            employeeId
        } = req.body;
        const ProjectData = await db.create({
            title,
            cost,
            startDate,
            endDate,
            priority,
            assignedEmployees: JSON.parse(assignedEmployees),
            summary,
            employeeId
        });

        res.status(201).json({
            success: true,
            ProjectData,
            message: " Projects Created successfully"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getAllData = async (req, res) => {
    try {
        const ProjectsAllData = await db.find();
        res.status(200).json({ success: true, ProjectsAllData, message: "All Projects Data Fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSingleData = async (req, res) => {
    try {
        const { id } = req.params;

        const ProjectsData = await db.findById(id);

        res.status(200).json({ success: true, ProjectsData, message: "Projects Single Data Fetched successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


const updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            cost,
            startDate,
            endDate,
            priority,
            assignedEmployees,
            summary,
            employeeId
        } = req.body;

        const updatedData = await db.findByIdAndUpdate(id, {
            title,
            cost,
            startDate,
            endDate,
            priority,
            assignedEmployees: JSON.parse(assignedEmployees),
            summary,
            employeeId
        }, { new: true });

        res.status(200).json({ success: true, updatedData, message: "Projects Updated successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;

        await db.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Projects Removed successfully" });
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

