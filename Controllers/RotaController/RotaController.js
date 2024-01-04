const rotaModal = require("../../Models/RotaModel/RotaModel");

const postData = async (req, res) => {
    try {
        const { employeename, date, starttime, endtime, employeeid, rota } = req.body;
        const existingData = await rotaModal.findOne({ employeeid });

        if (existingData) {
            existingData.rota.push({ employeeid, employeename, date, starttime, endtime }); // Assuming you want to add the date, starttime, and endtime to the existing rota
            await existingData.save();
            res.status(200).json({ success: true, message: "Rota Data Updated successfully" });
        } else {
            const newRotaData = await rotaModal.create({
                employeename,
                date,
                starttime,
                endtime,
                employeeid,
                rota// Assuming rota is an array of objects containing date, starttime, and endtime
            });
            res.status(201).json({ success: true, rotaData: newRotaData, message: "Rota Data Added successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getData = async (req, res) => {
    try {
        const rotaData = await rotaModal.find();
        res.status(200).json({ success: true, rotaData, message: "Rota Data Fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const filterData = async (req, res) => {
    try {
        const { employeename, starttime, endtime } = req.query;

        const filter = {};
        if (employeename) {
            filter.employeename = employeename;
        }
        if (starttime) {
            filter.starttime = { $gte: new Date(starttime) };
        }
        if (endtime) {
            filter.endtime = { $lte: new Date(endtime) };
        }

        const rotaData = await rotaModal.find(filter);

        res.status(200).json({ success: true, rotaData, message: "Filtered Rota Data Fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const { employeename, date, starttime, endtime } = req.body;

        const updatedData = await rotaModal.findByIdAndUpdate(id, {
            employeename,
            date,
            starttime,
            endtime
        }, { new: true });

        res.status(200).json({ success: true, updatedData, message: "Rota Data Updated successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedData = await rotaModal.findByIdAndDelete(id);

        res.status(200).json({ success: true, deletedData, message: "Rota Data Deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


module.exports = {
    postData, getData, updateData, deleteData, filterData
};

