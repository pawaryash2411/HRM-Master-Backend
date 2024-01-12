const db = require("../Models/TaxTypeModel");

const postData = async (req, res) => {
    try {
        const {
            first,
            second,
            third,
            four,
            fifth,
            six,
            taxName,
            taxRate,
            description,
            taxType,
            totalIncome,
            gender
        } = req.body;

        const taxRateDecimal = parseFloat(taxRate) / 100;
        const taxableAmount = parseFloat(totalIncome) * taxRateDecimal;
        const taxRatePercentage = `${(taxRateDecimal * 100).toFixed(2)}%`;

        const TaxTypedata = await db.create({
            first,
            second,
            third,
            four,
            fifth,
            six,
            taxName,
            taxRate: taxRatePercentage,
            description,
            taxType,
            totalIncome,
            taxableAmount,
            gender
        });

        res.status(201).json({
            success: true,
            TaxTypedata,
            message: "TaxType Created successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getAllData = async (req, res) => {
    try {
        const TaxTypeAllData = await db.find();
        res.status(200).json({ success: true, TaxTypeAllData, message: "All TaxType Data Fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSingleData = async (req, res) => {
    try {
        const { id } = req.params;

        const TaxTypeData = await db.findById(id);

        res.status(200).json({ success: true, TaxTypeData, message: "TaxType Single Data Fetched successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


// const updateData = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const {
//             taxName,
//             taxRate,
//             description,
//             taxType
//         } = req.body;

//         const updatedData = await db.findByIdAndUpdate(id, {
//             taxName,
//             taxRate,
//             description,
//             taxType
//         }, { new: true });

//         res.status(200).json({ success: true, message: "TaxType Updated successfully" });
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// };

// const deleteData = async (req, res) => {
//     try {
//         const { id } = req.params;

//         await db.findByIdAndDelete(id);

//         res.status(200).json({ success: true, message: "TaxType Removed successfully" });
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// };

module.exports = {
    postData,
    getAllData,
    // updateData,
    // deleteData,
    getSingleData
};

