const db = require("../Models/TravelModel");

const postData = async (req, res) => {
    try {
        const {
            company,
            employee,
            arrangement_type,
            purpose_of_visit,
            place_of_visit,
            description,
            startdate,
            enddate,
            expected_budget,
            actual_budget,
            status

        } = req.body;
        const Traveldata = await db.create({
            company,
            employee,
            arrangement_type,
            purpose_of_visit,
            place_of_visit,
            description,
            startdate,
            enddate,
            expected_budget,
            actual_budget,
            status
        });

        res.status(201).json({
            success: true,
            Traveldata,
            message: " Traveldata Created successfully"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getAllData = async (req, res) => {
    try {
        const TravelAllData = await db.find();
        res.status(200).json({ success: true, TravelAllData, message: "All  Travel Data Fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSingleData = async (req, res) => {
    try {
        const { id } = req.params;

        const TravelData = await db.findById(id);

        res.status(200).json({ success: true, TravelData, message: " Travel Single Data Fetched successfully" });
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
            arrangement_type,
            purpose_of_visit,
            place_of_visit,
            description,
            startdate,
            enddate,
            expected_budget,
            actual_budget,
            status
        } = req.body;

        const updatedData = await db.findByIdAndUpdate(id, {
            company,
            employee,
            arrangement_type,
            purpose_of_visit,
            place_of_visit,
            description,
            startdate,
            enddate,
            expected_budget,
            actual_budget,
            status
        }, { new: true });

        res.status(200).json({ success: true, message: " Travel Updated successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;

        await db.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: " Travel Removed successfully" });
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

