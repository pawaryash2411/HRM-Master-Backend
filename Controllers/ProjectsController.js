const db = require("../Models/ProjectsModel");

const postData = async (req, res) => {
    try {
        const {
            title,
            client,
            startDate,
            endDate,
            priority,
            company,
            assignedEmployees,
            summary
        } = req.body;
        const Projectsdata = await db.create({
            title,
            client,
            startDate,
            endDate,
            priority,
            company,
            assignedEmployees,
            summary
        });

        res.status(201).json({
            success: true,
            Projectsdata,
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
            client,
            startDate,
            endDate,
            priority,
            company,
            assignedEmployees,
            summary
        } = req.body;

        const updatedData = await db.findByIdAndUpdate(id, {
            title,
            client,
            startDate,
            endDate,
            priority,
            company,
            assignedEmployees,
            summary
        }, { new: true });

        res.status(200).json({ success: true, message: "Projects Updated successfully" });
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

