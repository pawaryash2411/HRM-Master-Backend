const db = require("../Models/TrainingModel");

const postData = async (req, res) => {
    try {
        const {
            company,
            training_type,
            trainer,
            employee,
            startdate,
            enddate,
            training_cost,
            description
        } = req.body;
        const trainingData = await db.create({
            company,
            training_type,
            trainer,
            employee,
            startdate,
            enddate,
            training_cost,
            description
        });

        res.status(201).json({
            success: true,
            trainingData,
            message: " Training List Created successfully"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getAllData = async (req, res) => {
    try {
        const trainingAllData = await db.find();
        res.status(200).json({ success: true, trainingAllData, message: "All Training List Data Fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSingleData = async (req, res) => {
    try {
        const { id } = req.params;

        const trainingData = await db.findById(id);

        res.status(200).json({ success: true, trainingData, message: "Training Single List Data Fetched successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


const updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            company,
            training_type,
            trainer,
            employee,
            startdate,
            enddate,
            training_cost,
            description
        } = req.body;

        const updatedData = await db.findByIdAndUpdate(id, {
            company,
            training_type,
            trainer,
            employee,
            startdate,
            enddate,
            training_cost,
            description
        }, { new: true });

        res.status(200).json({ success: true, updatedData, message: "Training List Updated successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedData = await db.findByIdAndDelete(id);

        res.status(200).json({ success: true, deletedData, message: "Training List Removed successfully" });
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

