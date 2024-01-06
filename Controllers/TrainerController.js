const TrainerModel = require("../Models/TrainerModel");
const TrainerTypeModel = require("../Models/TrainingTypeModel");

const postData = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            company,
            expertise,
            address
        } = req.body;
        const trainerData = await TrainerModel.create({
            name,
            email,
            phone,
            company,
            expertise,
            address
        });

        res.status(201).json({
            success: true,
            trainerData,
            message: "Trainer Created successfully"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getAllData = async (req, res) => {
    try {
        const trainerAllData = await TrainerModel.find();
        res.status(200).json({ success: true, trainerAllData, message: "All Trainer Data Fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            email,
            phone,
            company,
            expertise,
            address
        } = req.body;

        const updatedData = await TrainerModel.findByIdAndUpdate(id, {
            name,
            email,
            phone,
            company,
            expertise,
            address
        }, { new: true });

        res.status(200).json({ success: true, updatedData, message: "Trainer Updated successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedData = await TrainerModel.findByIdAndDelete(id);

        res.status(200).json({ success: true, deletedData, message: "Trainer Removed successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


const postTrainingTypeData = async (req, res) => {
    try {
        const { training_name } = req.body;
        const trainerData = await TrainerTypeModel.create({ training_name });

        res.status(201).json({
            success: true,
            trainerData,
            message: "Training Type Created successfully"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getTrainingTypeAllData = async (req, res) => {
    try {
        const trainerAllData = await TrainerTypeModel.find();
        res.status(200).json({ success: true, trainerAllData, message: "All Training Type Data Fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateTrainingTypeData = async (req, res) => {
    try {
        const { id } = req.params;
        const { training_name } = req.body;

        const updatedData = await TrainerTypeModel.findByIdAndUpdate(id, { training_name },
             { new: true });

        res.status(200).json({ success: true, updatedData, message: "Training Type Updated successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteTrainingTypeData = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedData = await TrainerTypeModel.findByIdAndDelete(id);

        res.status(200).json({ success: true, deletedData, message: "Training Type Removed successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


module.exports = {
    postData, getAllData, updateData, deleteData, postTrainingTypeData,
    getTrainingTypeAllData, updateTrainingTypeData, deleteTrainingTypeData
};

